# foundations-page

## Summary

Foundations becomes a short, neutral reference with six boards and five numbered sections: Colour, Type, Rules, Components and patterns, Illustrations. It covers only what Ohm adds, and each thing appears once. Library material is dropped (the type ramp, the stock buttons, iOS chrome), and so is everything that was shown twice: the muted ₹ now lives only in 02, the S04 drawing only in 05, and the cover has no drawing. Doc chrome stays ink and grey, so brand blue appears only inside specimens. The page never documents a rule the screens break: a short list of screen fixes, and six patterns promoted to components, come first. That lets the page show real instances that cannot drift, and every stage is sized so nothing overlaps.

## Layout

WHAT IS DOCUMENTED AND WHAT IS DROPPED
Kept, because Ohm made it: the 13 brand variables and the rebrand map; how money is set (Ohm / Amount); one local text style (Ohm / Section label); five rules; 2 iOS wrapper components; 6 new components; 4 patterns that stay copies; the illustration kit.
Dropped: the 11-style type ramp, the stock Button row, the hex-only swatch wall, the loose 'Local components' row, and any page for library or iOS kit parts, which appear only inside Ohm specimens. The legacy Top bar (5:2873) comes off the page but is not deleted: its only instance is on the locked 'v1 · Foundations · 13 Oct' archive page. It moves, unchanged, to an off-page '_Retired' frame. Its retirement goes in the Source of truth change log, not on this page.

PAGE SETUP
- Page 'Foundations' has one Figma Section, 'Foundations', fill brand/surface-muted, padding 160.
- Inside the Section are six top-level boards stacked vertically at x 0, 160 apart: '00 Cover', '01 Colour', '02 Type', '03 Rules', '04 Components and patterns', '05 Illustrations'.
- Every board: 1440 wide, hug height, fill library background (white), radius 24, clip off, vertical auto layout, padding 80 top, 120 sides, 96 bottom, gap 64. The cover uses padding 120 top and bottom.
- Layout grid on every board: 12 columns, stretch, margin 120, gutter 24, so each column is 78. Span widths: 2=180, 3=282, 4=384, 5=486, 6=588, 7=690, 8=792, 12=1200.
- When a board grows, restack the boards so each one's y is the previous board's y plus its height plus 160.
- To the right of the boards (x 1600, y 0) sit two frames: '_Doc kit' (white, radius 24, padding 48, vertical gap 48), and below it '_Retired' (the Top bar plus the line 'Kept because the v1 archive uses it. Do not use.').
- Remove the old frame 'Foundations' (5:1282) after its main components have moved. The v1 archive page already keeps a copy.
- Spacing steps used anywhere: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120, 160.

DOC TYPE (library styles plus the one new local style, Inter)
- Cover title: Text-5xl/Semi Bold 48/48, ink-strong.
- Section number: Text-4xl/Regular 36/40, ink-muted. Section title: Text-4xl/Semi Bold, ink-strong. 16 between them.
- Section rationale: Text-lg/Regular 18/28, ink-muted, max 690.
- Subsection number: Text-xl/Semi Bold, ink-muted. Subsection title: Text-xl/Semi Bold, ink-strong. 8 between them.
- Subsection description: Text-base/Regular 16/24, ink-muted, max 690.
- Spacing in a subsection: title, 8, description, 24, content.
- Card title: Text-base/Semi Bold, ink-strong. Card meta: Text-sm/Medium, ink-muted. Card note: Text-sm/Regular, ink.
- Eyebrows and table headers: Ohm / Section label (Semi Bold 12/16, 6% tracking, upper case), ink-muted. The doc uses its own style.
- Links: Text-sm/Medium, ink, underlined.
- Measure pills: Text-xs/Medium, white on ink-strong.

DOC RULES (written as a text block in '_Doc kit')
1. No brand/primary outside a stage. Doc chrome uses only the inks, line and surface-muted.
2. Every fill and stroke is bound to a variable. Hex appears only as text.
3. A stage holds at most 3 measures, and annotation pills sit at least 8 from any specimen edge.
4. Stage heights are fixed per row, so cards in a row line up.

_DOC KIT HELPERS
Doc-only components. The underscore in their names keeps them unpublished.

A. _Doc / Section header (1200 wide, hug height)
- A horizontal row, space between, bottom aligned.
- Left side, 792 wide, vertical: the title row (number + title), 12, then the rationale.
- Right side, right aligned, vertical gap 8:
  - Optional 'Lives in' pair: eyebrow LIVES IN over a value in Text-sm/Medium ink.
  - Link row: Lucide arrow-up 16 in ink, 6 gap, then the text 'Contents', hyperlinked to the '00 Cover' board.
- Properties: Number, Title, Rationale, Lives in (text); Show lives in (boolean).
- About 108 tall.

B. _Doc / Subsection title
- Number + title, 8, description.
- Text properties for all three.

C. _Doc / Caption (fill width, vertical gap 4)
- Title row: the title fills the width, the status badge sits on the right.
- Then the meta line, then the note (max 3 lines).
- Variant Status:
  - Component: kit Badge Outline 'Component'.
  - Pattern: kit Badge Secondary 'Pattern'.
  - None.
- Both badges are neutral after the rebrand, so no blue appears in doc chrome.
- 112 tall at most.
- A spec card is NOT a component. It is a plain frame 'Card / <name>' (vertical auto layout, gap 16) holding:
  - a 'Stage' frame: fill surface-muted, radius 20, padding 24, fill width, height fixed per row;
  - a _Doc / Caption instance.
  This matters because a main component cannot sit inside an instance, so stages must be plain frames.

D. _Doc / Swatch (282 wide)
- Chip: 282 x 80, radius 16, fill bound to the token. Light chips get a 1 px brand/line inside stroke.
- 'Aa' in Text-2xl/Semi Bold at 16,16 inside the chip: white on primary, ink-strong, ink and ink-muted; ink on primary-subtle, surface-muted and card; none on line.
- 12 gap, then a row: name (Text-base/Semi Bold, ink-strong) on the left, hex on the right (Text-sm/Regular, ink-muted).
- 4 gap, then the meta line: Text-xs/Regular, ink-muted, max 2 lines.
- 8 gap, then the use line: Text-sm/Regular, ink, max 2 lines.
- Variant Type:
  - Single: 200 tall.
  - Pair: the chip is the subtle token with a live Ohm / Tone badge centred in it, and there are two name rows (strong, then subtle). 224 tall.
  - Context: white chip with a 1 px dashed line stroke.

E. _Doc / Anchor: a 4 px ink-strong dot.
F. _Doc / Callout: a 20 circle in ink-strong with a white Text-xs/Semi Bold number. Leaders are 1 px ink-muted.
G. _Doc / Measure: a pill, radius 6, padding 2/6. Dimension lines are 1 px dashed ink-muted, 4/4.

