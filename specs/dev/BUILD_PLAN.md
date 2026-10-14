# Ohm: development plan (14 Oct 2026)

Goal (user, 14 Oct): a beautiful, polished STATIC PROTOTYPE that people can play with, not a product. It matches the Figma designs and runs the three flows end to end with the example bill. No backend, no database, no real uploads, scanning or payments: every action is simulated (tap Upload the PDF > a short simulated upload > Reading with the scanning animation > and so on), and every step can be backed out of. Motion is a first-class requirement: the illustrations animate, loaders animate, transitions feel smooth. The bill data is a typed module built from DATA.md, with tests that prove the maths.

## Hosting (recommended 14 Oct; waiting for the user's yes before anything is published)
GitHub Pages from the public repo on the user's GitHub account **mindninjaX** (the only GitHub account logged in here), deployed by a GitHub Actions workflow on every push to main. One account, one place, no second service.
- The Cloudflare account logged in on this Mac is a work account, so Cloudflare is NOT used unless the user names the account to use.
- Vite `base` is `/ohm/` (site at https://mindninjax.github.io/ohm/), the router uses `import.meta.env.BASE_URL` as its basename, and the build copies `index.html` to `404.html` so deep links work.
- Nothing is pushed or published without the user's explicit yes in chat.

## Stack (the same as the user's other apps, e.g. sole-hq/app)
- Vite 8, React 19, TypeScript, React Router, Tailwind CSS v4 (`@tailwindcss/vite`), `radix-ui`, `lucide-react`, `tailwind-merge`, Vitest, Playwright, oxlint.
- Motion (`motion`, the successor of Framer Motion) for transitions, sheets, layout animations and SVG animation. Illustrations are inline SVG React components exported from Figma with layer ids, so their parts (scan line, rows, badges, checks) animate.
- shadcn/ui components from the sitsiilia registry (the same kit the Figma file uses): `npx shadcn@latest add https://raw.githubusercontent.com/Sitsiilia/shadcn-figma-skill/refs/heads/main/r/<name>.json`, plus `r/theme.json`.
- Inter font. Brand tokens from the Figma variables become CSS variables in `src/styles/globals.css`, mapped into Tailwind `@theme`.
- App folder: `/Users/rishabh/Projects/ohm/app`. Dev server: `npm run dev` on port 8810.

## Shape
- Mobile only, everywhere (user, 14 Oct: no desktop view; a link opened on a laptop must still show the phone view).
  - On a phone (narrow screen or touch): the app fills the screen like any mobile site, using the phone's real status bar and safe areas (`viewport-fit=cover`, `env(safe-area-inset-*)`, `100dvh`).
  - On a desktop or tablet (wider than about 600 px with a mouse): the app renders inside a phone frame, 393 x 852, rounded 48 px corners, a thin dark bezel, centred on a soft `surface` background, with a drawn status bar (9:41) and home indicator so it looks like the Figma screens. If the window is shorter than the frame, the frame scales down to fit (no page scrollbar); the app scrolls inside the frame.
  - Status bar colour follows the top of the screen (user, 14 Oct: the grey strip above a white header looked "segmented"): white (`card`) on every screen with a white header, the page colour on screens without one (S11 Paid). On phones, set `<meta name="theme-color">` per screen the same way (white by default). The header and the status bar must read as one continuous bar.
  - Beside the frame on desktop: "Ohm prototype" with a one-line description, a QR code ("Open on your phone", generated in the browser from the page URL) and the Prototype menu shortcuts.
  - Technical: the frame element has `transform: translateZ(0)` and `overflow: hidden`, so fixed footers, the tab bar, sheets, scrims and toasts stay inside the phone; every portal (Radix, toasts) mounts into the frame, never `document.body`. Layout code never reads `window.innerWidth` for sizing; it uses the frame container.
  - Tested at 393 x 852 (phone), 360 x 740 (small phone), 1440 x 900 and 1280 x 720 (desktop).
- `src/data/bill.ts`: every number from DATA.md, with the derived values computed (rounding down to ₹10, 1% early discount, 1.25% late charge, 75% billing demand). `src/data/bill.test.ts` asserts every figure the screens show (₹36,42,160, ₹36,09,190, ₹32,970, ₹36,87,690, ₹45,530, ₹53,820, 1.8%, the units table).
- `src/lib/format.ts`: Indian grouping (`₹36,42,160`), dates ("Tue 8 Sep"), percentages.
- `src/components/ohm/*`: one React component per Figma component (Header, Button, Footer, Sheet, Tab bar, Bill card, Reassurance row, Price ladder, Check line, Check card, Part row, Bar chart, Bar pair, Connection row, Share card, Receipt row, Badge, Alert, Toast). Same names, same variants as props.
- `src/illustrations/*`: SVGs exported from Figma (Illustration / Bill states, Add bill art, Bill status mini, Razorpay logo).
- Routes:

| Route | Screen |
|---|---|
| `/` | S01 Home (tab Bills) |
| `/trends` | S12 Trends (`?metric=units|rupees&year=2026|2025&month=`) |
| `/bills`, `/bills/july-2026` | S01.1, S01.2 |
| `/notification` | S02 lock screen (demo entry for the monthly flow) |
| `/add` | S03 sheet over Home; `/add/email` S03.1 |
| `/reading` | S04, steps open in place (S04.1); stop sheet S04.2 |
| `/connection` | S05 (rows open in place), `/connection/wrong` S05.1 sheet, `/connection/fix` S05.3, `/connection/ask` S05.4 |
| `/bill` | S06 (S06.1 when the demo date is after Tue 8 Sep) |
| `/bill/checks`, `/bill/breakdown` | S07, S08 |
| `/bill/share` | S09 sheet |
| `/paid`, `/paid/share` | S11, S11.1 |

- Pay: tapping "Pay ₹36,09,190" shows a short "Opening Razorpay" state, then goes to `/paid`. No real payment.

## Simulations and motion (the polish the user asked for)
- Screen changes: push forward and pop back (slide and fade, about 250 ms); tabs cross-fade. Back always works (browser back too).
- Sheets: slide up on a spring, scrim fades in, drag down or tap the scrim to close.
- Upload the PDF: the sheet shows "August bill.pdf" uploading (progress bar about 1.2 s), then Reading opens.
- Take a photo: a simulated camera view (dark frame, corner brackets that lock onto a bill, shutter), then Reading.
- Forward the email: Copy address shows "Copied"; a "Simulate the email arriving" button drops the notification in.
- Reading: the bill illustration is scanned (scan line sweeps, lines light up as they are read); the four steps tick off one by one; maths rows count in; the six checks pop green; then "Continue". About 8 to 10 s, skippable. Stop reading opens the sheet.
- Bill summary: the bill card arrives showing ₹36,42,160, then the total is struck through and ₹36,09,190 with "You save ₹32,970" slides in (the Figma Smart Animate).
- Amounts count up on first view. Chart bars grow from the baseline, staggered. Check marks draw in. Cards stagger in gently.
- Pay: Razorpay loader (logo, spinner) about 1.5 s, then Paid: the bill illustration gets its check badge with a small pop, receipt rows stagger in.
- Share: WhatsApp and Email show a toast ("Opening WhatsApp"), Copy link copies and shows "Link copied".
- A small "Prototype" button opens a menu: start First bill, Monthly bill or Home and trends; switch the date (before or after Tue 8 Sep); reset.
- Every animation respects prefers-reduced-motion.
- Parked screens (S13 family and the 900 kVA versions) are not built.

## How we build (Sonnet builds, Opus reviews)
1. Scaffold, tokens, fonts, data module with tests, format helpers, app shell (one agent).
2. Base components (Header, Button, Footer, Sheet, Tab bar, Badge, Card, Amount, Row) (one agent).
3. Screens in parallel, one Sonnet agent per area (Home and Trends; Summary, Checks and Breakdown; Reading and Connection; Share and Paid; Add bill and sheets). Each compares its screen with a 2x Figma export side by side in the browser.
4. Opus review: each screen against the Figma export at 393 wide, plus the three flows tapped through in a browser. Sonnet fixes.
   - UI testing tools: the built-in browser pane, Playwright (visual diff), and the user's Aside CLI (`aside repl` for Playwright-style scripted runs with screenshots on localhost; `aside exec "<task>"` for an independent agent to play through a flow as a first-time user and report where it got confused). Aside runs in the user's real browser, so use it only on localhost or the deployed prototype, never on other logged-in sites.
5. Deploy to GitHub Pages (after the user's yes).

## Visual rules added by the user during round 3
- No tinted highlight bands behind text rows or numbers (no primary-subtle row backgrounds); the result row is set apart by weight and a divider only.
- The status bar strip matches the header colour (see Shape).
- Headers have breathing room: top-level header about 68 px (padding 8 top, 12 bottom), back header about 60 px (6 top, 10 bottom), divider at the very bottom.
- Add bill options are bordered cards (1 px line, radius 16; pressed: 1.5 px primary).

## Pixel perfect (user, 14 Oct: "the output should be pixel perfect to Figma")
- Figma is the spec. Screen builders read each frame's real values from Figma (auto layout padding and gaps, sizes, radii, text styles, fills, icon sizes) with figma_execute, not from memory or the prose specs.
- Every screen and state gets a 2x PNG export from Figma in `app/tests/figma/<screen>.png` (refreshed whenever Figma changes).
- Visual diff: a Playwright test renders each route at 393 wide (device scale 2, animations finished, fonts loaded) and compares it with the Figma PNG using pixelmatch. It writes a diff image and fails when more than a small share of pixels differ. Builders iterate until each screen passes.
- A dev-only `/compare/<screen>` page overlays the Figma PNG on the live screen with an opacity slider and a side-by-side toggle, for quick checks by eye.
- Opus reviews every screen with the diff images and the overlay before anything is shown to the user.

## Keeping Figma and the app in sync (user, 14 Oct)
After launch, the user gives feedback once and both sides change together.
- `specs/dev/COMPONENT_MAP.md` maps every Figma component (name and node id) to its React component and file, and every Figma frame to its route.
- Each change is applied in Figma first (main component where possible), then in the matching React component or screen, then verified on both sides: a Figma screenshot, a browser screenshot, and the visual diff re-run after re-exporting the Figma PNG.
- Numbers change only in DATA.md and `src/data/bill.ts`, together, with the tests updated.
- Every change is logged in DECISIONS.md, naming both sides.
