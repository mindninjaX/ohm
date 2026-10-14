/**
 * Every route in specs/dev/BUILD_PLAN.md, with the Figma screen it renders.
 * Screen ids and names match the frame names in the Figma file ("Screens" page).
 *
 * Two kinds of route:
 *  - screens: full pages that push and pop with a slide (tab switches cross-fade);
 *  - sheets: bottom sheets that open over a parent screen (`sheetParent`). A deep link to a
 *    sheet renders its parent behind it. See src/shell/sheets.tsx.
 */
export interface OhmRoute {
  path: string;
  /** Figma frame id, e.g. "S01.1". */
  id: string;
  /** Figma frame name, e.g. "S01.1 All bills". */
  name: string;
  /** Set on sheet routes: the screen that sits behind the sheet when nothing else does. */
  sheetParent?: string;
}

const route = (path: string, id: string, title: string, sheetParent?: string): OhmRoute => ({
  path,
  id,
  name: `${id} ${title}`,
  ...(sheetParent ? { sheetParent } : {}),
});

export const ROUTES: readonly OhmRoute[] = [
  route('/', 'S01', 'Home'),
  route('/trends', 'S12', 'Trends'),
  route('/bills', 'S01.1', 'All bills'),
  route('/bills/july-2026', 'S01.2', 'July bill'),
  route('/home/sources', 'S01.3', 'Where these numbers come from', '/'),
  route('/notification', 'S02', 'Notification'),
  route('/add', 'S03', 'Add a bill', '/'),
  route('/add/email', 'S03.1', 'Forward the email', '/'),
  route('/reading', 'S04', 'Reading'),
  route('/reading/stop', 'S04.2', 'Stop reading', '/reading'),
  route('/connection', 'S05', 'Your connection'),
  route('/connection/wrong', 'S05.1', 'What looks off', '/connection'),
  route('/connection/on-your-bill', 'S05.2', 'On your bill'),
  route('/connection/fix', 'S05.3', 'Fix contract demand'),
  route('/connection/ask', 'S05.4', 'Ask the Ohm team'),
  route('/bill', 'S06', 'Bill summary'),
  route('/bill/checks', 'S07', 'Checks'),
  route('/bill/breakdown', 'S08', 'Breakdown'),
  route('/bill/share', 'S09', 'Share', '/bill'),
  // The Razorpay step has no Figma frame: a short "Opening Razorpay" loader, then it replaces itself with /paid.
  route('/pay', 'S10', 'Razorpay'),
  route('/paid', 'S11', 'Paid'),
  route('/paid/share', 'S11.1', 'Share receipt', '/paid'),
];

export const SCREEN_ROUTES: readonly OhmRoute[] = ROUTES.filter((r) => !r.sheetParent);
export const SHEET_ROUTES: readonly OhmRoute[] = ROUTES.filter((r) => r.sheetParent);

const SHEET_PARENTS = new Map(SHEET_ROUTES.map((r) => [r.path, r.sheetParent as string]));
/**
 * The component and illustration gallery. A screen to the shell (it gets its own layer and slides),
 * but not one of ROUTES: it is a review page, not part of the product flow.
 */
export const GALLERY_PATH = '/gallery';

const SCREEN_PATHS = new Set([...SCREEN_ROUTES.map((r) => r.path), GALLERY_PATH]);

/** Strip a trailing slash so "/bill/" and "/bill" are the same route. */
export function normalizePath(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function isSheetPath(pathname: string): boolean {
  return SHEET_PARENTS.has(normalizePath(pathname));
}

/** The screen behind a sheet when you land on the sheet directly. "/" for anything unknown. */
export function sheetParentOf(pathname: string): string {
  return SHEET_PARENTS.get(normalizePath(pathname)) ?? '/';
}

/** True when `pathname` is a full screen (not a sheet) that Ohm knows about, including /gallery. */
export function isScreenPath(pathname: string): boolean {
  return SCREEN_PATHS.has(normalizePath(pathname));
}

export type Tab = 'bills' | 'trends';

/**
 * The tab a screen belongs to, or null when it is not a tab screen. Moving between two
 * different tabs cross-fades; everything else slides.
 */
export function tabOf(pathname: string): Tab | null {
  const p = normalizePath(pathname);
  if (p === '/trends') return 'trends';
  if (p === '/' || p === '/bills' || p.startsWith('/bills/')) return 'bills';
  return null;
}
