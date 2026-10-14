import { ChevronDown, Clock, Pencil } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId } from 'react';
import { Badge, Button, EASE_OUT, useReduced } from '@/components/ohm';
import { cn } from '@/lib/utils';
import { PRINTED_ON, type BusinessType, type Detail } from '../data';
import { BillCrop } from './BillCrop';
import { CapacityBar } from './CapacityBar';
import { FitBadge } from './FitBadge';
import { MeterEquation } from './MeterEquation';

export type RowStatus = 'edited' | 'checking' | null;

export interface ConnectionRowProps {
  detail: Detail;
  /** Replaces the value when the person changed it. */
  value?: string;
  /** Replaces the line under the label ("Set by you from your agreement."). */
  helper?: string;
  status?: RowStatus;
  /** The booked kVA the capacity bar compares the peak with (changes when the person sets another number). */
  booked?: number;
  business: BusinessType;
  open: boolean;
  onToggle: () => void;
  /** The bill crop was tapped: show it large on On your bill. */
  onOpenBill: () => void;
  /** "This is wrong". */
  onWrong: () => void;
}

/**
 * Figma: Connection row (11:12086). Padding 12 16, 12 between its parts: the text (label, value and chevron
 * over a helper, then an optional status badge), the visual (capacity bar, meter equation or fit badge) and,
 * when open, the proof (the bill crop, a note and "This is wrong").
 *
 * It opens in place: the proof grows to its height and the chevron turns. Rows are independent, so
 * several can be open at once.
 */
export function ConnectionRow({
  detail,
  value,
  helper,
  status = null,
  booked,
  business,
  open,
  onToggle,
  onOpenBill,
  onWrong,
}: ConnectionRowProps) {
  const reduced = useReduced();
  const panelId = useId();
  const shownValue = value ?? detail.value;
  const visual =
    detail.visual === 'capacity' ? (
      <CapacityBar booked={booked} />
    ) : detail.visual === 'equation' ? (
      <MeterEquation />
    ) : detail.visual === 'fit' ? (
      <FitBadge business={business} />
    ) : null;

  return (
    <div data-slot="connection-row" data-open={open || undefined} className="bg-card">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          'flex w-full flex-col gap-3 px-4 pt-3 pb-3 text-left',
          'transition-colors duration-150 active:bg-surface-muted',
          'outline-none focus-visible:bg-surface-muted',
        )}
      >
        <span className="flex flex-col gap-2">
          <span className="flex flex-col gap-0.5">
            <span className="flex h-6 items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-base font-medium text-ink">{detail.label}</span>
              <span className="shrink-0 text-base font-semibold text-ink-strong">{shownValue}</span>
              <motion.span
                aria-hidden="true"
                className="grid size-4 shrink-0 place-items-center text-ink-muted"
                initial={false}
                animate={{ rotate: open ? 180 : 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.28, ease: EASE_OUT }}
              >
                <ChevronDown size={16} />
              </motion.span>
            </span>
            <span className="text-sm text-ink-muted">{helper ?? detail.helper}</span>
          </span>
          {status === 'edited' && (
            <Badge tone="primary" icon={Pencil}>
              Edited by you
            </Badge>
          )}
          {status === 'checking' && (
            <Badge tone="neutral" icon={Clock}>
              Being checked
            </Badge>
          )}
        </span>
        {visual}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="proof"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0.15 } : { duration: 0.3, ease: EASE_OUT }}
          >
            <div className="flex flex-col gap-1 px-4 pb-3">
              <button
                type="button"
                aria-label={`See ${detail.label} on your bill`}
                onClick={onOpenBill}
                className="block w-full rounded-[12px] text-left outline-none transition-transform duration-150 active:scale-[0.99] focus-visible:ring-[3px] focus-visible:ring-primary/40 motion-reduce:active:scale-100"
              >
                <BillCrop label={detail.label} value={detail.value} />
              </button>
              <p className="text-sm text-ink-muted">{PRINTED_ON}</p>
              <Button variant="link" size="m" onClick={onWrong} className="self-start pl-0">
                This is wrong
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

