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

/**
 * The flat-area pass. pixelmatch at threshold 0.1 forgives a light grey where Figma has white
 * (a 16 px band of surface-muted on a white card scores 0.11 %), so a second check looks only
 * where Figma is a flat colour:
 *  - a Figma pixel is "flat" when every pixel within FLAT_RADIUS of it (a 7 x 7 window) differs
 *    from it by at most FLAT_NEIGHBOUR_DELTA (sum of the R, G and B differences): the inside of a
 *    fill, not an edge, text or a shadow ramp. A 3 x 3 window also flagged glyph edges where a
 *    line of text sits a pixel off (S12.4, S05.1, S05.2: 3 to 6 cells each); 7 x 7 keeps text
 *    jitter under 3 device pixels out and still finds wrong fills and misplaced shapes;
 *  - a flat pixel is flagged when the app's pixel differs by more than FLAT_PIXEL_DELTA on any channel;
 *  - flagged pixels are counted per FLAT_CELL x FLAT_CELL CSS px cell. A cell with more than
 *    FLAT_CELL_LIMIT flagged pixels fails the frame (a 16 px cell is 1024 device pixels at 2x).
 */
export const FLAT_RADIUS = 3;
export const FLAT_NEIGHBOUR_DELTA = 6;
export const FLAT_PIXEL_DELTA = 10;
export const FLAT_CELL = 16;
export const FLAT_CELL_LIMIT = 60;
/** Flagged pixels are drawn in this colour in the diff image (the pixelmatch diff colour is pure red). */
const FLAT_COLOR: [number, number, number] = [255, 140, 0];

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

/** A connected group of failing cells: where the app's flat fill is not Figma's. */
export interface FlatRegion {
  /** Bounding box in CSS pixels from the top left of the frame. */
  x: number;
  y: number;
  width: number;
  height: number;
  /** Failing cells in the group. */
  cells: number;
  /** Most flagged pixels in one cell of the group. */
  worstCell: number;
  /** Average colour of the flagged pixels, as hex: what Figma has and what the app draws. */
  figma: string;
  app: string;
}

