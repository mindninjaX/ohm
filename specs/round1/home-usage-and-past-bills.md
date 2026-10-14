# home-usage-and-past-bills

## Summary

The usage card goes back directly under the August bill card, so the fixed chart shows in full on the first screen (card at y 430 to 752; the tab bar starts at 769). It also reads as "why this bill changed". The card leads with "Up 1.8% from July", using S06's wording, and gives both real numbers. Under that is a 13-point line on a scale that runs from the lowest month to the highest, not from zero. Five points are labelled: Aug 2025, Highest in May, Lowest in Feb, Jul and Aug 2026. A footnote says the units came from the usage table printed on the August bill. The card holds no hidden gestures and every touch target is 44 pt. Past bills sits below the card and lists only bills paid with Ohm, so today that is July 2026, now with the right year. It links to a new All bills screen, and the July row opens a short paid-bill screen that shows only facts we have.

## Layout

FRAME S01 Home: 393 x 852, fill surface-muted #F1F2F4, vertical scroll, content height 1,036.
- Set Status bar - iPhone 17 Pro and Tab Bar - iPhone (Bills selected) to "Fix position when scrolling".
- NEW "Scroll edge" frame: 393 x 70 at y 0, fixed, layered above the content and below the status bar. Linear gradient #F1F2F4: 100% at 0, 100% at 54, 0% at 70. In code this is .scrollEdgeEffectStyle(.soft, for: .top). Cards no longer scroll hard under the clock.
- Gutter 16. Cards 361 wide, white, radius 16, no border.

ORDER: this is the original order, kept on purpose:
- header row 70 to 114 (unchanged)
- August bill card 130 to 406 (unchanged, covered by another spec)
- USAGE card 430 to 752
- PAST BILLS 776 to 920
The floating tab bar's top edge is at y 769 (measured on the S01 export), so the whole usage card is visible without scrolling, 17 clear. The Past bills header and the "All bills" link show on either side of the tab bar pill, which hints that she can scroll. Units and money stay apart through labelling: the card footnote says where the units come from, and the Past bills caption says which bills are listed.

A. USAGE CARD (y 430, 361 x 322)
White, radius 16, padding 8 top, 20 sides, 8 bottom, vertical auto layout. The card itself is NOT a button. It has no pressed state and no long press.

A1. Title row (y 438 to 482), 321 x 44, horizontal, space between, centred vertically.
- Left: "Electricity used", sm 14/20 Medium, ink-muted #44546F.
- Right: shadcn Button, Variant Link, "See trends", sm 14/20 Medium, primary #265CFF, no icon. It switches tabs and does not push, so it gets no chevron.
- The link's hit frame is 44 tall and hugs the text plus 8 padding each side. Use a -8 right margin so the text edge lines up with the content edge.
- Visual top padding is 20 (card top 430, text top 450).

A2. Headline row (482 to 510), 321 x 28, horizontal, gap 10, centred vertically.
- Icon: 28 x 28 circle, fill surface-muted #F1F2F4, holding Lucide arrow-up 16, stroke 2.25, ink-muted #44546F. The arrow is neutral because using more power is not bad news for a hotel. Amber stays reserved for money and deadlines.
- Text: "Up 1.8% from July", xl 20/28 Semibold, ink-strong #091E42, letter spacing -0.2 (measured 173 wide).

A3. Gap 4, then the sub line (514 to 534): "3,26,500 units in August. July was 3,20,800." sm 14/20 Regular, ink-muted, one line (measured 294 of 321). It mirrors S06's "July was ₹35,88,340."

A4. Gap 12, then the chart frame (546 to 692), 321 x 146 (see B).

A5. Gap 8, then the footnote row (700 to 744), 321 x 44, horizontal, gap 10, centred vertically. The row is one button, a sibling of the chart, not nested inside it.
- Illustration "Bill history chip", 28 x 36.
- Text stack, vertical, gap 0:
  - "From the usage table printed on your August bill", xs 12/16 Regular, ink-muted (measured 272 of 283).
  - "Where these numbers come from", xs 12/16 Medium, primary.
- No info icon and no chevron: the blue second line is the affordance.

Bottom padding 8, so the card ends at 752 (12 visual below the chip). Feb's label ends at 692 and the footnote text starts at 706, a 14 gap.

B. CHART FRAME (custom vector, 321 x 146, clip content off)
One series, so no legend: the card title names it. No axes, no gridlines, no area fill. The scale runs from the lowest month to the highest, so bars or a fill would exaggerate the changes.

Coordinates:
- Plot x runs 6 to 241, so the first ring sits flush with the text column at x 0.
- Plot y runs 46 (3,42,210) to 100 (2,61,320).
- The gutter, x 251 to 321, holds only the Aug 2026 label.
- x = 6 + i x 235 / 12, for i = 0 to 12.
- y = 46 + (3,42,210 - units) x 54 / 80,890.

Points (x, y):
- Aug 2025 (6.0, 60.7)
- Sep (25.6, 67.4)
- Oct (45.2, 61.3)
- Nov (64.8, 79.9)
- Dec (84.3, 74.4)
- Jan 2026 (103.9, 80.6)
- Feb (123.5, 100.0)
- Mar (143.1, 80.2)
- Apr (162.7, 63.7)
- May (182.3, 46.0)
- Jun (201.8, 52.3)
- Jul (221.4, 60.3)
- Aug 2026 (241.0, 56.5)

