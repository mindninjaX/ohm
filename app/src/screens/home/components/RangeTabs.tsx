import { motion } from 'motion/react';
import { useReduced } from '@/components/ohm';
import { cn } from '@/lib/utils';
import type { TrendYear } from '../trends-data';

const YEARS: readonly TrendYear[] = [2026, 2025];

/** Figma: Range tabs (Selected 1 | 2). A white pill, 48 tall, two 40 tall tabs; the selected one is `surface-muted`. */
export function RangeTabs({ value, onChange }: { value: TrendYear; onChange: (year: TrendYear) => void }) {
  const reduced = useReduced();
  return (
    <div role="tablist" aria-label="Year" className="flex h-12 rounded-2xl bg-card p-1">
      {YEARS.map((year) => {
        const selected = year === value;
        return (
          <button
            key={year}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => !selected && onChange(year)}
            className="relative flex h-10 flex-1 items-center justify-center rounded-xl text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-primary/40"
          >
            {selected && (
              <motion.span
                layoutId="trends-range-pill"
                aria-hidden
                className="absolute inset-0 bg-surface-muted"
                style={{ borderRadius: 12 }}
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <span className={cn('relative transition-colors duration-200', selected ? 'font-semibold text-ink-strong' : 'font-medium text-ink-muted')}>
              {year}
            </span>
          </button>
        );
      })}
    </div>
  );
}
