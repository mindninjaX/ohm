import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ShareReceiptRowProps {
  label: ReactNode;
  /** The value, right aligned. It wraps (right aligned) when the screen is too narrow for both. */
  children: ReactNode;
  /** Figma "Size". S is the 20 tall line inside the share card; M is the 48 tall row of the Paid receipt card. */
  size?: 's' | 'm';
  /** Success shows the value in Semi Bold `success` (the saving); Default is Medium `ink`. */
  tone?: 'default' | 'success';
  className?: string;
}

/**
 * Figma: Share / Receipt row (28:37213), Layout Inline (Layout Status is the same row with a Badge as the value).
 * Text-sm: the label in `ink-muted`, the value in Medium `ink`. S is 20 tall; M is 48 tall with padding 0 16.
 */
export function ShareReceiptRow({ label, children, size = 's', tone = 'default', className }: ShareReceiptRowProps) {
  return (
    <div
      data-slot="share-receipt-row"
      className={cn(
        'flex justify-between gap-2 text-sm',
        size === 'm' ? 'min-h-12 items-center px-4 py-2' : 'min-h-5 items-start',
        className,
      )}
    >
      <span className="shrink-0 text-ink-muted">{label}</span>
      <span
        className={cn(
          'flex min-w-0 justify-end text-right',
          tone === 'success' ? 'font-semibold text-success' : 'font-medium text-ink',
        )}
      >
        {children}
      </span>
    </div>
  );
}