Line: one vector path, straight segments, stroke 2, primary #265CFF, round join and cap.

Markers: 5 of the 13 points only.
- Aug 2025, Feb and May: 8 x 8 circle, fill primary, 2 px white outside stroke (12 overall).
- Jul: 8 x 8 circle, fill white, 2 px primary outside stroke. This hollow ring is the comparison point for the headline.
- Aug 2026: 20 x 20 halo, fill primary at 16%, static, then a 10 x 10 circle in primary with a 2 px white outside stroke.

Labels: text never takes the line colour. Each two-line label is a vertical auto layout with gap 2. Line 1 is xs 12/16 Medium ink-muted; line 2 is xs 12/16 Semibold ink #172B4D.
- "Aug 2025" / "3,20,140": left aligned at x 0, top 15 (box 15 to 49; the ring top is 54.7).
- "Highest in May" / "3,42,210": centred on x 182.3, top 0 (box 140 to 225 by 0 to 34; the ring top is 40).
- "Lowest in Feb" / "2,61,320": centred on x 123.5, top 112 (box 84 to 163 by 112 to 146; the ring bottom is 106).
- "Jul": one line, xs 12/16 Medium ink-muted, centred on x 221.4, top 72 (below the ring and the halo).
- "Aug 2026" / "3,26,500": x 257, left aligned, 38 tall, centred on y 56.5 (top 37.5). Line 1 is xs 12/16 Medium ink-muted; line 2 is sm 14/20 Semibold ink-strong. It ends at x 318.7 (measured 61.7), inside 321.

Every label clears its marker ring by 6 and touches nothing else. This was checked in a rendered mock: label bounding boxes and card position 430 to 752 were confirmed in the DOM.

C. PAST BILLS (y 776)

C1. Section header row, 361 x 44 (776 to 820), space between, centred vertically.
- Left: "Past bills", lg 18/28 Semibold, ink-strong.
- Right: shadcn Button, Variant Link, "All bills", sm 14/20 Medium primary, with a trailing Lucide chevron-right 14 in primary, because it pushes a screen. Hit frame 44 tall.

C2. Gap 0, then a card at 820, 361 x 76, built from shadcn Item, padding 16, gap 12, centred vertically.
- Leading: 40 x 40 tile, radius 12, fill #F1F2F4, with Lucide receipt-indian-rupee 20, stroke 2, ink-muted.
- Content (fill width):
  - "July 2026", base 16/24 Medium, ink-strong.
  - "Paid 5 Aug 2026", sm 14/20 Regular, ink-muted.
- Right slot (vertical, right aligned, gap 2):
  - "₹35,53,720", base 16/24 Semibold, ink-strong, tabular figures.
  - Success Badge: height 20, padding 0 8, radius full, fill #DCFFF1, "Saved ₹32,480" in xs 12/16 Medium #216E4E.
