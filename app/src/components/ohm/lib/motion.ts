import { useReducedMotion, type Transition } from 'motion/react';

/** ease-out-quint: fast start, long soft landing. For 200 to 300 ms transitions. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Springs for things that move like objects: sheets, pops, indicators. */
export const SPRING = {
  /** A bottom sheet sliding up: firm, settles without a wobble. */
  sheet: { type: 'spring', stiffness: 420, damping: 40, mass: 0.9 },
  /** A small pop: check badges, toast icons. A touch of overshoot. */
  pop: { type: 'spring', stiffness: 520, damping: 22, mass: 0.7 },
  /** The tab bar indicator sliding between tabs. */
  indicator: { type: 'spring', stiffness: 500, damping: 38 },
} as const satisfies Record<string, Transition>;

export const DURATION = {
  /** Icons, badges. */
  fast: 0.15,
  /** Cards, fades. */
  base: 0.22,
  /** Larger reveals. */
  slow: 0.3,
} as const;

/** Gap between siblings that arrive one after another (40 to 60 ms). */
export const STAGGER = 0.05;

/** True when the person asked the system for reduced motion. Fades are fine; movement is not. */
export function useReduced(): boolean {
  return useReducedMotion() === true;
}
