import { Info } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { EASE_OUT, useReduced } from '@/components/ohm';
import { cn } from '@/lib/utils';
import { GrowBar, useSeen } from './primitives';

// ---------------------------------------------------------------- the info popover

/**
 * Figma: Info popover. A 260 wide white bubble (radius 12, padding 12, a soft shadow) under the line
 * of the part it explains, flush with the left edge of the card. It scales in from its top left
 * corner (fade only with reduced motion) and goes away on a tap anywhere (it covers the next row's info
 * icon, as in Figma, so tapping it is how you get to that icon), on Escape, or when its info icon is tapped again.
 */
export function InfoPopover({
  id,
  open,
  onClose,
  children,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const reduced = useReduced();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      // The info button toggles it itself, so a press on it is not "outside".
      if (ref.current?.contains(target) || target?.closest(`[data-info-button="${id}"]`)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, id]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id={`info-${id}`}
          role="dialog"
          aria-label="What this part means"
          className="absolute top-[42px] left-0 z-20 w-[260px] origin-top-left rounded-xl bg-card p-3 text-sm text-ink shadow-[0_4px_16px_rgb(9_30_66/0.12)]"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.18, ease: EASE_OUT }}
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** The 24 px info icon on a part's name. Its tap area is 44 (the pseudo-element reaches 10 px past it). */
function InfoButton({ id, label, open, onToggle }: { id: string; label: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      data-info-button={id}
      aria-label={`What ${label} means`}
      aria-expanded={open}
      aria-controls={`info-${id}`}
      onClick={onToggle}
      className={cn(
        'relative grid size-6 shrink-0 place-items-center rounded-full text-ink-muted outline-none',
        'after:absolute after:-inset-2.5 after:content-[""]',
        'transition-colors duration-150 focus-visible:text-primary',
      )}
    >
      <Info size={16} aria-hidden />
    </button>
  );
}

// ---------------------------------------------------------------- part rows

export interface PartRowProps {
  id: string;
  name: string;
  amount: string;
  /** The maths in plain words (Text-sm, `ink-muted`). */
  maths: string;
  /** "62%". */
  share?: string;
  /** Width of the share bar, in % of the track. Leave out for a row without a bar (the credit). */
  barPct?: number;
  /** The bar is never narrower than this (0.4% still shows a dot). */
  barMinPx?: number;
  /** `ink-strong` amount by default; the credit is green. */
  amountClassName?: string;
  /** Adds the info icon and its popover with this text. */
  info?: string;
  infoOpen?: boolean;
  onInfoToggle?: () => void;
  onInfoClose?: () => void;
  barDelay?: number;
  children?: ReactNode;
}

/**
 * Figma: Ohm / Part row (Type Plain | Credit; Time of day and Taxes add a split block under it).
 * Padding 14 16, 8 between the text and the share bar; line 1 is 24 tall (name Text-base/Medium,
 * amount Text-base/Semi Bold), line 2 is 20 (the maths and the share, Text-sm `ink-muted`).
 */
export function PartRow({
  id,
  name,
  amount,
  maths,
  share,
  barPct,
  barMinPx,
  amountClassName,
  info,
  infoOpen = false,
  onInfoToggle,
  onInfoClose,
  barDelay = 0,
  children,
}: PartRowProps) {
  return (
    <div className="relative" data-slot="part-row" data-part={id}>
      <div className="flex flex-col gap-2 px-4 py-3.5">
        <div className="flex flex-col gap-0.5">
          <div className="flex h-6 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-1">
              <span className="text-base font-medium text-ink">{name}</span>
              {info && onInfoToggle && <InfoButton id={id} label={name} open={infoOpen} onToggle={onInfoToggle} />}
            </div>
            <span className={cn('shrink-0 text-base font-semibold text-ink-strong', amountClassName)}>{amount}</span>
          </div>
          <div className="flex min-h-5 items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-sm text-ink-muted">{maths}</span>
            {share && <span className="shrink-0 text-sm text-ink-muted">{share}</span>}
          </div>
        </div>
        {barPct !== undefined && <GrowBar pct={barPct} height={6} minPx={barMinPx} delay={barDelay} />}
      </div>
      {children}
      {info && onInfoClose && (
        <InfoPopover id={id} open={infoOpen} onClose={onInfoClose}>
          {info}
        </InfoPopover>
      )}
    </div>
  );
}

