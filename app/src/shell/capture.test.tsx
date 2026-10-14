import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { ROUTES } from '@/routes';
import { FRAMES, captureQuery, findFrame, livePath, normalizeFrameId } from '../../tests/visual/screens';
import { DEFAULT_DEMO_STATE } from './demo';

// Capture mode is decided when the page loads, from the URL: set it before the app is imported.
window.history.replaceState({}, '', '/?capture=1&demo=date:after,paid:1');
const { parseDemoParam, captureDemoState, isCapture, markCaptureReady } = await import('./capture');
const { App } = await import('@/App');

describe('capture mode', () => {
  it('is on when the URL says capture=1, and marks <html>', () => {
    expect(isCapture()).toBe(true);
    expect(document.documentElement.dataset.capture).toBe('true');
  });

  it('reads the demo state from ?demo= and starts from the defaults, not localStorage', () => {
    const demo = captureDemoState();
    expect(demo.dateMode).toBe('after');
    expect(demo.flags.paid).toBe(true);
    expect(demo.flags.billAdded).toBe(DEFAULT_DEMO_STATE.flags.billAdded);
    expect(demo.firstBill).toBe(false);
  });

  it('runs its ready sequence (and so the ?do= actions) once, even when React StrictMode asks twice', async () => {
    const layer = document.createElement('div');
    layer.dataset.slot = 'screen-layer';
    document.body.appendChild(layer);
    const first = markCaptureReady();
    const second = markCaptureReady();
    expect(second).toBe(first);
    await first;
    expect(document.documentElement.dataset.captureReady).toBe('true');
    layer.remove();
  });

  it('parses demo flags, with aliases, ignoring what it does not know', () => {
    expect(parseDemoParam(null)).toEqual(DEFAULT_DEMO_STATE);
    expect(parseDemoParam('')).toEqual(DEFAULT_DEMO_STATE);
    const s = parseDemoParam('date:before,first:1,billAdded:0,connection:0,paid:true,nonsense:1,date');
    expect(s.firstBill).toBe(true);
    expect(s.flags).toEqual({ paid: true, billAdded: false, connectionConfirmed: false });
    expect(parseDemoParam('date:after').dateMode).toBe('after');
    // Never mutates the shared defaults.
    expect(DEFAULT_DEMO_STATE.flags.paid).toBe(false);
  });

  it('renders the route as the Figma frame: drawn status bar and home indicator, no prototype chrome', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/bills']}>
        <App />
      </MemoryRouter>,
    );
    const frame = container.querySelector('[data-slot="capture-frame"]');
    expect(frame).not.toBeNull();
    expect(frame?.getAttribute('data-sheet')).toBe('false');
    expect(container.querySelector('[data-slot="status-bar"]')?.textContent).toContain('9:41');
    expect(container.querySelector('[data-slot="home-indicator"]')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 1, name: 'S01.1 All bills' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /prototype/i })).toBeNull();
  });

  it('marks a sheet route so the frame is the phone height', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/add']}>
        <App />
      </MemoryRouter>,
    );
    expect(container.querySelector('[data-slot="capture-frame"]')?.getAttribute('data-sheet')).toBe('true');
  });
});

describe('frames (tests/visual/screens.ts)', () => {
  it('has one entry per built Figma frame in SCREENS.md, with unique ids and node ids', () => {
    expect(FRAMES).toHaveLength(35);
    expect(new Set(FRAMES.map((f) => f.id)).size).toBe(FRAMES.length);
    expect(new Set(FRAMES.map((f) => f.nodeId)).size).toBe(FRAMES.length);
  });

  it('points every frame at a route that exists', () => {
    const paths = new Set(ROUTES.map((r) => r.path));
    for (const f of FRAMES) expect(paths.has(f.path), `${f.id} ${f.path}`).toBe(true);
  });

  it('has a Figma export for every frame', () => {
    for (const f of FRAMES) {
      expect(existsSync(resolve(__dirname, `../../tests/figma/${f.id}.png`)), `tests/figma/${f.id}.png`).toBe(true);
    }
  });

  it('finds frames by any spelling of the id', () => {
    expect(normalizeFrameId(' S01.1 ')).toBe('s01-1');
    expect(findFrame('S01.1')?.id).toBe('S01-1');
    expect(findFrame('s08C')?.id).toBe('S08c');
    expect(findFrame('S99')).toBeUndefined();
  });

  it('builds the capture query: route params, capture=1, demo, actions', () => {
    expect(captureQuery(findFrame('S01')!)).toBe('capture=1');
    expect(captureQuery(findFrame('S12-3')!)).toBe('month=may&capture=1');
    expect(captureQuery(findFrame('S06-1')!)).toBe('capture=1&demo=date%3Aafter');
    expect(captureQuery(findFrame('S09-1')!)).toBe('capture=1&do=click%3ACopy+link');
    expect(livePath(findFrame('S04-1')!)).toBe('/reading?open=all');
    expect(livePath(findFrame('S01')!)).toBe('/');
  });
});