BEFORE THE PAGE: FIX THE SCREENS, THEN PROMOTE
Do this on the working Screens page only, never on the v1 pages. If another redesign pass has already made a change, verify it instead.

Screen fixes, so the page never contradicts a screen:
1. S06 and S13: 'which is ₹45,527 more.' becomes 'which is ₹45,530 more.' (₹36,87,690 minus ₹36,42,160).
2. Countdown: '5 days left' becomes Ohm / Tone badge, Warning, with Lucide clock, everywhere.
   - On S06 and S13 the badge replaces the clock plus primary text row. Primary on primary-subtle is 4.49:1.
   - On S01 the badge gains the clock, and the strip drops its own leading clock so there are not two clocks.
3. S11: 'Paid, waiting for Northgrid to confirm' gains the clock (the pending rule).
4. S11: the amount moves from 30 with a 24 ₹ to Ohm / Amount L (36, ₹ 26). 'Paid' becomes its own Text-4xl/Semi Bold ink-strong layer in the same baseline-aligned row.
5. S01: card padding goes from 20 to 16, and the gap between cards from 16 to 12. The deadline strip padding goes from 10/12 to 12.
6. S10: the choice cards' radius goes from 14 to 16.
7. Day bar: segments not yet gone get a 1 px brand/line inside stroke.
8. S01: the chart title 'Usage, last 12 months' becomes 'Usage, Aug 2025 to Aug 2026' (the chart has 13 bars), restyled from Text-sm/Semi Bold to Text-base/Semi Bold.
9. S01: 'PAST BILLS' uses the new Ohm / Section label style.
10. Rebuild the S03 and S09 background copies from the updated S01 and S06, as was done before.

New local components. All are new; never edit Status bar or Bottom nav in place.
1. Ohm / Amount, variant Size = XL, L, M.
   - Horizontal auto layout, gap 0, children aligned to the text baseline.
   - '₹': Inter Semi Bold, ink-muted, size 34 / 26 / 18. This is a size override, because the kit has no style at those sizes.
   - 'Digits': Text-5xl, Text-4xl or Text-2xl Semi Bold, ink-strong. Text property 'Amount', default 36,42,160.
2. Ohm / Tone badge, variant Tone = Success, Warning, Danger.
   - A kit Badge (State=Secondary) inside, with the fill set to brand/<tone>-subtle and the text and icon set to brand/<tone>.
   - Properties: Label (text), Show icon (boolean), Icon (instance swap).
   - Defaults: circle-check 'All 6 checks passed'; clock '5 days left'; circle-x 'Error'.
3. Ohm / Day bar, variant Gone = 0 to 7.
   - Horizontal, gap 4, fill width. Seven segments, each fill width, 8 tall, radius 4.
   - Gone segments: kit SliderRange, primary.
   - Segments still to come: kit SliderTrack, library background, 1 px line inside stroke.
4. Ohm / Early payment, variant Size = Strip, Card.
   - Strip: fill width (321 on S01), radius 12, primary-subtle, padding 12, horizontal gap 8. Holds 'Pay by 8 Sep to save ₹32,971' (Text-sm/Regular, ink) and a Tone badge (Warning).
   - Card: 361, radius 16, primary-subtle, no stroke, padding 16, vertical. In order:
     - title (Text-lg/Semi Bold, ink-strong);
     - 4 gap, then 'Save ₹32,971' (Text-base/Medium, success);
     - 12 gap, then Day bar (Gone=2);
     - 8 gap, then the Tone badge (Warning);
     - 12 gap, then the late line (Text-sm/Regular, ink-muted).
   - Every line is a text property.
5. Ohm / Choice card, variant Selected = Yes, No.
   - Fill width, radius 16, padding 16, horizontal gap 12.
   - Kit Radio on the left. A text column on the right: label (Text-sm/Medium, ink-muted), an Ohm / Amount M instance, and an optional Tone badge (Success).
   - Yes: primary-subtle fill, 2 px primary inside stroke. No: card fill, 1 px line inside stroke.
6. Ohm / Key-value row, variant Value = Text, Caption, Badge, Stat.
   - Fill width, min height 48, padding 12/16, space between.
   - Label: Text-sm/Regular, ink-muted.
   - Value: Text-sm/Medium, ink, with a right-aligned caption (Text-xs/Regular, ink-muted) or a Tone badge. Stat values are Text-base/Semi Bold, ink-strong.
   - Boolean 'Separator': a 1 px line at the bottom, inset 16.
7. Illustration / Reading your bill.
   - Frame 224 x 258, no fill, clip off.
   - Children as measured on S04, moved 12 right: paper at 22,0, glow at 22,80, scan line at 14,118, badge at 172,206.
   - This centres the paper and keeps the overhanging badge inside the frame. Today the frame is 200 x 250 and the badge spills 12 to the right and 8 below.
   - S04 swaps to an instance. The paper stays centred.
Also:
- Create the local text style 'Ohm / Section label'.
- Copy each token's use line into its variable description.
- Limit the brand variable scopes to fill, stroke and text.

00 COVER (about 600)
- A horizontal row with space between.
- Left column, span 6 (588), vertical:
  - Eyebrow row: a 28 x 28 chip (radius 8, surface-muted) holding Lucide zap 16 in ink-strong, an 8 gap, then the eyebrow.
  - 24 gap, then the title.
  - 16 gap, then the lede: Text-xl/Regular 20/28, ink-muted, 588 wide.
  - 24 gap, then the meta line: Text-sm/Regular, ink-muted. 'Source of truth' is a link to that page's frame.
- Right column, span 5 (486), starting at column 8:
  - Eyebrow CONTENTS, 12 gap, a 1 px line rule.
  - Then 5 rows, each 64 tall with a 1 px line under it, horizontal gap 16, centred:
    - number: Text-sm/Medium, ink-muted, 24 wide;
    - text column, gap 2: title (Text-lg/Semi Bold, ink-strong, hyperlinked to its board), then the description (Text-sm/Regular, ink-muted, 1 line).
- No drawing, no cards, and no counts of things that do not exist yet.

01 COLOUR (about 1,950)
Header.
1.1 Brand tokens: four group rows.
- Each row: a label column, span 3 (282): group name (Text-base/Semi Bold, ink-strong), 4 gap, then a description (Text-sm/Regular, ink-muted).
- Then swatches at span 3 each, gap 24.
- Between rows: a 1 px line rule with 24 above and 24 below.
- The rows:
  - Action: primary, primary-subtle. The third slot stays empty.
  - Text: ink-strong, ink, ink-muted.
  - Surface: surface-muted, line, card (Context).
  - Status: three Pair swatches.