/** A subtotal tile that spans the card (Figma: Part row Type Subtotal, `surface-muted`, radius 12). */
export function SubtotalRow({
  name,
  amount,
  maths,
  className,
}: {
  name: string;
  amount: string;
  maths: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-0.5 rounded-xl bg-surface-muted px-4 py-3.5', className)}>
      <div className="flex h-6 items-center justify-between gap-3">
        <span className="text-base font-semibold text-ink-strong">{name}</span>
        <span className="shrink-0 text-base font-semibold text-ink-strong">{amount}</span>
      </div>
      <p className="text-sm text-ink-muted">{maths}</p>
    </div>
  );
}

// ---------------------------------------------------------------- split blocks (under Time of day and Taxes)

/** The indented block under a part: a 2 px rule on the left, 14 in, lines 12 apart. */
export function SplitBlock({ children }: { children: ReactNode }) {
  return (
    <div className="-mt-0.5 px-4 pb-3.5">
      <div className="flex flex-col gap-3 border-l-2 border-line pl-3.5">{children}</div>
    </div>
  );
}

/** Taxes: a name and amount, and the maths under them (Figma: Split line, Kind Detail). */
export function DetailLine({ name, amount, detail }: { name: string; amount: string; detail: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 text-sm font-medium text-ink">{name}</span>
        <span className="shrink-0 text-sm font-semibold text-ink-strong">{amount}</span>
      </div>
      <p className="text-sm text-ink-muted">{detail}</p>
    </div>
  );
}

/** Where the zero line sits on a split bar, as a share of its width (Figma: 156 of 313). */
const AXIS_PCT = (156 / 313) * 100;
/** How far the longest bar reaches on either side of zero, as a share of the width (157 of 313). */
const REACH_PCT = (157 / 313) * 100;

/**
 * Time of day: what mornings and evenings add and what nights take off, on one scale around a zero
 * line (Figma: Split line, Kind Adds | Takes off; bar 8 tall). Adds run right in grey, takes-off runs
 * left in green. `maxAbs` is the biggest amount, which fills one whole side.
 */
export function SplitBar({
  name,
  amount,
  value,
  maxAbs,
  delay,
}: {
  name: string;
  amount: string;
  value: number;
  maxAbs: number;
  delay: number;
}) {
  const takesOff = value < 0;
  const widthPct = (Math.abs(value) / maxAbs) * REACH_PCT;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 text-sm font-medium text-ink">{name}</span>
        <span className={cn('shrink-0 text-sm font-semibold', takesOff ? 'text-success' : 'text-ink-strong')}>
          {amount}
        </span>
      </div>
      <SplitTrack takesOff={takesOff} widthPct={widthPct} delay={delay} />
    </div>
  );
}

function SplitTrack({ takesOff, widthPct, delay }: { takesOff: boolean; widthPct: number; delay: number }) {
  const reduced = useReduced();
  const [ref, seen] = useSeen<HTMLDivElement>();
  const target = `${widthPct}%`;
  return (
    <div ref={ref} aria-hidden="true" className="relative h-2 w-full rounded-full bg-surface-muted">
      <motion.span
        className={cn('absolute top-0 h-2', takesOff ? 'rounded-l-full bg-success' : 'rounded-r-full bg-line-strong')}
        style={takesOff ? { right: `${100 - (REACH_PCT + 0.16)}%` } : { left: `${AXIS_PCT + 0.48}%` }}
        initial={{ width: reduced ? target : 0 }}
        animate={{ width: seen || reduced ? target : 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      />
      <span className="absolute -top-0.5 h-3 w-px bg-ink-muted" style={{ left: `${AXIS_PCT}%` }} />
    </div>
  );
}
