import { IndianRupee, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useReduced } from '@/components/ohm';
import { cn } from '@/lib/utils';
import type { TrendMetric } from '../trends-data';

const OPTIONS = [
  { id: 'units', label: 'Units used', descriptor: '1 unit is 1 kWh', Icon: Zap },
  { id: 'rupees', label: 'Bill total', descriptor: 'What Northgrid billed', Icon: IndianRupee },
] as const;

/**
 * Figma: Metric switch (Selected Units | Bill amount). A white pill, 72 tall, two 64 tall triggers with an icon,
 * a label and a one-line descriptor. The selected trigger is `primary-subtle`; the highlight slides between them.
 */
export function MetricSwitch({ value, onChange }: { value: TrendMetric; onChange: (metric: TrendMetric) => void }) {
  const reduced = useReduced();
  return (
    <div role="tablist" aria-label="What to show" className="flex rounded-2xl bg-card p-1">
      {OPTIONS.map(({ id, label, descriptor, Icon }) => {
        const selected = id === value;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => !selected && onChange(id)}
            className="relative flex h-16 flex-1 flex-col justify-center gap-1 rounded-xl p-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-primary/40 active:scale-[0.99] transition-transform"
          >
            {selected && (
              <motion.span
                layoutId="trends-metric-pill"
                aria-hidden
                className="absolute inset-0 bg-primary-subtle"
                style={{ borderRadius: 12 }}
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon size={20} aria-hidden className={cn('transition-colors duration-200', selected ? 'text-primary' : 'text-ink-muted')} />
              <span className={cn('text-sm transition-colors duration-200', selected ? 'font-semibold text-ink-strong' : 'font-medium text-ink-muted')}>
                {label}
              </span>
            </span>
            <span className="relative text-xs text-ink-muted">{descriptor}</span>
          </button>
        );
      })}
    </div>
  );
}
