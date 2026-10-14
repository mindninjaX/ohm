import { useEffect, type ReactNode } from 'react';
import { animate, motion, useMotionValue, type Variants } from 'motion/react';
import { EASE_IN_OUT, EASE_OUT, INSTANT, SPRING_POP } from './motion';

export type BadgeStatus = 'reading' | 'done' | 'flagged';

interface StatusBadgeProps {
  /** Centre of the badge in the parent SVG. */
  cx: number;
  cy: number;
  /** Badge radius (26 on the hero page, 18 on the compact one). */
  r: number;
  /** Radius of the done and flagged discs when it differs from the reading disc (the mini badge). */
  doneR?: number;
  /** A white ring behind the badge (the mini badge sits on a white ring instead of a shadow). */
  ringR?: number;
  /** Drop shadow under the reading disc. */
  shadow?: boolean;
  /** Scale of the 24 px Lucide icons inside (1 on the hero, 0.75 on the compact). */
  iconScale: number;
  /** Absolute stroke widths of the three glyphs, in px of the final artwork. */
  spinnerStroke?: number;
  checkStroke?: number;
  alertStroke?: number;
  /** Flagged glyph: the Lucide triangle (big badges) or a bold "!" (the mini). */
  alert?: 'triangle' | 'bang';
  status: BadgeStatus;
  /** Render the final state with no motion at all. */
  still: boolean;
  /** The badge is being added to a bill that was asleep: it pops in (reading state) instead of starting settled. */
  appear?: boolean;
  reduced: boolean;
  /** Unique id prefix for the drop-shadow filter. */
  uid: string;
  /** Fires once when the check has finished drawing in. */
  onCheckDrawn?: () => void;
  /** Extra layers drawn above the badge (the sparkles on the paid state). */
  children?: ReactNode;
}

/**
 * The round badge at the corner of the bill: a spinner while reading, a green check when done,
 * an amber triangle when something needs a look. Figma: Illustration / Bill > Badge.
 *
 * Parts (data-part): disc-reading, disc-done, disc-flagged, spinner, check, alert.
 * Reading to done: the white disc cross-fades to green while the badge pops (spring), the spinner
 * shrinks away, then the check path draws in.
 * Reduced motion: the spinner does not turn; it pulses softly (opacity), like the base Spinner's motion-reduce.
 */
