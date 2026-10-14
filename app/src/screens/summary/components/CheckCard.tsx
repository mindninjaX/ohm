import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { Badge, Card, CheckLine, EASE_OUT, Tile, useReduced } from '@/components/ohm';
import { cn } from '@/lib/utils';
import { GrowBar, useSeen } from './primitives';

/**
 * Figma: Ohm / Check card (Card padding 16 holding a Check card body): the Check line (title and
 * what Ohm found), an Evidence tile that shows the proof, and optionally a stake or a link.
 *
 * Motion: the tick starts as a dashed circle and turns into the green check, drawing in, once the
 * card is in view; `index` staggers the cards that arrive together (60 ms each after the first
 * 250 ms). Capture mode shows every check already passed.
 */
export function CheckCard({
  title,
  result,
  index = 0,
  children,
}: {
  title: string;
  result: string;
  /** Position among the cards that arrive together, for the stagger. */
  index?: number;
  children?: ReactNode;
}) {
  const [ref, passed] = useSeen<HTMLDivElement>(250 + index * 120);
  return (
    <Card ref={ref} padding={16} data-slot="check-card">
      <CheckLine state={passed ? 'pass' : 'pending'} title={title} result={result} />
      {children}
    </Card>
  );
}

// ---------------------------------------------------------------- the evidence visuals

/** One label and value on a line of an evidence tile. */
function EvidenceRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="min-w-0 flex-1 text-sm text-ink-muted">{label}</span>
      <span className="shrink-0 text-sm font-medium text-ink">{value}</span>
    </div>
  );
}

/** Check visual / Receipt: two inputs, a rule, the result (check 1 and check 2). */
export function ReceiptTile({
  rows,
  result,
}: {
  rows: readonly [string, string][];
  result: [string, string];
}) {
  return (
    <Tile>
      <div className="flex flex-col">
        {rows.map(([label, value], i) => (
          <EvidenceRow key={label} label={label} value={value} className={i === 0 ? 'pb-1' : undefined} />
        ))}
        <div className="py-1.5">
          <div className="h-px bg-line" />
        </div>
        <div className="flex items-center gap-2">
          <span className="min-w-0 flex-1 text-sm font-medium text-ink">{result[0]}</span>
          <span className="shrink-0 text-sm font-semibold text-ink-strong">{result[1]}</span>
        </div>
      </div>
    </Tile>
  );
}

/** Check visual / Compare (Size Check): the first bill against this bill, two bars on the same scale. */
export function CompareTile({
  rows,
}: {
  rows: readonly { label: string; value: string; pct: number; tone: 'first' | 'this' }[];
}) {
  return (
    <Tile className="gap-3">
      {rows.map((row, i) => (
        <div key={row.label} className="flex flex-col gap-1">
          <EvidenceRow label={row.label} value={row.value} />
          <GrowBar
            pct={row.pct}
            height={8}
            trackClassName="bg-transparent"
            fillClassName={row.tone === 'first' ? 'bg-line-strong' : 'bg-primary'}
            delay={0.1 + i * 0.12}
          />
        </div>
      ))}
    </Tile>
  );
}

/** Check visual / Business and plan: two facts and a badge. */
export function BusinessTile({
  rows,
  badge,
}: {
  rows: readonly [string, string][];
  badge: string;
}) {
  return (
    <Tile className="gap-3">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center gap-3">
          <span className="min-w-0 flex-1 text-sm text-ink-muted">{label}</span>
          <span className="shrink-0 text-right text-sm font-medium text-ink">{value}</span>
        </div>
      ))}
      <Badge tone="success" size="s" icon>
        {badge}
      </Badge>
    </Tile>
  );
}

const ARROW = 'M0 5 L112 5 M112 5 L105 0 M112 5 L105 10';

/** Check visual / Meter chain: the meter count, times the multiplier, gives the units billed. */
export function MeterChain({
  from,
  fromCaption,
  operator,
  to,
  toCaption,
}: {
  from: string;
  fromCaption: string;
  operator: string;
  to: string;
  toCaption: string;
}) {
  const reduced = useReduced();
  const [ref, seen] = useSeen<HTMLDivElement>();
  const chip = (value: string, caption: string) => (
    <div className="flex shrink-0 flex-col rounded-[10px] bg-surface-muted px-2.5 py-2">
      <span className="text-sm font-semibold text-ink-strong">{value}</span>
      <span className="text-xs text-ink-muted">{caption}</span>
    </div>
  );
  return (
    <div ref={ref} className="flex items-center gap-2">
      {chip(from, fromCaption)}
      <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
        <span className="text-sm font-semibold text-ink-strong">{operator}</span>
        <svg width={112} height={10} viewBox="0 0 112 10" fill="none" aria-hidden="true" style={{ overflow: 'visible' }}>
          <motion.path
            d={ARROW}
            stroke="var(--ink-muted)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: seen || reduced ? 1 : 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
          />
        </svg>
      </div>
      {chip(to, toCaption)}
    </div>
  );
}

/** Check visual / Headroom: peak demand against the booked power, and the power factor. */
export function HeadroomTile({
  peakLabel,
  peakValue,
  pct,
  factorLabel,
  factorValue,
}: {
  peakLabel: string;
  peakValue: string;
  pct: number;
  factorLabel: string;
  factorValue: string;
}) {
  return (
    <Tile className="gap-3">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-ink-muted">{peakLabel}</span>
          <span className="text-xs font-medium text-ink">{peakValue}</span>
        </div>
        <GrowBar pct={pct} height={6} trackClassName="bg-line" fillClassName="bg-primary" delay={0.1} />
      </div>
      <div className="flex items-center gap-3">
        <span className="min-w-0 flex-1 text-xs text-ink-muted">{factorLabel}</span>
        <span className="text-right text-xs font-medium text-ink">{factorValue}</span>
      </div>
    </Tile>
  );
}