1.2 How the kit is rebranded: a 1200-wide table.
- Three columns, span 4 each.
- A 40-tall header row, then 5 rows 56 tall, with 1 px line separators.
- Column 1: a kit Badge Outline chip per shadcn token, gap 8.
- Column 2: Lucide arrow-right 16 in ink-muted, 12 gap, a 20 x 20 chip (radius 6) bound to the brand token, 8 gap, then the token name (Text-sm/Semi Bold, ink-strong).
- Column 3: Text-sm/Regular, ink-muted.
- 24 below the table: three notes, span 4 each. Each is a Lucide 16 icon in ink-muted (play, eye-off, palette) plus Text-sm/Regular ink-muted, gap 8.

02 TYPE (about 1,320)
2.1 Money
- Stage: 1200 x 240, padding 40, absolute layout.
- It holds the MAIN component set Ohm / Amount: horizontal, gap 120, bottom aligned, at 40,72.
- Under each variant, 12 below and left aligned: a label in Text-sm/Medium ink, then the screens in Text-sm/Regular ink-muted.
- Two annotations only:
  - a dashed baseline under the XL amount alone, with a Measure at its right end;
  - Callout 1 on the XL ₹, with its leader running to a Measure placed above the set.
- 16 below the stage: a note in Text-sm/Regular ink, max 690.
2.2 Text roles: a 1200-wide table.
- Columns: Role span 3, Style span 3, Specimen span 4, Screens span 2.
- Header row 40, then 6 rows 56, with line separators.
- Specimens are set in the real style and colour.
- 24 below: a footnote, Lucide info 16 plus Text-sm/Regular ink-muted.

03 RULES (about 1,310)
- Row 1: R1, R2 and R3 at span 4. Stage 384 x 280, padding 24, so 336 x 232 inside.
- Row 2: R4 and R5 at span 6. Stage 588 x 280.
- Gaps 24 across, 48 down.
- Caption status None. The caption is: title, 4, note (max 5 lines), 12, a row of kit Badge Outline chips, gap 6.

