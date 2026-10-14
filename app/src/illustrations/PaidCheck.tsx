import { motion } from 'motion/react';
import { BillIllustration } from './BillIllustration';
import { EASE_OUT, pick, useReduced } from './motion';
import type { IllustrationProps } from './svg';

export interface PaidCheckProps extends IllustrationProps {
  /** Called when the check has finished drawing in. */
  onDone?: () => void;
}

/** Figma S11 "Paid result" (28:45533) draws the hero done bill at 168 x 203. */
const PAID_WIDTH = 168;

/**
 * The Paid state: the bill illustration in its done state (standard badge, same as Figma), a spring pop and a few
 * quiet sparkles. The bill settles in first (fade and rise), then the badge pops and the check draws.
 * Figma: Illustration / Bill Hero Done (20:18627) at 168 x 203, as used by S11 Paid result (28:45533).
 */
export function PaidCheck({ onDone, width = PAID_WIDTH, className, style, title }: PaidCheckProps) {
  const reduced = useReduced();
  return (
    <motion.div
      className={className}
      style={{ display: 'flex', width, ...style }}
      initial={reduced ? false : { opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={pick(reduced, { duration: 0.32, ease: EASE_OUT })}
    >
      <BillIllustration status="done" sparkles onDone={onDone} width={width} title={title} />
    </motion.div>
  );
}
