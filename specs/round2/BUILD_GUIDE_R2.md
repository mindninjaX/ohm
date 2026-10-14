# Round 2 build guide (read fully, then read round 1's guide for the technical gotchas)

1. Read `/Users/rishabh/Projects/ohm/specs/round1/BUILD_GUIDE.md` for: file and page IDs, the kit keys, text style keys, brand variable IDs, Lucide icon keys, the rebrand map, and the hard-won Figma gotchas (timeouts that keep running, slow first imports, fallback colours on bound paints, frozen paints, instance sublayers, prototype reaction format, screenshots, duplicate scans). All of that still applies. Its chrome instructions are partly replaced by the "Chrome" section below.
2. Then read your own screen spec(s). Put your effort into the CONTENT of the screens: hierarchy, copy, numbers, charts, illustrations, states. That is what the user is reviewing.
3. Do NOT read or apply `superseded/global-web-system.md`. The user rejected a web chrome kit ("as simple as how websites typically are"). Where a screen spec mentions Ohm / Top bar, Ohm / Footer, Ohm / Sheet, Ohm / Toast, Bottom nav types or button "Style" names from that kit, translate with the table below.

## READ FIRST: three user rules (14 Oct)
1. **Numbers come only from `/Users/rishabh/Projects/ohm/specs/round2/DATA.md`.** It overrides every spec. There are two worlds: the normal 700 kVA bill, and the 900 kVA bill on S13, S13.1, S13.2, S13.3, S07b and S08b, whose totals are different. The saving shown to users is ₹32,970 (not ₹32,971). July was paid at ₹35,55,860. If a number you need is not in DATA.md, don't invent it; leave it out and report it.
2. **No annotations on the canvas.** Don't add sticky notes, review notes, "demo only" labels, spec callouts or text outside frames. Put notes in your report instead. Remove the annotation text that earlier rounds left around YOUR frames, unless it is essential for someone reading the prototype (then keep one short line). The user said they are noise.
3. **Think like the user, a non-technical finance manager paying a large bill.** On every screen, the most important fact comes first and biggest (usually: how much, by when, and is it OK to pay). Use one format for the same kind of information everywhere (same amount style, date style, row style, header style). Cut anything that doesn't help her decide or act. This product doesn't exist on Mobbin, so judge by her needs, not by references.

Other builders are working in the same file at the same time. Touch only the frames and columns you own.

## Components first (user requirement, 14 Oct; this is the most important rule)
The user: "please use components ... if we want to change something in one place, it reflects everywhere else." They noticed copies drifting apart (an "Add bill" button on one screen, the old plus on another).
- **Anything that appears more than once** (on any two frames, including variants, sheets and backdrops) MUST be an instance of a local component: headers, buttons, footers, section headers, cards, list rows, alerts, badges, amounts, the reassurance row, chart bars, tabs, toasts, illustrations, share targets, and so on. No copy-pasted look-alikes, no detached instances, no "Card / ..." frames rebuilt by hand on each screen.
- **Read `/Users/rishabh/Projects/ohm/specs/round2/COMPONENTS.md` before building.** It lists every component, its variants and properties, and where it is used. Base components are built before you start (Section "Components · Base" on the Design system page). Use them.
- **Missing variant or property?** Add it to the existing main component (a new variant or property; never change how the existing variants look, other screens use them). Do not make a near-duplicate component.
- **Area components** (used only by your area): build them as components first, in a Section "Components · <YOUR AREA>" on the Design system page, then use instances. Append one line per new component to COMPONENTS.md with Bash (`cat >> ... <<'EOF'`; never rewrite the file, others append too): name, id, variants/properties, used on.
- **Screens are thin:** a screen is Status bar + Ohm / Header instance + content made of instances (stacked in auto layout) + Ohm / Footer or Bottom nav instance + home indicator. Wrapper frames for layout are fine; hand-drawn UI that repeats is not.
- **Styles:** every text node uses a local or library text style; every fill and stroke is bound to a variable (brand or library). No raw values.
- Use component properties (text, boolean, instance swap) for what changes between uses, so instances are set through properties, not by editing sublayers.

