import { Card, SectionHeader } from '@/components/ohm';
import { PeakDipGlyph } from '@/illustrations';
import { formatUnits } from '@/lib/format';
import type { Extremes, TrendMonth } from '../trends-data';

function HighLowTile({ kind, month }: { kind: 'highest' | 'lowest'; month: TrendMonth }) {
  return (
    <Card padding={0} className="flex-1">
      <div className="flex flex-col gap-0.5 p-3">
        <div className="flex h-5 items-center gap-2">
          <PeakDipGlyph kind={kind} size={20} />
          <span className="text-sm font-medium text-ink-muted">{kind === 'highest' ? 'Highest' : 'Lowest'}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-semibold text-ink-strong">{formatUnits(month.units)}</span>
          <span className="text-xs text-ink-muted">units</span>
        </div>
        <span className="text-xs text-ink-muted">{month.tableLabel}</span>
      </div>
    </Card>
  );
}

/** Figma: Highs and lows (Range 2026 | 2025). A section header and two tiles: the month with the most units and the one with the fewest. */
export function HighsAndLows({ extremes }: { extremes: Extremes }) {
  return (
    <section className="flex flex-col pt-3">
      <SectionHeader title="Highs and lows" />
      <div className="flex gap-2">
        <HighLowTile kind="highest" month={extremes.highest} />
        <HighLowTile kind="lowest" month={extremes.lowest} />
      </div>
    </section>
  );
}
