# Presentation pass (user, 14 Oct): make the file professional and presentable

Run after the round 3 design workflow ends. Figma file "Bill app", fileKey mwmHwXDuayUYeliDAlv3Fo.

## 1. Design system page (today "Foundations", page id 5:1266)
Today it is a 1419 px tokens frame (5:1282) plus 14 component Sections scattered from x 0 to x 23800 at different heights (Components · Base, HOME, SUMMARY, CHECKS, TRENDS, S04, SHARE, CONNECTION, S01, S02, S03, S05, Brand assets). Goal: a page a designer or engineer can read top to bottom like a design system, and that looks professional in a presentation.

Layout (one column of chapters, left aligned at x 0, 200 between chapters, every chapter a Section with a clear title):
1. **Cover band:** "Ohm design system". One line: "Every colour, type style and component the screens use. Change it here, it changes everywhere." Also: version "Round 3 · 14 Oct 2026", and the counts (components, variants).
2. **Foundations:**
   - Colour: swatches grouped by role (Brand, Ink, Lines and surfaces, Status), each with its name, hex and one line on when to use it.
   - Type ramp: the styles actually used, with their size and line height.
   - Spacing and radius scale: 4, 8, 12, 16, 20, 24, 32; radius 8, 12, 16, 20, 999.
   - Elevation: the one shadow.
   - Icons: Lucide, 16, 20 and 24, the set used.
   Rebuild the old tokens frame into this; bind every swatch to its variable.
3. **Components**, grouped by job, each group a Section, each component set laid out as a tidy grid of its variants with a title, a one-line description and "Used on: S01, S06 ...":
   - Actions: Button, Icon button.
   - Navigation and chrome: Header, Footer, Tab bar, Sheet, Scrim, Trust line Razorpay, Toast.
   - Layout: Card, Tile, Separator, Section header, List row.
   - Status: Badge, Alert, Reassurance row, Bill status mini, Due line, Check line.
   - Money and data: Amount, Bar chart, Chart bar, Bar pair, Bar row, Part row, Share bar, Range tabs, Metric switch.
   - Feature blocks: Bill card, Price ladder and Ladder row, Electricity used card, Parts card, Breakdown, Check card and its visuals, Steps card and Step rows, Connection row and its cards, Share card family, Share target, Paid receipt card, Add bill tile, Chart card, Compare blocks.
   - Illustrations: Illustration / Bill (all states), Add bill art, Paid bill page, Earlier bills stack, Bill to chart, Starting point, Forward guide, App icon.
   - Brand assets: Razorpay logo.
4. **Parked and retired** (last, visually quiet, grey title): components only the parked screens use (Problem card, kVA bars, Issue panel and other 900 kVA variants) and anything named "retired". Delete a retired component only if getInstancesAsync shows no instances on ANY page, archives included. Otherwise move it here.

Rules:
- Moving a component or component set between Sections keeps its id and every instance. Never detach, recreate or rename mains in a way that breaks instances. Inside a component set, arrange the variants in a clean grid (the set's own auto layout or figma_arrange_component_set), 24 px gaps, and give the set the white card background with padding 32.
- Section fills: white or `surface-muted`, consistent. Titles Text-2xl/Semi Bold, descriptions Text-base/Regular ink-muted.
- No overlapping. Nothing outside a Section. Remove empty Sections.
- Update the "Section" column of COMPONENTS.md "Built" rows only by appending a short mapping block (old Section > new Section), never by rewriting the file.

## 2. Pages
Final page order and names:
1. `🖼️ Cover` (new, first page). It holds one empty frame "Cover", 1920 x 960, white. The user designs the cover. Set it as the file thumbnail with `figma.setFileThumbnailNodeAsync`.
2. `📱 Screens` (was "Screens").
3. `🗺️ Journey map` (was "02 Journey map").
4. `🧩 Design system` (was "Foundations").
5. `📖 Design manual` (was "📖 Source of truth").
6. `🎤 Deck`.
7. `------` (divider), then the archive pages, unchanged.

After renaming, update every reference: the manual's chapter 10 page list (Figma text and specs/round2/MANUAL.md), BUILD_GUIDE_R2.md, FEEDBACK_R3.md, COMPONENTS.md (append a note), BUILD_PLAN.md, and the memory notes. From then on, agents must find pages by id: Screens 9:7425, Journey map 0:1, Design system 5:1266, Design manual 6:7337.

## 3. Screens page
Already being organised by flow with arrows (round 3 canvas pass). The review checks it looks presentable next to the other pages: the same Section style and title type as the design system page.

## 4. No annotations (user, 14 Oct: "they are really annoying")
- Native Figma annotations (`node.annotations`) were cleared on 14 Oct from Screens (17 nodes) and Deck (8 nodes). Final sweep: clear any that reappear on every non-archive page (`n.annotations = []`), and never add new ones.
- Canvas notes: delete any text, sticky or callout on the canvas that is not part of a frame, except the flow sections' one-line purpose and the arrow label pills the user asked for.
- Archive pages keep their history untouched.

## 5. Section background (user, 14 Oct, overrides everything above)
Every Figma Section on every non-archive page uses the dark fill **#444444** (the user set it by hand on the Screens sections; an agent reverted it to white, which must never happen again). Text that sits directly on a section (section purpose lines, chapter descriptions, labels outside cards) must be light so it reads on #444444: titles white, descriptions #D0D4DB. Cards, component sets and frames inside sections keep their own white or surface fills. Never change a fill or style the user set by hand without asking.
