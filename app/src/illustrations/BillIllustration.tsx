import { useCallback, useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { UNITS_BY_MONTH } from '@/data/bill';
import { QR_PATHS, RUPEE_D } from './paths';
import { EASE_IN_OUT, EASE_OUT, SPRING_SOFT, pick, useReduced } from './motion';
import { Sparkles } from './Sparkles';
import { StatusBadge, type BadgeStatus } from './StatusBadge';
import { figmaDashOffset, Svg, useUid, type IllustrationProps } from './svg';

/** idle is the bill asleep: no scan line, no focus box and no badge. The other three are the badge states. */
export type BillStatus = BadgeStatus | 'idle';

export interface BillIllustrationProps extends IllustrationProps {
  /**
   * idle: the page alone, no scan line, no focus box, no badge (the bill before a file has landed).
   * reading: scan line sweeps and rows light up. done: green check. flagged: amber triangle.
   * Going from idle to reading wakes the bill: the focus box fades in and the badge pops in.
   */
  status?: BillStatus;
  /** hero is the whole page (240 x 290); compact is a 240 x 128 crop around the focus box. */
  size?: 'hero' | 'compact';
  /**
   * Compact only: which part of the page to show. `maths` frames the charges and total,
   * `checks` frames the consumer block and meter table. Defaults to maths while reading, checks otherwise.
   */
  focus?: 'maths' | 'checks';
  /** Called once when the done check has finished drawing in. */
  onDone?: () => void;
  /** Render the final state with no motion (reading shows the Figma frame: scan line frozen). */
  still?: boolean;
  /** Scale the corner badge (1 = Figma size, which every screen uses). */
  badgeScale?: number;
  /** A few sparkles around the check when done (the paid state). */
  sparkles?: boolean;
}

/*
 * Figma: Illustration / Bill (20:19218). Variants exported: Hero Reading (20:18524), Hero Done (20:18627),
 * Compact Maths Reading (20:18727), Compact Checks Done (20:18914), Compact Checks Flagged (20:19014).
 *
 * One paper drawn in hero coordinates (page 199 x 263 at x 16.5). The compact sizes show the same
 * paper moved up (maths: -130, checks: -27) behind a top and bottom fade, so the three crops can never drift.
 *
 * Named parts (data-part): page, masthead, consumer, meter-table, usage-bars, charges, total, tear-off,
 * scan-line, scan-glow, focus, badge.
 */

const PAGE = { x: 16.5, y: 0.5, w: 199, h: 263, r: 13.5 } as const;
const MATHS_OFFSET = -130;
const CHECKS_OFFSET = -27;

/** Focus boxes in compact coordinates (Figma: Focus frame stroke 2 plus a 6% tint). */
const FOCUS_BOX = {
  maths: { x: 23, y: 32, w: 186, h: 63 },
  checks: { x: 23, y: 16, w: 186, h: 80 },
} as const;

/** Where the scan line travels, in page coordinates. */
const SCAN_RANGE = {
  hero: [10, 254],
  maths: [166, 221],
  checks: [47, 119],
} as const;

/** Where the line parks before it fades out: the middle of the total box. */
const TOTAL_Y = 213;

/** The rows that light up as the line passes: one band plus the bars read on it. */
interface LitRow {
  id: string;
  band: { x: number; y: number; w: number; h: number };
  bars: readonly (readonly [number, number, number, number])[];
}
const LIT_ROWS: readonly LitRow[] = [
  { id: 'meter-1', band: { x: 33, y: 102, w: 166, h: 8 }, bars: [[38, 104, 14, 4], [110, 104, 28, 4], [172, 104, 22, 4]] },
  { id: 'meter-2', band: { x: 33, y: 112, w: 166, h: 8 }, bars: [[38, 114, 18, 4], [114, 114, 24, 4], [178, 114, 16, 4]] },
  { id: 'charge-1', band: { x: 27, y: 163.5, w: 178, h: 10 }, bars: [[32, 166, 62, 5], [168, 166, 32, 5]] },
  { id: 'charge-2', band: { x: 27, y: 172.5, w: 178, h: 10 }, bars: [[32, 175, 50, 5], [174, 175, 26, 5]] },
  { id: 'charge-3', band: { x: 27, y: 181.5, w: 178, h: 10 }, bars: [[32, 184, 30, 5], [174, 184, 26, 5]] },
  { id: 'charge-4', band: { x: 27, y: 190.5, w: 178, h: 10 }, bars: [[32, 193, 40, 5], [174, 193, 26, 5]] },
  { id: 'total', band: { x: 29, y: 202, w: 174, h: 22 }, bars: [[38, 210, 44, 6], [166, 210, 28, 6]] },
];

/** The bar heights come from the real monthly units (Aug 2025 to Aug 2026), tallest = 20. */
const MAX_UNITS = Math.max(...UNITS_BY_MONTH.map((m) => m.units));
const USAGE_BARS = UNITS_BY_MONTH.map((m, i) => {
  const h = (20 * m.units) / MAX_UNITS;
  return { x: 34 + 13 * i, y: 158 - h, h, current: i === UNITS_BY_MONTH.length - 1 };
});

/** 0 to 1 bump: lit while the line is within about a row of the centre, soft either side. */
function bumpAt(scanY: number, rowY: number): number {
  const d = Math.abs(scanY - rowY);
  if (d <= 7) return 1;
  if (d >= 30) return 0;
  return 1 - (d - 7) / 23;
}

export function BillIllustration({
  status = 'reading',
  size = 'hero',
  focus,
  onDone,
  still = false,
  badgeScale = 1,
  sparkles = false,
  width,
  className,
  style,
  title,
}: BillIllustrationProps) {
  const reduced = useReduced();
  const quiet = reduced || still;
  const u = useUid();
  const compact = size === 'compact';
  const focusKey = compact ? (focus ?? (status === 'reading' || status === 'idle' ? 'maths' : 'checks')) : null;
  const offset = focusKey === 'maths' ? MATHS_OFFSET : focusKey === 'checks' ? CHECKS_OFFSET : 0;
  const H = compact ? 128 : 290;
  const scanKey = focusKey ?? 'hero';
  const restY = focusKey ? (SCAN_RANGE[focusKey][0] + SCAN_RANGE[focusKey][1]) / 2 : 200;

  // One motion value drives the line, the glow and every lit row, so they can never drift apart.
  const scanY = useMotionValue(restY);
  const scanMix = useMotionValue(status === 'reading' ? 1 : 0);
  const settle = useMotionValue(0);

  useEffect(() => {
    const range = SCAN_RANGE[scanKey];
    if (quiet) {
      scanY.set(restY);
      scanMix.set(status === 'reading' ? 1 : 0);
      settle.set(0);
      return;
    }
    if (status === 'idle') {
      // Asleep: nothing scans. If it was reading a moment ago, the line and glow fade out.
      settle.set(0);
      const fadeOut = animate(scanMix, 0, { duration: 0.2, ease: EASE_OUT });
      return () => fadeOut.stop();
    }
    if (status === 'reading') {
      settle.set(0);
      const fadeIn = animate(scanMix, 1, { duration: 0.2 });
      scanY.set(range[0]);
      const sweep = animate(scanY, [range[0], range[1]], {
        duration: 1.6,
        ease: EASE_IN_OUT,
        repeat: Infinity,
        repeatType: 'reverse',
      });
      return () => {
        fadeIn.stop();
        sweep.stop();
      };
    }
    // Done or flagged: the line glides to the total, the glow and lit rows fade, the total settles.
    const glide = animate(scanY, TOTAL_Y, { duration: 0.5, ease: EASE_OUT });
    const fadeOut = animate(scanMix, 0, { duration: 0.3, delay: 0.32, ease: EASE_OUT });
    const pulse =
      status === 'done' && !compact
        ? animate(settle, [0, 1, 0], { duration: 1.5, times: [0, 0.3, 1], delay: 0.35, ease: EASE_OUT })
        : undefined;
    return () => {
      glide.stop();
      fadeOut.stop();
      pulse?.stop();
    };
  }, [quiet, status, compact, scanKey, restY, scanY, scanMix, settle]);

  const doneFired = useRef(false);
  useEffect(() => {
    doneFired.current = false;
  }, [status]);
  const handleCheckDrawn = useCallback(() => {
    if (status !== 'done' || doneFired.current) return;
    doneFired.current = true;
    onDone?.();
  }, [status, onDone]);

  // Reduced motion and `still` never run the animation, so the done callback fires on the next tick.
  useEffect(() => {
    if (!quiet || status !== 'done') return;
    const id = window.setTimeout(handleCheckDrawn, 0);
    return () => window.clearTimeout(id);
  }, [quiet, status, handleCheckDrawn]);

  const frozenGlow = quiet && status === 'reading';

  // Waking up: a badge that mounts after the bill was idle pops in instead of appearing at full size.
  const [wasIdle, setWasIdle] = useState(status === 'idle');
  useEffect(() => {
    if (status === 'idle') setWasIdle(true);
  }, [status]);

  const base = compact
    ? { cx: 212, cy: 102, r: 18, iconScale: 0.75 }
    : { cx: 212, cy: 264, r: 26, iconScale: 1 };
  const badge = {
    cx: base.cx,
    cy: base.cy,
    r: base.r * badgeScale,
    iconScale: base.iconScale * badgeScale,
    spinnerStroke: 2 * badgeScale,
    checkStroke: 2.5 * badgeScale,
    alertStroke: 2 * badgeScale,
  };

  const pageGroup = (
    <motion.g
      data-part="paper"
      initial={still ? false : { y: offset }}
      animate={{ y: offset }}
      transition={pick(quiet, SPRING_SOFT)}
    >
      <Paper u={u} />

      {/* Lit rows: tinted bands and bars that glow while the line is near. */}
      {!quiet &&
        LIT_ROWS.map((row) => (
          <LitRowOverlay key={row.id} row={row} scanY={scanY} mix={scanMix} />
        ))}

      {/* The total settles: a ring blooms around it as the check pops in. */}
      {!compact && <TotalSettle settle={settle} />}

      {/* Reduced motion keeps the Figma frame: a faint wash over the charges, line at y 200. */}
      {frozenGlow && !compact && (
        <rect data-part="scan-glow" x={16} y={162} width={200} height={38} fill="var(--primary)" opacity={0.1} />
      )}

      {/* The scan: a soft glow and the line itself, moved together by one transform. */}
      <motion.g style={{ y: scanY, opacity: quiet ? (status === 'reading' ? 1 : 0) : scanMix }}>
        <rect
          data-part="scan-glow"
          x={16}
          y={-26}
          width={200}
          height={52}
          fill={`url(#${u}-glow)`}
          display={frozenGlow ? 'none' : undefined}
        />
        <rect data-part="scan-line" x={8} y={-1.5} width={216} height={3} rx={1.5} fill="var(--primary)" />
      </motion.g>
    </motion.g>
  );

  return (
    <Svg w={240} h={H} width={width} className={className} style={style} title={title} overflowVisible>
      <defs>
        <clipPath id={`${u}-crop`}>
          <rect width={240} height={H} />
        </clipPath>
        <linearGradient id={`${u}-glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--primary)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
        {compact && (
          <>
            <linearGradient id={`${u}-fade`} x1="120" y1="0" x2="120" y2="128" gradientUnits="userSpaceOnUse">
              <stop stopColor="#000" stopOpacity="0" />
              <stop offset="0.125" stopColor="#000" />
              <stop offset="0.875" stopColor="#000" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </linearGradient>
            <mask id={`${u}-mask`} maskUnits="userSpaceOnUse" x={0} y={0} width={240} height={128} style={{ maskType: 'alpha' }}>
              <rect data-part="fade-mask" width={240} height={128} fill={`url(#${u}-fade)`} />
            </mask>
          </>
        )}
      </defs>

      <g clipPath={`url(#${u}-crop)`}>
        {compact ? <g mask={`url(#${u}-mask)`}>{pageGroup}{focusKey && <FocusBox which={focusKey} status={status} quiet={quiet} still={still} />}</g> : pageGroup}
      </g>

      {status !== 'idle' && (
        <StatusBadge
          {...badge}
          status={status}
          still={still}
          appear={wasIdle}
          reduced={reduced}
          uid={u}
          onCheckDrawn={handleCheckDrawn}
        >
          {sparkles && status === 'done' && !quiet && <Sparkles />}
        </StatusBadge>
      )}
    </Svg>
  );
}

/**
 * The bill page on its own, static, 200 x 264 (cropped to the page). Used where the paper is a prop,
 * such as the camera viewfinder. Figma: the Paper layer of Illustration / Bill.
 */
export function BillPaperArt({ width, className, style, title }: IllustrationProps) {
  const u = useUid();
  return (
    <Svg w={200} h={264} width={width} className={className} style={style} title={title}>
      <g transform="translate(-16 0)">
        <Paper u={u} />
      </g>
    </Svg>
  );
}

/** The static paper: an Indian HT electricity bill drawn as skeleton lines. Hero coordinates. */
function Paper({ u }: { u: string }) {
  return (
    <g data-part="page">
      <clipPath id={`${u}-page`}>
        <rect x={PAGE.x} y={PAGE.y} width={PAGE.w} height={PAGE.h} rx={PAGE.r} />
      </clipPath>
      <clipPath id={`${u}-table`}>
        <rect x={32} y={91} width={168} height={30} rx={4} />
      </clipPath>
      <rect x={PAGE.x} y={PAGE.y} width={PAGE.w} height={PAGE.h} rx={PAGE.r} fill="var(--card)" />
      <g clipPath={`url(#${u}-page)`}>
        <g data-part="masthead">
          <rect x={16} width={200} height={38} fill="var(--surface-muted)" />
          <rect x={32} y={8} width={22} height={22} rx={11} fill="var(--primary)" />
          <path
            d="M43 14V24M38 15.5H48M38.5 14.5V15.5M40.5 14.5V15.5M45.5 14.5V15.5M47.5 14.5V15.5M46.5 15.5L43 19L39.5 15.5"
            stroke="var(--card)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x={62} y={11} width={92} height={7} rx={3.5} fill="var(--line)" />
          <rect x={62} y={23} width={60} height={5} rx={2.5} fill="var(--line)" />
        </g>
        <g data-part="consumer">
          <rect x={32} y={48} width={70} height={6} rx={3} fill="var(--line)" />
          <rect x={32} y={59} width={58} height={5} rx={2.5} fill="var(--surface-muted)" />
          <rect x={32.5} y={69.5} width={51} height={13} rx={3.5} fill="var(--card)" stroke="var(--line)" />
          <rect x={37} y={74} width={42} height={4} rx={2} fill="var(--line)" />
          {[122.5, 163.5].map((x) => (
            <g key={x}>
              <rect x={x} y={46.5} width={36} height={36} rx={5.5} fill="var(--card)" stroke="var(--line)" />
              <rect x={x + 4.5} y={54} width={18} height={5} rx={2.5} fill="var(--surface-muted)" />
              <rect x={x + 4.5} y={67} width={26} height={6} rx={3} fill="var(--line)" />
            </g>
          ))}
        </g>
        <g data-part="meter-table">
          <g clipPath={`url(#${u}-table)`}>
            <rect x={32} y={91} width={168} height={30} rx={4} fill="var(--card)" />
            <rect x={32} y={91} width={168} height={10} fill="var(--surface-muted)" />
            <rect x={88} y={91} width={1} height={30} fill="var(--line)" />
            <rect x={144} y={91} width={1} height={30} fill="var(--line)" />
            {[
              [38, 94, 20], [114, 94, 24], [178, 94, 16],
              [38, 104, 14], [110, 104, 28], [172, 104, 22],
              [38, 114, 18], [114, 114, 24], [178, 114, 16],
            ].map(([x, y, w]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width={w} height={4} rx={2} fill="var(--line)" />
            ))}
          </g>
          <rect x={32.5} y={91.5} width={167} height={29} rx={3.5} stroke="var(--line)" />
        </g>
        <g data-part="usage-bars">
          <rect x={32} y={127} width={48} height={4} rx={2} fill="var(--line)" />
          {USAGE_BARS.map((b) => (
            <rect
              key={b.x}
              x={b.x}
              y={b.y}
              width={8}
              height={b.h}
              rx={2}
              fill={b.current ? 'var(--primary)' : 'var(--line)'}
            />
          ))}
        </g>
        <g data-part="charges">
          {[
            [166, 62, 32], [175, 50, 26], [184, 30, 26], [193, 40, 26],
          ].map(([y, lw, aw]) => (
            <g key={y}>
              <rect x={32} y={y} width={lw} height={5} rx={2.5} fill="var(--surface-muted)" />
              <rect x={200 - aw} y={y} width={aw} height={5} rx={2.5} fill="var(--line)" />
            </g>
          ))}
        </g>
        <g data-part="total">
          <rect x={32} y={204} width={168} height={18} rx={5} fill="var(--primary-subtle)" />
          <rect x={38} y={210} width={44} height={6} rx={3} fill="var(--line)" />
          <path d={RUPEE_D} fill="var(--primary)" />
          <rect x={166} y={210} width={28} height={6} rx={3} fill="var(--line)" />
        </g>
        <g data-part="tear-off">
          <line x1={16} y1={229.5} x2={216} y2={229.5} stroke="var(--line)" strokeDasharray="3 3" strokeDashoffset={figmaDashOffset(200, 3, 3)} />
          <g opacity={0.45}>
            {QR_PATHS.map((p) => (
              <path key={p.d} d={p.d} fill="var(--ink-muted)" fillRule={p.evenOdd ? 'evenodd' : undefined} clipRule={p.evenOdd ? 'evenodd' : undefined} />
            ))}
          </g>
          <rect x={62} y={240} width={40} height={5} rx={2.5} fill="var(--surface-muted)" />
          <rect x={62} y={250} width={30} height={6} rx={3} fill="var(--line)" />
        </g>
      </g>
      <rect x={PAGE.x} y={PAGE.y} width={PAGE.w} height={PAGE.h} rx={PAGE.r} stroke="var(--line)" />
    </g>
  );
}

/** One row of the bill that glows (primary tint on the band, bars turn blue) as the scan passes. */
function LitRowOverlay({ row, scanY, mix }: { row: LitRow; scanY: MotionValue<number>; mix: MotionValue<number> }) {
  const centre = row.band.y + row.band.h / 2;
  const bump = useTransform([scanY, mix], ([sy, m]: number[]) => bumpAt(sy, centre) * m);
  const tint = useTransform(bump, (b) => b * 0.1);
  const bars = useTransform(bump, (b) => b * 0.4);
  return (
    <g data-part={`row-${row.id}`}>
      <motion.rect
        x={row.band.x}
        y={row.band.y}
        width={row.band.w}
        height={row.band.h}
        rx={3}
        fill="var(--primary)"
        style={{ opacity: tint }}
      />
      <motion.g style={{ opacity: bars }}>
        {row.bars.map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={h / 2} fill="var(--primary)" />
        ))}
      </motion.g>
    </g>
  );
}

