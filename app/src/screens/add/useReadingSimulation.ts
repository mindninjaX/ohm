import { useCallback, useEffect, useState } from 'react';

/**
 * The simulated reading of the bill (S04): four steps tick off one after another, then it is done.
 * Nothing is read; these are timers. About 9 s in all (the caption says "about 10 seconds"), and Skip
 * finishes it at once.
 */
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

export function useReadingSimulation(mode: ReadingMode): ReadingSimulation {
  const stepCount = STEP_DONE_AT.length;
  const [completed, setCompleted] = useState(mode === 'done' ? stepCount : mode === 'frame' ? FRAME_COMPLETED : 0);
  const [phase, setPhase] = useState<ReadingPhase>(mode === 'done' ? 'done' : 'reading');

  useEffect(() => {
    if (mode !== 'run') return;
    const timers = STEP_DONE_AT.map((at, i) => window.setTimeout(() => setCompleted(i + 1), at));
    timers.push(window.setTimeout(() => setPhase('done'), DONE_AT));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [mode]);

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
