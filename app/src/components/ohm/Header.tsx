import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { useInRouterContext, useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { IconButton } from './IconButton';
import type { IconComponent } from './lib/types';

export type HeaderType = 'back' | 'top-level';

export interface HeaderProps {
  /** Back has a leading arrow; Top level has the avatar and a larger title. */
  type?: HeaderType;
  title: string;
  subtitle?: string;
  /** Top level only. `true` shows the initials "NK"; a string shows those initials. */
  avatar?: boolean | string;
  /** Back only. Default arrow-left; use `X` for a modal screen such as Reading. */
  leadingIcon?: IconComponent;
  /** Replaces the default back behaviour (go back one step in history). */
  onBack?: () => void;
  /** Where Back goes when the page was opened directly and there is nothing to go back to. Default "/". */
  backTo?: string;
  /** A trailing action, usually `<Button variant="secondary" size="m">`. */
  trailing?: ReactNode;
  /** The 1 px bottom line. Default true. */
  divider?: boolean;
  /** Sticks to the top of the screen (default). */
  sticky?: boolean;
  className?: string;
}

interface BackButtonProps {
  icon: IconComponent;
  onBack?: () => void;
  backTo?: string;
}

/** Goes back one step when there is a step to go back to; otherwise to `backTo` so a deep link never leaves the app. */
function RouterBackButton({ icon, onBack, backTo = '/' }: BackButtonProps) {
  const navigate = useNavigate();
  const go = () => {
    if (onBack) return onBack();
    const state: unknown = window.history.state;
    const idx = state && typeof state === 'object' && 'idx' in state ? (state as { idx: unknown }).idx : undefined;
    if (typeof idx === 'number' && idx > 0) navigate(-1);
    // REPLACE reads as forward to the shell, so say outright that this one goes back.
    else navigate(backTo, { replace: true, state: { ohmDirection: 'back' } });
  };
  return <IconButton icon={icon} label="Back" onClick={go} />;
}

/**
 * Figma: Ohm / Header (Type Back | Top level), white, with the status bar zone above it
 * (`--safe-top`, 0 when there is none). Back is 60 tall: padding 6 16 10 8, gap 4, title Text-base/Semi Bold.
 * Top level is 68 tall: padding 8 16 12 16, gap 12, Avatar 40, title Text-lg/Semi Bold. The 1 px divider is
 * drawn over the bottom edge, not added to the height. Subtitle is Text-sm/Regular `ink-muted`.
 */
export function Header({
  type = 'back',
  title,
  subtitle,
  avatar = true,
  leadingIcon = ArrowLeft,
  onBack,
  backTo,
  trailing,
  divider = true,
  sticky = true,
  className,
}: HeaderProps) {
  const inRouter = useInRouterContext();
  const isBack = type === 'back';
  const initials = typeof avatar === 'string' ? avatar : 'NK';
  return (
    <header
      data-slot="header"
      className={cn('z-30 w-full bg-card pt-[var(--safe-top,0px)]', sticky && 'sticky top-0', className)}
    >
      <div
        className={cn(
          'relative flex items-center',
          divider && 'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-line',
          isBack ? 'h-[60px] gap-1 pt-1.5 pr-4 pb-2.5 pl-2' : 'h-[68px] gap-3 px-4 pt-2 pb-3',
        )}
      >
        {isBack &&
          (inRouter ? (
            <RouterBackButton icon={leadingIcon} onBack={onBack} backTo={backTo} />
          ) : (
            <IconButton icon={leadingIcon} label="Back" onClick={onBack} />
          ))}
        {!isBack && avatar && (
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-muted text-sm text-ink-muted"
          >
            {initials}
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <h1
            className={cn(
              'truncate font-semibold text-ink-strong',
              isBack ? 'text-base' : 'text-lg leading-7',
            )}
          >
            {title}
          </h1>
          {subtitle && <p className="truncate text-sm text-ink-muted">{subtitle}</p>}
        </div>
        {trailing}
      </div>
    </header>
  );
}
