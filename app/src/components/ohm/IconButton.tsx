import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import type { IconComponent } from './lib/types';

export type IconButtonVariant = 'ghost' | 'soft';

export interface IconButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  icon: IconComponent;
  /** Required: an icon alone has no name. */
  label: string;
  /** Figma "Style". */
  variant?: IconButtonVariant;
}

/**
 * Figma: Ohm / Icon button. A 44 x 44 hit area. Ghost: a 24 icon in `ink-strong`. Soft: a 36
 * circle in `surface-muted` with a 16 icon.
 */
export function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  type = 'button',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      data-variant={variant}
      className={cn(
        'relative inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink-strong',
        'transition-[transform,background-color,opacity] duration-150 ease-out',
        'active:scale-95 motion-reduce:active:scale-100',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-primary/40',
        'disabled:pointer-events-none disabled:opacity-40',
        variant === 'ghost' && 'hover:bg-ink-strong/5 active:bg-ink-strong/10',
        className,
      )}
      {...props}
    >
      {variant === 'soft' ? (
        <span className="grid size-9 place-items-center rounded-full bg-surface-muted">
          <Icon size={16} aria-hidden />
        </span>
      ) : (
        <Icon size={24} aria-hidden />
      )}
    </button>
  );
}
