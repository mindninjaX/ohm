# Pixel-perfect pipeline

Figma is the spec. Each built frame has a 2x export in `tests/figma/<id>.png` (`S01.1` is `S01-1`). The app renders the same frame in capture mode, and the two are compared with pixelmatch (threshold 0.1, anti-aliasing ignored).

```
npm run dev                         # app on http://localhost:8810/ohm/ (leave it running)
npm run diff                        # every frame: table + tests/visual/out/index.html (worst first)
npm run diff S06 S01-1              # some frames (S06 and S01.1 both work)
npm run diff -- --area=SUMMARY      # one area: HOME, ADD, CONNECTION, SUMMARY, PAY
npm run diff -- --strict            # exit 1 when a frame is over 1.5 % or a different size (flags go after "--")
npm run diff -- --list              # the frame ids, routes and areas
npm run test:visual -- -g S06       # the same as a Playwright test (fails over 1.5 % or on a size difference)
```

`npm run diff` is a measuring tool: it exits 0 when frames fail. Exit 2 means it could not run (dev server down).

## Reading the table

| column | meaning |
|---|---|
| size match | `yes 393x1569`, or `NO figma 393x1569, app 393x1480 (-89px)`. A height difference means the spacing is off somewhere (the worst band usually shows where); fix it before looking at pixels. |
| mismatch % | pixels that differ, of the whole frame. Under 1.5 % is the bar. |
| worst band | the 50 px band (CSS pixels from the top) with the most differing pixels. |

Output per frame in `tests/visual/out/` (git-ignored): `<id>-app.png` (the app), `<id>-diff.png` (red = different) and `<id>-side.png` (Figma, app, diff side by side, 2x). For a look by eye open `http://localhost:8810/ohm/compare/S06`: side by side, an overlay with an opacity slider, and a difference blend (black where they agree). Arrow keys move between frames.

## Capture mode (`?capture=1`)

What the diff, the compare page and `tests/visual/screens.ts` use. 393 px wide, the drawn status bar (9:41) and home indicator, no bezel or Prototype button, the page as tall as its content (at least 852; a sheet route is 852 with the screen behind it clipped), every animation at its end state, fonts loaded. Details: header of `src/shell/capture.ts`.

- `?demo=date:after,paid:1` sets demo state (`date` before or after; `paid`, `billAdded`, `connection`, `first` as 1 or 0). localStorage is not read.
- `?do=click:Copy link` taps a button or link by its text after load (repeat the param; `wait:300` waits). S09.1 uses it.
- Route params are the route's own (`?open=all`, `?info=fuel`, `?metric=rupees`, `?year=2025`, `?month=may`, `?state=few|error`, `?changed=set|sent`).
- Screens do not need to know about capture mode, with one exception: a long simulated sequence (the Reading scan, the Razorpay loader) must show its Figma frame when `useCapture()` (from `@/shell`) is true instead of playing out. `/reading` is "reading in progress" (S04), `/reading?open=all` is "reading done, every step open" (S04.1), and `/bill` rests on the "Summary discounted" card (S06).
- Do not tune the app to the diff by special-casing capture mode. If the layout is right in the browser, the capture is right.

## What to expect

- Text is within a few pixels per line (Inter 3.19 with default features, `src/styles/fonts.css`). A line that is far off is the wrong size, weight, colour, position or wording, not font noise.
- Frames that are mostly empty can pass with the wrong content; look at the side-by-side image as well as the number.
- Figma frames change (the file is being tidied and polished). Re-export before a final check: `scripts/export-figma.md`.
