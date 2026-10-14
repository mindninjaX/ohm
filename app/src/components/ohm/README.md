# Ohm components

One React component per Figma component, same name, the Figma variants as props. Built on the brand tokens in `src/styles/globals.css` (`bg-primary-subtle`, `text-ink-muted`, `border-line`) and lucide icons. Import from the barrel: `import { Button, Header } from '@/components/ohm'`.

See them all, in every variant, in `Gallery.tsx` (the shell mounts it at `/gallery`; to open it without the shell, use `/src/components/ohm/gallery.html` on the dev server).

Radii: `rounded-xl` is 12 and `rounded-2xl` is 16 (Figma's Tailwind scale; `globals.css` sets them), so Card, Alert, Toast and the list-row card are 16 and Tile is 12 without an override. The global stroke rule (`stroke-width: 2`) applies to Lucide icons only (`svg.lucide`); an illustration or hand-drawn svg keeps the stroke widths it sets itself.

Rules: numbers come from `src/data/bill.ts` and are formatted with `src/lib/format.ts` (never type a figure into a component); one button system; one meaning per colour; every animation respects `prefers-reduced-motion` (fades stay, movement goes).

## Layout contract (read this before building a screen)

- A screen is `<ScreenScaffold header={<Header .../>} footer={<Footer>...</Footer> | <TabBar .../>}>content</ScreenScaffold>`. Page `surface-muted`, content 16 px sides, 24 px between children, header sticky at the top, footer or tab bar pinned at the bottom (they are sticky and sit after the content, so content always clears them).
- The scaffold fills its parent: the parent must be a flex column (the shell's screen layer is) or have a height. It does not scroll by itself; the shell's layer does.
- Status bar and home indicator: Header pads its top with `var(--safe-top, 0px)`, Footer, TabBar and Sheet pad their bottom with `var(--safe-bottom, 34px)`. The shell sets both (62 and 34 in the frame, the real insets on a phone).
- Overlays (Sheet, Toast) mount into the shell's `PortalContainerContext` (defined in `src/shell/viewport.tsx`, imported once in `lib/portal.ts`), never `document.body` inside the app.

## Components

`variant` is Figma's "Style" (a prop named `style` would clash with React's). Icons are passed as components: `leftIcon={Plus}`.

| Component | Figma name | Props |
|---|---|---|
| `Button` | Ohm / Button | `variant` primary \| secondary \| destructive \| link, `size` l \| m, `leftIcon`, `rightIcon`, `loading`, `disabled`, plus button props. L is 48 tall and fills the width, M is 40 and hugs. Press scales to 0.98. |
| `IconButton` | Ohm / Icon button | `icon`, `label` (required), `variant` ghost \| soft, button props. 44 x 44 hit area. |
| `Header` | Ohm / Header | `type` back \| top-level, `title`, `subtitle`, `avatar` (boolean or initials), `leadingIcon` (default `ArrowLeft`, `X` for modal), `onBack`, `backTo`, `trailing` (node, usually a `Button` M), `divider`, `sticky`. Back is 60 tall and Top level is 68 (the 1 px divider is drawn over the bottom edge, not added). Back goes back one step in history, or to `backTo` (default `/`) when opened directly; that fallback navigates with `replace` and `state: { ohmDirection: 'back' }` so the shell can play it as a back. |
| `Footer` | Ohm / Footer | children (one or two `Button`s), `helper`, `trustLine`, `sticky`. Home indicator zone built in. |
| `TrustLineRazorpay` | Ohm / Trust line, Razorpay | none. "Secured by" + the real Razorpay logo (`src/assets/razorpay-logo.svg`). |
| `Sheet` | Ohm / Sheet + Ohm / Scrim | `open`, `onOpenChange`, `title`, `showTitle`, `footer`, `flush`, `container`, children. Self-contained overlay: portal, scrim, spring slide-up, drag the grabber or title row down to dismiss (distance or velocity), tap the scrim, Escape, focus handling. |
| `SheetPanel` | Ohm / Sheet (the panel only) | `title`, `showTitle`, `footer`, `flush`, `onClose` (default: `useSheetClose()` from the shell), children. Use as the body of a sheet route: the shell's sheet host adds scrim, spring and drag. |
| `TabBar` | Ohm / Tab bar | `value` bills \| trends, `onValueChange` (default: navigate to `/` or `/trends`), `sticky`. The 2 px bar slides between tabs (one shared layoutId, so it slides even though each screen has its own TabBar). 90 tall: the 1 px top line is inside the frame. |
| `Badge` | Ohm / Badge | `tone` neutral \| primary \| success \| warning \| danger, `size` s \| m, `icon` (true = circle-check, or an icon component), children. |
| `Card` | Ohm / Card | `tone` white \| primary-subtle \| warning-subtle, `padding` 20 \| 16 \| 0, div props. Radius 16, clipped; 12 between children (0 for padding 0). |
| `Tile` | Ohm / Tile | `tone` muted \| white \| primary-subtle \| success-subtle \| warning-subtle, div props. Radius 12, padding 12, 8 between children. |
| `Separator` | Ohm / Separator | `inset` none \| 16 \| 20 \| left-32 \| left-68. |
| `SectionHeader` | Ohm / Section header | `title`, `meta`, `link` + `onLinkClick` (+ `linkIcon`), `description`. |
| `ListRow` | Ohm / List row | `surface` plain \| card, `leading` (node, e.g. `IconTile`), `title`, `subtitle`, `value`, `badge`, `action`, `chevron`, `onClick`. |
| `IconTile` | Icon tile | `icon`, `tone` muted \| primary \| success \| warning, `size` 36 \| 40. The usual `ListRow` leading. |
| `Amount` | Ohm / Amount | `value` (rupees, a number), `size` xl \| l \| m \| s, `struck`, `countUp`, `countFrom` (rupees the count starts from, default 0; a payment confirmation passes 95 % of the value so "Paid ₹0" is never shown), `countDelay` (seconds), `replay`. The box is exactly as tall as the digits' line (48, 40, 32, 28; baseline alignment would make L 41) and the rupee sign sits 12, 9, 4 and 3 px below their top, where Figma's export draws it. `struck` draws the strike left to right; `countUp` counts from `countFrom` when the figure is 60 % in view, the first time that value is seen on that path (never again on Back or a tab switch; `replay` counts on every mount), after `countDelay`, and holds its final width while it counts, the digits growing rightwards from the rupee sign. |
| `DueLine` | Ohm / Due line | `tone` default \| tomorrow \| today \| overdue \| paid, `size` m \| s, children. |
| `ReassuranceRow` | Ohm / Reassurance row | `surface` plain \| card, `title`, `description`, `mini` (slot, default a `BillStatusMini` Tile On, M or L by surface), `state` checking \| checked \| flagged, `onClick`. Default words from `REASSURANCE` in the data module. |
| `BillStatusMini` | Bill status mini (11:10035) | Re-exported from `@/illustrations`, the one Figma-exported art (there is no second copy). `state` checking \| checked \| flagged, `size` m \| l, `tile`, `still`. The badge pops and the tick draws when it turns checked. |
| `Alert` | Ohm / Alert | `tone` info \| success \| warning \| danger, `title`, `description`, `link` + `onLinkClick` (+ `linkLoading`), `icon`, `role` (default `alert` for danger). The link keeps its full 40 px. |
| `Toast`, `toast`, `OhmToaster` | Ohm / Toast | `<Toast tone="success" \| "error">` is the visual. Call `toast.success("Link copied")` or `toast.error(...)`; mount `<OhmToaster />` once (a second one stays silent). Sonner underneath, top centre, a full bar (361 in the 393 frame, 16 px gutters, also inside the desktop frame), up to 42 characters. The shell dismisses toasts on `/notification` and `/pay`. |
| `CheckLine` | Ohm / Check line | `state` pass \| look \| pending \| running, `title`, `result`, `animateOnMount`. The tick draws (pathLength) when the state becomes pass. |
| `Skeleton` | (loading) | div props; size with classes. Shimmer sweeps across (still with reduced motion). |
| `Spinner` | Spinner (primary) | `size`, `tone` primary \| current, `label`. |
| `NavRow` | Ohm / Nav row | `label`, button props. Sits under a `Separator inset="20"`. |
| `Footnote` | Ohm / Footnote | `align` left \| center, children. |
| `ScreenScaffold` | (screen layout) | `header`, `footer`, children, `stagger` (default true), `contentClassName`. It never shrinks below its content (`flex: 1 0 auto`), so a screen taller than the phone keeps its sticky header and footer all the way down. |
| `Reveal`, `Stagger` | (motion) | `Reveal`: `index`, `delay`, `skip`; fades and lifts a child 10 px, once. `Stagger` wraps each child in a `Reveal`. `ScreenScaffold` staggers only the first time a path is shown; coming back (Back, a tab switch) shows it still. |

Motion presets: `SPRING`, `EASE_OUT`, `DURATION`, `STAGGER`, `useReduced()` (also exported from the barrel; the shell has its own copies in `src/shell/motion.ts` with the same curves).

## Tests

`ohm.test.tsx` covers the behaviour (buttons, amount formatting, header back, tab navigation, sheet open and close, toast, the gallery rendering). Drag, springs and the visuals are checked in a real browser.
