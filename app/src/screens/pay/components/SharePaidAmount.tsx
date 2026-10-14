import { Amount } from '@/components/ohm';

/** Figma: Share / Paid amount (28:37431). The amount (L) with the payment date under it, 2 apart. */
export function SharePaidAmount({ amount, date }: { amount: number; date: string }) {
  return (
    <div data-slot="share-paid-amount" className="flex flex-col gap-0.5">
      <Amount value={amount} size="l" />
      <p className="text-sm text-ink-muted">{date}</p>
    </div>
  );
}
