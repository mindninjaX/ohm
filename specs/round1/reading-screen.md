# reading-screen

## Summary

S04 stays as calm as today: a soft skeleton bill, a 4-row checklist and one caption. Each row gets a single quiet chevron, and the illustration now reads as an Indian HT bill. A leading glass xmark closes the screen while Ohm keeps reading, which is what the caption already promises. A separate ghost button, "Stop reading this bill", opens a short confirmation sheet for the wrong-file case. Rows change tense as they finish, from "Finding your bill" to "Found Northgrid's August bill". Tapping a row opens plain-language sub-steps with the bill's real numbers, and the illustration zooms to the part of the bill that row reads. New flagged and failed states keep the details truthful when a check does not pass.

## Layout

GLOBAL
- Every S04 frame is 393 x 852 with fill surface-muted #F1F2F4.
- S04 is a full-screen modal that slides up from S03. No tab bar.
- Bind every fill to a brand or library variable. No raw hex.
- Fixed layers: Status bar, Toolbar, Footer, Home Indicator.
- Skeleton tones:
  - Skel = line #DCDFE4.
  - Skel-soft = surface-muted #F1F2F4. It replaces the kit Skeleton's unrebranded #F5F5F5, which I measured on today's export.

S04a-3 READING, MATHS STEP (hero frame; the other beats are in new_screens)
1) Status bar - iPhone 17 Pro. y 0, h 62.

2) Toolbar - Top - iPhone, Style=Default. y 62 to 116 (kit height).
- Leading slot: ONE glass icon button, SF Symbol xmark, 44 x 44. Use the same instance as the S03 sheet close. Layer name "Close".
- Title: "Reading your bill".
- Trailing slot off. No back chevron.
- Why xmark, and why leading:
  - S04 is a modal task, so there is nothing to go back to. The S03 sheet and the file picker are already gone.
  - The word "Cancel" would suggest the reading gets thrown away, but closing keeps it running.
  - iOS 26 puts the dismiss xmark top-leading (Notes scanner, Careem, our own S03 sheet). Trailing is reserved for confirm.

3) Illustration / Bill instance: Size=Hero, Focus=None, Status=Reading, Scan=Maths.
- Frame 240 x 290 at x 81, y 136.
- The 200 x 264 page lands at x 97, y 136 to 400, centered on screen.
- The badge ends at y 426.

4) Steps card at x 16, y 450, w 361, h 219.
- White library card, radius 16, no stroke.
- Vertical auto layout: padding 4 top/bottom and 16 sides, gap 0.
- Children in order: Row 1, Separator, Row 2, Separator, Row 3, Separator, Row 4.
- Separators: kit Separator, line #DCDFE4, 1 px, left inset 32 so they start under the titles.
- Height = 4 + (4 x 52) + 3 + 4 = 219, so the card ends at y 669.
- Rows in S04a-3:
  - Row 1: Done, "Found Northgrid's August bill"
  - Row 2: Done, "Read every line of the bill"
  - Row 3: Active, "Redoing the maths"
  - Row 4: Pending, "Running the 6 checks"

5) Caption at x 32, y 685, w 329.
- Inter 14/20 (text-sm) Regular, ink-muted #44546F, centered.
- 2 lines, ending at y 725.

6) Footer (fixed).
- Button Variant=Ghost, pill, 44 tall, hug width with 20 side padding (about 178 wide), centered, at y 762.
- Label: Inter 14/20 Medium, ink #172B4D. Layer name "Stop reading".

7) Home Indicator, y 818 to 852.

Rhythm:
- toolbar to page: 20
- badge to card: 24
- card to caption: 16
- caption to footer: 37
- footer to home indicator: 12

STEP ROW (new local component "Step row", built on the kit Accordion item)
Properties:
- State = Pending | Active | Done | Flagged | Failed
- Open = False | True
- Title (text)
- There is no caption and no counter, so the collapsed card looks like today's checklist plus one chevron.

Structure: vertical auto layout, Header then Content.

Header:
- Horizontal auto layout, fixed height 52, padding 15 top/bottom and 0 sides, gap 12, center aligned, full width.
- The whole header is the tap target.
- Leading 20 x 20 icon:
  - Pending: Lucide circle-dashed, ink-muted
  - Active: shadcn Spinner 20, primary #265CFF
  - Done: Lucide circle-check, success #216E4E
  - Flagged: Lucide triangle-alert, warning #A54800
  - Failed: Lucide circle-x, danger #AE2E24
- Title: fill width, Inter 16/22 (text-base), 1 line.
  - Pending: Regular, ink-muted
  - Active: Medium, ink
  - Done: Regular, ink
  - Flagged: Medium, warning
  - Failed: Medium, danger
- Trailing: Lucide chevron-down 16 in ink-muted. When Open=True, swap the icon to chevron-up; do not rotate it.
- Title room is 329 - 20 - 12 - 12 - 16 = 269. The longest title, "This bill is for another account", measures 231 (Inter metrics, calibrated against the export).

Content (only when Open=True):
- Vertical auto layout. Padding 0 top, 0 right, 16 bottom, 32 left, so it sits under the title.
- An intro line in Inter 14/20 Regular ink-muted, then gap 12, then the Step detail list with gap 10.

STEP DETAIL (new local component "Step detail")
Properties: State = Pending | Active | Done | Flagged | Failed; Value (bool); Connector (bool).

Structure:
- Horizontal auto layout, gap 10, align top, width 297.
- Leading: a 16 x 20 frame with a 16 px icon, 2 px from the top.
  - Done: circle-check, success
  - Active: Spinner 16, primary
  - Pending: circle-dashed, ink-muted
  - Flagged: triangle-alert, warning
  - Failed: circle-x, danger
- Connector: a 1 px rect in line #DCDFE4, absolutely positioned at x 7.5, running from y 22 to the item height + 8. Hidden on the last item.
- Text column: fill (271 wide), vertical, gap 2.
  - Line 1, horizontal space-between:
    - Label: Inter 14/20 Medium, ink.
    - Optional value: Inter 14/20 Medium, ink-strong #091E42, tabular figures, right aligned.
    - Pending: label and value both ink-muted. Flagged: value in warning. Failed: value in danger.
  - Line 2: Inter 14/20 Regular, ink-muted, wraps.
- Item height: 42 when line 2 is one line, 62 when it is two.
- I measured every label + value pair in copy and each fits in 271. The widest is "Contract demand changed 900 kVA" at about 251.

