import { X } from 'lucide-react';
import type { PointerEvent, ReactNode } from 'react';
import { useSheetClose, useSheetDragHandle } from '@/shell/sheets';
import { cn } from '@/lib/utils';
import { IconButton } from './IconButton';

export interface SheetPanelProps {
  title?: string;
  /** Figma "Show title". Off hides the whole title row. Default true. */
  showTitle?: boolean;
  /** Figma "Footer": one or two `<Button />`s pinned under the content (Button 1 Primary L, Button 2 Secondary L). */
  footer?: ReactNode;
  /** Figma "Padding Flush": no side padding in the content, for full-bleed bodies. */
  flush?: boolean;
  /** The close button. Default: close the sheet route this panel is rendered in (the shell's `useSheetClose`). */
  onClose?: () => void;
  /**
   * Lets the grabber and title row start a drag. `Sheet` passes its own; inside a sheet route this
   * defaults to the shell's `useSheetDragHandle()`, so both kinds of sheet drag from the same place.
   */
  onHandlePointerDown?: (event: PointerEvent<HTMLDivElement>) => void;
  /** For `aria-labelledby` on the dialog that holds this panel. */
  titleId?: string;
  children?: ReactNode;
  className?: string;
}

/** The close button for a sheet route: closes the sheet and lands on the screen behind it. */
function RouteCloseButton() {
  const close = useSheetClose();
  return <IconButton icon={X} label="Close" onClick={close} />;
}

/**
 * Figma: Ohm / Sheet, the visible panel only: white, top corners 20, no blur and no shadow (the Figma instance has no effects). A 36 x 4 grabber, a
 * 56 title row with a close button, the content (padding 0 20 20, 16 between children, scrolls when
 * tall), an optional footer and the 34 px home indicator zone.
 *
 * Use it as the whole body of a sheet route (the shell's sheet host adds the scrim and the spring; the
 * grabber and title row start the drag), or inside `<Sheet>` for a sheet you open from a screen.
 */
export function SheetPanel({
  title,
  showTitle = true,
  footer,
  flush = false,
  onClose,
  onHandlePointerDown,
  titleId,
  children,
  className,
}: SheetPanelProps) {
  const routeDrag = useSheetDragHandle();
  const startDrag = onHandlePointerDown ?? routeDrag ?? undefined;
  return (
    <div
      data-slot="sheet-panel"
      className={cn(
        'flex min-h-0 flex-1 flex-col rounded-t-[20px] bg-card',
        className,
      )}
    >
      <div
        className={cn('shrink-0 select-none', startDrag && 'cursor-grab touch-none active:cursor-grabbing')}
        onPointerDown={startDrag}
      >
        <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-line-strong" />
        {showTitle && (
          <div className="flex h-14 items-center justify-between pr-2 pl-5">
            <h2 id={titleId} data-slot="sheet-title" className="text-base font-semibold text-ink-strong">
              {title}
            </h2>
            {onClose ? <IconButton icon={X} label="Close" onClick={onClose} /> : <RouteCloseButton />}
          </div>
        )}
      </div>
      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain',
          flush ? 'p-0' : 'px-5 pb-5',
          !showTitle && 'pt-3',
        )}
      >
        {children}
      </div>
      {footer && <div className="flex shrink-0 flex-col gap-2 px-5">{footer}</div>}
      <div className="h-[var(--safe-bottom,34px)] shrink-0" aria-hidden="true" />
    </div>
  );
}
