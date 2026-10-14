import { Children, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT, STAGGER, DURATION, useReduced } from './lib/motion';

export interface RevealProps {
  /** Position in a group: each step adds 50 ms of delay (capped at 8 steps). */
  index?: number;
  /** Extra delay in seconds. */
  delay?: number;
  /** Show the child in place with no entrance (it has already played once). */
  skip?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Fades and lifts its child 10 px into place (300 ms ease-out). With reduced motion it only fades.
 * Plays once, when it first mounts.
 */
export function Reveal({ index = 0, delay = 0, skip = false, className, children }: RevealProps) {
  const reduced = useReduced();
  return (
    <motion.div
      className={className}
      initial={skip ? false : reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? DURATION.fast : DURATION.slow,
        ease: EASE_OUT,
        delay: reduced ? 0 : delay + Math.min(index, 8) * STAGGER,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Wraps every child in a Reveal, one after the other. Use it for a stack of cards. `skip` shows them in place. */
export function Stagger({ children, className, skip = false }: { children: ReactNode; className?: string; skip?: boolean }) {
  return (
    <>
      {Children.toArray(children).map((child, i) => (
        <Reveal key={i} index={i} skip={skip} className={className}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
