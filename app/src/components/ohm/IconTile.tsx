import { cn } from '@/lib/utils';
import type { IconComponent } from './lib/types';

export type IconTileTone = 'muted' | 'primary' | 'success' | 'warning';

export interface IconTileProps {
  icon: IconComponent;
  tone?: IconTileTone;
  /** 36 inside a List row, 40 on its own. */
  size?: 36 | 40;
  className?: string;
}

const tones: Record<IconTileTone, string> = {
  muted: 'bg-surface-muted text-ink-strong',
  primary: 'bg-primary-subtle text-primary',
  success: 'bg-success-subtle text-success',
  warning: 'bg-warning-subtle text-warning',
};

/** Figma: Icon tile (Tone, Size 36 | 40). A rounded square holding one icon, used as a List row's leading visual. */
export function IconTile({ icon: Icon, tone = 'muted', size = 36, className }: IconTileProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center',
        size === 36 ? 'size-9 rounded-[10px]' : 'size-10 rounded-[11px]',
        tones[tone],
        className,
      )}
    >
      <Icon size={size === 36 ? 18 : 20} />
    </span>
  );
}
