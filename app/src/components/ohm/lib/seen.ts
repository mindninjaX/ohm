import { useInRouterContext, useLocation } from 'react-router';

/**
 * Entrance motion plays on the first view only. The shell remounts a screen on Back and on a tab
 * switch, so mounting alone does not mean "first time"; these module-level sets remember what has
 * already played for the life of the page.
 */

/** Paths whose cards have already staggered in (ScreenScaffold). */
export const seenPaths = new Set<string>();

/** `${path}:${value}:${size}` of every amount that has already counted up (Amount). */
export const seenCounts = new Set<string>();

/**
 * The current route path, or `null` outside a router (the stand-alone gallery, plain tests).
 * Inside the shell a screen's `<Routes location>` gives it the screen's own path, even under a sheet.
 */
export function useRoutePath(): string | null {
  const inRouter = useInRouterContext();
  // A component is inside a router or not for its whole life, so the hook order never changes.
  return inRouter ? useLocation().pathname : null;
}
