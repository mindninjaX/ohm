import type { Transition } from 'motion/react';

/**
 * Motion presets for the shell. Other builders can import these so everything moves the
 * same way: springs for sheets and pops, 200 to 300 ms ease-out for transitions, 40 to 60 ms
 * stagger between siblings.
 *
 * Reduced motion is handled globally: App wraps everything in <MotionConfig
 * reducedMotion="user">, which turns transform animations (x, y, scale) into instant
 * changes and keeps opacity fades.
 */

/** Cubic-bezier ease-out (fast start, soft landing). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Push and pop of a screen: 250 ms. */
export const SCREEN_TRANSITION: Transition = { duration: 0.25, ease: EASE_OUT };

/** Tab cross-fade. */
export const TAB_TRANSITION: Transition = { duration: 0.22, ease: 'easeOut' };

/**
 * A pop for small things (toasts, menus, check badges). Sheets use one spring everywhere:
 * `SPRING.sheet` from '@/components/ohm' (route sheets and in-screen sheets move the same).
 */
export const POP_SPRING: Transition = { type: 'spring', stiffness: 520, damping: 28 };

/** The scrim fades alongside the sheet. */
export const SCRIM_TRANSITION: Transition = { duration: 0.22, ease: 'easeOut' };

/** Gap between siblings that enter one after another, in seconds. */
export const STAGGER = 0.05;

/** Distance a pushed screen travels, in pixels. */
export const PUSH_DISTANCE = 24;
