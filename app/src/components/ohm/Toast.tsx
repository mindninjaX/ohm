import { CircleAlert, CircleCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useContext, useEffect, useId, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Toaster as Sonner, toast as sonner } from 'sonner';
import { cn } from '@/lib/utils';
import { useAppViewport } from '@/shell/viewport';
import { SPRING, useReduced } from './lib/motion';
import { PortalContainerContext } from './lib/portal';

export type ToastTone = 'success' | 'error';

export interface ToastProps {
  tone?: ToastTone;
  /** One line, at most 42 characters. */
  children: ReactNode;
  className?: string;
}

/**
 * Figma: Ohm / Toast (Tone Success | Error). 48 tall, radius 16, white, a 1 px `line` stroke and the Shadow / Toast
 * shadow. A 20 icon (circle-check `success`, circle-alert `danger`) and one line of Text-sm/Medium
 * `ink`. The icon pops in.
 */
export function Toast({ tone = 'success', className, children }: ToastProps) {
  const reduced = useReduced();
  const Icon = tone === 'success' ? CircleCheck : CircleAlert;
  return (
    <div
      role="status"
      data-slot="toast"
      data-tone={tone}
      className={cn(
        'flex h-12 w-full items-center gap-2.5 rounded-2xl border border-line bg-card px-4 text-sm font-medium text-ink',
        'shadow-[0_4px_16px_rgba(9,30,66,0.12)]',
        className,
      )}
    >
      <motion.span
        aria-hidden="true"
        className={cn('grid shrink-0 place-items-center', tone === 'success' ? 'text-success' : 'text-danger')}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduced ? { duration: 0.15 } : { ...SPRING.pop, delay: 0.08 }}
      >
        <Icon size={20} />
      </motion.span>
      <span className="truncate">{children}</span>
    </div>
  );
}

/** Our toasts belong to this toaster only, so another Sonner toaster in the app never shows them. */
const TOASTER_ID = 'ohm';
const SHOW_MS = 2400;
/** Figma: Toast is 361 wide on the 393 frame. */
const TOAST_WIDTH = 361;

function show(tone: ToastTone, message: string): string | number {
  return sonner.custom(() => <Toast tone={tone}>{message}</Toast>, {
    toasterId: TOASTER_ID,
    duration: SHOW_MS,
  });
}

/**
 * Show a toast: `toast.success("Link copied")`, `toast.error("Could not open WhatsApp")`.
 * Needs an `<OhmToaster />` mounted once, inside the phone frame.
 */
export const toast = {
  success: (message: string) => show('success', message),
  error: (message: string) => show('error', message),
  dismiss: () => sonner.dismiss(),
};

/** Every mounted OhmToaster, in mount order. Only the first one draws, so mounting two never doubles a toast. */
const mounted: string[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => void listeners.delete(l);
};

function useIsPrimaryToaster(): boolean {
  const id = useId();
  useEffect(() => {
    mounted.push(id);
    emit();
    return () => {
      mounted.splice(mounted.indexOf(id), 1);
      emit();
    };
  }, [id]);
  return useSyncExternalStore(
    subscribe,
    () => mounted[0] === id,
    () => false,
  );
}

/**
 * The toast host: Sonner, with our Toast as the content. It mounts into the shell's
 * PortalContainerContext (inside the phone frame), top centre 8 px under the status bar (Figma: y 70 with
 * a 62 px bar), full width minus a 16 px gutter each side (361 px in the 393 px frame, on desktop and phone). Mount it once (a second one stays silent).
 */
export function OhmToaster() {
  const contextContainer = useContext(PortalContainerContext);
  const primary = useIsPrimaryToaster();
  // Figma: a 361 px bar on a 393 screen (16 px gutters). Narrower screens keep the gutters.
  const { width: screenWidth } = useAppViewport();
  const barWidth = Math.max(0, Math.min(TOAST_WIDTH, screenWidth - 32));
  if (!primary) return null;
  return createPortal(
    <Sonner
      id={TOASTER_ID}
      position="top-center"
      theme="light"
      visibleToasts={2}
      offset={{ top: 'calc(var(--safe-top, 0px) + 8px)', left: 16, right: 16 }}
      mobileOffset={{ top: 'calc(var(--safe-top, 0px) + 8px)', left: 16, right: 16 }}
      swipeDirections={['top', 'left', 'right']}
      // Sonner only gives the toast a width inside its own phone media query (max-width 600px), so on a
      // desktop frame a toast hugged its text. An explicit width makes it the full bar everywhere.
      toastOptions={{
        unstyled: true,
        toasterId: TOASTER_ID,
        style: { width: 'var(--width)' },
        // Sonner unmounts a dismissed toast after 200 ms but fades it over 400 ms, so it was cut off half
        // faded. 120 ms lets it finish before it goes (and clears quickly when a screen dismisses it).
        className: 'data-[removed=true]:duration-[120ms]!',
      }}
      style={{ '--width': `${barWidth}px` } as CSSProperties}
    />,
    contextContainer ?? document.body,
  );
}
