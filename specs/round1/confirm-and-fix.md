# confirm-and-fix

## Summary

S05 no longer asks "Is this right?". It becomes "Your connection", a statement of what Ohm read from the August 2026 bill. A small S04-style "starting point" card explains why these details are kept: every new bill is checked against them, so a change gets caught. The details are ordered by money impact, so Contract demand, Meter multiplier and Category, each with a visual aid, all sit above the fold. S05 only asks a question when Ohm could not read a value clearly. Every row opens "On your bill", which places the printed bill crop above Ohm's own reading, so Neha can see for herself which answer is right. From there she can fix our reading, set the number from her Northgrid agreement (the bill is wrong), or hand it to the Ohm team. Manual fixing is limited to the two numbers that change money. A fixed value becomes the new starting point, is badged, is flagged on the summary, and never blocks paying before 8 Sep.

## Layout

S05 YOUR CONNECTION (first bill, 700 kVA world). Frame 393 x 852, fill surface-muted #F1F2F4. Content scrolls under a fixed footer. Side gutter 16 (cards 361 wide, inner 329). Library text styles: Text-xs 12/16, Text-sm 14/20, Text-base 16/24, Text-lg 18/28, Text-xl 20/28, Text-2xl 24/32. Brand tokens only. Every row and card hugs its content; the y values below are the measured result at scroll 0.

1. 0 to 62: Status bar - iPhone 17 Pro.
2. 62 to 166: Toolbar - Top - iPhone, Style Large Title. Leading: kit glass back button. No trailing item. Title 'Your connection'. Collapses to the inline title on scroll (kit behaviour).
3. 174 to 322: Starting point card, 361 x 148. Fill primary-subtle #E9EFFF, radius 16, no border, padding 16, vertical auto layout, gap 12.
   - Child 1: 'Starting point' illustration frame, 329 x 64 (see Illustrations).
   - Child 2: one paragraph, Text-sm regular, ink #172B4D, 329 wide, 2 lines (40).
   - This card replaces the old intro paragraph and is the only place that says why the screen exists. Not tappable.
4. 346 to 362: Section label row, x 32 to 361.
   - Left: 'From your August 2026 bill' in Text-xs semibold, Text case Upper, letter spacing 0.5, ink-muted #44546F (the S01 'Past bills' style).
   - Right aligned: Lucide file-text 12 + 4 gap + 'Page 1' in Text-xs medium, ink-muted.
   - This gives the provenance once for the whole card.
