/**
 * Every Figma frame that is built, with the route, query and demo state that render it.
 * Source: specs/dev/SCREENS.md (frame > route > state > area). Figma file mwmHwXDuayUYeliDAlv3Fo,
 * page "Screens". Parked frames (S13 family, 900 kVA) are not here.
 *
 * Used by `npm run diff` (scripts/diff.ts), the Playwright test (tests/visual/frames.spec.ts) and
 * the dev-only /compare/:frameId page (src/shell/ComparePage.tsx). Plain data and one pure function:
 * no imports, so Node, Vite and the type checker all read it as it is.
 *
 * `id` is the Figma frame id with the dots turned into dashes ("S01.1" is "S01-1"). It names the
 * Figma export tests/figma/<id>.png and the diff output tests/visual/out/<id>-*.png.
 */

export type Area = 'HOME' | 'ADD' | 'CONNECTION' | 'SUMMARY' | 'PAY';

export interface FrameSpec {
  /** "S01-1": file stem of the Figma export and of the diff output. */
  id: string;
  /** Figma frame name as it was when exported, for people. */
  name: string;
  /** Figma node id, for re-exporting (scripts/export-figma.md). */
  nodeId: string;
  /** Route path, without the app base (/ohm). */
  path: string;
  /** The route's own query params (?open=all, ?metric=rupees, ...). */
  query?: Readonly<Record<string, string>>;
  /** Demo state, sent as ?demo=key:value,key:value (see src/shell/capture.ts). */
  demo?: Readonly<Record<string, string>>;
  /** Actions to run after load, sent as repeated ?do= params (see src/shell/capture.ts). */
  actions?: readonly string[];
  area: Area;
  /** What state the frame shows, when the route alone does not say. */
  note?: string;
}

