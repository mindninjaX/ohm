import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState, type ReactNode } from 'react';

/**
 * The drawn status bar and home indicator (desktop frame only) are dark on light screens, and
 * the browser's address bar colour (<meta name="theme-color">) is white. A screen with another
 * look asks for its own:
 *
 *   // S02 Notification, the dark lock screen (its status bar has no time: the lock screen shows a big clock)
 *   useChromeTone({ statusBar: 'light', homeIndicator: 'light', themeColor: '#091e42', showTime: false });
 *   // S11 Paid, on the grey page colour
 *   useChromeTone({ themeColor: '#f1f2f4' });
 *
 * The request is withdrawn when the screen unmounts (a screen that is still leaving never
 * undoes the request of the one arriving). On a phone the real status bar is not ours to change,
 * so statusBar and homeIndicator only affect the frame; themeColor is what a phone's browser
 * chrome shows. `showTime: false` leaves the time out of the drawn status bar (default true).
 */
export type ChromeTone = 'dark' | 'light';

export interface ChromeTones {
  statusBar: ChromeTone;
  homeIndicator: ChromeTone;
  /** Browser chrome colour (hex). White unless a screen asks otherwise. */
  themeColor?: string;
  /** Draw the time (9:41) in the status bar. Default true; the lock screen has none. */
  showTime: boolean;
}

export const DEFAULT_THEME_COLOR = '#ffffff';

const DEFAULT_TONES: ChromeTones = { statusBar: 'dark', homeIndicator: 'dark', showTime: true };

interface Claim {
  owner: string;
  tones: ChromeTones;
}

interface ChromeApi {
  tones: ChromeTones;
  /** Ask for tones as `owner`; replaces that owner's earlier request. */
  claim: (owner: string, want: Partial<ChromeTones>) => void;
  /** Withdraw `owner`'s request. Does nothing if another screen has claimed since. */
  release: (owner: string) => void;
}

const ChromeContext = createContext<ChromeApi | null>(null);

export function ChromeProvider({ children }: { children: ReactNode }) {
  const [claim, setClaim] = useState<Claim | null>(null);
  const tones = claim?.tones ?? DEFAULT_TONES;

  const claimTones = useCallback((owner: string, want: Partial<ChromeTones>) => {
    const next: ChromeTones = { ...DEFAULT_TONES, ...stripUndefined(want) };
    setClaim((prev) =>
      prev &&
      prev.owner === owner &&
      prev.tones.statusBar === next.statusBar &&
      prev.tones.homeIndicator === next.homeIndicator &&
      prev.tones.showTime === next.showTime &&
      prev.tones.themeColor === next.themeColor
        ? prev
        : { owner, tones: next },
    );
  }, []);
  const release = useCallback((owner: string) => {
    setClaim((prev) => (prev && prev.owner === owner ? null : prev));
  }, []);

  // The browser chrome colour on a phone (and the tab colour in a desktop browser).
  const themeColor = tones.themeColor ?? DEFAULT_THEME_COLOR;
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
  }, [themeColor]);

  const api = useMemo<ChromeApi>(() => ({ tones, claim: claimTones, release }), [tones, claimTones, release]);
  return <ChromeContext.Provider value={api}>{children}</ChromeContext.Provider>;
}

function stripUndefined(want: Partial<ChromeTones>): Partial<ChromeTones> {
  const out: Partial<ChromeTones> = {};
  if (want.statusBar !== undefined) out.statusBar = want.statusBar;
  if (want.homeIndicator !== undefined) out.homeIndicator = want.homeIndicator;
  if (want.themeColor !== undefined) out.themeColor = want.themeColor;
  if (want.showTime !== undefined) out.showTime = want.showTime;
  return out;
}

export function useChromeTones(): ChromeTones {
  return useContext(ChromeContext)?.tones ?? DEFAULT_TONES;
}

/** Ask for a status bar, home indicator and browser chrome tone while the calling screen is mounted. */
export function useChromeTone(want: Partial<ChromeTones>): void {
  const ctx = useContext(ChromeContext);
  const claim = ctx?.claim;
  const release = ctx?.release;
  const owner = useId();
  const { statusBar, homeIndicator, themeColor, showTime } = want;
  useEffect(() => {
    if (!claim) return;
    claim(owner, { statusBar, homeIndicator, themeColor, showTime });
  }, [claim, owner, statusBar, homeIndicator, themeColor, showTime]);
  useEffect(() => {
    if (!release) return;
    return () => release(owner);
  }, [release, owner]);
}
