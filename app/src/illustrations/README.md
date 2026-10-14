# Illustrations

Inline-SVG React components exported from the Figma file "Bill app" (Foundations page). Colours are the brand CSS variables (`var(--primary)`, `var(--line)`, ...), the Figma viewBox is kept, parts carry `data-part` names, and motion uses the `motion` package. Everything respects `prefers-reduced-motion` (no loops, no travel, instant state changes; the animated ones fall back to the Figma frame).

Import from `@/illustrations`. Every component takes `width` (px, height follows), `className`, `style` and `title` (an accessible name; without it the art is decorative and `aria-hidden`).

## Animated

| Component | Props | Figma |
|---|---|---|
| `BillIllustration` | `status` idle / reading / done / flagged (idle = no scan line, focus box or badge), `size` hero (240 x 290) / compact (240 x 128), `focus` maths / checks (compact), `onDone`, `still`, `badgeScale`, `sparkles` | Illustration / Bill 20:19218 |
| `BillStatusMini` | `state` checking / checked / flagged, `size` m / l, `tile`, `still` | Bill status mini 11:10035 |
| `ArtUpload`, `ArtPhoto`, `ArtForward`, `ArtConnect` | `active` (hover pose), `pressed`, `interactive` (react to own hover and press), `ArtForward` `idle`, `ArtConnect` `enabled` | Art/Upload 11:9897, Art/Photo 11:9925, Art/Forward 11:10195, Art/Connect 11:10196 |
| `UploadSimulation` | `fileName`, `fileSize`, `durationMs` (1200), `onComplete` | chip + progress, flies into Illustration / Bill |
| `CameraSimulation` | `onCapture`, `lockAfterMs` | dark viewfinder, bill, brackets, shutter |
| `PaidCheck` | `onDone`, `width` (168) | Illustration / Bill Hero Done 20:18627 at 168 x 203, standard badge (S11 Paid result 28:45533) |
| `RazorpayLoader` | `durationMs` (1500), `onComplete` | Brand / Razorpay logo 18:30287 |
| `ForwardGuideHero` | none | Ohm / Forward guide 28:40198 > Hero (on white, no blue) |

Replay an animation by remounting it (change its `key`). `UploadSimulation`, `RazorpayLoader` and `CameraSimulation` are timers and springs only: nothing is uploaded, opened or captured.

## Static

`PaidBillPage` 11:10082, `EarlierBillsStack` 11:10094, `BillHistoryChip` 11:10067, `BillToChart` 11:10147, `StartingPoint` 11:11230, `SecondLook` 11:12946, `RazorpayLogo` 18:30287, `AppIconLarge` 11:9853, `AppIconSmall` 11:12734, `PeakDipGlyph` 20:17831 (`kind` highest / lowest, `size` 20 / 24), `RupeeHistoryArt` 20:17926, `WaitingForMonthsArt` 20:17941.

## Files

- `raw/*.svg`: the untouched Figma exports (`exportAsync` SVG with layer names as ids). The components are built from these.
- `paths.ts`: the long path data (zap glyph, QR code, rupee sign, plug and unplug glyphs, folder and envelope shapes) kept out of the components.
- `svg.tsx`: the `Svg` wrapper, `figmaDashOffset(length, dash, gap)` and `DashedRoundRect`. Figma fits a dash pattern to each straight line and each corner arc separately (a whole number of gaps, the two end dashes equal), where one SVG `stroke-dasharray` runs a full dash from the start; pass the offset as `strokeDashoffset` (the tear line, the starting-point connector) or draw a dashed rounded rectangle with `DashedRoundRect`.
- `motion.ts`: easings, springs, `useReduced`. `StatusBadge.tsx`: the spinner / check / alert badge shared by the bill and the mini. `Sparkles.tsx`: the paid sparkles.
- Static components (`PaidBillPage.tsx`, `StartingPoint.tsx`, ...) were converted from `raw/` by script, then left as plain components.
- `Gallery.tsx`: every illustration with Replay buttons. Dev only. Run `npx vite --config src/illustrations/vite.gallery.config.ts` and open `http://localhost:8811/src/illustrations/gallery.html` (add `?reduced=1` to preview reduced motion). Or, on the main dev server, `/ohm/src/illustrations/gallery.html`. It is not part of the production build.

## Notes

- The bill's 13 usage bars are drawn from `UNITS_BY_MONTH` in `src/data/bill.ts` (tallest = 20 px), so they match the data.
- Not exported: the Journey page minis (`Mini / 01 to 06`, `Illustration / Bill to paid`), which only live on the Figma Journey page, and the Forward guide steps (they are text, not artwork).
