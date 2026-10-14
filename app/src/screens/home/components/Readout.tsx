import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, type ComponentType } from 'react';
import { Amount, IconButton, useReduced } from '@/components/ohm';
import type { LucideProps } from 'lucide-react';

export type StepperState = { prev: boolean; next: boolean };

/**
 * Figma: Readout (Metric Units | Rupees, Steppers None | Back only | Next only | Both). A small label with an icon,
 * the big figure with its unit, and on the right the two 44 px steppers (Soft icon buttons, 40% when there is no month that way).
 */
export function Readout({
  icon: Icon,
  label,
  units,
  rupees,
  steppers,
  onPrevious,
  onNext,
  changeKey,
}: {
  icon: ComponentType<LucideProps>;
  label: string;
  /** The figure for Units. */
  units?: string;
  /** The figure for Rupees (an amount). */
  rupees?: number;
  /** Omit for no steppers. */
  steppers?: StepperState;
  onPrevious?: () => void;
  onNext?: () => void;
  /** Changes when the figure changes, so the new one can fade in. */
  changeKey: string;
}) {
  const reduced = useReduced();
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);
  return (
    <div className="flex items-center">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-4 items-center gap-1.5">
          <Icon size={14} aria-hidden className="shrink-0 text-ink-muted" />
          <span className="text-xs font-medium text-ink-muted">{label}</span>
        </div>
        <motion.div
          key={changeKey}
          className="flex items-baseline gap-1.5"
          initial={mounted.current && !reduced ? { opacity: 0, y: 4 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {rupees !== undefined ? (
            <Amount value={rupees} size="m" />
          ) : (
            <>
              <span className="text-2xl font-semibold text-ink-strong">{units}</span>
              <span className="text-sm text-ink-muted">units</span>
            </>
          )}
        </motion.div>
      </div>
      {steppers && (
        <div className="flex shrink-0">
          <IconButton icon={ChevronLeft} label="Previous month" variant="soft" disabled={!steppers.prev} onClick={onPrevious} />
          <IconButton icon={ChevronRight} label="Next month" variant="soft" disabled={!steppers.next} onClick={onNext} />
        </div>
      )}
    </div>
  );
}
