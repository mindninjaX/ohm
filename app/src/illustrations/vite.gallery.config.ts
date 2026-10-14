import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

/**
 * Dev-only Vite config for the illustration gallery, so it can be developed in peace while the rest of
 * the app changes: it only watches the illustrations and the tokens.
 *   npx vite --config src/illustrations/vite.gallery.config.ts
 * then open http://localhost:8811/src/illustrations/gallery.html (add ?reduced=1 for reduced motion).
 */
const app = fileURLToPath(new URL('../..', import.meta.url));
const watched = [`${path.sep}src${path.sep}illustrations${path.sep}`, `${path.sep}src${path.sep}styles${path.sep}`];

export default defineConfig({
  root: app,
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.join(app, 'src') } },
  server: {
    port: 8811,
    host: true,
    watch: {
      ignored: (file: string) =>
        file.includes(`${path.sep}src${path.sep}`) && !watched.some((w) => file.includes(w)),
    },
  },
});
