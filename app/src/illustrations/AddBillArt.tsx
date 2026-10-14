import type { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import {
  FORWARD_BACK_D,
  FORWARD_POCKET_D,
  PLUG_D,
  SOURCE_GLYPH_D,
  UNPLUG_D,
  UPLOAD_FOLDER_BACK_D,
  ZAP_D,
} from './paths';
import { EASE_IN_OUT, EASE_OUT, INSTANT, SPRING_POP, SPRING_PRESS, SPRING_SOFT, pick, useReduced } from './motion';
import { Svg, type IllustrationProps } from './svg';

/*
 * Add bill art, 150 x 96 each. Figma: Art/Upload (11:9897), Art/Photo (11:9925), Art/Forward (11:10195),
 * Art/Connect (11:10196). Each has a Rest and an Active pose in Figma; here `active` plays the move between them
 * (and then a gentle idle), `pressed` is the press squash.
 *
 * Hover: the parent tile passes `active` (it knows when the tile is hovered or focused). For standalone use
 * (the gallery) set `interactive` and the art reacts to its own hover and press.
 */

export interface AddBillArtProps extends IllustrationProps {
  /** The Active pose: the move from Figma Rest to Active, then a gentle idle loop. */
  active?: boolean;
  /** The press squash. */
  pressed?: boolean;
  /** React to hover and press on the art itself. */
  interactive?: boolean;
}

interface ShellProps extends AddBillArtProps {
  /** Variant label to show; `idle` is a slow ambient loop (Forward guide hero). */
  label: 'rest' | 'active' | 'idle';
  reduced: boolean;
  /** Disabled art ignores hover and press. */
  disabled?: boolean;
  children: ReactNode;
}

function ArtShell({ label, reduced, disabled, pressed, interactive, width, className, style, title, children }: ShellProps) {
  const live = interactive && !disabled;
  return (
    <Svg w={150} h={96} width={width} className={className} style={style} title={title} overflowVisible>
      <motion.g initial={false} animate={label} whileHover={live ? 'active' : undefined}>
        <motion.g
          animate={{ scale: pressed && !disabled ? 0.95 : 1 }}
          whileTap={live ? { scale: 0.95 } : undefined}
          transition={pick(reduced, SPRING_PRESS)}
        >
          {/* A transparent hit area so the whole 150 x 96 reacts, not just painted pixels. */}
          <rect data-part="hit-area" width={150} height={96} fill="transparent" />
          {children}
        </motion.g>
      </motion.g>
    </Svg>
  );
}

/** A loop that only runs in the Active pose. */
const loop = (reduced: boolean, duration = 1.15) =>
  reduced ? INSTANT : { duration, ease: EASE_IN_OUT, repeat: Infinity };

const settle = (reduced: boolean) => pick(reduced, SPRING_SOFT);

/** Shared pieces ---------------------------------------------------------------------------------- */

function Zap({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={ZAP_D} stroke="var(--primary)" strokeWidth={0.6} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function PdfPaperHeader({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect data-part="mark" x={x} y={y} width={10} height={10} rx={3} fill="var(--primary-subtle)" />
      <Zap x={x + 1.5} y={y + 1.5} />
    </>
  );
}

/** The ring that pops around a badge in the Active pose. */
function ActiveRing({ cx, cy, reduced }: { cx: number; cy: number; reduced: boolean }) {
  const variants: Variants = {
    rest: { opacity: 0, scale: reduced ? 1 : 0.8, transition: pick(reduced, { duration: 0.15, ease: EASE_OUT }) },
    active: { opacity: 1, scale: 1, transition: pick(reduced, SPRING_POP) },
    idle: { opacity: 0, scale: 0.8, transition: pick(reduced, { duration: 0.15 }) },
  };
  return (
    <motion.circle
      data-part="ring"
      cx={cx}
      cy={cy}
      r={11.25}
      stroke="var(--primary)"
      strokeWidth={1.5}
      variants={variants}
    />
  );
}

/** Art/Upload ------------------------------------------------------------------------------------- */

export function ArtUpload(props: AddBillArtProps) {
  const reduced = useReduced();
  const { active = false } = props;
  const up = reduced ? 0 : -6;
  const paper: Variants = {
    rest: { y: 0, transition: settle(reduced) },
    active: { y: up, transition: settle(reduced) },
  };
  const line3: Variants = {
    rest: { opacity: 0, transition: pick(reduced, { duration: 0.12 }) },
    active: { opacity: 1, transition: pick(reduced, { duration: 0.2, delay: 0.08 }) },
  };
  // The arrow nudges up and back while the tile is active: "your file goes up".
  const arrow: Variants = {
    rest: { y: 0, transition: pick(reduced, { duration: 0.15 }) },
    active: { y: reduced ? 0 : [0, -2, 0], transition: loop(reduced) },
  };
  return (
    <ArtShell {...props} label={active ? 'active' : 'rest'} reduced={reduced}>
      <path data-part="folder-back" d={UPLOAD_FOLDER_BACK_D} fill="var(--surface-muted)" stroke="var(--line)" strokeLinejoin="round" />
      <motion.g data-part="paper" variants={paper}>
        <rect x={59.5} y={12.5} width={39} height={51} rx={4.5} fill="var(--card)" stroke="var(--line)" />
        <PdfPaperHeader x={65} y={18} />
        <rect data-part="pdf-chip" x={78} y={18} width={16} height={10} rx={3} fill="var(--primary-subtle)" />
        <text x={79.9377} y={25.1818} fill="var(--primary)" fontFamily="Inter Variable, Inter, sans-serif" fontSize={6} fontWeight={600} letterSpacing="0.2">
          PDF
        </text>
        <rect data-part="line-1" x={65} y={32} width={28} height={4} rx={2} fill="var(--line)" />
        <rect data-part="line-2" x={65} y={39} width={20} height={4} rx={2} fill="var(--line)" />
        <motion.rect data-part="line-3" x={65} y={46} width={26} height={4} rx={2} fill="var(--line)" variants={line3} />
      </motion.g>
      <rect data-part="folder-front" x={39.5} y={46.5} width={71} height={35} rx={5.5} fill="var(--card)" stroke="var(--line)" />
      <g data-part="badge">
        <circle cx={107} cy={78} r={11.5} fill="var(--card)" stroke="var(--line)" />
        <motion.path
          data-part="arrow"
          d="M110.5 78L107 74.5L103.5 78M107 74.5V81.5"
          stroke="var(--primary)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={arrow}
        />
      </g>
      <ActiveRing cx={107} cy={78} reduced={reduced} />
    </ArtShell>
  );
}

/** Art/Photo -------------------------------------------------------------------------------------- */

/** Each bracket: its path in the locked (Active) position, and which way it sits at Rest (outwards). */
const BRACKETS = [
  { id: 'tl', d: 'M41.75 24.75V17.75C41.75 15.75 42.75 14.75 44.75 14.75H51.75', sx: -1, sy: -1 },
  { id: 'tr', d: 'M98.25 14.75H105.25C107.25 14.75 108.25 15.75 108.25 17.75V24.75', sx: 1, sy: -1 },
  { id: 'bl', d: 'M41.75 71.25V78.25C41.75 80.25 42.75 81.25 44.75 81.25H51.75', sx: -1, sy: 1 },
  { id: 'br', d: 'M98.25 81.25H105.25C107.25 81.25 108.25 80.25 108.25 78.25V71.25', sx: 1, sy: 1 },
] as const;

export function ArtPhoto(props: AddBillArtProps) {
  const reduced = useReduced();
  const { active = false } = props;
  // Rest is the Active layout nudged by (3.27, -2.34) and turned 6 degrees about the paper's top-left corner.
  // Figma's paper frame sits at (54.267, 15.656) and turns about its own top-left, which is the paper's 48 x 60
  // stroke box at (51, 18) here. The origin is given in the art's own coordinates (view-box), not as a share of
  // the fill box motion would use ((51.5, 18.5)), which would put the paper about 1 px off.
  const paper: Variants = {
    rest: { x: reduced ? 0 : 3.267, y: reduced ? 0 : -2.344, rotate: reduced ? 0 : 6, transition: settle(reduced) },
    active: { x: 0, y: 0, rotate: 0, transition: settle(reduced) },
  };
  // Brackets sit 4 px out at Rest, snap onto the page in Active, then breathe.
  const lock = (c: { sx: number; sy: number }): Variants => ({
    rest: { x: reduced ? 0 : 4 * c.sx, y: reduced ? 0 : 4 * c.sy, transition: settle(reduced) },
    active: { x: 0, y: 0, transition: settle(reduced) },
  });
  const breathe = (c: { sx: number; sy: number }): Variants => ({
    rest: { x: 0, y: 0, transition: pick(reduced, { duration: 0.15 }) },
    active: {
      x: reduced ? 0 : [0, -1.4 * c.sx, 0],
      y: reduced ? 0 : [0, -1.4 * c.sy, 0],
      transition: { ...loop(reduced, 1.3), delay: 0.25 },
    },
  });
  return (
    <ArtShell {...props} label={active ? 'active' : 'rest'} reduced={reduced}>
      <motion.g data-part="paper" variants={paper} style={{ transformBox: 'view-box', originX: '51px', originY: '18px' }}>
        <rect x={51.5} y={18.5} width={47} height={59} rx={4.5} fill="var(--card)" stroke="var(--line)" />
        <PdfPaperHeader x={57} y={24} />
        <rect data-part="title-line" x={71} y={27} width={18} height={4} rx={2} fill="var(--line)" />
        <rect data-part="line-1" x={57} y={41} width={34} height={4} rx={2} fill="var(--line)" />
        <rect data-part="line-2" x={57} y={48} width={26} height={4} rx={2} fill="var(--line)" />
        <rect data-part="block" x={57} y={56} width={36} height={10} rx={3} fill="var(--surface-muted)" />
        <rect data-part="line-3" x={57} y={70} width={20} height={4} rx={2} fill="var(--line)" />
      </motion.g>
      {BRACKETS.map((b) => (
        <motion.g key={b.id} data-part={b.id} variants={lock(b)}>
          <motion.path
            d={b.d}
            stroke="var(--primary)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={breathe(b)}
          />
        </motion.g>
      ))}
    </ArtShell>
  );
}

/** Art/Forward ------------------------------------------------------------------------------------ */

export interface ArtForwardProps extends AddBillArtProps {
  /** A slow ambient loop (the letter lifts, the arrow nudges), used on the Forward guide. */
  idle?: boolean;
}

export function ArtForward(props: ArtForwardProps) {
  const reduced = useReduced();
  const { active = false, idle = false } = props;
  const label = idle && !active ? 'idle' : active ? 'active' : 'rest';
  const lift = reduced ? 0 : -5;
  const paper: Variants = {
    rest: { y: 0, transition: settle(reduced) },
    active: { y: lift, transition: settle(reduced) },
    idle: {
      y: reduced ? 0 : [0, 0, lift, lift, 0],
      transition: reduced ? INSTANT : { duration: 3.2, times: [0, 0.15, 0.4, 0.7, 1], ease: EASE_IN_OUT, repeat: Infinity },
    },
  };
  const arrow: Variants = {
    rest: { x: 0, transition: pick(reduced, { duration: 0.15 }) },
    active: { x: reduced ? 0 : [0, 2.4, 0], transition: loop(reduced) },
    idle: {
      x: reduced ? 0 : [0, 0, 2.4, 0, 0],
      transition: reduced ? INSTANT : { duration: 3.2, times: [0, 0.4, 0.55, 0.7, 1], ease: EASE_IN_OUT, repeat: Infinity },
    },
  };
  return (
    <ArtShell {...props} label={label} reduced={reduced}>
      <path data-part="flap" d="M106.987 31.5H43.0127L75 14.5654L106.987 31.5Z" fill="var(--card)" stroke="var(--line)" strokeLinejoin="round" />
      <path data-part="back" d={FORWARD_BACK_D} fill="var(--surface-muted)" stroke="var(--line)" />
      <motion.g data-part="paper" variants={paper}>
        <rect x={55.5} y={12.5} width={39} height={49} rx={4.5} fill="var(--card)" stroke="var(--line)" />
        <PdfPaperHeader x={61} y={18} />
        <rect data-part="title-line" x={75} y={21} width={14} height={4} rx={2} fill="var(--line)" />
        <rect data-part="line-1" x={61} y={32} width={28} height={4} rx={2} fill="var(--line)" />
        <rect data-part="line-2" x={61} y={39} width={20} height={4} rx={2} fill="var(--line)" />
        <rect data-part="line-3" x={61} y={46} width={24} height={4} rx={2} fill="var(--line)" />
      </motion.g>
      <path data-part="pocket" d={FORWARD_POCKET_D} fill="var(--card)" stroke="var(--line)" strokeLinejoin="round" />
      <g data-part="badge">
        <circle cx={105} cy={78} r={11.5} fill="var(--card)" stroke="var(--line)" />
        <motion.path
          data-part="forward"
          d="M106.5 75.5L109 78L106.5 80.5M109 78H103C102.47 78 101.961 78.2107 101.586 78.5858C101.211 78.9609 101 79.4696 101 80V81"
          stroke="var(--primary)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={arrow}
        />
      </g>
      <ActiveRing cx={105} cy={78} reduced={reduced} />
    </ArtShell>
  );
}

/** Art/Connect ------------------------------------------------------------------------------------ */

export interface ArtConnectProps extends AddBillArtProps {
  /** Disabled: wires dimmed and dashed in grey, glyphs at half strength, no motion. Default true (enabled). */
  enabled?: boolean;
}

export function ArtConnect(props: ArtConnectProps) {
  const reduced = useReduced();
  const { active = false, enabled = true } = props;
  const label = enabled && active ? 'active' : 'rest';
  const fade = pick(reduced, { duration: 0.2, ease: EASE_OUT });
  const dashed: Variants = { rest: { opacity: enabled ? 0.5 : 0.35, transition: fade }, active: { opacity: 0, transition: fade } };
  const solid: Variants = { rest: { opacity: 0, transition: fade }, active: { opacity: 1, transition: fade } };
  const unplug: Variants = {
    rest: { opacity: enabled ? 1 : 0.5, scale: 1, transition: fade },
    active: { opacity: 0, scale: reduced ? 1 : 0.7, transition: fade },
  };
  const plug: Variants = {
    rest: { opacity: 0, scale: reduced ? 1 : 0.7, transition: fade },
    active: { opacity: 1, scale: 1, transition: pick(reduced, SPRING_POP) },
  };
  // A small pulse travels along each wire while connected: data moving from Northgrid to the bill.
  const pulse = (from: number, to: number, delay: number): Variants => ({
    rest: { opacity: 0, x: from, transition: { duration: 0.1 } },
    active: {
      opacity: reduced ? 0 : [0, 1, 1, 0],
      x: reduced ? from : [from, from + 3, to - 3, to],
      transition: reduced ? INSTANT : { duration: 1.1, times: [0, 0.15, 0.85, 1], ease: 'linear', repeat: Infinity, delay },
    },
  });
  return (
    <ArtShell {...props} label={label} reduced={reduced} disabled={!enabled}>
      <g data-part="source">
        <rect x={9.5} y={30.5} width={35} height={35} rx={9.5} fill="var(--card)" stroke="var(--line)" />
        <path
          data-part="source-glyph"
          d={SOURCE_GLYPH_D}
          stroke={enabled ? 'var(--primary)' : 'var(--ink-muted)'}
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={enabled ? 1 : 0.5}
        />
      </g>
      {[
        { id: 'wire-a', d: 'M45 48H63', from: 45, to: 63, delay: 0 },
        { id: 'wire-b', d: 'M87 48H105', from: 87, to: 105, delay: 0.35 },
      ].map((w) => (
        <g key={w.id} data-part={w.id}>
          <motion.path
            d={w.d}
            stroke={enabled ? 'var(--primary)' : 'var(--ink-muted)'}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="2 3"
            variants={dashed}
          />
          {enabled && (
            <>
              <motion.path d={w.d} stroke="var(--primary)" strokeWidth={1.5} strokeLinecap="round" variants={solid} />
              <motion.circle cy={48} r={2} fill="var(--primary)" variants={pulse(w.from, w.to, w.delay)} />
            </>
          )}
        </g>
      ))}
      <g data-part="paper">
        <rect x={105.5} y={22.5} width={35} height={51} rx={4.5} fill="var(--card)" stroke="var(--line)" />
        <rect x={111} y={28} width={16} height={4} rx={2} fill="var(--line)" />
        <rect x={111} y={36} width={24} height={4} rx={2} fill="var(--line)" />
        <rect x={111} y={43} width={18} height={4} rx={2} fill="var(--line)" />
        <rect x={111} y={51} width={24} height={9} rx={3} fill="var(--surface-muted)" />
        <rect x={111} y={64} width={14} height={4} rx={2} fill="var(--line)" />
      </g>
      <g data-part="badge">
        <circle cx={75} cy={48} r={11.5} fill="var(--card)" stroke="var(--line)" />
        <motion.path
          data-part="unplug"
          d={UNPLUG_D}
          stroke={enabled ? 'var(--primary)' : 'var(--ink-muted)'}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={unplug}
        />
        {enabled && (
          <motion.path
            data-part="plug"
            d={PLUG_D}
            stroke="var(--primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={plug}
          />
        )}
      </g>
      {enabled && <ActiveRing cx={75} cy={48} reduced={reduced} />}
    </ArtShell>
  );
}
