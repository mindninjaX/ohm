import { MotionGlobalConfig } from 'motion/react';
import type { DateMode, DemoFlag, DemoState } from './demo';
import { DEFAULT_DEMO_STATE } from './demo';

/**
 * Capture mode: `?capture=1` on any URL renders the current route the way the Figma frame is
 * drawn, so a screenshot can be compared with the 2x export pixel by pixel (npm run diff, the
 * dev-only /compare/:frameId page).
 *
 *  - exactly 393 px wide, no bezel, no side panel, no Prototype button;
 *  - the drawn status bar (9:41) on top, the home indicator at the bottom;
 *  - page height = the full content height (no inner scrolling): a 1569 px frame renders 1569 px
 *    tall with the footer or tab bar at the very bottom. At least 852 px. A sheet route is the
 *    exception: a sheet frame is 852 tall, the screen behind it clipped at the phone height;
 *  - every animation jumped to its end state: motion's `skipAnimations`, CSS animations and
 *    transitions at 0 s, count-ups at their final figure, and elements "in view" from the start;
 *  - the demo state comes from `?demo=` (below) and never from localStorage.
 *
 * Screens do not need to know about any of this. The two that must: a long simulated sequence
 * (reading, the Razorpay loader) should show its Figma frame when `useCapture()` is true instead
 * of playing out (see specs/dev/SCREENS.md: /reading = "reading in progress", /reading?open=all =
 * "reading done, every step open"; S06 rests on "Summary discounted").
 *
 *   ?capture=1
 *   &demo=date:after,paid:1     date: before | after; paid, billAdded, connection, first: 1 or 0
 *   &do=click:Copy link         run after load; repeat the param for several; also wait:<ms>
 *
 * The page sets `data-capture-ready="true"` on <html> when fonts are loaded, the actions have run
 * and the layout has settled. Everything else (?open=all, ?info=fuel, ?metric=rupees, ?year=2025,
 * ?month=may, ?state=few|error, ?changed=set|sent) is the route's own query string, per SCREENS.md.
 */

function readSearch(): URLSearchParams {
  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return new URLSearchParams();
  }
}

/** Decided once, when the page loads: a later navigation inside the app keeps the mode. */
export const CAPTURE: boolean = typeof window !== 'undefined' && readSearch().get('capture') === '1';

/** True in capture mode. Screens use it to show a resting frame instead of a long simulation. */
export function isCapture(): boolean {
  return CAPTURE;
}

/** The same as `isCapture()`, as a hook (it never changes during the life of the page). */
export function useCapture(): boolean {
  return CAPTURE;
}

if (CAPTURE) {
  // Every motion animation lands on its final value on the next frame.
  MotionGlobalConfig.skipAnimations = true;
  document.documentElement.dataset.capture = 'true';
  installInViewStub();
}

/**
 * Everything is "in view": useInView and whileInView would otherwise wait for a scroll that
 * never comes in a full-height capture. Observers report the target as visible once.
 */
function installInViewStub(): void {
  class AlwaysInView implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '0px';
    readonly scrollMargin = '0px';
    readonly thresholds: readonly number[] = [0];
    private readonly callback: IntersectionObserverCallback;
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }
    observe(target: Element): void {
      window.setTimeout(() => {
        const rect = target.getBoundingClientRect();
        this.callback(
          [
            {
              target,
              isIntersecting: true,
              intersectionRatio: 1,
              boundingClientRect: rect,
              intersectionRect: rect,
              rootBounds: null,
              time: performance.now(),
            },
          ],
          this,
        );
      }, 0);
    }
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  window.IntersectionObserver = AlwaysInView;
}

// ------------------------------------------------------------------ ?demo=

const DEMO_FLAG_ALIASES: Readonly<Record<string, DemoFlag | 'firstBill'>> = {
  paid: 'paid',
  billadded: 'billAdded',
  connection: 'connectionConfirmed',
  connectionconfirmed: 'connectionConfirmed',
  first: 'firstBill',
  firstbill: 'firstBill',
};

function truthy(value: string): boolean {
  return value === '1' || value === 'true' || value === 'yes' || value === 'on';
}

/**
 * "date:after,paid:1" becomes a demo state. Unknown keys are ignored. Starts from the defaults
 * (Thu 3 Sep, a normal account, nothing paid, the August bill in), never from localStorage.
 */
