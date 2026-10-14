import { PaidCheck } from '@/illustrations';
import { Amount, Badge, Reveal } from '@/components/ohm';
import { formatDate, formatINR } from '@/lib/format';
import { usePaymentView } from '../payment';

/** The paid figure counts up from this share of itself, so a confirmation never reads "Paid ₹0". */
const COUNT_FROM_SHARE = 0.95;

/**
 * Figma: Share / Paid result (28:45533), the top of S11 Paid: the paid bill (168 x 203, Illustration / Bill Hero Done),
 * "Paid ₹36,09,190" at 36 / 40, the date, and a success badge with the saving, 12 apart. It arrives in order: the
 * bill rises and its check pops with the sparkles (PaidCheck), the figure counts up from 95 % of itself, the date and the badge follow.
 */
export function SharePaidResult() {
  const view = usePaymentView();
  return (
    <div data-slot="share-paid-result" className="flex flex-col items-center gap-3">
      <PaidCheck title="Paid" />
      <Reveal delay={0.35} className="flex flex-col items-center gap-1">
        <div className="flex items-end gap-2">
          <h1 className="text-4xl font-semibold text-ink-strong">Paid</h1>
          <Amount
            value={view.amount}
            size="l"
            countUp
            countFrom={view.amount * COUNT_FROM_SHARE}
            replay
            countDelay={0.45}
          />
        </div>
        <p className="text-sm text-ink-muted">{formatDate(view.paidAt, { time: true })}</p>
      </Reveal>
      {view.saved !== null && (
        <Reveal delay={0.6}>
          <Badge tone="success" size="m" icon>
            You saved {formatINR(view.saved)}
          </Badge>
        </Reveal>
      )}
    </div>
  );
}