- Trailing: Lucide chevron-right 16, ink-muted.
- Rule: newest first, at most 3 rows, with a Separator (#DCDFE4, 1 px, left inset 68) between rows.

C3. Gap 8, then the caption at 904 to 920: "Only bills paid with Ohm show here. The first was July 2026." xs 12/16 ink-muted, 4 side padding, one line (measured 343 of 353).
Bottom inset 116, so the content ends at 1,036 and the caption scrolls clear of the tab bar.

D. STATES

Component "Usage summary", property Direction. The circle is always #F1F2F4 with an ink-muted icon.
- Up: arrow-up, "Up {n}% from {previous month}".
- Down: arrow-down, "Down {n}% from {previous month}".
- Same (change under 0.5% either way): Lucide equal, "About the same as {previous month}".

Property Data:
- Chart: 3 or more months of units, as specified above.
- Two months: title row, headline, sub line, then gap 8 and "Ohm will draw your usage once it has 3 months." (sm 14/20 ink-muted, measured 318). No chart; the footnote stays. Card height 192.
- One month: title row, then "3,26,500 units in August" (xl 20/28 Semibold, no circle), then "Ohm will compare months when your next bill arrives." (sm 14/20 ink-muted, 2 lines), then the footnote.
- No usage table on the bill: footnote line 1 becomes "This bill has no usage table"; line 2 is unchanged.
- First load, with no data yet: shadcn Skeleton, Card shape, 361 x 322, radius 16.
- Updating while a new bill is read: keep the current card at 50% opacity and put a shadcn Spinner 16 left of "See trends". No skeleton flash (the dataviz rule: a refetch keeps the frame).
- Accessibility text sizes (AX1 and up): hide the Aug 2025, Highest and Lowest labels. Keep the line, the Jul ring, and the Aug 2026 dot with its label. The title, headline and sub line wrap and the card grows. Every value stays in S12's table.

Past bills:
- Empty: one row with the receipt-indian-rupee tile, "No paid bills yet" / "Bills you pay with Ohm will show here." and no "All bills" link.
- 4 or more bills: show the latest 3.

E. S12 TRENDS CONSISTENCY
- Units chart: the same line, colours, markers and five labels as Home, at full card width, plus a y axis:
  - domain 2,50,000 to 3,50,000;
  - solid 1 px #DCDFE4 gridlines at 2,50,000, 3,00,000 and 3,50,000;
  - tick labels xs 12/16 ink-muted, tabular, on the right.
  - This padded domain makes S12's line slightly flatter than Home's lowest-to-highest line. That is intended: on S12 the axis carries the scale, on Home the labels do.
- X ticks: xs 12/16 ink-muted under every point. Only where the year changes, use two lines: "Aug" over "2025", "Jan" over "2026", "Aug" over "2026". The rest are one line ("Sep", "Oct"...). The selected month's tick is ink-strong Semibold, not blue.
- The long-press scrub with its tooltip lives on S12 only: a hairline that snaps to months, and a tooltip with the month in ink-muted and the units in Semibold ink-strong.
- Stat rows: rename "Peak" to "Highest", add "Lowest", and use explicit years (see copy).
- Add a shadcn Accordion "Every month" under the stat rows: 13 rows, month left, units right, tabular figures. No value is then reachable only through the chart.
- Fix every 2024 to 2026 (see copy).

## Copy

- **Usage card title**: Electricity used
- **Usage card link (switches to Trends tab)**: See trends
- **Usage headline (Up, this demo)**: Up 1.8% from July
- **Usage headline template (Down)**: Down {n}% from {previous month}
- **Usage headline template (Same, under 0.5% change)**: About the same as {previous month}
- **Usage sub line**: 3,26,500 units in August. July was 3,20,800.
- **Chart label, first point**: Aug 2025 / 3,20,140
- **Chart label, highest point**: Highest in May / 3,42,210
- **Chart label, lowest point**: Lowest in Feb / 2,61,320
- **Chart label, comparison point**: Jul
- **Chart label, current point (gutter)**: Aug 2026 / 3,26,500
- **Usage footnote line 1**: From the usage table printed on your August bill
- **Usage footnote line 2 (link style)**: Where these numbers come from
- **Usage footnote line 1, bill without a usage table**: This bill has no usage table
- **Usage state, two months**: Ohm will draw your usage once it has 3 months.
- **Usage state, one month headline**: 3,26,500 units in August
- **Usage state, one month sub line**: Ohm will compare months when your next bill arrives.
- **VoiceOver, usage summary element**: Electricity used. Up 1.8% from July. 3,26,500 units in August. July was 3,20,800.
- **VoiceOver, chart (adjustable) label / value / hint**: Electricity used by month, August 2025 to August 2026 / August 2026, 3,26,500 units / Swipe up or down to hear other months. Double tap to open Trends.
- **VoiceOver, chart step examples**: May 2026, 3,42,210 units, highest. February 2026, 2,61,320 units, lowest. July 2026, 3,20,800 units.
- **VoiceOver, footnote button**: From the usage table printed on your August bill. Where these numbers come from. Opens an explanation.
- **Past bills section header**: Past bills
- **Past bills header link**: All bills
- **Past bill row title / description**: July 2026 / Paid 5 Aug 2026
- **Past bill row amount / success badge**: ₹35,53,720 / Saved ₹32,480
- **Past bills caption**: Only bills paid with Ohm show here. The first was July 2026.
- **Past bills empty state**: No paid bills yet / Bills you pay with Ohm will show here.
- **Past bills row added after August is paid**: August 2026 / Paid 3 Sep 2026 / ₹36,09,190 / Saved ₹32,971
- **Sheet title**: Where these numbers come from
- **Sheet close button (VoiceOver)**: Close
- **Sheet row 1 title**: Units: Aug 2025 to Aug 2026
- **Sheet row 1 description**: Your August bill lists the units used each month since August 2025. Ohm read that table.
- **Sheet row 1 description, bill without a usage table**: This bill has no usage table, so Ohm adds a month with each bill.
- **Sheet row 2 title**: Rupees: from July 2026
- **Sheet row 2 description**: That table has units only. Rupee history starts with July 2026, your first bill in Ohm.
- **Sheet button (Outline)**: See every month in Trends
- **All bills nav title (Large Title)**: All bills
- **All bills section 1 label**: To pay
- **All bills To pay row title / description**: August 2026 / Bill total, due 16 Sep
- **All bills To pay row amount / warning badge**: ₹36,42,160 / Save by 8 Sep
- **All bills section 2 label**: Paid in 2026
- **All bills paid row**: July 2026 / Paid 5 Aug 2026 / ₹35,53,720 / Saved ₹32,480
- **All bills explainer title**: Bills before July 2026
- **All bills explainer body**: Ohm started with your July 2026 bill, so earlier bills are not listed. Your units back to August 2025 are in Trends.
- **All bills explainer link**: See usage in Trends
- **All bills summary tiles (only once 2 or more bills are paid with Ohm; values after August is paid)**: Paid with Ohm / ₹71,62,910 / 2 bills  ·  Saved by paying early / ₹65,451 / On 2 bills
- **July 2026 screen nav title**: July 2026
- **July 2026 screen nav trailing button (same as S06)**: Northgrid · HT
- **July 2026 screen status badge**: Paid
- **July 2026 screen amount / date line**: ₹35,53,720 / paid on 5 Aug 2026
- **July 2026 screen success alert**: Saved ₹32,480 by paying early
- **July 2026 screen usage row**: Electricity used / 3,20,800 units in July / See trends
- **July 2026 screen button (Outline)**: View bill PDF
- **S12 stat rows**: Aug vs Jul +1.8% / Aug vs Aug 2025 +2.0% / Highest: May 2026, 3,42,210 / Lowest: Feb 2026, 2,61,320
- **S12 x axis ticks**: Aug (2025), Sep, Oct, Nov, Dec, Jan (2026), Feb, Mar, Apr, May, Jun, Jul, Aug (2026)
- **S12 y axis ticks**: 2,50,000 / 3,00,000 / 3,50,000
- **S12 table accordion title**: Every month
- **S12 info alert (year fix)**: Rupee history starts July 2026 and fills in as each bill arrives.

## Illustrations

### Bill history chip
- Concept: A tiny S04 bill page whose usage table, drawn as rows of numbers rather than bars, has its last row lit blue under the scan line. It sits at the start of the usage card footnote and says 'these units were read off the bill'.
- Construction: Frame 28 x 36, clip off.
- Page: rectangle 27 x 35 at (0.5, 0.5), radius 5, fill white, 1 px inside stroke line #DCDFE4.
- Header: tile 7 x 7 at (4, 4), radius 2, fill primary-subtle #E9EFFF; skeleton line 11 x 2 at (13, 6.5), radius 1, fill #DCDFE4.
- Table rows at y 14, 19 and 24: a month stub 7 x 2 at x 4 and a value stub 9 x 2 at x 15 (right aligned to x 24), radius 1, fill #DCDFE4.
- Highlight band: 26 x 6 at (1, 28), fill #E9EFFF (the S04 band).
- Last row at y 30: month stub 7 x 2 at x 4 in primary #265CFF at 45%; value stub 9 x 2 at x 15 in primary at 100%.
- Scan line: 28 x 1.5 at (0, 27.25), radius 0.75, primary.
On a 3x device this renders at 84 x 108 px and reads clearly as a page with a table (checked in the mock).
- Hover: None. It is static at this size. The animated version is 'Bill to chart' in the sheet.
### Bill to chart
- Concept: The S04 bill page with its usage table, the scan line passing over the last row, and an arrow into a small card that holds the same line as Home. It shows in one picture that the 13 months of units were read from the bill's table. Used at the top of the 'Where these numbers come from' sheet.
- Construction: Frame 300 x 120. Background rectangle 300 x 120, radius 16, fill surface-muted #F1F2F4.

Bill page, group at (14, 8): rectangle 84 x 104, radius 10, white, 1 px inside stroke #DCDFE4.
- Zap tile 16 x 16 at (8, 8), radius 5, fill #E9EFFF, holding Lucide zap 10 in primary.
- Skeleton bars (height 5, radius 2.5, fill #F1F2F4): 40 wide at (30, 13.5); 68 wide at (8, 32).
- Table rows at y 46, 56 and 66: a month stub 18 wide at x 8 and a value stub 26 wide at x 50, both fill #F1F2F4.
- Highlight band 82 x 15 at (1, 76), fill #E9EFFF.
- Last row at y 81: month stub 18 wide in primary at 40%; value stub 26 wide in primary at 100%.
- Scan line 96 x 2 at (-6, 75), radius 1, primary. It overhangs the page by 6 on each side, exactly like S04.

Arrow: 28 x 28 white circle centred at (136, 60), 1 px stroke #DCDFE4, holding Lucide arrow-right 16 (stroke 2) in primary.

Chart card, group at (174, 18): rectangle 112 x 84, radius 10, white.
- Skeleton title 36 x 5 at (10, 10), fill #F1F2F4.
- A 2 px primary polyline with round joins through: (10.0, 40.9) (17.3, 45.9) (24.7, 41.4) (32.0, 55.1) (39.3, 51.1) (46.7, 55.6) (54.0, 70.0) (61.3, 55.4) (68.7, 43.1) (76.0, 30.0) (83.3, 34.7) (90.7, 40.6) (98.0, 37.8). This is the real series, scaled the same way as Home.
- End point: a 14 x 14 halo in primary at 16%, and an 8 x 8 primary dot with a 2 px white outside stroke.
- Hover: No hover (this is iPhone). On sheet appear:
1. The scan line starts at y 44 and slides to y 75 (500 ms, ease-in-out).
2. As it arrives, the band fades in (150 ms) and the last-row stubs cross-fade from grey to blue.
3. The mini line then draws left to right (400 ms, ease-out) and the end dot fades in.
With Reduce Motion on, the final frame is shown static.
### Earlier bills stack
- Concept: One crisp bill page in front with a green check, for July 2026 paid with Ohm, and two faded pages behind it for the bills before Ohm. It illustrates the All bills explainer 'Bills before July 2026' in the S04 language.
- Construction: Frame 160 x 104, clip off.
- Soft tint: circle 104 x 104 centred, fill #E9EFFF at 60%.
- Back page 2: 64 x 84, radius 10, fill #F1F2F4, 1 px stroke #DCDFE4, placed at (26, 6), rotated -8 degrees around its bottom centre, opacity 60%. It carries skeleton bars 40 x 4 at (8, 30) and 28 x 4 at (8, 40), fill #DCDFE4.
- Back page 1: the same, at (37, 6), rotated -4 degrees, opacity 80%.
- Front page at (48, 6): 64 x 84, radius 10, white, 1 px stroke #DCDFE4.
  - Zap tile 14 x 14 at (8, 8), radius 4, fill #E9EFFF, with Lucide zap 9 in primary.
  - Skeleton bars (radius 2, fill #F1F2F4): 30 x 4 at (26, 13); 48 x 4 at (8, 30); 32 x 4 at (8, 40).
  - Amount block 48 x 12 at (8, 56), radius 4.
- Success badge: a 22 x 22 circle, fill #DCFFF1, with a 2 px white outside ring (26 overall), holding Lucide check 12 (stroke 2) in #216E4E. It is centred on the front page's bottom right corner (112, 90), the same placement as the S04 spinner badge.
- Hover: No hover. When the All bills screen appears, the back pages fan from 0 degrees to -4 and -8 degrees (300 ms, ease-out) and the badge scales from 0.6 to 1 (200 ms, after 150 ms). With Reduce Motion on, it is static.
### Paid bill page
- Concept: The front page of 'Earlier bills stack' on its own: a paid bill thumbnail on the July 2026 screen. Tapping it opens the PDF, just as tapping a picture of a document would.
- Construction: Frame 76 x 96, clip off.
- Page 64 x 84 at (0, 0), built exactly like the front page of 'Earlier bills stack': white, radius 10, 1 px stroke #DCDFE4, with the zap tile, three skeleton bars and the amount block.
- Success badge: 22 x 22, fill #DCFFF1, 2 px white ring, Lucide check 12 in #216E4E, centred at (62, 82).
It is a button (VoiceOver: 'July 2026 bill PDF') with a 44 minimum hit area.
- Hover: No hover. On push, the badge scales from 0.6 to 1 (200 ms, ease-out). With Reduce Motion on, it is static.

## New screens

### All bills
- Purpose: The one place every bill lives: the bill to pay now, then every bill paid with Ohm grouped by year. It answers 'if I paid more bills, where would I see them all', and says honestly why nothing before July 2026 is listed while those months' units are still in Trends.
- Layout: Frame 393 x 852, fill #F1F2F4.

Chrome:
- Status bar - iPhone 17 Pro.
- Toolbar - Top - iPhone, Style Large Title, with a leading glass back button (chevron-left, 44) and the title 'All bills'. The large title collapses to inline on scroll.
- Tab Bar - iPhone floats at the bottom with Bills selected.
- Gutter 16; content starts at y 152.

0) Summary tiles: hidden while fewer than 2 bills are paid with Ohm, which is the case today. One paid bill would only repeat its own row. From 2 bills on, two white cards (172.5 x 92, radius 16, padding 16, gap 16) sit at y 152 and push everything below down by 108:
- Left: 'Paid with Ohm' (xs 12/16 Medium ink-muted) / '₹71,62,910' (xl 20/28 Semibold ink-strong, proportional figures) / '2 bills' (xs 12/16 ink-muted).
- Right: 'Saved by paying early' / '₹65,451' in success #216E4E / 'On 2 bills'.

1) To pay (shown only while a bill is unpaid):
- Section label 'To pay', sm 14/20 Semibold ink-muted, 4 left padding.
- Gap 8, then a white card with one 76-tall Item row:
  - Leading: 40 tile, fill #E9EFFF, receipt-indian-rupee 20 in primary.
  - Text: 'August 2026' (base 16/24 Medium ink-strong) / 'Bill total, due 16 Sep' (sm 14/20 ink-muted, measured 133 of 139).
  - Right slot: '₹36,42,160' (base 16/24 Semibold tabular), with a warning Badge below it: fill #FFF7D6, #A54800 text, height 20, radius full, 'Save by 8 Sep'.
  - Trailing: chevron.
- 'Bill total' tells her that this amount is before any discount, unlike the paid rows below.

2) Paid in 2026, 24 below:
- Section label 'Paid in 2026', then gap 8 and a white card with the July 2026 row, identical to the Home row.
- One card per year, newest year first and newest month first. Rows are separated by a Separator inset 68.

