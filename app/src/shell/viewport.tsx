import { createContext, useContext, useSyncExternalStore } from 'react';

/**
 * What the app is drawn in. Layout code reads this, never `window.innerWidth`.
 *  - width, height: the size of the app area in CSS pixels (393 x 852 inside the desktop
 *    phone frame, the real screen size on a phone), before any scaling of the frame;
 *  - framed: true inside the desktop phone frame;
 *  - scale: the scale of the whole frame on desktop.
 * For the status bar and home indicator insets use the CSS variables --safe-top and
 * --safe-bottom (classes .pt-safe and .pb-safe): 62 and 34 in the frame, the real safe areas
 * on a phone.
 */
export interface AppViewport {
  width: number;
  height: number;
  framed: boolean;
  /** Scale applied to the whole frame on desktop (1 on phones). */
  scale: number;
}

export const FRAME_WIDTH = 393;
export const FRAME_HEIGHT = 852;
export const STATUS_BAR_HEIGHT = 62;
export const HOME_INDICATOR_ZONE = 34;

export const DEFAULT_VIEWPORT: AppViewport = {
  width: FRAME_WIDTH,
  height: FRAME_HEIGHT,
  framed: false,
  scale: 1,
};

export const AppViewportContext = createContext<AppViewport>(DEFAULT_VIEWPORT);

/** The size of the app area (frame on desktop, screen on a phone). */
export function useAppViewport(): AppViewport {
  return useContext(AppViewportContext);
}

/**
 * The element every overlay mounts into: sheets, scrims, toasts, Radix portals. It is inside
 * the phone frame (or the screen), never document.body. Null until the shell has mounted;
 * the shell renders the screens only once it is set, so screens can rely on it.
 *
 * Radix:  <Dialog.Portal container={usePortalContainer()}>
 */
export const PortalContainerContext = createContext<HTMLElement | null>(null);

export function usePortalContainer(): HTMLElement | null {
  return useContext(PortalContainerContext);
}

/** Desktop and tablet with a mouse get the phone frame; phones and touch screens get full screen. */
export const FRAMED_QUERY = '(min-width: 601px) and (pointer: fine)';

function subscribeFramed(onChange: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  const mq = window.matchMedia(FRAMED_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getFramed(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(FRAMED_QUERY).matches;
}

export function useFramed(): boolean {
  return useSyncExternalStore(subscribeFramed, getFramed, () => false);
}
