import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Fragment, useId } from 'react';
import { Card, EASE_OUT, Separator, useReduced } from '@/components/ohm';
import { formatUnits } from '@/lib/format';
import { cn } from '@/lib/utils';
import { signedPct, type TrendMonth } from '../trends-data';

/**
 * Figma: Month table (Range 2026 | 2025, Open No | Yes). "Every month" with a count; open, it lists the months newest first
 * (month, units, change on the month before). The selected month's row is `surface-muted`; tapping a row selects that month.
 */
export function MonthTable({
  months,
  selectedKey,
  onSelect,
  open,
  onOpenChange,
}: {
  months: readonly TrendMonth[];
  selectedKey: string;
  onSelect: (key: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const reduced = useReduced();
  const panelId = useId();
  const newestFirst = [...months].reverse();
  return (
    <Card padding={0}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
        className="flex h-14 w-full items-center gap-2 px-4 text-left outline-none transition-colors duration-150 active:bg-surface-muted focus-visible:bg-primary-subtle"
      >
        <span className="flex-1 text-base font-medium text-ink-strong">Every month</span>
        <span className="text-xs text-ink-muted">{`${months.length} months`}</span>
        <ChevronDown
          size={16}
          aria-hidden
          className={cn('shrink-0 text-ink-muted transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="rows"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0.15 } : { duration: 0.28, ease: EASE_OUT }}
          >
            <div className="grid h-8 grid-cols-[1fr_110px_82px] items-center px-4 text-xs font-medium text-ink-muted">
              <span>Month</span>
              <span className="text-right">Units</span>
              <span className="text-right">Change</span>
            </div>
            {newestFirst.map((m, i) => (
              <Fragment key={m.month}>
                {i > 0 && <Separator inset="16" />}
                <button
                  type="button"
                  aria-current={m.month === selectedKey || undefined}
                  onClick={() => onSelect(m.month)}
                  className={cn(
                    'grid h-11 w-full grid-cols-[1fr_110px_82px] items-center px-4 text-left text-sm outline-none transition-colors duration-200',
                    m.month === selectedKey ? 'bg-surface-muted' : 'active:bg-surface-muted',
                  )}
                >
                  <span className="font-medium text-ink">{m.tableLabel}</span>
                  <span className="text-right font-semibold text-ink-strong">{formatUnits(m.units)}</span>
                  <span className="text-right text-ink-muted">{m.changePct === null ? 'First' : signedPct(m.changePct)}</span>
                </button>
              </Fragment>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