OPEN-ROW SCREENS (S04b and S04c sets, S04g)
- The illustration swaps to Size=Compact: a 240 x 128 crop of the page at 100%, at x 81, y 128 (12 below the toolbar), with Focus set to the open row.
- The card moves to y 272 (same card spec). The caption sits 16 below the card.
- The content area becomes a vertical scroll frame (Overflow=Vertical) between the fixed toolbar and the fixed footer.
- Content bottom padding is 124: 852 minus the top of the footer fade at 728/730.
- Fixed footer container, y 730 to 852:
  - The top 32 px is a linear gradient of surface-muted from 0% to 100%; below it is solid surface-muted.
  - The ghost button sits at y 762. When it is the 50 tall Continue, the button sits at y 760 and the gradient starts at 728.
- Open content heights: Found 298, Read 390, Maths 554, Checks 410. Card height = 219 + open content.

PROTOTYPE TABLE CHANGES (log in DECISIONS.md)
- S03 Upload the PDF goes to S04a-1 (was S04).
- New timing chain: S04a-1 > 1500 ms > S04a-2 > 2000 > S04a-3 > 2000 > S04a-4 > 1500 > S04e > 800 > S06. This replaces S04 > 1500 > S05.
- Flow starting points:
  - Rename "First bill" (at S01) to "Add a bill".
  - New "First bill" at S04e First bill > S05 > S06.
  - New "Reading, 1 thing to look at" at S04f.
  - New "Reading, wrong bill" at S04g.

## Copy

- **Toolbar title, S04a beats, S04b, S04c, S04e, S04f**: Reading your bill
- **Toolbar title, S04g**: Could not add this bill
- **Toolbar title, S04r (read-only, from S07)**: How Ohm read this bill
- **Close xmark, VoiceOver label**: Close
- **Close xmark, VoiceOver hint (S04a, S04b)**: Ohm keeps reading and notifies you when it is ready.
- **Row 1 title, Active and Pending**: Finding your bill
- **Row 1 title, Done (brings Northgrid back, the signal that this is the right bill)**: Found Northgrid's August bill
- **Row 1 title, Failed (S04g)**: This bill is for another account
- **Row 2 title, Active and Pending**: Reading every line
- **Row 2 title, Done**: Read every line of the bill
- **Row 3 title, Active and Pending**: Redoing the maths
- **Row 3 title, Done**: Checked every charge
- **Row 4 title, Active and Pending**: Running the 6 checks
- **Row 4 title, Done**: All 6 checks passed
- **Row 4 title, Flagged (S04f)**: 5 of 6 checks passed
- **Row 4 title, Done, first-bill variant (two settings are saved, not compared)**: Checks done
- **Caption under the card, while reading (S04a beats, S04b set)**: Takes about 10 seconds. You can close this screen. We will notify you when it is ready.
- **Caption under the card, done (S04e, S04c set, S04c Done waiting)**: Done. Your bill is ready.
- **Caption under the card, S04e First bill**: Done. Next, check the details we read.
- **Caption under the card, S04f flagged**: 1 thing to look at. You can still pay early.
- **Caption under the card, S04g failed**: Nothing was added or paid. Choose the bill for account 4410 28••••.
- **Footer ghost button (S04a beats, S04b set)**: Stop reading this bill
- **Footer primary button (S04c set, S04c Done waiting)**: Continue
- **Footer primary button (S04g)**: Choose another file
- **Row 1 details intro**: Making sure this is the right bill.
- **Row 1 detail 1 (label | value | line 2)**: Power company | Northgrid Electric | Name and logo at the top of the bill
- **Row 1 detail 2**: Account | 4410 28•••• | Matches Harbourline Hotels, Riverside
- **Row 1 detail 3 (no billing-period dates assumed)**: Bill for | August 2026 | Usage for August. Issued 1 Sep 2026.
- **Row 1 detail 4**: Due date | 16 Sep | Discount if paid by 8 Sep
- **Row 1 detail 5 (no value)**: Not already added | July is paid. This is a new bill.
- **Row 2 details intro**: What the bill says, in plain words.
- **Row 2 detail 1 (2 lines)**: Units used | 3,26,500 | Meter reading difference x 2,000, your meter multiplier
- **Row 2 detail 2**: Highest power drawn | 664 kVA | You booked 700 kVA
- **Row 2 detail 3**: Power factor | 0.998 | Close to 1 means no penalty
- **Row 2 detail 4 (no value, 2 lines)**: Past usage | Aug 2025 to Aug 2026, printed on the bill. Highest in May.
- **Row 2 detail 5**: Charges | 7 parts | ₹36,42,169 in all, rounded to ₹36,42,160
- **Row 2 detail 6**: Early payment discount | 1% | Of the bill before taxes, if paid by 8 Sep
- **Row 3 details intro (2 lines)**: Ohm redoes each line with the approved HT Commercial rates and state taxes.
- **Row 3 detail 1 (Done in S04b)**: Electricity used | ₹22,52,850 | 3,26,500 units x ₹6.90
- **Row 3 detail 2 (Done in S04b)**: Fuel adjustment | ₹3,91,800 | 3,26,500 units x ₹1.20
- **Row 3 detail 3 (Done in S04b)**: Wires | ₹3,59,150 | 3,26,500 units x ₹1.10
- **Row 3 detail 4 (Active in S04b, 2 lines)**: Booked capacity | ₹2,78,880 | Charged on your highest use, 664 kVA, at ₹420 per kVA
- **Row 3 detail 5 (Pending in S04b, 2 lines)**: Time of day | ₹14,450 | Mornings +₹22,800, evenings +₹60,200, nights minus ₹68,550
- **Row 3 detail 6 (Pending in S04b, 2 lines; duty = 7.5% of ₹32,97,130 = ₹2,47,284.75, shown as ₹2,47,285, as on S08)**: Taxes | ₹3,45,039 | Duty ₹2,47,285 at 7.5%, plus sales tax ₹97,754
- **Row 3 detail 7 (Pending in S04b, 2 lines; S08 says balance ₹2,140, adjusted ₹2,140)**: Last month's balance | ₹0 | ₹2,140 from before was cleared, so it adds nothing
- **Row 3 detail 8 (Pending in S04b; the sum of the 7 parts)**: Total | ₹36,42,169 | The bill rounds it to ₹36,42,160
- **Row 4 details intro**: The same 6 checks you see with your bill.
- **Row 4 detail 1 (no value; same words as S07)**: Charges add up | Every line equals your meter reading times the approved rate.
- **Row 4 detail 2**: Contract demand unchanged | 700 kVA, same as your first bill.
- **Row 4 detail 3**: Category fits your business | HT Commercial is right for a hotel.
- **Row 4 detail 4**: Meter multiplier unchanged | 2,000, same as your first bill.
- **Row 4 detail 5**: No penalties | Peak demand 664 of 700 kVA. Power factor 0.998.
- **Row 4 detail 6**: Discount worked out right | 1% of ₹32,97,130 before taxes is ₹32,971.
- **FLAGGED variant (S13 data), Row 4 detail 2, State=Flagged, value in warning**: Contract demand changed | 900 kVA | Your first bill said 700 kVA
- **FLAGGED variant, Row 4 detail 5**: No penalties | Peak demand 664 of 900 kVA. Power factor 0.998.
- **FLAGGED variant, Row 2 detail 2**: Highest power drawn | 664 kVA | This bill says you booked 900 kVA
- **FIRST-BILL variant, Row 1 detail 5 (no value)**: First bill in Ohm | Future bills will be checked against this one.
- **FIRST-BILL variant, Row 4 detail 2**: Contract demand noted | 700 kVA | Saved to check every future bill
- **FIRST-BILL variant, Row 4 detail 4**: Meter multiplier noted | 2,000 | Saved to check every future bill
- **FAILED variant (S04g), Row 1 intro**: This bill is for another Northgrid account.
- **FAILED variant, Row 1 detail 1 (Done)**: Power company | Northgrid Electric | Name and logo at the top of the bill
- **FAILED variant, Row 1 detail 2 (Failed, value in danger, 2 lines)**: Account | Does not match | Not 4410 28••••, the Harbourline Hotels account
- **S04d sheet title**: Stop reading?
- **S04d sheet body**: Ohm will delete the file you uploaded. Nothing has been paid or changed. You can add the bill again any time.
- **S04d destructive button**: Stop reading
- **S04d safe button**: Keep reading
- **S01b reading card title (before row 1 is done)**: Reading your bill
- **S01b reading card title (after row 1 is done; the demo frame uses this)**: Reading your August bill
- **S01b reading card description**: Northgrid Electric. We will notify you when it is ready.
- **S01b and S01c past bill item (year moved to 2026)**: July 2026 · Paid ₹35,53,720 on 5 Aug · Saved ₹32,480
- **S01c failed card title**: We could not add this bill
- **S01c failed card description**: It is for a different account. Tap to see why.
- **Notification, flagged (Title / Message)**: August bill is here: 1 thing to look at / 5 of 6 checks passed. You can still pay by 8 Sep to save ₹32,971.
- **Notification, failed (Title / Message)**: We could not add your bill / It is for a different Northgrid account. Tap to see why.
- **S02 lock screen date (fix for 2026)**: Thursday, 3 September
- **S07 How we check card, new link**: See how Ohm read this bill
- **VoiceOver, Step row (pattern: title. state. button, collapsed or expanded)**: Redoing the maths. In progress. Button, collapsed.
- **VoiceOver, Step row hint**: Shows what Ohm is checking.
- **VoiceOver announcement when a row finishes (example)**: Found Northgrid's August bill.

