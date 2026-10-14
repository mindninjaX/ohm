/**
 * What screens and components import from the shell:
 *
 *   import { useAppViewport, usePortalContainer, useSheetClose, useDemo } from '@/shell';
 *
 * (The routing and the frame themselves are used by App.tsx only, so this barrel stays free of
 * the screen registry and cannot create an import cycle.)
 */
export { useAppViewport, usePortalContainer, FRAME_WIDTH, FRAME_HEIGHT, type AppViewport } from './viewport';
export { useSheetClose, useIsInSheet, useSheetDragHandle } from './sheets';
/**
 * useChromeTone({ statusBar?, homeIndicator?, themeColor?, showTime? }): a screen's look for the chrome around it.
 *   S02 Notification (dark lock screen): useChromeTone({ statusBar: 'light', homeIndicator: 'light', themeColor: '#091e42', showTime: false })
 *   S11 Paid (grey page):                useChromeTone({ themeColor: '#f1f2f4' })
 * themeColor sets <meta name="theme-color"> (white by default), which is what a phone's browser bar shows.
 */
export { useChromeTone, type ChromeTone, type ChromeTones } from './chrome';
export {
  useDemo,
  DemoProvider,
  DEMO_DATES,
  DATE_MODE_LABELS,
  type DemoApi,
  type DemoFlag,
  type DateMode,
} from './demo';
export {
  EASE_OUT,
  SCREEN_TRANSITION,
  TAB_TRANSITION,
  POP_SPRING,
  STAGGER,
  PUSH_DISTANCE,
} from './motion';
export type { ScreenMap } from './types';
/**
 * Capture mode (?capture=1): the page is the Figma frame, for the visual diff (npm run diff) and the
 * dev-only /compare/:frameId page. Screens only need `useCapture()` for a long simulated sequence
 * (reading, the Razorpay loader), which should show its Figma frame instead of playing out.
 * See src/shell/capture.ts for everything capture mode does.
 */
export { useCapture, isCapture } from './capture';
