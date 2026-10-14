import { Equal, EqualNot, FilePenLine, FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SPRING, useReduced } from '@/components/ohm';
import { cn } from '@/lib/utils';

export interface CompareTilesProps {
  /** Left tile: what the bill (or Ohm's reading) says. */
  billCaption: string;
  billValue: string;
  /** Right tile: what the person says. */
  yoursCaption: string;
  /** Null when nothing is typed yet ("Type below"). */
  yoursValue: string | null;
  /** True when both agree: the badge is a green equals; otherwise a warning equals-not. */
  match: boolean;
}

function Caption({ icon: Icon, children }: { icon: typeof FileText; children: string }) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-ink-muted">
      <Icon size={14} aria-hidden className="shrink-0" />
      <span className="truncate">{children}</span>
    </span>
  );
}

/**
 * Figma: Compare tiles (11:12919, State Match | Filled | Empty). Two tiles 16 apart, 96 tall: the bill's number and
 * yours, with your tile outlined in primary once it has a number. A 32 badge sits on the gap: equals (success)
 * when they agree, equals-not (warning) when they do not, none while yours is empty.
 */
export function CompareTiles({ billCaption, billValue, yoursCaption, yoursValue, match }: CompareTilesProps) {
  const reduced = useReduced();
  const filled = yoursValue !== null;
  return (
    <div className="relative flex h-24 gap-4" data-slot="compare-tiles">
      <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-[16px] bg-card p-[14px]">
        <Caption icon={FileText}>{billCaption}</Caption>
        <span className="text-2xl font-semibold text-ink-strong">{billValue}</span>
      </div>
      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col gap-2 rounded-[16px] bg-card transition-[border-color] duration-200',
          filled ? 'border-2 border-primary p-3' : 'border border-line p-[13px]',
        )}
      >
        <Caption icon={FilePenLine}>{yoursCaption}</Caption>
        {filled ? (
          <span className="text-2xl font-semibold text-primary">{yoursValue}</span>
        ) : (
          <span className="text-base text-ink-muted">Type below</span>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center">
        <AnimatePresence initial={false}>
          {filled && (
            <motion.span
              key={match ? 'match' : 'differ'}
              data-slot="compare-badge"
              data-match={match}
              className="grid size-8 place-items-center rounded-full border border-line bg-card"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={reduced ? { duration: 0.12 } : SPRING.pop}
            >
              {match ? (
                <Equal size={16} aria-label="Matches" className="text-success" />
              ) : (
                <EqualNot size={16} aria-label="Does not match" className="text-warning" />
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
