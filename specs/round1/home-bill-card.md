# home-bill-card

## Summary

The card becomes a strict three-step stack. The bill amount is the only large element. One muted line carries the single offer ("Pay by Tue 8 Sep and save ₹32,971"), with only the saving in green. One blue "Review and pay" button follows. The real due date moves into the small label above the amount ("August bill · due Wed 16 Sep"), so the card says how much and by when without a strip, clock or countdown badge. The vague green pill becomes a quiet footer row that answers the question the way CRED does: "No hidden charges or penalties" over "Charged at the regulator's rates". It sits next to a 36 pt mini of the S04 bill illustration, which wears a tick. The bare plus becomes a labelled Liquid Glass "Add bill" button, because adding next month's bill is its real job. Every string was measured in Inter and fits its slot.

## Layout

Frame 393 x 852, fill surface-muted #F1F2F4, page gutter 16. Everything below the toolbar scrolls; the tab bar is unchanged.

Text widths in this spec were measured with the Google Fonts build of Inter in a browser. Expect about 2 px of difference against Figma. The old line "Pay ₹36,09,190 by Tue 8 Sep to save ₹32,971" measured 342 px, which confirms the critic's 344 and is why it was cut.

1. STATUS BAR: use the "Status bar - iPhone 17 Pro" kit instance at its native height, 62, at y 0.

2. HEADER: "Toolbar - Top - iPhone", Style = Title 2 Line Left, at y 62, native height 54. Liquid Glass scroll-edge effect on.

 - Leading slot, 44 x 44 at x 16:
   - shadcn Avatar 40, centred. Fallback "NK", sm 14 semibold, primary #265CFF on primary-subtle #E9EFFF.
   - Glass capsule hidden. In Figma, use a plain 44 frame if the slot forces glass. In the build, use .sharedBackgroundVisibility(.hidden).
   - Not interactive in this release, and hidden from VoiceOver. The title carries the context.

 - Title block at x 72 (12 after the slot), max width 181. Not interactive. Tail truncation is only a safety net.
   - Line 1: "Harbourline Hotels", lg 18 semibold, ink-strong #091E42, line-height 24. Measured 163 px.
   - Line 2: "Riverside · Northgrid", sm 14 regular, ink-muted #44546F, line-height 20. Measured 136 px. "Northgrid" is the approved short name.

 - Trailing slot: kit glass button group in text mode. One capsule, 44 tall, hug width 112, right edge at x 377.
   - Contents: 14 left padding, Lucide "plus" 18 (stroke 2), 6 gap, "Add bill" in base 16 medium (57 px), 16 right padding.
   - Icon and label are ink-strong #091E42, not blue. The card's button stays the only blue control on screen.

 - Width check: 16 + 44 + 12 + 181 + 12 + 112 + 16 = 393.

 - Removed from the header:
   - The outline Icon Button with the bare plus.
   - The "A/c 4410 28••••" text. It moves to the Your connection sheet (S01a), which opens from S06.

