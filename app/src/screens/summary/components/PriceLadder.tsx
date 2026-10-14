import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE_OUT, SPRING, useReduced } from '@/components/ohm';
import {
  DEMO_TODAY,
  EARLY_DEADLINE,
  EARLY_PRICE,
  EARLY_WINDOW,
  LATE_EXTRA,
  LATE_FROM,
  LATE_PRICE,
  DUE_DATE,
  SAVING,
  TOTAL,
} from '@/data/bill';
import { formatDate, formatINR } from '@/lib/format';
import { DEMO_DATES } from '@/shell';
import { cn } from '@/lib/utils';
import { useSeen } from './primitives';

/**
 * Figma: Ohm / Price ladder (Today position Start | After early). A rail with a node per price
 * window and Today marked on it. Every size, offset and colour is the Figma value: rows 24, 72
 * (the active tile) and 48 apart by 16, a 2 px rail at x 5, 12 px nodes at x 0.
 *
 * Motion: when the card first scrolls into view the rail draws down the ladder and each node pops
 * in as the rail reaches it (reduced motion: no drawing, no pop).
 */

type Pace = { go: boolean; reduced: boolean; base: number };

function Rail({ pace, at, className }: { pace: Pace; at: number; className: string }) {
  return (
    <motion.span
      aria-hidden
      className={cn('absolute left-[5px] w-0.5 origin-top', className)}
      initial={{ scaleY: pace.reduced ? 1 : 0 }}
      animate={{ scaleY: pace.go || pace.reduced ? 1 : 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay: pace.base + at }}
    />
  );
}

type NodeKind = 'now' | 'active' | 'next';

const NODE: Record<NodeKind, string> = {
  /** Filled, with a 3 px white ring outside it (Today, and the active window once Today has moved on). */
  now: 'bg-ink-strong shadow-[0_0_0_3px_var(--card)]',
  active: 'border-2 border-ink-strong bg-card',
  next: 'border-2 border-line-strong bg-card',
};

function Node({ pace, at, kind, top }: { pace: Pace; at: number; kind: NodeKind; top: number }) {
  return (
    <motion.span
      aria-hidden
      className={cn('absolute left-0 size-3 rounded-full', NODE[kind])}
      style={{ top }}
      initial={{ scale: pace.reduced ? 1 : 0 }}
      animate={{ scale: pace.go || pace.reduced ? 1 : 0 }}
      transition={pace.reduced ? { duration: 0 } : { ...SPRING.pop, delay: pace.base + at }}
    />
  );
}

function Dashes({ pace, at }: { pace: Pace; at: number }) {
  return (
    <motion.span
      aria-hidden
      className="absolute top-[22px] left-[5px] flex w-0.5 flex-col gap-1"
      initial={{ opacity: pace.reduced ? 1 : 0 }}
      animate={{ opacity: pace.go || pace.reduced ? 1 : 0 }}
      transition={{ duration: 0.3, delay: pace.base + at }}
    >
      <span className="h-1 bg-line-strong" />
      <span className="h-1 bg-line-strong" />
      <span className="h-1 bg-line-strong" />
    </motion.span>
  );
}

/** Title on the left, amount on the right, both sitting on the bottom of a 24 tall line. */
function Line({ title, amount, titleClassName, amountClassName }: {
  title: string;
  amount: ReactNode;
  titleClassName?: string;
  amountClassName?: string;
}) {
  return (
    <div className="flex items-end gap-2">
      <span className={cn('min-w-0 flex-1 text-sm font-medium text-ink', titleClassName)}>{title}</span>
      <span className={cn('shrink-0 text-base font-semibold text-ink-strong', amountClassName)}>{amount}</span>
    </div>
  );
}

const dayAfter = DEMO_DATES.after;
const BETWEEN = `${formatDate(dayAfter)} to ${formatDate(DUE_DATE)}`;
const LATE_ROW = {
  title: `From ${formatDate(LATE_FROM)}`,
  amount: formatINR(LATE_PRICE),
  sub: `${formatINR(LATE_EXTRA)} late charge`,
};

function daysLeftText(): string {
  const n = EARLY_WINDOW.daysLeft;
  return `${n} ${n === 1 ? 'day' : 'days'} left`;
}

export interface PriceLadderProps {
  mode?: 'start' | 'after-early';
  /** Seconds before the rail starts to draw, once the card is in view. */
  delay?: number;
}

