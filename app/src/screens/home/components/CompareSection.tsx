import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Button, Card, EASE_OUT, SectionHeader, Separator, useReduced } from '@/components/ohm';
import { UNITS, UNITS_AUG_2025, UNITS_LAST_MONTH, VS_AUG_2025, VS_JULY } from '@/data/bill';
import { formatINR, formatPct, formatUnits } from '@/lib/format';
import { cn } from '@/lib/utils';
import { MAX_UNITS, type TrendMetric } from '../trends-data';

interface PairRow {
  label: string;
  value: number;
  primary?: boolean;
}

/** Figma: Bar pair. Two labelled rows, each with a value and a thin track; the second (this month) is `primary`. */
function BarPair({ rows }: { rows: readonly [PairRow, PairRow] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReduced();
  return (
    <div ref={ref} className="flex flex-col gap-3">
      {rows.map((row, i) => (
        <div key={row.label} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-ink">{row.label}</span>
            <span className="font-semibold text-ink-strong">{formatUnits(row.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded bg-surface-muted">
            <motion.div
              className={cn('h-full rounded', row.primary ? 'bg-primary' : 'bg-line-strong')}
              initial={{ width: inView || reduced ? `${(row.value / MAX_UNITS) * 100}%` : 0 }}
              animate={{ width: inView || reduced ? `${(row.value / MAX_UNITS) * 100}%` : 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 + i * 0.12 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Heading({ title, headline }: { title: string; headline: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-sm font-medium text-ink-muted">{title}</p>
      <p className="text-base font-semibold text-ink-strong">{headline}</p>
    </div>
  );
}

function Bridge({ text, link, onClick }: { text: string; link: string; onClick: () => void }) {
  return (
    <>
      <Separator inset="16" />
      <div className="flex h-14 items-center gap-3 px-4">
        <p className="min-w-0 flex-1 text-sm text-ink">{text}</p>
        <Button variant="link" size="m" onClick={onClick}>
          {link}
        </Button>
      </div>
    </>
  );
}

/**
 * Figma: Compare section (Metric Units | Rupees). "How August compares": in units, August against July (with a bridge to the
 * rupees) and against last August; in rupees, August against July with a bridge back to the units.
 */
export function CompareSection({ metric, onSwitch }: { metric: TrendMetric; onSwitch: (metric: TrendMetric) => void }) {
  return (
    <section className="flex flex-col pt-3">
      <SectionHeader title="How August compares" />
      <Card padding={0}>
        {metric === 'units' ? (
          <>
            <div className="flex flex-col">
              <div className="flex flex-col gap-3 p-4">
                <Heading
                  title="August vs July"
                  headline={`${formatUnits(VS_JULY.unitsMore)} more units, up ${formatPct(VS_JULY.unitsPct)}`}
                />
                <BarPair
                  rows={[
                    { label: 'July 2026', value: UNITS_LAST_MONTH },
                    { label: 'August 2026', value: UNITS, primary: true },
                  ]}
                />
              </div>
              <Bridge text={`Your bill is up ${formatINR(VS_JULY.rupeesMore)}.`} link="Show in rupees" onClick={() => onSwitch('rupees')} />
            </div>
            <Separator inset="16" />
            <div className="flex flex-col gap-3 p-4">
              <Heading
                title="August vs last August"
                headline={`${formatUnits(VS_AUG_2025.unitsMore)} more units, up ${formatPct(VS_AUG_2025.unitsPct)}`}
              />
              <BarPair
                rows={[
                  { label: 'August 2025', value: UNITS_AUG_2025 },
                  { label: 'August 2026', value: UNITS, primary: true },
                ]}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-col gap-3 p-4">
              <Heading
                title="August vs July"
                headline={`${formatINR(VS_JULY.rupeesMore)} more, up ${formatPct(VS_JULY.rupeesPct)}`}
              />
            </div>
            <Bridge text={`You used ${formatUnits(VS_JULY.unitsMore)} more units.`} link="Show in units" onClick={() => onSwitch('units')} />
          </div>
        )}
      </Card>
    </section>
  );
}
