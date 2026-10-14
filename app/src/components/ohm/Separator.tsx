import { cn } from '@/lib/utils';

export type SeparatorInset = 'none' | '16' | '20' | 'left-32' | 'left-68';

export interface SeparatorProps {
  /** Figma "Inset". `left-68` lines up with the text of a List row that has a 40 px leading box. */
  inset?: SeparatorInset;
  className?: string;
}

const insets: Record<SeparatorInset, string> = {
  none: '',
  '16': 'px-4',
  '20': 'px-5',
  'left-32': 'pl-8',
  'left-68': 'pl-[68px]',
};

/** Figma: Ohm / Separator. 1 px in `line`; the inset is side padding. */
export function Separator({ inset = 'none', className }: SeparatorProps) {
  return (
    <div aria-hidden="true" className={cn('w-full shrink-0', insets[inset], className)}>
      <div className="h-px bg-line" />
    </div>
  );
}