3) Explainer, 32 below the last card: no card, centred, 329 wide.
- Illustration 'Earlier bills stack', 160 x 104.
- Gap 16, then the title 'Bills before July 2026' (base 16/24 Semibold ink-strong).
- Gap 4, then the body (sm 14/20 ink-muted, centred, 3 lines).
- Gap 12, then a shadcn Button, Variant Link: 'See usage in Trends' (sm 14 Medium primary, 44 hit).
- It ends near y 670, clear of the tab bar. Checked in the mock.
### July 2026 (paid bill)
- Purpose: The destination of the July 2026 row in Past bills and All bills. A short paid record built only from facts Ohm has: amount paid, date paid, amount saved, units used and the PDF. No breakdown, receipt or reference number is invented.
- Layout: Frame 393 x 852, fill #F1F2F4.

Chrome:
- Status bar.
- Toolbar - Top: the same instance and style as S06, with a leading glass back button, the title 'July 2026' and a trailing glass text button 'Northgrid · HT'.
- Tab Bar - iPhone (Bills selected) stays visible, because this screen has no sticky action.

1) Hero at y 126, left aligned, vertical:
- Success Badge 28 tall: padding 0 10, radius full, fill #DCFFF1, Lucide circle-check 14 in #216E4E, gap 6, 'Paid' in sm 14/20 Medium #216E4E.
- Gap 8, then '₹35,53,720' in the S06 hero text style (5xl 48/56 Semibold ink-strong, measured 263 wide).
- 'paid on 5 Aug 2026', base 16/24 ink-muted, mirroring S06's 'due 16 Sep'.
- To the right at (301, 126): illustration 'Paid bill page' 76 x 96, a button that opens the PDF.

