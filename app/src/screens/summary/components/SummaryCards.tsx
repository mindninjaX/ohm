import { Zap } from 'lucide-react';
import { NavRow, Separator } from '@/components/ohm';
import { PARTS, UNITS, UNITS_BY_MONTH, UNITS_LAST_MONTH, VS_JULY } from '@/data/bill';
import { formatINR, formatPct, formatUnits } from '@/lib/format';
import { GrowBar } from './primitives';

/** The busiest month on record sets the scale of the July and August bars (3,42,210 is the full track). */
const MAX_UNITS = Math.max(...UNITS_BY_MONTH.map((m) => m.units));

function MonthBar({ label, units, fillClassName, delay }: {
  label: string;
  units: number;
  fillClassName: string;
  delay: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-ink">{label}</span>
        <span className="text-sm font-semibold text-ink-strong">{formatUnits(units)}</span>
      </div>
      <GrowBar pct={(units / MAX_UNITS) * 100} height={8} fillClassName={fillClassName} delay={delay} />
    </div>
  );
}

/**
 * Figma: Ohm / July change card (instance "Electricity used card"). The units for July and August
 * on one scale (the busiest month fills the track), the rupee change in words, and a link to Trends.
 */
export function JulyChangeCard({ onSeeTrends }: { onSeeTrends: () => void }) {
  return (
    <div data-slot="july-change-card" className="overflow-hidden rounded-2xl bg-card">
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center gap-2">
          <Zap size={16} aria-hidden className="shrink-0 text-ink-muted" />
          <p className="text-sm font-medium text-ink-muted">Electricity used</p>
        </div>
        <h2 className="text-lg font-semibold text-ink-strong">
          {formatUnits(UNITS)} units, up {formatPct(VS_JULY.unitsPct)} from July
        </h2>
        <div role="img" aria-label={`July ${formatUnits(UNITS_LAST_MONTH)} units, August ${formatUnits(UNITS)} units`} className="flex flex-col gap-3">
          <MonthBar label="July" units={UNITS_LAST_MONTH} fillClassName="bg-line-strong" delay={0.1} />
          <MonthBar label="August" units={UNITS} fillClassName="bg-primary" delay={0.25} />
        </div>
        <p className="text-sm text-ink">Your bill is {formatINR(VS_JULY.rupeesMore)} more than July.</p>
      </div>
      <Separator inset="20" />
      <NavRow label="See trends" onClick={onSeeTrends} />
    </div>
  );
}

/** Figma: Ohm / Parts card. The three biggest parts of the bill as share bars, then the full breakdown. */
export function PartsCard({ onSeeBreakdown }: { onSeeBreakdown: () => void }) {
  const top = PARTS.slice(0, 3);
  return (
    <div data-slot="parts-card" className="overflow-hidden rounded-2xl bg-card">
      <div className="flex flex-col gap-4 p-5">
        <h2 className="text-base font-semibold text-ink-strong">Where the money goes</h2>
        {top.map((part, i) => (
          <div key={part.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="min-w-0 flex-1 text-sm text-ink">{part.label}</span>
              <span className="text-sm font-medium text-ink-strong">{formatINR(part.amount)}</span>
              <span className="w-9 text-right text-sm text-ink-muted">{part.sharePct}%</span>
            </div>
            <GrowBar pct={part.sharePct ?? 0} height={6} delay={0.08 * i} />
          </div>
        ))}
      </div>
      <Separator inset="20" />
      <NavRow label="See the full breakdown" onClick={onSeeBreakdown} />
    </div>
  );
}
