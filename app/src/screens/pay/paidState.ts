/** Router state on the Paid entry when it was reached from the /pay loader (Done then pops back to Home). */
export const PAID_FROM_PAY = { ohmPaidFromPay: true } as const;

/** True when the current history entry is Paid reached from the loader. */
export function cameFromPay(state: unknown): boolean {
  return !!state && typeof state === 'object' && (state as Record<string, unknown>).ohmPaidFromPay === true;
}
