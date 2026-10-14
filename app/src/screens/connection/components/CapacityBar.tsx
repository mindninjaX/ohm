import { motion } from 'motion/react';
import { useReduced } from '@/components/ohm';
import { formatUnits } from '@/lib/format';
import { cn } from '@/lib/utils';
import { CAPACITY, PEAK_LABEL, kva } from '../data';

export interface CapacityBarProps {
  /** Row is the small bar inside a Connection row; Large sits in the Meaning card. */
  size?: 'row' | 'large';
  peak?: number;
  booked?: number;
  className?: string;
}

/**
 * Figma: Capacity bar (11:10179). "Your August peak" and "664 of 700 kVA" over a track, the range
 * being the peak as a share of the power booked (312 of 329). Row: 12/16 labels, 6 track, 6 gap.
 * Large: 14/20 labels, 8 track, 8 gap. The range grows from the left the first time it shows.
 */
export function CapacityBar({
  size = 'row',
  peak = CAPACITY.peak,
  booked = CAPACITY.booked,
  className,
}: CapacityBarProps) {
  const reduced = useReduced();
  const large = size === 'large';
  const share = Math.max(0, Math.min(1, peak / booked));
  return (
    <div className={cn('flex w-full flex-col', large ? 'gap-2' : 'gap-1.5', className)} data-slot="capacity-bar">
      <div className={cn('flex items-center justify-between', large ? 'text-sm' : 'text-xs')}>
        <span className="text-ink-muted">{PEAK_LABEL}</span>
        <span className={cn('text-ink', large ? 'font-semibold' : 'font-medium')}>
          {formatUnits(peak)} of {kva(booked)}
        </span>
      </div>
      <div
        role="img"
        aria-label={`${formatUnits(peak)} of ${kva(booked)}`}
        className={cn('w-full overflow-hidden rounded-full bg-line', large ? 'h-2' : 'h-1.5')}
      >
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: reduced ? `${share * 100}%` : '0%' }}
          animate={{ width: `${share * 100}%` }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
