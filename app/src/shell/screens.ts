import type { ComponentType } from 'react';
import type { ScreenMap } from './types';

/**
 * Finds every `screens` export under src/screens/ and merges them into one registry, keyed by
 * route path. Screen builders never edit the shell: add a file, export `screens`.
 */
const modules = import.meta.glob<{ screens?: ScreenMap }>(
  ['../screens/**/*.{ts,tsx}', '!../screens/**/*.test.*'],
  { eager: true },
);

const registry = new Map<string, ComponentType>();
for (const [file, mod] of Object.entries(modules)) {
  if (!mod.screens) continue;
  for (const [path, component] of Object.entries(mod.screens)) {
    if (registry.has(path) && import.meta.env.DEV) {
      console.warn(`[ohm] route ${path} is registered twice; ${file} wins`);
    }
    registry.set(path, component);
  }
}

/** The registered screen for a route path, if one exists. */
export function screenFor(path: string): ComponentType | undefined {
  return registry.get(path);
}