## Figma API gotcha (this plugin runs with documentAccess: dynamic-page)
- NEVER read `node.mainComponent` (it throws "Cannot call with documentAccess: dynamic-page" and pops a red error toast in the user's Figma). Use `await node.getMainComponentAsync()`. Inside `findAll` callbacks you cannot await, so collect the instances first and then resolve their main components in a `for ... of` loop with await.
- Same rule for the other sync getters: use `figma.getNodeByIdAsync`, `getInstancesAsync`, `figma.loadAllPagesAsync()` before cross-page reads, `getLocalPaintStylesAsync`, `getVariableByIdAsync` and `importComponentByKeyAsync`.
- Every failed call shows an error toast to the user, so test risky code on one node first.
- Other builders edit components while you work, so instance sublayer IDs (like `I20:19561;128:583`) can vanish mid-scan. Then `findAll` callbacks that read properties (strokes, fills, characters) crash with "does not exist" and a red toast. In scans, wrap each node's property reads in try/catch and skip missing nodes. Re-query nodes after any component edit instead of reusing old references.

## Chrome (keep it simple; this is what the user asked for)
- **Leave alone:** `Status bar` instances, `iOS / Home indicator`, the `Bottom nav` on S01 and S12, every `iOS / Sheet` (sheets stay as they are; you only change what is inside them), and S02 entirely. When this becomes a website those are dropped anyway.
- **Replace only the Liquid Glass top bar** (`iOS / Nav bar`, kit Toolbar) with an instance of the local **`Ohm / Header`** (a Base component): white, a plain Lucide arrow-left in a 44 x 44 hit area, the title next to it, an optional one-line subtitle, an optional trailing action (an `Ohm / Button` Link or Secondary M). Delete any `Scroll edge` frames. Re-apply the Back reaction to the arrow (record it before deleting the nav bar).
- **Buttons:** every button on a screen is an instance of the local **`Ohm / Button`** (a Base component). Variants: Style = Primary | Secondary | Destructive | Link, Size = L | M. L is 48 tall and full width; M is 40 tall and hugs. The label is always Inter Semi Bold 16/24 (Text-base/Semi Bold). Replace glass Button Groups and kit Buttons inside YOUR frames (not inside iOS sheets' own close buttons; leave those). 
- **Footer** (a pinned action bar): an instance of the Base component `Ohm / Footer` (white, 1 px brand/line top stroke, padding 12 top / 16 sides, one or two Ohm / Buttons stacked with 8 gap, optional trust line or helper text, then 34 px for the home indicator). Pinned to the bottom.
- **Toast:** the existing local `Toast` component (11:12245), extended in Base if needed.
- **Translation of spec terms:** "Top bar Compact / Large" -> `Ohm / Header` (Large = title only, no back, on top-level screens). "Footer Single / Stack / Pay / Helper" -> the plain Footer above. "Ohm / Sheet" -> keep or clone the existing `iOS / Sheet` pattern (see S09 or S03). "Primary L / Outline L / Ghost L / Destructive L / Outline M / Link M" -> Ohm / Button Primary L / Secondary L / Link L / Destructive L / Secondary M / Link M.
- **Frames grow to their content** (the user asked: nothing clipped). If content is taller than 852, make the frame taller. Keep the header at the top and the Footer / Bottom nav / home indicator at the bottom: make them the LAST children, absolutely positioned, and set `frame.numberOfFixedChildren` to their count so they stay put when scrolling in the prototype. Never fade or mask content.

## Global content rules (from round 2 feedback)
- **Bar charts only.** Non-selected bars and neutral data marks use brand `line-strong` (#8590A2, VariableID:16:25713). The selected or current bar is brand/primary. No line charts. Never squeeze month labels: show fewer labels or scroll.
- **Section headers** outside cards use ONE style: Text-base/Semi Bold ink-strong, sentence case, with an optional Link M or a Text-sm ink-muted meta on the right. No uppercase micro labels.
- **Copy:** the reassurance phrase is "No hidden charges or penalties" / "Charged at the regulator's rates". Dates are 2026 (Thu 3 Sep, Tue 8 Sep, Wed 16 Sep). No em or en dashes. Indian grouping. Don't invent figures (derived ones must be shown in the spec). "₹45,530 more", not ₹45,527.
- **Users are not technical:** prefer a small visual (illustration, bar, icon, crop of the bill) over a paragraph.
- **Models:** you are a Sonnet agent. Keep calls small and idempotent. Inspect after any timeout before re-running.

## Lead decisions (where specs conflict)
- **S06 and S13 header:** Ohm / Header with Back, title "August bill", subtitle "Northgrid Electric", trailing Secondary M "Your connection".
- **S06/S13 content** follows the S06-S13 spec:
  - Hero ₹36,42,160 with "Bill total · due Wed 16 Sep".
  - Then the reassurance row.
  - Then the Price ladder with Today marked.
  - Then the July change card (₹53,820 more than July, with the units bar).
  - A visible "See all 7 parts" Link M to S08 above the fold.
  - "Share with owner" is a Secondary L in the content under the price ladder.
  - The Footer holds Primary L "Pay ₹36,09,190 by Tue 8 Sep" and, under it, the trust line component `Ohm / Trust line, Razorpay` (centred: "Secured by" Text-xs/Regular ink-muted, 4 gap, Razorpay logo 14 high). The trust line tells her that tapping Pay opens a Razorpay page. The logo is the real one: an instance of the local component `Brand / Razorpay logo` (18:30287, key 96d94dc56249a2073f483e929962c11c7fc5fd4c, Section "Brand assets" on the Design system page), 14 high, about 66 wide, aspect ratio locked, full colour on white, never tinted. No placeholder.
- **Payment (user decision, 14 Oct):** Razorpay is NOT integrated or drawn. Tapping Pay goes straight to S11 Paid ("payment successful"); the prototype implies that a Razorpay page opened and the transaction happened there. The trust line under the Pay button carries the Razorpay logo (the real one, `Brand / Razorpay logo`). There are no S10 frames, no pending, failed or cancelled states, and no "Confirming" screen.
- **S06 states:** only S06.1 After Tue 8 Sep (the early-payment saving has ended, Pay ₹36,42,160 by Wed 16 Sep).
- **S13 family:**
  - Rename "S13 Check failed" (9:7932) to "S13 Check failed, changed since first bill".
  - Rename "S13.1 Check failed, your number" (11:16853) to "S13.1 Check failed, agreement says 700 kVA".
  - Add S13.3 "Copied, details for Northgrid".
- **Share:**
  - One share card component with properties Payment (Unpaid | Paid) and Checks (Clear | Look).
  - Frames: S09 Share (Unpaid), S11 Paid, S11.1 Share receipt (Paid), and S13.2 Share with owner, needs a look (in the S09 column). No S09.2.
  - Targets: WhatsApp (real WhatsApp glyph from the library's Remix, Tabler or Phosphor icon pages, in WhatsApp green; the one labelled brand-colour exception), Email and Copy link. Copy link shows the toast "Link copied".
- **S07 and S08 have NO footer.** S08 entry points: S06 "See all 7 parts" and S07 check 1. No Breakdown link on Home.
- **S08** follows the S07-S08 spec: always-open rows, final amount first, Before-taxes subtotal, rounding as small text. Also build S08b (needs a look) and S08c (meaning popover).
- **S11 success visual:** the S04 Indian HT bill illustration component (`Illustration / Bill`, Status=Done). It is built by READING in the previous phase; if missing, build the S09-S11 spec's sibling and note it.
- **Home (S01):**
  - The S12-S01 spec's compact BAR chart replaces the line chart.
  - The "due Wed 16 Sep" span is Medium ink-strong.
  - The "Past bills" section header uses the new style with Link M "All bills".
  - Ohm / Header: title only plus a Secondary M "Add bill" with a plus icon (it opens S03). Keep the avatar if there is one.
  - No Breakdown link, no Pending layout.
- **S12** follows the S12-S01 spec:
  - Range tabs: All time, 2026, 2025.
  - Metric switch: Units used / Bill amount.
  - A card explains why rupee history builds up from July 2026.
  - A swing strip shows the highest and lowest months.
  - Its variants go in the S12 column. The Bottom nav stays as it is.
- **S04:** no S04.3. The close X goes to S01.

## Ownership (builder, frames, column)
- **PLAN** (first, read only): writes COMPONENTS.md.
- **BASE** (second, alone): builds every Base component in COMPONENTS.md in Section "Components · Base" on the Design system page. Nothing else.
- **HOME:** S01, S01.1, S01.2 (rename to "S01.2 July bill"), S01.3 (S01 column). S01.3 keeps its sheet; re-clone its backdrop from the finished S01.
- **SUMMARY:** S06, S06.1, S13, S13.1, S13.3 (S06 and S13 columns), and the `Ohm / Trust line, Razorpay` component.
- **CHECKS:** S07, S07b, S08, S08b, S08c (S07 and S08 columns).
- **TRENDS:** S12 and S12.2 to S12.6 (S12 column).
- **S10 Pay (9:7787)** is retired from the working page by the lead (the v1 and v2 archives keep it). Nobody builds in the S10 column.
- **READING:** the `Illustration / Bill` component set (Indian HT bill: Hero Reading, Hero Done, Compact Maths) in Section "Components · S04" on the Design system page; S04 Reading, S04.1 Reading details (row 3 open), S04.2 Stop reading (sheet) (S04 column).
- **SHARE** (after the above): share card component, S09, S11, S11.1, S13.2 (S09 and S11 columns).
- **CONNECTION** (after the above): componentize S03, S03.1, S05, S05.1 to S05.9 without redesigning them: Ohm / Header, Ohm / Button, Ohm / Footer, section headers, and turn their repeated hand-built cards and rows (Card / Starting point, Card / Business, Section / Connection, Card / Details, Footnote, Field, Options...) into components with instances. Grow clipped frames; re-clone the S03/S03.1 backdrops from the finished S01 and S05.1's from S05.
- **FOUNDATIONS** (last): rebuild the Design system page (was Foundations) from round 1's foundations spec, documenting only what Ohm adds (tokens incl. line-strong, money, rules, Ohm / Button, Ohm / Header, the round 2 components, illustrations).

## Placement
- Parents keep their x and y 80. Variants go in the column under their parent at y = (previous frame bottom) + 160. Re-pack your column when a frame grows. Never overlap another column.
- The lead resizes Section 9:7426 at the end. Until then you may enlarge its HEIGHT only.

## Backdrops for sheets
- A sheet frame's backdrop is a clone of the finished parent screen, with its reactions stripped. If the parent belongs to another builder and isn't finished, clone the current one and name it "Backdrop (stale)". The lead re-clones at the end.

## Prototype
- Before deleting any layer with reactions, record them (layer path, trigger, destination, navigation, transition) and re-apply them to the replacement.
- Destinations: use the CURRENT node IDs (frames keep their IDs when changed in place). Keep the existing flow starting points.

## Report back
- Frames (name, id, x, y, height), components created, links set, deviations, still off, open questions. Keep it concise.
