import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import type { AriaRole, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import type { IconComponent } from './lib/types';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  tone?: AlertTone;
  title: ReactNode;
  description?: ReactNode;
  /** Label of the Link M under the text, for example "Try again". */
  link?: string;
  onLinkClick?: () => void;
  /** Shows a spinner in the link and ignores taps (a retry in flight). */
  linkLoading?: boolean;
  /** Default: `alert` for the danger tone, none for the others. */
  role?: AriaRole;
  /** Another icon than the tone's own (for example `PiggyBank` for a saving). */
  icon?: IconComponent;
  className?: string;
}

const tones: Record<AlertTone, { box: string; icon: string; Icon: IconComponent }> = {
  info: { box: 'bg-primary-subtle', icon: 'text-primary', Icon: Info },
  success: { box: 'bg-success-subtle', icon: 'text-success', Icon: CircleCheck },
  warning: { box: 'bg-warning-subtle', icon: 'text-warning', Icon: TriangleAlert },
  danger: { box: 'bg-danger-subtle', icon: 'text-danger', Icon: CircleAlert },
};

/**
 * Figma: Ohm / Alert. Radius 16, padding 16, icon 16 on the left, Title Text-sm/Semi Bold
 * `ink-strong`, Description Text-sm/Regular `ink`, an optional Link M below (its full 40 tall, its label
 * on the text edge).
 */
export function Alert({
  tone = 'info',
  title,
  description,
  link,
  onLinkClick,
  linkLoading,
  role,
  icon,
  className,
}: AlertProps) {
  const t = tones[tone];
  const Icon = icon ?? t.Icon;
  return (
    <div
      role={role ?? (tone === 'danger' ? 'alert' : undefined)}
      data-tone={tone}
      className={cn('flex items-start gap-3 rounded-2xl p-4', t.box, className)}
    >
      <Icon size={16} aria-hidden className={cn('mt-0.5 shrink-0', t.icon)} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-sm font-semibold text-ink-strong">{title}</p>
        {description && <p className="text-sm text-ink">{description}</p>}
        {link && (
          <Button variant="link" size="m" loading={linkLoading} onClick={onLinkClick} className="-ml-1 self-start">
            {link}
          </Button>
        )}
      </div>
    </div>
  );
}
