import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useNavigationType, useSearchParams } from 'react-router';
import { Button, Footer, Footnote, Header, IconButton, ScreenScaffold, toast, useReduced } from '@/components/ohm';
import { BillIllustration } from '@/illustrations';
import { useCapture, useDemo } from '@/shell';
import { StepsCard } from './components/StepsCard';
import { IN_FIGMA } from './copy';
import { DONE_CAPTION, DONE_HEADER, READING_CAPTION, READING_HEADER, READY_TOAST, STEPS } from './readingContent';
import {
  markReadingDone,
  scheduleReadyToast,
  useReadingSimulation,
  wasReadingDone,
  type ReadingMode,
} from './useReadingSimulation';

const ALL_STEPS = STEPS.map((_, i) => i);

/** When each step opens once reading is done (ms after the check lands), so the screen unfolds top to bottom. */
const OPEN_AFTER_DONE = [350, 800, 1250, 1800] as const;

/** How long after the X on a read in progress the "ready" toast arrives (the bill "finished in the background"). */
const READY_TOAST_AFTER = 2000;

/** Back one step when there is one, otherwise `fallback` (Home unless told). The same rule as the Header's back button. */
function useLeave(fallback = '/') {
  const navigate = useNavigate();
  return useCallback(() => {
    const state: unknown = window.history.state;
    const idx = state && typeof state === 'object' && 'idx' in state ? (state as { idx: unknown }).idx : undefined;
    if (typeof idx === 'number' && idx > 0) navigate(-1);
    else navigate(fallback, { replace: true, state: { ohmDirection: 'back' } });
  }, [navigate, fallback]);
}

/**
 * S04 Reading (/reading) and S04.1 Reading details (/reading?open=all).
 *
 * The bill illustration is scanned (the line sweeps, rows light up) while four steps tick off one after
 * another: Found, Read, Redoing the maths, Running the 6 checks. About 9 s; Skip finishes it. Then the
 * reading is done: the illustration gets its check, the header says "How Ohm read this bill", and every
 * step unfolds (rows arriving, the amounts counting in, the six checks turning green) with a Done button
 * on to the connection screen. A step can be opened at any time by tapping it.
 *
 * Stop reading this bill opens the "Stop reading?" sheet (S04.2). Closing with the X leaves the reading:
 * the caption says it carries on and Ohm will notify, so the bill counts as read and a toast says it is
 * ready a couple of seconds later.
 *
 * A bill that has been read stays read: coming back to this screen with Back (from Your connection, say)
 * shows "How Ohm read this bill" at once, steps done and closed, with no scanning and no counting.
 * `?open=all` is the same page opened from Checks ("See how Ohm read this bill"): Done goes back there.
 *
 * Capture mode (the Figma frames): `/reading` holds S04 (three steps done, the fourth running, the scan
 * line still) and `?open=all` is S04.1; neither plays.
 */
