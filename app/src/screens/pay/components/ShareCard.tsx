import { Amount } from '@/components/ohm';
import { BILL_MONTH, BUSINESS, DUE_DATE, TOTAL } from '@/data/bill';
import { formatDate } from '@/lib/format';
import { useDemo } from '@/shell';
import { usePaymentView } from '../payment';
import { ShareCardHeading } from './ShareCardHeading';
import { ShareChangeRow } from './ShareChangeRow';
import { ShareOfferStrip } from './ShareOfferStrip';
import { ShareOhmStamp } from './ShareOhmStamp';
import { SharePaidAmount } from './SharePaidAmount';
import { ShareReceiptPanel } from './ShareReceiptPanel';
import { ShareStatusBand, type SharePayment } from './ShareStatusBand';

export interface ShareCardProps {
  /** Figma "Payment": the bill still to pay (S09), or the receipt (S11.1). */
  payment: SharePayment;
}

/** "August 2026" is "August": the card's heading reads "August electricity bill". */
const MONTH_NAME = BILL_MONTH.split(' ')[0];

/**
 * Figma: Share card (28:37776), Checks Clear. The picture the owner receives: white, radius 16, a status band,
 * then a 16 padded body with 12 between its parts.
 *   Unpaid: heading, the bill amount, the early-payment offer (until it ends), the change from July, the Ohm stamp.
 *   Paid: heading, the amount paid with its date, the receipt panel, the Ohm stamp.
 */
export function ShareCard({ payment }: ShareCardProps) {
  const { afterEarlyDeadline } = useDemo();
  const paid = payment === 'paid';
  const view = usePaymentView();
  return (
    <div data-slot="share-card" data-payment={payment} className="overflow-hidden rounded-2xl bg-card">
      <ShareStatusBand
        payment={payment}
        label={paid ? 'Paid' : 'Unpaid'}
        sub={paid ? 'Waiting for Northgrid to confirm' : `Due ${formatDate(DUE_DATE)}`}
      />
      <div className="flex flex-col gap-3 p-4">
        <ShareCardHeading title={`${MONTH_NAME} electricity bill`} subtitle={BUSINESS.name} />
        {paid ? (
          <>
            <SharePaidAmount amount={view.amount} date={formatDate(view.paidAt, { time: true })} />
            <ShareReceiptPanel saved={view.saved} />
          </>
        ) : (
          <>
            <Amount value={TOTAL} size="l" />
            {!afterEarlyDeadline && <ShareOfferStrip />}
            <ShareChangeRow />
          </>
        )}
        <ShareOhmStamp />
      </div>
    </div>
  );
}
