import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface NumberedStepProps {
  /** The step number, 1 to 3. */
  n: number;
  /** The instruction, Text-sm/Regular `ink`. */
  children: ReactNode;
  /** A line under the instruction in Text-base/Semi Bold `ink-strong` (the address). */
  emphasis?: ReactNode;
  className?: string;
}

/**
 * Figma: Ohm / Numbered step (28:40118). A 24 px circle in `primary-subtle` holding the digit
 * (Text-xs/Semi Bold, `primary`), 12 to its right a column with 2 px on top: the instruction, and
 * under it (2 apart) an optional emphasised line.
 *
 * Only the Forward guide uses it; move it to components/ohm if another area needs it.
 */
export function NumberedStep({ n, children, emphasis, className }: NumberedStepProps) {
  return (
    <li data-slot="numbered-step" className={cn('flex items-start gap-3', className)}>
      <span
        aria-hidden="true"
        className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-subtle text-xs font-semibold text-primary"
      >
        {n}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5">
        <p className="text-sm text-ink">
          <span className="sr-only">Step {n}: </span>
          {children}
        </p>
        {emphasis && <p className="text-base font-semibold break-words text-ink-strong">{emphasis}</p>}
      </div>
    </li>
  );
}