3. BILL CARD, component "Bill card / Home", Layout = Default.
 - Position: x 16, y 128 (62 + 54 + 12), width 361, height 283.
 - Fill #FFFFFF, radius 16, no border, no shadow, clip content on.
 - Vertical auto layout. The top section has 20 padding on the top and sides. The footer row is full bleed.

 a. Eyebrow: "August bill · due Wed 16 Sep". base 16 regular, ink-muted #44546F, line-height 24, one style. Measured 215 px. The due date lives here in every state.
 b. Gap 4.
 c. Hero row: horizontal auto layout, baseline aligned, gap 2.
   - "₹" in 24 medium ink-muted (13 px).
   - "36,42,160" in 4xl 36 semibold ink-strong #091E42, line-height 44, letter-spacing -0.5, proportional figures (not tnum). Measured 173 px.
   - Row is about 186 wide. Nothing sits beside or under it.
 d. Gap 8.
 e. Supporting line: one text layer, base 16, line-height 24.
   - Spans: "Pay by Tue 8 Sep and " in regular ink-muted, then "save ₹32,971" in medium success #216E4E.
   - Measured 268 px, so it is one line with 53 px to spare.
   - No icon, tint, container, badge, or final full stop. It holds one figure and one emphasis.
 f. Gap 20.
 g. Primary action: shadcn Button, Variant Default, Roundness pill, 50 tall, fill width 321, fill primary #265CFF. Label "Review and pay", base 16 semibold #FFFFFF (121 px).
 h. Gap 20.
 i. shadcn Separator: 1 px, line #DCDFE4, inset 20 on each side (width 321).
 j. Reassurance footer row: shadcn Item, full bleed, 361 x 68.
   - Padding 14 top and bottom, 20 left and right. No border and no fill at rest. The whole row is one tap target.
   - Horizontal, vertically centred: "Bill status mini" State=Checked (36 x 36), gap 12, text column (fill, 249 wide), gap 8, Lucide "chevron-right" 16 (stroke 2, ink-muted).
   - Title: "No hidden charges or penalties", sm 14 medium, ink #172B4D, line-height 20. Measured 209 px.
   - Description: "Charged at the regulator's rates" (typographic apostrophe), sm 14 regular, ink-muted, line-height 20. Measured 209 px.
   - Both fit on one line, which fixes the old 240 px semibold title and the two-line description.

 Card height: 20 + 24 + 4 + 44 + 8 + 24 + 20 + 50 + 20 + 1 + 68 = 283. The card ends at y 411. Gap 16, then the usage chart card at y 427 (other designer).

 Type ramp (write this on the component so the builder keeps it):
 - Hero: 36 semibold.
 - Eyebrow and line: 16 regular muted, with one 16 medium green span.
 - Button: 16 semibold white on blue.
 - Footer row: 14 medium over 14 regular.

 Colour on the card in the default state is limited to four things: the blue button, the green "save ₹32,971", and the blue tile and green tick inside the 36 pt illustration.

4. VARIANTS of "Bill card / Home". These are the same frame with the same slots. Every copy string fits on one line, so the date states never change the height. The copy table holds the strings.

 - Layout=Default: as above. It covers 3 to 16 Sep and Overdue; only the eyebrow, hero and line text change. Build these frames:
   - Default (3 Sep).
   - Save today (8 Sep).
   - Due today (16 Sep).
   - Overdue (from 17 Sep).
   - 7 Sep, 9 to 14 Sep and 15 Sep are copy-only rows in the table.

 - Layout=Flagged (S13 scenario). The flagged row moves above the button, so the problem is read before paying. Order:
   - Eyebrow, hero and line as Default.
   - Gap 16, then a separator (inset 20).
   - Item, full bleed, 361 wide, padding 14 and 20, containing:
     - "Bill status mini" State=Flagged.
     - Title "1 thing to look at", sm 14 medium, warning #A54800.
     - Description "Contract demand changed. ₹4,620 extra this month", sm 14 regular ink-muted. It wraps to 2 lines (345 px in a 249 column).
     - Chevron.
   - Separator, gap 20, button, bottom padding 20. There is no footer row.
   - Height: 20 + 24 + 4 + 44 + 8 + 24 + 16 + 1 + 88 + 1 + 20 + 50 + 20 = 320.

 - Layout=Paid: same as Default, height 283.
   - The button becomes shadcn Button, Variant Secondary, pill, 50 tall, fill surface-muted #F1F2F4. Label "View receipt", base 16 semibold ink-strong.
   - The footer row stays.

 - Caught-up caption (only with Paid confirmed):
   - Sits outside the card, 8 below it, at x 20.
   - sm 14 regular ink-muted: "When September's bill arrives, tap Add bill." Measured 284 px.
   - The usage card moves down by 28.