2) At y 266: shadcn Alert in success styling, 361 x 56, radius 16, fill #DCFFF1, padding 0 16, gap 12. Lucide piggy-bank 20 in #216E4E, then 'Saved ₹32,480 by paying early' in base 16/24 Semibold #216E4E (measured 240). No description.

3) At y 338: a white card with one 76-tall Item row:
- Leading: 40 tile, fill #E9EFFF, zap 20 in primary.
- Text: 'Electricity used' / '3,20,800 units in July'.
- Right slot: Button Link 'See trends', no chevron.

4) At y 438: shadcn Button, Outline, pill, 361 x 50, white fill, 1 px #DCDFE4. Lucide file-text 18 plus 'View bill PDF' (base 16 Medium ink-strong).

Deliberately not shown: the July bill total, the charge breakdown, the payment reference, payment time or method (see open question 1).
### Where these numbers come from (sheet)
- Purpose: Opened from the usage card footnote. It explains in plain words, with a picture, why Ohm shows 13 months of units while rupee history starts in July 2026.
- Layout: Sheet - iPhone. Start from the Medium variant and set a custom detent of 548 tall (code: .presentationDetents([.height(548)])). The standard Medium detent is about 426 and too short; Large would be mostly empty. In iOS 26 the sheet floats inset from the screen edges.

