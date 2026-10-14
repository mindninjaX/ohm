/**
 * `npm run test:visual`: every frame as a Playwright test, failing above 1.5 % mismatch, when the
 * size differs from the Figma export, or when a flat Figma fill is another colour in the app.
 * For one frame: `npm run test:visual -- -g S06`.
 * The measuring tool with the readable table is `npm run diff`; this is the gate.
 */
import { expect, test } from '@playwright/test';
import { DEFAULT_BASE, FLAT_CELL, FLAT_CELL_LIMIT, STRICT_LIMIT_PCT, formatFlatRegions, measureFrame } from './lib.ts';
import { FRAMES } from './screens.ts';

for (const frame of FRAMES) {
  test(`${frame.id} ${frame.name}`, async ({ page }) => {
    const result = await measureFrame(page, DEFAULT_BASE, frame);
    expect(result.error, result.error).toBeUndefined();
    const c = result.comparison!;
    expect(
      c.sizeMatch,
      `size: figma ${c.figma.width / 2}x${c.figma.height / 2}, app ${c.app.width / 2}x${c.app.height / 2} (app height ${c.heightDelta > 0 ? '+' : ''}${c.heightDelta}px)`,
    ).toBe(true);
    expect(c.mismatchPct, `see tests/visual/out/${frame.id}-side.png`).toBeLessThanOrEqual(STRICT_LIMIT_PCT);
    expect(
      c.flat.failCells,
      `a flat Figma fill is another colour in the app (more than ${FLAT_CELL_LIMIT} px in a ${FLAT_CELL} px cell, orange in tests/visual/out/${frame.id}-diff.png)${formatFlatRegions([result], 3)}`,
    ).toBe(0);
  });
}
