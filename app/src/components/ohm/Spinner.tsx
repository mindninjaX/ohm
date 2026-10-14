import { cn } from '@/lib/utils';

export interface SpinnerProps {
  /** Pixels. 20 in Check line, 16 inside a Button M, 20 inside a Button L. */
  size?: number;
  /** `primary` is the brand blue; `current` takes the text colour (inside a Primary button). */
  tone?: 'primary' | 'current';
  /** Accessible name. Leave out when the spinner sits next to text that already says it. */
  label?: string;
  className?: string;
}

/**
 * Figma: Spinner (primary). A three-quarter ring that turns. With reduced motion it stops
 * turning and pulses softly instead.
 */
export function Spinner({ size = 20, tone = 'primary', label, className }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        'shrink-0 animate-spin motion-reduce:animate-pulse',
        tone === 'primary' ? 'text-primary' : 'text-current',
        className,
      )}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
