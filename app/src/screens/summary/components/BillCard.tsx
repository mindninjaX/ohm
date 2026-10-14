import { Info } from 'lucide-react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import { Amount, DueLine, EASE_OUT, ReassuranceRow, Separator, useReduced } from '@/components/ohm';
import {
  DUE_DATE,
  EARLY_DEADLINE,
  EARLY_PRICE,
  EARLY_WINDOW,
  SAVING,
  TOTAL,
} from '@/data/bill';
import { formatDate, formatINR } from '@/lib/format';
import { useCapture } from '@/shell';
import { PiggyBankIcon } from './primitives';

const DUE_TEXT = `Due ${formatDate(DUE_DATE)}`;

function daysLeftText(): string {
  const n = EARLY_WINDOW.daysLeft;
  return `${n} ${n === 1 ? 'day' : 'days'} left`;
}

/** Eyebrow, then the bill total (Amount L) with the Due line under it: the top of every Bill card. */
function Figures({ eyebrow, children }: { eyebrow: string; children?: ReactNode }) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-ink-muted">{eyebrow}</p>
        <Amount value={TOTAL} size="l" />
      </div>
      <DueLine size="s">{DUE_TEXT}</DueLine>
      {children}
    </>
  );
}

/** Figma: Bill card / Home, Layout Compact. The bill total and its due date, nothing else (S08). */
export function BillCardCompact({ eyebrow = 'Bill total' }: { eyebrow?: string }) {
  return (
    <div data-slot="bill-card" className="flex flex-col gap-4 rounded-2xl bg-card p-5">
      <Figures eyebrow={eyebrow} />
    </div>
  );
}

/** Figma: Bill card / Home, Layout Summary after early (S06.1). The offer tile says the discount has gone. */
export function BillCardAfterEarly({ onOpenChecks }: { onOpenChecks: () => void }) {
  return (
    <div data-slot="bill-card" className="overflow-hidden rounded-2xl bg-card">
      <div className="flex flex-col gap-4 p-5">
        <Figures eyebrow="August bill">
          <div className="flex gap-2 rounded-xl bg-surface-muted p-3">
            <span className="grid h-5 w-4 shrink-0 place-items-center text-ink-muted">
              <Info size={16} aria-hidden />
            </span>
            <p className="min-w-0 flex-1 text-sm font-medium text-ink">
              The early-payment discount
              <br />
              ended on {formatDate(EARLY_DEADLINE)}
            </p>
          </div>
        </Figures>
      </div>
      <Separator inset="20" />
      <ReassuranceRow onClick={onOpenChecks} />
    </div>
  );
}

/** The card has played its Summary > Summary discounted animation once in this page's life. */
let discountPlayed = false;

/** Figma geometry, in px from the top of the card, for the two layouts. */
const SUMMARY = { height: 269, due: 100, tile: 136, tileHeight: 44, separator: 200, row: 201 } as const;
const DISCOUNTED = { height: 321, due: 212, tile: 132, tileHeight: 64, separator: 252, row: 253 } as const;
/** Top of the total (eyebrow 20 + 20 + 4) and of the early price (… + struck total 28 + 4). */
const TOTAL_TOP = 44;
const EARLY_PRICE_TOP = 76;

const range = (a: number, b: number): [number, number] => [a, b];
const px = (a: number, b: number): [string, string] => [`${a}px`, `${b}px`];

/**
 * Figma: Bill card / Home, Layout Summary, then after 600 ms Smart Animate (ease out) to Layout
 * Summary discounted. The card is laid out exactly as the two Figma layouts and one progress
 * value moves every layer between them: the total shrinks and is struck (the line draws left to
 * right), the early price arrives under it, the offer tile grows to two lines, and the Due line,
 * the divider and the reassurance row slide down by the extra height. The cards below follow the
 * card's height, so the whole page eases down with it.
 *
 * It plays once, the first time the screen opens; coming back shows the discounted card. Capture
 * mode keeps the Figma frame (Summary). Reduced motion swaps the two layouts without moving.
 */
