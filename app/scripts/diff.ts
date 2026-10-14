/**
 * npm run diff [frameId ...]                 e.g. npm run diff S06 S01-1
 * npm run diff -- --strict --area=HOME --list   flags go after "--" (npm keeps flags otherwise)
 * Flags: --strict, --area=HOME|ADD|CONNECTION|SUMMARY|PAY, --base=URL, --jobs=4, --reduced, --start, --list
 *
 * Renders each frame's route in capture mode at 393 wide, 2x, compares it with tests/figma/<id>.png
 * (pixelmatch, threshold 0.1, anti-aliasing ignored) and prints a table: frame, size match,
 * mismatch %. Writes tests/visual/out/<id>-app.png, -diff.png, -side.png and out/index.html.
 *
 * It is a measuring tool: the exit code is 0 even when frames fail. --strict exits 1 when any frame
 * differs by more than 1.5 %, has a different size, or has a flat Figma fill drawn in another colour (the flat-area
 * pass, see tests/visual/README.md). Exit code 2: it could not run at all (dev
 * server down, browser missing).
 *
 * Frame ids: S01-1 or S01.1, any case; none = every frame. See tests/visual/screens.ts.
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import {
  DEFAULT_BASE,
  DEVICE_SCALE,
  STRICT_LIMIT_PCT,
  VIEWPORT,
  formatTable,
  measureFrame,
  passes,
  writeIndex,
  type FrameResult,
} from '../tests/visual/lib.ts';
import { FRAMES, findFrame, type FrameSpec } from '../tests/visual/screens.ts';

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const option = (name: string): string | undefined => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const ids = args.filter((a) => !a.startsWith('--'));

if (flag('list')) {
  for (const f of FRAMES) console.log(`${f.id.padEnd(7)} ${f.area.padEnd(10)} ${f.path}${f.query ? '?' + new URLSearchParams(f.query).toString() : ''}  ${f.name}`);
  process.exit(0);
}

const base = (option('base') ?? DEFAULT_BASE).replace(/\/$/, '');
const jobs = Math.max(1, Number(option('jobs') ?? 4));
const strict = flag('strict');
const area = option('area')?.toUpperCase();

let frames: FrameSpec[] = [...FRAMES];
if (ids.length > 0) {
  const unknown = ids.filter((id) => !findFrame(id));
  if (unknown.length > 0) {
    console.error(`Unknown frame id: ${unknown.join(', ')}. Run "npm run diff -- --list" for the ids.`);
    process.exit(2);
  }
  frames = ids.map((id) => findFrame(id)!);
} else if (area) {
  frames = frames.filter((f) => f.area === area);
  if (frames.length === 0) {
    console.error(`No frames in area ${area}. Areas: HOME, ADD, CONNECTION, SUMMARY, PAY.`);
    process.exit(2);
  }
}

async function serverUp(): Promise<boolean> {
  try {
    const res = await fetch(`${base}/`, { signal: AbortSignal.timeout(4000) });
    return res.ok;
  } catch {
    return false;
  }
}

let devServer: ReturnType<typeof spawn> | null = null;
if (!(await serverUp())) {
  if (flag('start')) {
    console.log('Starting the dev server (npm run dev)...');
    devServer = spawn('npm', ['run', 'dev'], { stdio: 'ignore', detached: false });
    for (let i = 0; i < 60 && !(await serverUp()); i++) await new Promise((r) => setTimeout(r, 500));
  }
  if (!(await serverUp())) {
    console.error(`The app is not reachable at ${base}/. Start it with "npm run dev" (port 8810) or pass --start.`);
    devServer?.kill();
    process.exit(2);
  }
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { ...VIEWPORT },
  deviceScaleFactor: DEVICE_SCALE,
  locale: 'en-IN',
  timezoneId: 'Asia/Kolkata',
  colorScheme: 'light',
  reducedMotion: flag('reduced') ? 'reduce' : 'no-preference',
  permissions: ['clipboard-read', 'clipboard-write'],
  serviceWorkers: 'block',
});

const results: FrameResult[] = new Array(frames.length);
let next = 0;
async function worker() {
  while (next < frames.length) {
    const i = next++;
    const frame = frames[i]!;
    // A fresh page per frame: no state carries over from the one before.
    const page = await context.newPage();
    results[i] = await measureFrame(page, base, frame);
    await page.close();
    process.stderr.write(`  ${frame.id} done\n`);
  }
}
await Promise.all(Array.from({ length: Math.min(jobs, frames.length) }, worker));
await browser.close();
devServer?.kill();

console.log('\n' + formatTable(results));
const measured = results.filter((r) => r.comparison);
const passing = measured.filter((r) => passes(r)).length;
console.log(`\n${passing} of ${results.length} frames pass: within ${STRICT_LIMIT_PCT} %, the same size, no flat fill in another colour. Images: tests/visual/out/<id>-side.png`);
const noisy = results.filter((r) => r.errors.length > 0);
for (const r of noisy) console.log(`console errors on ${r.frame.id}: ${r.errors.slice(0, 3).join(' | ')}`);
if (measured.length > 0) console.log(`Overview: ${writeIndex(results)}`);

process.exit(strict && passing < results.length ? 1 : 0);