/** A ring that blooms around the total when the read finishes, then settles back to the Figma frame. */
function TotalSettle({ settle }: { settle: MotionValue<number> }) {
  const ringOpacity = useTransform(settle, (s) => s);
  const tint = useTransform(settle, (s) => s * 0.12);
  return (
    <g data-part="total-highlight">
      <motion.rect x={32} y={204} width={168} height={18} rx={5} fill="var(--primary)" style={{ opacity: tint }} />
      <motion.rect
        x={29.5}
        y={201.5}
        width={173}
        height={23}
        rx={7.5}
        stroke="var(--primary)"
        strokeWidth={1.5}
        style={{ opacity: ringOpacity }}
      />
    </g>
  );
}

/**
 * The compact focus box (Figma: Focus = stroke 2 + 6% tint). Three colours stack and cross-fade,
 * so reading (primary) becomes done (success) or flagged (warning) without a jump.
 */
function FocusBox({
  which,
  status,
  quiet,
  still,
}: {
  which: 'maths' | 'checks';
  status: BillStatus;
  quiet: boolean;
  still: boolean;
}) {
  const box = FOCUS_BOX[which];
  const colours = [
    { key: 'reading', stroke: 'var(--primary)' },
    { key: 'done', stroke: 'var(--success)' },
    { key: 'flagged', stroke: 'var(--warning)' },
  ] as const;
  return (
    <g data-part="focus">
      {colours.map((c) => (
        <motion.g
          key={c.key}
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: status === c.key ? 1 : 0 }}
          transition={quiet ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }}
        >
          <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={5} stroke={c.stroke} strokeWidth={2} />
          <rect
            x={box.x - 1}
            y={box.y - 1}
            width={box.w + 2}
            height={box.h + 2}
            rx={6}
            fill={c.stroke}
            opacity={0.06}
          />
        </motion.g>
      ))}
    </g>
  );
}
