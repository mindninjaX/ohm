import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from 'motion/react';
import { CLOSE_DISTANCE, CLOSE_VELOCITY } from '@/components/ohm/Sheet';
import { SPRING } from '@/components/ohm/lib/motion';
import { EASE_OUT, SCRIM_TRANSITION } from './motion';
import { usePortalContainer } from './viewport';

/**
 * Sheet routes: /add, /add/email, /reading/stop, /connection/wrong, /bill/share, /paid/share,
 * /home/sources. They open over a parent screen (the "background location" pattern):
 *
 *  - the parent screen stays mounted and visible behind a scrim;
 *  - a deep link to a sheet renders the default parent (routes.ts, `sheetParent`) behind it;
 *  - the sheet's component renders only the panel (white, rounded top corners, grabber). The
 *    shell adds the scrim, the spring slide-up, tap on the scrim and Escape to close, focus
 *    handling and `inert` on everything behind. Drag-down starts from the grabber and title
 *    row of `<SheetPanel>` (it reads `useSheetDragHandle()`), the same as the base `<Sheet>`.
 *    A custom sheet body can call `useSheetDragHandle()` itself and put the result on its
 *    own handle's `onPointerDown`. It uses the base sheet's spring and close thresholds.
 *
 * Inside a sheet, `useSheetClose()` returns a function that closes the sheet (and any sheet
 * stacked on it) and lands on the screen behind. A Close button should call it.
 */
interface SheetApi {
  close: () => void;
  /** The route path of the sheet. */
  path: string;
}

const SheetContext = createContext<SheetApi | null>(null);

type StartDrag = (event: ReactPointerEvent) => void;
const SheetDragContext = createContext<StartDrag | null>(null);

/**
 * Inside a sheet route: a function that starts dragging the sheet down. Put it on the
 * `onPointerDown` of a handle (give that handle `touch-none cursor-grab`). Null elsewhere.
 */
export function useSheetDragHandle(): StartDrag | null {
  return useContext(SheetDragContext);
}

/** Close the current sheet. Outside a sheet it goes back one step. */
export function useSheetClose(): () => void {
  const ctx = useContext(SheetContext);
  const navigate = useNavigate();
  return ctx?.close ?? (() => navigate(-1));
}

/** True inside a sheet route. */
export function useIsInSheet(): boolean {
  return useContext(SheetContext) !== null;
}

interface PanelCustom {
  /** A sheet was already open when this panel arrived: swap content instead of rising. */
  swap: boolean;
  /** Another sheet is still open after this panel leaves. */
  stillOpen: boolean;
  reduce: boolean;
}

const panelVariants: Variants = {
  initial: ({ swap, reduce }: PanelCustom) =>
    reduce ? { opacity: 0 } : swap ? { opacity: 0, y: 14 } : { y: '100%' },
  animate: ({ swap, reduce }: PanelCustom) => ({
    opacity: 1,
    y: 0,
    transition: swap || reduce ? { duration: 0.22, ease: EASE_OUT } : SPRING.sheet,
  }),
  exit: ({ stillOpen, reduce }: PanelCustom) =>
    reduce
      ? { opacity: 0, transition: { duration: 0.15 } }
      : stillOpen
        ? { opacity: 0, y: 8, transition: { duration: 0.15, ease: 'easeIn' } }
        : { y: '100%', transition: { duration: 0.26, ease: [0.32, 0.72, 0, 1] } },
};

/**
 * Renders the open sheet, if any, in the portal layer of the phone frame.
 * `renderSheet` gives the route element for a sheet path (the Routes for that location).
 */
export function SheetHost({
  sheetPath,
  onDismiss,
  renderSheet,
}: {
  /** Pathname of the open sheet, or null when none is open. */
  sheetPath: string | null;
  /** Close the sheet and land on the screen behind it. */
  onDismiss: () => void;
  renderSheet: (path: string) => ReactNode;
}) {
  const portal = usePortalContainer();
  const reduce = useReducedMotion() ?? false;
  const open = sheetPath !== null;

  // Was a sheet already open on the previous committed render? Then a new panel swaps in.
  const wasOpen = useRef(false);
  const swap = wasOpen.current;
  useEffect(() => {
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onDismiss();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onDismiss]);

  if (!portal) return null;
  const custom: PanelCustom = { swap, stillOpen: open, reduce };

  return createPortal(
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            data-slot="sheet-scrim"
            aria-hidden="true"
            className="pointer-events-auto absolute inset-0 bg-ink-strong/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SCRIM_TRANSITION}
            onClick={onDismiss}
          />
        )}
      </AnimatePresence>
      <AnimatePresence custom={custom}>
        {sheetPath && (
          <SheetPanel key={sheetPath} path={sheetPath} custom={custom} onDismiss={onDismiss}>
            {renderSheet(sheetPath)}
          </SheetPanel>
        )}
      </AnimatePresence>
    </>,
    portal,
  );
}

function SheetPanel({
  path,
  custom,
  onDismiss,
  children,
}: {
  path: string;
  custom: PanelCustom;
  onDismiss: () => void;
  children: ReactNode;
}) {
  const controls = useDragControls();
  const panelRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  // Focus the panel while it is open, give focus back when it closes, and label the dialog
  // with the first heading inside it.
  useEffect(() => {
    const panel = panelRef.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    panel?.focus({ preventScroll: true });
    const heading = panel?.querySelector<HTMLElement>('h1, h2, [data-slot="sheet-title"]');
    if (panel && heading) {
      heading.id ||= labelId;
      panel.setAttribute('aria-labelledby', heading.id);
    }
    return () => {
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [labelId]);

  // Offsets and velocities are already in app pixels: MobileFrame's MotionConfig divides the
  // pointer position by the frame's scale on desktop.
  const onDragEnd = (_: PointerEvent, info: PanInfo) => {
    if (info.velocity.y > CLOSE_VELOCITY || info.offset.y > CLOSE_DISTANCE) onDismiss();
  };

  const startDrag = useCallback<StartDrag>((e) => controls.start(e), [controls]);

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      data-slot="sheet-route"
      data-sheet-path={path}
      className="pointer-events-auto absolute inset-x-0 bottom-0 flex max-h-[calc(100%-max(var(--safe-top),16px))] flex-col outline-none after:absolute after:inset-x-0 after:top-full after:h-16 after:bg-card"
      custom={custom}
      variants={panelVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      drag="y"
      dragListener={false}
      dragControls={controls}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.02, bottom: 0.7 }}
      dragMomentum={false}
      onDragEnd={onDragEnd}
    >
      <SheetContext.Provider value={{ close: onDismiss, path }}>
        <SheetDragContext.Provider value={startDrag}>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </SheetDragContext.Provider>
      </SheetContext.Provider>
    </motion.div>
  );
}
