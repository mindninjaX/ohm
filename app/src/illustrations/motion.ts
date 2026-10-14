import { useReducedMotion, type Transition } from 'motion/react';

/** Ease-out for entrances and settles (about 200 to 300 ms). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** Ease in-out for loops (scan line, idle nudges). */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Springs: pops are bouncy, settles are soft. */
export const SPRING_POP: Transition = { type: 'spring', stiffness: 420, damping: 15, mass: 0.7 };
export const SPRING_SOFT: Transition = { type: 'spring', stiffness: 260, damping: 26 };
export const SPRING_PRESS: Transition = { type: 'spring', stiffness: 520, damping: 30 };

/** No animation at all: used for prefers-reduced-motion and the `still` prop. */
export const INSTANT: Transition = { duration: 0 };

/** True when the visitor asked for reduced motion. Every loop and travel checks this. */
export function useReduced(): boolean {
  return useReducedMotion() ?? false;
}

/** Returns `INSTANT` when motion is reduced, otherwise the transition. */
export function pick(reduced: boolean, transition: Transition): Transition {
  return reduced ? INSTANT : transition;
}
