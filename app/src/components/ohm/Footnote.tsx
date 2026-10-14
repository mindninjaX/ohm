import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface FootnoteProps {
  align?: 'left' | 'center';
  children: ReactNode;
  className?: string;
}

/** Figma: Ohm / Footnote. Text-sm/Regular `ink-muted`. */
export function Footnote({ align = 'left', className, children }: FootnoteProps) {
  return (
    <p className={cn('text-sm text-ink-muted', align === 'center' && 'text-center', className)}>{children}</p>
  );
}
