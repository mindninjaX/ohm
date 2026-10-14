import { formatUnits } from '@/lib/format';
import { METER_MULTIPLIER } from '@/data/bill';
import { cn } from '@/lib/utils';

function Chip({ strong = false, children }: { strong?: boolean; children: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center rounded-[8px] bg-surface-muted px-2 text-xs text-ink',
        strong ? 'font-semibold' : 'font-medium',
      )}
    >
      {children}
    </span>
  );
}

/**
 * Figma: Meter equation (11:10197). Three chips with a times and an equals between them:
 * "Meter count x 2,000 = Units billed". The caption (an optional line under it) names the August units.
 */
export function MeterEquation({ caption, className }: { caption?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)} data-slot="meter-equation">
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip>Meter count</Chip>
        <span aria-hidden="true" className="text-sm text-ink-muted">
          ×
        </span>
        <Chip strong>{formatUnits(METER_MULTIPLIER)}</Chip>
        <span aria-hidden="true" className="text-sm text-ink-muted">
          =
        </span>
        <Chip>Units billed</Chip>
      </div>
      {caption && <p className="text-xs text-ink-muted">{caption}</p>}
    </div>
  );
}
