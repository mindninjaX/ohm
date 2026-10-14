import { useDemo } from '@/shell';
import { PAYMENT, TOTAL } from '@/data/bill';

/**
 * What the receipt screens (S11 Paid, S11.1 Share receipt) show. Normally the recorded payment from
 * the data module: ₹36,09,190 paid on Thu 3 Sep 2026, 11:42 AM, saving ₹32,970. When the demo date is after
 * the early deadline (Pay on S06.1 is the full ₹36,42,160) nothing was saved and the payment is dated
 * the demo's today, at the same time of day.
 */
export interface PaymentView {
  /** Rupees paid. */
  amount: number;
  /** Rupees saved by paying early, or null when nothing was saved. */
  saved: number | null;
  /** ISO timestamp of the payment (India time). */
  paidAt: string;
}

export function usePaymentView(): PaymentView {
  const { afterEarlyDeadline, today } = useDemo();
  if (afterEarlyDeadline) {
    return { amount: TOTAL, saved: null, paidAt: `${today}T11:42:00+05:30` };
  }
  return { amount: PAYMENT.amount, saved: PAYMENT.saved, paidAt: PAYMENT.paidAt };
}