Read the Content slot width W from the kit instance (about 377 when floating). All rows fill W with 20 side padding; text was measured at W - 40 = 337.

Top: the kit's grabber, then Toolbar - Top inside the sheet, Style Default, no title, with a trailing glass close button (Lucide x, 44).

Content:
- Heading 'Where these numbers come from', lg 18/28 Semibold ink-strong, left aligned (measured 291).
- Gap 16, then illustration 'Bill to chart', fixed 300 x 120, centred. It fits any W of 340 or more.
- Gap 20, then Item row 1, aligned to the top, gap 12:
  - Tile 32 x 32, radius 10, fill #E9EFFF, Lucide zap 16 in primary.
  - Title 'Units: Aug 2025 to Aug 2026' (sm 14/20 Semibold ink-strong), gap 2, then the description (sm 14/20 ink-muted, 3 lines at 293).
- Separator #DCDFE4, left inset 44, 12 above and 12 below.
- Item row 2: tile #F1F2F4 with Lucide indian-rupee 16 in ink-muted. Title 'Rupees: from July 2026', then the description (2 lines).
- Gap 24, then shadcn Button, Outline, pill, fill width x 50: 'See every month in Trends' (base 16 Medium ink-strong).
- 34 bottom safe area (Home Indicator).

The total of about 548 was checked in the mock.

## Interactions

- Tap 'See trends' on the usage card -> Switches to the Trends tab (S12) with Units selected and August 2026 selected on the chart. This is a tab switch, so there is no back button and the link has no chevron. Pressed state: text at 60% opacity for 100 ms.
- Tap anywhere on the chart frame (321 x 146) -> Same destination as 'See trends'. It is a plain button region, a sibling of the footnote and not nested in it, and has no long press. Pressed state: the chart at 60% opacity for 100 ms. Scrubbing the months happens only on S12.
- Tap the footnote row (chip + 'From the usage table printed on your August bill' + 'Where these numbers come from') -> Opens Sheet - iPhone at a custom detent 548 tall: 'Where these numbers come from'.
- Sheet: tap the glass close button (X, 44) or swipe down -> Dismisses the sheet back to Home. This is the only explicit dismiss; there is no 'Got it'.
- Sheet: tap 'See every month in Trends' -> Dismisses the sheet, then switches to the Trends tab with Units selected and the 'Every month' accordion expanded.
- Sheet appears -> The 'Bill to chart' scan line slides down over the table rows and the last row lights up blue, then the mini line draws (timings under illustrations). With Reduce Motion on, it shows the static final frame.
- Tap the July 2026 row in Past bills -> Pushes the new July 2026 paid-bill screen with a standard iOS push. Back returns to Home.
- Tap 'All bills' -> Pushes the All bills screen with a Large Title nav bar.
- All bills: tap the August 2026 row -> Pushes S06 August 2026 bill summary.
- All bills: tap the July 2026 row -> Pushes the July 2026 paid-bill screen.
- All bills: tap 'See usage in Trends' -> Switches to the Trends tab with Units selected.
- July 2026 screen: tap 'View bill PDF' or the 'Paid bill page' thumbnail -> Opens the stored July 2026 Northgrid PDF in iOS Quick Look, full screen, with Done and the system share button.
- July 2026 screen: tap 'See trends' -> Switches to the Trends tab with Units selected and July 2026 selected on the chart.
- July 2026 screen: tap 'Northgrid · HT' -> Same action as the identical button on S06 (connection details, defined in that spec).
- After the August payment (S11 'Done') -> On Home, the bill card switches to its paid state (another spec). In Past bills, 'August 2026 / Paid 3 Sep 2026 / ₹36,09,190 / Saved ₹32,971' slides in at the top above July (250 ms, ease-out). In All bills the To pay section disappears and the two summary tiles appear: Paid with Ohm ₹71,62,910 (2 bills) and Saved by paying early ₹65,451 (on 2 bills).
- Usage card first scrolls into view in a session -> The line draws left to right (600 ms, ease-out), then the 5 markers and labels fade in (150 ms). The halo stays static and does not pulse. With Reduce Motion on, the chart fades in over 200 ms.
- VoiceOver on the usage card -> Four elements in order. (1) The summary text (title + headline + sub line) read as one. (2) The chart as an adjustable element: swipe up or down to step through all 13 months, and double tap opens Trends. (3) The 'See trends' button. (4) The footnote button. None of them is nested inside another.
- Dynamic Type at AX1 and above -> The chart hides its Aug 2025, Highest and Lowest labels and keeps the Jul ring plus the Aug 2026 dot and label. The text wraps and the card grows. The sheet moves to the Large detent and scrolls.