export function BillCardSummary({ onOpenChecks }: { onOpenChecks: () => void }) {
  const capture = useCapture();
  const reduced = useReduced();
  const [startSettled] = useState(() => discountPlayed);
  const [settled, setSettled] = useState(startSettled);
  const strike = useMotionValue(startSettled ? 1 : 0);
  const morph = useMotionValue(startSettled ? 1 : 0);

  useEffect(() => {
    if (capture || startSettled) return;
    let controls: { stop: () => void }[] = [];
    const id = window.setTimeout(() => {
      discountPlayed = true;
      setSettled(true);
      if (reduced) {
        strike.set(1);
        morph.set(1);
        return;
      }
      controls = [
        animate(strike, 1, { duration: 0.3, ease: EASE_OUT }),
        animate(morph, 1, { duration: 0.55, delay: 0.12, ease: EASE_OUT }),
      ];
    }, 600);
    return () => {
      window.clearTimeout(id);
      controls.forEach((c) => c.stop());
    };
  }, [capture, startSettled, reduced, strike, morph]);

  const height = useTransform(morph, [0, 1], range(SUMMARY.height, DISCOUNTED.height));
  const dueY = useTransform(morph, [0, 1], range(0, DISCOUNTED.due - SUMMARY.due));
  const tileY = useTransform(morph, [0, 1], range(0, DISCOUNTED.tile - SUMMARY.tile));
  const tileHeight = useTransform(morph, [0, 1], range(SUMMARY.tileHeight, DISCOUNTED.tileHeight));
  const belowY = useTransform(morph, [0, 1], range(0, DISCOUNTED.separator - SUMMARY.separator));
  const digitSize = useTransform(morph, [0, 1], range(36, 20));
  const digitLine = useTransform(morph, [0, 1], px(40, 28));
  const rupeeSize = useTransform(morph, [0, 1], range(24, 16));
  const rupeeLine = useTransform(morph, [0, 1], px(32, 24));
  const digitColor = useTransform(
    morph,
    (v) => `color-mix(in srgb, var(--ink-muted) ${Math.round(v * 100)}%, var(--ink-strong))`,
  );
  // The Due line has to cross the offer tile to get below it, so it fades out, moves unseen, and fades back in.
  const dueOpacity = useTransform(morph, [0, 0.25, 0.6, 1], [1, 0, 0, 1]);
  const summaryText = useTransform(morph, [0, 0.35], range(1, 0));
  const discountText = useTransform(morph, [0.3, 0.9], range(0, 1));
  const earlyOpacity = useTransform(morph, [0.35, 1], range(0, 1));
  const earlyY = useTransform(morph, [0.35, 1], range(8, 0));

  return (
    <motion.div data-slot="bill-card" className="relative overflow-hidden rounded-2xl bg-card" style={{ height }}>
      <p className="absolute top-5 left-5 text-sm font-medium text-ink-muted">August bill</p>

      {/* The total: Size L, then Size S struck. */}
      <motion.div
        className="absolute left-5 inline-flex items-baseline gap-0.5 font-semibold"
        style={{ top: TOTAL_TOP, height: digitLine }}
      >
        <span className="sr-only">Was </span>
        <motion.span aria-hidden className="text-ink-muted" style={{ fontSize: rupeeSize, lineHeight: rupeeLine }}>
          ₹
        </motion.span>
        <motion.span aria-hidden style={{ fontSize: digitSize, lineHeight: digitLine, color: digitColor }}>
          {formatINR(TOTAL).slice(1)}
        </motion.span>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[58%] h-[1.5px] origin-left bg-ink-muted"
          style={{ scaleX: strike }}
        />
      </motion.div>

      {/* The early price, Size L, arrives under it. */}
      <motion.div
        className="absolute left-5"
        style={{ top: EARLY_PRICE_TOP, opacity: earlyOpacity, y: earlyY }}
        aria-hidden={!settled}
      >
        <Amount value={EARLY_PRICE} size="l" />
      </motion.div>

      {/* The offer tile: one line of words, then two. */}
      <motion.div
        className="absolute right-5 left-5 rounded-xl bg-success-subtle"
        style={{ top: SUMMARY.tile, y: tileY, height: tileHeight }}
      >
        <span className="absolute top-3 left-3 grid h-5 w-4 place-items-center text-success">
          <PiggyBankIcon />
        </span>
        <motion.p
          aria-hidden={settled}
          className="absolute top-3 right-3 left-9 text-sm font-medium text-ink"
          style={{ opacity: summaryText }}
        >
          Pay by {formatDate(EARLY_DEADLINE)} and <span className="text-success">save {formatINR(SAVING)}</span>
        </motion.p>
        <motion.p
          aria-hidden={!settled}
          className="absolute top-3 right-3 left-9 text-sm font-medium text-ink"
          style={{ opacity: discountText }}
        >
          <span className="text-success">You save {formatINR(SAVING)}</span>
          <br />
          if you pay by {formatDate(EARLY_DEADLINE)} <span className="text-ink-muted">· {daysLeftText()}</span>
        </motion.p>
      </motion.div>

      <motion.div className="absolute right-0 left-0" style={{ top: SUMMARY.due, y: dueY, opacity: dueOpacity }}>
        <div className="pl-5">
          <DueLine size="s">{DUE_TEXT}</DueLine>
        </div>
      </motion.div>

      <motion.div className="absolute right-0 left-0" style={{ top: SUMMARY.separator, y: belowY }}>
        <Separator inset="20" />
      </motion.div>
      <motion.div className="absolute right-0 left-0" style={{ top: SUMMARY.row, y: belowY }}>
        <ReassuranceRow onClick={onOpenChecks} />
      </motion.div>
    </motion.div>
  );
}
