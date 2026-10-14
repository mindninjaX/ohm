import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

// jsdom on CI (Node 22) has no IntersectionObserver or ResizeObserver; Motion's useInView needs them.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
const g = globalThis as unknown as Record<string, unknown>;
if (typeof g.IntersectionObserver === 'undefined') g.IntersectionObserver = NoopObserver;
if (typeof g.ResizeObserver === 'undefined') g.ResizeObserver = NoopObserver;
