import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, NavRow, Separator } from '@/components/ohm';
import { UNITS, UNITS_LAST_MONTH } from '@/data/bill';
import { formatPct, formatUnits } from '@/lib/format';
import { LATEST_MONTH, monthsOfYear } from '../trends-data';
import { BarChart, type BarDatum } from './BarChart';
import { SourceButton } from './SourceButton';

const BARS: readonly BarDatum[] = monthsOfYear(2026).map((m) => ({
  key: m.month,
  label: m.short,
  value: m.units,
  description: `${m.long}, ${formatUnits(m.units)} units`,
}));

/** Figma: Usage card / Home. The August-over-July headline, the eight small bars, the source button and "See trends". */
export function UsageCardHome({ unitsPct }: { unitsPct: number }) {
  const navigate = useNavigate();
  return (
    <Card padding={0}>
      <div className="flex flex-col px-5 pt-5 pb-4">
        <div className="flex items-center gap-2 pb-3">
          <Zap size={16} aria-hidden className="shrink-0 text-ink-muted" />
          <span className="text-sm font-medium text-ink-muted">Electricity used</span>
        </div>
        <div className="flex flex-col gap-1 pb-3">
          <h2 className="text-xl font-semibold text-ink-strong">{`Up ${formatPct(unitsPct)} from July`}</h2>
          <p className="text-sm text-ink-muted">{`${formatUnits(UNITS)} units in August. July was ${formatUnits(UNITS_LAST_MONTH)}.`}</p>
        </div>
        <BarChart
          variant="compact"
          chartId="home-usage"
          groupLabel="Units used each month in 2026. Tap a month to see it in Trends."
          data={BARS}
          selectedKey={LATEST_MONTH.month}
          onSelect={(key) => navigate(`/trends?month=${BARS.find((b) => b.key === key)?.label.toLowerCase() ?? ''}`)}
          yearLabel="2026"
        />
        <div className="flex flex-col pt-2">
          <SourceButton />
        </div>
      </div>
      <Separator inset="20" />
      <NavRow label="See trends" onClick={() => navigate('/trends')} />
    </Card>
  );
}
