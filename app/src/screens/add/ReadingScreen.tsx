import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button, Footer, Footnote, Header, IconButton, ScreenScaffold, useReduced } from '@/components/ohm';
import { BillIllustration } from '@/illustrations';
import { useCapture } from '@/shell';
import { StepsCard } from './components/StepsCard';
import { DONE_CAPTION, DONE_HEADER, READING_CAPTION, READING_HEADER, STEPS } from './readingContent';
import { useReadingSimulation, type ReadingMode } from './useReadingSimulation';

const ALL_STEPS = STEPS.map((_, i) => i);

/** When each step opens once reading is done (ms after the check lands), so the screen unfolds top to bottom. */
const OPEN_AFTER_DONE = [350, 800, 1250, 1800] as const;

/** Back one step when there is one, otherwise Home. The same rule as the Header's back button. */
function useLeave() {
  const navigate = useNavigate();
  return useCallback(() => {
    const state: unknown = window.history.state;
    const idx = state && typeof state === 'object' && 'idx' in state ? (state as { idx: unknown }).idx : undefined;
    if (typeof idx === 'number' && idx > 0) navigate(-1);
    else navigate('/', { replace: true, state: { ohmDirection: 'back' } });
  }, [navigate]);
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
 * Stop reading this bill opens the "Stop reading?" sheet (S04.2). Closing with the X leaves the reading
 * (the caption says it carries on and Ohm will notify).
 *
 * Capture mode (the Figma frames): `/reading` holds S04 (three steps done, the fourth running, the scan
 * line still) and `?open=all` is S04.1; neither plays.
 */
export function ReadingScreen() {
  const navigate = useNavigate();
  const leave = useLeave();
  const reduced = useReduced();
  const capture = useCapture();
  const [params] = useSearchParams();
  const openAll = params.get('open') === 'all';

  const mode: ReadingMode = openAll ? 'done' : capture ? 'frame' : 'run';
  const sim = useReadingSimulation(mode);
  const done = sim.phase === 'done';
  // The Figma frames and `?open=all` show everything at once with no motion.
  const still = capture || openAll;

  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set(openAll ? ALL_STEPS : []));
  const played = useRef(new Set<number>());
  const cardRef = useRef<HTMLDivElement>(null);

  // When the reading finishes: unfold the steps one after another (all at once with reduced motion), and
  // follow the unfolding down the page until the person scrolls for themselves.
  useEffect(() => {
    if (!done || openAll) return;
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
  }, [done, openAll, reduced]);

  const toggle = useCallback((i: number) => {
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

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
          trailing={<IconButton icon={X} label="Close" onClick={leave} />}
        />
      }
      footer={
        <Footer>
          {done ? (
            <Button variant="link" onClick={() => navigate('/connection')}>
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
        <BillIllustration status={done ? 'done' : 'reading'} size="hero" still={still} title={done ? 'The bill, read' : 'Your bill being read'} />
        {!done && (
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
