import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { useReduced } from './lib/motion';

export type SkeletonProps = ComponentProps<'div'>;

/**
 * A loading placeholder: `surface-muted` with a soft highlight that sweeps across (a
 * transform, so it stays on the GPU). With reduced motion it is a still block.
 * Size it with classes: `<Skeleton className="h-4 w-32" />`.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  const reduced = useReduced();
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn('relative overflow-hidden rounded-lg bg-surface-muted', className)}
      {...props}
    >
      {!reduced && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-card/80 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.15 }}
        />
      )}
    </div>
  );
}
