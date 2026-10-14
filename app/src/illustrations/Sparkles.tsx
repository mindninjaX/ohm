import { motion } from 'motion/react';
import { EASE_OUT } from './motion';

/**
 * Where each sparkle sits around the badge centre, how big it is and when it starts. The badge is in the
 * bottom right corner of the 240 x 290 page art, so every sparkle sits up and to the left of it: nothing
 * leaves the artwork's box, and a parent with overflow hidden cannot clip one.
 */
const SPARKS = [
  { x: -46, y: -34, s: 1.5, delay: 0 },
  { x: -14, y: -56, s: 1.05, delay: 0.06 },
  { x: 18, y: -46, s: 1.3, delay: 0.12 },
  { x: -58, y: 6, s: 0.9, delay: 0.18 },
  { x: -34, y: 18, s: 0.85, delay: 0.24 },
] as const;

/** A four-point star, about 10 units across. */
const STAR = 'M0 -5C0.6 -1.7 1.7 -0.6 5 0C1.7 0.6 0.6 1.7 0 5C-0.6 1.7 -1.7 0.6 -5 0C-1.7 -0.6 -0.6 -1.7 0 -5Z';

/**
 * A few sparkles that bloom around the check once, then fade. Five small stars, staggered 60 ms apart:
 * a quiet "paid", not confetti. Draws in the parent's coordinates, centred on (0, 0).
 */
export function Sparkles({ delay = 0.45 }: { delay?: number }) {
  return (
    <g data-part="sparkles">
      {SPARKS.map((spark, i) => (
        <motion.g
          key={i}
          style={{ x: spark.x, y: spark.y }}
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={{ opacity: [0, 1, 0], scale: [0, spark.s, spark.s * 0.4], rotate: [-45, 0, 25] }}
          transition={{ duration: 0.9, times: [0, 0.35, 1], ease: EASE_OUT, delay: delay + spark.delay }}
        >
          <path d={STAR} fill="var(--success)" />
        </motion.g>
      ))}
    </g>
  );
}
