# Round 3: the user's last design feedback, as an exact change list (14 Oct 2026)

The user went through every screen. This is the LAST design round before development, and they are short on time. Their words: "Just keep things simple. Just make sense." "These are very basic things." Do exactly what is below, well, and nothing more.

Figma file: Bill app, fileKey `mwmHwXDuayUYeliDAlv3Fo` (pass it on every figma_execute). Page "📱 Screens" (9:7425), Section "Screens" 9:7426. Components live on page "🧩 Design system" (5:1266).
The archive of the state before this round is page "🗄️ v3 · Screens · 14 Oct" (never edit archive pages).

## Read before you start (in this order, quickly)
1. `/Users/rishabh/Projects/ohm/specs/round2/DATA.md`: every number. It wins over everything.
2. `/Users/rishabh/Projects/ohm/specs/round2/COMPONENTS.md`: every component and its id (section 6 "Built" has the real node ids).
3. `/Users/rishabh/Projects/ohm/specs/round1/BUILD_GUIDE.md`: only the "gotchas" part (text style keys, variable ids, Lucide icon keys, timeouts that keep running).

## Rules for every builder
- **Own only your frames and components** (listed in your section). Six builders work in the same file at once. Never move frames on the canvas (a canvas builder repositions everything at the end); you may resize height.
- **Components first.** Anything that appears on two or more frames is a local component instance. To change how something looks everywhere, edit the main component (keep its id). Add variants or properties; never make near-duplicates. Append one line per new or changed component to `/Users/rishabh/Projects/ohm/specs/round2/COMPONENTS.md` with `cat >>` (never rewrite the file).
- **Plugin API (documentAccess dynamic-page):** never read `node.mainComponent`; use `await node.getMainComponentAsync()`, `figma.getNodeByIdAsync`, `getInstancesAsync`. Wrap property reads in scans in try/catch (other builders edit components at the same time, so sublayer ids vanish). Every failed call pops a red toast in the user's Figma: test risky code on one node first. Calls time out at 30 s but keep running: inspect before re-running.
- **Styles and tokens:** every text uses a text style; every fill and stroke is bound to a brand variable. Inter only. No raw hex (except WhatsApp green inside Share target).
- **Copy:** no em or en dashes. Indian digit grouping. Dates like "Tue 8 Sep". Short sentences. No jargon without a plain meaning.
- **Layout:** label left, value right, on ONE line, everywhere a label and a value sit together. Descriptions go on their own line below, full width. Nothing wraps under a value. Nothing clipped. Generous white space: 16 to 20 padding in cards, 12 to 16 between items, 24 between cards and sections. Frames grow to their content; header at top, footer or tab bar pinned as last children (numberOfFixedChildren).
- **No annotations on the canvas.**
- **Verify:** screenshot every frame you changed (figma_capture_screenshot), check alignment, clipping and wrapping, fix, repeat. Before you finish, check every number you show against DATA.md.
- **Report** (your final message, under 300 words): what you changed per frame, new or changed components with ids, anything you could not do.

## Decisions for everyone (lead, 14 Oct)
- **The amount on Pay buttons has no date.** "Pay ₹36,09,190" before Tue 8 Sep (S06). "Pay ₹36,42,160" after (S06.1). Never "Pay ... by Wed 16 Sep".
- **Which amount comes first:** Home and the notification lead with the bill total ₹36,42,160 and pitch the saving. The Bill summary (S06) shows the bill total being struck through and the early price ₹36,09,190 appearing, with "You save ₹32,970" (an after-delay Smart Animate inside the Bill card component, see SUMMARY).
- **Two dates, two jobs:** "Due Wed 16 Sep" is the hard deadline (a fact, ink-strong, calendar icon). "Pay by Tue 8 Sep, save ₹32,970" is an offer (positive, green, piggy-bank icon). Never style them the same.
- **Parked:** the "something is off" world is out of the prototype and out of the build: S13, S13.1, S13.2, S13.3, S07b, S08b, S11b, S11b.1, S05.5, S05.6, S05.7. Don't edit them. (The canvas builder moves them into a "Parked" area.) Nothing about contract demand changing appears on the paid screens.
- **Charts:** bar charts only, 3-letter months ("Jan", "Feb", ... "Aug"), never single letters. Show at most 8 months in one chart so labels fit (2026 = Jan to Aug; 2025 = Aug to Dec). The "All time" range goes away.
- **Sheets and tabs are plain web UI**, no Liquid Glass anywhere (SHEETS builder).
- **The checks are one feature:** Reading (S04, S04.1) and What Ohm checked (S07) show the same six checks with the same component and the same words (CHECKS builder).
- **Connection naming:** S05 keeps the title "Your connection" (Indian businesses say "connection"). On S03, the coming-soon tile becomes "Link your Northgrid account" so nobody confuses the two.

