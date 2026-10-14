import { Amount } from '@/components/ohm';
import { PaidBillPage } from '@/illustrations';

/** Figma: Paid bill hero. The amount paid and the date on the left, the paid bill page (with its green check) on the right. */
export function PaidBillHero({ amount, paidOn }: { amount: number; paidOn: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Amount value={amount} size="l" />
        <p className="text-base text-ink-muted">{`Paid ${paidOn}`}</p>
      </div>
      <PaidBillPage width={76} className="shrink-0" />
    </div>
  );
}
