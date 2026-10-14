import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ListRowSurface = 'plain' | 'card';

export interface ListRowProps {
  /** Plain rows sit inside a `<Card padding={0}>` with `<Separator inset="left-68" />` between them. Card is its own white card. */
  surface?: ListRowSurface;
  /** The leading visual, usually an `<IconTile />` or a `<BillStatusMini />`. It sits in a 40 x 40 box. */
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Right aligned, Text-base/Semi Bold (Figma draws it with proportional figures). */
  value?: ReactNode;
  /** Shown under the value, usually a `<Badge size="s" />`. */
  badge?: ReactNode;
  /** A trailing Link M (for example "See trends"). A row with an action is not itself tappable. */
  action?: ReactNode;
  /** Default true. */
  chevron?: boolean;
  /** Makes the whole row a button. */
  onClick?: () => void;
  className?: string;
}

/**
 * Figma: Ohm / List row (Surface Plain | Card). 68 tall at least, padding 12 16, 12 between parts.
 * The text column starts at x 68 so it lines up with Separator Left 68.
 */
export function ListRow({
  surface = 'card',
  leading,
  title,
  subtitle,
  value,
  badge,
  action,
  chevron = true,
  onClick,
  className,
}: ListRowProps) {
  const tappable = onClick && !action;
  const classes = cn(
    'flex min-h-[68px] w-full items-center gap-3 px-4 py-3 text-left',
    surface === 'card' && 'overflow-hidden rounded-2xl bg-card',
    tappable &&
      'transition-colors duration-150 active:bg-surface-muted outline-none focus-visible:bg-primary-subtle',
    className,
  );
  const content = (
    <>
      {leading && <span className="grid size-10 shrink-0 place-items-center">{leading}</span>}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-base font-medium text-ink">{title}</span>
        {subtitle && <span className="text-sm text-ink-muted">{subtitle}</span>}
      </span>
      {(value || badge) && (
        <span className="flex shrink-0 flex-col items-end gap-0.5 text-right">
          {value && <span className="text-base font-semibold text-ink-strong">{value}</span>}
          {badge}
        </span>
      )}
      {action}
      {chevron && <ChevronRight size={16} aria-hidden className="shrink-0 text-ink-muted" />}
    </>
  );
  return tappable ? (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  ) : (
    <div className={classes}>{content}</div>
  );
}
