import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router';
import { MobileFrame } from '@/components/MobileFrame';
import { CAPTURE, captureDemoState } from '@/shell/capture';
import { CaptureFrame } from '@/shell/CaptureFrame';
import { DemoProvider } from '@/shell/demo';
import { AnimatedRoutes } from '@/shell/transitions';

/**
 * The dev-only /compare/:frameId page (Figma export next to the live route). Not in the
 * production build: the import is behind import.meta.env.DEV, which is replaced by false.
 */
const ComparePage = import.meta.env.DEV ? lazy(() => import('@/shell/ComparePage')) : null;
const COMPARE_PATH = '/compare';
/** The demo state a capture page starts from (read once: ?demo= and never localStorage). */
const CAPTURE_DEMO = CAPTURE ? captureDemoState() : undefined;

/**
 * Router-agnostic app: main.tsx wraps it in BrowserRouter, tests in MemoryRouter.
 * Routes, screen transitions and sheets live in src/shell; screens register themselves
 * (see src/shell/types.ts).
 */
export function AppRoutes() {
  return <AnimatedRoutes />;
}

export function App() {
  const { pathname } = useLocation();
  if (ComparePage && (pathname === COMPARE_PATH || pathname.startsWith(`${COMPARE_PATH}/`))) {
    return (
      <Suspense fallback={null}>
        <ComparePage />
      </Suspense>
    );
  }
  // Capture mode (?capture=1): the page is the Figma frame, nothing else. See src/shell/capture.ts.
  if (CAPTURE) {
    return (
      <DemoProvider initial={CAPTURE_DEMO}>
        <CaptureFrame>
          <AppRoutes />
        </CaptureFrame>
      </DemoProvider>
    );
  }
  return (
    <DemoProvider>
      <MobileFrame>
        <AppRoutes />
      </MobileFrame>
    </DemoProvider>
  );
}
