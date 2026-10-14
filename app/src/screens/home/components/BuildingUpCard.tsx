import { ArrowDown, ArrowUp, Zap } from 'lucide-react';
import type { ReactNode } from 'react';
import { Badge, Card } from '@/components/ohm';
import { UNITS } from '@/data/bill';
import { RupeeHistoryArt, WaitingForMonthsArt } from '@/illustrations';
import { formatUnits } from '@/lib/format';
import { LATEST_MONTH, MIN_MONTHS_FOR_CHART } from '../trends-data';
import { BarChart, type BarDatum } from './BarChart';
import { IndianRupeeSmallIcon } from './icons';
import { Readout } from './Readout';
import { SourceButton } from './SourceButton';

function ArtRow({ art, children }: { art: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0">{art}</span>
      <p className="min-w-0 flex-1 text-sm text-ink-muted">{children}</p>
    </div>
  );
}

/** Figma: Months building up card, Metric Units (S12.5): the figure, art and one line about the 3 months Ohm needs for a chart. */
export function UnitsBuildingUpCard() {
  return (
    <Card padding={16}>
      <div className="flex flex-col gap-4">
        <Readout icon={Zap} label={`Units used in ${LATEST_MONTH.long}`} units={formatUnits(UNITS)} changeKey="units" />
        <ArtRow art={<WaitingForMonthsArt width={88} />}>
          {`Ohm will draw your usage chart once it has ${MIN_MONTHS_FOR_CHART} months of bills.`}
        </ArtRow>
        <SourceButton from="trends" />
      </div>
    </Card>
  );
}

/** Figma: Months building up card, Metric Rupees (S12.4): the bill total, two bars (July and August), art and a line about what the totals are. */
export function RupeesBuildingUpCard({
  data,
  selectedKey,
  onSelect,
  label,
  amount,
  change,
  replay,
}: {
  data: readonly BarDatum[];
  selectedKey: string;
  onSelect: (key: string) => void;
  label: string;
  amount: number;
  /** The chip under the figure; `direction` null is a chip with no arrow. */
  change: { text: string; direction: 'up' | 'down' | null };
  replay: boolean;
}) {
  return (
    <Card padding={16}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Readout icon={IndianRupeeSmallIcon} label={label} rupees={amount} changeKey={selectedKey} />
          <Badge
            tone="neutral"
            size="m"
            icon={change.direction === 'down' ? ArrowDown : change.direction === 'up' ? ArrowUp : undefined}
            className="self-start"
          >
            {change.text}
          </Badge>
        </div>
        <BarChart
          variant="rupees"
          chartId="trends-rupees"
          groupLabel="Bill total for each month. Tap a month to see it."
          data={data}
          selectedKey={selectedKey}
          onSelect={onSelect}
          yearLabel="2026"
          replay={replay}
        />
        <ArtRow art={<RupeeHistoryArt width={88} />}>
          Bill totals, before any early-payment discount. Your first bill with Ohm was July 2026.
        </ArtRow>
        <SourceButton from="trends" />
      </div>
    </Card>
  );
}