---

## SHEETS (Sonnet builder A)
Owns: new `Ohm / Sheet` and `Ohm / Tab bar` (rebuild of `Bottom nav` 5:2903), and the sheet chrome on frames S01.3 (11:12484), S03 (9:7475), S03.1 (11:10839), S04.2 (20:29031), S05.1 (11:13504), S09 (9:7722), S09.1 (28:39051), S11.1 (28:40406). Not S13.2 (parked).
1. **Build `Ohm / Sheet`** in Section "Components · Base" on the Design system page: a plain web bottom sheet. White (`card`), top corners radius 20, no blur, no glass, no shadow except a soft top shadow is fine. Top: 4 x 36 grabber `line-strong` centred, 8 from top. Header row (56): title Text-base/Semi Bold `ink-strong` left (padding 20), close `Ohm / Icon button` Ghost (x) right. SLOT "Content" (vertical, padding 0 20 20, gap 16, FILL). Optional footer area (boolean) for one or two `Ohm / Button` L. Bottom 34 home indicator zone. Properties: Title (text), Show title (bool), Footer (bool). Also a `Ohm / Scrim` (full frame 393 x height, `ink-strong` at 40% opacity) or put the scrim inside the frame recipe.
2. **Swap every sheet frame listed above** to: the existing backdrop (the parent screen as it is now), then the scrim, then an `Ohm / Sheet` instance anchored to the bottom with the existing content moved into its Content slot unchanged (keep the content instances; just re-parent them). Remove the `iOS / Sheet` instance and its glass close button. Re-apply any reactions (close goes back to the parent).
3. **S03.1 Forward the email:** remove the blue background behind the illustration; the illustration sits directly on white.
4. **S03 Add a bill:** the coming-soon tile title becomes "Link your Northgrid account" (badge "Coming soon" stays). Edit through the `Add bill tile` component property or variant.
5. **Rebuild `Bottom nav` (5:2903) in place (keep id and variants Active Bills | Trends) as a plain web tab bar:** 393 wide, white `card`, 1 px top stroke `line`, two equal tabs (icon 24 + label Text-xs/Medium) 56 tall, then 34 home indicator zone. Active tab: icon and label `primary`, plus a 2 px `primary` bar at the top edge of that tab. Inactive: `ink-muted`. No pill, no glass, no blur, no shadow. Check S01, S01.1, S01.2 and S12 after: it updates everywhere through the instance.
6. Screenshot every frame you touched.

