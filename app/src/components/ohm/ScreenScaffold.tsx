import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Stagger } from './Reveal';
import { seenPaths, useRoutePath } from './lib/seen';

export interface ScreenScaffoldProps {
  /** An `<Header />`. Sticks to the top. */
  header?: ReactNode;
  /** A `<Footer />` or a `<TabBar />`. Pinned to the bottom. */
  footer?: ReactNode;
  children: ReactNode;
  /** Cards and sections arrive one after another (fade and lift, 50 ms apart). Default true. */
  stagger?: boolean;
  className?: string;
  /** Classes for the scrolling content (for example `gap-4` or `pt-6`). */
  contentClassName?: string;
}

/** True the first time this path is shown. Outside a router it is always true. */
function useFirstVisit(): boolean {
  const path = useRoutePath();
  const [first] = useState(() => path === null || !seenPaths.has(path));
  useEffect(() => {
    if (path !== null) seenPaths.add(path);
  }, [path]);
  return first;
}

/**
 * The layout every screen uses. The page is `surface-muted`; the header is sticky at the top; the
 * content has 16 px sides and 24 px between its children; the footer or tab bar is pinned to the
 * bottom (it sits after the content, so the content always clears it). The cards stagger in the first
 * time a path is shown only: Back and tab switches remount the screen and it appears already in place.
 *
 * It fills its parent: the parent must be a flex column (the app shell is) or have a height. It never
 * shrinks below its content (`flex: 1 0 auto`), so a screen taller than the phone keeps its sticky header
 * and footer for the whole scroll. It does not scroll by itself; whatever scrolls (the page on a phone,
 * the frame on desktop) carries the sticky header and footer with it. Without a header the content clears the status bar by itself.
 */
export function ScreenScaffold({
  header,
  footer,
  children,
  stagger = true,
  className,
  contentClassName,
}: ScreenScaffoldProps) {
  const first = useFirstVisit();
  return (
    <div data-slot="screen" className={cn('flex min-h-full flex-[1_0_auto] flex-col bg-surface-muted', className)}>
      {header}
      <main
        className={cn(
          'flex flex-1 flex-col gap-6 px-4 pb-4',
          header ? 'pt-4' : 'pt-[calc(var(--safe-top,0px)+16px)]',
          contentClassName,
        )}
      >
        {stagger ? <Stagger skip={!first}>{children}</Stagger> : children}
      </main>
      {footer}
    </div>
  );
}