5. HANDOFF to the owners of other screens. "Review and pay" must not land on the patterns the user rejected.

 - S06 Bill summary:
   - Nav title: "August 2026".
   - Hero sub-line: "due Wed 16 Sep".
   - Replace the green "All 6 checks passed" strip with the same row in a white card: Item, mini illustration State=Checked, "No hidden charges or penalties" over "Charged at the regulator's rates", chevron to S07.
   - Replace the blue pay box with a white card of two label and value rows: "Pay by Tue 8 Sep" with "₹36,09,190", and "You save" with "₹32,971" (value in success).
   - Under that card, a muted footnote: "If paid late, it becomes ₹36,87,690."
   - Drop "5 days left", the progress dashes and "which is ₹45,527 more".
   - Make the "Northgrid · HT" glass chip open S01a.
 - S07: retitle it "What Ohm checked". Open with the line "Hidden charges are wrong rates, changed settings or penalties that raise your bill." Add a last link in the "How we check" box: "See the details we compare against" (opens S01a).
 - S11:
   - "August 2026", and the date "3 Sep 2026, 11:42 AM".
   - Reference "UTR HDFCR52026090312345".
   - The chip "You saved ₹32,971" sits next to the status "Paid, waiting for Northgrid to confirm", which contradicts it. Suggest "₹32,971 saving applies once Northgrid confirms".
 - S13: "August 2026".
 - S04: "Found Northgrid Electric, August 2026".
 - S02:
   - The lock screen date should read "Thursday, 3 September", because 3 Sep 2026 is a Thursday.
   - Notification message: "No hidden charges or penalties. Pay by Tue 8 Sep and save ₹32,971."
 - S01 Past bills: "July 2026".

## Copy