## HOME (Sonnet builder B)
Owns: S01 Home (9:7427, everything except the inside of the `Bill card / Home` component, which SUMMARY owns), S01.1 (11:11635), S01.2 (11:12124), the `Ohm / Bar chart`, `Ohm / Chart bar`, `Ohm / Source note`, `Usage card / Home`, `Ohm / Range tabs`, the TRENDS components, and S12 Trends family: S12 (9:7850), S12.1 (20:25177), S12.2 (20:25768), S12.3 (20:26344), S12.4 (20:27101), S12.5 (20:27573), S12.6 (20:27992).
1. **3-letter months everywhere** (Bar chart Compact and Full, Chart bar): "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec". The selected month keeps its pill.
2. **Charts show one year at a time** (so labels never squeeze):
   - Home usage card: 2026 only, Jan to Aug (8 bars, Aug `primary`). Units from DATA.md. Headline "Up 1.8% from July", sub "3,26,500 units in August. July was 3,20,800." Year label under the bars "2026".
   - Range tabs become two tabs: "2026" | "2025". S12 = Units, 2026, Aug selected. S12.1 ("Trends, 2026") is now a duplicate of S12: delete it from the working page (the v3 archive keeps it). S12.2 = Units, 2025 (Aug to Dec 2025, no month selected or Dec selected). S12.3 = 2026 with May selected. S12.4 = Bill amount. S12.5 and S12.6 keep their roles.
3. **"Where these numbers come from" must look tappable** (Home usage card and S12 chart card): drop the line "From the usage table on your August bill". Replace the Source note with an `Ohm / Button` Secondary M, Left icon `info` (or `file-text`), label "Where these numbers come from", full width of the card content. It opens S01.3 (keep the reaction).
4. **S12 "How August compares" card:** remove the tick strip (the user could not read it). Replace with two simple horizontal bar pairs, label left and value right on one line above each bar: "July 2026 3,20,800" (bar `line-strong`) and "August 2026 3,26,500" (bar `primary`), then "Aug 2025 3,20,140" and "Aug 2026 3,26,500". Titles: "August vs July: 5,700 more units (up 1.8%)" and "August vs last August: 6,360 more units (up 2.0%)". Keep "Your bill is up ₹53,820" with the Link "Show in rupees". Bars zero-based, widths proportional (3,42,210 = full width is fine as the scale max).
5. **Bill amount view (S12.4) and S12.5:** remove the "2 of 13" / "months" progress meter and any "Months with rupee amounts" wording. Bill amount view = a simple bar chart of the two bills Ohm has: Jul 2026 ₹35,88,340 and Aug 2026 ₹36,42,160 (Aug `primary`), value labels on top of the bars, then one plain line: "Ohm shows the rupees for each bill you check with Ohm. Your first was July 2026." Keep the illustration if it fits, smaller. Show the amount only once: the readout "₹36,42,160 · August 2026 bill" at the top, no second copy of the same rupee figure underneath. S12.5 (fewer than 3 months of units): same idea, no progress meter, one plain sentence.
6. **S01 Home** other than the card: the Past bills block stays (the user likes it). Keep the "Add bill" header button.
7. Screenshot S01, S01.1, S01.2, S12 to S12.6.

