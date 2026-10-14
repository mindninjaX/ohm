import { defineConfig } from '@playwright/test';

/**
 * Visual tests: tests/visual/frames.spec.ts renders every Figma frame in capture mode and compares
 * it with tests/figma/<id>.png. The dev server on 8810 is reused when it is already running.
 */
export default defineConfig({
  testDir: 'tests/visual',
  testMatch: '*.spec.ts',
  fullyParallel: true,
  workers: 4,
  timeout: 90_000,
  reporter: [['list']],
  // Not under tests/visual/out: Playwright empties its output folder at the start of a run.
  outputDir: 'test-results',
  use: {
    baseURL: 'http://localhost:8810/ohm/',
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 2,
    locale: 'en-IN',
    timezoneId: 'Asia/Kolkata',
    colorScheme: 'light',
    permissions: ['clipboard-read', 'clipboard-write'],
    serviceWorkers: 'block',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8810/ohm/',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