## Illustrations

### Illustration / Bill page (Indian HT bill)
- Concept: The same soft language the lead approved: white paper, chunky rounded skeleton lines and almost no colour. The page now has the anatomy of an Indian state utility HT bill:
- a grey masthead with a round company emblem and a two-line bilingual name (state language above English)
- consumer name, address and a boxed consumer number next to Bill date and Due date boxes
- a ruled meter reading table
- the 12-month usage strip printed on the bill, using Ohm's real units with August in blue, the same bars as S01 and S12
- a charges list with right-aligned amounts
- a Total payable box with a real ₹
- a dashed tear-off slip with a pay QR code

Weight floor: no text line is thinner than 4 pt. Headings and amounts are 6 pt. Skel-soft is only used at 5 pt or more.

Only three static accents use colour: the emblem, the August bar, and the Total box with its ₹. The moving scan line stays the one live blue.
- Construction: PAGE
- Frame "Page", 200 x 264, fill white (library card), radius 14, 1 px inside stroke in line #DCDFE4, clip ON, no shadow. This matches today's measured page: 180 x 232, radius 14, stroke line.
- All coordinates are page-local (x, y, w, h). Every line is fully rounded (radius = half its height).
- 58 layers in 7 groups named A to G. The 13 usage bars count as one group.

A MASTHEAD
- A0 band (0, 0, 200, 38), surface-muted.
- A1 emblem circle (16, 8, 22, 22), primary #265CFF. Inside it, a Lucide utility-pole 12 in white, stroke 2, centered. Do NOT use zap: that is Ohm's own app icon.
- A2 state-language name (46, 11, 92, 7), Skel.
- A3 English name (46, 23, 60, 5), Skel.

B CONSUMER AND DATES
- B1 name (16, 48, 70, 6), Skel.
- B2 address (16, 59, 58, 5), Skel-soft.
- B3 consumer number box (16, 69, 52, 14): white, 1 px inside stroke Skel, radius 4. Inner line (21, 74, 42, 4), Skel.
- B4 Bill date box (106, 46, 37, 37): white, 1 px inside stroke Skel, radius 6. Label (111, 54, 18, 5) Skel-soft; value (111, 67, 26, 6) Skel.
- B5 Due date box (147, 46, 37, 37), built the same way. Label (152, 54, 18, 5); value (152, 67, 26, 6).

C METER TABLE
- C0 frame (16, 91, 168, 30): white, 1 px inside stroke Skel, radius 4, clip.
- C1 header fill (16, 91, 168, 10), surface-muted.
- C2 column rules: 1 px Skel at x 72 and x 128, from y 91 to 121.
- C3 header lines (4 pt, Skel): (22, 94, 20, 4), (98, 94, 24, 4), (162, 94, 16, 4).
- C4 body lines (4 pt, Skel):
  - row 1: (22, 104, 14, 4), (94, 104, 28, 4), (156, 104, 22, 4)
  - row 2: (22, 114, 18, 4), (98, 114, 24, 4), (162, 114, 16, 4)
- Meaning: columns are Reading | This month | Units; rows are kWh and kVA. The number columns are right aligned 6 px in from each rule.

D USAGE STRIP
- D1 caption (16, 127, 48, 4), Skel.
- D2 13 bars: 8 wide, radius 2, bottoms on y 158, at x = 18 + 13i (18 to 174).
- Heights = units / 3,42,210 x 20, which puts May at 20:
  Aug 25 18.7 · Sep 18.1 · Oct 18.7 · Nov 17.0 · Dec 17.5 · Jan 26 17.0 · Feb 15.3 · Mar 17.0 · Apr 18.4 · May 20.0 · Jun 19.5 · Jul 18.7 · Aug 26 19.1
- Bar top = 158 minus height.
- Bars 1 to 12 are Skel. Aug 26 is primary.
- No baseline; the bars share a zero bottom, the same honest scale as S01 and S12.

