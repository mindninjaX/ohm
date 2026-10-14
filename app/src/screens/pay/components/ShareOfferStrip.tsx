import { EARLY_DEADLINE, SAVING } from '@/data/bill';
import { formatDate, formatINR } from '@/lib/format';
import { PiggyBankIcon } from './icons';

/**
 * Figma: Share / Offer strip (28:37445). A 16 piggy bank in `success` and one line of Text-sm/Medium:
 * "Save ₹32,970" in `success`, the rest in `ink`.
 */
export function ShareOfferStrip() {
  return (
    <div data-slot="share-offer-strip" className="flex min-h-5 items-start gap-2">
      <PiggyBankIcon className="mt-0.5 shrink-0 text-success" />
      <p className="min-w-0 flex-1 text-sm font-medium text-ink">
        <span className="text-success">Save {formatINR(SAVING)}</span> if you pay by{' '}
        <span className="whitespace-nowrap">{formatDate(EARLY_DEADLINE)}</span>
      </p>
    </div>
  );
}
