import { ChevronRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export interface NavRowProps extends Omit<ComponentProps<'button'>, 'children'> {
  label: string;
}

/**
 * Figma: Ohm / Nav row. 48 tall, label Text-sm/Medium `primary` with a chevron, padding 0 20.
 * Sits under an `<Separator inset="20" />` at the foot of a card.
 */
export function NavRow({ label, type = 'button', className, ...props }: NavRowProps) {
  return (
    <button
      type={type}
      className={cn(
        'flex h-12 w-full items-center justify-between px-5 text-sm font-medium text-primary',
        'transition-colors duration-150 active:bg-surface-muted',
        'outline-none focus-visible:bg-primary-subtle',
        className,
      )}
      {...props}
    >
      {label}
      <ChevronRight size={16} aria-hidden />
    </button>
  );
}