E CHARGES
- 4 rows of 5 pt lines at y 166, 175, 184 and 193.
- Labels at x 16, widths 62, 50, 30 and 40, Skel-soft.
- Amounts right aligned to x 184, widths 32, 26, 26 and 26 (x 152, 158, 158, 158), Skel.

F TOTAL PAYABLE
- F0 box (16, 204, 168, 18), primary-subtle #E9EFFF, radius 5.
- F1 label (22, 210, 44, 6), Skel.
- F2 "₹" set in Inter Semi Bold 9, primary, then outlined to a vector (about 6 x 9) at (140, 208.5).
- F3 amount (150, 210, 28, 6), Skel.

G TEAR-OFF SLIP
- G0 dashed line from (0, 230) to (200, 230): 1 px Skel, dash 3, gap 3.
- G1 QR, 22 x 22 at (16, 236):
  - Three 8 x 8 finder squares at local (0, 0), (14, 0) and (0, 14). Each has a 1.5 px inside stroke and radius 2, with a 3 x 3 dot centered (+2.5).
  - Six 3 x 3 data modules at local (10, 1), (10, 6), (11, 11), (17, 11), (11, 17), (17, 17).
  - Outline strokes, Union, then Flatten into one vector "QR". Fill ink-muted #44546F at 45% opacity.
- G2 slip label (46, 240, 40, 5), Skel-soft.
- G3 slip amount (46, 250, 30, 6), Skel.
- Leave x 170 and up empty: the badge covers it.

LAYER ORDER inside Page, bottom to top: A, B, C, D, E, F, G, Glow.

COMPONENT SET "Illustration / Bill"
Properties:
- Size = Hero | Compact
- Focus = None | Found | Read | Maths | Checks
- Status = Reading | Done | Flagged | Failed
- Scan = None | Found | Read | Maths | Checks

Layer structure, the same in every variant so Smart animate matches: Paper (Page + Focus), Scan line, Fade top, Fade bottom, Badge.

Hero:
- Frame 240 x 290, clip ON. Paper at (16, 0).
- Fades and Focus at 0% opacity.

Variants to build (17):
- Hero/None/Reading for Scan = Found, Read, Maths and Checks
- Hero/None/Done, Hero/None/Flagged and Hero/None/Failed
- Compact for each of the 4 Focus values, as Reading and as Done
- Compact/Found/Failed
- Compact/Checks/Flagged
- Hover: No hover on iOS. The page itself never moves; motion comes only from the scan line, the badge and the crop or focus box.
### Scan line and glow
- Concept: Unchanged from the one the lead likes. I measured today's export: the line is 3 pt, overhangs the page 8 pt on each side, and has a 38 pt band of 10% blue above it. It now passes over real bill sections, so the motion reads as "Ohm is reading this part".
- Construction: Glow
- Rect 200 x 38, primary at 10% opacity, the top layer INSIDE the Page so the page clips it.
- Its bottom edge touches the line.

Line
- Rect 216 x 3, radius 1.5, primary.
- A sibling above Paper in the component, at local x 8, so it overhangs the page by 8 on each side.

Line top (page y) for each Scan value:
- Found = 86 (glow covers the consumer block and the date boxes)
- Read = 160 (meter table and usage strip)
- Maths = 200 (charges)
- Checks = 226 (Total box)

When Scan=None, or Size=Compact, the line and glow are at 0% opacity.
- Hover: Prototype: the line steps down between beats with Smart animate, 600 ms, ease in-out.

Product: it sweeps page y 0 to 264 in 2400 ms, ease in-out, fades out over 150 ms at the bottom, then restarts. With Reduce Motion it stays still on the section being read.
### Status badge
- Concept: Today's round corner badge. It now also shows done, flagged and failed, so the picture never claims success when a check fails.
- Construction: Hero size
- 52 x 52 circle at component-local (186, 238). Its center sits on the page's bottom edge, 4 pt in from the right corner, as it does today.

Compact size
- 36 x 36 at (194, 84). Icons are 18.

States
- Reading: fill white, 1 px inside stroke in line, drop shadow (y 4, blur 12, ink-strong at 8%), shadcn Spinner 24 in primary.
- Done: success-subtle #DCFFF1, Lucide check 24, stroke 2.5, success.
- Flagged: warning-subtle #FFF7D6, Lucide triangle-alert 24, warning.
- Failed: danger-subtle #FFECEB, Lucide x 24, stroke 2.5, danger.
- Done, Flagged and Failed have no stroke.
- Hover: The spinner rotates (kit). On a result, the spinner crossfades to the icon over 200 ms and the icon scales from 0.6 to 1 with a soft spring. The matching haptic plays: success, warning or error.
### Compact crop with focus box
- Concept: A visual aid for non-technical readers. When a step is open, the bill stays at full size, but only the part that step reads is shown, outlined by a soft box, like a finger pointing at the page. Scaling the page down would make the lines too thin to read.
- Construction: Compact frame
- 240 x 128, clip ON, no fill.
- Paper (Page + Focus) at x 16. Its y offset centers the focus box at y 64:
  - Found 19
  - Read -60
  - Maths -130
  - Checks -19
- Fade top (0, 0, 240, 16): linear gradient, surface-muted 100% to 0%.
- Fade bottom (0, 112, 240, 16): 0% to 100%.
- Badge 36 at (194, 84).

Focus box
- Rect, radius 6, inside Paper above Page.
- Fill primary at 6%, 2 px inside stroke in primary.
- Uses danger stroke and 6% danger fill when Status=Failed, and warning tones when Status=Flagged.

Focus regions (page-local):
- Found (6, 4, 188, 82): masthead, consumer block and dates.
- Read (6, 87, 188, 74): meter table and usage strip.
- Maths (6, 161, 188, 65): charges and Total.
- Checks (6, 42, 188, 82): consumer block and meter table, where the category, contract demand, multiplier, peak demand and power factor are printed.
- Hover: Hero to Compact: Smart animate, 300 ms, ease out. The frame height goes 290 to 128, Paper slides to its offset, the badge shrinks from 52 to 36, and the fades and focus fade in.

Between rows: the Paper y offset and the focus box animate together, 250 to 300 ms, ease out, so it reads as "Ohm moved to this part of the bill".

## New screens

