import '@/styles/fonts.css';
import { MotionConfig } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router';
import '@/styles/globals.css';
import { Gallery } from './Gallery';

/**
 * Dev-only entry for the component gallery, without the shell: open
 * /src/components/ohm/gallery.html on the dev server. In the app the shell mounts <Gallery /> at /gallery.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <MemoryRouter>
        <Gallery />
      </MemoryRouter>
    </MotionConfig>
  </StrictMode>,
);
