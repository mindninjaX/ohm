import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { EASE_OUT, useReduced } from '@/components/ohm';
import { useCapture } from '@/shell';
import { cn } from '@/lib/utils';

/**
 * Lucide's piggy-bank as the Figma file draws it (Icon / piggy-bank, local). lucide-react 0.544
 * ships a newer, larger drawing, so the older paths are kept here to match the frame.
 */
export function PiggyBankIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
      <path d="M2 9v1c0 1.1.9 2 2 2h1" />
      <path d="M16 11h.01" />
    </svg>
  );
}

/**
 * True once the element has been in view (and, when `delayMs` is set, that long after). In capture
 * mode (the visual diff) it is true from the first render so the frame shows its resting state.
 */
export function useSeen<T extends HTMLElement>(delayMs = 0): [RefObject<T | null>, boolean] {
  const capture = useCapture();
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!inView) return;
    if (delayMs <= 0) {
      setReady(true);
      return;
    }
    const id = window.setTimeout(() => setReady(true), delayMs);
    return () => window.clearTimeout(id);
  }, [inView, delayMs]);
  return [ref, capture || ready];
}

export interface GrowBarProps {
  /** Width of the fill as a share of the track, in %. */
  pct: number;
  /** Track height in px (the bar is a pill: radius is half of it). */
  height?: number;
  /** Tailwind classes for the fill colour. */
  fillClassName?: string;
  /** Tailwind classes for the track colour. */
  trackClassName?: string;
  /** Seconds to wait once the bar is in view. */
  delay?: number;
  /** Never narrower than this many px (a tiny share still shows a dot). */
  minPx?: number;
  className?: string;
}

/** A track with a fill that grows from the left when it first scrolls into view. */
export function GrowBar({
  pct,
  height = 6,
  fillClassName = 'bg-line-strong',
  trackClassName = 'bg-surface-muted',
  delay = 0,
  minPx,
  className,
}: GrowBarProps) {
  const reduced = useReduced();
  const [ref, seen] = useSeen<HTMLDivElement>();
  const target = minPx ? `max(${minPx}px, ${pct}%)` : `${pct}%`;
  const radius = height / 2;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('relative w-full overflow-hidden', trackClassName, className)}
      style={{ height, borderRadius: radius }}
    >
      <motion.div
        className={cn('h-full', fillClassName)}
        style={{ borderRadius: radius }}
        initial={{ width: reduced ? target : 0 }}
        animate={{ width: seen || reduced ? target : 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      />
    </div>
  );
}
