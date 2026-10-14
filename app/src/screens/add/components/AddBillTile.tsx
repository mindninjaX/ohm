import { useState, type ReactNode } from 'react';
import { Badge } from '@/components/ohm';
import { ArtConnect, ArtForward, ArtPhoto, ArtUpload } from '@/illustrations';
import { cn } from '@/lib/utils';

export type AddBillTileType = 'upload' | 'photo' | 'forward' | 'connect';

export interface AddBillTileProps {
  /** Figma "Type": which art the tile shows. `connect` is the coming-soon tile and is always disabled. */
  type: AddBillTileType;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Figma "State=Disabled": grey art, muted title, a Coming soon badge instead of the subtitle. */
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * Figma: Add bill tile (11:10537), State Rest | Active | Disabled. A white card, 1 px `line` stroke,
 * radius 16, padding 6 6 12 6 and 10 between the art well and the text. The art well is 96 tall,
 * radius 10, `primary-subtle` (`surface-muted` when disabled). Active (hover, focus, press) is a
 * 1.5 px `primary` stroke and the art's Active pose; here the extra 0.5 px is an inner shadow, so
 * the tile never changes size under a finger.
 */
export function AddBillTile({ type, title, subtitle, disabled = false, onClick }: AddBillTileProps) {
  const [hot, setHot] = useState(false);
  const [pressed, setPressed] = useState(false);
  const live = !disabled;

  const art = {
    upload: <ArtUpload active={live && hot} pressed={live && pressed} />,
    photo: <ArtPhoto active={live && hot} pressed={live && pressed} />,
    forward: <ArtForward active={live && hot} pressed={live && pressed} />,
    connect: <ArtConnect enabled={false} />,
  }[type];

  return (
    <button
      type="button"
      data-slot="add-bill-tile"
      data-type={type}
      data-hot={live && hot ? '' : undefined}
      disabled={disabled}
      onClick={onClick}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => {
        setHot(false);
        setPressed(false);
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onFocus={(e) => {
        if (e.currentTarget.matches(':focus-visible')) setHot(true);
      }}
      onBlur={() => setHot(false)}
      className={cn(
        'flex h-full w-full flex-col gap-2.5 rounded-2xl border border-line bg-card p-1.5 pb-3 text-left outline-none',
        'transition-[border-color,box-shadow] duration-150 ease-out',
        'focus-visible:ring-[3px] focus-visible:ring-primary/40',
        live && 'data-[hot]:border-primary data-[hot]:shadow-[inset_0_0_0_0.5px_var(--primary)]',
        disabled && 'cursor-not-allowed',
      )}
    >
      <span
        className={cn(
          // Figma sets the 150 wide art 3 px from the left of the 154 wide well (1 px from the right). It shrinks on a narrow phone.
          'flex h-24 items-center justify-center rounded-[10px] pr-px pl-[3px] [&>svg]:h-auto [&>svg]:max-w-full',
          disabled ? 'bg-surface-muted' : 'bg-primary-subtle',
        )}
      >
        {art}
      </span>
      <span className="flex flex-col px-1.5">
        <span className={cn('text-sm font-semibold', disabled ? 'text-ink-muted' : 'text-ink-strong')}>{title}</span>
        {disabled ? (
          <Badge size="s" className="mt-0 text-ink-muted">
            Coming soon
          </Badge>
        ) : (
          subtitle && <span className="text-sm text-ink-muted">{subtitle}</span>
        )}
      </span>
    </button>
  );
}