### S04a-1, S04a-2, S04a-4 (reading beats)
- Purpose: The checklist plays out over about 7 s instead of jumping away after 1.5 s. Rows change tense as they finish, and the reviewer has time to tap a row.
- Layout: Exact clones of S04a-3. Positions, captions and footer are the same; only these change:
- S04a-1: Row 1 Active "Finding your bill". Rows 2 to 4 Pending ("Reading every line", "Redoing the maths", "Running the 6 checks"). Illustration Scan=Found.
- S04a-2: Row 1 Done "Found Northgrid's August bill". Row 2 Active "Reading every line". Rows 3 and 4 Pending. Scan=Read.
- S04a-4: Rows 1 to 3 Done (row 3 reads "Checked every charge"). Row 4 Active "Running the 6 checks". Scan=Checks.
### S04b-Found, S04b-Read, S04b-Maths, S04b-Checks (details open, still reading)
- Purpose: Shows what Ohm is doing under the hood, like Claude's thinking, for whichever step she taps. The crop shows exactly which part of the bill that step reads.
- Layout: Snapshot of the S04a-3 state: rows 1 and 2 Done, row 3 Active, row 4 Pending. The tapped row is Open=True.

Chrome: status bar, toolbar (xmark, "Reading your bill"), fixed footer with the fade and the ghost "Stop reading this bill" at y 762, home indicator.

Scroll content:
- Illustration at Size=Compact, Focus = that row, Status=Reading, at x 81, y 128 (ends 256).
- Card at y 272.
- Caption 16 below the card.
- Bottom padding 124.

