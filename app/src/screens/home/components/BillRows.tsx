import { ChevronRight } from 'lucide-react';
import { Badge, IconTile, ListRow } from '@/components/ohm';
import { DUE_DATE, EARLY_DEADLINE, JULY_BILL, JULY_SAVING, SAVING, TOTAL } from '@/data/bill';
import { formatDate, formatINR } from '@/lib/format';
import { PiggyBankIcon, ReceiptIndianRupeeIcon } from './icons';

/** Figma: List row / July 2026 (Surface Card, Layout Default): the paid bill with its "Saved" badge. */
export function PaidBillRow({
  surface = 'card',
  title = 'July 2026',
  paidOn = formatDate(JULY_BILL.paidOn),
  amount = JULY_BILL.paid,
  saved = JULY_SAVING,
  onClick,
}: {
  surface?: 'card' | 'plain';
  title?: string;
  paidOn?: string;
  amount?: number;
  saved?: number;
  onClick?: () => void;
}) {
  return (
    <ListRow
      surface={surface}
      leading={<IconTile icon={ReceiptIndianRupeeIcon} tone="muted" size={36} />}
      title={title}
      subtitle={<span className="whitespace-nowrap">{`Paid ${paidOn}`}</span>}
      value={formatINR(amount)}
      badge={
        <Badge tone="success" size="s">
          {`Saved ${formatINR(saved)}`}
        </Badge>
      }
      onClick={onClick}
    />
  );
}

/**
 * Figma: List row / August 2026 (Surface Card, Layout Badge below). The bill still to pay: the offer badge sits under the
 * text, in line with it (52 px in), because it is too wide for the right column.
 */
export function ToPayBillRow({ discountEnded, onClick }: { discountEnded: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col gap-2.5 rounded-2xl bg-card px-4 py-3.5 text-left transition-colors duration-150 outline-none active:bg-surface-muted focus-visible:bg-primary-subtle"
    >
      <span className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center">
          <IconTile icon={ReceiptIndianRupeeIcon} tone="primary" size={36} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-base font-medium text-ink">August 2026</span>
          <span className="text-sm text-ink-muted">{`Due ${formatDate(DUE_DATE)}`}</span>
        </span>
        <span className="text-base font-semibold text-ink-strong">{formatINR(TOTAL)}</span>
        <ChevronRight size={16} aria-hidden className="shrink-0 text-ink-muted" />
      </span>
      <span className="flex pl-[52px]">
        {discountEnded ? (
          <Badge tone="neutral" size="s">{`Discount ended ${formatDate(EARLY_DEADLINE)}`}</Badge>
        ) : (
          <Badge tone="success" size="s" icon={PiggyBankIcon}>
            {`Save ${formatINR(SAVING)} by ${formatDate(EARLY_DEADLINE)}`}
          </Badge>
        )}
      </span>
    </button>
  );
}
