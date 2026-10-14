import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export type TileTone = 'muted' | 'white' | 'primary-subtle' | 'success-subtle' | 'warning-subtle';

export interface TileProps extends ComponentProps<'div'> {
  tone?: TileTone;
}

const tones: Record<TileTone, string> = {
  muted: 'bg-surface-muted',
  white: 'bg-card',
  'primary-subtle': 'bg-primary-subtle',
  'success-subtle': 'bg-success-subtle',
  'warning-subtle': 'bg-warning-subtle',
};

/** Figma: Ohm / Tile. A small panel inside a card: radius 12, padding 12, 8 between children. */
export function Tile({ tone = 'muted', className, ...props }: TileProps) {
  return (
    <div
      data-slot="tile"
      className={cn('flex flex-col gap-2 rounded-xl p-3', tones[tone], className)}
      {...props}
    />
  );
}
