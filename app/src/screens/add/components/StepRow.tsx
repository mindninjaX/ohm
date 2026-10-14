import { ChevronDown, CircleDashed, LoaderCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE_OUT, SPRING, useReduced } from '@/components/ohm';
import { cn } from '@/lib/utils';
import type { StepState } from '../useReadingSimulation';

/** The state icon. A step that turns done pops its circle and draws the tick; the others fade. */
function StepIcon({ state }: { state: StepState }) {
  const reduced = useReduced();
  return (
    <span className="relative grid size-5 shrink-0 place-items-center" aria-hidden="true">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={state}
          className="grid place-items-center"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: state === 'done' ? 0.6 : 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={reduced ? { duration: 0.15 } : state === 'done' ? SPRING.pop : { duration: 0.18, ease: EASE_OUT }}
        >
          {state === 'done' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
              <circle cx="12" cy="12" r="10" />
              <motion.path
                d="m9 12 2 2 4-4"
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.32, delay: reduced ? 0 : 0.1, ease: EASE_OUT }}
              />
            </svg>
          )}
          {state === 'active' && <LoaderCircle size={20} className="animate-spin text-primary motion-reduce:animate-pulse" />}
          {state === 'pending' && <CircleDashed size={20} className="text-ink-muted" />}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export interface StepRowProps {
  /** Figma "State": done (green check), active (spinner, Medium title), pending (dashed circle, muted title). */
  state: StepState;
  title: string;
  open: boolean;
  onToggle: () => void;
  /** The step's details; shown under the header while the row is open. */
  children?: ReactNode;
}

/**
 * Figma: Step row (20:22534), State Done | Active | Pending, Open False | True. A 52 tall header (padding
 * 0 16, 12 between): a 20 icon, the title in Text-base (Regular, Medium while active, `ink-muted` while
 * pending), a 16 chevron that turns over when the row is open. Open, the details sit under it with
 * padding 4 16 16 48. Tapping the header opens and closes the row (a height animation).
 */
export function StepRow({ state, title, open, onToggle, children }: StepRowProps) {
  const reduced = useReduced();
  return (
    <div data-slot="step-row" data-state={state} data-open={open ? '' : undefined}>
      <button
        type="button"
        aria-expanded={open}
        aria-label={`${title}, ${state === 'done' ? 'done' : state === 'active' ? 'in progress' : 'waiting'}`}
        onClick={onToggle}
        className="flex h-[52px] w-full items-center gap-3 px-4 text-left outline-none focus-visible:bg-primary-subtle/60"
      >
        <StepIcon state={state} />
        <span
          className={cn(
            'min-w-0 flex-1 truncate text-base',
            state === 'pending' ? 'text-ink-muted' : 'text-ink',
            state === 'active' && 'font-medium',
          )}
        >
          {title}
        </span>
        <motion.span
          aria-hidden="true"
          className="grid size-4 shrink-0 place-items-center text-ink-muted"
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduced ? { duration: 0 } : SPRING.pop}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: reduced ? 0.01 : 0.34, ease: EASE_OUT }, opacity: { duration: 0.2 } }}
          >
            <div className="flex flex-col gap-3 pt-1 pr-4 pb-4 pl-12">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
