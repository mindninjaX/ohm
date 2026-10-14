import { ArrowDown, ArrowUp, CircleAlert, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { Alert, Badge, Card, Header, ScreenScaffold, TabBar, useReduced } from '@/components/ohm';
import { RUPEES_BY_MONTH, VS_JULY } from '@/data/bill';
import { PeakDipGlyph } from '@/illustrations';
import { formatPct, formatUnits } from '@/lib/format';
import { BarChart, type BarDatum } from './components/BarChart';
import { RupeesBuildingUpCard, UnitsBuildingUpCard } from './components/BuildingUpCard';
import { CompareSection } from './components/CompareSection';
import { HighsAndLows } from './components/HighsAndLows';
import { MetricSwitch } from './components/MetricSwitch';
import { MonthTable } from './components/MonthTable';
import { RangeTabs } from './components/RangeTabs';
import { Readout } from './components/Readout';
import { SourceButton } from './components/SourceButton';
import {
  extremesOf,
  findMonth,
  LATEST_MONTH,
  monthByKey,
  monthsOfYear,
  type TrendMetric,
  type TrendMonth,
  type TrendYear,
} from './trends-data';
import { formatINR } from '@/lib/format';

type View = 'ok' | 'few' | 'error';

const unitsData = (year: TrendYear): readonly BarDatum[] =>
  monthsOfYear(year).map((m) => ({
    key: m.month,
    label: m.short,
    value: m.units,
    description: `${m.long}, ${formatUnits(m.units)} units`,
  }));

const rupeesData: readonly BarDatum[] = RUPEES_BY_MONTH.map((r) => ({
  key: r.month,
  label: r.label.slice(0, 3),
  value: r.total,
  valueLabel: formatINR(r.total),
  description: `${r.label}, ${formatINR(r.total)}`,
}));

function ChangeChip({ month }: { month: TrendMonth }) {
  if (month.changePct === null) return <Badge tone="neutral" size="m">First month in your bill&apos;s table</Badge>;
  const up = month.changePct >= 0;
  return (
    <Badge tone="neutral" size="m" icon={up ? ArrowUp : ArrowDown}>
      {`${up ? 'Up' : 'Down'} ${formatPct(Math.abs(month.changePct))} from ${month.prevName}`}
    </Badge>
  );
}

function ExtremeChip({ kind }: { kind: 'highest' | 'lowest' }) {
  const Glyph = ({ size }: { size?: number | string }) => <PeakDipGlyph kind={kind} width={Number(size ?? 14)} />;
  return (
    <Badge tone="neutral" size="m" icon={Glyph}>
      {kind === 'highest' ? 'Highest' : 'Lowest'}
    </Badge>
  );
}

/** S12 Trends (and S12.2 to S12.6): units or bill total, by month, with a year tab, a readout, highs and lows, a month table and comparisons. */
export function TrendsScreen() {
  const [params] = useSearchParams();
  const reduced = useReduced();

  const initialYear: TrendYear = params.get('year') === '2025' ? 2025 : 2026;
  const [metric, setMetric] = useState<TrendMetric>(params.get('metric') === 'rupees' ? 'rupees' : 'units');
  const [year, setYear] = useState<TrendYear>(initialYear);
  const [selectedKey, setSelectedKey] = useState<string>(() => findMonth(initialYear, params.get('month')).month);
  const [rupeeKey, setRupeeKey] = useState<string>(LATEST_MONTH.month);
  const [view, setView] = useState<View>(() => {
    const s = params.get('state');
    return s === 'few' || s === 'error' ? s : 'ok';
  });
  const [tableOpen, setTableOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [switched, setSwitched] = useState(false);
  const retryTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(retryTimer.current), []);

  const months = useMemo(() => monthsOfYear(year), [year]);
  const selected = monthByKey(selectedKey);
  const extremes = useMemo(() => extremesOf(year), [year]);
  const index = months.findIndex((m) => m.month === selected.month);

  const changeYear = useCallback((next: TrendYear) => {
    setSwitched(true);
    setYear(next);
    const list = monthsOfYear(next);
    setSelectedKey(list[list.length - 1]!.month);
  }, []);

  const changeMetric = useCallback((next: TrendMetric) => {
    setSwitched(true);
    setMetric(next);
    setRupeeKey(LATEST_MONTH.month);
  }, []);

  const retry = () => {
    setRetrying(true);
    retryTimer.current = window.setTimeout(() => {
      setRetrying(false);
      setView('ok');
    }, 900);
  };

  const rupeeMonth = RUPEES_BY_MONTH.find((r) => r.month === rupeeKey) ?? RUPEES_BY_MONTH[RUPEES_BY_MONTH.length - 1]!;
  const rupeeIsLatest = rupeeMonth.month === LATEST_MONTH.month;

  let body: ReactNode;
  let bodyKey: string;
  if (view === 'error') {
    bodyKey = 'error';
    body = (
      <Alert
        tone="info"
        icon={CircleAlert}
        role="alert"
        title="Couldn't load your trends"
        description="Check your internet and try again."
        link="Try again"
        onLinkClick={retry}
        linkLoading={retrying}
      />
    );
  } else if (metric === 'rupees') {
    bodyKey = 'rupees';
    body = (
      <>
        <RupeesBuildingUpCard
          data={rupeesData}
          selectedKey={rupeeMonth.month}
          onSelect={setRupeeKey}
          label={`${monthByKey(rupeeMonth.month).long} bill`}
          amount={rupeeMonth.total}
          change={
            rupeeIsLatest
              ? { text: `Up ${formatPct(VS_JULY.rupeesPct)} from July`, direction: 'up' }
              : { text: 'Your first bill with Ohm', direction: null }
          }
          replay={switched}
        />
        <CompareSection metric="rupees" onSwitch={changeMetric} />
      </>
    );
  } else if (view === 'few') {
    bodyKey = 'few';
    body = <UnitsBuildingUpCard />;
  } else {
    bodyKey = 'units';
    const isHighest = selected.month === extremes.highest.month;
    const isLowest = selected.month === extremes.lowest.month;
    body = (
      <>
        <RangeTabs value={year} onChange={changeYear} />
        <Card padding={16}>
          <div className="flex flex-col gap-2">
            <Readout
              icon={Zap}
              label={`Units used in ${selected.long}`}
              units={formatUnits(selected.units)}
              changeKey={selected.month}
              steppers={{ prev: index > 0, next: index < months.length - 1 }}
              onPrevious={() => index > 0 && setSelectedKey(months[index - 1]!.month)}
              onNext={() => index < months.length - 1 && setSelectedKey(months[index + 1]!.month)}
            />
            <div className="flex gap-2">
              <ChangeChip month={selected} />
              {isHighest && <ExtremeChip kind="highest" />}
              {isLowest && <ExtremeChip kind="lowest" />}
            </div>
          </div>
          <div className="flex gap-2 text-xs text-ink-muted">
            <p className="min-w-0 flex-1">{year === 2025 ? "Your bill's table starts in Aug 2025." : 'Each bar is one month'}</p>
            <span className="font-medium">units</span>
          </div>
          <BarChart
            key={`${metric}-${year}`}
            variant="full"
            chartId={`trends-units-${year}`}
            groupLabel={`Units used each month in ${year}. Tap a month to see it.`}
            data={unitsData(year)}
            selectedKey={selected.month}
            onSelect={setSelectedKey}
            yearLabel={String(year)}
            replay={switched}
          />
          <SourceButton from="trends" />
        </Card>
        <HighsAndLows extremes={extremes} />
        <MonthTable
          months={months}
          selectedKey={selected.month}
          onSelect={setSelectedKey}
          open={tableOpen}
          onOpenChange={setTableOpen}
        />
        <CompareSection metric="units" onSwitch={changeMetric} />
      </>
    );
  }

  const first = useRef(true);
  useEffect(() => {
    first.current = false;
  }, []);

  return (
    <ScreenScaffold
      header={<Header type="top-level" title="Trends" avatar={false} />}
      footer={<TabBar value="trends" />}
      contentClassName="gap-3 pt-3 pb-[21px]"
    >
      <MetricSwitch value={metric} onChange={changeMetric} />
      <motion.div
        key={bodyKey}
        className="flex flex-col gap-3"
        initial={first.current || reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {body}
      </motion.div>
    </ScreenScaffold>
  );
}
