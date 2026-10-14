import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';
import type { IconComponent } from './lib/types';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'link';
export type ButtonSize = 'l' | 'm';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  /** Figma "Style". */
  variant?: ButtonVariant;
  /** L is 48 tall and fills the width; M is 40 tall and hugs its label. */
  size?: ButtonSize;
  /** Pass the icon component, for example `leftIcon={Plus}`. */
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  /** Shows a spinner in place of the left icon and ignores taps. Not dimmed (unlike `disabled`). */
  loading?: boolean;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-card hover:bg-primary/90',
  secondary: 'border border-line bg-card text-ink hover:bg-surface-muted',
  destructive: 'bg-danger text-card hover:bg-danger/90',
  link: 'bg-transparent text-primary hover:underline underline-offset-4',
};

/**
 * Figma: Ohm / Button. Pill, Text-base/Semi Bold. L is 48 tall with 20 icons, padding 0 20 and
 * fills its container; M is 40 tall with 16 icons, padding 0 16 (Link M 0 4) and hugs.
 * Disabled is the variant at 40% opacity. Pressing scales to 0.98 (not with reduced motion).
 */
export function Button({
  variant = 'primary',
  size = 'l',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  loading = false,
  disabled = false,
  type = 'button',
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const iconSize = size === 'l' ? 20 : 16;
  const inert = disabled || loading;
  return (
    <button
      type={type}
      disabled={inert}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      onClick={loading ? undefined : onClick}
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold',
        'transition-[transform,background-color,opacity] duration-150 ease-out',
        'active:scale-[0.98] motion-reduce:active:scale-100',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-primary/40',
        size === 'l' ? 'h-12 w-full px-5' : 'h-10 px-4',
        variant === 'link' && size === 'm' && 'px-1',
        variants[variant],
        disabled && 'opacity-40',
        inert && 'pointer-events-none',
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner size={iconSize} tone="current" />
      ) : (
        LeftIcon && <LeftIcon size={iconSize} aria-hidden />
      )}
      {children}
      {RightIcon && <RightIcon size={iconSize} aria-hidden />}
    </button>
  );
}
