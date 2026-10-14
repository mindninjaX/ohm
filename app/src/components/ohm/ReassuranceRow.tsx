import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { REASSURANCE } from '@/data/bill';
import { cn } from '@/lib/utils';
import { BillStatusMini, type MiniState } from '@/illustrations';

export type ReassuranceSurface = 'plain' | 'card';

export interface ReassuranceRowProps {
  /** Plain sits inside a card (361 x 68); Card is its own white card (a 48 mini). */
  surface?: ReassuranceSurface;
  title?: string;
  /** Pass `false` to hide the description line. */
  description?: string | false;
  /** The Bill status mini slot. Defaults to a checked mini sized for the surface. */
  mini?: ReactNode;
  /** Checking, checked or flagged (the Figma art in `src/illustrations`). Default checked. */
  state?: MiniState;
  /** Makes the whole row a button (it opens "What Ohm checked"). */
  onClick?: () => void;
  className?: string;
}

/**
 * Figma: Ohm / Reassurance row (Tone Clear). "No hidden charges or penalties" with its detail,
 * the Figma Bill status mini (State Checked, Tile On, from `src/illustrations`) on the left and a chevron on the right.
 */
export function ReassuranceRow({
  surface = 'plain',
  title = REASSURANCE.phrase,
  description = REASSURANCE.detail,
  mini,
  state = 'checked',
  onClick,
  className,
}: ReassuranceRowProps) {
  const isCard = surface === 'card';
  const classes = cn(
    'flex min-h-[68px] w-full items-center gap-3 text-left',
    isCard ? 'rounded-2xl bg-card px-4 py-3.5' : 'px-5 py-3.5',
    onClick && 'transition-colors duration-150 active:bg-surface-muted outline-none focus-visible:bg-primary-subtle',
    className,
  );
  const content = (
    <>
      {mini ?? <BillStatusMini state={state} size={isCard ? 'l' : 'm'} tile className="shrink-0" />}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-medium text-ink">{title}</span>
        {description !== false && <span className="text-sm text-ink-muted">{description}</span>}
      </span>
      <ChevronRight size={16} aria-hidden className="shrink-0 text-ink-muted" />
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  ) : (
    <div className={classes}>{content}</div>
  );
}