export const FRAMES: readonly FrameSpec[] = [
  // HOME
  { id: 'S01', name: 'S01 Home', nodeId: '9:7427', path: '/', area: 'HOME' },
  { id: 'S01-4', name: 'S01.4 Home, after paying', nodeId: '30:80509', path: '/', demo: { paid: '1' }, area: 'HOME', note: 'demo flag paid' },
  { id: 'S01-1', name: 'S01.1 All bills', nodeId: '11:11635', path: '/bills', area: 'HOME' },
  { id: 'S01-2', name: 'S01.2 July bill', nodeId: '11:12124', path: '/bills/july-2026', area: 'HOME' },
  { id: 'S01-3', name: 'S01.3 Where these numbers come from', nodeId: '11:12484', path: '/home/sources', area: 'HOME', note: 'sheet over /' },
  { id: 'S12', name: 'S12 Trends', nodeId: '9:7850', path: '/trends', area: 'HOME', note: 'units, 2026, Aug' },
  { id: 'S12-2', name: 'S12.2 Trends, 2025', nodeId: '20:25768', path: '/trends', query: { year: '2025' }, area: 'HOME' },
  { id: 'S12-3', name: 'S12.3 Trends, month selected (May)', nodeId: '20:26344', path: '/trends', query: { month: 'may' }, area: 'HOME' },
  { id: 'S12-4', name: 'S12.4 Trends, Bill amount', nodeId: '20:27101', path: '/trends', query: { metric: 'rupees' }, area: 'HOME' },
  { id: 'S12-5', name: 'S12.5 Trends, Units with fewer than 3 months', nodeId: '20:27573', path: '/trends', query: { state: 'few' }, area: 'HOME', note: 'demo only' },
  { id: 'S12-6', name: 'S12.6 Trends, error', nodeId: '20:27992', path: '/trends', query: { state: 'error' }, area: 'HOME', note: 'demo only' },

  // ADD
  { id: 'S02', name: 'S02 Notification', nodeId: '9:7470', path: '/notification', area: 'ADD' },
  { id: 'S03', name: 'S03 Add a bill', nodeId: '9:7475', path: '/add', area: 'ADD', note: 'sheet over /' },
  { id: 'S03-1', name: 'S03.1 Forward the email', nodeId: '11:10839', path: '/add/email', area: 'ADD', note: 'sheet over /' },
  { id: 'S04', name: 'S04 Reading', nodeId: '9:7521', path: '/reading', area: 'ADD', note: 'reading in progress' },
  { id: 'S04-1', name: 'S04.1 Reading details', nodeId: '20:28427', path: '/reading', query: { open: 'all' }, area: 'ADD', note: 'reading done, every step open' },
  { id: 'S04-2', name: 'S04.2 Stop reading', nodeId: '20:29031', path: '/reading/stop', area: 'ADD', note: 'sheet over /reading' },

  // CONNECTION
  { id: 'S05', name: 'S05 Your connection', nodeId: '9:7555', path: '/connection', area: 'CONNECTION', note: 'rows closed' },
  { id: 'S05-0', name: 'S05.0 Your connection, all rows open', nodeId: '30:47962', path: '/connection', query: { open: 'all' }, area: 'CONNECTION' },
  { id: 'S05-1', name: 'S05.1 What looks off', nodeId: '11:13504', path: '/connection/wrong', area: 'CONNECTION', note: 'sheet over /connection' },
  { id: 'S05-2', name: 'S05.2 On your bill', nodeId: '11:14760', path: '/connection/on-your-bill', area: 'CONNECTION' },
  { id: 'S05-3', name: 'S05.3 Fix contract demand', nodeId: '11:15450', path: '/connection/fix', area: 'CONNECTION' },
  { id: 'S05-4', name: 'S05.4 Ask the Ohm team', nodeId: '11:15577', path: '/connection/ask', area: 'CONNECTION' },
  { id: 'S05-8', name: 'S05.8 Your connection, set by you', nodeId: '11:16230', path: '/connection', query: { changed: 'set' }, area: 'CONNECTION' },
  { id: 'S05-9', name: 'S05.9 Your connection, sent', nodeId: '11:15883', path: '/connection', query: { changed: 'sent' }, area: 'CONNECTION' },

  // SUMMARY
  { id: 'S06', name: 'S06 Bill summary', nodeId: '9:7592', path: '/bill', area: 'SUMMARY', note: 'date Thu 3 Sep; resting state Summary discounted' },
  { id: 'S06-1', name: 'S06.1 After Tue 8 Sep', nodeId: '20:31078', path: '/bill', demo: { date: 'after' }, area: 'SUMMARY', note: 'demo date after' },
  { id: 'S06-2', name: 'S06.2 Bill summary, paid', nodeId: '34:115778', path: '/bill', demo: { paid: '1' }, area: 'SUMMARY', note: 'demo flag paid' },
  { id: 'S07', name: 'S07 Checks', nodeId: '9:7654', path: '/bill/checks', area: 'SUMMARY' },
  { id: 'S08', name: 'S08 Breakdown', nodeId: '9:7679', path: '/bill/breakdown', area: 'SUMMARY' },
  { id: 'S08c', name: 'S08c Breakdown, what a part means', nodeId: '20:30011', path: '/bill/breakdown', query: { info: 'fuel' }, area: 'SUMMARY', note: 'info popover open' },

  // PAY
  { id: 'S09', name: 'S09 Share', nodeId: '9:7722', path: '/bill/share', area: 'PAY', note: 'sheet over /bill' },
  { id: 'S09-1', name: 'S09.1 Link copied', nodeId: '28:39051', path: '/bill/share', actions: ['click:Copy link'], area: 'PAY', note: 'toast "Link copied"' },
  { id: 'S11', name: 'S11 Paid', nodeId: '9:7820', path: '/paid', area: 'PAY' },
  { id: 'S11-1', name: 'S11.1 Share receipt', nodeId: '28:40406', path: '/paid/share', area: 'PAY', note: 'sheet over /paid' },
];

/** "S01.1", "s01-1" and "S01-1" all find the same frame. */
export function normalizeFrameId(input: string): string {
  return input.trim().replace(/\./g, '-').toLowerCase();
}

export function findFrame(input: string): FrameSpec | undefined {
  const want = normalizeFrameId(input);
  return FRAMES.find((f) => f.id.toLowerCase() === want);
}

/**
 * The query string that makes the app render this frame in capture mode, without the leading "?".
 * Route params first, then capture=1, demo, and one do= per action.
 */
export function captureQuery(frame: FrameSpec): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(frame.query ?? {})) params.set(key, value);
  params.set('capture', '1');
  if (frame.demo && Object.keys(frame.demo).length > 0) {
    params.set('demo', Object.entries(frame.demo).map(([k, v]) => `${k}:${v}`).join(','));
  }
  for (const action of frame.actions ?? []) params.append('do', action);
  return params.toString();
}

/** Path plus capture query: "/trends?year=2025&capture=1". Add the app base in front (/ohm). */
export function capturePath(frame: FrameSpec): string {
  return `${frame.path}?${captureQuery(frame)}`;
}

/** The same frame as a person would open it (route params only, no capture mode). */
export function livePath(frame: FrameSpec): string {
  const params = new URLSearchParams(frame.query ?? {});
  const query = params.toString();
  return query ? `${frame.path}?${query}` : frame.path;
}