export function parseDemoParam(raw: string | null): DemoState {
  const state: DemoState = {
    ...DEFAULT_DEMO_STATE,
    flags: { ...DEFAULT_DEMO_STATE.flags },
  };
  if (!raw) return state;
  for (const part of raw.split(',')) {
    const [rawKey, rawValue = '1'] = part.split(':').map((s) => s.trim());
    const key = (rawKey ?? '').toLowerCase();
    if (key === 'date') {
      const mode: DateMode = rawValue === 'after' ? 'after' : 'before';
      state.dateMode = mode;
      continue;
    }
    const flag = DEMO_FLAG_ALIASES[key];
    if (flag === 'firstBill') state.firstBill = truthy(rawValue);
    else if (flag) state.flags[flag] = truthy(rawValue);
  }
  return state;
}

/** The demo state a capture page starts from. */
export function captureDemoState(): DemoState {
  return parseDemoParam(readSearch().get('demo'));
}

// ------------------------------------------------------------------ ?do=

/** Actions to run after load: `?do=click:Copy link&do=wait:300`. */
export function captureActions(): string[] {
  return readSearch().getAll('do');
}

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
const frames = async (n: number) => {
  for (let i = 0; i < n; i++) await nextFrame();
};

function normalise(text: string | null | undefined): string {
  return (text ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function findClickable(label: string): HTMLElement | null {
  const want = normalise(label);
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>('button, a, [role="button"], [role="tab"], [role="menuitem"], [role="switch"]'),
  ).filter((el) => !el.closest('[inert]') && !el.closest('[aria-hidden="true"]'));
  const text = (el: HTMLElement) => normalise(el.getAttribute('aria-label') ?? el.textContent);
  return candidates.find((el) => text(el) === want) ?? candidates.find((el) => text(el).includes(want)) ?? null;
}

/** A full pointer sequence, because Radix controls act on pointerdown or mousedown, not only click. */
function press(el: HTMLElement): void {
  const rect = el.getBoundingClientRect();
  const init = { bubbles: true, cancelable: true, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2, button: 0 };
  el.dispatchEvent(new PointerEvent('pointerdown', { ...init, pointerType: 'mouse', isPrimary: true }));
  el.dispatchEvent(new MouseEvent('mousedown', init));
  el.dispatchEvent(new PointerEvent('pointerup', { ...init, pointerType: 'mouse', isPrimary: true }));
  el.dispatchEvent(new MouseEvent('mouseup', init));
  el.dispatchEvent(new MouseEvent('click', init));
}

async function runAction(action: string): Promise<void> {
  const at = action.indexOf(':');
  const verb = at === -1 ? action : action.slice(0, at);
  const arg = at === -1 ? '' : action.slice(at + 1);
  if (verb === 'wait') {
    await new Promise((r) => window.setTimeout(r, Math.min(Number(arg) || 0, 5000)));
    return;
  }
  if (verb === 'click') {
    // The target may not be in the DOM yet (a screen still mounting): try for up to 3 s.
    for (let i = 0; i < 60; i++) {
      const el = findClickable(arg);
      if (el) {
        press(el);
        await frames(4);
        return;
      }
      await new Promise((r) => window.setTimeout(r, 50));
    }
    console.warn(`[ohm capture] do=click:${arg} found nothing to click`);
  }
}

async function fontsSettled(): Promise<void> {
  if (!document.fonts) return;
  // Fonts start loading when text first lays out, so let the screen paint, then wait until no face is loading.
  await frames(2);
  for (let i = 0; i < 10; i++) {
    try {
      await document.fonts.ready;
    } catch {
      return;
    }
    await frames(2);
    const loading = Array.from(document.fonts).some((f) => f.status === 'loading');
    if (!loading) return;
  }
}

async function imagesSettled(): Promise<void> {
  const images = Array.from(document.images);
  await Promise.all(
    images.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => undefined))),
  );
}

let readyRun: Promise<void> | null = null;

/**
 * Wait for the screen to mount and fonts and images to load, run the `do=` actions, let the
 * layout settle, then set `data-capture-ready="true"` on <html>. Resolves when it is set.
 */
export function markCaptureReady(): Promise<void> {
  // React StrictMode (dev) runs the effect that calls this twice; the `do=` actions must run once.
  readyRun ??= runCaptureReady();
  return readyRun;
}

async function runCaptureReady(): Promise<void> {
  const root = document.documentElement;
  for (let i = 0; i < 100 && !document.querySelector('[data-slot="screen-layer"]'); i++) {
    await new Promise((r) => window.setTimeout(r, 50));
  }
  await fontsSettled();
  await imagesSettled();
  for (const action of captureActions()) await runAction(action);
  await fontsSettled();
  await frames(4);
  root.dataset.captureReady = 'true';
}