export function StatusBadge({
  cx,
  cy,
  r,
  doneR = r,
  ringR,
  shadow = true,
  iconScale,
  spinnerStroke = 2,
  checkStroke = 2.5,
  alertStroke = 2,
  alert = 'triangle',
  status,
  still,
  appear = false,
  reduced,
  uid,
  onCheckDrawn,
  children,
}: StatusBadgeProps) {
  const rotation = useMotionValue(0);

  // The spinner turns only while reading, and never under reduced motion (it pulses instead, see below).
  useEffect(() => {
    if (reduced || still || status !== 'reading') return;
    const controls = animate(rotation, rotation.get() + 360, {
      duration: 0.9,
      ease: 'linear',
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [reduced, still, status, rotation]);

  const fade = reduced ? INSTANT : { duration: 0.2, ease: EASE_OUT };
  const variants: Record<'pop' | 'white' | 'done' | 'flag' | 'spinner' | 'check' | 'alert', Variants> = {
    // Pop: a spring from slightly small. `pre` is used when the badge appears already done.
    pop: {
      pre: { scale: reduced ? 1 : 0.7 },
      reading: { scale: 1, transition: reduced ? INSTANT : SPRING_POP },
      done: { scale: reduced ? 1 : [0.78, 1], transition: reduced ? INSTANT : SPRING_POP },
      flagged: { scale: reduced ? 1 : [0.78, 1], transition: reduced ? INSTANT : SPRING_POP },
    },
    white: {
      pre: { opacity: 0 },
      reading: { opacity: 1, transition: fade },
      done: { opacity: 0, transition: fade },
      flagged: { opacity: 0, transition: fade },
    },
    done: {
      pre: { opacity: 0 },
      reading: { opacity: 0, transition: fade },
      done: { opacity: 1, transition: fade },
      flagged: { opacity: 0, transition: fade },
    },
    flag: {
      pre: { opacity: 0 },
      reading: { opacity: 0, transition: fade },
      done: { opacity: 0, transition: fade },
      flagged: { opacity: 1, transition: fade },
    },
    spinner: {
      pre: { opacity: 0, scale: 0.5 },
      reading: { opacity: 1, scale: 1, transition: fade },
      done: { opacity: 0, scale: reduced ? 1 : 0.5, transition: reduced ? INSTANT : { duration: 0.18, ease: EASE_OUT } },
      flagged: { opacity: 0, scale: reduced ? 1 : 0.5, transition: reduced ? INSTANT : { duration: 0.18, ease: EASE_OUT } },
    },
    check: {
      pre: { pathLength: 0, opacity: 0 },
      reading: { pathLength: 0, opacity: 0, transition: INSTANT },
      done: {
        pathLength: 1,
        opacity: 1,
        transition: reduced
          ? INSTANT
          : { pathLength: { delay: 0.14, duration: 0.4, ease: EASE_OUT }, opacity: { delay: 0.14, duration: 0.01 } },
      },
      flagged: { pathLength: 0, opacity: 0, transition: INSTANT },
    },
    alert: {
      pre: { opacity: 0, scale: 0.6 },
      reading: { opacity: 0, scale: 0.6, transition: INSTANT },
      done: { opacity: 0, scale: 0.6, transition: INSTANT },
      flagged: {
        opacity: 1,
        scale: 1,
        transition: reduced ? INSTANT : { delay: 0.1, type: 'spring', stiffness: 460, damping: 18 },
      },
    },
  };

  const initial = still ? false : status === 'reading' && !appear ? 'reading' : 'pre';

  // Reduced motion: a turning spinner would be motion, a frozen arc looks stuck. Pulse its opacity instead.
  const pulse = reduced && !still && status === 'reading';

  return (
    <g transform={`translate(${cx} ${cy})`}>
      {ringR !== undefined && <circle data-part="ring" r={ringR} fill="var(--card)" />}
      <defs>
        <filter
          id={`${uid}-badge-shadow`}
          x={-r - 16}
          y={-r - 12}
          width={2 * r + 32}
          height={2 * r + 32}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0352941 0 0 0 0 0.117647 0 0 0 0 0.258824 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="shadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="shadow" result="shape" />
        </filter>
      </defs>
      <motion.g
        data-part="badge"
        initial={initial}
        animate={status}
        variants={variants.pop}
      >
        <motion.g data-part="disc-reading" variants={variants.white} filter={shadow ? `url(#${uid}-badge-shadow)` : undefined}>
          <circle r={r} fill="var(--card)" />
          <circle r={r - 0.5} stroke="var(--line)" />
        </motion.g>
        <motion.circle data-part="disc-done" r={doneR} fill="var(--success-subtle)" variants={variants.done} />
        <motion.circle data-part="disc-flagged" r={doneR} fill="var(--warning-subtle)" variants={variants.flag} />

        <motion.g data-part="spinner" variants={variants.spinner}>
          <motion.g
            style={{ rotate: rotation }}
            animate={{ opacity: pulse ? [0.45, 1] : 1 }}
            transition={pulse ? { duration: 1.2, ease: EASE_IN_OUT, repeat: Infinity, repeatType: 'reverse' } : INSTANT}
          >
            <g transform={`scale(${iconScale}) translate(-12 -12)`}>
              {/* Invisible full circle: makes the group's bounding box centred on the arc's centre, so it spins in place. */}
              <circle cx={12} cy={12} r={9} />
              <path
                d="M21 12a9 9 0 1 1-6.219-8.56"
                stroke="var(--primary)"
                strokeWidth={spinnerStroke / iconScale}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </motion.g>
        </motion.g>

        <g transform={`scale(${iconScale}) translate(-12 -12)`}>
          <motion.path
            data-part="check"
            d="M20 6 9 17l-5-5"
            stroke="var(--success)"
            strokeWidth={checkStroke / iconScale}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={variants.check}
            onAnimationComplete={(definition) => {
              if (definition === 'done') onCheckDrawn?.();
            }}
          />
        </g>

        <motion.g data-part="alert" variants={variants.alert}>
          {alert === 'triangle' ? (
            <g transform={`scale(${iconScale}) translate(-12 -12)`}>
              <circle cx={12} cy={12} r={9} />
              <path
                d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01"
                stroke="var(--warning)"
                strokeWidth={alertStroke / iconScale}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ) : (
            <g fill="var(--warning)">
              <rect x={-1.05} y={-4.4} width={2.1} height={5.7} rx={1.05} />
              <circle cy={3.5} r={1.15} />
            </g>
          )}
        </motion.g>
      </motion.g>
      {children}
    </g>
  );
}
