import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { EASE_IN_OUT, EASE_OUT, pick, useReduced } from './motion';
import { RazorpayLogo } from './RazorpayLogo';

export interface RazorpayLoaderProps {
  /** How long the loader shows before `onComplete` (default 1500 ms, the simulated hand-off to Razorpay). */
  durationMs?: number;
  onComplete?: () => void;
  className?: string;
}

/**
 * "Opening Razorpay": the Razorpay logo breathing above a thin indeterminate progress bar. Simulated:
 * nothing is opened, it just waits `durationMs` and calls `onComplete`.
 * Brand / Razorpay logo is Figma 18:30287.
 */
export function RazorpayLoader({ durationMs = 1500, onComplete, className }: RazorpayLoaderProps) {
  const reduced = useReduced();

  // The latest callback, so a parent re-render never restarts the timer.
  const latest = useRef(onComplete);
  useEffect(() => {
    latest.current = onComplete;
  });
  useEffect(() => {
    const id = window.setTimeout(() => latest.current?.(), durationMs);
    return () => window.clearTimeout(id);
  }, [durationMs]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-5 ${className ?? ''}`}
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={pick(reduced, { duration: 0.24, ease: EASE_OUT })}
    >
      <motion.div
        animate={reduced ? undefined : { scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }}
        transition={reduced ? undefined : { duration: 1.4, ease: EASE_IN_OUT, repeat: Infinity }}
      >
        <RazorpayLogo width={140} />
      </motion.div>
      <div
        className="relative h-[3px] w-[168px] overflow-hidden rounded-full bg-surface-muted"
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-[45%] rounded-full bg-primary"
          initial={{ x: '-100%' }}
          animate={reduced ? { x: '60%' } : { x: ['-100%', '230%'] }}
          transition={
            reduced
              ? undefined
              : { duration: 1.15, ease: EASE_IN_OUT, repeat: Infinity, repeatDelay: 0.1 }
          }
        />
      </div>
      <p className="text-sm text-ink-muted">Opening Razorpay</p>
    </motion.div>
  );
}
