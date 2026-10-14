/**
 * The pixel-perfect pipeline: render a frame's route in capture mode, compare the screenshot with
 * the 2x Figma export, write the diff images. Shared by `npm run diff` (scripts/diff.ts) and the
 * Playwright test (tests/visual/frames.spec.ts). Node only (reads and writes files).
 *
 * Erasable TypeScript only (no enums, namespaces or parameter properties): Node runs it directly.
 */
import { mkdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import type { Page } from 'playwright';
import { capturePath, type FrameSpec } from './screens.ts';

const HERE = dirname(fileURLToPath(import.meta.url));
export const FIGMA_DIR = resolve(HERE, '../figma');
export const OUT_DIR = resolve(HERE, 'out');

/** The phone: 393 wide, 852 tall, drawn at 2x like the Figma exports. */
export const VIEWPORT = { width: 393, height: 852 } as const;
export const DEVICE_SCALE = 2;
/** pixelmatch colour distance (0 to 1) and the share of pixels allowed to differ under --strict. */
export const THRESHOLD = 0.1;
export const STRICT_LIMIT_PCT = 1.5;
/** Height of a band in the "worst band" report, in CSS pixels. */
const BAND = 50;

export const DEFAULT_BASE = process.env.OHM_BASE_URL ?? 'http://localhost:8810/ohm';

export function figmaPath(id: string): string {
  return resolve(FIGMA_DIR, `${id}.png`);
}

export interface RenderResult {
  png: Buffer;
  /** console.error messages and uncaught page errors while the page loaded. */
  errors: string[];
}

/** Open the frame in capture mode, wait until it is ready, take a full page screenshot. */
export async function renderFrame(page: Page, base: string, frame: FrameSpec): Promise<RenderResult> {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  const url = `${base.replace(/\/$/, '')}${capturePath(frame)}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
  await page.waitForFunction(() => document.documentElement.dataset.captureReady === 'true', null, {
    timeout: 25_000,
  });
  // Fonts a second time, after the actions: the page said it was ready, the screenshot waits for the browser too.
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  });
  const png = await page.screenshot({ fullPage: true, animations: 'disabled', caret: 'hide', type: 'png' });
  return { png, errors };
}

export interface BandReport {
  /** CSS pixels from the top of the frame. */
  fromY: number;
  toY: number;
  /** Share of that band's pixels that differ. */
  pct: number;
}

export interface Comparison {
  figma: { width: number; height: number };
  app: { width: number; height: number };
  sizeMatch: boolean;
  /** Mismatched pixels as a share of the whole compared canvas (the larger of the two sizes). */
  mismatchPct: number;
  /** The same, counting only the area both images cover. */
  overlapMismatchPct: number;
  mismatched: number;
  /** App height minus Figma height, in CSS pixels (positive: the app is taller). */
  heightDelta: number;
  worstBands: BandReport[];
  diffPng: Buffer;
  sidePng: Buffer;
}

const PAD_FIGMA: [number, number, number] = [255, 0, 255];
const PAD_APP: [number, number, number] = [0, 255, 255];

/** A copy of `src` on a width x height canvas, the extra area filled with `pad`. */
function onCanvas(src: PNG, width: number, height: number, pad: [number, number, number]): PNG {
  if (src.width === width && src.height === height) return src;
  const out = new PNG({ width, height });
  for (let i = 0; i < out.data.length; i += 4) {
    out.data[i] = pad[0];
    out.data[i + 1] = pad[1];
    out.data[i + 2] = pad[2];
    out.data[i + 3] = 255;
  }
  PNG.bitblt(src, out, 0, 0, src.width, src.height, 0, 0);
  return out;
}

export function compareImages(figmaBuf: Buffer, appBuf: Buffer): Comparison {
  const figma = PNG.sync.read(figmaBuf);
  const app = PNG.sync.read(appBuf);
  const width = Math.max(figma.width, app.width);
  const height = Math.max(figma.height, app.height);
  const a = onCanvas(figma, width, height, PAD_FIGMA);
  const b = onCanvas(app, width, height, PAD_APP);
  const diff = new PNG({ width, height });
  // includeAA false: anti-aliased pixels are not counted. alpha 0.25 dims the unchanged pixels in the diff image.
  const mismatched = pixelmatch(a.data, b.data, diff.data, width, height, {
    threshold: THRESHOLD,
    includeAA: false,
    alpha: 0.25,
    diffColor: [255, 0, 0],
  });

  // Where do the differences sit? Count pure red pixels per row (the diff colour; the rest are grey).
  const bandRows = BAND * DEVICE_SCALE;
  const bandCount = Math.ceil(height / bandRows);
  const perBand = new Array<number>(bandCount).fill(0);
  let inOverlap = 0;
  const overlapW = Math.min(figma.width, app.width);
  const overlapH = Math.min(figma.height, app.height);
  for (let y = 0; y < height; y++) {
    let rowCount = 0;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (diff.data[i] === 255 && diff.data[i + 1] === 0 && diff.data[i + 2] === 0) {
        rowCount++;
        if (x < overlapW && y < overlapH) inOverlap++;
      }
    }
    perBand[Math.floor(y / bandRows)] += rowCount;
  }
  const worstBands = perBand
    .map((count, i) => {
      const rows = Math.min(bandRows, height - i * bandRows);
      return { fromY: i * BAND, toY: i * BAND + rows / DEVICE_SCALE, pct: (count / (rows * width)) * 100 };
    })
    .filter((b) => b.pct > 0)
    .sort((x, y) => y.pct - x.pct)
    .slice(0, 3);

  // Side by side: Figma, app, diff, 16 device px apart.
  const gap = 16;
  const side = new PNG({ width: width * 3 + gap * 2, height });
  for (let i = 0; i < side.data.length; i += 4) {
    side.data[i] = 226;
    side.data[i + 1] = 228;
    side.data[i + 2] = 232;
    side.data[i + 3] = 255;
  }
  PNG.bitblt(a, side, 0, 0, width, height, 0, 0);
  PNG.bitblt(b, side, 0, 0, width, height, width + gap, 0);
  PNG.bitblt(diff, side, 0, 0, width, height, (width + gap) * 2, 0);

  return {
    figma: { width: figma.width, height: figma.height },
    app: { width: app.width, height: app.height },
    sizeMatch: figma.width === app.width && figma.height === app.height,
    mismatchPct: (mismatched / (width * height)) * 100,
    overlapMismatchPct: overlapW * overlapH === 0 ? 100 : (inOverlap / (overlapW * overlapH)) * 100,
    mismatched,
    heightDelta: (app.height - figma.height) / DEVICE_SCALE,
    worstBands,
    diffPng: PNG.sync.write(diff),
    sidePng: PNG.sync.write(side),
  };
}

export interface FrameResult {
  frame: FrameSpec;
  /** Set when the frame could not be measured (no Figma export, the page failed to load). */
  error?: string;
  comparison?: Comparison;
  errors: string[];
}

/** Render, compare, and write tests/visual/out/<id>-app.png, -diff.png and -side.png. */
export async function measureFrame(page: Page, base: string, frame: FrameSpec): Promise<FrameResult> {
  const figmaFile = figmaPath(frame.id);
  if (!existsSync(figmaFile)) {
    return { frame, error: `no Figma export at tests/figma/${frame.id}.png`, errors: [] };
  }
  let rendered: RenderResult;
  try {
    rendered = await renderFrame(page, base, frame);
  } catch (e) {
    return { frame, error: `render failed: ${e instanceof Error ? e.message.split('\n')[0] : String(e)}`, errors: [] };
  }
  const comparison = compareImages(readFileSync(figmaFile), rendered.png);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(resolve(OUT_DIR, `${frame.id}-app.png`), rendered.png);
  writeFileSync(resolve(OUT_DIR, `${frame.id}-diff.png`), comparison.diffPng);
  writeFileSync(resolve(OUT_DIR, `${frame.id}-side.png`), comparison.sidePng);
  return { frame, comparison, errors: rendered.errors };
}

/** True when a frame passes the strict limit: same size and at most STRICT_LIMIT_PCT of pixels differ. */
export function passes(result: FrameResult, limit = STRICT_LIMIT_PCT): boolean {
  const c = result.comparison;
  return !result.error && !!c && c.sizeMatch && c.mismatchPct <= limit;
}

const fmt = (n: number, digits = 2) => n.toFixed(digits);

/** One line per frame, for the terminal. */
export function formatTable(results: readonly FrameResult[], limit = STRICT_LIMIT_PCT): string {
  const rows: string[][] = [['frame', 'route', 'size match', 'mismatch %', 'worst band (y px)', 'status']];
  for (const r of results) {
    const route = r.frame.path + (r.frame.query ? '?' + new URLSearchParams(r.frame.query).toString() : '');
    if (r.error || !r.comparison) {
      rows.push([r.frame.id, route, '-', '-', '-', r.error ?? 'error']);
      continue;
    }
    const c = r.comparison;
    const size = c.sizeMatch
      ? `yes ${c.app.width / DEVICE_SCALE}x${c.app.height / DEVICE_SCALE}`
      : `NO figma ${c.figma.width / DEVICE_SCALE}x${c.figma.height / DEVICE_SCALE}, app ${c.app.width / DEVICE_SCALE}x${c.app.height / DEVICE_SCALE} (${c.heightDelta > 0 ? '+' : ''}${c.heightDelta}px)`;
    const worst = c.worstBands[0] ? `${c.worstBands[0].fromY}-${c.worstBands[0].toY} (${fmt(c.worstBands[0].pct, 1)}%)` : '-';
    const status = passes(r, limit) ? 'ok' : c.sizeMatch ? 'over limit' : 'size differs';
    const notes = r.errors.length ? `${status}, ${r.errors.length} console error${r.errors.length > 1 ? 's' : ''}` : status;
    rows.push([r.frame.id, route, size, fmt(c.mismatchPct), worst, notes]);
  }
  const widths = rows[0]!.map((_, col) => Math.max(...rows.map((row) => (row[col] ?? '').length)));
  return rows
    .map((row, i) => {
      const line = row.map((cell, col) => cell.padEnd(widths[col]!)).join('  ').trimEnd();
      return i === 0 ? line + '\n' + widths.map((w) => '-'.repeat(w)).join('  ') : line;
    })
    .join('\n');
}

/** tests/visual/out/index.html: every frame's side-by-side, worst first, for a quick look in a browser. */
export function writeIndex(results: readonly FrameResult[]): string {
  mkdirSync(OUT_DIR, { recursive: true });
  const measured = results.filter((r) => r.comparison);
  const sorted = [...measured].sort((a, b) => b.comparison!.mismatchPct - a.comparison!.mismatchPct);
  const card = (r: FrameResult) => {
    const c = r.comparison!;
    const size = c.sizeMatch ? 'size matches' : `SIZE: figma ${c.figma.height / DEVICE_SCALE}px, app ${c.app.height / DEVICE_SCALE}px`;
    return `<figure><figcaption><b>${r.frame.id}</b> ${r.frame.name} <span>${fmt(c.mismatchPct)} % differ, ${size}</span></figcaption>
<a href="${r.frame.id}-side.png"><img loading="lazy" src="${r.frame.id}-side.png" alt="${r.frame.id}: Figma, app, diff"></a></figure>`;
  };
  const html = `<!doctype html><meta charset="utf-8"><title>Ohm visual diff</title>
<style>body{font:14px/1.4 system-ui;margin:24px;background:#f1f2f4;color:#091e42}figure{margin:0 0 32px}figcaption{margin-bottom:8px}figcaption span{color:#5e6c84;margin-left:8px}img{max-width:100%;height:auto;border:1px solid #dfe1e6;background:#fff}</style>
<h1>Ohm visual diff</h1><p>Each image: Figma, app, diff. Worst first. Generated ${new Date().toISOString()}.</p>
${sorted.map(card).join('\n')}`;
  const file = resolve(OUT_DIR, 'index.html');
  writeFileSync(file, html);
  return file;
}