## SUMMARY (Sonnet builder C)
Owns: `Bill card / Home` (11:11229) and its variants, `Bill hero`, `Price ladder`, `Ladder row`, `Parts card`, `July change card`, `Ohm / Due line` (add variants only), and frames S06 (9:7592), S06.1 (20:31078), S08 (9:7679), S08c (20:30011).
1. **One bill card for Home and Bill summary** (the user: "why didn't you use the same card as the homepage? That card was nice"). Rebuild `Bill card / Home` (keep id) with variant Layout = Home | Summary | Summary discounted | Summary after early | Paid (keep Flagged as is, it is parked):
   - Home: eyebrow "August bill" Text-sm/Medium `ink-muted`; `Ohm / Amount` L ₹36,42,160; a row with calendar-days 16 + "Due Wed 16 Sep" Text-sm/Semi Bold `ink-strong`; a `Ohm / Tile` Success subtle (radius 12, padding 12): piggy-bank 16 `success` + "Pay by Tue 8 Sep and save ₹32,970" Text-sm/Medium (`success` for "save ₹32,970", `ink` for the rest); Button Primary L "Review and pay"; separator; Reassurance row Plain (No hidden charges or penalties / Charged at the regulator's rates, chevron, opens S07).
   - Summary (S06 starting state): identical to Home minus the button.
   - Summary discounted (S06 resting state): eyebrow "August bill"; small struck `Ohm / Amount` S Struck ₹36,42,160 above `Ohm / Amount` L ₹36,09,190; green tile "You save ₹32,970 if you pay by Tue 8 Sep · 5 days left"; the due row "Due Wed 16 Sep"; separator; Reassurance row. Add a reaction on the Summary variant: After delay 600 ms, Change to "Summary discounted", Smart Animate 400 ms ease out. Keep layer names identical across the two variants so Smart Animate matches.
   - Summary after early (S06.1): Amount L ₹36,42,160, the tile becomes neutral (`Ohm / Tile` Muted): "The early-payment discount ended on Tue 8 Sep", the due row stays.
   - Place instances: S01 uses Home (HOME builder will not touch it); S06 uses Summary (it animates to Summary discounted); S06.1 uses Summary after early. Remove the old Bill hero from S06, S06.1 and S08.
2. **S06 content order** (top to bottom, 24 between cards): Bill card Summary; "Pay early, save ₹32,970" card (below); "Share with owner" Secondary L; Electricity used card (below); "Where the money goes" Parts card. Header unchanged (Back, "August bill" / "Northgrid Electric", trailing "Your connection"). Footer: Primary L **"Pay ₹36,09,190"** (no date) + trust line "Secured by Razorpay". S06.1 footer: "Pay ₹36,42,160".
3. **Price ladder becomes "Pay early, save ₹32,970"** (the user: "What you pay depends on the day" makes it sound like you have no control; tell her she can save). Rebuild `Price ladder` and `Ladder row` (keep ids):
   - Title "Pay early, save ₹32,970" Text-base/Semi Bold. No sub sentence.
   - A "Today, Thu 3 Sep" marker at the top of the rail (filled dot + Text-sm/Semi Bold "Today, Thu 3 Sep"; no separate "Today" tag plus date).
   - Three rows, each: date line left Text-sm/Medium `ink`, amount right Text-base/Semi Bold `ink-strong` tabular, on one line; one short line under it Text-sm/Regular:
     1. "By Tue 8 Sep" · ₹36,09,190 · "You save ₹32,970 · 5 days left" (`success`). This row is highlighted (`Ohm / Tile` Success subtle).
     2. "Wed 9 Sep to Wed 16 Sep" · ₹36,42,160 · "Full bill, no discount" (`ink-muted`).
     3. "From Thu 17 Sep" · ₹36,87,690 · "₹45,530 late charge" (`danger`).
   - Never the words "Bill amount" in place of a number. 20 padding, 16 between rows. S06.1 (after Tue 8 Sep): no Today marker; row 1 is past (amount struck, all muted, sub "Discount ended Tue 8 Sep"); row 2 is highlighted in `Ohm / Tile` Muted; title "Pay by Wed 16 Sep to avoid the late charge".
4. **Electricity used card** (replaces "Compared with July"): title "Electricity used" with zap 16; headline "3,26,500 units, up 1.8% from July" Text-lg/Semi Bold; two horizontal bars with label left and value right on one line above each: "July 3,20,800" (`line-strong`), "August 3,26,500" (`primary`); then one line "Your bill is ₹53,820 more than July." Text-sm/Regular `ink`; separator; Nav row "See trends" (opens S12).
5. **Parts card:** title "Where the money goes"; top three Part rows Short (Electricity used 62%, Fuel adjustment 11%, Wires 10%); separator; Nav row "See the full breakdown" (opens S08). The words "See all 7 parts" are gone everywhere.
6. **S08 Breakdown** (entry: "See the full breakdown" on S06): top = the same card family, a compact variant is fine: eyebrow "Bill total", Amount L ₹36,42,160, due row "Due Wed 16 Sep" in the same style as Home. Move the rounding sentence to the bottom. Then ONE card with three groups and clear subtotal rows, no stray full-bleed divider:
   - "Charges" group: Electricity used, Fuel adjustment, Wires, Booked capacity, Time of day (keep the mornings/evenings/nights mini bars, lighter).
   - Subtotal row "Before taxes ₹32,97,130" (Subtotal variant, sub "Sum of the five charges above").
   - "Taxes" ₹3,45,235 with its two lines (State electricity duty ₹2,47,285; Sales tax ₹97,950).
   - "Last month's balance" −₹196 (`success`) "July's fuel charge was revised down".
   - Total row "Bill total ₹36,42,160", then small print "Your parts add up to ₹36,42,169. Northgrid rounds down to the nearest ₹10."
   - Reduce text: one muted line per part at most. Keep "What Ohm checked" link at the end.
   S08c: same changes (it is S08 with an info popover open).
7. Screenshot S01 (the card only), S06, S06.1, S08, S08c. Check every number against DATA.md.

## CHECKS (Sonnet builder D)
Owns: S04 Reading (9:7521), S04.1 Reading details (20:28427), S07 Checks (9:7654), and components `Illustration / Bill` (do not change how it looks), `Step row`, `Step detail`, `Steps card`, `Check card`, `Evidence tile`, the `Check visual / *` components, `Checks hero`, `Note row`. Not S04.2 (SHEETS), not S07b (parked).
1. **One check component for both places.** Build `Ohm / Check line` (State Pass | Look | Pending | Running; props Title, Result): 24 icon slot (circle-check `success` | triangle-alert `warning` | circle-dashed `ink-muted` | Spinner `primary`) + Title Text-sm/Semi Bold `ink-strong` + Result Text-sm/Regular `ink-muted` on the next line. The six checks, same words in both places (from DATA.md):
   1. "Charges add up" / "Every line is your meter reading times the approved rate."
   2. "Discount worked out right" / "You save ₹32,970 if you pay by Tue 8 Sep."
   3. "Contract demand unchanged" / "700 kVA, same as your first bill."
   4. "Category fits your business" / "HT Commercial is right for a hotel."
   5. "Meter multiplier unchanged" / "2,000, same as your first bill."
   6. "No penalties" / "Peak 664 of 700 kVA. Power factor 0.998."
   Use `Ohm / Check line` as the header of every S07 Check card (nest it in `Check card`, exposed) AND as the six rows of the "Running the 6 checks" step on S04.1.
2. **S04.1 Reading details: every step open, in the same frame** (the user wants to see what is under each one). Step 1 "Found Northgrid's August bill": rows Bill date Tue 1 Sep 2026; Account 4410 28••••; Business Harbourline Hotels, Riverside. Step 2 "Read every line of the bill": rows Units 3,26,500; Peak demand 664 kVA; Power factor 0.998; Contract demand 700 kVA; Category HT Commercial; Meter multiplier 2,000. Step 3 "Redoing the maths": the rows as now. Step 4 "Running the 6 checks": six `Ohm / Check line` rows (the in-progress state of S04.1 may show the first ones Pass and the rest Pending; fine).
   Layout fix (the user: text overflows, no column usage, hard to scan): every detail row = name left (Text-sm/Medium `ink`, fill) and value right (Text-sm/Semi Bold `ink-strong`, tabular, hug, never wraps) on one line; the formula on its own line below in Text-xs/Regular `ink-muted`, one line, shortened so it fits (for example "3,26,500 units × ₹6.90"; "Mornings +₹22,800, evenings +₹60,200, nights −₹68,550" may go on two lines only for Time of day). 12 between rows. Step contents indented to the title text, consistent.
3. **S04 Reading:** same components, steps collapsed, so S04 and S04.1 look like the same screen. When reading is done the footer button is Primary L "Continue" (only if a done state exists; don't add frames).
4. **S07 What Ohm checked** (entry: the "No hidden charges or penalties" row on Home and S06). Lighter and cleaner:
   - Hero: keep the illustration and "No hidden charges or penalties"; one short sub line "Ohm redid the maths and checked 6 things. All fine."
   - Group headers stay ("Is the maths right?", "Did anything change since your first bill?") with ONE sub line each that does not wrap oddly ("Compared with your first bill. If one changes, we tell you." as one text node, one sentence per line is fine, but never a single orphan clause on its own line).
   - Each card: `Ohm / Check line` header, then the evidence tile. Cut the extra description sentences (the Result line replaces them).
   - Discount card: stack the result vertically: "₹32,970" Text-xl/Semi Bold `success` on its own line, then "less to pay if you pay by Tue 8 Sep. Both totals are rounded down to the nearest ₹10." Text-sm/Regular `ink-muted` below. Not left and right.
   - Meter multiplier visual: fix the clipped text ("on your meter", "units billed" are cut at the bottom; give the chips room, hug height). Draw the arrow as ONE vector (line plus arrowhead, a single stroke, one colour `ink-muted`, no gap), or a lucide arrow-right stretched; no separate line and arrowhead.
   - No penalties: show peak demand ONE way (the headroom bar "664 of 700 kVA" with label left and value right). Remove the duplicate visual. Keep power factor as one simple row "Power factor 0.998 (1 is best)".
   - Category fits: simpler: two rows "Your business Hotel" and "Your rate plan HT Commercial" label left value right, plus the `Ohm / Badge` Success "Fits a hotel" (the same badge component S05 uses).
   - Keep "See how Ohm read this bill" row at the end (opens S04.1).
5. Screenshot S04, S04.1, S07 and fix until clean.

## CONNECTION (Sonnet builder E)
Owns: S05 (9:7555), S05.2 (11:14760), S05.3 (11:15450), S05.4 (11:15577), S05.8 (11:16230), S05.9 (11:15883), components `Connection row`, `Details card`, `Business card`, `Starting point card`, `Meaning card`, `Evidence card`, `Field`, `Attach row`. Not S05.1 (SHEETS), not S05.5 to S05.7 (parked).
Context the user needs: S05 is the first-bill step. After Ohm reads the first bill, it asks her to confirm the details that should never change. It is not "connecting a Northgrid account" (that is coming soon). Keep the header "Your connection".
1. **Better columns in `Connection row`:** line 1 = name left (Text-base/Medium `ink`) and value right (Text-base/Semi Bold `ink-strong`, never wraps) on one line; line 2 = the plain meaning, full width, Text-sm/Regular `ink-muted`; any visual (peak bar, meter chips, badge) below that, full width. Nothing sits under the value.
2. **Same badge everywhere:** the "Fits a hotel" tag must be an `Ohm / Badge` Success S instance (the same one S07 uses), not a one-off tag style.
3. **Rows open in place** (the user: "what happens when I click on those? expand them"). Replace the right chevron with chevron-down; add a variant Open = True to `Connection row` that shows, under the row: a crop of the bill where Ohm found the value (reuse `Bill crop`) + one line "Printed on page 1 of your August bill" + Link M "This is wrong" (opens S05.1). Add a new frame directly below S05 named "S05.0 Your connection, all rows open" (a duplicate of S05 with every row Open = True; you may place it at x 1972, y = S05 bottom + 160, the canvas builder will move it). S05 itself stays collapsed. S05.2 "On your bill" stays as the full-screen version of one row.
4. **Starting card** at the top: keep the illustration; text: "Ohm read these from your first bill. Check them once. Every new bill is checked against them."
5. Footnote: "You can change these later from any bill." (one line, centred).
6. S05.3, S05.4, S05.8, S05.9: apply the same row and badge fixes only, and fix any wrapping or clipping. No redesign.
7. Screenshot S05, S05.0, S05.2, S05.3, S05.4, S05.8, S05.9.

## SHARE (Sonnet builder F)
Owns: `Share card` and its sub-components (`Status band`, `Receipt row`, `Ohm stamp`, `Offer strip`, `Change row`), `Share target`, `Paid receipt card`, and frame S11 Paid (9:7820). The sheet frames S09, S09.1, S11.1 belong to SHEETS: you change their content only by editing these main components.
1. **Share card, Unpaid (S09 preview), cleaner** (it is the image the owner gets):
   - Status band: "Unpaid · Due Wed 16 Sep" (one line label + muted date is fine).
   - Title "August electricity bill", sub "Harbourline Hotels, Riverside", Amount L ₹36,42,160.
   - Offer strip becomes one quiet line, not a big blue box: piggy-bank 16 `success` + "Save ₹32,970 if you pay by Tue 8 Sep" Text-sm/Medium (`success` for "Save ₹32,970").
   - Change row: "Up ₹53,820 from July" / "Usage rose 1.8%" (keep).
   - Ohm stamp: only "Checked by Ohm" (zap icon) and "No hidden charges or penalties". Remove the date "Thu 3 Sep" and the line "From Northgrid's bill of Tue 1 Sep".
   - More white space; 16 padding; 12 between blocks.
2. **Share card, Paid (S11.1 preview):** same clean-up; all receipt rows Inline (label left, value right, one line, same size). Nothing about contract demand.
3. **S11 Paid:** keep the illustration, title, date and "You saved ₹32,970" badge. The receipt card rows are uniform: label left Text-sm/Regular `ink-muted`, value right Text-sm/Medium `ink`, one line each, same height, including Reference "UTR HDFCR52026090312345" (reduce to Text-xs only if it truly cannot fit). Rows: Bill · Northgrid Electric, August 2026; Paid through · Razorpay; Method · Net banking, HDFC Bank; Reference · UTR HDFCR52026090312345; Status · badge "Paid, waiting for Northgrid to confirm". Footer unchanged (Share receipt, Done).
4. Screenshot S09, S09.1, S11, S11.1 (the sheet frames show your component changes).

## CANVAS (Sonnet builder G, runs after A to F finish)
Owns: positions of every frame on the Screens page, flow sections, arrows, labels and prototype flows. Do not change anything inside frames, except adding or fixing prototype reactions.
The user: "the screens are not organized properly. It feels like you have just created a stack of screens. I cannot understand the flow, which screen relates to what. Show me the flow from point A to point B: when you upload the PDF, when you take a photo, when you forward the email, and the master flow, the bill payment. Arrows to tell me how these screens come together and their purpose." Also: "consider a few predefined flows, like a prototype".

### Layout
- One Figma Section per flow on the Screens page, stacked top to bottom with 400 between sections, all starting at x 0. Section names (Figma shows them as titles): "1 · First bill: add and read a bill", "2 · Monthly bill: check, pay and share (main flow)", "3 · Home, past bills and trends", "Parked: when a bill is wrong (not in the prototype or the build)". Move frames into them; delete the old empty Section "Screens" (9:7426) at the end.
- Inside each section, top-left: one line of text Text-2xl/Regular `ink-muted` saying what the flow is for (below). Then the main path as a row, left to right, 200 gap between frames. Detours (screens opened from a main-path screen) go in rows below, starting under the screen they open from, 200 below the tallest frame above.
- Arrows: draw each as ONE vector (figma.createVector, a straight or elbow path, 3 px stroke `primary`, end vertex strokeCap ARROW_LINES, round joins). Each arrow has a short label centred on it: a white pill (`card`, radius 999, padding 6 12, 1 px `line` stroke) with Text-base/Medium `ink-strong`, for example "Tap Review and pay". Put arrows and labels in the section, named "Arrow / <from> to <to>" and "Label / <text>". A detour row gets ONE elbow arrow from the bottom of its source frame down to the row, and each detour frame gets a label pill above it: "Tap <the control>".
- State frames (the same screen in another state, for example S06.1 After Tue 8 Sep, S05.0 all rows open, S04.1 a step open, S08c info open, S09.1 link copied, S12.x tabs) sit directly below their screen with a label pill "State: <what is different>" and no arrow.
- Nothing overlaps. Every frame stays 393 wide.

### The flows (frame names as they are after builders A to F)
1. **First bill.** Purpose line: "The first time: add the bill, Ohm reads it, she confirms the details that never change."
   Main path: S01 Home > S03 Add a bill > S04 Reading > S05 Your connection > S06 Bill summary (put a small "Continues in flow 2" pill at the end instead of duplicating S06).
   Arrow labels: "Tap Add bill"; "Upload a PDF or take a photo (the phone's file picker or camera opens)"; "Reading done"; "Tap Save and see August bill".
   Detours and states: under S03: S03.1 Forward the email ("Tap Forward the email"), with an arrow from S03.1 to a pill "The email arrives, Ohm reads it and sends a notification: flow 2". Under S04: S04.1 Reading details ("State: steps open"), S04.2 Stop reading ("Tap Stop reading this bill"). Under S05: S05.0 all rows open (state), S05.2 On your bill ("Tap a row"), S05.1 What looks off ("Tap Something looks off") > S05.3 Fix contract demand > S05.8 Your connection, set by you; and S05.1 > S05.4 Ask the Ohm team > S05.9 Your connection, sent.
2. **Monthly bill (main flow).** Purpose line: "Every month: the notification, the summary, pay through Razorpay, share with the owner."
   Main path: S02 Notification > S06 Bill summary > S11 Paid > S11.1 Share receipt.
   Arrow labels: "Tap the notification"; "Tap Pay ₹36,09,190 (Razorpay's page opens, she pays there)"; "Tap Share receipt".
   Under S06: S06.1 After Tue 8 Sep (state). Detour row from S06: S07 What Ohm checked ("Tap No hidden charges or penalties"), S08 Breakdown ("Tap See the full breakdown") with S08c below it (state "A part explained"), S09 Share with owner ("Tap Share with owner") with S09.1 below it (state "Link copied").
3. **Home, past bills and trends.** Purpose line: "Coming back: the current bill at a glance, earlier bills and how usage changes."
   Main path: S01 Home > S01.1 All bills > S01.2 July bill. Arrow labels: "Tap All bills"; "Tap July 2026".
   Detours from S01: S01.3 Where these numbers come from ("Tap Where these numbers come from"), S12 Trends ("Tap the Trends tab") with S12.2, S12.3, S12.4, S12.5, S12.6 below it as states (labels "State: 2025 tab", "State: May selected", "State: Bill amount", "State: fewer than 3 months", "State: could not load").
   S01 appears in flows 1 and 3: put the real S01 in flow 3 and in flow 1 use a pill "Start: S01 Home (flow 3)" in place of the frame; same for S06 at the end of flow 1.
4. **Parked.** Purpose line: "Kept for later. A bill that prints the wrong contract demand. Not in the prototype or the first build." Frames in one or two plain rows, no arrows: S13, S13.1, S13.2, S13.3, S07b, S08b, S11b, S11b.1, S05.5, S05.6, S05.7.

### Prototype
- Flow starting points (replace all existing): "Monthly bill" > S02; "First bill" > S01 (tap Add bill); "Home and trends" > S01. Remove "Something is off" (both) and "Bill is wrong".
- Walk each flow and make sure every tap the arrows describe has a reaction (ON_CLICK > NAVIGATE, or OVERLAY/back as fitting), on the instance the user would tap: S01 Add bill > S03; S03 Upload a PDF and Take a photo tiles > S04; S03 Forward the email > S03.1; S04 > S04.1 (tap a step); S04 Continue or after delay > S05 (if no done state, make S04.1 the step before S05 with a Continue); S05 Save and see August bill > S06; S05 Something looks off > S05.1; S02 > S06; S06 Pay > S11; S06 Share with owner > S09; S06 No hidden charges row > S07; S06 See the full breakdown > S08; S06 See trends > S12; S11 Share receipt > S11.1; S11 Done > S01; S01 Review and pay > S06; S01 No hidden charges row > S07; S01 All bills > S01.1; S01 July row > S01.2; S01 Where these numbers come from > S01.3; S01 Trends tab > S12; S12 Bills tab > S01; every Back arrow > back; every sheet close > back. Report any reaction you could not set.
- Screenshot each section at low scale, check no overlaps and readable labels.