5. 370 to 838: Details card. White, radius 16, borderless, no card padding, vertical auto layout. 5 rows ordered by money impact. Library Separator (rebranded to line #DCDFE4), inset 16 on both sides, between rows.
   ROW ANATOMY (local component 'Connection row'). Padding 12 top, 12 bottom, 16 on the sides. Vertical auto layout:
   a) Line 1, 24 tall, horizontal, gap 8, centred: label in Text-base medium ink (fill) / value in Text-base semibold ink-strong #091E42 (hug, right aligned) / Lucide chevron-right 16 in ink-muted.
   b) 2 gap, then the helper: Text-sm regular, ink-muted, one line, 305 wide. The right inset of 24 keeps it clear of the chevron column. Every helper is 39 characters or fewer, about 270 px, so none wraps.
   c) Optional status badge line: 8 gap, Badge 22 tall, left aligned.
   d) Optional visual: 12 gap, visual 329 wide.
   Pressed state: row fill surface-muted, with the card's 16 radius kept on the outer corners of the first and last rows.
   - Row 1, Contract demand: 370 to 480 (110). Visual 'Capacity bar' (label row 16 + 6 gap + track 6 = 28). Range 312 of 329 (664 / 700).
   - Row 2, Meter multiplier: 481 to 591 (110). Visual 'Meter equation' chips (28).
   - Row 3, Category: 592 to 696 (104). Visual: fit Badge, 22 (success-subtle #DCFFF1 fill, success #216E4E text, Lucide circle-check 12).
   - Row 4, Power company: 697 to 767 (70). No visual.
   - Row 5, Connected since: 768 to 838 (70). No visual.
   Line 1 width check (label + value + chevron + gaps): the widest is 'Power company' plus 'Northgrid Electric', about 295 of 329.
6. 862 to 878: Section label 'About your business' (same style, x 32).
7. 886 to 978: Business card. White, radius 16, padding 12 top and bottom, 16 on the sides.
   - Line 1, 44 tall, horizontal, space between, centred: 'Your business' in Text-base medium ink / shadcn NativeSelect, 132 x 44, value 'Hotel'.
   - 4 gap, then the helper: Text-sm ink-muted, 1 line, 329 wide.
8. 994 to 1034: Footnote. Text-sm, ink-muted, x 32, 2 lines.
9. Bottom padding 164, so the footnote clears the footer. Scroll height 1198.
10. Fixed footer, 704 to 852.
    - No hairline and no custom blur. Use the kit's scroll edge effect (Soft) behind it, as iOS 26 does. S06 and S13 should follow the same rule later.
    - Padding 12 top, 16 on the sides.
    - shadcn Button, Default, Roudness Rounded, 361 x 50, fill primary #265CFF, label white Text-base semibold (716 to 766).
    - 8 gap, then Button Ghost Rounded, 361 x 44, label Text-base medium ink (774 to 818).
    - Home Indicator, 818 to 852.

ABOVE THE FOLD (166 to 704): the reason (card), the provenance, and the three details that change money, each with its visual. The Category badge ends at 692. Neha does not need to scroll to continue, because S05 asks her to check nothing unless a row is Unclear.

ROW STATES (variants of 'Connection row'):
- Read (default): as above.
- Unclear:
  - Row fill warning-subtle #FFF7D6, keeping the outer card radius.
  - The helper becomes Lucide triangle-alert 14 + text in warning #A54800.
  - The visual is hidden, because a bar built on an unclear number would mislead. Row height 70.
  - While any row is Unclear, the footer primary reads 'Check <detail>' and pushes that row's S05b. This is the only case where S05 asks anything.
- Edited by you: badge line, Badge with primary-subtle fill and primary text, Lucide pencil 12. If the bill differs from the value, the helper turns warning with triangle-alert 14.
- Fixed by you (pencil 12) and Fixed by Ohm team (check 12): same primary-subtle recipe.
- Being checked: Badge with surface-muted fill, ink-muted text, Lucide clock 12.
- Category fit badge: it follows the business type. Success 'Fits a <type>', or warning (warning-subtle fill, warning text, triangle-alert 12) 'Check with Northgrid'.

TOAST (local component, used on S05d, S05f, S05g, S05s and S13b):
- 361 x 48, white, radius 16, shadow y 4 blur 16 in ink-strong at 12%, padding 14 by 16.
- Lucide circle-check 20 in success + 10 gap + Text-sm medium ink, one line, 42 characters at most.
- Position: 12 above the footer (y 644 to 692 on S05 frames), or 12 above the Home Indicator where a screen has no footer.
- Motion: in with an 8 px rise and a fade (200 ms); dissolves after 4 s.

## Copy

- **S05 toolbar large title**: Your connection
- **S05 starting point card text**: Every new bill is checked against these. If one changes, we flag it.
- **S05 section label 1 (Upper) + right tag**: From your August 2026 bill  |  Page 1
- **S05 row 1 label / helper / value**: Contract demand / The power you booked from Northgrid / 700 kVA
- **Capacity bar labels (S05 row 1, S05b, S05d, S05f, S05g)**: Your August peak  |  664 of 700 kVA
- **S05 row 2 label / helper / value**: Meter multiplier / Turns your meter count into units / 2,000
- **Meter equation chips (S05 row 2 and S05b)**: Meter count  ×  2,000  =  Units you pay for
- **S05 row 3 label / helper / value / fit badge**: Category / Your rate plan. HT means high voltage. / HT Commercial / Fits a hotel
- **S05 row 3 badge when the business type does not fit (warning)**: Check with Northgrid
- **S05 row 4 label / helper / value**: Power company / Supplies your power and sends this bill / Northgrid Electric
- **S05 row 5 label / helper / value**: Connected since / When this supply was switched on / 3 Mar 2021
- **S05 section label 2 (Upper)**: About your business
- **S05 business card label / helper**: Your business / We use this to check your rate plan fits.
- **S05 business NativeSelect value + options (iOS pull-down menu)**: Hotel / Hotel, Restaurant, Hospital, Office, Shop or mall, Factory, School or college, Something else
- **S05 footnote**: You can change these later. Tap Northgrid · HT on any bill.
- **S05 primary button**: Save and see August bill
- **S05 ghost button**: Something looks off
- **Row state Unclear, helper (warning)**: Not clear on your bill. Tap to check.
- **S05u footer primary while a row is Unclear**: Check contract demand
- **Row badges**: Edited by you / Fixed by you / Fixed by Ohm team / Being checked
- **S05a sheet title**: What looks off?
- **S05a intro**: Pick a detail to see it on your bill. You can fix it from there.
- **S05a rows (title / description)**: Contract demand / 700 kVA; Meter multiplier / 2,000; Category / HT Commercial; Power company / Northgrid Electric; Connected since / 3 Mar 2021
- **S05a section label (Upper)**: Something else
- **S05a row: wrong document**: This is not my bill / Upload the right one
- **S05a row: hand off**: Not sure / Ask the Ohm team to look
- **S05a footnote**: Fixing a detail does not hold up paying your bill.
- **S05b toolbar title / subtitle (first-bill world)**: Contract demand / Page 1, August 2026 bill
- **S05b toolbar subtitle when opened from S05s (monthly world)**: Page 1, July 2026 bill
- **S05b toolbar trailing capsule**: Full bill
- **S05b evidence label (Upper)**: On your bill
- **S05b bill crop printed line (left / right)**: Contract demand  |  700 kVA
- **S05b 'We read' row: label / value / badge**: We read / 700 kVA / Read clearly
- **S05b meaning card title**: What it means
- **S05b meaning, contract demand**: The most power you can use at one time. Above it, Northgrid charges a penalty.
- **S05b capacity status (success)**: Under what you booked, so no penalty
- **S05b section label (Upper)**: If something is wrong
- **S05b option 1 (contract demand and meter multiplier only)**: We read it wrong / The bill shows something else
- **S05b option 2 (contract demand and meter multiplier only)**: The bill is wrong / Your agreement says something else
- **S05b option 3 (contract demand and meter multiplier only)**: Not sure / Ask the Ohm team to look
- **S05b options for Category, Power company, Connected since**: This is not my bill / Upload the right one; Ask the Ohm team / Someone checks it with you
- **S05b meaning, meter multiplier**: Your meter counts in small steps. Northgrid multiplies the count by 2,000 to get the units you pay for.
- **S05b meter equation caption (from the bill's consumption history)**: In August: 3,26,500 units
- **S05b meaning, category**: The rate plan Northgrid bills you on. HT means a high voltage supply. HT Commercial is right for a hotel.
- **S05b meaning, power company**: The company that supplies your power and sends this bill.
- **S05b meaning, connected since**: The day Northgrid switched on this supply. It should be the same on every bill.
- **S05b connected since visual (derived: 3 Mar 2021 to 3 Sep 2026)**: Connected for 5 years and 6 months
- **S05bu toolbar subtitle**: Page 1, from your photo
- **S05bu 'We read' row: value / badge (warning)**: 900 kVA / Not clear
- **S05bu section label (Upper), a real question**: Does your bill say 900 kVA?
- **S05bu options**: Yes, it says 900 kVA / Keep what we read; No, it shows something else / Type what it shows; Not sure / Ask the Ohm team to look
- **S05bw (900 kVA bill) crop / we read / bar**: Contract demand  |  900 kVA ; We read / 900 kVA / Read clearly ; Your August peak  |  664 of 900 kVA
- **S05be Alert title / description**: You set 700 kVA on 3 Sep / Your bill says 900 kVA. New bills are checked against 700 kVA.
- **S05be extra option**: Use the bill's number / Go back to 900 kVA
- **Toast after going back to the bill's number**: Back to 900 kVA, as on your bill.
- **S05c toolbar title (both modes)**: Fix contract demand
- **S05c (from your agreement) compare tiles: caption / value**: On your bill / 900 kVA  |  Your agreement / 700 kVA (empty: Type below)
- **S05c field label**: Contract demand on your agreement
- **S05c input value + suffix**: 700  kVA
- **S05c field help**: You will find it on your agreement with Northgrid.
- **S05c field error (empty or 0)**: Enter the number from your agreement.
- **S05c field help when the value equals the bill**: That matches the bill, so there is nothing to fix.
- **S05c info card (numbers update live)**: Every new bill is checked against 700 kVA. This bill says 900 kVA, so we will flag it on your summary.
- **S05c outline button + helper**: Add a photo of your agreement / Optional. Useful if you raise this with Northgrid.
- **S05c attach action sheet**: Take photo / Choose from Files / Cancel
- **S05c primary button (number updates live)**: Save 700 kVA
- **S05c2 (from your bill) compare tiles**: We read / 900 kVA  |  Your bill shows / 700 kVA (empty: Type below)
- **S05c2 field label / help**: Contract demand as printed on your bill / Type it exactly as it appears on page 1.
- **S05c2 field error (empty or 0)**: Enter the number on your bill.
- **S05c2 field help when the value equals what we read**: That is what we read, so there is nothing to fix.
- **S05c2 info card**: We will redo all 6 checks with 700 kVA.
- **S05c2 link button**: Or upload a clearer copy of the bill
- **S05c2 primary button**: Save and recheck
- **S05c / S05c2 discard alert (iOS alert) title / buttons**: Discard this change? / Discard / Keep editing
- **S04r title / checklist row**: Checking again / Redoing the maths with 700 kVA
- **S05g toast (recheck passed)**: Rechecked. All 6 checks passed.
- **Toast if a recheck makes a check fail (annotated, not built)**: Rechecked. 1 thing to look at.
- **S05d contract demand row: value / helper (warning) / badge**: 700 kVA / Your bill says 900 kVA. We will flag it. / Edited by you
- **S05d toast**: Saved 700 kVA as your starting point.
- **S05e toolbar title**: Ask the Ohm team
- **S05e heading**: We will check it for you
- **S05e body**: Someone at Ohm checks your details against your bill and notifies you.
- **S05e Alert (primary-subtle) title / description**: You do not have to wait for us / Pay by 8 Sep to keep the ₹32,971 discount.
- **S05e select label + options**: Which detail? / Not sure, Contract demand, Meter multiplier, Category, Power company, Connected since
- **S05e textarea label + placeholder**: What looks off? (optional) / For example: our agreement with Northgrid says something different.
- **S05e outline button + helper**: Add a photo or PDF / Your agreement with Northgrid helps us most.
- **S05e primary button**: Send to the Ohm team
- **S05f toast**: Sent. We will notify you.
- **S06p item (title / description)**: Checking contract demand / The Ohm team will notify you.
- **Notification - Collapsed, team reply, no change (title / message)**: We checked your contract demand / It matches page 1 of your bill: 700 kVA. Nothing to change.
- **Notification - Collapsed, team reply, corrected (unclear world)**: We fixed your contract demand / Your bill says 700 kVA. We had read 900 kVA.
- **S05s toolbar inline title**: Your connection
- **S05s section label 1 (monthly world; the starting point came from the first bill in Ohm)**: From your July 2026 bill  |  Page 1
- **S05s end-of-content ghost button**: Something looks off
- **S05s toast after changing business type**: Saved.
- **S05v sheet title / trailing button / caption**: August 2026 bill / Done / Page 1
- **S03b sheet title (wrong bill) / variant title (clearer copy)**: Upload the right bill / Upload a clearer copy
- **S03b footnote**: Your August 2026 bill stays until the new one is read.
- **S04 date fix (existing frame)**: Found Northgrid Electric, August 2026
- **S13b toolbar title**: August 2026
- **S13b warning card title**: Contract demand does not match
- **S13b warning card body**: This bill says 900 kVA. Your agreement says 700 kVA, as you told us on 3 Sep.
- **S13b cost line (unchanged from S13)**: Cost: ₹4,620 more this month. ₹55,440 a year if it repeats.
- **S13b 'Copy details for Northgrid' clipboard text + toast**: Harbourline Hotels, Riverside. Our August 2026 bill shows contract demand 900 kVA. Our agreement says 700 kVA. Please correct it. / Copied
- **S07 row in the edited world**: Contract demand does not match / 900 kVA on this bill. 700 kVA set by you on 3 Sep.
- **Category mismatch, S13-style warning card (annotated, not built)**: Check your category / Your bill says HT Commercial. You told us your business is a factory. Ask Northgrid if this is the right rate plan.
- **Category mismatch, S07 row (annotated, not built)**: Category to check / HT Commercial on this bill. Your business: factory.

## Illustrations

### Starting point (S05 card, 329 x 64)
- Concept: The August bill's connection block is pinned as the reference, and a dashed arrow carries it to the bills that follow. Two of them pass. The third has a change, which gets caught. This shows non-technical readers why the screen exists. It uses the S04 language: white paper, skeleton lines, blue accents.
- Construction: Frame 329 x 64, no fill, clip off. Skeleton fills are surface-muted #F1F2F4.
Page A (August): (0, 4), 46 x 60. White, radius 7, 1 px line #DCDFE4 stroke.
  Inside, positions relative to the page:
  - Icon tile: 10 x 10 at (5, 5), primary-subtle, radius 3, Lucide zap 7 in primary.
  - Skeleton: 20 x 3 at (18, 8), radius 1.5.
  - Highlight block: 36 x 20 at (5, 19), radius 3, fill primary-subtle, 1 px primary stroke. Inside it, 3 bars 2 tall in primary at 35% opacity, at x 4: 26 wide at y 4, 18 wide at y 9, 22 wide at y 14.
  - Skeletons: 30 x 3 at (5, 45) and 20 x 3 at (5, 51).
  Pin badge: a 14 circle in primary at absolute (37, 0), with Lucide pin 8 in white.
Connector: a 1.5 px dashed primary line (dash 4 / gap 4, round caps) from (56, 34) to (126, 34). Lucide chevron-right 12 in primary at (122, 28).
Pages B, C, D: each 36 x 48 at y 12, at x 148, 211 and 274. White, radius 6, 1 px line stroke.
  Inside each (relative):
  - Skeleton: 20 x 3 at (5, 6).
  - Dashed block: 26 x 14 at (5, 13), radius 3, 1 px dashed stroke (3 / 2), no fill.
  - Skeletons: 22 x 3 at (5, 33) and 16 x 3 at (5, 39).
  Status badges: 14 circles centred on each page's top right corner, at absolute (177, 5), (240, 5) and (303, 5).
  - B and C: success-subtle fill, Lucide check 8 in success, primary dashed block.
  - D: warning-subtle fill, Lucide triangle-alert 8 in warning, warning dashed block. This shows that a change gets caught, not that every bill always passes.
- Hover: On load, once:
- The connector's dash offset runs left to right (500 ms, ease out).
- The badges pop on B, then C, then D (scale 0.6 to 1, opacity 0 to 100, 120 ms apart).
- D then nudges x by plus or minus 2 px, twice (160 ms).
No loop, so the screen settles.
### Bill crop (S05b evidence, 329 x 112)
- Concept: A crop of page 1 that looks printed, not like Ohm's UI: a ruled table, grey labels, tabular figures, no brand fill. The line Ohm read gets only a thin blue outline. The 'We read' row below uses Ohm's tinted style, so the two can be compared at a glance. In production the paper is the real PDF crop of the region Ohm read, with the outline drawn over it.
- Construction: Frame 329 x 112, fill surface-muted, radius 12, clip on.
Paper: (12, 10), 305 x 130 (it runs past the bottom so it reads as a crop). White, radius 6, 1 px line stroke.
Paper-relative positions:
- Table rows are 30 tall, from x 12 to 293.
- Row 1: skeletons 92 x 6 at (12, 20) and 48 x 6 at (245, 20). Rule: 281 x 1 in line at y 38.
- Row 2: 'Contract demand' in Inter 12 regular, ink-muted, at x 12, centred on y 54. The value in Inter 13 medium, ink-strong, tabular figures, right aligned to x 293. Rule at y 69.
- Row 3: skeletons 76 x 6 at (12, 82) and 40 x 6 at (253, 82). Rule at y 100.
- Row 4: skeletons at y 113, clipped.
- Outline: a rectangle at (6, 36), 293 x 36, radius 4, no fill, 1.5 px primary stroke. In frame coordinates that is (18, 46) to (311, 82), fully visible.
Unclear variant (S05bu):
- Rotate the paper -1.5 degrees.
- Add a linear gradient overlay across the paper, ink-strong 0% to 6% (left to right).
- Give the row 2 text a layer blur of 0.6, so it reads as a phone photo of a paper bill.
900 variant: the value reads '900 kVA'.
- Hover: On load:
- The outline draws in (stroke 0 to 1.5, 300 ms, ease out).
- Then the 'We read' row rises 4 px and fades in (200 ms).
No loop.
### Second look (S05e hero, 76 tall)
- Concept: A bill page with its connection block under a magnifying glass and a chat badge in the corner: a person at Ohm will look for you. It uses the S04 page language, with the chat badge in place of the spinner badge. It is kept small, so it supports the copy rather than repeating the bill shown on S05b.
- Construction: Build the base group at 160 x 112, then scale the whole group to 65% (104 x 73) with the Scale tool (K), centred in a 361 x 76 frame with no fill.
Base coordinates:
- Page: 84 x 108 at (20, 0). White, radius 10, 1 px line stroke.
  - Icon tile: 14 x 14 at (8, 8), primary-subtle, radius 4, Lucide zap 9 in primary.
  - Skeletons (surface-muted, 5 tall, radius 2): 44 wide at (28, 12) and 64 wide at (8, 30).
  - Highlight block: 68 x 24 at (8, 42), radius 5, fill primary-subtle, 1 px primary stroke.
  - Skeletons: 52 wide at (8, 76) and 40 wide at (8, 86).
- Lens: a 44 circle at (62, 32), white at 70%, 3 px primary stroke.
- Handle: 6 x 22, primary, radius 3, rotated 45 degrees, from about (98, 70).
- Chat badge: a 40 circle at (112, 70), white, 1 px line stroke, Lucide message-circle 20 in primary.
- Hover: The lens glides 6 px left and right over the highlight (1,600 ms, ease in out, loop while the screen is open). The badge pops once (scale 0.6 to 1, 150 ms) after 300 ms.
### Capacity bar (S05 row 1, S05b, S05d, S05f, S05g)
- Concept: Makes 'contract demand' concrete. The track is what you booked. The fill is your busiest moment in August. Ending before the end of the track means no penalty.
- Construction: Label row:
- On S05, Text-xs: left 'Your August peak' in ink-muted, right '664 of 700 kVA' in medium ink.
- On S05b, Text-sm, with the right label in semibold.
Then a 6 gap (8 on S05b), then the library SliderTrack, 329 wide by 6 tall (8 on S05b), line fill, radius 3 (4), holding a SliderRange in primary.
Range widths come from the real numbers and start at zero, so the scale is honest: 664 / 700 × 329 = 312; 664 / 900 × 329 = 243.
The bar is hidden in the Unclear state.
- Hover: On load the range grows from 0 to its width (500 ms, ease out). No loop.
### Meter equation (S05 row 2 and S05b)
- Concept: Explains 'meter multiplier' as plain arithmetic: what the meter counts, times 2,000, gives the units on the bill. It uses no meter reading, because the bill data has none. On S05b, August's real total from the bill appears underneath.
- Construction: Horizontal auto layout, 28 tall, gap 6, left aligned, no icons. The total is about 296 of 329, measured.
- Chip A: fill surface-muted, radius 8, padding 8 horizontal, 'Meter count' in Text-xs medium ink.
- Then '×' in Text-sm ink-muted.
- Chip B: fill primary-subtle, radius 8, '2,000' in Text-xs semibold primary.
- Then '=' in Text-sm ink-muted.
- Chip C: fill surface-muted, 'Units you pay for' in Text-xs medium ink.
On S05b only: a caption 'In August: 3,26,500 units' in Text-xs ink-muted, 6 below.
- Hover: On load the chips fade in left to right, 80 ms apart. Chip B pulses once (scale 1.0 to 1.05 to 1.0, 240 ms).
### Compare tiles (S05c and S05c2)
- Concept: Two cards side by side, with a not-equal sign between them: what the bill (or Ohm) says, and what you say. The effect of the fix is clear before you save.
- Construction: Two white cards, 172.5 wide, hugging with a minimum height of 96, radius 16, padding 14, gap 16, at x 16 and x 204.5, y 132.
Each tile: a caption row (Lucide icon 14 in ink-muted + 6 gap + Text-sm ink-muted, at most about 124 of the 144.5 inner width), 8 gap, then the value in Text-2xl semibold.
- Left value: ink-strong.
- Right tile: 2 px primary stroke, value in primary, mirroring the input.
Badge: a 32 circle, white, 1 px line stroke, at x 180.5, y 164 (centred on the gap and on the tiles' middle), with Lucide equal-not 16 in warning. When the values match it switches to Lucide equal in success.
- Hover: While typing, the right value cross-fades on each change (120 ms).

## New screens

### S05a What looks off
- Purpose: The destination for 'Something looks off'. Neha picks the bill detail that seems wrong (which leads straight to its evidence), or one of the two cases that are not about one detail: the wrong bill was read, or she is not sure. 'Your business' is not listed, because she can edit it in place on S05.
- Layout: Sheet - iPhone, Detent Large, over S05 with the kit dimming layer.
Sheet toolbar, matching S03: leading glass close button (xmark), centred title.
Content slot: padding 16, vertical gap 16.
1. Intro: Text-base, ink-muted, 2 lines (48).
2. Card A: white, radius 16. 5 shadcn Item rows, 66 tall each (the S03 sheet row height), padding 16 on the sides. Title in Text-base medium ink. Description in Text-sm ink-muted (the current value). Right slot: chevron-right 16 in ink-muted. Separators inset 16. Same order as S05 (money impact). 334 tall.
3. Section label 'Something else': Text-xs semibold, Upper, ink-muted, inset 16. Then an 8 gap.
4. Card B: white, radius 16, 2 Item rows of 66, each with a 36 x 36 tile (radius 10) in the media slot.
   - Row 1: surface-muted tile, Lucide file-x-2 18 in ink.
   - Row 2: primary-subtle tile, message-circle 18 in primary.
   - Chevrons on both. 133 tall.
5. Footnote: Text-sm, ink-muted, centred (20).
The content is about 655 tall, inside a content area of about 686, so it fits without scrolling.
### S05b On your bill (Contract demand)
- Purpose: The evidence screen, reached from any S05 row or from S05a. It answers 'how do I know what the right answer is?'. The printed bill crop sits above Ohm's own reading, in two different visual languages (print versus Ohm's tinted row), so Neha can compare them herself. If they differ, we read it wrong. If they match but her agreement says otherwise, the bill is wrong. If she cannot tell, a person looks.
- Layout: 393 x 852, fill surface-muted. Fits without scrolling.
0 to 62: Status bar.
62 to 116: Toolbar - Top - iPhone, Style Title 2 Line Left (as on S06).
  - Back button.
  - Title 'Contract demand', subtitle 'Page 1, August 2026 bill'.
  - Trailing Button Group, Type Text: one glass capsule, 'Full bill' (the kit gives it a 44 hit area). It replaces the old 32 px link.
124 to 348: Evidence card. White, radius 16, padding 16, vertical:
  a) 'On your bill': Text-xs semibold, Upper, ink-muted (16). Then an 8 gap.
  b) 'Bill crop' illustration, 329 x 112, print styled.
  c) 12 gap, then the 'We read' row, 329 x 44. Fill primary-subtle, radius 12, padding 0 by 12, space between.
     - Left: Lucide scan-text 16 in primary + 8 gap + 'We read' in Text-sm medium ink.
     - Right: value in Text-base semibold ink-strong + 8 gap + Badge 'Read clearly' (success-subtle fill, success text, circle-check 12).
