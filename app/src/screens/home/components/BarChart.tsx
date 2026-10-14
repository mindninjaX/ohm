import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { EASE_OUT, useReduced } from '@/components/ohm';
import { cn } from '@/lib/utils';
import { SCALE } from '../trends-data';

/**
 * Figma: Ohm / Bar chart (Compact on Home, Full on Trends, Rupees on "Months building up") built from
 * Ohm / Chart bar (Default, Selected). Geometry is read from the frames:
 *   Compact  plot 114 tall, baseline at 87.5, bars 24 wide spread over 305 px, 88 px = 4 lakh.
 *   Full     plot 226 tall, gridlines every 50 px (4 lakh = 200 px) with tick labels at x 295, bars 22 wide
 *            (8 months) or 24 wide (5 months) centred in 289 px.
 *   Rupees   plot 150 tall, two bars 72 wide 56 apart, July 100 px tall, value label over the unselected bar.
 * Every bar is a column [bar][6][20 label], so the baseline sits 26 px above the bottom of the plot.
 */
/** Charts that have already grown in. */
const GROWN = new Set<string>();

export type BarChartVariant = 'compact' | 'full' | 'rupees';

export interface BarDatum {
  key: string;
  /** Under the bar: "Jan". */
  label: string;
  value: number;
  /** For screen readers: "May 2026, 3,42,210 units". */
  description: string;
  /** Rupees variant: the amount printed over an unselected bar. */
  valueLabel?: string;
}

export interface BarChartProps {
  variant: BarChartVariant;
  data: readonly BarDatum[];
  selectedKey: string;
  onSelect?: (key: string) => void;
  /** "2026": the bracket under the bars. */
  yearLabel: string;
  /** Bars grow again even if this chart has grown before (a tap on a tab or a switch). Default: they grow on the first view only. */
  replay?: boolean;
  /** Unique per chart: the selected-month pill slides inside its own chart, and the chart remembers it has grown. */
  chartId: string;
  groupLabel: string;
}

const GRID_LINES = [
  { top: 0, tickTop: -8, tick: '4 lakh' },
  { top: 49.5, tickTop: 42, tick: '3 lakh' },
  { top: 99.5, tickTop: 92, tick: '2 lakh' },
  { top: 149.5, tickTop: 142, tick: '1 lakh' },
  { top: 199.5, tickTop: 192, tick: '0' },
] as const;

/**
 * Chrome snaps a layout offset like `top: 49.5px` to a whole CSS pixel, but Figma draws these lines on the half pixel (a 1 px
 * line at 49.5 covers two device pixels at 2x). A transform keeps the half pixel.
 */
function subpixelTop(top: number): CSSProperties {
  const whole = Math.floor(top);
  return top === whole ? { top } : { top: whole, transform: `translateY(${top - whole}px)` };
}

interface Geometry {
  plotHeight: number;
  scale: number;
  barWidth: (count: number) => number;
  baselineTop: number;
  /** gap between the plot and the years row. */
  gap: string;
}

const GEOMETRY: Record<BarChartVariant, Geometry> = {
  compact: { plotHeight: 114, scale: SCALE.compact, barWidth: () => 24, baselineTop: 87.5, gap: 'gap-2' },
  full: { plotHeight: 226, scale: SCALE.full, barWidth: (n) => (n <= 6 ? 24 : 22), baselineTop: 199.5, gap: 'gap-1.5' },
  rupees: { plotHeight: 150, scale: SCALE.rupees, barWidth: () => 72, baselineTop: 123.5, gap: 'gap-2' },
};

