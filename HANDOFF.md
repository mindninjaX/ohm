# Ohm: handoff (14 Oct 2026, evening)

If this session ends, start here.

## Where everything is
- Figma file "Bill app" (fileKey mwmHwXDuayUYeliDAlv3Fo). Pages:
  - 🖼️ Cover (empty frame for the user)
  - 📱 Screens (by flow, with arrows; parked screens at the bottom)
  - 🗺️ Journey map
  - 🧩 Design system
  - 📖 Design manual
  - 🎤 Deck
  - archives under "------"
- Find pages by id: Screens 9:7425, Journey map 0:1, Design system 5:1266, Design manual 6:7337, Deck 18:25717.
- App (static prototype): /Users/rishabh/Projects/ohm/app. Vite + React 19 + Tailwind 4 + Motion.
  - Run: `cd app && npm run dev` and open http://localhost:8810/ohm/
  - Checks: `npm run typecheck && npm test && npm run build`
  - Pixel diff against Figma: `npm run diff [frameIds]` (Figma PNGs in app/tests/figma, re-export steps in app/scripts/export-figma.md); compare page /ohm/compare/<frameId>.
- Plans and rules:
  - specs/dev/BUILD_PLAN.md (app plan and visual rules)
  - specs/dev/SCREENS.md (frame to route)
  - specs/dev/COMPONENT_MAP.md (Figma component to React file, for keeping both in sync)
  - specs/round2/DATA.md (every number)
  - DECISIONS.md (all decisions)
  - specs/round3/PRESENTATION.md (file rules, including sections #444444)
- Deck:
  - specs/deck/DECK_SCRIPT.md (final 29-slide script; "User decisions" at the end override it)
  - specs/deck/KIT.md (deck components and templates; kit Section 31:93243 on the Deck page at x 22000)
  - specs/deck/CONTENT.md (facts and sources)
  - specs/deck/BRIEF.md (assignment brief)

## Status at handoff
- Figma designs: done and audited (ready for development); file organised; no annotations.
- App: all screens built (most within 0.2 % of Figma). Running: shared component changes, then an Opus review (diffs, flows, motion, Aside usability run) and Sonnet fixes (workflow wf_35f88f3b-a0b).
- Deck: slides being built from the script and kit (workflow wf_4683273f-25e: 4 builders, Opus review, polish, second review, polish, PDF export to specs/deck/export/).

## Still to do
1. Deploy: approved by the user on 14 Oct (public repo mindninjaX/ohm, GitHub Pages via .github/workflows/pages.yml, site https://mindninjax.github.io/ohm/). Every push to main that touches app/ redeploys.
2. Put the live prototype link and its QR code on deck slides 2 (Resources), 17 (prototype) and 29 (Thanks): the kit's QR block is a placeholder.
3. No deck PDF needed (user, 14 Oct).
4. The user will edit the sample-bill wording on deck slide 12 themselves.
5. Parked frame S13 (9:7932) still shows some 700 kVA figures (rounding line, price ladder); it is parked, low priority.

## Rules the user set (also in memory)
- Pixel perfect to Figma.
- Every later change goes to Figma and the app together.
- No annotations.
- Sections #444444.
- Never revert the user's manual edits.
- No em or en dashes.
- Opus reviews, Sonnet builds.
- Archive before big changes.
