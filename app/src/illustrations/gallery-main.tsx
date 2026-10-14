import '@/styles/fonts.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/globals.css';

/**
 * Dev-only entry for the illustration gallery: open /ohm/src/illustrations/gallery.html on the dev server.
 * Add ?reduced=1 to preview prefers-reduced-motion without changing the OS setting.
 */
async function main() {
  if (new URLSearchParams(window.location.search).get('reduced') === '1') {
    const original = window.matchMedia.bind(window);
    window.matchMedia = (query: string) => {
      if (!query.includes('prefers-reduced-motion')) return original(query);
      return {
        matches: true,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      } satisfies MediaQueryList;
    };
  }
  const { Gallery } = await import('./Gallery');
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Gallery />
    </StrictMode>,
  );
}

void main();