364 to 556: 'What it means' card. White, radius 16, padding 16.
  - Title: Text-lg semibold, ink-strong (28). 4 gap.
  - Body: Text-base, ink-muted, 2 lines (48). 16 gap.
  - Capacity bar (large): label row in Text-sm (20), 8 gap, SliderTrack 329 x 8 (radius 4, line fill) with a SliderRange of 312 in primary.
  - 8 gap, then a status row: Lucide circle-check 14 + Text-sm in success (20).
576 to 592: Section label 'If something is wrong', x 32.
600 to 806: Options card. White, radius 16, 3 shadcn Item rows of 68 (padding 12 by 16).
  - Media slot: 36 x 36 tile, radius 10. Title in Text-base medium ink, description in Text-sm ink-muted (one line each, within about 253). Chevron-right 16.
  - Option 1: primary-subtle tile, scan-text 18 in primary.
  - Option 2: warning-subtle tile, file-warning 18 in warning.
  - Option 3: surface-muted tile, message-circle 18 in ink.
  - Separators inset to x 64.
818 to 852: Home Indicator. No footer; back is the exit.

TEMPLATE RULES (build the Contract demand frame and annotate the others):
- Manual fixing exists only for Contract demand and Meter multiplier, the two numbers that change money. Both get the 3 options.
- Category, Power company and Connected since get 2 options: 'This is not my bill' (surface-muted tile, file-x-2) and 'Ask the Ohm team' (primary-subtle tile, message-circle). Fixing them would need a list of tariff plans or a date Ohm cannot verify, so a person handles it.
- Meter multiplier: the body is 3 lines. The visual is the Meter equation chips + 6 gap + a caption in Text-xs ink-muted. The card is 202 tall and the options end at 816.
- Category: the visual is the fit badge. Power company: no visual. Connected since: a 36 tile (primary-subtle, Lucide calendar 18 in primary) + 12 gap + Text-base medium ink.
### S05bu On your bill, unclear
- Purpose: Makes 'We read it wrong' demonstrable. Neha took a photo of a paper bill. Ohm read the 7 as a 9 and knows it was not sure. The crop shows 700 kVA, Ohm's reading says 900 kVA with a warning badge, and the section label asks the one concrete question. This is the only kind of question Ohm asks.
- Layout: A clone of S05b with these changes:
- Subtitle 'Page 1, from your photo'.
- The crop uses the Unclear variant; its value reads '700 kVA'.
- The 'We read' value is '900 kVA', with a warning Badge 'Not clear' (warning-subtle fill, warning text, triangle-alert 12).
- The meaning card has no bar and no status row, since they would rest on an unclear number. It is 124 tall (16 + 28 + 4 + 48 + 16 + 12 spare).
- Section label: 'Does your bill say 900 kVA?'.
- Options:
  - 1: success-subtle tile, circle-check 18 in success.
  - 2: primary-subtle tile, scan-text 18 in primary.
  - 3: surface-muted tile, message-circle 18.
