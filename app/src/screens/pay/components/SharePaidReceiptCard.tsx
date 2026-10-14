import { Badge, Card, Reveal, Separator } from '@/components/ohm';
import { Clock } from 'lucide-react';
import { BILL_MONTH, PAYMENT, POWER_COMPANY } from '@/data/bill';
import { ShareReceiptRow } from './ShareReceiptRow';

/** Seconds after the screen opens, once the figure above it has started to count. */
const REVEAL_DELAY = 0.55;

/**
 * Figma: Share / Paid receipt card (28:45617). A white card with five 48 tall rows split by 1 px lines (inset 16):
 * Bill, Paid through, Method, Reference, and Status with the warning badge. The card takes the first Reveal index and
 * fades and lifts in with row 1, so it is never an empty white box; the other rows follow, 50 ms apart.
 */
export function SharePaidReceiptCard() {
  const rows: { label: string; value: string }[] = [
    { label: 'Bill', value: `${POWER_COMPANY}, ${BILL_MONTH}` },
    { label: 'Paid through', value: PAYMENT.gateway },
    { label: 'Method', value: `${PAYMENT.method}, ${PAYMENT.bank}` },
    { label: 'Reference', value: `UTR ${PAYMENT.utr}` },
  ];
  return (
    <Reveal delay={REVEAL_DELAY}>
      <Card padding={0} data-slot="share-paid-receipt-card">
        {rows.map((row, i) => (
          <Reveal key={row.label} delay={REVEAL_DELAY} index={i}>
            <ShareReceiptRow size="m" label={row.label}>
              {row.value}
            </ShareReceiptRow>
            <Separator inset="16" />
          </Reveal>
        ))}
        <Reveal delay={REVEAL_DELAY} index={rows.length}>
          <ShareReceiptRow size="m" label="Status">
            <Badge tone="warning" size="s" icon={Clock}>
              {PAYMENT.status}
            </Badge>
          </ShareReceiptRow>
        </Reveal>
      </Card>
    </Reveal>
  );
}
