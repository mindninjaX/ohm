# Round 2 build guide (read fully, then read round 1's guide for the technical gotchas)

1. Read `/Users/rishabh/Projects/ohm/specs/round1/BUILD_GUIDE.md` for: file and page IDs, the kit keys, text style keys, brand variable IDs, the rebrand map, and the hard-won Figma gotchas (timeouts that keep running, slow first imports, fallback colours on bound paints, frozen paints, instance sublayers, prototype reaction format, screenshots, duplicate scans). All of that still applies.
2. Read `/Users/rishabh/Projects/ohm/specs/round2/global-web-system.md` IN FULL. It is the law for chrome, buttons, frame rules, sheets, toasts and footers, and its migration table lists every live frame and its node ID. This guide resolves conflicts between it and the screen specs.
3. Then read your own screen spec(s).

Other builders are working in the same file at the same time. Touch only the frames and columns you own.

## What changed since round 1 (non-negotiable)
- **WEB APP.** No iOS Liquid Glass chrome anywhere except S02 (a real lock screen, leave it alone). Keep only `iOS / Status bar` (an instance of local `Status bar` 5:2866) and `iOS / Home indicator` as pinned device context. Retire the kit Toolbar, Tab Bar, Sheet, Grabber and Overlay, the glass Button Groups, the `Scroll edge` frames, SF Symbols, the local Bottom nav 5:2903 and the Top bar 5:2873 on every working frame (never edit or delete those masters; the archives use them).
- **Frames grow to their content** (minimum 852, nothing clipped, nothing faded). Structure: Content first, then the pinned layers (Header, Footer or Bottom nav, Toast, iOS / Home indicator) as ABSOLUTE children set as fixed with `numberOfFixedChildren`. Details are in global spec section 6.
- **One button system:** local `Ohm / Button` (Primary L, Outline L, Ghost L, Destructive L, Outline M, Link M) and `Ohm / Icon button`. Label is always Inter 16/24 Semi Bold (Text-base/Semi Bold). L is 48 tall and full width, M is 40 tall and hugs. Never place a kit Button on a screen again.
- **Bar charts only.** Non-selected bars and neutral data marks use the NEW brand variable `line-strong` (#8590A2, VariableID:16:25713, 3.2:1 on white). The selected or current bar is brand/primary. No line charts.
- **Section headers** outside cards use ONE style: Text-base/Semi Bold ink-strong, sentence case, with an optional Link M or a Text-sm ink-muted meta on the right. No uppercase micro labels. This replaces S01's 18 px "Past bills" and S05/S03's uppercase labels.
- **Copy:** the reassurance phrase is "No hidden charges or penalties" / "Charged at the regulator's rates". Dates are 2026 (Thu 3 Sep, Tue 8 Sep, Wed 16 Sep). No em or en dashes. Indian grouping. Don't invent figures (derived ones must be shown in the spec). "₹45,530 more", not ₹45,527.
- **Models:** you are a Sonnet agent. Keep calls small and idempotent. Inspect after any timeout before re-running.

## Conflict resolutions (lead decisions)
- **Top bars** follow the global spec. S06 and S13: Compact, Back, title "August bill", subtitle "Northgrid Electric", trailing Outline M "Your connection". The S06 spec's "Bill summary / Northgrid ▾" idea is rejected.
- **S06/S13 content** follows the S06-S13 spec:
  - Hero: ₹36,42,160 plus the "Due Wed 16 Sep" line.
  - Then the reassurance row.
  - Then the Price ladder with Today marked, the July change card (₹53,820 more than July, plus the units bar) and a visible "See all 7 parts" Link M entry to S08 above the fold.
  - Footer is Single, Primary L "Pay ₹36,09,190 by Tue 8 Sep".
  - "Share with owner" is an Outline L in content under the price ladder.
  - The S10 spec's alternative S06 content changes are NOT applied; only its S06 STATES are.
- **S06 variant names** (S06 builder owns the column under S06): S06.1 After Tue 8 Sep · S06.2 Paid · S06.3 Payment pending · S06.4 Payment failed · S06.5 Payment cancelled. The S10 spec's "S06.1/S06.2/S06.3" map to S06.4 failed, S06.5 cancelled and S06.3 pending.
- **S13 family** (S06 builder):
  - Rename frame "S13.1 Check failed, your number" (11:16853) to "S13.1 Check failed, agreement says 700 kVA".
  - Rename "S13 Check failed" (9:7932) to "S13 Check failed, changed since first bill".
  - Add S13.3 "Copied, details for Northgrid".
- **Share family** (share builder): S09 Share (Unpaid), S11 Paid, S11.1 Share receipt (Paid), and **S13.2 Share with owner, needs a look**, which is placed in the S09 column. The short-screen proof frame is "S09.2 Share, short screen" (S09 column). One share card component with properties Payment (Unpaid | Paid) and Checks (Clear | Look).
- **Share targets:** WhatsApp (real WhatsApp glyph from the library's Remix, Tabler or Phosphor icon pages, in WhatsApp green; third-party brand marks are the ONE allowed exception to "no raw hex", so label it), Email, **Copy link**. Copy link shows the toast "Link copied" (global toast rule; no in-place "Copied" label).
- **S07 and S08 have NO footer** (global). S08 entry points: S06 "See all 7 parts" (Link M) and S07 check 1. No Breakdown link on the Home card.
- **S08** follows the S07-S08 spec: always-open rows, so the default frame shows everything; Before-taxes subtotal; final amount first; rounding as small text. Also build S08b (needs a look) and S08c (meaning popover).
- **S10** becomes the Razorpay frames (S10 spec), placed in the S10 column. The Razorpay LOGO is still awaiting the lead's yes. Use the spec's visibly marked "LOGO PENDING" placeholder. Don't download anything.
- **S11 success visual:** use the S04 Indian HT bill illustration component (`Illustration / Bill`, Status=Done) when it exists. If it doesn't exist yet when you build S11, build the S09-S11 spec's sibling and note it for the lead.
- **Home (S01)** gets the global chrome, the S12-S01 spec's compact bar chart (replacing the line chart), the "due Wed 16 Sep" span in Medium ink-strong (approved Home amendment), and the new section header style. No Breakdown link, and no Pending layout yet.
- **S12** follows the S12-S01 spec (tabs All time / 2026 / 2025, metric switch Units used / Bill amount, building-up card for rupees, swing strip). Its variants go in the S12 column.

## Ownership (builder, frames, column)
- **CHROME** (first, alone): the chrome kit components plus the Screen template on Foundations, in Section "Components · Web chrome" at x 0, y 1900 (run an overlap scan first; move up to x 0, y 4000 if that space is taken).
- **HOME:** S01, S01.1, S01.2, S01.3 (S01 column).
- **CONNECTION:** S05, S05.1 to S05.9 (S05 column). The S05.3 placeholder text is "Number on your agreement".
- **READING:** S04 plus round-1 reading spec scope (S04 column): S04 Reading, S04.1 Reading details (row 3 open), S04.2 Stop reading (sheet), S04.3 Home, still reading (clone of the migrated S01 with the reading card; do it LAST and only after the HOME builder is done; if S01 is not migrated yet, skip and report). Also the `Illustration / Bill` component set (Indian HT bill: Hero Reading, Hero Done, Compact Maths).
- **ADD:** S03, S03.1 (S03 column).
- **CHECKS:** S07, S07b, S08, S08b, S08c (S07 and S08 columns).
- **TRENDS:** S12 and its variants S12.2 to S12.6 (S12 column).
- **SUMMARY:** S06, S06.1 to S06.5, S13, S13.1, S13.3 (S06 and S13 columns).
- **SHARE:** S09, S09.2, S11, S11.1, S13.2 (S09 and S11 columns).
- **PAY:** S10 and S10.1 to S10.7 (S10 column).
- **FOUNDATIONS** (last): rebuild the Foundations page from round 1's foundations spec, updated for the web chrome kit, the button system, line-strong and the round 2 components.

## Placement
- Parents keep their x and y 80. Variants go in the column under their parent at y = (previous frame bottom) + 160. Never overlap another column.
- The lead resizes Section 9:7426 at the end. Until then, if a frame falls outside the section, keep it inside (the section is 6400 x 10300; you may enlarge its HEIGHT only, never its width or position).

## Backdrops for sheets
- A sheet frame's Backdrop is a clone of the FINAL migrated parent (resized to 852), with its reactions stripped.
- If your parent is owned by another builder and isn't migrated yet, build the sheet over the current parent and name the layer "Backdrop (stale)". The lead re-clones all backdrops at the end.

## Prototype
- Before deleting any layer with reactions, record them (layer path, trigger, destination, navigation, transition) and re-apply them to the replacement.
- Destinations: use the CURRENT node IDs (frames keep their IDs when migrated in place). Flows: keep the existing flow starting points.

## Report back
- Frames (name, id, x, y, height), components created, links set, deviations, still off, open questions.
- Keep the report concise.
