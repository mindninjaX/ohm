import { CalendarDays, Check, Clock, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { IconComponent } from './lib/types';

export type DueTone = 'default' | 'tomorrow' | 'today' | 'overdue' | 'paid';
export type DueSize = 'm' | 's';

export interface DueLineProps {
  tone?: DueTone;
  size?: DueSize;
  /** The words, for example "Due Wed 16 Sep". */
  children: ReactNode;
  className?: string;
}

const icons: Record<DueTone, IconComponent> = {
  default: CalendarDays,
  tomorrow: CalendarDays,
  today: Clock,
  overdue: TriangleAlert,
  paid: Check,
};

const colours: Record<DueTone, string> = {
  default: 'text-ink-strong',
  tomorrow: 'text-ink-strong',
  today: 'text-warning',
  overdue: 'text-danger',
  paid: 'text-ink-strong',
};

/**
 * Figma: Ohm / Due line. A fact, not a control: icon plus words, no fill, no press state.
 * M is icon 20 and Text-xl/Semi Bold; S is icon 16 and Text-sm/Semi Bold.
 */
export function DueLine({ tone = 'default', size = 's', className, children }: DueLineProps) {
  const Icon = icons[tone];
  return (
    <div
      className={cn(
        'inline-flex items-center font-semibold',
        size === 'm' ? 'gap-2 text-xl' : 'gap-1.5 text-sm',
        colours[tone],
        className,
      )}
    >
      <Icon size={size === 'm' ? 20 : 16} aria-hidden className="shrink-0" />
      <span>{children}</span>
    </div>
  );
}