## Research

- CRED (spends summary) https://mobbin.com/screens/7f33e880-f2cb-450b-a1bd-90def15a9e64: Indian fintech. It shows the month total with a 'from last month' delta, then a zero-based 12-month bar chart with a single scale label. The headline and delta pattern holds up and became A2 + A3. Its bars have the same failure as today's Ohm card (from zero, neighbouring months look identical), which is why B is a labelled line on a lowest-to-highest scale.
- CRED (payment history) https://mobbin.com/screens/ab402271-e150-4019-9362-5180c9873bc8: Indian fintech. Paid bills are grouped under a year header, with status and date on the left and the amount right-aligned. This is the source of the All bills 'Paid in 2026' grouping (one card per year) and of the right-aligned tabular amounts in the Past bills row.
- Swiggy (Dineout paid bill) https://mobbin.com/screens/4f9468e2-de48-4b6c-b18a-570e6de9a618: Indian app. A short paid record: a 'Paid on Aug 9, 2026' status line, then a green callout saying how much discount was availed. This maps directly to the July 2026 screen: 'paid on 5 Aug 2026' under the amount, then the green 'Saved ₹32,480 by paying early' alert.
- N26 (ETF detail) https://mobbin.com/screens/c3e57f61-99b9-42aa-98a9-4ed884d8228a: A line chart with no axis and no gridlines. Only the low (bottom left) and the high (top right) are printed at their points, and the line ends in a dot, with the current value and delta stated above. This is the model for B: label only the extremes and the endpoints, and let the text above give the answer.
- Lightyear (stock chart) https://mobbin.com/screens/de657ed3-e885-4eef-92b0-ac1d566798b2: The same min and max labelling on a full-bleed line, with a percentage badge at the top. It confirms that two labelled extremes are enough to read the range without a y axis, which is why Home drops the axis and S12 keeps it.
- Fi (smart collar app, not Fi Money) https://mobbin.com/screens/62ccbd04-2d0c-410b-96fd-7b26753762ec: Its 'Comparison' block names both periods in a sentence, then shows the delta next to a round icon. A separate 'No change' state uses a minus icon instead of an arrow. This is the source of the Usage summary Direction variants (arrow-up, arrow-down, equal in a neutral circle). Mobbin returned no Jupiter, Fi Money or Groww insight screens for this query.
- Quicken (net worth) https://mobbin.com/screens/ca8f4eff-8be8-4957-b00e-664b0ad2ce37: An honest 'Limited data available' warning sits above a chart with only one real month, followed by a month-by-month list. This backs the plain explanation of the short rupee history (sheet row 2, the All bills explainer) and the S12 'Every month' table.
- Ro (paid order) https://mobbin.com/screens/6f58e038-d679-44fc-8822-f60745bfb6a8: A paid record can be this short: 'Paid' as the title, the total, 'Paid on' with a date, and one 'Download receipt' button. This justifies the minimal July 2026 screen with a single 'View bill PDF' action instead of an invented receipt.
- Monzo https://mobbin.com/screens/e0ee1ad7-d20c-4667-89d4-0fc184537e39: The headline is a sentence with the number in it, placed before the chart. It supports A2 'Up 1.8% from July' leading the card, with the chart only confirming it.
- Lloyds Mobile Banking https://mobbin.com/screens/c792115c-8ac3-4bfd-bab8-ea72deb09752: The comparison chip names the period it compares against, not just a percentage. So every Ohm comparison names its month ('from July', 'Aug vs Aug 2025').

## Code notes
- **Derived numbers** (no other new figures):
  - Aug vs Jul: 3,26,500 - 3,20,800 = 5,700 units. 5,700 / 3,20,800 = 1.78%, shown as 1.8%.
  - Aug vs Aug 2025: 6,360 / 3,20,140 = 1.99%, shown as 2.0%.
  - Lowest is Feb 2026 at 2,61,320; highest is May 2026 at 3,42,210. Span 80,890.
  - After the August payment: ₹71,62,910 = ₹35,53,720 + ₹36,09,190, and ₹65,451 = ₹32,480 + ₹32,971.
  - Data gap found: ₹35,88,340 - ₹32,480 = ₹35,55,860, but July was paid at ₹35,53,720, a ₹2,140 difference (open question 1).