Per frame:
- Found: all 5 details Done. Card 517 tall (ends 789), content height 969.
- Read: all 6 details Done. Card 609 (ends 881), content 1061.
- Maths: details 1 to 3 Done, 4 Active, 5 to 8 Pending. Card 773 (ends 1045), content 1225.
- Checks: row 4 is Pending, so all 6 details are Pending (muted). Card 629 (ends 901), content 1081.
### S04c-Found, S04c-Read, S04c-Maths, S04c-Checks (details open, done)
- Purpose: The finished state for someone reading the details. The screen does not jump away; she continues when ready.
- Layout: Each is a clone of its S04b frame, with these changes:
- All rows and all details Done. Row 3 reads "Checked every charge" and row 4 reads "All 6 checks passed".
- Illustration Status=Done (focus stays).
- Caption: "Done. Your bill is ready." (1 line).
- Footer: Button Variant=Default, pill, 50 tall, x 16, w 361, y 760. Label "Continue" in Inter 16 Medium, white on primary. The fade starts at 728.
- Content heights: Found 949, Read 1041, Maths 1205, Checks 1061.
### S04c Done, waiting
- Purpose: Where she lands after collapsing details once reading is done. Continue stays, with no auto-advance.
- Layout: Same positions as S04a-3:
- Illustration Hero, Focus=None, Status=Done (no scan line, success badge).
- 4 Done rows, collapsed. Card y 450 to 669.
- Caption "Done. Your bill is ready." at y 685.
- Footer: the 50 tall primary "Continue" at y 760.
### S04e Reading done
- Purpose: A short completion beat (800 ms) before the auto-advance, so the badge visibly turns into a check instead of the screen jumping.
- Layout: S04c Done, waiting, but the footer ghost button is at 0% opacity (it fades out) and there is no Continue button. After delay 800 ms goes to S06.
### S04e First bill
- Purpose: Keeps the onboarding path to S05 without contradicting the monthly demo copy.
- Layout: Clone of S04e with two changes:
- Row 4 Done title "Checks done".
- Caption "Done. Next, check the details we read."
After delay 800 ms goes to S05. It carries the "First bill" flow starting point. The first-bill detail copy appears on the reference board.
### S04f 1 thing to look at
- Purpose: The flagged path (S13's contract demand 900 vs 700 kVA), so the badge and rows never claim success when a check fails.
- Layout: Clone of S04e with these changes:
- Row 4 State=Flagged: triangle-alert in warning, title "5 of 6 checks passed" in Medium warning.
- Illustration Hero, Status=Flagged: warning-subtle #FFF7D6 badge with triangle-alert 24 in warning.
- Caption "1 thing to look at. You can still pay early."
- After delay 1200 ms goes to S13.
The flagged row 4 details (Compact, Focus=Checks, warning focus box) are built on the reference board.
### S04g Wrong bill
- Purpose: The failure case for "are you getting the right bill": the file is a Northgrid bill for another account.
- Layout: - Toolbar: xmark plus the title "Could not add this bill".
- Illustration Compact, Focus=Found, Status=Failed, at y 128. The focus box and badge use danger tones.
- Card at y 272, holding ONLY row 1 (State=Failed, Open=True). Rows 2 to 4 are hidden, because reading stopped there.
- Row content: intro (1 line), detail 1 Done (42), detail 2 Failed (62).
- Card height 4 + 52 + 162 + 4 = 222, ending at y 494.
- Caption at y 510, 2 lines.
- Footer: Button Default, pill, 50 tall, x 16, w 361, y 760, label "Choose another file".
- No scroll.
### S04d Stop reading sheet
- Purpose: A real cancel for the wrong-file case. It is kept apart from Close so that closing never throws anything away.
- Layout: S04a-3 underneath, frozen.

Kit Sheet - iPhone resized to a custom detent of 300 (top at y 552). It brings its own dim and grabber. Its toolbar layer is hidden, so there is no xmark.

Content: vertical auto layout, padding 24 top (from the sheet top, below the grabber) and 24 sides. Top to bottom:
- Title "Stop reading?" in Inter 20/28 (text-xl) Semi Bold, ink.
- Gap 8.
- Body in Inter 16/24, ink-muted, 3 lines.
- Gap 24.
- Button Variant=Secondary, pill, 50 tall, full width. Fill overridden to danger-subtle #FFECEB. Label "Stop reading" in Inter 16 Medium, danger #AE2E24.
- Gap 8.
- Button Variant=Ghost, pill, 44 tall, full width. Label "Keep reading" in Inter 16 Medium, ink.
- 8, then the 34 tall home indicator.

Total: 24 + 28 + 8 + 72 + 24 + 50 + 8 + 44 + 8 + 34 = 300.

The Stop button is tinted, not solid red, because only an upload is lost.
### S01b Home, still reading
- Purpose: Where Close lands. It keeps the promise visible and gives her a way back into S04.
- Layout: Clone of S01 with these changes:
- The August bill card is replaced, in the same spot, by a Reading card: x 16, w 361, white, radius 16, padding 20. Horizontal layout, gap 12, centered vertically, 104 tall.
  - Leading: a 44 x 44 primary-subtle #E9EFFF circle with a shadcn Spinner 20 in primary.
  - Text column: title "Reading your August bill" in Inter 16/22 Semi Bold, ink; then the description in Inter 14/20, ink-muted, 2 lines in 237.
  - Trailing: Lucide chevron-right 16, ink-muted.
- The Usage card is hidden, because its August bar comes from this bill.
- Past bills: change the year to July 2026.
- The tab bar is unchanged.
### S01c Home, could not add
- Purpose: The failure path when S04 was closed: the problem stays visible on Home instead of only in a notification.
- Layout: Clone of S01b. In the card:
- Leading: a 44 circle in danger-subtle #FFECEB with Lucide circle-x 20 in danger.
- Title "We could not add this bill".
- Description "It is for a different account. Tap to see why."
- Trailing chevron-right.
Tapping the card opens S04g.
### S04r How Ohm read this bill (and S07 link)
- Purpose: Like Claude's thinking, the reasoning stays openable after the answer arrives. It is also the only way to see the details for someone who closed S04.
- Layout: S07 change: in the How we check card, below the text, add Button Variant=Link with the label "See how Ohm read this bill" and a trailing Lucide chevron-right 16, in primary. Inter 14/20 Medium, 44 tall hit area, left aligned with the card text. The card grows by 48.

S04r:
- Toolbar Default with the kit glass back button in Leading and the title "How Ohm read this bill".
- Illustration Hero/None/Done at y 136.
- Card at y 450 with 4 Done rows, collapsed. They toggle in place; the illustration does not refocus on this secondary screen.
- No caption, no footer. Overflow=Vertical.
### S04 details reference board (not wired)
- Purpose: Lets the design lead review every sub-step string and state in one place, including the variants that no prototype path shows.
- Layout: 393 wide, about 2400 tall, placed to the right of S04g.

Top: four Compact illustrations in a 2 x 2 grid (Found, Read, Maths, Checks, all Status=Done).

Then S04c-styled cards with all 4 rows open, and under each row a muted Inter 12/16 annotation naming its source:
- row 1: the S05 fields and S01 account
- row 2: the bill's meter table and history (S12)
- row 3: S08
- row 4: S07
- derived values: ₹32,97,130 = the 5 charge lines; duty = 7.5% of it; ₹36,42,169 = the 7 parts

Below that, three variant cards:
- FLAGGED: row 4 open, Compact/Checks/Flagged
- FIRST BILL: rows 1 and 4 open
- FAILED: as on S04g

Then the two notification variants, built from the kit Notification - Collapsed.

## Interactions

- S03: tap Upload the PDF -> Navigate to S04a-1. Move in from bottom, 300 ms, ease out.
- S04a-1, S04a-2, S04a-3, S04a-4: After delay (1500, 2000, 2000 and 1500 ms) -> Navigate to the next beat, ending at S04e. Smart animate, 600 ms, ease in-out: the scan line glides down to the next section, the active spinner becomes a check, and the next row's title turns from muted to ink. In total about 7 s, so the reviewer has time to tap a row.
- S04e: After delay 800 ms -> Navigate to S06. Push left, 300 ms. Only S04e First bill goes to S05.
- Any S04a beat: tap the header of row 1, 2, 3 or 4 -> Navigate to S04b-Found, S04b-Read, S04b-Maths or S04b-Checks. Smart animate, 300 ms, ease out. The illustration shrinks from Hero to the Compact crop, which pans to that row's region, and the card rises as the row opens. Leaving the frame cancels the beat's After delay. The S04b frames are a snapshot taken at the maths step, so a tap from S04a-1 or S04a-2 jumps ahead to that snapshot. That is acceptable for a demo; the product shows live state.
- S04b-X: tap the header of a different row -> Navigate to S04b for that row. Smart animate, 300 ms, ease out. The open row closes, the new one opens, and the crop pans to the new region. Because each row has its own frame, the focus box always follows the row.
- S04b-X: tap the header of the open row -> Navigate to S04a-3. Smart animate, 300 ms. The illustration grows back to Hero and the timeline carries on.
- S04b-X: After delay 3000 ms -> Navigate to S04c-X. Smart animate, 400 ms, ease out. This only moves progress forward in place and never leaves S04: the remaining sub-steps tick, rows 3 and 4 complete, the badge turns success, the caption changes and the ghost button becomes Continue.
- S04c-X: tap the header of a different row -> Navigate to S04c for that row. Smart animate, 300 ms.
- S04c-X: tap the header of the open row -> Navigate to S04c Done, waiting. Smart animate, 300 ms. There is no auto-advance: once she has opened details, she leaves when she taps Continue.
- S04c Done, waiting: tap any row header -> Navigate to S04c for that row. Smart animate, 300 ms.
- S04c-X or S04c Done, waiting: tap Continue -> Navigate to S06. Push left, 300 ms.
- S04a beats and S04b set: tap Close (leading glass xmark) -> Navigate to S01b. Move out, direction down, 300 ms, ease out. No confirmation, because nothing is lost: reading carries on and a notification arrives when it finishes.
- S04c set, S04c Done waiting, S04e, S04f, S04g: tap Close -> Navigate to S01. Move out, direction down, 300 ms.
- S04a beats and S04b set: tap Stop reading this bill -> Navigate to S04d. Smart animate, 300 ms, ease out. The kit sheet rises and the dim fades in. Reading continues underneath.
- S04d: tap Stop reading -> Navigate to S01. Dissolve, 300 ms. In the product: delete the upload, cancel the job, send no notification, and return Home to its state before the upload.
- S04d: tap Keep reading, or drag the sheet down -> Back (to the frame she came from). Smart animate, 300 ms. The sheet has no toolbar xmark, so there are two ways out: the button and the swipe.
- S04f: After delay 1200 ms -> Navigate to S13. Push left, 300 ms. The extra 400 ms, compared with S04e, lets the warning badge register.
- S04g: tap Choose another file -> Navigate to S03. Move in from bottom, 300 ms.
- S04e First bill: After delay 800 ms -> Navigate to S05. Push left, 300 ms.
- S01b: tap the Reading card -> Navigate to S04a-3. Move in from bottom, 300 ms. It picks up at the live state.
- S01c: tap the failed card -> Navigate to S04g. Move in from bottom, 300 ms.
- S07: tap See how Ohm read this bill -> Navigate to S04r. Push left, 300 ms. The back chevron on S04r goes Back. On S04r, row headers toggle in place (interactive component, Change to Open=True or False, Smart animate 250 ms).
- Product: reading finishes while S04 is closed -> A notification is sent:
- All 6 checks pass: the S02 notification. Tapping it opens S06.
- 1 check flagged: the flagged copy. Tapping it opens S13.
- Failed: the failed copy. Tapping it opens S04g.
The S01b card then becomes the normal bill card, or the S01c failed card.
- Product: reading finishes while S04 is open -> If no row is open, show the done beat for 800 ms, then move on (S06, S13 or S05). If any row is open, stay and show Continue. Opening a row never pauses the reading itself.
- Scroll on the S04b and S04c sets -> Content scrolls under the fixed toolbar (kit scroll-edge effect) and above the fixed footer with its 32 px fade. Set Overflow=Vertical. Fix the position of the status bar, toolbar, footer and home indicator.
- Accessibility and Reduce Motion -> - VoiceOver reads each row header as one button ("Redoing the maths. In progress. Button, collapsed.").
- Only row completions are announced.
- Close has the label "Close" plus a hint.
- With Reduce Motion: no scan sweep or crop pan, only crossfades.
- Haptics: success on Done, warning on Flagged, error on Failed.
- Every tap target is at least 44 pt.

## Research

- Nextdoor https://mobbin.com/screens/59bce3a8-29e0-4af4-ba3a-d3f5555a1b94: The "Delete post?" sheet is only as tall as a title, one sentence and two buttons. Cancel sits below as plain text. This is the basis for the 300 pt Stop sheet with no toolbar.
- Obsidian https://mobbin.com/screens/6cda007a-65ff-44dd-85b0-4ff729dc57dc: Delete is red text on a soft pill, not a solid red button, above a plain Cancel. This supports a tinted danger-subtle "Stop reading", because only an upload is lost.
- pliability https://mobbin.com/screens/26fb2d0c-a379-48ab-8d18-420ff6cde7b7: "Are you sure?" states the consequence in one line, in a sheet that hugs its content. Same structure as S04d.
- Alan (error) https://mobbin.com/screens/f8b6392b-7791-40dc-aee0-eadb7c322cea: After an upload, Alan names the exact reason ("We have already received this document") and the file. This is the model for S04g saying "another account" instead of a generic "could not read".
- Warby Parker https://mobbin.com/screens/b9171be9-afcb-4958-853d-f04fb71ba47e: An upload problem is shown inline where the item lives, with one fix action ("Upload a new copy"). This is the basis for the S01c failed card and S04g's "Choose another file".
- Air NZ https://mobbin.com/screens/2eafb709-1cb8-4354-8cc1-0b7f7d000e8f: When document reading fails, the leading X stays and one primary retry sits at the bottom. Same structure as S04g.
- Careem https://mobbin.com/screens/f2ca14ce-db32-4bb0-8f4f-36fe2d75055c: Another capture task with a round X at the top leading edge. Together with the Notes scanner, it confirms Close goes leading.
- Grab Driver https://mobbin.com/screens/3e075093-b5b6-424e-95c9-5af6806ae69a: A realistic sample document with bright brackets around the area that matters. This supports framing a region of a real-looking bill (the focus box) rather than describing it in words.
- Alan (checks) https://mobbin.com/screens/9246f3a3-3f0a-4b36-9607-3077163e5709: After a PDF upload, Alan lists named checks ("Document detection" done, "Anti-fraud analysis" in progress). Naming real steps beats a progress bar; our rows add the real numbers on demand.
- Linktree https://mobbin.com/screens/7e370793-4b21-4992-8738-e417d3ce22dc: An "Analysis" disclosure opens into small check icons joined by a thin connector. This is the anatomy of the Step detail list.
- Manus https://mobbin.com/screens/9083384c-a700-4359-8fbc-879e29c66f68: Per-step chevrons and dashed circles for steps not started. We took both. We deliberately did NOT take its running counter: the lead wants the collapsed state as calm as today.
- DeepSeek https://mobbin.com/screens/75233c29-f56c-4af8-b200-c0549a2827ca: "Thought for 5 seconds" stays collapsed and muted while the answer stays primary. Supports keeping details closed by default, with no live captions.
- Notion AI https://mobbin.com/screens/b0c5b10f-47f4-45cd-ad78-8ce9a21a8fad: Each step opens on its own. Supports one disclosure per row, so "are you getting the right bill" maps to row 1.
- ChatGPT https://mobbin.com/screens/3eaf4e44-fdce-48bc-965b-b194ed9c43ac: One muted line with a chevron is enough of an affordance. No separate "Show details" button is needed.
- GoPay https://mobbin.com/screens/27455fba-aa39-488f-9aff-809389ffb3cb: The receipt scan shows a recognisable document (header, item table, Total) under a moving highlight band. Real anatomy reads instantly.
- Starling https://mobbin.com/screens/b29424e2-098d-4849-aa6f-e285f824e3cd: A minimal document with a round check badge on its corner. This is the model for our badge's Done state.
- Apple Notes (iOS document scanner) https://mobbin.com/screens/72e7b1bc-5be9-4968-a4c1-e23f278deee9: A glass xmark at the top leading edge leaves the capture task, matching our S03 sheet close.
- Gojek https://mobbin.com/flows/dea41e7f-aacb-4bfe-a156-ec5975893947: In bill pay, the X closes, while "Cancel transfer" is a separate explicit action lower down, next to a collapsible detail. Same split as ours: Close versus Stop reading.
- CRED https://mobbin.com/flows/9e6b7280-8945-40df-9f5e-8ba780fce8fa: Indian bill pay shows the due date as a tag, the saving in green and a plain X. Mobbin again returned no PhonePe, Paytm, Jupiter, Fi or Groww electricity bill screens. The direct query surfaced Shopee, Octopus Energy, Careem, Cash App and Revolut Business, so the Indian bill anatomy comes from the utility samples below.
- Cash App https://mobbin.com/screens/bcc0e21d-284f-4c55-a15d-f38ef64af51b: Bill details list each charge with a right-aligned amount, the model for the illustration's charges block. The Calculation details accordion seen earlier informs the one-sentence second line under each sub-step.
- Web: DNH and DD Electricity Department sample HT bill : From https://www.dded.gov.in/sample_bills/ht-industry.pdf: a ruled meter block (previous, current, difference, multiplying factor, consumption for kWh, kVAh and kVA) and contract demand against recorded demand. This is the basis for the ruled meter table and the Checks focus region.
- Web: Mahadiscom (MSEDCL) bill sample : From https://www.mahadiscom.in/wp-content/uploads/2018/03/Kalyan57_1521262740333.pdf: a masthead with a round logo, a consumer block, a time-of-day breakup and a 12-month billing history. Maharashtra rules give a 1% prompt payment discount within 7 days of issue, which matches 1 Sep to 8 Sep. The bilingual name lines and the pay QR on the slip follow the critic's suggestion. I have not verified them on a 2026 sample in this pass.

## Code notes
No code exists yet. These notes are for the eventual SwiftUI build.

Presentation and Close
- Present S04 with .fullScreenCover.
- Close is a ToolbarItem(placement: .cancellationAction) holding Button(role: .close). iOS 26 renders it as the glass xmark. Set .accessibilityLabel("Close") and a hint.
- Close only dismisses the cover. Reading carries on server-side, and the result arrives as an APNs push in one of three variants: S02, flagged, or failed.
- If the PDF upload has not finished when she closes, keep it going with a background URLSession upload task.

Stop sheet
- Stop reading opens .sheet with .presentationDetents([.height(300)]) and .presentationDragIndicator(.visible).
- Swiping the sheet down means Keep reading.
- Confirming Stop calls a cancel endpoint, deletes the upload, sends no push, and returns Home to its state before the upload.

Steps and live state
- Each step is a DisclosureGroup with a custom label: icon, title and chevron, with no caption and no counter.
- Titles come from a per-step (activeTitle, doneTitle) pair. Pending rows use activeTitle in the muted colour.
- Drive state from server events (SSE or WebSocket) keyed by sub-step id. Never mark a sub-step done before the server confirms it.
- Sub-step states: pending, active, done, flagged, failed.

Auto-advance rule
- When reading finishes, if no DisclosureGroup is expanded: show the done state for 0.8 s, then route to S06, S13, or S05 for a first bill.
- Otherwise show Continue.

Illustration
- Draw it as one SwiftUI view from the page geometry in this spec.
- Compact is the same view inside a 240 x 128 clipped container with an animated .offset(y:) (easeOut, 0.25 s). Use matchedGeometryEffect between Hero and Compact.
- The focus box rect comes from a region map {found, read, maths, checks}.

Accessibility and motion
- Each row header: .accessibilityElement(children: .combine), value \"In progress\" / \"Done\" / \"Needs a look\" / \"Failed\", trait .isButton, plus a hint.
- Announce only row completions, with AccessibilityNotification.Announcement.
- Respect accessibilityReduceMotion: no sweep, no pan, crossfades only.
- Haptics: .sensoryFeedback(.success / .warning / .error).
- Use .monospacedDigit() on every amount.

Figma build notes
- Outline the ₹ glyph in F2.
- Do not use the Scale tool for Compact; it is a crop, not a scale.
- Hide the kit sheet's toolbar layer in S04d rather than detaching it.

Derived values, checked with a script this pass
- 22,52,850 + 3,91,800 + 3,59,150 + 2,78,880 + 14,450 = ₹32,97,130
- 1% of that = ₹32,971.3, shown as ₹32,971
- Duty: 7.5% x ₹32,97,130 = ₹2,47,284.75, shown as ₹2,47,285. Plus ₹97,754 = ₹3,45,038.75, which is ₹3,45,039.
- The 7 parts sum to ₹36,42,169.
- Time of day: 22,800 + 60,200 minus 68,550 = ₹14,450.
- 664 x 420 = ₹2,78,880.
- Usage bar heights = units / 3,42,210 x 20 (Apr 18.4, Jul 18.7 corrected).
- Copy widths were measured with Inter's own metrics, calibrated against today's S04 export within 1%.
- The derived figure 163.25 is no longer shown anywhere.

Mobbin notice (verbatim, to show the user as its own block):
---

**Your Mobbin AI usage is high this month**

Usage is unlimited during beta. If your usage stays at this level, you may need to purchase more credits once limits take effect. [View usage and plan options](https://mobbin.com/settings/billing-and-usage)

## Open questions

- Demo default (I picked one). S04 frames use the MONTHLY copy ("July is paid. This is a new bill.", "same as your first bill") and S04e goes to S06, because S01 already shows July 2026 paid through Ohm and S07 compares against a first bill. The onboarding path to S05 lives on a separate frame, S04e First bill, which carries its own "First bill" flow start; the S01 flow is renamed "Add a bill". This changes the SPEC's First bill flow (S04 > S05). If you would rather keep S04 > S05 as the default, swap in the FIRST-BILL copy variants and point S04e at S05.
- Tax gap. 30 paise x 3,26,500 units = ₹97,950, but S08 and the data give sales tax ₹97,754, which is ₹196 less. Row 3 avoids printing the 30 paise rate. A real "Charges add up" check would flag this, so should the demo figure or the rate be corrected?
- S13 data. S13 keeps the S06 total of ₹36,42,160 but says the change costs ₹4,620 more this month. ₹4,620 = (75% of 900 minus 664) x ₹420 = 11 x 420, which suggests a billing-demand floor; if that rule is real, S13's Booked capacity and total should change too. For now the flagged S04 copy only touches the contract demand lines (900 kVA, "664 of 900 kVA").
- Disagreement 1, shape count. The critic asked for about 40 shapes; the page has 58 layers in 7 groups. Every line meets the weight floor (4 pt minimum, 6 pt for headings and amounts), and 13 of the layers are the usage bars, which read as one unit. Cutting the ruled table or the QR would lose the two strongest bill cues. If it still feels busy, drop C3 (table header lines) and G2/G3 (slip lines), which brings it to 53.
- Disagreement 2, crop size. Compact is 240 x 128, not 180 x 104. The page stays at 100% (200 wide plus its badge), and the tallest focus region is 82 pt plus two 16 pt fades.
- Disagreement 3, text size and padding. Line 2 of each Step detail is 14/20, not 13/18, because the library has no 13 px style and 12 px is small for a non-technical reader. The open lists get longer (Maths content is 554 tall), but they scroll and are opt-in. The scroll bottom padding is 124, not 112, measured from the top of the footer fade.
- Disagreement 4, failure wording. The critic proposed "We could not read your bill". I used "We could not add this bill" plus the reason, because the designed failure is a bill Ohm read fine that belongs to another account, so "could not read" would be untrue. An unreadable-file variant can reuse the same layout with "We could not read this file".
- Prototype shortcut. The S04b frames are a snapshot taken at the maths step. Tapping a row during S04a-1 or S04a-2 jumps ahead to that snapshot. Is this acceptable, or do you want S04b frames per beat? That would add 8 frames.
- Stop reading and Wrong bill both go to S01, which in the demo already shows the August bill (and its "All 6 checks passed" badge, which S04f's Close path also lands on). Do you want an S01 variant showing Home before the upload?
- S02's lock screen still says "Tuesday, 3 September"; in 2026, 3 Sep is a Thursday. The S01, S06, S11 and S13 exports still show 2024.
- S05 has a back chevron that should not return to a finished reading screen. Suggest S05's back goes to S01, or S04 is replaced in the navigation stack once reading finishes.
- Row 1 detail 3 no longer shows the billing period ("1 to 31 Aug") because the data does not state it. If the real bill prints a period or opening and closing meter readings, show them there and in Row 2 detail 1.