- **Toolbar title**: Harbourline Hotels
- **Toolbar subtitle**: Riverside · Northgrid
- **Avatar fallback (decorative, hidden from VoiceOver)**: NK
- **Toolbar trailing glass button**: Add bill
- **Add bill VoiceOver hint**: Upload, photograph or forward a Northgrid bill
- **Eyebrow, Thu 3 to Mon 14 Sep (one style, ink-muted)**: August bill · due Wed 16 Sep
- **Eyebrow, Tue 15 Sep ("due tomorrow" in ink-strong medium)**: August bill · due tomorrow
- **Eyebrow, Wed 16 Sep ("due today" in warning #A54800 medium)**: August bill · due today
- **Eyebrow, from Thu 17 Sep unpaid ("overdue" in danger #AE2E24 medium)**: August bill · overdue
- **Eyebrow, paid (both paid states)**: August bill · paid Thu 3 Sep
- **Hero, until Wed 16 Sep (what Northgrid says is owed)**: ₹36,42,160
- **Hero, from Thu 17 Sep unpaid**: ₹36,87,690
- **Hero, paid**: ₹36,09,190
- **Supporting line, Thu 3 to Sun 6 Sep ("save ₹32,971" in success medium)**: Pay by Tue 8 Sep and save ₹32,971
- **Supporting line, Mon 7 Sep**: Pay by tomorrow and save ₹32,971
- **Supporting line, Tue 8 Sep**: Pay today and save ₹32,971
- **Supporting line, Wed 9 to Wed 16 Sep (all ink-muted)**: If paid late, it becomes ₹36,87,690
- **Supporting line, from Thu 17 Sep unpaid (explains the bigger hero)**: Includes the charge for paying late
- **Supporting line, paid, waiting for Northgrid**: Waiting for Northgrid to confirm
- **Supporting line, paid and confirmed ("You saved ₹32,971" in success medium)**: Northgrid confirmed. You saved ₹32,971
- **Primary button (all unpaid states)**: Review and pay
- **Button, paid states (Secondary)**: View receipt
- **Footer row title**: No hidden charges or penalties
- **Footer row description**: Charged at the regulator’s rates
- **Footer row VoiceOver hint**: Shows what Ohm checked
- **Flagged row title (warning #A54800)**: 1 thing to look at
- **Flagged row description (figures from the existing S13 scenario)**: Contract demand changed. ₹4,620 extra this month
- **Caught-up caption under the card (Paid confirmed only)**: When September’s bill arrives, tap Add bill.
- **Card summary VoiceOver label, default state (hero read in lakh)**: August bill, due Wednesday 16 September. 36 lakh 42 thousand 160 rupees. Pay by Tuesday 8 September and save 32 thousand 971 rupees.
- **S03 Add a bill sheet, new helper line under the title**: Ohm reads it and checks it in about 10 seconds.
- **S01a sheet title**: Your connection
- **S01a intro**: Ohm checks every new bill against these details from your first bill. If one changes, we tell you.
- **S01a rows (label / value)**: Business type / Hotel; Power company / Northgrid Electric; Account number / 4410 28••••; Category / HT Commercial; Contract demand / 700 kVA, with the sub-line "The power you booked"; Meter multiplier / 2,000; Connected since / 3 Mar 2021
- **S07 title (handoff)**: What Ohm checked
- **S07 opening definition (handoff)**: Hidden charges are wrong rates, changed settings or penalties that raise your bill.
- **S07 link to S01a (handoff)**: See the details we compare against
- **S06 pay card rows (handoff, label / value)**: Pay by Tue 8 Sep / ₹36,09,190; You save / ₹32,971
- **S06 pay card footnote (handoff)**: If paid late, it becomes ₹36,87,690.
- **S02 notification (handoff, title / message)**: August bill is here: ₹36,42,160 / No hidden charges or penalties. Pay by Tue 8 Sep and save ₹32,971.

## Illustrations

### Bill status mini (component set, State = Checking / Checked / Flagged)
- Concept: This is the S04 "Reading your bill" object at icon size: white paper on a soft blue tint. In S04 it wears a spinner while Ohm reads. On Home it wears a tick once Ohm has checked it, or an amber "!" when something needs a look. This one object replaces the green pill as the visual for "Ohm read this and it is fine". CRED's hidden-charges explainer uses the same idea: a small tinted tile with a tick badge, not a status chip.
- Construction: Frame 36 x 36, clip off.

TILE: rectangle 36 x 36, radius 10, fill primary-subtle #E9EFFF.

PAPER: rectangle 20 x 26 at (6, 3), radius 4, fill #FFFFFF, no stroke.

ACCENT: 4 x 4 at (9, 6), radius 1, fill primary #265CFF. This is the S04 lightning tile reduced to a dot. It is decorative and the only blue outside the button.

SKELETON LINES: 2.5 tall, radius 1.25, fill line #DCDFE4.
- 8 wide at (15, 6.75).
- 12 wide at (9, 12.5).
- 9 wide at (9, 17.5).

BADGE: ellipse 14 x 14 at (20, 20) with a 2 px outside stroke #FFFFFF. It overlaps the paper's bottom-right corner (the paper ends at 26, 29), and the ring stays inside the tile (it reaches 36).
- Checked: fill success-subtle #DCFFF1, Lucide "check" 9 x 9 centred, stroke 2 absolute (turn off scale strokes), success #216E4E.
- Flagged: fill warning-subtle #FFF7D6, "!" in Inter 10 semibold, warning #A54800, centred.
- Checking: fill #FFFFFF with a 1 px inside stroke in line #DCDFE4, and a shadcn Spinner 9 in primary. The S04 scan is added on the paper: a band 20 x 5 at (6, 11) in #E9EFFF behind skeleton line 2, and a scan line 1.5 tall at y 13 from x 3 to x 29 in primary #265CFF, radius 0.75.

Make the big S04 illustration a sibling component with the same State property and the same shape order, so S04 and S01 are visibly the same object.
- Hover: There is no hover on iOS, and pressing the row does not change the illustration. It animates once, on the first view after a new bill is checked, going from Checking to Checked:
1. The spinner arc closes into a full ring (200 ms, ease-out) while the scan line and band fade out (150 ms).
2. The badge fill cross-fades from white to #DCFFF1.
3. The tick draws in with a stroke-dashoffset animation (160 ms) and a 1.0 to 1.08 to 1.0 scale (spring, about 250 ms).
Under Reduce Motion this is a single cross-fade. It never loops.

## New screens

### S01a Your connection (sheet)
- Purpose: This sheet is the new home for the account number removed from the Home header. It also shows non-technical users what Ohm compares each bill against, which makes "No hidden charges or penalties" believable. It opens from S06's "Northgrid · HT" chip and from the S07 link, not from the avatar.
- Layout: Sheet - iPhone, Large detent, grabber on, content fill surface-muted #F1F2F4.

- Header: in-sheet Toolbar - Top, Style Default. Title "Your connection", lg 18 semibold ink-strong. Trailing glass close button (Lucide "x") that dismisses the sheet.
- Content padding 16.
- Intro: "Ohm checks every new bill against these details from your first bill. If one changes, we tell you." sm 14 ink-muted, line-height 20, wrapping to 2 lines. Then a 16 gap.
- White card, radius 16, padding 0 and 16, holding 7 shadcn Item rows divided by Separator (line #DCDFE4).
  - Each row is at least 52 tall: label on the left in sm 14 ink-muted, value on the right in base 16 medium ink-strong.
  - Rows: Business type / Hotel; Power company / Northgrid Electric; Account number / 4410 28••••; Category / HT Commercial; Contract demand / 700 kVA, with "The power you booked" under the label in xs 12 ink-muted; Meter multiplier / 2,000; Connected since / 3 Mar 2021.
- Nothing is editable, and there is no copy action, because only the masked number exists in the data.

## Interactions

- Tap the "Add bill" glass button -> Opens the existing S03 "Add a bill" sheet. Its only change is the helper line under the title: "Ohm reads it and checks it in about 10 seconds." It still offers Upload the PDF, Take a photo, Forward the email, and Connect your Northgrid account (Coming soon). Picking one leads to S04 Reading.
- Tap "Review and pay" -> Pushes S06 Bill summary. The hero morphs into the S06 hero (matched geometry, spring about 350 ms) only when both show the same number. That holds in every state from 3 to 16 Sep (₹36,42,160). In Overdue, S06 must also show ₹36,87,690, or the transition falls back to the standard push. Under Reduce Motion it is always the standard push.
- Tap the reassurance footer row -> Pushes S07, retitled "What Ohm checked". Pressed state: the full-bleed row (361 wide) fills with surface-muted #F1F2F4, clipped by the card's radius 16 at the bottom corners.
- Tap the flagged row (Layout=Flagged) -> Pushes S13. The row sits above the button, so the problem is read before paying. The supporting line and "Review and pay" stay, because S13 says she can still pay and keep the discount.
- Tap "View receipt" (Layout=Paid) -> Opens S11 for the August payment.
- Press the primary button -> Standard system highlight only. There is no custom scale and no haptic. Haptics are reserved for payment success on S11.
- Tap the NK avatar or the title block -> Nothing happens in this release. Neither is a control, and both are hidden from VoiceOver, so there is no hidden tap. The account details live in S01a, opened from S06's "Northgrid · HT" chip or the S07 link.
- Tap the "Northgrid · HT" chip on S06 or "See the details we compare against" on S07 -> Opens S01a Your connection (Sheet - iPhone, Large detent), read-only.
- Today's date changes (unpaid) -> Only the text changes, and the height stays 283.
- 3 to 6 Sep: the line reads "Pay by Tue 8 Sep and save ₹32,971".
- 7 Sep: "by tomorrow".
- 8 Sep: "today".
- 9 to 16 Sep: the line becomes "If paid late, it becomes ₹36,87,690" with no green.
- 15 Sep: the eyebrow becomes "due tomorrow" (ink-strong medium).
- 16 Sep: "due today" (warning medium).
- From 17 Sep: the eyebrow reads "overdue" (danger medium), the hero switches to ₹36,87,690 and the line explains it.
Urgency only appears as words, and colour appears only on the last day.
- Payment completes (S11, then Done) -> The card switches to Layout=Paid. The eyebrow reads "August bill · paid Thu 3 Sep", the hero is ₹36,09,190, the line reads "Waiting for Northgrid to confirm" and the button is "View receipt". The saving is not claimed yet.
- Northgrid confirms the payment -> The line becomes "Northgrid confirmed. You saved ₹32,971" and the caught-up caption appears under the card: "When September's bill arrives, tap Add bill."
- A check fails on a new bill -> The card switches to Layout=Flagged and the illustration badge turns amber. The height grows from 283 to 320, which is expected for this state.
- First view of Home after a new bill finishes checking -> The mini illustration plays once from Checking to Checked; see the illustration spec. Under Reduce Motion it is a plain cross-fade. It never loops.
- VoiceOver -> The card reads as three elements in order:
1. The summary (eyebrow, hero and line grouped, with the rupees read in lakh).
2. The button.
3. The footer row as one element, with the hint "Shows what Ohm checked".
The header reads the title block and then "Add bill".
- Larger Dynamic Type -> The hero scales up to AX1 (44 pt, measured 225 px, so it fits) and is capped there. The eyebrow, line and row text wrap and never truncate, and the card grows.

## Research

- CRED (card statement) https://mobbin.com/screens/4b32ea66-a7dc-4ba1-99f1-335da21df047: The model for the whole card:
- One amount, one muted line ("pay before due date to avoid late fees") and one "Pay now" button.
- The due date is a small label, not a countdown.
- The reassurance is an answer ("zero" with "hidden charges detected") marked by a tiny dot, placed after the action. That gives us answer-first copy, quiet colour and the footer position.
- CRED (hidden charges explainer) https://mobbin.com/screens/96d0a839-4a2d-44b3-9380-15f7e7fb1488: It defines the term before listing anything ("hidden charges are fees secretly added to your bills"). It uses a small tinted tile with a tick badge as its only visual. This is the source for the S07 opening definition and for the tile-and-tick mini illustration.
- CRED (manage your cards, list) https://mobbin.com/screens/8d2ba255-bf24-4641-810b-2a4f8538e092: "DUE ON 4 APR" is plain small text, and "FULLY PAID" is a green text state with no pill. A one-line "powered by CRED protect" footer carries the trust. This supports putting the due date in the eyebrow and showing the paid state as words.
- CRED (manage your cards, Add card) https://mobbin.com/screens/12a90aef-920e-406c-8e15-281c0a63917e: A labelled "Add card" button sits top right instead of a bare glyph. This is a direct precedent for the labelled "Add bill" glass button.
- CRED (bill payment sheet) https://mobbin.com/screens/2d6962d4-70e9-4d2a-bca2-5f42ed96aeae: The trust line "100% secure and superfast payments" is a small footer under the options, not a badge next to the amounts.
- Zopa Bank (payment scheduled) https://mobbin.com/screens/c6aa1040-e970-4cce-81e4-8e82746c52b7: It says when the receiver will get the money and "We'll let you know once it's been sent", and claims nothing early. This is the basis for "Waiting for Northgrid to confirm" before "You saved ₹32,971".
- Careem (bill with nothing due) https://mobbin.com/screens/9f562ade-8a5c-4a11-b7e9-6c12ce7808bd: A caught-up bill keeps the amount layout and adds one muted line about what happens next. This is the basis for the caught-up caption, "When September's bill arrives, tap Add bill."
- Octopus Energy (bills and payments) https://mobbin.com/screens/ee90f822-a8db-498f-98a8-7e1d274b293f: In an energy app, a chevron next to the property name means "switch property". Ohm has one connection, so the title block gets no chevron and is not a hidden entry point.
- Grab (pay bill with discount) https://mobbin.com/screens/a305ba9b-d834-4205-88b3-b4a7b47461fc: The saving is shown as green text in plain words, with no countdown or tinted box. We borrow green text only for "save ₹32,971".
- Revolut Business (bill detail) https://mobbin.com/screens/ef78b340-6893-4314-973a-96a757d46812: "Bill due today" urgency appears only on the day. This supports the date-driven "tomorrow" and "today" wording in place of a permanent "5 days left" badge.
- Wise (home) https://mobbin.com/screens/7e0d7d7a-a184-42f0-87dc-6be74cf68a2a: Header actions are labelled verbs ("Add money"), not icons, which is easier for non-technical users to read.

## Code notes
Figma build notes. No Figma files were modified for this spec.

COMPONENT
- Build "Bill card / Home" as a component set with Layout = Default / Flagged / Paid.
- Mixed-colour spans in the eyebrow and line are lost when a text property is overridden, because Figma resets the span styles. So make each demo state its own variant (Default, Save today, Due today, Overdue, Flagged, Paid waiting, Paid confirmed) and do not override text properties.
- The remaining dates are rows in the copy table.

TEXT STYLES (library styles only)
- base 16: eyebrow, line, button.
- 4xl 36: hero.
- sm 14: header subtitle and footer row.
- lg 18: toolbar title.
- Hero digits use proportional figures. Turn on tnum only where numbers stack: Past bills, the breakdown and the S10 amounts.
- No final full stop on card lines. Use a full stop between two sentences, and at the end of captions and helper text.

TOKENS USED
- ink-strong #091E42: hero, header title, emphasis.
- ink #172B4D: footer row title.
- ink-muted #44546F: eyebrow, ₹ glyph, line, descriptions, chevron.
- primary #265CFF: button and the 4 x 4 accent.
- primary-subtle #E9EFFF: illustration tile.
- success #216E4E on #DCFFF1: saving span and tick badge.
- warning #A54800 on #FFF7D6: \"due today\" and Flagged.
- danger #AE2E24: \"overdue\" only.
- line #DCDFE4: separator and skeleton lines.
- surface-muted #F1F2F4: page, pressed row, Secondary button.

REMOVE
- From the card: the shadcn Badge \"All 6 checks passed\", the primary-subtle strip with the clock icon, and the amber Badge \"5 days left\".
- From the header: the outline Icon Button with the plus glyph, and the \"A/c 4410 28••••\" text.

iOS AND LIQUID GLASS
- Status bar: native 62. Toolbar: native 54. The card starts at y 128.
- The avatar's toolbar item hides the shared glass background (SwiftUI .sharedBackgroundVisibility(.hidden)).
- \"Add bill\" uses the kit's text-mode glass capsule.
- No custom button scale or haptic.

ACCESSIBILITY
- Tap targets: Add bill 44, button 50, footer row 68, flagged row 88.
- Group eyebrow, hero and line into one element, with rupees read in lakh.
- Text wraps and never truncates. The hero is capped at AX1.

MEASUREMENTS
- Inter (Google Fonts build), measured in a browser.
- Header: title 163, subtitle 136, Add bill label 57.
- Eyebrows: default 215, due tomorrow 200, due today 169, overdue 155, paid 208.
- Hero: 173 (tnum would be 182).
- Lines: default 268, tomorrow 264, today 211, late 259, overdue 262, paid waiting 241, paid confirmed 306.
- Footer: title 209, description 209.
- Flagged: title 109, description 345 (wraps by design).
- Caption: 284. S03 helper: 316.

COPY
- No em or en dashes anywhere.
- The middle dot in \"Riverside · Northgrid\" and \"August bill · due Wed 16 Sep\" is intentional.
- 12-hour clock.

RESEARCH
- Four Mobbin searches were run (iOS, design_tool, Figma). Of the Indian fintech apps, only CRED surfaced; Jupiter, Fi, PhonePe, Paytm and Groww did not appear for these queries.

## Open questions

- I disagree with one critic point: the hero is NOT always "the amount she would pay now". It shows what Northgrid says is owed today: ₹36,42,160 until 16 Sep, ₹36,87,690 once overdue, and ₹36,09,190 once paid. The early amount is an offer. If it were the hero, Home would disagree with the PDF she is holding and with the S06 hero, and it would bring back the 36,09 against 36,42 confusion. Whenever the hero does swap, the eyebrow says why. Is the team happy with this rule?
- "due tomorrow" and "due today" go in the eyebrow, not the line as the critic proposed ("Due tomorrow. After that it is ₹36,87,690."). The due date then has one fixed home, and the line keeps a single job. Agree?
- Legal and product: is "No hidden charges or penalties" acceptable? Ohm checks rates, settings, penalties and the discount, but relies on the meter reading printed on the bill. A softer fallback is "No overcharges found" (title) with the same description.
- If testing shows "regulator" is unclear to users, the fallback description is "Charged at the official rates" (183 px, fits).
- Should "Review and pay" keep going through S06 (recommended, since S06 explains the 1.5% rise), or go straight to S10? If straight to S10, the button could read "Pay ₹36,09,190" (118 px). That would be the only place the early amount appears on Home.
- The avatar is now a non-interactive identity element (I agree with the critic). Should a later release give it a profile and settings screen (notifications, sign out)?
- Arithmetic flags for other designers. First, on S06, "₹45,527 more" does not match: ₹36,87,690 minus ₹36,42,160 is ₹45,530 (and minus the unrounded ₹36,42,169 it is ₹45,521). Second, on Past bills, July's figures disagree: ₹35,88,340 minus ₹35,53,720 is ₹34,620, but the row says "Saved ₹32,480", so one July figure is off. This card states neither difference.
- S02 lock screen shows "Tuesday, 3 September". In 2026, 3 Sep is a Thursday.
- The frames are 393 x 852, but the iPhone 17 Pro is 402 x 874. Every width here has slack (header text 181 budget against 163 used, card lines at most 284 against 321), so moving to 402 is safe if the team wants the frames to match the kit's device.
- Are weekdays in dates ("Tue 8 Sep", "Wed 16 Sep") OK? They give a sense of time without the countdown badge.
- Keep the caught-up caption ("When September's bill arrives, tap Add bill.") or drop it? It only appears after Northgrid confirms, and it uses no forecast date.