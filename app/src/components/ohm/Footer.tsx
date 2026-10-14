import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrustLineRazorpay } from './TrustLineRazorpay';

export interface FooterProps {
  /** One or two `<Button />`s (Button 1 is usually Primary L, Button 2 a Link L). 8 between them. */
  children: ReactNode;
  /** A line of Text-sm/Regular `ink-muted` under the buttons. */
  helper?: ReactNode;
  /** Shows "Secured by Razorpay" under the buttons. */
  trustLine?: boolean;
  /** Pinned to the bottom of the screen (default). Pass `false` to lay it out inline (the gallery does). */
  sticky?: boolean;
  className?: string;
}

/**
 * Figma: Ohm / Footer (Buttons One | Two, Trust line, Helper). White, 1 px top line, padding
 * 12 16 0, then the home indicator zone (34, or the phone's real bottom inset through `--safe-bottom`).
 * Heights: One 94, One + Trust line 118, Two 150, Two + Helper 178.
 */
export function Footer({ children, helper, trustLine = false, sticky = true, className }: FooterProps) {
  return (
    <footer
      data-slot="footer"
      className={cn(
        'z-30 flex w-full flex-col gap-2 border-t border-line bg-card px-4 pt-[11px] pb-[var(--safe-bottom,34px)]',
        sticky && 'sticky bottom-0',
        className,
      )}
    >
      {children}
      {helper && <p className="text-center text-sm text-ink-muted">{helper}</p>}
      {trustLine && <TrustLineRazorpay />}
    </footer>
  );
}
