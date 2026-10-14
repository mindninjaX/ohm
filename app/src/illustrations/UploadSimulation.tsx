import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';
import { BillIllustration } from './BillIllustration';
import { EASE_IN_OUT, EASE_OUT, SPRING_POP, pick, useReduced } from './motion';

export interface UploadSimulationProps {
  /** Shown in the chip. */
  fileName?: string;
  /** Shown under the name. */
  fileSize?: string;
  /** How long the progress bar takes to fill (default 1200 ms). */
  durationMs?: number;
  /** Called once the file has flown into the bill and the bill has started reading. */
  onComplete?: () => void;
  className?: string;
}

/** Vertical distance from the chip's centre to the bill's centre: bill 128 / 2 + gap 20 + chip 64 / 2. */
const FLY_DISTANCE = 116;

type Phase = 'uploading' | 'flying' | 'reading';

/**
 * Simulated upload: an "August bill.pdf" chip whose progress bar fills, then the file flies up into the
 * bill illustration, which wakes up and starts reading. Nothing is uploaded; it is timers and springs.
 * Parts: bill (BillIllustration, compact), chip (file), bar (progress).
 * Replay by remounting (change the `key`).
 */
export function UploadSimulation({
  fileName = 'August bill.pdf',
  fileSize = '1.4 MB',
  durationMs = 1200,
  onComplete,
  className,
}: UploadSimulationProps) {
  const reduced = useReduced();
  const [phase, setPhase] = useState<Phase>('uploading');
  const [percent, setPercent] = useState(0);
  const progress = useMotionValue(0);

  const latest = useRef(onComplete);
  useEffect(() => {
    latest.current = onComplete;
  });

  // Fill the bar, then fly the file, then start reading, then report completion.
  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const unsubscribe = progress.on('change', (v) => setPercent(Math.round(v)));
    const fill = animate(progress, 100, {
      duration: durationMs / 1000,
      ease: [0.3, 0.1, 0.3, 1],
      onComplete: () => {
        if (cancelled) return;
        setPercent(100);
        // Hold on "Uploaded" for a beat, then fly the file into the bill, then let the bill read.
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setPhase('flying');
            timers.push(
              window.setTimeout(() => {
                if (cancelled) return;
                setPhase('reading');
                timers.push(window.setTimeout(() => latest.current?.(), reduced ? 0 : 450));
              }, reduced ? 200 : 520),
            );
          }, reduced ? 100 : 220),
        );
      },
    });
    return () => {
      cancelled = true;
      fill.stop();
      unsubscribe();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [durationMs, progress, reduced]);

  const landed = phase === 'reading';

  return (
    <div className={`flex w-full flex-col items-center gap-5 ${className ?? ''}`}>
      {/* The bill: asleep (no scan line, no focus box, no badge) until the file lands, then it starts reading. */}
      <motion.div
        data-part="bill"
        className="origin-center"
        animate={landed && !reduced ? { scale: [1, 1.03, 1] } : { scale: 1 }}
        transition={landed ? { duration: 0.4, ease: EASE_OUT } : { duration: 0 }}
      >
        <motion.div animate={{ opacity: landed ? 1 : 0.55 }} transition={pick(reduced, { duration: 0.3, ease: EASE_OUT })}>
          <BillIllustration size="compact" focus="maths" status={landed ? 'reading' : 'idle'} />
        </motion.div>
      </motion.div>

      {/* The file chip: progress while uploading, then it flies up into the bill. */}
      <motion.div
        data-part="chip"
        className="flex h-16 w-full max-w-[329px] items-center gap-3 rounded-2xl border border-line bg-card px-3"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={
          phase === 'uploading'
            ? { opacity: 1, y: 0, scale: 1 }
            : reduced
              ? { opacity: 0, y: 0, scale: 1 }
              : { opacity: 0, y: -FLY_DISTANCE, scale: 0.3 }
        }
        transition={
          phase === 'uploading'
            ? pick(reduced, { duration: 0.28, ease: EASE_OUT })
            : pick(reduced, { duration: 0.5, ease: EASE_IN_OUT })
        }
      >
        <FileIcon />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-sm font-medium text-ink">{fileName}</p>
            <p className="text-xs text-ink-muted tabular-nums">{percent >= 100 ? 'Uploaded' : `${percent}%`}</p>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-muted" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={`Uploading ${fileName}`}>
            <motion.div data-part="bar" className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-1 text-xs text-ink-muted">{fileSize}</p>
        </div>
      </motion.div>
    </div>
  );
}

/** The small PDF tile in the chip: a paper with a PDF tag on the soft blue tile. */
function FileIcon() {
  return (
    <motion.svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
      initial={false}
      animate={{ scale: 1 }}
      transition={SPRING_POP}
    >
      <rect width={40} height={40} rx={11} fill="var(--primary-subtle)" />
      <rect x={9} y={5} width={22} height={30} rx={4} fill="var(--card)" />
      <rect x={13} y={10} width={9} height={2.4} rx={1.2} fill="var(--line)" />
      <rect x={13} y={15} width={14} height={2.4} rx={1.2} fill="var(--line)" />
      <rect x={13} y={20} width={11} height={2.4} rx={1.2} fill="var(--line)" />
      <rect x={14} y={26} width={12} height={6} rx={2} fill="var(--primary)" />
      <text x={20} y={30.6} textAnchor="middle" fill="var(--card)" fontFamily="Inter Variable, Inter, sans-serif" fontSize={4.4} fontWeight={600}>
        PDF
      </text>
    </motion.svg>
  );
}