export function BarChart({
  variant,
  data,
  selectedKey,
  onSelect,
  yearLabel,
  replay = false,
  chartId,
  groupLabel,
}: BarChartProps) {
  const g = GEOMETRY[variant];
  const reduced = useReduced();
  const plotRef = useRef<HTMLDivElement>(null);
  const inView = useInView(plotRef, { once: true, amount: 0.35 });
  // Decided once, when the chart mounts: Back and tab switches show a chart that has grown before standing.
  const [grow] = useState(() => !reduced && (replay || !GROWN.has(chartId)));
  useEffect(() => {
    if (inView) GROWN.add(chartId);
  }, [inView, chartId]);
  const shown = !grow || inView;
  const barWidth = g.barWidth(data.length);

  const barsPosition =
    variant === 'compact'
      ? 'inset-x-2 justify-between'
      : variant === 'full'
        ? 'left-0 right-10 justify-around'
        : 'left-1/2 w-[200px] -translate-x-1/2 justify-between';

  return (
    <div data-slot="bar-chart" data-variant={variant} className={cn('flex w-full flex-col', g.gap)}>
      <div ref={plotRef} role="group" aria-label={groupLabel} className="relative w-full" style={{ height: g.plotHeight }}>
        {variant === 'full' ? (
          <>
            {/* The grid and its tick labels: 34 px of ticks at the right, the rest is grid (289 px in the 329 px plot). */}
            <div aria-hidden className="absolute inset-y-0 left-0 right-10">
              {GRID_LINES.map((line) => (
                <span key={line.tick} className="absolute inset-x-0 h-px bg-line" style={subpixelTop(line.top)} />
              ))}
            </div>
            {GRID_LINES.map((line) => (
              <span
                key={line.tick}
                aria-hidden
                className="absolute right-0 h-4 w-[34px] text-xs leading-4 whitespace-nowrap text-ink-muted"
                style={{ top: line.tickTop }}
              >
                {line.tick}
              </span>
            ))}
          </>
        ) : (
          <span aria-hidden className="absolute inset-x-0 h-px bg-line" style={subpixelTop(g.baselineTop)} />
        )}
        <div className={cn('absolute bottom-0 flex items-end', barsPosition, variant === 'rupees' && 'gap-14')}>
          {data.map((d, i) => {
            const selected = d.key === selectedKey;
            const height = d.value * g.scale;
            return (
              <button
                key={d.key}
                type="button"
                disabled={!onSelect}
                aria-pressed={selected}
                aria-label={d.description}
                onClick={() => onSelect?.(d.key)}
                className={cn(
                  'group relative flex shrink-0 flex-col items-center outline-none',
                  'before:absolute before:inset-y-0 before:-inset-x-1.5 before:content-[""]',
                  onSelect ? 'cursor-pointer' : 'cursor-default',
                )}
                style={{ width: barWidth }}
              >
                {variant === 'rupees' && !selected && d.valueLabel && (
                  <span className="mb-1.5 h-4 text-xs leading-4 font-semibold whitespace-nowrap text-ink-strong">
                    {d.valueLabel}
                  </span>
                )}
                <motion.span
                  aria-hidden
                  className={cn(
                    'block w-full rounded-t-[4px] transition-colors duration-200',
                    selected ? 'bg-primary' : 'bg-line-strong',
                    onSelect && 'group-focus-visible:ring-[3px] group-focus-visible:ring-primary/40',
                  )}
                  initial={{ height: shown ? height : 0 }}
                  animate={{ height: shown ? height : 0 }}
                  transition={
                    grow ? { duration: 0.75, ease: EASE_OUT, delay: 0.1 + i * 0.05 } : { duration: reduced ? 0 : 0.35, ease: EASE_OUT }
                  }
                />
                <span className="relative mt-1.5 flex h-5 items-center justify-center">
                  {selected && (
                    <motion.span
                      layoutId={`${chartId}-pill`}
                      aria-hidden
                      className="absolute -inset-x-[3px] inset-y-0 bg-primary"
                      style={{ borderRadius: 10 }}
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 38 }}
                    />
                  )}
                  <span
                    className={cn(
                      'relative text-xs leading-4 whitespace-nowrap transition-colors duration-200',
                      selected ? 'font-semibold text-white' : 'font-medium text-ink-muted',
                    )}
                  >
                    {d.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className={cn('flex h-5', variant === 'full' && 'ml-0.5 mr-[42px]')}>
        <div className="flex w-full flex-col items-center gap-[3px]">
          <span aria-hidden className="h-px w-full bg-line" />
          <span className="h-4 text-xs leading-4 font-medium text-ink-muted">{yearLabel}</span>
        </div>
      </div>
    </div>
  );
}
