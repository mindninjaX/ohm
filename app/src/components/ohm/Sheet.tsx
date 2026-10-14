import { AnimatePresence, motion, useDragControls, type PanInfo } from 'motion/react';
import { useContext, useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { SheetPanel } from './SheetPanel';
import { DURATION, SPRING, useReduced } from './lib/motion';
import { PortalContainerContext } from './lib/portal';

export interface SheetProps {
  open: boolean;
  /** Called with `false` for the close button, the scrim, Escape and a drag down. */
  onOpenChange: (open: boolean) => void;
  title?: string;
  /** Figma "Show title". Off hides the whole title row (keep `title` for screen readers). Default true. */
  showTitle?: boolean;
  /** Figma "Footer": one or two `<Button />`s pinned under the content (Button 1 Primary L, Button 2 Secondary L). */
  footer?: ReactNode;
  /** Figma "Padding Flush": no side padding in the content, for full-bleed bodies. */
  flush?: boolean;
  children?: ReactNode;
  /** Mount point. Defaults to the shell's PortalContainerContext, then document.body. */
  container?: HTMLElement | null;
  className?: string;
}

/** Drag down past this many pixels, or faster than this many px/s, and the sheet closes. The shell's sheet routes use the same numbers. */
export const CLOSE_DISTANCE = 110;
export const CLOSE_VELOCITY = 500;

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])';

/**
 * Figma: Ohm / Sheet + Ohm / Scrim. A plain web bottom sheet: white, top corners 20, no blur.
 * A 36 x 4 grabber, a 56 title row with a close button, the content (padding 0 20 20, 16 between
 * children), an optional footer and the home indicator zone.
 *
 * It slides up on a spring while the scrim fades in; drag the grabber or title row down to
 * dismiss (distance or velocity), tap the scrim or press Escape to close. With reduced motion it
 * fades and cannot be dragged.
 */
export function Sheet({
  open,
  onOpenChange,
  title,
  showTitle = true,
  footer,
  flush = false,
  children,
  container,
  className,
}: SheetProps) {
  const reduced = useReduced();
  const contextContainer = useContext(PortalContainerContext);
  const target = container ?? contextContainer ?? document.body;
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  // The latest callback, so a parent that passes a new function every render does not restart the effect below.
  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });

  // Escape closes; focus moves into the sheet and returns to what had it before.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onOpenChangeRef.current(false);
      }
    };
    document.addEventListener('keydown', onKey);
    const raf = requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
    return () => {
      document.removeEventListener('keydown', onKey);
      cancelAnimationFrame(raf);
      previous?.focus({ preventScroll: true });
    };
  }, [open]);

  const keepFocusInside = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0]!;
    const last = items[items.length - 1]!;
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.velocity.y > CLOSE_VELOCITY || info.offset.y > CLOSE_DISTANCE) onOpenChange(false);
  };

  const enter = reduced ? { opacity: 0 } : { y: '100%' };
  const shown = reduced ? { opacity: 1 } : { y: 0 };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div data-slot="sheet-root" className="pointer-events-auto fixed inset-0 z-50 overflow-hidden">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 touch-none bg-ink-strong/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.base, ease: 'easeOut' }}
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title && showTitle ? titleId : undefined}
            aria-label={title && !showTitle ? title : undefined}
            tabIndex={-1}
            data-slot="sheet"
            onKeyDown={keepFocusInside}
            className={cn(
              'absolute inset-x-0 bottom-0 flex max-h-[calc(100%-32px)] flex-col outline-none',
              className,
            )}
            initial={enter}
            animate={shown}
            exit={enter}
            transition={reduced ? { duration: DURATION.fast } : SPRING.sheet}
            drag={reduced ? false : 'y'}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.7 }}
            onDragEnd={onDragEnd}
          >
            <SheetPanel
              title={title}
              showTitle={showTitle}
              titleId={titleId}
              footer={footer}
              flush={flush}
              onClose={() => onOpenChange(false)}
              onHandlePointerDown={reduced ? undefined : (e) => dragControls.start(e)}
            >
              {children}
            </SheetPanel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    target,
  );
}
