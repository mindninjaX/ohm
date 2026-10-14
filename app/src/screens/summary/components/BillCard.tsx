import { Info } from 'lucide-react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import { Amount, DueLine, EASE_OUT, ReassuranceRow, Separator, Tile, useReduced } from '@/components/ohm';
import {
  DUE_DATE,
  EARLY_DEADLINE,
  EARLY_PRICE,
  EARLY_WINDOW,
  SAVING,
  TOTAL,
} from '@/data/bill';
import { formatDate, formatINR } from '@/lib/format';
import { normalizePath } from '@/routes';
import { usePaymentView } from '@/screens/pay/payment';
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

/** Figma: Bill card / Home, Layout Paid, on the bill summary (the bill is paid; Back from Paid or Home lands here). */
export function BillCardPaid({ onOpenChecks }: { onOpenChecks: () => void }) {
  const payment = usePaymentView();
  return (
    <div data-slot="bill-card" data-state="paid" className="overflow-hidden rounded-2xl bg-card">
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-ink-muted">August bill</p>
          <Amount value={payment.amount} size="l" />
        </div>
        <DueLine tone="paid" size="s">{`Paid ${formatDate(payment.paidAt)}`}</DueLine>
        <Tile tone="muted">
          <div className="flex gap-2">
            <span className="grid h-5 w-4 shrink-0 place-items-center text-ink-muted">
              <Info size={16} aria-hidden />
            </span>
            <p className="text-sm font-medium text-ink">Waiting for Northgrid to confirm</p>
          </div>
        </Tile>
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
/** Top of the total (eyebrow 20 + 20 + 4). The early price arrives under the struck total (+ 28 + 4). */
const TOTAL_TOP = 44;
const EARLY_PRICE_TOP = 76;

/**
 * The struck total is laid out once, as in Summary discounted (rupee sign 16 / 24, digits 20 / 28, baseline
 * aligned), and scaled back up to Summary (24 / 32 and 36 / 40) with transforms, so the shrink never re-lays out
 * text or snaps glyphs to pixels. Each part scales about the left end of its own baseline, so its glyphs end up
 * exactly where the Size L Amount draws them. Numbers measured from the two layouts (Inter, Semi Bold):
 */
/** Rupee sign 16 to 24 px, digits 20 to 36 px. */
const RUPEE_SCALE = 24 / 16;
const DIGITS_SCALE = 36 / 20;
/** The baseline sits 21 px under the top of the box in Summary discounted and 33 px in Summary. */
const BASELINE_DROP = 33 - 21;
/** Baseline of each part inside its own box in Summary discounted (the rupee sign sits 3 px lower than the digits). */
const RUPEE_BASELINE = 18;
const DIGITS_BASELINE = 21;
/** The rupee sign is 9.02 px wide at 16 px; at 24 px it is half as wide again, so the digits start that much later. */
const RUPEE_WIDTH = 9.02;
const DIGITS_SHIFT = RUPEE_WIDTH * (RUPEE_SCALE - 1);
/** Width of the whole total: 108.08 in Summary discounted, 13.53 + 2 + 36 / 20 x 97.06 in Summary. The line through it follows. */
const TOTAL_WIDTH_SCALE = (RUPEE_WIDTH * RUPEE_SCALE + 2 + 97.06 * DIGITS_SCALE) / (RUPEE_WIDTH + 2 + 97.06);
/** The line sits at 58% of the box (40 tall in Summary, 28 in Summary discounted). */
const STRIKE_DROP = 0.58 * 40 - 0.58 * 28;
/** How far the Due line moves down to get under the offer tile. */
const DUE_SHIFT = DISCOUNTED.due - SUMMARY.due;

/** Strike: slow start, slow finish, so the whole line is seen being drawn. */
const STRIKE_EASE = [0.65, 0, 0.35, 1] as const;
const STRIKE_SECONDS = 0.45;
/** The shrink starts as the line lands. */
const MORPH_SECONDS = 0.6;
const MORPH_DELAY = 0.4;

const range = (a: number, b: number): [number, number] => [a, b];

/** The route in the address bar (a screen behind a sheet is rendered with its own path, not the sheet's). */
function addressBarPath(): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const { pathname } = window.location;
  return normalizePath(base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname);
}

/**
 * Figma: Bill card / Home, Layout Summary, then after 600 ms Smart Animate (ease out) to Layout
 * Summary discounted. The card is laid out exactly as the two Figma layouts and one progress
 * value moves every layer between them: the total shrinks and is struck (the line draws left to
 * right, then the shrink follows), the early price arrives under it, the offer tile grows to two
 * lines, and the Due line, the divider and the reassurance row slide down by the extra height.
 * The cards below follow the card's height, so the whole page eases down with it.
 *
 * It plays once, the first time the screen opens; coming back shows the discounted card. Capture
 * mode keeps the Figma frame (Summary) on /bill itself and the discounted card behind a sheet
 * (S09's Figma frame shows it that way). Reduced motion swaps the two layouts without moving.
 */
export function BillCardSummary({ onOpenChecks }: { onOpenChecks: () => void }) {
  const capture = useCapture();
  const reduced = useReduced();
  const [holdFigmaStart] = useState(() => capture && addressBarPath() === '/bill');
  const [startSettled] = useState(() => discountPlayed || (capture && !holdFigmaStart));
  const [settled, setSettled] = useState(startSettled);
  const strike = useMotionValue(startSettled ? 1 : 0);
  const morph = useMotionValue(startSettled ? 1 : 0);
  // The Due line has to cross the offer tile to get below it: it fades out where it is, moves unseen, fades back in.
  const dueOpacity = useMotionValue(1);
  const dueY = useMotionValue(startSettled ? DUE_SHIFT : 0);

  useEffect(() => {
    if (capture || startSettled) return;
    let controls: { stop: () => void }[] = [];
    const id = window.setTimeout(() => {
      discountPlayed = true;
      setSettled(true);
      if (reduced) {
        strike.set(1);
        morph.set(1);
        dueY.set(DUE_SHIFT);
        return;
      }
      const timing = { duration: MORPH_SECONDS, delay: MORPH_DELAY };
      controls = [
        animate(strike, 1, { duration: STRIKE_SECONDS, ease: STRIKE_EASE }),
        animate(morph, 1, { ...timing, ease: EASE_OUT }),
        animate(dueOpacity, [1, 0, 0, 1], { ...timing, times: [0, 0.2, 0.65, 1], ease: 'easeInOut' }),
        animate(dueY, [0, 0, DUE_SHIFT, DUE_SHIFT], { ...timing, times: [0, 0.2, 0.27, 1], ease: 'linear' }),
      ];
    }, 600);
    return () => {
      window.clearTimeout(id);
      controls.forEach((c) => c.stop());
    };
  }, [capture, startSettled, reduced, strike, morph, dueOpacity, dueY]);

  const height = useTransform(morph, [0, 1], range(SUMMARY.height, DISCOUNTED.height));
  const tileY = useTransform(morph, [0, 1], range(0, DISCOUNTED.tile - SUMMARY.tile));
  const tileHeight = useTransform(morph, [0, 1], range(SUMMARY.tileHeight, DISCOUNTED.tileHeight));
  const belowY = useTransform(morph, [0, 1], range(0, DISCOUNTED.separator - SUMMARY.separator));
  const rupeeScale = useTransform(morph, [0, 1], range(RUPEE_SCALE, 1));
  const digitsScale = useTransform(morph, [0, 1], range(DIGITS_SCALE, 1));
  const digitsX = useTransform(morph, [0, 1], range(DIGITS_SHIFT, 0));
  const totalY = useTransform(morph, [0, 1], range(BASELINE_DROP, 0));
  const strikeWidth = useTransform(morph, [0, 1], range(TOTAL_WIDTH_SCALE, 1));
  const strikeY = useTransform(morph, [0, 1], range(STRIKE_DROP, 0));
  const digitColor = useTransform(
    morph,
    (v) => `color-mix(in srgb, var(--ink-muted) ${Math.round(v * 100)}%, var(--ink-strong))`,
  );
  const summaryText = useTransform(morph, [0, 0.35], range(1, 0));
  const discountText = useTransform(morph, [0.3, 0.9], range(0, 1));
  const earlyOpacity = useTransform(morph, [0.35, 1], range(0, 1));
  const earlyY = useTransform(morph, [0.35, 1], range(8, 0));

  return (
    <motion.div data-slot="bill-card" className="relative overflow-hidden rounded-2xl bg-card" style={{ height }}>
      <p className="absolute top-5 left-5 text-sm font-medium text-ink-muted">August bill</p>

      {/* The total: Size L, then Size S struck. */}
      <div
        className="absolute left-5 inline-flex h-7 items-baseline gap-0.5 font-semibold"
        style={{ top: TOTAL_TOP }}
      >
        <span className="sr-only">Was </span>
        <motion.span
          aria-hidden
          className="text-base text-ink-muted"
          style={{ scale: rupeeScale, y: totalY, transformOrigin: `0px ${RUPEE_BASELINE}px` }}
        >
          ₹
        </motion.span>
        <motion.span
          aria-hidden
          className="text-xl"
          style={{
            scale: digitsScale,
            x: digitsX,
            y: totalY,
            transformOrigin: `0px ${DIGITS_BASELINE}px`,
            color: digitColor,
          }}
        >
          {formatINR(TOTAL).slice(1)}
        </motion.span>
        {/* The line is drawn left to right inside a box that follows the width and the height of the total. */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[58%] h-[1.5px] origin-left"
          style={{ scaleX: strikeWidth, y: strikeY }}
        >
          <motion.span className="block h-full w-full origin-left bg-ink-muted" style={{ scaleX: strike }} />
        </motion.span>
      </div>

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