Positions: evidence 124 to 348, meaning 364 to 488, label 508 to 524, options 532 to 738.
### S05bw On your bill (900 kVA bill)
- Purpose: The evidence screen in the 'bill is wrong' world. Here the crop and the reading agree (900 kVA, read clearly), so a wrong reading is ruled out. The only question left is whether the bill matches her agreement.
- Layout: A clone of S05b:
- The crop value is '900 kVA'.
- 'We read' shows '900 kVA' with 'Read clearly'.
- The bar label reads '664 of 900 kVA', with a range of 243 (664 / 900 × 329).
- The status row is unchanged.
### S05be On your bill, set by you
- Purpose: The edited state of the evidence screen, reached from the edited row on S05d. It shows what Neha set beside what the bill says, and lets her undo.
- Layout: A clone of S05bw with these changes:
- An Alert is inserted between the evidence card and the meaning card, at 364 to 432.
  - Fill primary-subtle, no border, radius 16, padding 14.
  - Lucide pencil 16 in primary. Title in Text-sm semibold ink, description in Text-sm ink-muted.
- The meaning card bar shows '664 of 700 kVA' (range 312), because 700 is now the starting point.
- A 4th option row is added: surface-muted tile, Lucide rotate-ccw 18, 'Use the bill's number / Go back to 900 kVA'.
- The content now scrolls (about 960 tall).
### S05c Fix a detail, from your agreement
- Purpose: The 'bill is wrong' fix. Neha types the value from her agreement with Northgrid. It becomes the starting point, and this bill is flagged against it. Demo: the 900 kVA world.
- Layout: 393 x 852, fill surface-muted. Fits at rest.
0 to 62: Status bar.
62 to 116: Toolbar Default, back button, title.
132 to 228: Compare tiles. Two white cards, 172.5 wide, hugging with a minimum height of 96, radius 16, padding 14, gap 16, at x 16 and x 204.5.
  - Left tile: caption row with Lucide file-text 14 + 6 gap + 'On your bill' (Text-sm ink-muted), 8 gap, then '900 kVA' in Text-2xl semibold ink-strong.
  - Right tile: 2 px primary stroke. Caption row with Lucide file-pen-line 14 + 'Your agreement', then '700 kVA' in Text-2xl semibold primary (empty state: 'Type below' in Text-base ink-muted).
  - Captions measure at most about 124 of the 144.5 inner width.
  - Not-equal badge: a 32 circle (white, 1 px line stroke) at x 180.5, y 164 (centred on the gap 188.5 to 204.5 and on the tiles' middle at 180). Lucide equal-not 16 in warning.
252 to 272: Field label, Text-sm medium ink.
280 to 330: shadcn Input, 361 x 50, radius 12, white, 1 px line border (2 px primary ring when focused).
  - Value '700' in Text-lg semibold ink-strong, padding 16.
  - Trailing suffix 'kVA' in Text-base ink-muted. Number pad.
338 to 358: Field help, Text-sm ink-muted (danger #AE2E24 for errors).
382 to 474: Info card. White, radius 16, padding 16, horizontal gap 12: Lucide info 18 in primary + Text-sm ink, 3 lines (299 wide).
490 to 534: Button Outline Rounded, 361 x 44, leading Lucide paperclip 16.
542 to 558: Helper, Text-xs ink-muted, centred.
Fixed footer, 740 to 852:
  - Kit scroll edge effect, padding 12 by 16.
  - Button Default Rounded, 361 x 50 (752 to 802), disabled until the value is valid and different from the bill.
  - Home Indicator, 818 to 852.
With the keyboard up, the footer docks above the number pad. The static frame shows '700' filled in with the keyboard dismissed.
### S05c2 Fix a detail, from your bill
- Purpose: The 'we read it wrong' fix. Neha types what the bill prints, and Ohm redoes all 6 checks. Demo: the unclear world (read 900, printed 700).
- Layout: A clone of S05c with these changes:
- Left tile: Lucide scan-text 14 + 'We read' / '900 kVA' in ink-strong.
- Right tile: Lucide file-text 14 + 'Your bill shows' / '700 kVA' in primary.
- New label and help copy.
- The info card is 1 line: 382 to 434 (52).
- In place of the outline button: a 44 tall frame at 450 to 494 holding a Button Link, with a leading Lucide upload 14 and the label in Text-sm medium primary.
- No helper line.
- Primary: 'Save and recheck'.
### S04r Checking again
- Purpose: A short, honest recheck after a corrected reading. It replaces the reuse of S04, whose copy (August 2026 found, every line read, 10 seconds) is wrong for a recheck.
- Layout: A clone of S04:
- Toolbar title 'Checking again' (Leading stays hidden).
- The illustration is unchanged (scan line + spinner badge).
- The checklist card has one row: Spinner + 'Redoing the maths with 700 kVA'.
- The footnote is removed.
- Prototype: After delay 1,500 ms, navigate to S05g.
### S05g Your connection, fixed
- Purpose: Lands Neha back on S05 after a corrected reading. The fix is credited, and the checks pass.
- Layout: A clone of S05:
- Contract demand row (370 to 510, 140 tall): badge line 'Fixed by you' + bar '664 of 700 kVA'.
- The rows below move down 30.
- Toast at 644 to 692.
- The footer is unchanged and leads to S06.
### S05u Your connection, unclear
- Purpose: Starting frame of the 'First bill, unclear reading' flow (reached after S03 'Take a photo'). It shows that S05 asks something only when there is a specific reason.
- Layout: A clone of S05:
- Contract demand row in the Unclear state: value '900 kVA', warning helper, no visual, fill warning-subtle, 370 to 440.
- Rows below: meter 441 to 551, category 552 to 656, power company 657 to 727, connected since 728 to 798.
- Footer primary: 'Check contract demand' (pushes S05bu). The ghost is unchanged.
### S05w Your connection (900 kVA bill)
- Purpose: Starting frame of the 'First bill, the bill is wrong' flow. August is the first bill and prints 900 kVA, but Neha's agreement says 700 kVA (the S13 story). Without a fix, 900 would quietly become the starting point.
- Layout: A clone of S05: the Contract demand value is '900 kVA' and the bar reads '664 of 900 kVA' (range 243). Everything else is identical. Annotate the story on the canvas.
### S05d Your connection, set by you
- Purpose: What happens after a 'bill is wrong' fix. The row reads as a starting point set by Neha, the gap with the bill is spelled out, and the summary will flag it.
- Layout: A clone of S05w at scroll 0. No scroll is needed now that Contract demand is the first row.
- Contract demand row, 370 to 510 (140):
  - Value '700 kVA'.
  - Helper: Lucide triangle-alert 14 + warning text (about 294 of 305).
  - Badge line: 'Edited by you'.
  - Bar: '664 of 700 kVA' (312).
- The rows below move down 30.
- Toast at 644 to 692, over the Meter multiplier row.
- Footer primary leads to S13b.
### S05e Ask the Ohm team
- Purpose: The 'talk to us' path, for when Neha cannot tell what is wrong. It says plainly that paying does not have to wait, and that the answer arrives as a notification (the app has no inbox).
- Layout: 393 x 852, fill surface-muted. Fits at rest; scrolls only when the keyboard is up.
0 to 62: Status bar.
62 to 116: Toolbar Default, back button, title.
132 to 208: 'Second look' illustration (76 tall), centred, no card.
224 to 252: Heading, Text-xl semibold ink-strong.
258 to 306: Body, Text-base ink-muted, 2 lines.
322 to 390: shadcn Alert. Fill primary-subtle, no border, radius 16, padding 14. Lucide clock 18 in primary. Title in Text-sm semibold ink, description in Text-sm ink-muted (303 wide, 1 line). It sits above the form so the reassurance comes first.
406 to 724: Form card. White, radius 16, padding 16:
  - Label 'Which detail?' in Text-sm medium ink, 8 gap, NativeSelect 329 x 44.
  - 16 gap, label 'What looks off? (optional)', 8 gap, shadcn Textarea 329 x 88, radius 12 (fall back to an Input resized and top-aligned).
  - 16 gap, Button Outline Rounded 329 x 44 with Lucide paperclip 16, 6 gap, helper in Text-xs ink-muted.
Fixed footer, 740 to 852: Button Default Rounded 361 x 50 (752 to 802), then the Home Indicator. The 16 gap between 724 and 740 means nothing collides.
### S05f Your connection, sent
- Purpose: Confirms the hand-off and keeps Neha moving. The flagged row is marked, and nothing is blocked.
- Layout: A clone of S05:
- Contract demand row (370 to 510, 140): badge line 'Being checked' + bar '664 of 700 kVA'.
- The rows below move down 30.
- Toast at 644 to 692.
- The footer primary leads to S06p.
### S06p Bill summary, being checked
- Purpose: Keeps the summary consistent with the pending question. The automatic checks did pass, and a person is now double-checking one detail Neha raised.
- Layout: A clone of S06 (toolbar 'August 2026').
- Under the success Alert, a 12 gap and then a white card, radius 16, with one shadcn Item, 68 tall (padding 12 by 16):
  - 36 tile, surface-muted, Lucide clock 18 in ink-muted.
  - Title in Text-base medium ink, description in Text-sm ink-muted.
  - Chevron-right 16.
- Everything below moves down 80. The footer is unchanged.
### S05s Your connection (saved)
- Purpose: The same details after the first bill, reached from the 'Northgrid · HT' capsule on S06, S13 and S06p. In the monthly world the starting point came from the first bill in Ohm, July 2026.
- Layout: Same content as S05, with these changes:
- Toolbar Default, back button, inline title.
- Section label 1 names the July 2026 bill.
- No footnote and no fixed footer. After the business card: a 24 gap, then a Button Ghost Rounded 361 x 44, 'Something looks off' (opens S05a), then 34 bottom padding.
- Rows show their badges where they apply.
- The capacity bar still reads 'Your August peak', the latest bill.
- S05b opened from here uses the subtitle 'Page 1, July 2026 bill'.
### S05v Your bill (optional, not prototyped)
- Purpose: The full bill behind 'Full bill', with the line Ohm read outlined, for anyone who wants the whole page.
- Layout: Sheet - iPhone, Large detent.
- Toolbar: title 'August 2026 bill', trailing kit text button 'Done', no leading button.
- Content: surface-muted canvas holding a page, 361 x 510 (A4 ratio), white, radius 8, 1 px line stroke.
  - The page uses the print-style skeleton table from the Bill crop, with the same 1.5 px primary outline on the line Ohm read. It is scrolled so the outline sits in the upper third.
  - 'Page 1' in Text-xs ink-muted, centred, 8 below the page.
- Production: a PDFKit PDFView with pinch to zoom. The outline is an annotation drawn from Ohm's read coordinates (iOS Quick Look cannot highlight or jump to a region).
### S03b Upload the right bill
- Purpose: Re-upload when the wrong document was read, or when the copy was too unclear. It reuses the S03 sheet with an honest title.
- Layout: A clone of S03:
- Title 'Upload the right bill'.
- A 16 gap after the rows, then a footnote in Text-sm ink-muted.
- The same frame serves 'Upload a clearer copy' (change the title text; annotated).
### S13b Check failed, your number
- Purpose: The summary at the end of the 'bill is wrong' path. It credits Neha's agreement instead of 'your first bill'.
- Layout: A clone of S13:
- Toolbar 'August 2026'.
- Only the warning card title and body change.
- The Alert ('1 thing to look at / 5 of 6 checks passed'), the cost line, 'Copy details for Northgrid', the muted note and everything below are unchanged.
- S07, reached from it, uses the edited row copy.

## Interactions

- S05: tap the leading glass back button -> Navigate to S01 (slide right). Use Navigate, not Back, so S04 does not replay.
- S05: scroll -> The large title collapses to the inline 'Your connection'. The kit's soft scroll edge effect appears behind the footer. There is no hairline.
- S05: tap the 'Hotel' NativeSelect -> An iOS pull-down menu opens with the 8 types. Picking one updates the Category fit badge at once: success 'Fits a <type>' or warning 'Check with Northgrid'. A mismatch makes the 'Category fits your business' check fail, so S06 shows '1 thing to look at / 5 of 6 checks passed' with the category warning card (copy given, not built).
- S05: tap any row in the details card (the whole row, including its visual) -> Push S05b for that detail (Smart animate, 250 ms). This is the per-row edit affordance: she sees the evidence first, then the ways to fix it.
- S05: tap 'Save and see August bill' -> Save the 5 bill details and the business type as the starting point, then navigate to S06. For a first bill this screen appears only once.
- S05: tap 'Something looks off' -> Open S05a (Sheet - iPhone, Large detent, kit dimming layer).
- S05a: tap the leading xmark, or swipe down -> Dismiss and return to S05 unchanged. Tapping the dimmed strip does nothing, matching iOS at the Large detent.
- S05a: tap one of the 5 detail rows -> Dismiss the sheet and push S05b for that detail.
- S05a: tap 'This is not my bill' -> Swap to S03b 'Upload the right bill' (Medium detent). The August bill already read is kept until the new one has been read. Closing S03b returns to S05.
- S05a: tap 'Not sure' -> Push S05e with 'Which detail?' preset to 'Not sure'.
- S05b: tap the trailing 'Full bill' capsule -> Open S05v as a Large sheet: the PDF at page 1 with the same outline on the line, pinch to zoom, 'Done' to close. Not prototyped; annotate it (wire it only if S05v is built).
- S05b: tap 'We read it wrong' -> Push S05c2 (fix our reading).
- S05b: tap 'The bill is wrong' -> Push S05c (use your agreement). Demo: S05bw to S05c.
- S05b: tap 'Not sure' or 'Ask the Ohm team' -> Push S05e with 'Which detail?' preset to this detail.
- S05b (Category, Power company, Connected since): tap 'This is not my bill' -> Open S03b over S05b, as from S05a.
- S05b: tap back (or edge swipe) -> Pop to the previous screen (S05, S05u, S05w, S05d or S05s).
- S05u: tap 'Check contract demand' (footer) or the Unclear row -> Push S05bu.
- S05bu: tap 'Yes, it says 900 kVA' -> Clear the Unclear state: the row returns to Read with 900 kVA and its bar (664 of 900), and the footer primary goes back to 'Save and see August bill'. Not wired in the demo, where the bill really says 700. Annotate it.
- S05bu: tap 'No, it shows something else' -> Push S05c2.
- S05bu: tap 'Not sure' -> Push S05e preset to 'Contract demand'. When the team corrects the value, the second notification opens S05s with the 'Fixed by Ohm team' badge.
- S05c / S05c2: focus the input -> The iOS number pad opens and the footer button docks 12 above it. Typing updates the right tile, the info card and (on S05c) the button label live. The not-equal badge switches to Lucide equal in success if the two values match.
- S05c / S05c2: the value is empty, 0, or equal to the bill (S05c) or to what we read (S05c2) -> The primary stays disabled. The help text shows the matching error or 'nothing to fix' copy, in danger #AE2E24 for errors and ink-muted for 'nothing to fix'.
- S05c: tap 'Add a photo of your agreement' -> An iOS action sheet opens: Take photo / Choose from Files / Cancel. The attached file then shows as a row (Lucide file-text, file name, Lucide x to remove) in place of the button.
- S05c: tap 'Save 700 kVA' -> 700 kVA becomes the starting point, marked 'Edited by you' on 3 Sep. Pop to S05d (the row updated), and the toast 'Saved 700 kVA as your starting point.' shows for 4 s.
- S05c2: tap 'Save and recheck' -> Navigate to S04r (Dissolve). After 1,500 ms, navigate to S05g with the row 'Fixed by you' and the toast 'Rechecked. All 6 checks passed.' If a check fails, the toast reads 'Rechecked. 1 thing to look at.' and the primary leads to an S13-style summary (annotated).
- S05c2: tap 'Or upload a clearer copy of the bill' -> Open S03b with the title 'Upload a clearer copy'.
- S05c / S05c2: tap back after typing -> An iOS alert asks 'Discard this change?' with Discard (destructive) and Keep editing.
- S05d: tap the Contract demand row -> Push S05be (the edited state of S05b).
- S05be: tap 'Use the bill's number' -> Revert to 900 kVA and remove the badge. Pop to S05w and show the toast 'Back to 900 kVA, as on your bill.'
- S05d: tap 'Save and see August bill' -> Navigate to S13b ('1 thing to look at', because the bill's 900 kVA differs from Neha's 700 kVA).
- S05e: tap 'Send to the Ohm team' -> Pop to S05f: the row shows 'Being checked' and the toast 'Sent. We will notify you.' appears. 'Save and see August bill' then goes to S06p. Nothing is blocked.
- Ohm team replies (later) -> A Notification - Collapsed arrives with one of the two reply copies. Tapping it opens S05s with the badge removed, or changed to 'Fixed by Ohm team'.
- S06p: tap the 'Checking contract demand' item -> Push S05s (the Contract demand row shows 'Being checked').
- S06 / S13 / S06p: tap the 'Northgrid · HT' trailing capsule -> Push S05s. This keeps the S05 footnote's promise.
- S05s: change the business type -> It saves at once, with the toast 'Saved.' The Category badge and the S07 check follow.
- S05s: tap 'Something looks off' (end of content) -> Open S05a.
- S13b: tap 'Copy details for Northgrid' -> Copy the clipboard text, then show the toast 'Copied'.

## Research

- Lloyds Mobile Banking https://mobbin.com/screens/f7a27995-e8c7-4923-b1e6-9d53cd1e3559: 'Have we read your ID correctly?' with Yes / 'No, try again' is the self-doubting question the lead objected to, and its only remedy is to scan again. S05 states facts instead and offers real ways to fix a detail.
- Starling (payee match) https://mobbin.com/screens/241a9904-e430-406c-b842-37b8e16d1187: It leads with a statement of what was matched before listing the values. This is the model for 'Your connection' and its starting point card.
- Shopee (ID details) https://mobbin.com/screens/961a6b0a-01ae-4fd8-8f32-a007c6b92e26: It names the source ('collected from ID photo') and both remedies (upload again or edit). This became the 'From your August 2026 bill, Page 1' provenance and the split between 'This is not my bill' and fixing a detail.
- GoPay (split bill, receipt scanned) https://mobbin.com/screens/465e2773-660b-4a11-b7af-fb9747fef87e: Only the uncertain line is tinted in warning ('Make sure this amount is correct'), with a receipt thumbnail and 'Rescan receipt' as a secondary action. This became the Unclear row state (warning-subtle fill on one row only) and the 'Upload a clearer copy' link.
- CRED (change bill amount) https://mobbin.com/screens/bf7326c3-8400-4c4e-938c-7ec9c1ac7251: An Indian fintech reference. Before a value is changed, it lays out the original and the resulting amounts side by side, with a plain warning. This supports S05c's compare tiles and the info card, which spells out the consequence ('This bill says 900 kVA, so we will flag it') before saving.
- Splitwise https://mobbin.com/screens/bab6fc0a-6b74-4cb8-bd12-5d416fba63eb: Shows the receipt image next to the totals it extracted. This led to S05b's evidence card, where the source sits above the reading.
- Monzo https://mobbin.com/screens/2c508891-0360-4537-b09b-4660ac2c1173: 'We've filled in your details with what you've told us before', plus a friendly illustration. Saying where the data came from, with a visual, makes the confirmation feel calm.
- GoodRx https://mobbin.com/screens/67a694a8-9415-4bc6-8ec4-6ec884d783b4: Explains why the information matters before showing it. This became the starting point card, which replaces the intro paragraph.
- Turo https://mobbin.com/screens/7e7fe513-3024-43d1-b185-6bdb0d01231e: An inline 'Verifying' badge sits next to the data it refers to. This led to the per-row 'Edited by you', 'Fixed by you' and 'Being checked' badges.
- Cleo AI https://mobbin.com/screens/fa9b7ba9-3a9d-4949-83c7-23c4fd9629b7: Values the user owns are editable in place. On S05 only 'Your business' is edited in place; values read from the bill go through the evidence screen first.
- Quizlet https://mobbin.com/screens/2c66cb2e-4d24-4048-a31f-e096aebc990a: 'Here's what we scanned', with Edit first and Rescan second. In S05c2, uploading a clearer copy is a link under the manual fix.
- Brex https://mobbin.com/screens/590f0b25-00c8-47b4-8a81-51bcdf73d3e1: Flags only the uncertain field and keeps the rest calm. This led to the rule that S05 asks a question only when a row is Unclear.
- Zomato (India) https://mobbin.com/flows/64cbc8cf-847b-43a0-a97a-9f68a521a7de: 'Found an error? Report error' opens a list of what is wrong (plus 'Others'), then a toast in place. This shaped S05a and the toasts on return. CRED and Zomato were the only Indian apps the searches surfaced; no Jupiter, Fi, PhonePe, Paytm or Groww screens matched.
- Starling (suggest an edit) https://mobbin.com/flows/a319e6f8-e72f-4b89-b829-9b65ff830db7: A low-key 'Are any of the business details wrong?' leads to free text and a light confirmation. This shaped the S05e hand-off.
- Lovi https://mobbin.com/flows/477de7d1-ca31-4200-84f6-e7a072ff2171: A 'Wrong?' sheet includes 'It's not the one I scanned'. This became 'This is not my bill', which leads to S03b.
- Klarna https://mobbin.com/flows/061bee71-40e8-4b7f-91ff-a84065b915fa: Keeps self-serve fixes apart from contacting support. On S05b the 'Ask the Ohm team' option has its own icon tile, apart from the self-fix options.

## Code notes
Build notes for the Figma designer. No Figma changes were made.

PROTOTYPE FLOWS (page Screens):
- 'First bill' (existing starting point at S01): S01 > S03 > S04 > S05 > S06. Branch: S05 > S05a > S05b > S05e > S05f > S06p. Also S05a > S03b.
- New starting point 'First bill, unclear reading' at S05u: S05u > S05bu > S05c2 > S04r (After delay 1,500 ms) > S05g > S06.
- New starting point 'First bill, the bill is wrong' at S05w: S05w > S05bw > S05c > S05d > S13b. Also S05d > S05be > S05w (with a toast).
- Monthly world: S06, S13 and S06p 'Northgrid · HT' capsule > S05s > S05b (July subtitle).
- Change S05's back from Back to Navigate to S01.

COMPONENTS:
- Make 'Connection row' a local component with these properties:
  - Label, Helper and Value (text).
  - State: Read / Unclear / Edited by you / Fixed by you / Fixed by Ohm team / Being checked.
  - Visual: None / Capacity bar / Meter equation / Fit badge.
  - Pressed (bool).
- It uses vertical auto layout with hug height, so the S05 clones reflow on their own.
- Also make a local 'Toast' component.
- Following DECISIONS, do not edit local components in place, because the v1 archive uses them. Make new components.

KIT MAPPING:
- iOS kit: Status bar - iPhone 17 Pro; Toolbar - Top - iPhone (Large Title on S05; Title 2 Line Left with the trailing text capsule on S05b; Default elsewhere); Sheet - iPhone (Large for S05a and S05v, Medium for S03b); Home Indicator; Notification - Collapsed; the kit's scroll edge effect for footers (no hairlines).
- shadcn: Button (Default, Ghost, Outline, all Rounded; Link inside a 44 frame); Item; NativeSelect; Input + Field; Textarea (or a resized Input); Badge using the DECISIONS recipe (Secondary with brand fills); Alert; Separator; SliderTrack + SliderRange; Spinner (S04r); Lucide.

LUCIDE NAMES: check each in the kit's set (it ships older names, for example line-chart). Fallbacks:
- circle-check > check-circle
- triangle-alert > alert-triangle
- scan-text > scan
- file-x-2 > file-x
- file-warning > file-exclamation-point, or alert-triangle in the same tile
- file-pen-line > file-signature or file-edit
- equal-not > the equal glyph with a 1.5 px slash drawn over it
- pin > map-pin
- Also used: rotate-ccw, upload, paperclip, message-circle, clock, calendar, zap, info, pencil, check, x, file-text, chevron-right.

NUMBERS:
- No new rupee figures. Reused as given: ₹32,971, 8 Sep, ₹4,620, ₹55,440, 664 / 700 / 900 kVA, 2,000, 3,26,500 (the August units on the bill), 3 Mar 2021.
- Derived: bar widths 664 / 700 × 329 = 312 and 664 / 900 × 329 = 243; 3 Mar 2021 to 3 Sep 2026 = 5 years and 6 months; the 'Edited by you' date is today, 3 Sep.
- The 900 'misread' in the unclear world reuses an existing value and is not a new figure.
- The old '163.25 on your meter' is removed.

DATE AND WORLD FIXES:
- S04 row: 'Found Northgrid Electric, August 2026'.
- S13b and S06p toolbars: 'August 2026'.
- S05 labels name the August 2026 bill (first-bill world). S05s and S05b-from-S05s name July 2026 (monthly world; the first bill in Ohm was July 2026, paid 5 Aug).
- Annotate both worlds on the canvas.

COPY RULES CHECKED:
- No em or en dashes. The equation uses '×' and '='; ranges in this spec say 'to'.
- Indian number format.
- No clock times needed.
- No 'guess', 'think' or 'should' on S05.
- Helpers are 39 characters or fewer, and toasts 42 or fewer, so all fit on one line at the stated widths.

## Open questions

- Where I kept my choice against the critic:
(1) The 'We read' row shows Ohm's read confidence ('Read clearly' / 'Not clear'), not a 'matches the bill' tick. If Ohm misread, it would also believe it matched, so a match tick would be false exactly when it matters. The comparison stays Neha's, made by eye across the two layers.
(2) The misread demo uses 'printed 700, read 900' instead of the critic's '900 printed, 700 read'. The fix then lands in the standard 700 kVA world and reuses the existing S06, and 7 and 9 are a realistic misread.
(3) S05a stays on the Large detent. The kit has only Medium and Large, all 7 rows fit Large without scrolling, and a scrolling list inside a swipe-to-dismiss sheet is fiddly.
(4) S05e keeps a small (76 tall) hero, because the lead asked for visual aids. It can be deleted with no layout change, since the content is a stack.
- Frame count: 20 frames are specified, but most are clones. If that is too heavy, build in tiers.
- Tier 1, which answers the feedback: S05, S05a, S05b, S05c, S05d, S05e, plus the clones S05w, S05bw and S13b.
- Tier 2: S05u, S05bu, S05c2, S04r, S05g, S05f, S06p.
- Tier 3: S05s, S05be, S05v, S03b.
The user's own path stays short: a row takes 1 tap to reach the evidence and 2 to reach a fix.
- Unclear state: while a row is Unclear, the S05 primary becomes 'Check contract demand' instead of 'Save and see August bill', so an unclear baseline is never saved silently. 'Not sure' always exits in 2 taps. Is that acceptable, or should 'Save' stay available and S06 show '1 detail to check' instead?
- Category fit rule: which business types fit HT Commercial? The demo covers only Hotel. The other 7 options, and the mismatch copy on S06 and S07 for each, need a mapping from someone who knows Northgrid's rate plans.
- Provenance: are all 5 details printed on page 1 of a Northgrid HT bill, and what are the printed labels? The crop uses Ohm's names (for example 'Contract demand'). If the bill says something else (for example 'Sanctioned demand'), the crop should show the printed label.
- Meter multiplier: S05b now uses the generic chips by default, with the bill's real 'In August: 3,26,500 units'. If the bill prints the opening and closing readings, should S05b show the printed difference, with its page?
- First-bill world: S05 to S05g assume August 2026 is the first bill in Ohm, but the prototype's 'First bill' flow starts on the S01 that already lists July 2026 as paid. Should we build an empty S01 ('no bills yet') for this flow, or annotate the mismatch?
- Ohm team replies: the copy promises a notification but no time. Add a time only once operations can stand behind it. Does the team reply also need an in-app place (for example a row in S05s) for people who miss the notification?
- Should a value 'Edited by you' be included in 'Copy details for Northgrid' and in the share card? Should an attached agreement photo be stored and reused when Neha raises the issue with Northgrid?
- Who can change the starting point after the first bill? Only Neha, or also the owner the bill is shared with? Should S05s list each change with a name and date?
- S13b reuses S13's cost line (₹4,620 more this month, ₹55,440 a year). Confirm the figure still holds when 700 kVA comes from Neha's agreement rather than from an earlier bill.