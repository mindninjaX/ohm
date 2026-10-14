import { CircleCheck } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { IconComponent } from './lib/types';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
export type BadgeSize = 's' | 'm';

export interface BadgeProps extends Omit<ComponentProps<'span'>, 'children'> {
  tone?: BadgeTone;
  size?: BadgeSize;
  /** `true` shows circle-check; pass an icon component to show another one. */
  icon?: boolean | IconComponent;
  children: ReactNode;
}

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-ink-strong',
  primary: 'bg-primary-subtle text-primary',
  success: 'bg-success-subtle text-success',
  warning: 'bg-warning-subtle text-warning',
  danger: 'bg-danger-subtle text-danger',
};

/**
 * Figma: Ohm / Badge. A pill. S is 22 tall (icon 12, Text-xs/Medium), M is 28 tall (icon 14,
 * Text-sm/Medium). Neutral sits on `surface-muted`; every other tone is `<tone>-subtle` with
 * `<tone>` text.
 */
export function Badge({ tone = 'neutral', size = 's', icon, className, children, ...props }: BadgeProps) {
  const Icon: IconComponent | null = icon === true ? CircleCheck : icon || null;
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full font-medium',
        size === 's' ? 'h-[22px] gap-1 px-2 text-xs' : 'h-7 gap-1.5 px-2.5 text-sm',
        tones[tone],
        className,
      )}
      {...props}
    >
      {Icon && <Icon size={size === 's' ? 12 : 14} aria-hidden />}
      {children}
    </span>
  );
}
