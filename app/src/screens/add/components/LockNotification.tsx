import { motion } from 'motion/react';
import { NOTIFICATION } from '@/data/bill';
import { AppIconSmall } from '@/illustrations';
import { useReduced } from '@/components/ohm';
import { LockGlass } from './LockGlass';

/** iOS text on the lock screen: SF Pro where the device has it (every Apple device), Inter elsewhere. */
const SF = '-apple-system, "SF Pro Text", "SF Pro", system-ui, "Inter Variable", Inter, sans-serif';

/**
 * Figma: iOS / Notification (Stack=1) on the lock screen: a 365 wide glass card, radius 24, padding 14,
 * the Ohm app icon (38) and 10 to its right the title (15/17 semibold), the body (15/18 regular) and "now"
 * (15/17, a soft light grey). The text is `NOTIFICATION` from the data module.
 *
 * It is a button: tapping it opens the August bill. It arrives from below with a soft spring; if nobody
 * taps it for a while, a faint ring breathes around it.
 */
export function LockNotification({ onOpen }: { onOpen: () => void }) {
  const reduced = useReduced();
  return (
    <motion.button
      type="button"
      data-slot="lock-notification"
      aria-label={`${NOTIFICATION.title}. ${NOTIFICATION.body.replace(/\n/g, ' ')} Open the bill.`}
      onClick={onOpen}
      className="relative block w-full cursor-pointer rounded-[24px] text-left outline-none focus-visible:ring-[3px] focus-visible:ring-white/60"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={reduced ? { duration: 0.2, delay: 0.2 } : { type: 'spring', stiffness: 260, damping: 22, mass: 0.9, delay: 0.55 }}
      whileTap={reduced ? undefined : { scale: 0.975 }}
    >
      <LockGlass radius={24}>
        <div className="flex items-center gap-2.5 p-3.5" style={{ fontFamily: SF }}>
          <AppIconSmall width={38.3} className="shrink-0" />
          <div
            className="relative top-[0.5px] flex min-w-0 flex-1 flex-col text-white"
            style={{ letterSpacing: '-0.23px' }}
          >
            <div className="flex items-start gap-2.5">
              <p className="min-w-0 flex-1 text-[15px] leading-[17px] font-semibold">{NOTIFICATION.title}</p>
              <span className="shrink-0 text-[15px] leading-[17px] font-normal" style={{ color: 'rgb(232 238 255 / 0.55)' }}>
                now
              </span>
            </div>
            {/* The body runs under "now" (Figma's 250 wide column never needs it at 393; a 360 phone does). */}
            <p className="text-[15px] leading-[18px] font-normal whitespace-pre-line">{NOTIFICATION.body}</p>
          </div>
        </div>
      </LockGlass>
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 rounded-[28px] border border-white/50"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.985, 1.025, 1.04] }}
          transition={{ duration: 2.4, delay: 3.2, repeat: Infinity, repeatDelay: 2.2, ease: 'easeOut' }}
        />
      )}
    </motion.button>
  );
}
