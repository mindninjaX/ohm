import { useCallback, useEffect, useState } from 'react';

/**
 * The simulated reading of the bill (S04): four steps tick off one after another, then it is done.
 * Nothing is read; these are timers. About 9 s in all (the caption says "about 10 seconds"), and Skip
 * finishes it at once.
 */

/**
 * The bill that was read stays read. When the reading finishes (or Skip, or the X on a read in progress)
 * we remember it here, so Back from Your connection lands on "How Ohm read this bill" again instead of
 * replaying ten seconds of scanning. It is forgotten when a new read starts (Upload the PDF, Take a
 * photo), on Stop reading, and when the Prototype menu resets or restarts the demo (the demo's
 * first-bill mode flips then, and the note below no longer matches). A page reload forgets it too.
 */
interface ReadNote {
  /** The demo's first-bill mode while it was read (see `useDemo().firstBill`). */
  firstBill: boolean;
}
let readNote: ReadNote | null = null;
let readyToast: number | null = null;

/** Remember that the August bill has been read. */
export function markReadingDone(firstBill = false): void {
  readNote = { firstBill };
}

/** Forget it: a new read starts, or the reading was stopped. Also drops a "ready" toast still waiting. */
export function clearReadingDone(): void {
  readNote = null;
  if (readyToast !== null) {
    window.clearTimeout(readyToast);
    readyToast = null;
  }
}

/** Has the bill already been read in this demo? `firstBill` is the demo's current mode. */
export function wasReadingDone(firstBill = false): boolean {
  return readNote !== null && readNote.firstBill === firstBill;
}

/** The reading carries on behind a closed screen: say so a moment later (see ReadingScreen). */
export function scheduleReadyToast(show: () => void, delayMs: number): void {
  if (readyToast !== null) window.clearTimeout(readyToast);
  readyToast = window.setTimeout(() => {
    readyToast = null;
    show();
  }, delayMs);
}
export type StepState = 'pending' | 'active' | 'done';
export type ReadingPhase = 'reading' | 'done';

/** When each step finishes, in ms from the start. */
export const STEP_DONE_AT = [1800, 4000, 6600, 8800] as const;
/** When the reading as a whole is done: the illustration shows its check and the steps open. */
export const DONE_AT = 9300;

/**
 * - `run`: play the sequence from the start.
 * - `frame`: hold the Figma frame S04 (three steps done, the fourth running); used by capture mode.
 * - `done`: already finished (S04.1, `?open=all`).
 */
export type ReadingMode = 'run' | 'frame' | 'done';

export interface ReadingSimulation {
  phase: ReadingPhase;
  /** How many steps are done (0 to 4). */
  completed: number;
  stepState: (index: number) => StepState;
  skip: () => void;
}

const FRAME_COMPLETED = 3;

export function useReadingSimulation(mode: ReadingMode, options: { firstBill?: boolean } = {}): ReadingSimulation {
  const firstBill = options.firstBill ?? false;
  const stepCount = STEP_DONE_AT.length;
  const [completed, setCompleted] = useState(mode === 'done' ? stepCount : mode === 'frame' ? FRAME_COMPLETED : 0);
  const [phase, setPhase] = useState<ReadingPhase>(mode === 'done' ? 'done' : 'reading');

  useEffect(() => {
    if (mode !== 'run') return;
    const timers = STEP_DONE_AT.map((at, i) => window.setTimeout(() => setCompleted(i + 1), at));
    timers.push(window.setTimeout(() => setPhase('done'), DONE_AT));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [mode]);

  // A reading that plays out (or is skipped) to the end is a bill that has been read.
  useEffect(() => {
    if (mode === 'run' && phase === 'done') markReadingDone(firstBill);
  }, [mode, phase, firstBill]);

  const skip = useCallback(() => {
    setCompleted(stepCount);
    setPhase('done');
  }, [stepCount]);

  const stepState = useCallback(
    (index: number): StepState => (phase === 'done' || index < completed ? 'done' : index === completed ? 'active' : 'pending'),
    [completed, phase],
  );

  return { phase, completed, stepState, skip };
}