export interface FlatReport {
  /** Flagged pixels in the whole frame (device pixels). */
  flagged: number;
  /** Cells over FLAT_CELL_LIMIT. The frame fails the flat pass when this is above 0. */
  failCells: number;
  /** Flagged pixels in the worst cell. */
  worstCell: number;
  /** Failing groups, biggest first. */
  regions: FlatRegion[];
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
  flat: FlatReport;
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

const hex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

/**
 * The flat-area pass (see FLAT_* above). `a` is Figma and `b` the app, on the same canvas; only the
 * area both images cover is looked at (a size difference is reported on its own). Flagged pixels are
 * painted into `diff`.
 */
function flatAreaPass(a: PNG, b: PNG, width: number, overlapW: number, overlapH: number, diff: PNG): FlatReport {
  const A = a.data;
  const B = b.data;
  const cellPx = FLAT_CELL * DEVICE_SCALE;
  const cols = Math.ceil(overlapW / cellPx);
  const rows = Math.ceil(overlapH / cellPx);
  const count = new Int32Array(cols * rows);
  const sums = new Float64Array(cols * rows * 6); // figma r g b, app r g b of the flagged pixels
  let flagged = 0;

  for (let y = FLAT_RADIUS; y < overlapH - FLAT_RADIUS; y++) {
    for (let x = FLAT_RADIUS; x < overlapW - FLAT_RADIUS; x++) {
      const i = (y * width + x) * 4;
      const dr = Math.abs(A[i]! - B[i]!);
      const dg = Math.abs(A[i + 1]! - B[i + 1]!);
      const db = Math.abs(A[i + 2]! - B[i + 2]!);
      if (dr <= FLAT_PIXEL_DELTA && dg <= FLAT_PIXEL_DELTA && db <= FLAT_PIXEL_DELTA) continue;
      // Is the Figma neighbourhood flat?
      let flat = true;
      for (let ny = -FLAT_RADIUS; ny <= FLAT_RADIUS && flat; ny++) {
        for (let nx = -FLAT_RADIUS; nx <= FLAT_RADIUS; nx++) {
          if (nx === 0 && ny === 0) continue;
          const j = i + (ny * width + nx) * 4;
          const d = Math.abs(A[j]! - A[i]!) + Math.abs(A[j + 1]! - A[i + 1]!) + Math.abs(A[j + 2]! - A[i + 2]!);
          if (d > FLAT_NEIGHBOUR_DELTA) {
            flat = false;
            break;
          }
        }
      }
      if (!flat) continue;
      flagged++;
      diff.data[i] = FLAT_COLOR[0];
      diff.data[i + 1] = FLAT_COLOR[1];
      diff.data[i + 2] = FLAT_COLOR[2];
      const c = Math.floor(y / cellPx) * cols + Math.floor(x / cellPx);
      count[c]!++;
      const s = c * 6;
      sums[s]! += A[i]!;
      sums[s + 1]! += A[i + 1]!;
      sums[s + 2]! += A[i + 2]!;
      sums[s + 3]! += B[i]!;
      sums[s + 4]! += B[i + 1]!;
      sums[s + 5]! += B[i + 2]!;
    }
  }

  // Failing cells, grouped by edge contact (4-connected).
  const failing = (c: number) => count[c]! > FLAT_CELL_LIMIT;
  const seen = new Uint8Array(cols * rows);
  const regions: FlatRegion[] = [];
  let failCells = 0;
  let worstCell = 0;
  for (let c = 0; c < count.length; c++) {
    worstCell = Math.max(worstCell, count[c]!);
    if (failing(c)) failCells++;
  }
  for (let start = 0; start < count.length; start++) {
    if (seen[start] || !failing(start)) continue;
    const stack = [start];
    seen[start] = 1;
    let minC = cols;
    let maxC = 0;
    let minR = rows;
    let maxR = 0;
    let cells = 0;
    let worst = 0;
    let pixels = 0;
    const total = [0, 0, 0, 0, 0, 0];
    while (stack.length > 0) {
      const c = stack.pop()!;
      const cx = c % cols;
      const cy = Math.floor(c / cols);
      cells++;
      worst = Math.max(worst, count[c]!);
      pixels += count[c]!;
      for (let k = 0; k < 6; k++) total[k]! += sums[c * 6 + k]!;
      minC = Math.min(minC, cx);
      maxC = Math.max(maxC, cx);
      minR = Math.min(minR, cy);
      maxR = Math.max(maxR, cy);
      for (const [nx, ny] of [[cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]] as const) {
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        const n = ny * cols + nx;
        if (!seen[n] && failing(n)) {
          seen[n] = 1;
          stack.push(n);
        }
      }
    }
    regions.push({
      x: minC * FLAT_CELL,
      y: minR * FLAT_CELL,
      width: Math.min((maxC + 1) * FLAT_CELL, overlapW / DEVICE_SCALE) - minC * FLAT_CELL,
      height: Math.min((maxR + 1) * FLAT_CELL, overlapH / DEVICE_SCALE) - minR * FLAT_CELL,
      cells,
      worstCell: worst,
      figma: hex(total[0]! / pixels, total[1]! / pixels, total[2]! / pixels),
      app: hex(total[3]! / pixels, total[4]! / pixels, total[5]! / pixels),
    });
  }
  regions.sort((x, y) => y.cells - x.cells || y.worstCell - x.worstCell);
  return { flagged, failCells, worstCell, regions };
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

  // The flat-area pass paints into the diff image, so it runs before the side by side is built.
  const flat = flatAreaPass(a, b, width, overlapW, overlapH, diff);

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
    flat,
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

/**
 * True when a frame passes the strict limit: same size, at most STRICT_LIMIT_PCT of pixels differ,
 * and no 16 px cell where a flat Figma fill is a different colour in the app (the flat-area pass).
 */
export function passes(result: FrameResult, limit = STRICT_LIMIT_PCT): boolean {
  const c = result.comparison;
  return !result.error && !!c && c.sizeMatch && c.mismatchPct <= limit && c.flat.failCells === 0;
}

const fmt = (n: number, digits = 2) => n.toFixed(digits);

/** One line per frame, for the terminal. */
export function formatTable(results: readonly FrameResult[], limit = STRICT_LIMIT_PCT): string {
  const rows: string[][] = [['frame', 'route', 'size match', 'mismatch %', 'worst band (y px)', 'flat cells', 'status']];
  for (const r of results) {
    const route = r.frame.path + (r.frame.query ? '?' + new URLSearchParams(r.frame.query).toString() : '');
    if (r.error || !r.comparison) {
      rows.push([r.frame.id, route, '-', '-', '-', '-', r.error ?? 'error']);
      continue;
    }
    const c = r.comparison;
    const size = c.sizeMatch
      ? `yes ${c.app.width / DEVICE_SCALE}x${c.app.height / DEVICE_SCALE}`
      : `NO figma ${c.figma.width / DEVICE_SCALE}x${c.figma.height / DEVICE_SCALE}, app ${c.app.width / DEVICE_SCALE}x${c.app.height / DEVICE_SCALE} (${c.heightDelta > 0 ? '+' : ''}${c.heightDelta}px)`;
    const worst = c.worstBands[0] ? `${c.worstBands[0].fromY}-${c.worstBands[0].toY} (${fmt(c.worstBands[0].pct, 1)}%)` : '-';
    const flatCol = c.flat.failCells === 0 ? 'ok' : `${c.flat.failCells} (max ${c.flat.worstCell})`;
    const status = passes(r, limit)
      ? 'ok'
      : !c.sizeMatch
        ? 'size differs'
        : c.mismatchPct > limit
          ? 'over limit'
          : 'flat fill differs';
    const notes = r.errors.length ? `${status}, ${r.errors.length} console error${r.errors.length > 1 ? 's' : ''}` : status;
    rows.push([r.frame.id, route, size, fmt(c.mismatchPct), worst, flatCol, notes]);
  }
  const widths = rows[0]!.map((_, col) => Math.max(...rows.map((row) => (row[col] ?? '').length)));
  const table = rows
    .map((row, i) => {
      const line = row.map((cell, col) => cell.padEnd(widths[col]!)).join('  ').trimEnd();
      return i === 0 ? line + '\n' + widths.map((w) => '-'.repeat(w)).join('  ') : line;
    })
    .join('\n');
  return table + formatFlatRegions(results);
}

/** Under the table: where a flat fill differs (CSS px, Figma colour to app colour), for the frames that have one. */
export function formatFlatRegions(results: readonly FrameResult[], perFrame = 4): string {
  const lines: string[] = [];
  for (const r of results) {
    const c = r.comparison;
    if (!c || c.flat.regions.length === 0) continue;
    lines.push(`  ${r.frame.id}:`);
    for (const g of c.flat.regions.slice(0, perFrame)) {
      lines.push(
        `    x ${g.x}-${g.x + g.width}, y ${g.y}-${g.y + g.height}  ${g.figma} in Figma, ${g.app} in the app  (${g.cells} cell${g.cells > 1 ? 's' : ''}, up to ${g.worstCell} px in one)`,
      );
    }
    if (c.flat.regions.length > perFrame) lines.push(`    and ${c.flat.regions.length - perFrame} more region${c.flat.regions.length - perFrame > 1 ? 's' : ''}`);
  }
  return lines.length === 0
    ? ''
    : `\n\nFlat-area pass: more than ${FLAT_CELL_LIMIT} px in a ${FLAT_CELL} px cell where Figma has one flat colour and the app another (orange in the diff image)\n${lines.join('\n')}`;
}

/** tests/visual/out/index.html: every frame's side-by-side, worst first, for a quick look in a browser. */
export function writeIndex(results: readonly FrameResult[]): string {
  mkdirSync(OUT_DIR, { recursive: true });
  const measured = results.filter((r) => r.comparison);
  const sorted = [...measured].sort((a, b) => b.comparison!.mismatchPct - a.comparison!.mismatchPct);
  const card = (r: FrameResult) => {
    const c = r.comparison!;
    const size = c.sizeMatch ? 'size matches' : `SIZE: figma ${c.figma.height / DEVICE_SCALE}px, app ${c.app.height / DEVICE_SCALE}px`;
    const flatNote = c.flat.failCells === 0 ? '' : `, ${c.flat.failCells} flat-fill cell${c.flat.failCells > 1 ? 's' : ''} differ`;
    return `<figure><figcaption><b>${r.frame.id}</b> ${r.frame.name} <span>${fmt(c.mismatchPct)} % differ, ${size}${flatNote}</span></figcaption>
<a href="${r.frame.id}-side.png"><img loading="lazy" src="${r.frame.id}-side.png" alt="${r.frame.id}: Figma, app, diff"></a></figure>`;
  };
  const html = `<!doctype html><meta charset="utf-8"><title>Ohm visual diff</title>
<style>body{font:14px/1.4 system-ui;margin:24px;background:#f1f2f4;color:#091e42}figure{margin:0 0 32px}figcaption{margin-bottom:8px}figcaption span{color:#5e6c84;margin-left:8px}img{max-width:100%;height:auto;border:1px solid #dfe1e6;background:#fff}</style>
<h1>Ohm visual diff</h1><p>Each image: Figma, app, diff (red: pixelmatch, orange: a flat Figma fill drawn in another colour). Worst first. Generated ${new Date().toISOString()}.</p>
${sorted.map(card).join('\n')}`;
  const file = resolve(OUT_DIR, 'index.html');
  writeFileSync(file, html);
  return file;
}
