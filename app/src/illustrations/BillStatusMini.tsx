import { motion } from 'motion/react';
import { EASE_IN_OUT, EASE_OUT, INSTANT, pick, useReduced } from './motion';
import { StatusBadge } from './StatusBadge';
import { Svg, useUid, type IllustrationProps } from './svg';

export type MiniState = 'checking' | 'checked' | 'flagged';

export interface BillStatusMiniProps extends IllustrationProps {
  /** checking: lines shimmer and a scan band sweeps. checked: green check pops. flagged: amber mark and a highlighted line. */
  state?: MiniState;
  /** m is 36 px, l is 48 px. */
  size?: 'm' | 'l';
  /** Soft blue tile behind the paper (Tile = On in Figma). */
  tile?: boolean;
  /** Render the final state with no motion. */
  still?: boolean;
}

/*
 * Figma: Bill status mini (11:10035), 12 variants (State x Size M 36 / L 48 x Tile On / Off).
 * Geometry is copied per variant: the L sizes are not an exact scale of the M sizes.
 * Named parts (data-part): tile, paper, scan-band, accent, line-1..3, flag-line, scan-line, badge.
 */

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
}

interface Geometry {
  box: number;
  tile?: number;
  paper: Rect;
  outline: boolean;
  band: Rect;
  accent: Rect;
  lines: readonly [Rect, Rect, Rect];
  flagLine?: Rect;
  scan: Rect;
  badge: { c: number; r: number; doneR: number; ringR: number; iconScale: number; spinnerStroke: number; checkStroke: number };
}

const r = (x: number, y: number, w: number, h: number, rx: number): Rect => ({ x, y, w, h, rx });

const M_BADGE = { c: 27, r: 6.5, doneR: 7, ringR: 9, iconScale: 0.375, spinnerStroke: 1.5, checkStroke: 2 };
const L_BADGE = { c: 36.5, r: 9, doneR: 9.5, ringR: 11.5, iconScale: 0.5, spinnerStroke: 2, checkStroke: 2.667 };

const GEOMETRY: Record<'m-tile' | 'm-plain' | 'l-tile' | 'l-plain', Geometry> = {
  'm-tile': {
    box: 36,
    tile: 10,
    paper: r(6, 3, 20, 26, 4),
    outline: false,
    band: r(6, 11, 20, 5, 0),
    accent: r(9, 6, 4, 4, 1),
    lines: [r(15, 6.75, 8, 2.5, 1.25), r(9, 12.5, 12, 2.5, 1.25), r(9, 17.5, 9, 2.5, 1.25)],
    scan: r(3, 13, 26, 1.5, 0.75),
    badge: M_BADGE,
  },
  'm-plain': {
    box: 36,
    paper: r(6.5, 2.5, 23, 31, 3.5),
    outline: true,
    band: r(6, 11.8461, 24, 6.15385, 0),
    accent: r(9.6001, 5.69232, 4.8, 4.92308, 1.2),
    lines: [r(16.7998, 6.67694, 9.6, 3.07692, 1.53846), r(9.6001, 13.6923, 14.4, 3.07692, 1.53846), r(9.6001, 19.8461, 10.8, 3.07692, 1.53846)],
    flagLine: r(8.6001, 12.9615, 16.4, 4.53846, 1.5),
    scan: r(4, 14.3077, 28, 1.84615, 0.923077),
    badge: M_BADGE,
  },
  'l-tile': {
    box: 48,
    tile: 13,
    paper: r(8, 4, 27, 35, 5),
    outline: false,
    band: r(8, 14.7692, 27, 6.73077, 0),
    accent: r(12.0498, 8.03845, 5.4, 5.38462, 1.35),
    lines: [r(20.1499, 9.11536, 10.8, 3.36538, 1.68269), r(12.0498, 16.7885, 16.2, 3.36538, 1.68269), r(12.0498, 23.5192, 12.15, 3.36538, 1.68269)],
    flagLine: r(11.0498, 15.9423, 18.2, 5.05769, 1.5),
    scan: r(3.9502, 17.4615, 35.1, 2.01923, 1.00962),
    badge: L_BADGE,
  },
  'l-plain': {
    box: 48,
    paper: r(8.5, 3.5, 31, 41, 4.5),
    outline: true,
    band: r(8, 15.9231, 32, 8.07692, 0),
    accent: r(12.7998, 7.84613, 6.4, 6.46154, 1.6),
    lines: [r(22.3999, 9.13849, 12.8, 4.03846, 2.01923), r(12.7998, 18.3461, 19.2, 4.03846, 2.01923), r(12.7998, 26.4231, 14.4, 4.03846, 2.01923)],
    flagLine: r(11.7998, 17.2308, 21.2, 6.26923, 1.5),
    scan: r(6, 19.1539, 36, 2.42308, 1.21154),
    badge: L_BADGE,
  },
};

