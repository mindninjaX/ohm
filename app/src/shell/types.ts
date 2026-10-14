import type { ComponentType } from 'react';

/**
 * How a screen is wired to a route. A file anywhere under src/screens/ exports
 *
 *   export const screens: ScreenMap = { '/bill': BillScreen, '/bill/checks': ChecksScreen };
 *
 * and the shell picks it up (see src/shell/screens.ts). Any route without a screen shows a
 * placeholder, so screens can land one at a time. For a sheet route (see routes.ts) the
 * component renders only the sheet panel; the shell supplies the scrim, the slide-up, drag
 * to close and Escape.
 */
export type ScreenMap = Readonly<Record<string, ComponentType>>;
