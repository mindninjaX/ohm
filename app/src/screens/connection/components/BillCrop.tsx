import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

function Skeleton({ className }: { className: string }) {
  return <span aria-hidden="true" className={cn('absolute h-[6px] rounded-[3px] bg-surface-muted', className)} />;
}

export interface BillCropProps {
  /** The printed label, for example "Contract demand". */
  label: string;
  /** The printed value, for example "700 kVA". */
  value: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Figma: Bill crop (Style Print, 11:12483). A 112 tall window on page 1 of the bill: grey surface, radius 12,
 * a white paper (12 in from the sides, 10 down, taller than the window so the bottom is cut off) with
 * skeleton lines, and the printed line Ohm read inside a 1.5 px primary outline. The line is what is printed,
 * so it is drawn in the bill's own small type.
 */
export function BillCrop({ label, value, className, children }: BillCropProps) {
  return (
    <div
      data-slot="bill-crop"
      className={cn('relative h-[112px] w-full overflow-hidden rounded-[12px] bg-surface-muted', className)}
    >
      <div className="absolute inset-x-3 top-[10px] h-[130px] overflow-hidden rounded-[6px] bg-card">
        <Skeleton className="top-5 left-3 w-[92px]" />
        <Skeleton className="top-5 right-3 w-12" />
        <span aria-hidden="true" className="absolute top-[38px] inset-x-3 h-px bg-line" />
        <span className="absolute top-[46px] left-3 text-xs text-ink-muted">{label}</span>
        <span className="absolute top-[44px] right-3 text-sm font-medium text-ink-strong">{value}</span>
        <span aria-hidden="true" className="absolute top-[69px] inset-x-3 h-px bg-line" />
        <Skeleton className="top-[82px] left-3 w-[76px]" />
        <Skeleton className="top-[82px] right-3 w-10" />
        <Skeleton className="top-[113px] left-3 w-[84px]" />
        <Skeleton className="top-[113px] right-3 w-11" />
        <span
          aria-hidden="true"
          className="absolute top-[38px] inset-x-1.5 h-8 rounded-[4px] shadow-[inset_0_0_0_1.5px_var(--primary)]"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[6px] border border-line" />
      </div>
      {children}
    </div>
  );
}
