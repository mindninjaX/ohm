import { useCallback, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigationType,
  type Location,
} from 'react-router';
import { AnimatePresence, motion, useIsPresent, useReducedMotion, type Variants } from 'motion/react';
import {
  GALLERY_PATH,
  SCREEN_ROUTES,
  SHEET_ROUTES,
  isScreenPath,
  isSheetPath,
  normalizePath,
  sheetParentOf,
  tabOf,
  type OhmRoute,
} from '@/routes';
import { toast } from '@/components/ohm';
import { GalleryPage } from './GalleryPage';
import { HistoryTracker, readHistoryStateIndex } from './history';
import { PUSH_DISTANCE, SCREEN_TRANSITION } from './motion';
import { ShellPlaceholder, ShellPlaceholderSheet } from './Placeholders';
import { screenFor } from './screens';
import { SheetHost } from './sheets';

/**
 * Screen transitions and sheet routes.
 *
 * Every full screen is a "layer": an absolutely positioned, vertically scrolling page that
 * fills the app. Changing screen mounts a new layer and lets the old one leave:
 *  - forward (push): the old layer fades out (90 ms), then the new one slides in from the right
 *    (24 px) and fades in (fade-through: both screens are never readable at once);
 *  - back (pop): the current layer slides out to the right and fades out, then the one below
 *    settles in the same way;
 *  - tab switch (Bills and Trends): a quick fade-through, no slide;
 *  - reduced motion: the tab fade-through.
 * Direction comes from the history position (history.ts), so browser back and forward work.
 *
 * Sheet routes render over a background screen (see sheets.tsx). The background location is,
 * in order: the one saved when this history entry was first opened, `state.backgroundLocation`
 * if the link passed one, the last screen we showed, or the sheet's default parent.
 */

type TransitionKind = 'forward' | 'back' | 'tab' | 'none';
interface LayerCustom {
  kind: TransitionKind;
}
/** The latest decision about how the screen layer changes (see AnimatedRoutes). */
interface LayerState {
  key: string;
  kind: TransitionKind;
}

/**
 * Fade-through: the two screens are never both readable. The leaving layer fades out fast
 * (90 ms) and the arriving one starts fading in just as it is gone (80 to 90 ms in), so
 * text from one screen never shows through the other. The slide (24 px, 250 ms) runs on its
 * own clock underneath.
 */
const FADE_OUT = { duration: 0.09, ease: 'easeIn' } as const;
const FADE_IN = { duration: 0.16, delay: 0.08, ease: 'easeOut' } as const;
const TAB_FADE_OUT = { duration: 0.08, ease: 'easeIn' } as const;
const TAB_FADE_IN = { duration: 0.14, delay: 0.06, ease: 'easeOut' } as const;

const layerVariants: Variants = {
  initial: ({ kind }: LayerCustom) => {
    if (kind === 'forward') return { opacity: 0, x: PUSH_DISTANCE };
    if (kind === 'back') return { opacity: 0, x: -12 };
    if (kind === 'tab') return { opacity: 0, x: 0 };
    return { opacity: 1, x: 0 };
  },
  animate: ({ kind }: LayerCustom) => ({
    opacity: 1,
    x: 0,
    transition:
      kind === 'forward' || kind === 'back'
        ? { x: SCREEN_TRANSITION, opacity: FADE_IN }
        : kind === 'tab'
          ? { opacity: TAB_FADE_IN }
          : SCREEN_TRANSITION,
  }),
  exit: ({ kind }: LayerCustom) => {
    if (kind === 'back') {
      // The leaving screen slides away to the right while it fades out.
      return { opacity: 0, x: PUSH_DISTANCE, transition: { x: SCREEN_TRANSITION, opacity: FADE_OUT } };
    }
    if (kind === 'tab') {
      return { opacity: 0, transition: { opacity: TAB_FADE_OUT } };
    }
    // Forward: drift left a little while fading out, before the new screen arrives.
    return { opacity: 0, x: -12, transition: { x: SCREEN_TRANSITION, opacity: FADE_OUT } };
  },
};

/** Scroll position of each history entry, so a back navigation returns to where you were. */
const scrollMemory = new Map<string, number>();

function ScreenLayer({
  location,
  custom,
  kindRef,
  restoreScroll,
  inertBehindSheet,
  children,
}: {
  location: Location;
  custom: LayerCustom;
  /**
   * The live transition decision. A leaving layer keeps the props it had when it was last
   * rendered, so its own `custom` is stale; the ref is how it learns which way the app moved.
   */
  kindRef: { readonly current: LayerState };
  restoreScroll: boolean;
  inertBehindSheet: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isPresent = useIsPresent();
  const reduce = useReducedMotion() ?? false;
  const keyRef = useRef(location.key);
  keyRef.current = location.key;

  // A pushed screen starts at the top; a popped one returns to where it was left.
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && restoreScroll) el.scrollTop = scrollMemory.get(keyRef.current) ?? 0;
    // Only on mount.
  }, []);

  // Stacking: the arriving layer is 1. A leaving layer goes above it on a back (it slides away
  // to the right, revealing the screen below) and below it on a push or a tab switch (the new
  // screen covers it). Plain `style`, because a variant's zIndex does not apply on exit.
  const leavingKind = kindRef.current.kind;
  const effectiveKind = reduce && leavingKind !== 'none' ? 'tab' : leavingKind;
  const zIndex = isPresent ? 1 : effectiveKind === 'back' ? 2 : 0;

  return (
    <motion.div
      ref={ref}
      data-slot="screen-layer"
      data-path={location.pathname}
      className="absolute inset-0 flex flex-col overflow-x-hidden overflow-y-auto overscroll-contain bg-surface-muted"
      style={{ zIndex }}
      custom={custom}
      variants={layerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      inert={!isPresent || inertBehindSheet}
      onScroll={(e) => {
        scrollMemory.set(keyRef.current, e.currentTarget.scrollTop);
      }}
    >
      {children}
    </motion.div>
  );
}

