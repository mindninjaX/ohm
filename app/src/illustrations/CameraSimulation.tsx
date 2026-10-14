import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BillPaperArt } from './BillIllustration';
import { EASE_IN_OUT, EASE_OUT, SPRING_POP, SPRING_PRESS, SPRING_SOFT, pick, useReduced } from './motion';

export interface CameraSimulationProps {
  /** Called after the shutter flash: the "photo" is the bill in the frame. */
  onCapture?: () => void;
  /** How long the brackets search before they lock onto the bill (default 1400 ms). */
  lockAfterMs?: number;
  /** Size it from outside (it fills its container by default). */
  className?: string;
}

const BILL_WIDTH = 232;
const BILL_HEIGHT = Math.round((BILL_WIDTH * 264) / 200);
const FRAME_PAD = 14;

/** Corner bracket placement: which edges carry the border, and the rounded corner. */
const CORNERS = [
  { id: 'tl', place: 'left-0 top-0', border: 'border-l-[3px] border-t-[3px] rounded-tl-[14px]' },
  { id: 'tr', place: 'right-0 top-0', border: 'border-r-[3px] border-t-[3px] rounded-tr-[14px]' },
  { id: 'bl', place: 'bottom-0 left-0', border: 'border-b-[3px] border-l-[3px] rounded-bl-[14px]' },
  { id: 'br', place: 'bottom-0 right-0', border: 'border-b-[3px] border-r-[3px] rounded-br-[14px]' },
] as const;

/**
 * Simulated camera: a dark viewfinder, a paper bill drifting a little, four corner brackets that search then
 * lock onto the bill (wide and dim, then a spring snap tight and fully white; the "Bill found" pill confirms it),
 * and a shutter. Tap the shutter: white flash, then `onCapture`. The brackets stay white in both states:
 * a primary bracket on the dark viewfinder would be dimmer than the white one.
 * No camera is ever opened. Parts (data-part): viewfinder, bill, brackets, hint, shutter, flash.
 */
export function CameraSimulation({ onCapture, lockAfterMs = 1400, className }: CameraSimulationProps) {
  const reduced = useReduced();
  const [locked, setLocked] = useState(false);
  const [flash, setFlash] = useState(false);

  const latest = useRef(onCapture);
  useEffect(() => {
    latest.current = onCapture;
  });

  useEffect(() => {
    const id = window.setTimeout(() => setLocked(true), reduced ? 300 : lockAfterMs);
    return () => window.clearTimeout(id);
  }, [lockAfterMs, reduced]);

  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => latest.current?.(), reduced ? 120 : 260);
    return () => window.clearTimeout(id);
  }, [flash, reduced]);

  // Searching: the bill wanders a little and tilts. Locked: it eases square, then floats a hair so it feels live.
  const drift = reduced
    ? { x: 0, y: 0, rotate: 0 }
    : locked
      ? { x: [null, 1.5, -1, 0], y: [null, -1.5, 1, 0], rotate: 0 }
      : { x: [0, 10, -8, 4, 0], y: [0, -8, 6, -3, 0], rotate: [-3, 2, -1.5, 2.5, -3] };
  const wander = { duration: 5, ease: EASE_IN_OUT, repeat: Infinity };
  const float = { duration: 4, ease: EASE_IN_OUT, repeat: Infinity };
  const driftTransition = reduced
    ? { duration: 0 }
    : locked
      ? { x: float, y: float, rotate: { type: 'spring' as const, stiffness: 90, damping: 16 } }
      : wander;

  return (
    <div
      data-part="viewfinder"
      className={`relative flex h-full min-h-[520px] w-full select-none flex-col items-center overflow-hidden bg-ink-strong ${className ?? ''}`}
    >
      {/* Soft light in the middle and a rule-of-thirds grid, so it reads as a lens. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,255,255,0.10),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]" aria-hidden="true">
        <div className="absolute inset-y-0 left-1/3 w-px bg-white" />
        <div className="absolute inset-y-0 left-2/3 w-px bg-white" />
        <div className="absolute inset-x-0 top-1/3 h-px bg-white" />
        <div className="absolute inset-x-0 top-2/3 h-px bg-white" />
      </div>

      {/* The hint above the bill. */}
      <div className="relative mt-6 flex h-9 items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={locked ? 'found' : 'search'}
            data-part="hint"
            className="flex items-center gap-2 rounded-full bg-black/45 px-3.5 py-1.5 text-sm font-medium text-white"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={pick(reduced, { duration: 0.2, ease: EASE_OUT })}
          >
            {locked && (
              <motion.span
                className="size-2 rounded-full bg-primary"
                aria-hidden="true"
                initial={reduced ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={pick(reduced, SPRING_POP)}
              />
            )}
            {locked ? 'Bill found' : 'Fit the bill inside the frame'}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The bill and the frame that locks onto it. */}
      <div className="relative mt-6 flex flex-1 items-start justify-center">
        <div className="relative" style={{ width: BILL_WIDTH + FRAME_PAD * 2, height: BILL_HEIGHT + FRAME_PAD * 2 }}>
          <motion.div
            data-part="bill"
            className="absolute"
            style={{ left: FRAME_PAD, top: FRAME_PAD, filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.5))' }}
            animate={drift}
            transition={driftTransition}
          >
            <BillPaperArt width={BILL_WIDTH} />
          </motion.div>

          {/* Brackets: wide and dim white while searching, tight and full white once locked. */}
          <motion.div
            data-part="brackets"
            className="pointer-events-none absolute inset-0"
            initial={reduced ? false : { scale: 1.2, opacity: 0 }}
            animate={
              locked
                ? { scale: 1, opacity: 1 }
                : reduced
                  ? { scale: 1, opacity: 1 }
                  : { scale: [1.2, 1.15, 1.2], opacity: 1 }
            }
            transition={
              locked
                ? pick(reduced, { ...SPRING_POP, stiffness: 220, damping: 16 })
                : { duration: 1.6, ease: EASE_IN_OUT, repeat: Infinity }
            }
          >
            {CORNERS.map((c) => (
              <span
                key={c.id}
                data-part={`bracket-${c.id}`}
                className={`absolute size-8 transition-colors duration-300 motion-reduce:transition-none ${c.place} ${c.border} ${locked ? 'border-white' : 'border-white/60'}`}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* The shutter. */}
      <div className="relative mb-8 mt-4 flex h-[84px] items-center justify-center">
        <motion.button
          type="button"
          data-part="shutter"
          aria-label="Take photo"
          disabled={flash}
          onClick={() => setFlash(true)}
          className="flex size-[76px] items-center justify-center rounded-full border-4 border-white bg-transparent outline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
          whileTap={reduced ? undefined : { scale: 0.92 }}
          transition={SPRING_PRESS}
        >
          <motion.span
            className="size-[58px] rounded-full bg-white"
            animate={flash && !reduced ? { scale: [1, 0.82, 1] } : { scale: 1 }}
            transition={SPRING_SOFT}
          />
        </motion.button>
      </div>

      {/* The flash. Gentler when motion is reduced. */}
      <AnimatePresence>
        {flash && (
          <motion.div
            data-part="flash"
            className="pointer-events-none absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: reduced ? [0, 0.35, 0] : [0, 1, 0] }}
            transition={{ duration: reduced ? 0.4 : 0.5, times: [0, 0.22, 1], ease: EASE_OUT }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