R1 stage:
- A dashed vertical 'screen edge' line at x 24.
- Card A: 240 x 96 at 40,40, white, radius 16. It holds a Skeleton Text line (16 padding) and a nested primary-subtle panel, 208 x 40, radius 12.
- Card B: 240 x 56, 12 below card A.
- Measures: '16' (edge to card), '12' (between cards), 'r16' (card A's corner). All sit to the right or above, 8 or more from the cards.

R2 stage:
- Kit Button Default, pill, 240 x 50, 'Pay ₹36,09,190'.
- 8 gap, then kit Button Outline, pill, 240 x 44, 'Share with owner'.
- Both at x 48, centred vertically.
- Measures '50', '44' and '8' in the 96 px to the right.

R3 stage:
- The MAIN component set Ohm / Tone badge: 3 variants stacked, gap 12, at 24,24.
- A 1 px line rule 16 below the set, eyebrow PENDING ON S11, 8 gap, then an instance (Warning, clock) reading 'Paid, waiting for Northgrid to confirm'.

R4 stage: two columns, 258 wide each, gap 24, centred vertically.
- Do column: a Tone badge (Success, check) 'Do'; 8 gap; a white row 258 x 64 (radius 12, padding 12) with the label on the left and the value plus caption on the right; 12 gap; a white row 258 x 44 with one line.
- Don't column: the same, with a Tone badge (Danger, x) 'Don't'.

R5 stage, as a centred group:
- A phone outline 96 x 192, radius 20, 2 px line stroke, white, clipped. Its bottom 64 is filled primary-subtle and holds a 72 x 12 primary pill, centred, with Measure 'Main action'.
- 24 to the right: a dashed 44 x 44 square in ink-muted, with Measure '44 min'.

04 COMPONENTS AND PATTERNS (about 2,910)
Spec cards span 6 throughout, 2 per row, gaps 24 / 48. Status Component or Pattern.
4.1 Chrome
- Row: C1 Status bar and C2 Bottom nav, stage 290.
- The main Status bar (5:2866) is centred with one Measure, '393 x 62'.
- The main Bottom nav set (5:2903) is moved as is (425 x 238) and centred.
4.2 Reading the bill (all patterns, plain copies with reactions stripped)
- Row: P1 Check result and P2 Change from last month, stage 220.
  - P1 holds two alerts at 361, gap 12, centred.
  - P2 holds the S06 row, on the grey stage, with no card.
- Row: P3 Split bars and P4 Usage chart, stage 340.
  - P3 is the S06 white card.
  - P4 is the full S12 chart card, 361 x 266.
4.3 Paying and records (all components; the MAIN sets sit in the stages)
- Row: C3 Early payment and C4 Day bar, stage 320.
  - C3: the Strip and Card variants stacked, gap 24, centred.
  - C4: the 8 variants stacked, gap 12. The set's own fill is primary-subtle (radius 12, padding 16), so the white segments are seen in context.
- Row: C5 Choice card and C6 Key-value row, stage 280.
  - C5: Yes over No, gap 10.
  - C6: 4 variants stacked, gap 0. The set's fill is library card, radius 16, so it reads as one inset grouped card.

05 ILLUSTRATIONS (about 1,280)
5.1 How they are built: a row with gap 24.
- Left: a stage, span 7 (690 x 400), padding 32.
  - The MAIN Illustration / Reading your bill at 1x (224 x 258), at left 64, centred vertically.
  - Six Anchors on the parts, each with a horizontal leader to a column of Callouts at x 400.
  - Under the stage: a caption with status None.
- Right, span 5: a numbered legend, items 16 apart. Each item is a Callout, then a title (Text-sm/Semi Bold, ink-strong), then the body (Text-sm/Regular, ink-muted).
  - Then a 32 gap, and two columns 231 wide, gap 24:
    - ALWAYS: Lucide check 14 in success per item.
    - NEVER: Lucide x 14 in danger per item.
    - Items in Text-sm/Regular ink, gap 8.
5.2 The rest of the set: four cards, span 3 (282), stage 282 x 240, padding 24.
- Each drawing is its main component at 1x. If one is taller than 192, raise all four stages together.
- Caption: title, then 'Screens: S03'. No status badge.
- Placeholder until a drawing exists: a 1 px dashed line rectangle, 234 x 192, radius 12, holding Lucide image 24 in ink-muted and, 8 below it, Text-sm/Regular ink-muted.

HEIGHTS
Cover 600, 01 1,950, 02 1,320, 03 1,310, 04 2,910, 05 1,280. That is about 9,400 of boards in total, but no single board is over about 2,900 tall.

## Copy

- **Cover eyebrow**: OHM DESIGN SYSTEM
- **Cover title**: Foundations
- **Cover lede**: Ohm is built on the shadcn/ui kit by sitsiilia and Apple's iOS and iPadOS 27 kit. This page covers only what Ohm adds: brand colours, how money is set, five rules, the pieces our screens share, and how we draw. Anything used as it ships is documented in the kits.
- **Cover meta (one line, 'Source of truth' linked)**: Bill app · Light mode only · v2, 13 Oct 2026 · Keys and change log: Source of truth
- **Cover contents eyebrow**: CONTENTS
- **Contents rows (number / title / description)**: 01 / Colour / Thirteen brand colours, and how the kit is rebranded ·· 02 / Type / How money is set, and six text roles ·· 03 / Rules / Five habits that make a screen look like Ohm ·· 04 / Components and patterns / The pieces our screens share ·· 05 / Illustrations / How we draw, and the drawings so far
- **Header link (every section)**: Contents
- **01 header**: 01 · Colour · Thirteen brand colours in one local collection, brand, light mode only. Every fill on a screen uses one of these or a library token, so hex is never typed. · LIVES IN / Local variables > brand
- **1.1 subsection**: 1.1 · Brand tokens · Grouped by the job they do. Each name says what it is for, not what colour it is.
- **Group labels**: Action / The one colour that means tap here, and its tint. ·· Text / Three inks, loudest to quietest. ·· Surface / A grey page, white cards and hairlines. ·· Status / Pairs: the strong colour for text and icons, the subtle one behind it.
- **Swatch primary (name · hex · meta · use)**: primary · #265CFF · Replaces primary, ring. 5.2:1 on white, 4.6:1 on grey. · Buttons, radio, links, this month's bar, the scan line.
- **Swatch primary-subtle**: primary-subtle · #E9EFFF · Ohm only. Ink on it 12.3:1. Primary text on it 4.49:1, below AA for small text: use ink. · Early-payment strip and card, the selected choice, the avatar, the logo chip.
- **Swatch ink-strong**: ink-strong · #091E42 · Ohm only. 16.5:1 on white. · Amounts, and the one headline in a card.
- **Swatch ink**: ink · #172B4D · Replaces foreground, card-foreground. 14.1:1 on white. · Body text, row values, text inside kit parts.
- **Swatch ink-muted**: ink-muted · #44546F · Replaces muted-foreground. 7.7:1 on white, 6.8:1 on grey. · Labels, captions, and the ₹ on big amounts.
- **Swatch surface-muted**: surface-muted · #F1F2F4 · Replaces muted, secondary. Ink on it 12.6:1. · The page behind every screen, secondary buttons, empty bar tracks.
- **Swatch line**: line · #DCDFE4 · Replaces border, input. 1.3:1 on white: never for text. · Separators, outline edges, past months in charts.
- **Swatch card (Context)**: card · #FFFFFF · Library token, kept as shipped. Shown for context. · Every card and sheet, and the drawing's paper.
- **Pair success (chip badge · names · meta · use)**: Tone badge with circle-check: All 6 checks passed · success #216E4E · success-subtle #DCFFF1 · Ohm only. 5.8:1 together. · Passed, paid, saved.
- **Pair warning**: Tone badge with clock: 5 days left · warning #A54800 · warning-subtle #FFF7D6 · Ohm only. 5.5:1 together. · Time or attention: a deadline, a wait, a thing to check.
- **Pair danger**: Tone badge with circle-x: Error · danger #AE2E24 · danger-subtle #FFECEB · Ohm only. 5.7:1 together. · Errors only. Not on any screen yet.
- **1.2 subsection**: 1.2 · How the kit is rebranded · After a screen is built, rebrand.js moves nine shadcn tokens onto five brand tokens. Everything else stays on the library.
- **Rebrand table headers**: SHADCN TOKEN · BECOMES · WHERE YOU SEE IT
- **Rebrand rows (arrow drawn as Lucide arrow-right)**: primary, ring > primary > Buttons, radio, focus rings ·· foreground, card-foreground > ink > Text inside every kit component ·· muted-foreground > ink-muted > Descriptions in rows and alerts ·· border, input > line > Separators, outline buttons, inputs ·· muted, secondary > surface-muted > Secondary buttons and badges
- **Rebrand notes (3)**: Runs on finished frames and only touches paints bound to a library token. ·· Skips layers named iOS / ..., so system chrome keeps the iOS kit's own colours. ·· Tones have no shadcn twin. Ohm / Tone badge carries them; see 03 Rules.
- **02 header**: 02 · Type · Inter, straight from the shadcn kit's text styles. Ohm adds one thing of its own: how money is set.
- **2.1 subsection**: 2.1 · Money · Amounts come in three sizes. The ₹ is smaller and muted so the digits lead.
- **Money labels under each variant**: XL · 48, ₹ 34 / S06, S13 ·· L · 36, ₹ 26 / S01, S11 ·· M · 24, ₹ 18 / S10
- **Money annotations**: Measure: Digits and ₹ share a baseline · Callout 1 > Measure: ₹ at 34 (71%), ink-muted
- **Money note**: Digits use Text-5xl, 4xl or 2xl in Semi Bold, ink-strong. The ₹ has the same weight at about 70% of the size, in ink-muted. It is a size override, because the kit has no style that small. Bill amounts are whole rupees in Indian grouping, as in ₹36,42,160. Rates keep paise, as in ₹6.90 a unit on S08. Inside a sentence, the ₹ is plain text at the sentence's size.
- **2.2 subsection**: 2.2 · Text roles · The library style Ohm uses for each job, so new screens match.
- **Text roles headers**: ROLE · STYLE · SPECIMEN · SCREENS
- **Text roles rows**: Card title | Text-base/Semi Bold · ink | Where the money goes | S01, S06, S12 ·· Lead | Text-base/Medium · ink-muted | due 16 Sep | S06, S13 ·· Row label | Text-sm/Regular · ink-muted | Contract demand | S05, S11, S12 ·· Row value | Text-sm/Medium · ink | 700 kVA | S05, S11 ·· Caption | Text-xs/Regular · ink-muted | the power you booked | S05 ·· Section label | Ohm / Section label (local) · ink-muted | PAST BILLS | S01
- **Text roles footnote**: Screen titles come from the iOS kit's nav bar, and the kit's Badge fixes its text at 12, so neither is listed.
- **03 header**: 03 · Rules · Five habits that make a screen look like Ohm. Anything not covered here follows the kits.
- **R1**: Grey page, white cards · Screens sit on surface-muted. Content sits in white cards: radius 16, 16 inside, 12 apart, 16 from the screen edge, with no border or shadow. A panel inside a card uses radius 12 and 12 inside. Tinted cards need no edge. Only a grey card on the grey page gets a 1 px line edge. · Chips: surface-muted, card, radius 16 · Measures: 16, 12, r16
- **R2**: Pill buttons, one primary · The kit's Button with the pill shape (kit property Roudness = Rounded). On task screens (S05, S06, S10, S11, S13), the one primary is full width and 50 tall, pinned above the home indicator. Other actions are Outline or Ghost, 44 tall, 8 below it. On Home, the primary sits at the foot of the bill card. · Chips: Button, Pill · Stage: Pay ₹36,09,190 / Share with owner · Measures: 50, 44, 8
- **R3**: Tones say how it went · Success: passed, paid, saved. Warning: time or attention, and the icon says which: clock for a deadline or a wait, triangle-alert for something to check. Danger: errors only. Pending means waiting on someone else, such as a payment Northgrid has not confirmed. It uses warning with the clock. · Chips: Ohm / Tone badge, Component · Stage: All 6 checks passed / 5 days left / Error · PENDING ON S11 · Paid, waiting for Northgrid to confirm
- **R4**: Plain words · Explain a term once, in plain words, where it appears. Write dates as 3 Sep 2026, times as 11:42 AM, and numbers in Indian grouping. No em or en dashes: use a comma, a full stop or a middle dot. · Chips: Copy · Do: Contract demand / 700 kVA / the power you booked ·· 3 Sep 2026, 11:42 AM · Don't: CD (kVA) / 700 ·· 03/09/26 11:42
- **R5**: Within reach · Tap targets are at least 44 x 44. On task screens, the main action sits in the bottom third, clear of the home indicator. Back stays top left, as iOS expects, and swipe back covers one-handed use. · Chips: 44 x 44, Task screens · Measures: Main action, 44 min
- **Do / Don't tags**: Do · Don't
- **04 header**: 04 · Components and patterns · The pieces our screens share. Components come from Assets: drag one in and keep it an instance. Patterns are arrangements of kit parts: copy one from the screen named in its caption. · LIVES IN / Assets > Local components
- **4.1 subsection**: 4.1 · Chrome · Two thin wrappers around the iOS and iPadOS 27 kit, so one swap updates every screen. Ohm / Amount lives in 02 Type and Ohm / Tone badge in 03 Rules, next to their rules.
- **C1 Status bar (title · badge · meta · note)**: Status bar · Component · Screens: S01, S03 to S13 · Wraps the kit's Status bar - iPhone 17 Pro. To change it everywhere, swap the instance inside. S02 uses the lock screen's own. · Measure: 393 x 62
- **C2 Bottom nav**: Bottom nav · Component · Screens: S01, S03, S12 · Wraps the kit's Tab Bar - iPhone with two tabs, Bills and Trends, floating over the content. One property, Active: Bills or Trends.
- **4.2 subsection**: 4.2 · Reading the bill · Patterns that answer three questions: is it right, why did it change, and where does the money go.
- **P1 Check result**: Check result · Pattern · Screens: S06, S13 · Copied from S06 and S13 on <build date> · The kit's Alert in a tone, framed with a chevron because the Alert has no trailing slot. The whole alert is one tap target and opens the checks on S07. · Specimens: All 6 checks passed / Charges, settings and category match ·· 1 thing to look at / 5 of 6 checks passed
- **P2 Change from last month**: Change from last month · Pattern · Screens: S06, S13 · Copied from S06 on <build date> · Says how much the bill moved, then why, in plain words. The 36 px arrow chip is warning when the bill went up and success when it went down. · Specimen: Up 1.5% from July / because you used 1.8% more electricity. July was ₹35,88,340.
- **P3 Split bars**: Split bars · Pattern · Screens: S06, S13 · Copied from S06 on <build date> · One row per part of the bill: its name and share, then a 6 px bar. The track is the kit's SliderTrack in surface-muted, and the fill is a SliderRange in primary, as wide as the share. Shows the top 3; the link opens all 7 on S08. · Specimen: Where the money goes / Electricity used 62% / Fuel adjustment 11% / Wires 10% / See all 7 parts
- **P4 Usage chart**: Usage chart · Pattern · Screens: S01 (small), S12 (full) · Copied from S12 on <build date> · Thirteen bars from the consumption history printed on the bill, Aug 2025 to Aug 2026, starting at zero. This month is in primary with its value. Past months are in line, as context: the numbers that matter are in words beside the chart.
- **4.3 subsection**: 4.3 · Paying and records · Keeps the saving and the deadline in view, then records what was paid.
- **C3 Early payment**: Early payment · Component · Screens: S01 (Strip), S06 and S13 (Card) · Always three facts: what to pay, by when, and what it saves. It is primary-subtle because it is money she can still keep. The Card adds the day bar and the late amount. · Strip: Pay by 8 Sep to save ₹32,971 + 5 days left · Card: Pay ₹36,09,190 by 8 Sep / Save ₹32,971 / [Day bar] / 5 days left / After 16 Sep: ₹36,87,690, which is ₹45,530 more.
- **C4 Day bar**: Day bar · Component · Screens: S06, S13 (inside Early payment) · Seven segments for the seven days from the bill date (1 Sep) to the discount deadline (8 Sep). Filled segments are days gone: 2 of 7 on 3 Sep, so 5 days left. Each segment is 8 tall, radius 4, gap 4. Gone: SliderRange in primary. Still to come: SliderTrack in white with a 1 px line edge.
- **C5 Choice card**: Choice card · Component · Screens: S10 · For choosing how much to pay. The whole card is the tap target, with the kit Radio on the left. Selected: primary-subtle fill, 2 px primary edge. Not selected: white, 1 px line edge. Radius 16. The early-payment choice comes first and starts selected. · Specimens: Pay by 8 Sep / ₹36,09,190 / Saves ₹32,971 ·· Full amount / ₹36,42,160
- **C6 Key-value row**: Key-value row · Component · Screens: S05, S11, S12 · One label and value per row, stacked in a white card like an iOS inset grouped list. Rows are at least 48 tall, with separators inset 16. Use Stat for numbers that are the point of the row. · Specimens: Category / HT Commercial + Fits a hotel (Badge) ·· Contract demand / 700 kVA / the power you booked (Caption) ·· Meter multiplier / 2,000 (Text) ·· Aug vs Jul / +1.8% (Stat)
- **05 header**: 05 · Illustrations · Drawn, never stock: a bill page of skeleton lines, one blue accent and a round badge that says what is happening. · LIVES IN / Assets > Illustration /
- **5.1 subsection**: 5.1 · How they are built · Measured from Reading your bill on S04. Scale the whole drawing, never one part.
- **5.1 stage caption**: Reading your bill · Screens: S04 · Part of the set. Shown at 1x, 224 x 258.
- **5.1 legend (6 items)**: 1 Paper: Kit card colour (white), 180 x 232, radius 14, 1 px line edge, 16 inside. ·· 2 Mark: A 22 square, radius 6, in primary-subtle, with Lucide zap 12 in primary. It stands in for the power company's logo. ·· 3 Text lines: Kit Skeleton (Text), 8 tall and 9 apart. Widths of 148, 104 and 133 make them read as words. The heading line is 10 tall. ·· 4 Table: Kit Skeleton (Card), 148 x 70: the charges table. ·· 5 Accent: The one blue moment: a 3 px scan line in primary, 8 past the paper on each side, under a flat 180 x 40 glow of primary at 10%. ·· 6 Badge: A 52 circle, white, with a 1 px line edge, centred on the paper's bottom edge 4 in from the right corner. It holds one thing: the kit Spinner, or one Lucide icon at 24.
- **5.1 Always list**: ALWAYS · White paper on the grey page or a soft tint · Kit Skeleton and Spinner parts, so greys match the app · Brand colours only, one primary accent · Lucide icons at 12 or 24
- **5.1 Never list**: NEVER · Stock art, people, hands or emoji · Gradients or drop shadows · Real figures or words on the paper · More than one badge
- **5.2 subsection**: 5.2 · The rest of the set · Four drawings for the ways to add a bill on S03. Reading your bill, above, is the fifth.
- **5.2 tiles**: Upload the PDF / Screens: S03 ·· Take a photo / Screens: S03 ·· Forward the email / Screens: S03 ·· Connect your Northgrid account / Screens: S03
- **5.2 placeholder**: Drawn in the S03 redesign
- **_Retired note**: Kept because the v1 archive uses it. Do not use.
- **_Doc kit rules block**: No brand/primary outside a stage. · Every fill and stroke is bound to a variable; hex appears only as text. · A stage holds at most 3 measures, and pills sit at least 8 from a specimen. · Stage heights are fixed per row.

## Illustrations

### Illustration / Reading your bill (re-framed main component)
- Concept: The S04 drawing the user approved becomes the one main component for the illustration language, and appears once on the page, in 5.1.
- Construction: Frame 224 x 258, no fill, clip off. It is made of:
- Paper: 180 x 232 at 22,0. Radius 14, library card fill, 1 px brand/line inside stroke. Vertical auto layout, padding 16, gap 9.
- Head: a Logo chip, 22 x 22, radius 6, in primary-subtle, with Lucide zap 12 in primary; an 8 gap; then a Skeleton Text 116 x 10.
- Skeleton Text lines, 8 tall: 148, 104 and 133 wide.
- Skeleton Card, 148 x 70.
- Two more Skeleton Text lines: 118 and 81 wide.
- Scan glow: a flat rectangle, 180 x 40, at 22,80. Primary, layer opacity 10%. Not a gradient.
- Scan line: 196 x 3 at 14,118, radius 2, primary.
- Spinner badge: a 52 circle at 172,206. Card fill, 1 px line stroke, holding the kit Spinner size-6.
All positions are the S04 measurements moved 12 to the right. The paper is then centred and the badge sits inside the frame. In 5.1, six _Doc / Anchor dots sit on the parts, with leaders to Callouts 1 to 6 at stage x 400.
- Hover: None. Static doc page.
### R1 surfaces diagram
- Concept: The grey page and white cards rule at a glance, including the nested panel radius.
- Construction: On a 384 x 280 surface-muted stage:
- A dashed 1 px ink-muted vertical line at x 24, the 'screen edge'.
- Card A: white, 240 x 96, radius 16, at 40,40. It holds one Skeleton Text line (8 tall, 60% width) and a primary-subtle panel, 208 x 40, radius 12, at 16 padding.
- Card B: white, 240 x 56, radius 16, 12 below card A, holding two Skeleton Text lines.
- Three Measures: '16', '12' and 'r16'. Each sits 8 or more from the cards.
- Hover: None.
### R5 reach diagram
- Concept: On task screens, the main action belongs in the thumb's natural zone, and targets are at least 44.
- Construction: A phone outline, 96 x 192, radius 20, white, with a 2 px brand/line stroke, clip on. Its bottom 64 is a primary-subtle rectangle holding a 72 x 12 primary pill, centred, with Measure 'Main action'. 24 to its right is a 44 x 44 square, dashed 1 px ink-muted, with Measure '44 min'. The group is centred in the 588 x 280 stage.
- Hover: None.
### Money baseline annotation (2.1)
- Concept: Teaches the real rule: within one amount, the ₹ and the digits share a baseline, and the ₹ is about 70% of the size.
- Construction: Under the XL variant only: a dashed 1 px ink-muted line from the ₹'s left edge to the last digit's right edge, on the text baseline, with Measure 'Digits and ₹ share a baseline' 8 past its right end. Callout 1 sits on the ₹, with a leader up to Measure '₹ at 34 (71%), ink-muted' above the set. That is two measures in total.
- Hover: None.
### Add-bill placeholder tile (5.2)
- Concept: Holds a slot for each S03 drawing that does not exist yet, without looking unfinished.
- Construction: Inside a 282 x 240 stage (padding 24): a 234 x 192 rectangle, radius 12, no fill, 1 px dashed brand/line stroke (4/4). Centred in it: Lucide image 24 in ink-muted, then 'Drawn in the S03 redesign' 8 below in Text-sm/Regular ink-muted. When the drawing exists, replace the rectangle with its main component at 1x: 'Illustration / Add bill / Upload PDF', '/ Take a photo', '/ Forward email' or '/ Connect account'.
- Hover: None.

## New screens

### 00 Cover
- Purpose: Says what the page is (only Ohm's additions, on two named kits), gives the version, and links to each section. No drawing and no cards, so it reads calm and professional.
- Layout: A 1440 board, about 600 tall, padding 120. On the left, span 6: eyebrow chip, title, lede and a meta line. On the right, span 5: CONTENTS with 5 linked rows, 64 tall, separated by line rules.
### 01 Colour
- Purpose: The 13 brand tokens grouped by job, each with what it replaces, real contrast and real usage (taken from a binding scan), plus the shadcn rebrand map.
- Layout: Header, then 1.1: four group rows, each a label column (span 3) plus swatches at span 3, 282 x 200 (224 for status pairs). Then 1.2: a 3-column table with 5 rows and three notes. About 1,950 tall.
### 02 Type
- Purpose: The one custom type move, how money is set, shown on the main Ohm / Amount component; plus six text roles mapped to library styles.
- Layout: Header, then 2.1: a 1200 x 240 stage holding the Amount set, with labels and 2 annotations, and a 3-line note. Then 2.2: a 4-column table with 6 rows and a footnote. About 1,320 tall.
### 03 Rules
- Purpose: Five habits: surfaces, buttons, tones (including pending), plain words, reach. Each has a small specimen sized so nothing overlaps.
- Layout: A 3 + 2 grid: three span 4 cards (stage 384 x 280), then two span 6 cards (stage 588 x 280). Captions have a note and a row of chips. About 1,310 tall.
### 04 Components and patterns
- Purpose: Every local component (except Amount and Tone badge, which live with their rules) and the four patterns that stay copies, grouped by job.
- Layout: 4.1 Chrome: Status bar and Bottom nav (stage 290). 4.2 Reading the bill: 4 patterns in a 2 x 2 grid (stages 220 and 340). 4.3 Paying and records: 4 components in a 2 x 2 grid (stages 320 and 280). All cards span 6. About 2,910 tall.
### 05 Illustrations
- Purpose: How Ohm draws, measured from the S04 drawing, which now lives here as the main component, and the four add-bill drawings.
- Layout: 5.1: a span 7 stage (690 x 400) with the 1x main and 6 anchored callouts, beside a span 5 legend with Always and Never lists. 5.2: four span 3 cards (stage 282 x 240), with a dashed placeholder until each drawing exists. About 1,280 tall.
### _Doc kit and _Retired (off the boards, unpublished)
- Purpose: Doc-only helpers, so every header, caption, swatch, callout and measure is identical. Also keeps the Top bar alive for the v1 archive without showing it in the doc.
- Layout: '_Doc kit' sits at x 1600 (white, radius 24, padding 48). It holds Section header, Subsection title, Caption (Status variant), Swatch (Type variant), Anchor, Callout, Measure and the doc rules text. '_Retired' sits below it and holds Top bar 5:2873, unchanged, with its note.

## Interactions

- Click a contents row title on 00 Cover (a text hyperlink to a top-level board) -> The canvas jumps and zooms to that board, 01 to 05.
- Click 'Contents' in any section header (a text hyperlink) -> Jumps back to the 00 Cover board. It is a text link, not an icon-only button, because Figma canvas links can only be attached to text.
- Click a screen code in a caption's 'Screens:' line (each code is hyperlinked to its frame) -> Opens that frame on the Screens page, so the piece can be seen in place.
- Click 'Source of truth' in the cover meta line -> Jumps to the Source of truth page frame, which holds the keys, node IDs and change log (including the Top bar retirement).
- Select a swatch chip, a rebrand-table chip or any doc fill -> The right panel shows the bound variable (for example brand/primary-subtle) and, after the build, its description: the same use line as on the page.
- 'Go to main component' on any Ohm instance on a screen -> Lands in the stage that explains it: Amount in 02 Type, Tone badge in 03 Rules, and Status bar, Bottom nav, Early payment, Day bar, Choice card and Key-value row in 04. Reading your bill lands in 05.
- Alt-drag a Pattern specimen in 4.2 -> Makes a plain copy to paste into a screen. The Pattern badge and the 'Copied from' meta line show it is a copy, not an instance.
- Drag a Component from Assets > Local components -> Places an instance. Variants and text properties cover every state shown on the page, so nothing needs detaching.
- Shift+2 with a board selected -> Zooms to that one board. Each section is a top-level frame, so screenshots and reviews can be done one section at a time.

## Research

- Mintlify (Components Reference) https://mobbin.com/screens/672becaf-60b4-48c4-b8d1-493b35f502ec: The doc chrome is black and grey; colour lives only inside the framed previews, and each entry is a name, a one-line purpose and a framed specimen. Adopted: 'no brand/primary outside a stage', and the stage-then-caption Spec card.
- Replit (Design System overview) https://mobbin.com/screens/c1bcbebb-1647-434a-9222-e97fc5498b20: A neutral overview page with grouped cards (palette, type, components, in use). Brand colour appears only in specimens. It confirms the neutral boards and grouping by job.
- Framer (component canvas) https://mobbin.com/screens/e4efb3d1-f2db-4a17-8de7-bfbf37287b12: Variants sit on a plain canvas with small muted labels and nothing else. Adopted for the component stages in 04, which show main sets as they are, without extra frames or measures.
- Claude (design system file list) https://mobbin.com/screens/f4221e3c-92ce-4e02-bf02-033ffe51aba4: A few top-level groups keep a system scannable. Adopted as five numbered sections, each its own board.
- MagicPath (Colors) https://mobbin.com/screens/299b6137-7224-4096-a88b-04b73f851f5f: Swatches are grouped by role, each with its value and its job. Adopted for the Action, Text, Surface and Status rows.
- Arcade (Brand Kits, Colors) https://mobbin.com/screens/06627ceb-2848-4b40-a621-f79c0c805458: An ungrouped wall of hex-only swatches, which is what the current page looks like. Avoided: every token carries what it replaces, its real contrast and its real use.
- AirOps (Typography) https://mobbin.com/screens/8dd57bc3-32bd-45cb-8be6-981cf9a02564: Type is shown as role rows with a live specimen. Adopted for the 6-row Text roles table, in place of an 11-style ramp.
- Clerk (numbered steps) https://mobbin.com/screens/382be08d-b9cd-412e-b88f-aca632720e08: Numbered markers on one side, the artefact on the other. Adopted for the 5.1 anatomy: anchors on the drawing, callouts in a column, legend beside it.
- IBM Carbon and Material 3 anatomy sections (carbondesignsystem.com, m3.material.io; not on Mobbin) : Component anatomy is a single specimen with numbered markers and a matching numbered list. Colour roles are shown as container and on-container pairs. Adopted for 5.1 and for the Status pair swatches.
- Atlassian Design System (atlassian.design; not on Mobbin) : Ohm's neutrals and tone pairs use Atlassian colour values, and Atlassian documents tokens by job, with what they replace and how to pair them. The same treatment fits here.
- Shopify Polaris and GOV.UK Design System (not on Mobbin) : A short rationale first, then plain do and don't. Adopted for the rule cards and the R4 Do / Don't stage.
- PhonePe and Paytm payment status screens (pattern knowledge, not searched this round) : Indian payment apps show 'pending' in amber with a clock, and success in green. This is why pending stays on the warning pair with a clock, rather than getting a new colour.

## Code notes
I only read the file; nothing in Figma was changed. I read these facts on 13 Oct 2026, using read-only plugin queries on fileKey mwmHwXDuayUYeliDAlv3Fo.

Page and components
- Page 'Foundations' (5:1266) holds one frame, 'Foundations' (5:1282). Its title is 'Ohm foundations', and it contains Palette, Type ramp, Rebranded Button and Local components > Components row. There is no Section and no stray text.
- Status bar 5:2866 (393 x 62) has 25 instances: 12 on Screens, 12 on 'v1 · Screens · 13 Oct', and 1 on 'v1 · Foundations · 13 Oct'.
- Bottom nav 5:2903 is 425 x 238, with variants Active=Bills (5:2881) and Active=Trends (5:2892), each 393 x 95. It has 3 instances on Screens and 3 on the v1 archive.
- Top bar 5:2873 has 1 instance, on the v1 Foundations archive page. That is why it moves to '_Retired' and is not deleted.

Brand variables
- primary 5:1253, primary-subtle 5:1254, ink 5:1255, ink-strong 5:1256, ink-muted 5:1257, line 5:1258, surface-muted 5:1259, success 5:1260 / 5:1261, warning 5:1262 / 5:1263, danger 5:1264 / 5:1265.
- danger and danger-subtle are bound nowhere.
- primary-subtle is used for: S01 Avatar NK and Deadline strip, S04 Logo, S06 and S13 'Card / early payment' (fill, plus a stroke in the same token, so no visible edge), and S10 'Choice / Pay by 8 Sep'.
- ink-strong is used for the amounts (S01, S06, S10, S11, S13) and the card headlines on S06, S08 and S13.

Contrast (WCAG, computed)
- primary on white 5.18; on surface-muted 4.62; on primary-subtle 4.499. White on primary 5.18.
- ink on primary-subtle 12.26. ink-muted on white 7.66; on surface-muted 6.83.
- success / success-subtle 5.76. warning / warning-subtle 5.54. danger / danger-subtle 5.74.
- line on white 1.34. White on primary-subtle 1.15.

Amounts as built
- S06 and S13: ₹ 34 + digits 48 (Text-5xl/Semi Bold).
- S01: ₹ 26 + digits 36 (Text-4xl).
- S10: ₹ 18 + digits 24 (Text-2xl).
- S11: 'Paid ' at 30, ₹ at 24, digits at 30 (Text-3xl).
- The ₹ glyphs have no text style.

Day bar (S06)
- Seven 43 x 8 parts, radius 4, gap 4. Gone: SliderRange in primary. Still to come: SliderTrack in library background, no stroke.
- '5 days left' is 14 px primary text after a clock, on primary-subtle.
- The late line reads '₹45,527 more'.

S01
- Content gap 16. Cards have padding 20.
- Deadline strip: padding 10/12, radius 12, with a leading clock.
- Badge '5 days left' (Warning) has no icon. 'Saved ₹32,480' has no icon.
- Chart title 'Usage, last 12 months' is 14 Semi Bold.
- 'View bill' is 321 x 50 at y 336.

Other screens
- On task screens the primary sits at y 716 (y 744 on S10). The secondary is 44 tall, 8 below.
- S10 choice cards: radius 14, 361 x 118 (selected, 2 px stroke) and 361 x 90 (1 px).
- S11 'Paid, waiting for Northgrid to confirm' has no icon. The S11 Content gap of 20 sits between the Result header and the receipt card, which is not card to card, so it is not a violation.
- The 28-tall buttons in S03 and S07 Items are hidden wrappers, so tap targets are fine.

S04 drawing, 'Bill preview (scanning)'
- Frame 200 x 250, no clip.
- Paper 180 x 232 at 10,0: radius 14, card fill, line stroke, padding 16, gap 9.
- Logo 22, r6. Skeleton widths 116 (10 tall), 148, 103.6, 133.2, Card 148 x 70, 118.4, 81.4.
- Glow: SOLID primary at layer opacity 0.1, 180 x 40 at 10,80. Not a gradient.
- Scan line 196 x 3 at 2,118.
- Badge 52 at 160,206. It overhangs the frame by 12 on the right and 8 at the bottom.

rebrand.js map, confirmed: primary and ring to primary; foreground and card-foreground to ink; muted-foreground to ink-muted; border and input to line; muted and secondary to surface-muted. It skips layers named 'iOS /'. The library file is 'iOS and iPadOS 27' (hdZ6gl53iy8j2XNelFxm2i).

Build order
1. Screen fixes 1 to 10 on the working Screens page only.
2. Create the Ohm / Section label style. Promote the 6 components and the drawing, then swap the working screen instances. Never edit 5:2866 or 5:2903.
3. Fill in variable descriptions and scopes.
4. Build '_Doc kit'.
5. Build boards 00 to 05. Place the main sets in their stages: Amount in 2.1, Tone badge in R3, and the rest in 04 and 05. Move 5:2866 and 5:2903 into the 4.1 stages unchanged.
6. Copy the 4.2 patterns from the screens as they stand after step 1, with reactions stripped, and fill in 'Copied from ... on <build date>'.
7. Move 5:2873 to '_Retired'. Delete 5:1282.
8. Add the hyperlinks last.

Verify
- Screenshot each board at scale 0.5.
- Read-only scan: 0 unbound SOLID paints outside kit instances.
- Text scan: 0 em or en dashes.
- No brand/primary binding on doc chrome: everything outside the 'Stage' frames.
- Check every 'Screens:' line against getInstancesAsync results.
- Log the work in DECISIONS.md under 'Foundations rebuild', and add a change-log line to Source of truth.

Mobbin notice returned with the search, reproduced as given:
---

**Your Mobbin AI usage is high this month**

Usage is unlimited during beta. If your usage stays at this level, you may need to purchase more credits once limits take effect. [View usage and plan options](https://mobbin.com/settings/billing-and-usage)

## Open questions

- Promotion: this spec promotes six patterns (Amount, Tone badge, Day bar, Early payment, Choice card, Key-value row) and the S04 drawing to local components, and swaps the working screens to instances, so the page cannot drift from the screens. Confirm. If not, those cards switch to status Pattern with a 'Copied from S.. on <date>' line, and 02 and 03 show copies.
- Pending tone: kept on the warning pair with the clock icon, which matches the PhonePe and Paytm convention, and S11's success header carries the overall result. Alternative: a neutral pending badge (surface-muted fill, ink text, clock), so amber means only 'look at this'. Pick one before S11 is finalised.
- ₹ sizes (34 / 26 / 18) are size overrides, not styles. Snap them to library sizes (Text-3xl 30, Text-2xl 24, Text-lg 18) so they are style-bound? The XL ₹ would drop from 71% to 63% of the digits.
- July data: S01 shows 'Saved ₹32,480', but ₹35,88,340 minus ₹35,53,720 is ₹34,620, a gap of ₹2,140. The page avoids the figure. Please confirm the July numbers before S01's past-bill badge is final.
- Length: the boards total about 9,400, against the critic's 7,500 target. Duplication and padding are gone. The extra length comes from roomier stages (the critic's own overlap fix) and six new component cards. If it must be shorter, the first cut is 2.2 Text roles (about 510).
- Disagreement: the critic asked for an icon-only Icon Button for 'Back to contents'. It stays a text link, 'Contents' with an arrow-up icon, because Figma canvas hyperlinks can only be attached to text.
- Chart contrast: past-month bars stay brand/line (1.3:1 on white), stated as context, because S01's caption and S12's stat rows carry the numbers in words. If every bar must meet 3:1, add a 14th token (a mid grey) only for past bars.
- Day bar: the new 1 px line edge gives the segments still to come some definition, but white on primary-subtle is still about 1.15:1. The '5 days left' badge carries the count, so the bar is a supplement. Accept?
- The add-bill drawing sizes are not fixed yet. The 5.2 stages assume each fits 234 x 192 at 1x; if one is taller, all four stages grow together.
- The S09 share preview card is also custom. Add it to 4.2 as a fifth pattern if it survives the S09 redesign?
- Present mode is dropped: boards are top-level frames, so canvas links and Shift+2 cover review. Say if a click-through presentation is wanted.
- The screen fixes listed in the layout overlap with the other screen-redesign passes. Run them in those passes, or let the Foundations build own them?