- **Formatting:**
  - Use en-IN grouping everywhere (Intl.NumberFormat('en-IN')).
  - Percentages have one decimal and are computed as (this month - comparison) / comparison.
  - Under 0.5% either way, use the Same variant.
- **Chart scale:**
  - Home's y domain is the lowest to the highest of the 13 values, so never add bars or an area fill.
  - If all values are equal, draw a flat line at the vertical centre.
  - S12's domain is padded to round numbers (2,50,000 to 3,50,000) and has an axis.
- **Label placement:**
  - First point: above, left aligned.
  - Highest: above, centred. Lowest: below, centred.
  - Previous month: a hollow ring with a month-only label below.
  - Current month: in the 70-wide right gutter, centred on its dot.
  - Every label sits 6 clear of its marker ring (12 from the point centre).
  - If the highest or lowest falls on the first, previous or current month, merge the two into one label, e.g. 'Highest, Aug 2026' / '3,26,500', so no point gets two labels.
- **Data sources:**
  - The units series is tagged source = printed_history (the consumption table on the latest bill) or bill_read.
  - The rupee series, Past bills and All bills come only from bills paid with Ohm (paid_via_ohm = true), sorted by bill month descending. Home shows at most 3.
- **Dataviz checks:**
  - Ran validate_palette.js on #265CFF in light mode: PASS on lightness band, chroma floor and contrast (3:1 or more vs the surface).
  - One series, so no legend; the title names it.
  - Text uses ink tokens only.
  - Status colours appear only on the savings badge and alert (success) and the deadline badge (warning), always with words. The usage direction is neutral grey with an icon and words.
  - Markers are 8 or more with a 2 px white ring.
  - No value is chart-only: the summary text, VoiceOver and S12's table carry them all.
- **Figures:** tabular figures only for amounts in lists and for axis ticks; proportional for hero and headline numbers.
- **Touch targets:** all 44 pt or more, and nothing tappable is nested inside another tappable.
- **Date sweep outside this area,** so 2024 does not come back:
  - S04: 'Found Northgrid Electric, August 2024'.
  - S06: nav title 'August 2024'.
  - S11: '3 Sep 2024', 'August 2024' and the UTR 'HDFCR52024090312345' (change to HDFCR52026090312345).
  - S12: axis 'Aug 23 / Jan 24' and the alert 'July 2024'.
- **Reference mock** (checked layout, not for shipping), in the scratchpad at /private/tmp/claude-501/-Users-rishabh-Library-Application-Support-Claude-scratch-workspaces-9c4eea18-feee-455b-a67c-b13ccf85af10-714122a7-056f-4a19-8b2d-fbcdde77ac2e-scratch-2026-10-13-d2e060/c08145fa-03b6-4be8-8346-381546d89ab2/scratchpad/s01v2/:
  - mock.html and mock.png
  - home.png, sheet_all.png, july.png and ill.png
  - log.txt, the measured label bounding boxes and card position
- **Figma:** no Figma nodes were changed.

## Open questions

- DATA, please resolve first: the July figures do not reconcile. ₹35,88,340 (July bill) minus ₹32,480 (saved) is ₹35,55,860, but July was paid at ₹35,53,720, which is ₹2,140 less. Until you confirm the right numbers (or the extra adjustment that explains the gap), the July 2026 screen shows only the amount paid and the amount saved, and never the bill total beside them. S12's Rupees tab should not plot the July bill total and the paid amount together either.
- I disagree with renaming the first chart label 'Last August'. I kept 'Aug 2025'. In September 2026, 'last August' can easily be read as the August that just ended (2026), which is the exact point it must not be confused with. The explicit year also pairs visibly with 'Aug 2026' at the other end of the line, and it matches S12's ticks and the 'Aug vs Aug 2025' stat row.
- Decided, open to reversal: the headline compares with July, not August 2025. July is the comparison that explains this bill's rupee change (S06: 'Up 1.5% from July because you used 1.8% more electricity'), and it is the bill she paid. The year-on-year pair is visible on the chart's two ends, and S12 states it as +2.0%. If you would rather lead with the year-on-year comparison for a seasonal hotel, the Direction template takes any comparison month: 'Up 2.0% from Aug 2025', with the sub line 'Aug 2025 was 3,20,140.'
- Tapping the chart also opens Trends, the same as 'See trends'. It is not nested and has no long press, but if you want exactly one way in, delete the chart tap and keep the link.
- Is 0.5% the right threshold for 'About the same as {month}'? At 1.8% this demo shows the Up variant either way.
- The July 2026 screen's 'View bill PDF' assumes Ohm kept the July PDF when that bill was paid through Ohm. Please confirm. If not, drop the button and the thumbnail's tap.
- The usage arrow is now neutral grey, while S06's 'Up 1.5% from July' keeps its amber circle. The rule is that amber means money: S06 is about rupees, the Home card is about units. Please confirm that S06 should keep amber.
- The All bills badge says 'Save by 8 Sep' while the Home bill card says '5 days left'. Should they use the same words? I prefer the date, because '5 days left' is unclear without the discount line next to it.
- Should All bills let her add older bill PDFs so that rupee history reaches back before July 2026? I left it out because it would be a new feature; the explainer only points to Trends for older units.