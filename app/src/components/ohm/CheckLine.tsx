import { CircleDashed, TriangleAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';
import { EASE_OUT, SPRING, useReduced } from './lib/motion';

export type CheckState = 'pass' | 'look' | 'pending' | 'running';

export interface CheckLineProps {
  state?: CheckState;
  title: ReactNode;
  /** What was found, in one plain sentence. */
  result?: ReactNode;
  /** Also draw the tick when the line first appears. By default it only draws when the state changes to `pass`. */
  animateOnMount?: boolean;
  className?: string;
}

/** circle-check, drawn by hand so the tick can draw itself with pathLength. */
function PassIcon({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-success"
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={reduced ? { duration: 0.15 } : SPRING.pop}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path
        d="m9 12 2 2 4-4"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.32, delay: reduced ? 0 : 0.1, ease: EASE_OUT }}
      />
    </motion.svg>
  );
}

const fade = (reduced: boolean) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: 'easeOut' as const },
});

/**
 * Figma: Ohm / Check line (State Pass | Look | Pending | Running). A 24 icon slot, the Title in
 * Text-sm/Semi Bold `ink-strong` and the Result under it in Text-sm/Regular `ink-muted`. The text column has
 * padding-top 2 and gap 2 (so a line with a result is 44 tall, as in Figma), the icon slot sits at the top. One component
 * for the six checks on Reading and on What Ohm checked. When the state becomes `pass` the circle
 * pops and the tick draws in (a short fade with reduced motion).
 */
export function CheckLine({ state = 'pass', title, result, animateOnMount = false, className }: CheckLineProps) {
  const reduced = useReduced();
  const f = fade(reduced);
  return (
    <div data-slot="check-line" data-state={state} className={cn('flex items-start gap-3', className)}>
      <div className="relative size-6 shrink-0">
        <AnimatePresence initial={animateOnMount}>
          <motion.span
            key={state}
            className="absolute inset-0 grid place-items-center"
            {...(state === 'pass' ? { exit: { opacity: 0 }, transition: { duration: 0.15 } } : f)}
          >
            {state === 'pass' && <PassIcon reduced={reduced} />}
            {state === 'look' && <TriangleAlert size={20} aria-hidden className="text-warning" />}
            {state === 'pending' && <CircleDashed size={20} aria-hidden className="text-ink-muted" />}
            {state === 'running' && <Spinner size={20} />}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5">
        <p className="text-sm font-semibold text-ink-strong">{title}</p>
        {result && <p className="text-sm text-ink-muted">{result}</p>}
      </div>
      <span className="sr-only">
        {state === 'pass' && 'Passed'}
        {state === 'look' && 'Needs a look'}
        {state === 'pending' && 'Waiting'}
        {state === 'running' && 'Checking'}
      </span>
    </div>
  );
}
