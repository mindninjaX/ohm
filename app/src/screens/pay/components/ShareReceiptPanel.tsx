import { Tile } from '@/components/ohm';
import { formatINR } from '@/lib/format';
import { PAYMENT } from '@/data/bill';
import { ShareReceiptRow } from './ShareReceiptRow';

/**
 * Figma: Share / Receipt panel (28:37521), World Normal. A muted tile with the saving, the method and the
 * reference, 8 apart. `saved` is null when the early discount was not used (no saving row).
 */
export function ShareReceiptPanel({ saved }: { saved: number | null }) {
  return (
    <Tile tone="muted" data-slot="share-receipt-panel">
      {saved !== null && (
        <ShareReceiptRow label="You saved" tone="success">
          {formatINR(saved)}
        </ShareReceiptRow>
      )}
      <ShareReceiptRow label="Method">
        {PAYMENT.method}, {PAYMENT.bank}
      </ShareReceiptRow>
      <ShareReceiptRow label="Reference">UTR {PAYMENT.utr}</ShareReceiptRow>
    </Tile>
  );
}
