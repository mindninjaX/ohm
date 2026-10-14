import { copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

const path = (p: string) => fileURLToPath(new URL(p, import.meta.url));

/** The site lives at https://<user>.github.io/ohm/, so the app is served from /ohm/. */
const BASE = '/ohm/';

/**
 * Hosting helpers.
 *  - build: copy dist/index.html to dist/404.html. GitHub Pages serves 404.html for unknown
 *    paths, so a deep link such as /ohm/bill/checks loads the app and the router takes over.
 *  - dev: send a page request that is outside the base (http://localhost:8810/bill) to the
 *    same path under it (/ohm/bill), so older links and habits keep working.
 */
function hosting(): Plugin {
  let outDir = '';
  return {
    name: 'ohm-hosting',
    configResolved(config) {
      outDir = path(`./${config.build.outDir}`);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? '/';
        const wantsHtml = (req.headers.accept ?? '').includes('text/html');
        const bare = BASE.slice(0, -1);
        if (req.method === 'GET' && wantsHtml && (url === bare || url.startsWith(`${bare}?`))) {
          res.statusCode = 302;
          res.setHeader('Location', BASE + url.slice(bare.length));
          res.end();
          return;
        }
        const outside = !url.startsWith(BASE);
        const isAsset = /^\/(@|node_modules\/|src\/|__)/.test(url) || /\.[a-z0-9]+(\?|$)/i.test(url);
        if (req.method === 'GET' && wantsHtml && outside && !isAsset) {
          res.statusCode = 302;
          res.setHeader('Location', BASE.slice(0, -1) + (url === '/' ? '/' : url));
          res.end();
          return;
        }
        next();
      });
    },
    closeBundle() {
      const index = `${outDir}/index.html`;
      if (existsSync(index)) copyFileSync(index, `${outDir}/404.html`);
    },
  };
}

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), hosting()],
  resolve: { alias: { '@': path('./src') } },
  server: { port: 8810, strictPort: true, host: true },
  preview: { port: 8810, strictPort: true },
  build: { outDir: 'dist' },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
    restoreMocks: true,
  },
});
