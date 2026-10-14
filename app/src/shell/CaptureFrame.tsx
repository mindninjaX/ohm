import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { MotionConfig } from 'motion/react';
import { OhmToaster } from '@/components/ohm';
import { markCaptureReady } from './capture';
import { ChromeProvider } from './chrome';
import { HomeIndicator } from './HomeIndicator';
import { StatusBar } from './StatusBar';
import { isSheetPath } from '@/routes';
import {
  AppViewportContext,
  FRAME_HEIGHT,
  FRAME_WIDTH,
  PortalContainerContext,
  type AppViewport,
} from './viewport';
import './capture.css';

/**
 * The shell in capture mode (?capture=1, see capture.ts): the page is the Figma frame, nothing
 * else. 393 wide, the drawn status bar and home indicator, no bezel, no side panel, no Prototype
 * button, and the page is as tall as the content (a sheet route is the phone height, 852, with
 * the screen behind it clipped). Provides the same contexts as MobileFrame, so screens, sheets
 * and toasts work unchanged.
 */
export function CaptureFrame({ children }: { children: ReactNode }) {
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const { pathname } = useLocation();
  const sheet = isSheetPath(pathname);

  const viewport = useMemo<AppViewport>(
    () => ({ width: FRAME_WIDTH, height: FRAME_HEIGHT, framed: true, scale: 1 }),
    [],
  );

  useEffect(() => {
    void markCaptureReady();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ChromeProvider>
        <AppViewportContext.Provider value={viewport}>
          <PortalContainerContext.Provider value={portalEl}>
            <div data-slot="capture-frame" className="ohm-capture" data-sheet={sheet}>
              {portalEl && <div className="ohm-stage">{children}</div>}
              <StatusBar />
              <div ref={setPortalEl} className="ohm-portal" />
              {portalEl && <OhmToaster />}
              <HomeIndicator />
            </div>
          </PortalContainerContext.Provider>
        </AppViewportContext.Provider>
      </ChromeProvider>
    </MotionConfig>
  );
}
