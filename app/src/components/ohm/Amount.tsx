import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { formatINR } from '@/lib/format';
import { cn } from '@/lib/utils';
import { EASE_OUT, useReduced } from './lib/motion';
import { seenCounts, useRoutePath } from './lib/seen';

export type AmountSize = 'xl' | 'l' | 'm' | 's';

export interface AmountProps {
  /** Rupees. Formatted with Indian grouping: 3642160 shows as 36,42,160. */
  value: number;
  size?: AmountSize;
  /** The old price being replaced: all text goes `ink-muted` and a line is drawn through it. */
  struck?: boolean;
  /** Count up from `countFrom` the first time it scrolls into view, once per screen. The digits grow rightwards from the rupee sign. */
  countUp?: boolean;
  /**
   * Rupees the count starts from. Default 0. A payment confirmation passes about 95 % of the value, so "Paid ₹0" is
   * never on screen. Only used with `countUp`.
   */
  countFrom?: number;
  /** Seconds to wait before the count starts (after the check pops, for example). Default 0. */
  countDelay?: number;
  /** Count on every mount, not only the first time this figure is seen on this path. Default false. */
  replay?: boolean;
  className?: string;
}

/**
 * Rupee sign Text-3xl / 2xl / lg / base; digits Text-5xl / 4xl / 2xl / xl. All Semi Bold.
 * Figma aligns the two texts by baseline. In a browser that puts the rupee sign 12, 9, 4 and 3 px below the top of the
 * digits at XL, L, M and S, which is where Figma's own 2x export draws it (the Figma boxes say 12, 8, 4, 3: its text
 * baseline is rounded differently). The same alignment makes the L box 41 tall, 1 px more than the digits' line and
 * than Figma's 40, so the box has the digits' height and the rupee sign is placed (`drop`) rather than baseline-aligned.
 */
const sizes: Record<AmountSize, { rupee: string; digits: string; drop: string; box: string }> = {
  xl: { rupee: 'text-3xl', digits: 'text-5xl', drop: 'mt-3', box: 'h-12' },
  l: { rupee: 'text-2xl', digits: 'text-4xl', drop: 'mt-[9px]', box: 'h-10' },
  m: { rupee: 'text-lg', digits: 'text-2xl', drop: 'mt-1', box: 'h-8' },
  s: { rupee: 'text-base', digits: 'text-xl', drop: 'mt-[3px]', box: 'h-7' },
};

const COUNT_SECONDS = 0.9;

/** True once the element has been at least 60 % in view. Without an IntersectionObserver (jsdom) it is true at once. */
function useSeenOnce(ref: RefObject<HTMLElement | null>): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return seen;
}

/** "₹36,42,160" becomes { negative: false, digits: "36,42,160" }. */
function splitAmount(value: number, decimals?: number): { negative: boolean; digits: string } {
  const text = formatINR(value, { decimals });
  const negative = text.startsWith('−');
  return { negative, digits: text.slice(negative ? 2 : 1) };
}

/**
 * The digits counting up from `from` (0 unless the caller says otherwise) when they first scroll into view, then settling on the real figure.
 * It counts once per `path:value:size`: coming back to a screen shows the figure at once.
 * The box is always as wide as the final figure (the count is laid over an invisible copy of it, so
 * the width never changes while it counts), the count grows rightwards from the left edge (so it never
 * runs under the rupee sign) and the real text is there once, for screen readers.
 */
function CountingDigits({
  value,
  from,
  size,
  decimals,
  delay,
  replay,
  className,
}: {
  value: number;
  from: number;
  size: AmountSize;
  decimals: number;
  delay: number;
  replay: boolean;
  className: string;
}) {
  const path = useRoutePath();
  const seenKey = `${path ?? ''}:${value}:${size}`;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useSeenOnce(ref);
  // Decided once, when it mounts: an amount that has counted before is shown as it is.
  const [done, setDone] = useState(() => !replay && seenCounts.has(seenKey));
  const progress = useMotionValue(from);
  const shown = useTransform(progress, (v) =>
    splitAmount(decimals === 0 ? Math.round(v) : v, decimals).digits,
  );

  useEffect(() => {
    if (!inView || done) return;
    seenCounts.add(seenKey);
    const controls = animate(progress, value, {
      duration: COUNT_SECONDS,
      delay,
      ease: EASE_OUT,
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [inView, done, progress, value, seenKey, delay]);

  const final = splitAmount(value, decimals).digits;
  return (
    <span className={cn(className, 'relative inline-block')}>
      {done ? (
        final
      ) : (
        <>
          <span className="sr-only">{final}</span>
          {/* Reserves the final width without a second copy of the text. */}
          <span aria-hidden data-final={final} className="invisible before:content-[attr(data-final)]" />
          <motion.span ref={ref} aria-hidden className="absolute top-0 left-0 whitespace-nowrap">
            {shown}
          </motion.span>
        </>
      )}
    </span>
  );
}

/**
 * Figma: Ohm / Amount. The rupee sign is smaller and `ink-muted`; the digits are `ink-strong`.
 * `struck` draws the strike left to right over 300 ms. `countUp` counts from `countFrom` (0) when first seen.
 */
export function Amount({
  value,
  size = 'l',
  struck = false,
  countUp = false,
  countFrom = 0,
  countDelay = 0,
  replay = false,
  className,
}: AmountProps) {
  const reduced = useReduced();
  const s = sizes[size];
  const decimals = Number.isInteger(value) ? 0 : 2;
  const { negative, digits } = splitAmount(value, decimals);
  const tone = (normal: string) => cn('transition-colors duration-300', struck ? 'text-ink-muted' : normal);
  const digitClass = cn(s.digits, tone('text-ink-strong'));

  return (
    <span data-slot="amount" className={cn('relative inline-flex items-start gap-0.5 font-semibold', s.box, className)}>
      {struck && <span className="sr-only">Was </span>}
      {negative && (
        <span aria-hidden className={cn(s.digits, tone('text-ink-strong'))}>
          −
        </span>
      )}
      <span aria-hidden className={cn(s.rupee, s.drop, tone('text-ink-muted'))}>
        ₹
      </span>
      {countUp && !reduced ? (
        <CountingDigits
          value={value}
          from={countFrom}
          size={size}
          decimals={decimals}
          delay={countDelay}
          replay={replay}
          className={digitClass}
        />
      ) : (
        <span className={digitClass}>{digits}</span>
      )}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[58%] h-[1.5px] origin-left bg-ink-muted"
        initial={false}
        animate={{ scaleX: struck ? 1 : 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }}
      />
    </span>
  );
}
