import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { FRAMES, capturePath, findFrame, livePath, type FrameSpec } from '../../tests/visual/screens';

/**
 * /compare/:frameId (dev only, not in the production build): the Figma export next to the live
 * route, with an overlay mode (opacity slider) and a difference blend. For checking a screen by eye;
 * the numbers come from `npm run diff`.
 *
 *   /compare/S06                          side by side
 *   /compare/S06?mode=overlay&o=50        overlay, Figma at 50 %
 *   /compare/S06?mode=overlay&diff=1      difference blend: black where the two agree
 *   &z=2                                  zoom 1, 1.5 or 2 (the frame is 393 px wide at 1)
 *
 * The live side is an iframe on the same route in capture mode (?capture=1, see capture.ts), sized to
 * the content height the page reports, so it is the same picture `npm run diff` takes. The Figma
 * side is tests/figma/<id>.png at half its pixel size.
 */

const FIGMA_FILE_KEY = 'mwmHwXDuayUYeliDAlv3Fo';
const WIDTH = 393;

const figmaImages = import.meta.glob<string>('../../tests/figma/*.png', {
  query: '?url',
  import: 'default',
  eager: true,
});
const manifests = import.meta.glob<Record<string, { exportedAt?: string; pngHeight?: number }>>(
  '../../tests/figma/manifest.json',
  { import: 'default', eager: true },
);
const manifest = Object.values(manifests)[0] ?? {};

function figmaUrl(id: string): string | undefined {
  return figmaImages[`../../tests/figma/${id}.png`];
}

type Mode = 'side' | 'overlay';

export default function ComparePage() {
  const { pathname } = useLocation();
  const id = decodeURIComponent(pathname.replace(/^\/compare\/?/, ''));
  const frame = id ? findFrame(id) : undefined;
  useEffect(() => {
    document.title = frame ? `Compare ${frame.id}` : 'Compare';
  }, [frame]);
  return (
    <div className="min-h-dvh bg-surface-muted text-ink" style={{ overflow: 'auto', position: 'fixed', inset: 0 }}>
      {frame ? <Compare key={frame.id} frame={frame} /> : <Index unknown={id} />}
    </div>
  );
}