const STATE_TO_BADGE = { checking: 'reading', checked: 'done', flagged: 'flagged' } as const;

export function BillStatusMini({
  state = 'checking',
  size = 'm',
  tile = true,
  still = false,
  width,
  className,
  style,
  title,
}: BillStatusMiniProps) {
  const reduced = useReduced();
  const quiet = reduced || still;
  const u = useUid();
  const g = GEOMETRY[`${size}-${tile ? 'tile' : 'plain'}` as keyof typeof GEOMETRY];
  const { paper, badge } = g;
  const checking = state === 'checking';
  const sweep = paper.h * 0.55;

  const lineFade = pick(quiet, { duration: 0.2, ease: EASE_OUT });

  return (
    <Svg w={g.box} h={g.box} width={width} className={className} style={style} title={title} overflowVisible>
      <defs>
        <clipPath id={`${u}-paper`}>
          <rect x={paper.x} y={paper.y} width={paper.w} height={paper.h} rx={paper.rx} />
        </clipPath>
      </defs>
      {g.tile !== undefined && <rect data-part="tile" width={g.box} height={g.box} rx={g.tile} fill="var(--primary-subtle)" />}
      <rect
        data-part="paper"
        x={paper.x}
        y={paper.y}
        width={paper.w}
        height={paper.h}
        rx={paper.rx}
        fill="var(--card)"
        stroke={g.outline ? 'var(--line)' : undefined}
      />

      {/* The scan: a soft band and a line that sweep down the paper while checking. */}
      <g clipPath={`url(#${u}-paper)`}>
        <motion.g
          data-part="scan"
          initial={still ? false : { opacity: checking ? 1 : 0 }}
          animate={{ opacity: checking ? 1 : 0 }}
          transition={lineFade}
        >
          <motion.g
            animate={checking && !quiet ? { y: [-sweep, sweep * 0.6] } : { y: 0 }}
            transition={
              checking && !quiet
                ? { duration: 1.1, ease: EASE_IN_OUT, repeat: Infinity, repeatType: 'reverse' }
                : INSTANT
            }
          >
            <rect data-part="scan-band" x={g.band.x} y={g.band.y} width={g.band.w} height={g.band.h} fill="var(--primary-subtle)" />
            <rect
              data-part="scan-line"
              x={g.scan.x}
              y={g.scan.y}
              width={g.scan.w}
              height={g.scan.h}
              rx={g.scan.rx}
              fill="var(--primary)"
            />
          </motion.g>
        </motion.g>
      </g>

      <rect
        data-part="accent"
        x={g.accent.x}
        y={g.accent.y}
        width={g.accent.w}
        height={g.accent.h}
        rx={g.accent.rx}
        fill="var(--primary)"
      />
      {g.lines.map((line, i) => (
        <motion.rect
          key={i}
          data-part={`line-${i + 1}`}
          x={line.x}
          y={line.y}
          width={line.w}
          height={line.h}
          rx={line.rx}
          fill="var(--line)"
          // Shimmer: each line breathes, one after another, while the paper is being read.
          animate={checking && !quiet ? { opacity: [1, 0.45, 1] } : { opacity: 1 }}
          transition={
            checking && !quiet
              ? { duration: 1.1, ease: EASE_IN_OUT, repeat: Infinity, delay: i * 0.18 }
              : lineFade
          }
        />
      ))}

      {/* Flagged: the line Ohm wants you to look at gets an amber highlight. */}
      {g.flagLine && (
        <motion.rect
          data-part="flag-line"
          x={g.flagLine.x}
          y={g.flagLine.y}
          width={g.flagLine.w}
          height={g.flagLine.h}
          rx={g.flagLine.rx}
          fill="var(--warning-subtle)"
          stroke="var(--warning)"
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: state === 'flagged' ? 1 : 0 }}
          transition={quiet ? INSTANT : { duration: 0.25, ease: EASE_OUT, delay: state === 'flagged' ? 0.1 : 0 }}
        />
      )}

      <StatusBadge
        cx={badge.c}
        cy={badge.c}
        r={badge.r}
        doneR={badge.doneR}
        ringR={badge.ringR}
        shadow={false}
        iconScale={badge.iconScale}
        spinnerStroke={badge.spinnerStroke}
        checkStroke={badge.checkStroke}
        alert="bang"
        status={STATE_TO_BADGE[state]}
        still={still}
        reduced={reduced}
        uid={u}
      />
    </Svg>
  );
}
