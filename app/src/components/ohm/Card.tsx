import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export type CardTone = 'white' | 'primary-subtle' | 'warning-subtle';
export type CardPadding = 20 | 16 | 0;

export interface CardProps extends ComponentProps<'div'> {
  tone?: CardTone;
  /** 20 or 16 pad the content with 12 between children; 0 is for stacked rows and separators. */
  padding?: CardPadding;
}

const tones: Record<CardTone, string> = {
  white: 'bg-card',
  'primary-subtle': 'bg-primary-subtle',
  'warning-subtle': 'bg-warning-subtle',
};

const paddings: Record<CardPadding, string> = {
  20: 'p-5 gap-3',
  16: 'p-4 gap-3',
  0: 'p-0 gap-0',
};

/** Figma: Ohm / Card. Radius 16, clipped, no stroke, no shadow. The page behind it is `surface-muted`. */
export function Card({ tone = 'white', padding = 20, className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn('flex flex-col overflow-hidden rounded-2xl', tones[tone], paddings[padding], className)}
      {...props}
    />
  );
}