function screenElement(route: OhmRoute): ReactNode {
  const Screen = screenFor(route.path);
  return Screen ? <Screen /> : route.sheetParent ? <ShellPlaceholderSheet route={route} /> : <ShellPlaceholder route={route} />;
}

function ScreenRoutes({ location }: { location: Location }) {
  return (
    <Routes location={location}>
      {SCREEN_ROUTES.map((r) => (
        <Route key={r.path} path={r.path} element={screenElement(r)} />
      ))}
      {/* A dev and review page, not one of the routes in routes.ts. */}
      <Route path={GALLERY_PATH} element={<GalleryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function SheetRoutes({ location }: { location: Location }) {
  return (
    <Routes location={location}>
      {SHEET_ROUTES.map((r) => (
        <Route key={r.path} path={r.path} element={screenElement(r)} />
      ))}
    </Routes>
  );
}

interface ScreenEntry {
  location: Location;
  /** History index of the entry, when known. */
  index: number | null;
}

function defaultLocation(pathname: string): Location {
  return { pathname, search: '', hash: '', state: null, key: `default:${pathname}` };
}

function backgroundFromState(state: unknown): Location | null {
  if (state && typeof state === 'object' && 'backgroundLocation' in state) {
    const bg = (state as { backgroundLocation: unknown }).backgroundLocation;
    if (bg && typeof bg === 'object' && 'pathname' in bg && typeof bg.pathname === 'string') {
      return bg as Location;
    }
  }
  return null;
}

/**
 * Screens that sit outside the app (the lock screen and the Razorpay page). An in-app toast
 * ("Copied", "Link copied") must not follow the person onto them.
 */
const OUTSIDE_APP_SCREENS: ReadonlySet<string> = new Set(['/notification', '/pay']);

/** All routes, with screen transitions and sheets. Render once, inside a router. */
export function AnimatedRoutes() {
  const location = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();
  const reduce = useReducedMotion() ?? false;

  const trackerRef = useRef<HistoryTracker | null>(null);
  trackerRef.current ??= new HistoryTracker();
  const nav = trackerRef.current.update(location.key, navType, readHistoryStateIndex());

  const sheetOpen = isSheetPath(location.pathname);

  // The last full screen we showed, and the background chosen for each sheet entry.
  const lastScreen = useRef<ScreenEntry | null>(null);
  const sheetBackgrounds = useRef(new Map<string, ScreenEntry>());
  useEffect(() => {
    if (!sheetOpen) lastScreen.current = { location, index: nav.index };
  });

  let screenEntry: ScreenEntry = { location, index: nav.index };
  if (sheetOpen) {
    const known = sheetBackgrounds.current.get(location.key);
    const fromState = backgroundFromState(location.state);
    screenEntry =
      known ??
      (fromState
        ? { location: fromState, index: null }
        : navType !== 'POP' && lastScreen.current
          ? lastScreen.current
          : { location: defaultLocation(sheetParentOf(location.pathname)), index: null });
    if (!known) sheetBackgrounds.current.set(location.key, screenEntry);
  }

  const screenLocation = screenEntry.location;
  const screenKey = isScreenPath(screenLocation.pathname) ? normalizePath(screenLocation.pathname) : '/';

  // Decide how the screen layer changes, once per change of screen.
  const layerState = useRef<LayerState>({ key: screenKey, kind: 'none' });
  if (layerState.current.key !== screenKey) {
    const fromTab = tabOf(layerState.current.key);
    const toTab = tabOf(screenKey);
    const kind: TransitionKind =
      fromTab && toTab && fromTab !== toTab ? 'tab' : nav.direction === 'back' ? 'back' : 'forward';
    layerState.current = { key: screenKey, kind };
  }
  const custom: LayerCustom = { kind: reduce && layerState.current.kind !== 'none' ? 'tab' : layerState.current.kind };

  // Entering the lock screen or the Razorpay page clears any toast left over from the app.
  useEffect(() => {
    if (OUTSIDE_APP_SCREENS.has(screenKey)) toast.dismiss();
  }, [screenKey]);

  const dismiss = useCallback(() => {
    const bgIndex = screenEntry.index;
    if (bgIndex !== null && nav.index > bgIndex) {
      navigate(bgIndex - nav.index);
    } else {
      navigate({ pathname: screenEntry.location.pathname, search: screenEntry.location.search }, { replace: true });
    }
  }, [navigate, nav.index, screenEntry.index, screenEntry.location.pathname, screenEntry.location.search]);

  return (
    <>
      <div data-slot="screen-stage" className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} custom={custom}>
          <ScreenLayer
            key={screenKey}
            location={screenLocation}
            custom={custom}
            kindRef={layerState}
            restoreScroll={navType === 'POP'}
            inertBehindSheet={sheetOpen}
          >
            <ScreenRoutes location={screenLocation} />
          </ScreenLayer>
        </AnimatePresence>
      </div>
      <SheetHost
        sheetPath={sheetOpen ? normalizePath(location.pathname) : null}
        onDismiss={dismiss}
        renderSheet={() => <SheetRoutes location={location} />}
      />
    </>
  );
}