export function ReadingScreen() {
  const navigate = useNavigate();
  const leave = useLeave();
  const reduced = useReduced();
  const capture = useCapture();
  const navType = useNavigationType();
  const { firstBill } = useDemo();
  const [params] = useSearchParams();
  const openAll = params.get('open') === 'all';

  // Back (a POP) onto a bill that was already read: show it read, do not scan it again. Decided once, on mount:
  // a reading that finishes while we are here is not a restore.
  const [restored] = useState(() => !openAll && !capture && navType === 'POP' && wasReadingDone(firstBill));
  const mode: ReadingMode = openAll || restored ? 'done' : capture ? 'frame' : 'run';
  const sim = useReadingSimulation(mode, { firstBill });
  const done = sim.phase === 'done';
  // The Figma frames, `?open=all` and a bill read before show everything at once with no motion.
  const still = capture || openAll || restored;
  // Opened from Checks: Done goes back there.
  const leaveReview = useLeave('/bill/checks');

  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set(openAll ? ALL_STEPS : []));
  const played = useRef(new Set<number>());
  const cardRef = useRef<HTMLDivElement>(null);

  // When the reading finishes: unfold the steps one after another (all at once with reduced motion), and
  // follow the unfolding down the page until the person scrolls for themselves.
  useEffect(() => {
    if (!done || openAll || restored) return;
    let taken = false;
    const takeOver = () => {
      taken = true;
    };
    window.addEventListener('wheel', takeOver, { passive: true });
    window.addEventListener('touchmove', takeOver, { passive: true });
    window.addEventListener('keydown', takeOver);
    const scrollTo = (i: number) => {
      if (reduced || taken) return;
      const row = cardRef.current?.querySelectorAll<HTMLElement>('[data-slot="step-row"]')[i];
      // Scroll the screen's own layer only (scrollIntoView would also move the clipped phone frame behind it).
      const layer = row?.closest<HTMLElement>('[data-slot="screen-layer"]');
      if (!row || !layer) return;
      const header = layer.querySelector<HTMLElement>('[data-slot="header"]')?.getBoundingClientRect().height ?? 0;
      const top = row.getBoundingClientRect().top - layer.getBoundingClientRect().top + layer.scrollTop - header - 8;
      layer.scrollTo({ top, behavior: 'smooth' });
    };
    const timers = ALL_STEPS.map((i) =>
      window.setTimeout(
        () => {
          setOpen((s) => new Set(s).add(i));
          if (i > 0) scrollTo(i);
        },
        reduced ? 0 : OPEN_AFTER_DONE[i],
      ),
    );
    // The last step is at the bottom of the page: once its rows are in, bring it (and the Done button) fully into view.
    timers.push(window.setTimeout(() => scrollTo(ALL_STEPS.length - 1), OPEN_AFTER_DONE[ALL_STEPS.length - 1]! + 550));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener('wheel', takeOver);
      window.removeEventListener('touchmove', takeOver);
      window.removeEventListener('keydown', takeOver);
    };
  }, [done, openAll, restored, reduced]);

  const toggle = useCallback((i: number) => {
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  // The X on a read in progress: the caption promised it carries on, so it does. The bill counts as read
  // (Back to this screen finds it done) and a toast says it is ready a moment later.
  const close = useCallback(() => {
    if (!done && !capture) {
      markReadingDone(firstBill);
      scheduleReadyToast(() => toast.success(READY_TOAST), READY_TOAST_AFTER);
    }
    leave();
  }, [done, capture, firstBill, leave]);

  const states = STEPS.map((_, i) => sim.stepState(i));
  const header = done ? DONE_HEADER : READING_HEADER;

  return (
    <ScreenScaffold
      contentClassName="gap-5"
      header={
        <Header
          type="top-level"
          avatar={false}
          title={header.title}
          subtitle={header.subtitle}
          trailing={<IconButton icon={X} label="Close" onClick={close} />}
        />
      }
      footer={
        <Footer>
          {done ? (
            <Button variant="link" onClick={openAll ? leaveReview : () => navigate('/connection')}>
              Done
            </Button>
          ) : (
            <Button variant="link" onClick={() => navigate('/reading/stop')}>
              Stop reading this bill
            </Button>
          )}
        </Footer>
      }
    >
      <div className="relative flex justify-center">
        {/* The 240 px art centres on a half pixel (x 76.5); the browser paints it one device pixel (half a CSS
            pixel) to the right of where Figma's 2x export has it, so every edge in it is off by that much. */}
        <BillIllustration
          status={done ? 'done' : 'reading'}
          size="hero"
          still={still}
          title={done ? 'The bill, read' : 'Your bill being read'}
          className="[transform:translateX(-0.5px)]"
        />
        {!done && (!capture || IN_FIGMA.skip) && (
          <motion.button
            type="button"
            onClick={sim.skip}
            className="absolute top-0 right-0 inline-flex h-11 items-center rounded-full px-3 text-sm font-medium text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-[3px] focus-visible:ring-primary/40"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.3 }}
          >
            Skip
          </motion.button>
        )}
      </div>
      <StepsCard ref={cardRef} states={states} open={open} onToggle={toggle} played={still ? null : played} />
      <Footnote align="center" className="px-4">
        {done ? DONE_CAPTION : READING_CAPTION}
      </Footnote>
    </ScreenScaffold>
  );
}
