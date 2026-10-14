import { Fragment, useEffect, useState, type ReactNode, type Ref, type RefObject } from 'react';
import { CheckLine } from '@/components/ohm';
import {
  CHECK_RESULTS,
  FOUND_ROWS,
  MATHS_INTRO,
  MATHS_ROWS,
  READ_ROWS,
  STEPS,
  type DetailRow,
} from '../readingContent';
import type { StepState } from '../useReadingSimulation';
import { StepDetail } from './StepDetail';
import { StepRow } from './StepRow';

export interface StepsCardProps {
  states: readonly StepState[];
  /** Indexes of the steps that are open. */
  open: ReadonlySet<number>;
  onToggle: (index: number) => void;
  /**
   * Which steps have already played their opening motion (rows arriving, amounts counting, checks turning
   * green). Pass `null` for no motion at all (the Figma frames, `?open=all`).
   */
  played: RefObject<Set<number>> | null;
  /** The card's element, so a screen can scroll a step into view as they unfold. */
  ref?: Ref<HTMLDivElement>;
}

/** Rows of a step: they arrive one after another the first time the step opens. */
function Rows({ rows, play }: { rows: readonly DetailRow[]; play: boolean }) {
  return (
    <>
      {rows.map((row, i) => (
        <StepDetail key={row.id} label={row.label} value={row.value} note={row.note} play={play} index={i} />
      ))}
    </>
  );
}

/** The six checks turn from waiting to green one after another (all at once when there is no motion). */
function Checks({ play }: { play: boolean }) {
  const [passed, setPassed] = useState(play ? 0 : CHECK_RESULTS.length);
  useEffect(() => {
    if (!play) return;
    const timers = CHECK_RESULTS.map((_, i) => window.setTimeout(() => setPassed(i + 1), 450 + i * 260));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [play]);
  return (
    <>
      {CHECK_RESULTS.map((c, i) => (
        <CheckLine key={c.id} state={i < passed ? 'pass' : 'pending'} title={c.title} result={c.result} />
      ))}
    </>
  );
}

/** What one step shows when it is open and done. `play` is true only the first time it opens. */
function StepBody({ id, play }: { id: (typeof STEPS)[number]['id']; play: boolean }) {
  switch (id) {
    case 'found':
      return <Rows rows={FOUND_ROWS} play={play} />;
    case 'read':
      return <Rows rows={READ_ROWS} play={play} />;
    case 'maths':
      return (
        <>
          <p className="text-sm text-ink-muted">{MATHS_INTRO}</p>
          <Rows rows={MATHS_ROWS} play={play} />
        </>
      );
    case 'checks':
      return <Checks play={play} />;
  }
}

/** A step that has not finished has nothing to show yet. */
function NotYet() {
  return <p className="text-sm text-ink-muted">Ohm is still on this one. It fills in here when it is done.</p>;
}

/** Decided once, when the body mounts: has this step played its opening motion before? */
function PlayOnce({ index, played, children }: { index: number; played: RefObject<Set<number>> | null; children: (play: boolean) => ReactNode }) {
  const [play] = useState(() => played !== null && !played.current.has(index));
  useEffect(() => {
    played?.current.add(index);
  }, [index, played]);
  return <>{children(play)}</>;
}

/**
 * Figma: Steps card (20:23664, Open None | All): a white card, radius 16, padding 4 0, four Step rows with
 * a 1 px `line` between them that starts 48 in (under the title, not under the icon).
 */
export function StepsCard({ states, open, onToggle, played, ref }: StepsCardProps) {
  return (
    <div ref={ref} data-slot="steps-card" className="overflow-hidden rounded-2xl bg-card py-1">
      {STEPS.map((step, i) => (
        <Fragment key={step.id}>
          {i > 0 && <div aria-hidden="true" className="ml-12 h-px bg-line" />}
          <StepRow state={states[i] ?? 'pending'} title={step.title} open={open.has(i)} onToggle={() => onToggle(i)}>
            {states[i] === 'done' ? (
              <PlayOnce index={i} played={played}>
                {(play) => <StepBody id={step.id} play={play} />}
              </PlayOnce>
            ) : (
              <NotYet />
            )}
          </StepRow>
        </Fragment>
      ))}
    </div>
  );
}