function Index({ unknown }: { unknown: string }) {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold text-ink-strong">Compare</h1>
      {unknown && <p className="mt-2 text-danger">No frame called {unknown}.</p>}
      <p className="mt-2 text-ink-muted">Figma export next to the live route. Pick a frame.</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {FRAMES.map((f) => (
          <li key={f.id}>
            <Link
              to={`/compare/${f.id}`}
              className="flex items-baseline justify-between rounded-xl border border-line bg-card px-4 py-3 hover:bg-surface-muted"
            >
              <span className="font-medium text-ink-strong">{f.name}</span>
              <span className="text-xs text-ink-muted">{f.path}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

const btn =
  'inline-flex h-9 items-center rounded-full border border-line bg-card px-3 text-sm font-medium text-ink-strong hover:bg-surface-muted disabled:opacity-40';

function Compare({ frame }: { frame: FrameSpec }) {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const mode: Mode = params.get('mode') === 'overlay' ? 'overlay' : 'side';
  const diff = params.get('diff') === '1';
  const opacity = Math.min(100, Math.max(0, Number(params.get('o') ?? (diff ? 100 : 50))));
  const zoom = [1, 1.5, 2].includes(Number(params.get('z'))) ? Number(params.get('z')) : 1;
  const set = (patch: Record<string, string | null>) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [k, v] of Object.entries(patch)) (v === null ? next.delete(k) : next.set(k, v));
        return next;
      },
      { replace: true },
    );

  const index = FRAMES.findIndex((f) => f.id === frame.id);
  const go = (delta: number) => {
    const target = FRAMES[(index + delta + FRAMES.length) % FRAMES.length]!;
    navigate({ pathname: `/compare/${target.id}`, search: params.toString() });
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // The Figma image, and the live frame's height as the live page reports it.
  const src = figmaUrl(frame.id);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const figmaHeight = natural ? natural.h / 2 : (Number(manifest[frame.id]?.pngHeight) || 1704) / 2;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [liveHeight, setLiveHeight] = useState<number | null>(null);
  const [reload, setReload] = useState(0);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const liveSrc = `${base}${capturePath(frame)}`;

  useEffect(() => {
    const read = () => {
      const doc = iframeRef.current?.contentDocument;
      const el = doc?.querySelector<HTMLElement>('[data-slot="capture-frame"]');
      if (el) setLiveHeight(Math.round(el.getBoundingClientRect().height));
    };
    const t = window.setInterval(read, 400);
    read();
    return () => window.clearInterval(t);
  }, [reload, frame.id]);

  const height = Math.max(liveHeight ?? 0, figmaHeight);
  const sizeMatch = liveHeight !== null && Math.abs(liveHeight - figmaHeight) < 0.5;
  const exportedAt = manifest[frame.id]?.exportedAt;

  const figmaImg = (style?: CSSProperties) =>
    src ? (
      <img
        src={src}
        alt={`${frame.name}, Figma export`}
        width={WIDTH}
        height={figmaHeight}
        draggable={false}
        onLoad={(e) => setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
        style={{ display: 'block', width: WIDTH, height: figmaHeight, ...style }}
      />
    ) : (
      <div style={{ width: WIDTH, height: 400 }} className="grid place-items-center rounded-xl border border-dashed border-line-strong p-6 text-center text-sm text-ink-muted">
        No Figma export for {frame.id}. See scripts/export-figma.md.
      </div>
    );

  const liveFrame = (style?: CSSProperties) => (
    <iframe
      key={reload}
      ref={iframeRef}
      title={`${frame.name}, live`}
      src={liveSrc}
      width={WIDTH}
      height={height}
      style={{ display: 'block', width: WIDTH, height, border: 0, background: 'white', ...style }}
    />
  );

  // Zoom scales the whole stage; the sizing wrapper takes the scaled size so the page scrolls right.
  const stage = (children: ReactNode, cols: number) => (
    <div style={{ width: (WIDTH * cols + (cols - 1) * 24) * zoom, height: height * zoom }}>
      <div
        style={{
          width: WIDTH * cols + (cols - 1) * 24,
          height,
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );

  const figmaLink = `https://www.figma.com/design/${FIGMA_FILE_KEY}/Bill-app?node-id=${frame.nodeId.replace(':', '-')}`;
  const frameHint = useMemo(() => frame.note ?? '', [frame.note]);

  return (
    <>
      <header className="sticky top-0 z-20 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-card px-4 py-3">
        <div className="mr-2">
          <h1 className="text-base font-semibold text-ink-strong">{frame.name}</h1>
          <p className="text-xs text-ink-muted">
            {frame.path}
            {frame.query ? `?${new URLSearchParams(frame.query).toString()}` : ''}
            {frame.demo ? `  demo ${Object.entries(frame.demo).map(([k, v]) => `${k}:${v}`).join(',')}` : ''}
            {frameHint ? `  (${frameHint})` : ''}
          </p>
        </div>
        <button type="button" className={btn} onClick={() => go(-1)} aria-label="Previous frame">
          Prev
        </button>
        <select
          aria-label="Frame"
          value={frame.id}
          onChange={(e) => navigate({ pathname: `/compare/${e.target.value}`, search: params.toString() })}
          className="h-9 rounded-full border border-line bg-card px-3 text-sm text-ink-strong"
        >
          {FRAMES.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        <button type="button" className={btn} onClick={() => go(1)} aria-label="Next frame">
          Next
        </button>
        <span className="mx-1 h-6 w-px bg-line" aria-hidden />
        <div role="group" aria-label="Mode" className="inline-flex overflow-hidden rounded-full border border-line">
          {(['side', 'overlay'] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => set({ mode: m === 'side' ? null : m })}
              className={`h-9 px-3 text-sm font-medium ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-card text-ink-strong hover:bg-surface-muted'}`}
            >
              {m === 'side' ? 'Side by side' : 'Overlay'}
            </button>
          ))}
        </div>
        <label className={`flex items-center gap-2 text-sm ${mode === 'overlay' ? '' : 'opacity-40'}`}>
          Figma opacity
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            disabled={mode !== 'overlay'}
            onChange={(e) => set({ o: e.target.value })}
            aria-label="Figma opacity"
          />
          <output className="w-9 tabular-nums text-ink-muted">{opacity}%</output>
        </label>
        <label className={`flex items-center gap-2 text-sm ${mode === 'overlay' ? '' : 'opacity-40'}`}>
          <input
            type="checkbox"
            checked={diff}
            disabled={mode !== 'overlay'}
            onChange={(e) => set({ diff: e.target.checked ? '1' : null, o: e.target.checked ? '100' : null })}
          />
          Difference blend
        </label>
        <label className="flex items-center gap-2 text-sm">
          Zoom
          <select
            value={zoom}
            onChange={(e) => set({ z: e.target.value === '1' ? null : e.target.value })}
            className="h-9 rounded-full border border-line bg-card px-2 text-sm"
          >
            <option value={1}>100%</option>
            <option value={1.5}>150%</option>
            <option value={2}>200%</option>
          </select>
        </label>
        <button type="button" className={btn} onClick={() => setReload((n) => n + 1)}>
          Reload live
        </button>
      </header>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 px-4 py-2 text-xs text-ink-muted">
        <span>
          Figma {WIDTH} x {figmaHeight}
          {exportedAt ? `, exported ${exportedAt.slice(0, 16).replace('T', ' ')}` : ''}
        </span>
        <span>Live {WIDTH} x {liveHeight ?? '...'}</span>
        {liveHeight !== null && (
          <span className={sizeMatch ? 'font-medium text-success' : 'font-medium text-danger'}>
            {sizeMatch ? 'Same size' : `Height differs by ${liveHeight - figmaHeight > 0 ? '+' : ''}${liveHeight - figmaHeight}px`}
          </span>
        )}
        <a className="text-primary underline" href={liveSrc} target="_blank" rel="noreferrer">
          Open capture
        </a>
        <a className="text-primary underline" href={`${base}${livePath(frame)}`} target="_blank" rel="noreferrer">
          Open in the app
        </a>
        <a className="text-primary underline" href={figmaLink} target="_blank" rel="noreferrer">
          Open in Figma
        </a>
        <span>Arrow keys: previous and next frame</span>
      </div>

      <main className="overflow-auto px-4 pt-8 pb-12">
        {mode === 'side' ? (
          stage(
            <div className="flex" style={{ gap: 24 }}>
              <figure style={{ margin: 0 }}>
                <figcaption className="absolute -mt-5 text-xs font-medium text-ink-muted">Figma</figcaption>
                {figmaImg()}
              </figure>
              <figure style={{ margin: 0 }}>
                <figcaption className="absolute -mt-5 text-xs font-medium text-ink-muted">Live</figcaption>
                {liveFrame()}
              </figure>
            </div>,
            2,
          )
        ) : (
          stage(
            <div style={{ position: 'relative', width: WIDTH, height }}>
              {liveFrame({ position: 'absolute', inset: 0 })}
              <div style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', opacity: opacity / 100, mixBlendMode: diff ? 'difference' : 'normal' }}>
                {figmaImg()}
              </div>
            </div>,
            1,
          )
        )}
      </main>
    </>
  );
}
