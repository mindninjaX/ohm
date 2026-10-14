import razorpayLogo from '@/assets/razorpay-logo.svg';
import { cn } from '@/lib/utils';

/** Figma: Ohm / Trust line, Razorpay. "Secured by" and the real Razorpay logo (14 high, full colour, never tinted). */
export function TrustLineRazorpay({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-4 items-center justify-center gap-1 text-xs text-ink-muted', className)}>
      <span>Secured by</span>
      <img src={razorpayLogo} alt="Razorpay" width={66} height={14} className="h-3.5 w-auto" />
    </div>
  );
}
