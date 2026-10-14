import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import type { IconComponent } from './lib/types';

export interface SectionHeaderProps {
  title: string;
  /** Trailing text instead of a link (for example "Page 1"). */
  meta?: string;
  /** Label of the trailing Link M (for example "All bills"). */
  link?: string;
  onLinkClick?: () => void;
  /** The link's right icon. Default chevron-right; pass `null` for none. */
  linkIcon?: IconComponent | null;
  /** A line under the title. */
  description?: string;
  className?: string;
}

/**
 * Figma: Ohm / Section header (Trailing None | Link | Meta). Title Text-base/Semi Bold
 * `ink-strong`, at least 40 tall. Replaces every uppercase section label.
 */
export function SectionHeader({
  title,
  meta,
  link,
  onLinkClick,
  linkIcon = ChevronRight,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex min-h-10 items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-ink-strong">{title}</h2>
        {link ? (
          <Button variant="link" size="m" rightIcon={linkIcon ?? undefined} onClick={onLinkClick} className="-mr-1">
            {link}
          </Button>
        ) : (
          meta && <span className="text-sm text-ink-muted">{meta}</span>
        )}
      </div>
      {description && <p className="text-sm text-ink-muted">{description}</p>}
    </div>
  );
}