export function PriceLadder({ mode = 'start', delay = 0.3 }: PriceLadderProps) {
  const reduced = useReduced();
  const [ref, go] = useSeen<HTMLDivElement>();
  const pace: Pace = { go, reduced, base: delay };
  const afterEarly = mode === 'after-early';

  return (
    <div ref={ref} data-slot="price-ladder" className="flex flex-col gap-4 rounded-2xl bg-card p-5">
      <h2 className="text-base font-semibold text-ink-strong">
        {afterEarly ? (
          <>
            Pay by {formatDate(DUE_DATE)}
            <br />
            to avoid the late charge
          </>
        ) : (
          `Pay early, save ${formatINR(SAVING)}`
        )}
      </h2>

      <div className="flex flex-col gap-4">
        {afterEarly ? (
          <>
            {/* Row 1, past: quiet, the early price struck through. */}
            <div className="relative pl-6">
              <div className="flex flex-col gap-1 px-3">
                <Line
                  title={`By ${formatDate(EARLY_DEADLINE)}`}
                  titleClassName="text-ink-muted"
                  amount={<s className="decoration-ink-muted">{formatINR(EARLY_PRICE)}</s>}
                  amountClassName="text-ink-muted"
                />
                <p className="text-sm text-ink-muted">You could have saved {formatINR(SAVING)}</p>
              </div>
              <Rail pace={pace} at={0} className="top-3 h-[76px] bg-line-strong" />
              <Node pace={pace} at={0} kind="next" top={6} />
            </div>
            {/* Row 2, today: the grey tile. */}
            <div className="relative pl-6">
              <div className="flex flex-col gap-1 rounded-xl bg-surface-muted p-3">
                <Line title={BETWEEN} amount={formatINR(TOTAL)} />
                <p className="text-sm text-ink-muted">Full bill, no discount</p>
              </div>
              <Rail pace={pace} at={0.25} className="top-6 h-[76px] bg-line-strong" />
              <Node pace={pace} at={0.2} kind="now" top={18} />
            </div>
            <LateRow pace={pace} dashAt={0.5} nodeAt={0.5} />
          </>
        ) : (
          <>
            {/* Today. */}
            <div className="relative flex h-6 items-center pl-6">
              <p className="text-sm font-semibold text-ink-strong">
                Today, {formatDate(DEMO_TODAY)}
              </p>
              <Rail pace={pace} at={0.1} className="top-3 h-[52px] bg-ink-strong" />
              <Node pace={pace} at={0} kind="now" top={6} />
            </div>
            {/* Row 1, active: the green tile. */}
            <div className="relative pl-6">
              <div className="flex flex-col gap-1 rounded-xl bg-success-subtle p-3">
                <Line title={`By ${formatDate(EARLY_DEADLINE)}`} amount={formatINR(EARLY_PRICE)} />
                <p className="text-sm text-success">{daysLeftText()}</p>
              </div>
              <Rail pace={pace} at={0.35} className="top-6 h-[76px] bg-line-strong" />
              <Node pace={pace} at={0.3} kind="active" top={18} />
            </div>
            {/* Row 2. */}
            <div className="relative pl-6">
              <div className="flex flex-col gap-1 px-3">
                <Line title={BETWEEN} amount={formatINR(TOTAL)} />
                <p className="text-sm text-ink-muted">Full bill, no discount</p>
              </div>
              <Rail pace={pace} at={0.6} className="top-3 h-16 bg-line-strong" />
              <Node pace={pace} at={0.55} kind="next" top={6} />
            </div>
            <LateRow pace={pace} dashAt={0.85} nodeAt={0.8} />
          </>
        )}
      </div>
    </div>
  );
}

/** Row 3: the late charge, the end of the ladder (an open dashed rail under its node). */
function LateRow({ pace, dashAt, nodeAt }: { pace: Pace; dashAt: number; nodeAt: number }) {
  return (
    <div className="relative pl-6">
      <div className="flex flex-col gap-1 px-3">
        <Line title={LATE_ROW.title} amount={LATE_ROW.amount} />
        <p className="text-sm text-danger">{LATE_ROW.sub}</p>
      </div>
      <Dashes pace={pace} at={dashAt} />
      <Node pace={pace} at={nodeAt} kind="next" top={6} />
    </div>
  );
}
