import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { OhmToaster } from '@/components/ohm';
import { ChromeProvider } from '@/shell/chrome';
import { HomeIndicator } from '@/shell/HomeIndicator';
import { EASE_OUT } from '@/shell/motion';
import { PrototypeMenu } from '@/shell/PrototypeMenu';
import { SidePanel } from '@/shell/SidePanel';
import { StatusBar } from '@/shell/StatusBar';
import {
  AppViewportContext,
  FRAME_HEIGHT,
  FRAME_WIDTH,
  PortalContainerContext,
  useFramed,
  type AppViewport,
} from '@/shell/viewport';
import '@/shell/shell.css';

/** Thickness of the dark bezel around the 393 x 852 screen, and the space kept around the device. */
const BEZEL = 8;
const DEVICE_WIDTH = FRAME_WIDTH + BEZEL * 2;
const DEVICE_HEIGHT = FRAME_HEIGHT + BEZEL * 2;
const PAGE_PADDING = 24;

/** Scale that fits the device in the window, never above 1. Shell-only: screens never read the window. */
function useDeviceScale(framed: boolean): number {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!framed) return;
    const update = () => {
      const byHeight = (window.innerHeight - PAGE_PADDING * 2) / DEVICE_HEIGHT;
      const byWidth = (window.innerWidth - PAGE_PADDING * 2) / DEVICE_WIDTH;
      setScale(Math.max(0.3, Math.min(1, byHeight, byWidth)));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [framed]);
  return framed ? scale : 1;
}

/**
 * The app shell. Wraps the routes (children) and provides the phone.
 *
 *  - Phone or touch screen: the app fills the screen (100dvh), on the real status bar and safe
 *    areas.
 *  - Desktop or tablet with a mouse: the app sits in a 393 x 852 phone frame (48 px corners,
 *    thin dark bezel) with a drawn status bar and home indicator, scaled down to fit short
 *    windows. Beside it: what this is, a QR code and the flow shortcuts.
 *
 * Either way the app lives in `.ohm-frame`: overflow hidden, transform: translateZ(0), so
 * `position: fixed` things (footers, tab bars) stay inside the phone. Overlays (sheets,
 * scrims, toasts, Radix portals) mount in the portal layer inside the frame, see
 * usePortalContainer(). The screens render only once that layer exists.
 */
export function MobileFrame({ children }: { children: ReactNode }) {
  const framed = useFramed();
  const scale = useDeviceScale(framed);
  const reduce = useReducedMotion();

  const [frameEl, setFrameEl] = useState<HTMLElement | null>(null);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const [pageEl, setPageEl] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState({ width: FRAME_WIDTH, height: FRAME_HEIGHT });

  // The app area's size in CSS pixels (not affected by the frame's scale).
  useEffect(() => {
    if (!frameEl) return;
    const read = () => {
      const { clientWidth: width, clientHeight: height } = frameEl;
      // Layout can report 0 (a hidden tab, a test DOM); keep the last good size then.
      if (width > 0 && height > 0) setSize((s) => (s.width === width && s.height === height ? s : { width, height }));
    };
    read();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(read);
    ro.observe(frameEl);
    return () => ro.disconnect();
  }, [frameEl]);

  const viewport = useMemo<AppViewport>(
    () => ({ width: size.width, height: size.height, framed, scale }),
    [size.width, size.height, framed, scale],
  );

  // The device is drawn scaled on desktop, but motion applies pointer deltas in the element's own
  // (app) pixels. Dividing the page point by the scale makes drags follow the cursor exactly.
  const transformPagePoint = useCallback(
    (point: { x: number; y: number }) => ({ x: point.x / scale, y: point.y / scale }),
    [scale],
  );

  return (
    <MotionConfig reducedMotion="user" transformPagePoint={transformPagePoint}>
      <ChromeProvider>
        <AppViewportContext.Provider value={viewport}>
          <PortalContainerContext.Provider value={portalEl}>
            <div ref={setPageEl} className="ohm-page" data-framed={framed}>
              <motion.div
                className="ohm-scaler"
                style={framed ? { width: DEVICE_WIDTH * scale, height: DEVICE_HEIGHT * scale } : undefined}
                initial={framed ? (reduce ? { opacity: 0 } : { opacity: 0, y: 14 }) : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <div
                  className="ohm-device"
                  style={framed ? { width: DEVICE_WIDTH, height: DEVICE_HEIGHT, transform: `scale(${scale})` } : undefined}
                >
                  <div ref={setFrameEl} className="ohm-frame" data-framed={framed}>
                    {portalEl && <div className="ohm-stage">{children}</div>}
                    {framed && <StatusBar />}
                    <div ref={setPortalEl} className="ohm-portal">
                      {!framed && <PrototypeMenu variant="dot" container={portalEl} />}
                    </div>
                    {framed && <HomeIndicator />}
                  </div>
                </div>
              </motion.div>
              {/* Portals itself into the frame (the portal layer); waits for it so it never lands in body. */}
              {portalEl && <OhmToaster />}
              {framed && <SidePanel />}
              {framed && <PrototypeMenu variant="pill" container={pageEl} />}
            </div>
          </PortalContainerContext.Provider>
        </AppViewportContext.Provider>
      </ChromeProvider>
    </MotionConfig>
  );
}
