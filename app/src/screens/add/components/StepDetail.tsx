import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { EASE_OUT, useReduced } from '@/components/ohm';
import { formatINR } from '@/lib/format';
import type { DetailRow } from '../readingContent';

/** A rupee amount that counts up from 0 once, then shows the plain figure (no tabular digits left over). */
function CountUp({ rupees, delay }: { rupees: number; delay: number }) {
  const reduced = useReduced();
  const progress = useMotionValue(0);
  const shown = useTransform(progress, (v) => formatINR(Math.round(v)));
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(progress, rupees, { duration: 0.9, delay, ease: EASE_OUT, onComplete: () => setDone(true) });
    return () => controls.stop();
  }, [progress, rupees, delay, reduced]);

  if (done) return <>{formatINR(rupees)}</>;
  return (
    <>
      <span className="sr-only">{formatINR(rupees)}</span>
      <motion.span aria-hidden="true" className="tabular-nums">
        {shown}
      </motion.span>
    </>
  );
}

export interface StepDetailProps extends Omit<DetailRow, 'id'> {
  /** The first time this step opens its rows arrive one after another and the amounts count up. */
  play?: boolean;
  /** Position in the list, for the stagger. */
  index?: number;
}

/**
 * Figma: Step detail (20:21019). A line with the label (Text-sm/Medium `ink`) and the value right-aligned
 * (Text-sm/Semi Bold `ink-strong`), 12 apart, and an optional note under it (Text-xs/Regular `ink-muted`, 2 below).
 */
export function StepDetail({ label, value, note, play = false, index = 0 }: StepDetailProps) {
  const reduced = useReduced();
  const delay = 0.12 + index * 0.06;
  return (
    <motion.div
      data-slot="step-detail"
      className="flex flex-col gap-0.5"
      initial={play ? (reduced ? { opacity: 0 } : { opacity: 0, y: 6 }) : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT, delay: play ? delay : 0 }}
    >
      <div className="flex gap-3">
        <span className="min-w-0 flex-1 text-sm font-medium text-ink">{label}</span>
        <span className="text-right text-sm font-semibold text-ink-strong">
          {'rupees' in value ? (
            play ? <CountUp rupees={value.rupees} delay={delay} /> : formatINR(value.rupees)
          ) : (
            value.text
          )}
        </span>
      </div>
      {note && <p className="text-xs whitespace-pre-line text-ink-muted">{note}</p>}
    </motion.div>
  );
}
