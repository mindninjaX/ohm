import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ClockIcon } from './icons';

export type SharePayment = 'unpaid' | 'paid';

export interface ShareStatusBandProps {
  /** Figma "Payment". Unpaid sits on `line`; Paid on `warning-subtle` (Northgrid has not confirmed yet). */
  payment: SharePayment;
  label: ReactNode;
  sub: ReactNode;
}

/**
 * Figma: Share / Status band (28:36912). 44 tall, padding 12 16, 12 between the 20 clock icon and the text row.
 * The label is Text-sm/Semi Bold `ink-strong`, the sub Text-sm/Regular `ink-muted`, pushed to the right.
 */
export function ShareStatusBand({ payment, label, sub }: ShareStatusBandProps) {
  const paid = payment === 'paid';
  return (
    <div
      data-slot="share-status-band"
      data-payment={payment}
      className={cn('flex items-center gap-3 px-4 py-3', paid ? 'bg-warning-subtle' : 'bg-line')}
    >
      <ClockIcon className={cn('shrink-0', paid ? 'text-warning' : 'text-ink-muted')} />
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3 text-sm">
        <span className="shrink-0 font-semibold text-ink-strong">{label}</span>
        <span className="min-w-0 text-right text-ink-muted">{sub}</span>
      </div>
    </div>
  );
}
