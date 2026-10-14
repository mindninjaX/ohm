# S06-S13-bill-summary

## Summary

Revised after critique. S06 and S13 stay one calm template on one model of money and dates. HERO: the bill amount ₹36,42,160 once, with 'Due Wed 16 Sep' as a typographic Due line directly under it (same words and ink-strong weight as Home's eyebrow, so it is prominent and consistent without reopening Home's Round 1 'no strip or badge' decision). ONE explainer: a Price ladder with Today marked, where the active row sits on a grey tile, 'Save ₹32,971' is promoted, row 2 says 'Bill amount' instead of repeating ₹36,42,160, and there is only one countdown (in the active row). The pinned button now carries amount and deadline ('Pay ₹36,09,190 by Tue 8 Sep'), so it explains itself even on S13 where the ladder is below the first screen. The reassurance row is the Round 1 phrase 'No hidden charges or penalties' on S06 and 'Everything else checks out' on S13; no check count is ever shown to the user. The July change is the headline '₹53,820 more than July' plus one honest units bar (+5,700 units), not two near-identical rupee bars. Colour is rationed with a per-screen audit table and one new neutral token, line-strong #8590A2, for data marks that must be visible. S13 puts the rupee impact first, then the 700 vs 900 kVA bars, then 'Copy details for Northgrid' (with a real, actionable text and WhatsApp/Email send buttons in S13.3). 'Share with owner' opens a drawer that shows the page the owner opens, the ask, and the exact message sent (S13.2). New states: S06.1 (after 8 Sep), S06.2 (paid), and a full time-state table including overdue. S13.1 is renamed 'Check failed, your agreement says 700 kVA'.

## Layout

THE ONE MODEL (read first)
1. ONE amount, shown once, as the hero: the bill amount ₹36,42,160 (what Northgrid says is owed; matches the PDF, Home and the S02 notification). The user said the amount is fine. Decision (was open question 1): the hero stays the bill amount. Making 'Pay ₹36,09,190' the hero would break the Home to S06 hero morph and the Home rule.
2. ONE due date, shown once, as the Due line directly under the hero amount: 'Due Wed 16 Sep'. Same words, ink-strong, same place on S06, S13, S10, S11, and the same words on Home's eyebrow. No fill, no icon background, no countdown. This reuses Home's date-driven rule (Round 1): the words change near the date ('Due tomorrow' on 15 Sep, 'Due today' on 16 Sep, 'Overdue since Wed 16 Sep' from 17 Sep) and colour appears only on the due day.
3. ONE explainer for every other price: the Price ladder. Today is marked on it. The pinned footer button carries the amount AND the deadline of the active row ('Pay ₹36,09,190 by Tue 8 Sep'), so hero, ladder and button always agree, and the button explains itself even when the ladder is scrolled away (S13 first view).
4. ONE countdown on screen, always in the active ladder row ('5 days left'). The Due line never carries a countdown.
5. Recount of S06 on Thu 3 Sep: ₹36,42,160 once (hero; ladder row 2 says 'Bill amount' instead of repeating it). ₹36,09,190 twice (ladder row 1 and the button that pays it). ₹36,87,690 once. ₹32,971 once (S13 note also repeats it in plain ink, see colour rules). '16 Sep' in the Due line, ladder row 2 and ladder row 3 (the ladder's date axis). '8 Sep' in ladder row 1 and the button. One countdown. This is the minimum the model needs; nothing else repeats an amount or a date. The July card shows July's units only (never the July bill total, which avoids the known July data issue); the parts card shows parts only.

COLOUR RULES (decide once, apply everywhere)
New token (the only addition): line-strong #8590A2 (3.2:1 on white). It is the neutral for data marks that carry meaning: non-emphasised bars, rail segments, hollow node borders. Keep line #DCDFE4 only for separators and tracks. Add it as a Figma variable and a CSS variable.
- Neutrals carry everything. ink-strong #091E42: hero digits, Due line, the active ladder title and amount, the Today node and the active rail segment, the July extension. ink #172B4D: body text. ink-muted #44546F: captions. ink-strong is for emphasis only. It is never used for ordinary bars (the two darks are nearly the same, so bars use line-strong or ink-strong, never ink).
- primary #265CFF: ONLY things she presses: footer primary button, the 'See all 7 parts' and 'See trends' nav rows, focus ring. Never a fill behind information. Two tolerated blues: the tile and 4 x 4 dot inside the Bill status mini drawing (Home already ships it). Chrome controls (back, Northgrid, close) are ink, not blue.
- success #216E4E (6:1 on white): ONLY (a) the words 'Save ₹32,971' in the active ladder row, (b) the tick badge on the Bill status mini, (c) the green tick and saving inside the share preview. At most 2 green spots per screen. 'Copied' uses an ink check, not green.
- warning #A54800 (about 5.5:1 on #FFF7D6): ONLY 'look at this' (S13 band, eyebrow, flagged drawing line and '!' badge, the '900 kVA' value, the bar extension) and 'last day' (the Due line on 16 Sep, the 'Last day' tag in the active ladder row on 8 and 16 Sep). Never long body text, never a button. This replaces the earlier 'Soon' amber state so S06 and Home agree: colour only on the last day, urgency before that is words.
- danger #AE2E24: ONLY the Due line once overdue. A failed check is warning, not danger, because she can still pay.
- primary-subtle: no S06 or S13 card uses it.
- Charts: one thing dark (or amber if it is the problem), everything else line-strong. No traffic lights.
PER-SCREEN COLOUR AUDIT (build checklist)
- S06: green 2 (Save, tick). Amber 0 (only the 'Last day' tag on 8 Sep). Danger 0. Blue: button, 2 nav rows. Dark: hero, Due line, active row, July extension.
- S13 and S13.1: green 2 (ladder Save, check-row tick). Amber 5 spots: band fill, eyebrow, flagged line plus '!' badge, '900 kVA', bar extension. The note's ₹32,971 is plain ink Semi Bold (not green, so green stays at 2). Dark: as S06.
- S13.3: as S13. The 'Copied' check is ink.
- Share drawer S09: green 2 (tick, saving). S13.2: green 2 (circle-check, saving) plus the amber block.
- S06.2 paid: green 1 (tick), or 2 once Northgrid confirms ('You saved ₹32,971').

TYPE (library styles, Inter)
Hero: Ohm / Amount XL (digits Text-5xl/Semi Bold 48, ₹ 34 muted). Due line: Text-xl/Semi Bold ink-strong. Card title: Text-base/Semi Bold ink-strong. Body: Text-sm/Regular ink-muted. Caption: Text-xs/Regular ink-muted. Active row amount: Text-xl/Semi Bold; other amounts Text-base/Medium. Eyebrow: Ohm / Section label (12 semibold, 6% tracking, uppercase) only on the S13 band.

BUTTON AND TARGET SIZES (one set, check S10, S11 and the drawers against it)
Primary: shadcn Button Default, pill, 50 tall, Text-base/Semi Bold white. Secondary: Button Outline, pill, 44 tall, Text-base/Medium ink. Rule: outline pill is for ACTIONS only (Share with owner, Copy details for Northgrid, WhatsApp, Email). Anything that goes to more detail is a NAV ROW or an Item card. Nav row: full width inside its card, 48 tall, 1 px line token on top inset 20, label Text-sm/Medium primary on the left, Lucide chevron-right 16 primary on the right, whole row is the tap target, pressed fill surface-muted clipped by the card radius. Item card (check row): white card, illustration, two text lines, chevron, pressed fill surface-muted. Icon buttons (back, close) 44 x 44. Top bar ghost button 44. Share channel circles 56. Every tap target is 44 or more.

FRAME AND VIEWPORT RULES
- Every frame 393 wide, fill surface-muted, clip OFF. Heights grow with content (auto layout hug on every card and band, so a wrapped line grows its card; the y values below are the measured result): S06 1396, S06.1 1396, S06.2 1170, S13 1842, S13.1 1842, S13.3 2074. Overlay frames S13.2 and S09 are viewport states 393 x 852 with the drawer at its natural height.
- Pinned: top bar y 62 to 116 (constraint Top), footer at the frame bottom (constraint Bottom). Content pads 164 at the bottom so the last card clears the footer by 16.
- Footer in the Figma mock is 148 tall: padding 12 16 0, primary 50, 8 gap, secondary 44, 34 device home-indicator zone. WEB truth: padding 12 16 max(12px, env(safe-area-inset-bottom)), so about 126 tall in Safari. 24 px gradient fade above (surface-muted 0 to 100%). No hairline, no glass, no blur.
- Design and test at 393 x 660 (iPhone Safari with toolbars), not only 852. Use dvh everywhere. At 660 the content window between the 54 px top bar and the 126 px footer is 480 px: S06 shows the hero and the whole ladder; S13 shows hero, band, stats and the bars, with 'Copy details' one short scroll away. In the 852 mock the S06 view runs through the check row and the whole S13 problem card is visible. Nothing in the design depends on a fold.
- Gutter 16. Cards 361 wide, library card white, radius 16, borderless, padding 20, 12 between cards.

S06 BLOCKS (x 16, width 361; y from the top of the frame)
T. TOP BAR, y 62 to 116, pinned. Back: shadcn Button ghost icon 44 x 44 at x 12, Lucide chevron-left 24 ink-strong. Title 'Bill summary' Text-base/Semi Bold ink-strong (was 'August 2026', which repeated the hero). Trailing: shadcn Button ghost, 44 tall, hug about 112, right edge x 377, label 'Northgrid' Text-sm/Medium ink-strong + Lucide chevron-down 16 ink-muted, gap 6 (opens Your connection; 'HT' is jargon and is dropped). After 8 px of scroll a 1 px line token appears under the bar.

A. HERO CARD, y 124 to 276 (152). Padding 20.
 - 144 to 164 eyebrow 'August bill' Text-sm/Medium ink-muted (same as Home).
 - 4 gap, 168 to 216 amount: ₹ 34 ink-muted + '36,42,160' Text-5xl/Semi Bold ink-strong (about 259 of 321 wide).
 - 12 gap, 228 to 256 DUE LINE (component Ohm / Due line, Size M): Lucide calendar-days 20 ink-strong, 8 gap, 'Due Wed 16 Sep' Text-xl/Semi Bold ink-strong. Not a control. No fill, no countdown.
 - 20 bottom padding.

B. PRICE LADDER CARD, y 288 to 602 (314). Padding 20. Component Ohm / Price ladder. Not interactive.
 - 308 to 332 title 'What you pay depends on the day' Text-base/Semi Bold ink-strong (about 275 wide, one line).
 - 4 gap, 336 to 356 sentence 'Pay early for a discount. Late costs more.' Text-sm/Regular ink-muted (one line).
 - 14 gap, ladder 370 to 582 (212). Every row gap is 12. Inside the 321 inner width: rail column 24 (node centre x 48 in frame coordinates), 8 gap, content column 289 (x 68 to 357).
 - Row T, 370 to 394 (24): node 12, filled ink-strong, 3 px white ring, centre y 382. Tag 'Today' (Badge Secondary look: 22 tall, radius 6, fill surface-muted, Text-xs/Semi Bold ink-strong, padding 0 8), 8, then 'Thu 3 Sep' Text-sm/Regular ink-muted.
 - Row 1, ACTIVE, 406 to 486 (80): a tile in the content column, surface-muted, radius 12, padding 12, 289 wide. Node 12 hollow, 2 px ink-strong, white fill, centre y 432. Line 1 (28): left 'Pay by Tue 8 Sep' Text-base/Semi Bold ink-strong; right '₹36,09,190' Text-xl/Semi Bold ink-strong (about 110 wide; 128 + 110 fits the 265 inner). 4 gap. Line 2 (24): 'Save ₹32,971' Text-base/Semi Bold success, then ' · 5 days left' Text-sm/Regular ink-muted. On Mon 7 Sep the days text becomes '1 day left' in Text-sm/Semi Bold ink-strong. On Tue 8 Sep it becomes a tag 'Last day' (22 tall, radius 6, warning-subtle fill, Text-xs/Semi Bold warning).
 - Row 2, 498 to 522 (24): node hollow, 2 px line-strong, white fill, centre y 510. Left 'Pay by Wed 16 Sep' Text-base/Medium ink; right 'Bill amount' Text-base/Medium ink. No sub-line, no repeated amount (the amount is the hero directly above).
 - Row 3, 534 to 582 (48): node hollow 2 px line-strong, centre y 546. Line 1 (24): left 'After Wed 16 Sep' Text-base/Medium ink; right '₹36,87,690' Text-base/Medium ink. Line 2 (20, 4 below): '₹45,530 more than the bill amount' Text-sm/Regular ink-muted (36,87,690 minus 36,42,160 = 45,530; the old ₹45,527 was wrong). The difference is stated before the price on the left, the price on the right.
 - Rail 2 px wide at x 47 to 49. The ink-strong segment is always the stretch from Today to the next price change (Today node to row 1 node). Row 1 to row 2: line-strong. Row 2 to row 3: line-strong DASHED (open ended, as Lloyds does). Past stretches are line-strong.
 - 20 bottom padding.
 - Why a list and not bars: the three prices differ by 1 to 2 percent, so honest zero-based bars would look identical and a cut axis would lie. Time is what changes, so the ladder encodes time on a rail and states the rupees as text.

C. CHECK RESULT ROW, y 614 to 690 (76). White card, radius 16, shadcn Item, padding 14 16. Leading: Bill status mini, State Checked, Size L (48), Tile On, at x 32. 12 gap, text column 245: title 'No hidden charges or penalties' Text-sm/Semi Bold ink-strong; below 'Charged at the regulator's rates' Text-sm/Regular ink-muted (Round 1 phrase and sub-line, unchanged). Trailing Lucide chevron-right 16 ink-muted. Whole card is the tap target (to S07). The 'what are the checks and why do I need them' answer is the first thing on S07 (see handoffs); no count of checks is shown anywhere.

D. WHERE THE MONEY GOES, y 702 to 960 (258). Padding 20.
 - 722 to 746 title 'Where the money goes' Text-base/Semi Bold ink-strong.
 - 16 gap, three rows of 34 with 16 between: line 1 (20): label left Text-sm/Regular ink; right amount Text-sm/Medium ink-strong, 8, percent Text-sm/Regular ink-muted in a 36 wide right-aligned column. 8 gap, bar 6 tall: track surface-muted 321 wide, fill line-strong (data tone, not primary, not ink), width = share of the whole bill.
   Electricity used / ₹22,52,850 / 62% (fill 199). Fuel adjustment / ₹3,91,800 / 11% (fill 35). Wires / ₹3,59,150 / 10% (fill 32).
 - 16 gap, then the NAV ROW 'See all 7 parts' (48, full width, blue label and chevron-right) to S08. This is the visible entry to the full breakdown; it replaces both the small link and the earlier outline pill (outline pills are for actions only).

E. COMPARED WITH JULY, y 972 to 1232 (260). Padding 20. Component Ohm / Units bar.
 - 992 to 1016 title 'Compared with July' Text-base/Semi Bold ink-strong.
 - 12 gap, headline 1028 to 1056 '₹53,820 more than July' Text-xl/Semi Bold ink-strong (36,42,160 minus 35,88,340). No arrow chip, no amber, no percent headline.
 - 4 gap, sub 1060 to 1100 (two lines, hug): 'That is 1.5% more. You used 1.8% more electricity.' Text-sm/Regular ink-muted.
 - 16 gap, UNITS BAR 1116 to 1168 (52): caption row (16): left 'Units of electricity used' Text-xs/Medium ink-muted, right '+5,700 units' Text-xs/Semi Bold ink-strong. 6. Bar 8 tall radius 4, scale from zero, full width 321 = 3,26,500 units: July segment 315 wide in line-strong, extension 6 wide in ink-strong (321 x 5,700 / 3,26,500 = 5.6). 6. Labels row (16): left 'July 3,20,800', right 'August 3,26,500', Text-xs/Regular ink-muted. Why units: a truthful rupee bar can never show a 1.5 percent change and would contradict the headline; the units bar is honest, labelled in units, and the small sliver is the correct message. The real trend chart is one tap away.
 - 16 gap, NAV ROW 'See trends' (48) to S12.

F. FOOTER (pinned). shadcn Button Default, pill, 361 x 50, primary fill, label per active ladder row: 'Pay ₹36,09,190 by Tue 8 Sep' (then 'Pay ₹36,42,160 by Wed 16 Sep', then 'Pay ₹36,87,690 now'), Text-base/Semi Bold white, about 225 wide so it fits. 8 gap, shadcn Button Outline pill 361 x 44, 'Share with owner' Text-base/Medium ink.

Y SUMMARY S06: hero 124 to 276, ladder 288 to 602, check row 614 to 690, parts 702 to 960, July 972 to 1232, frame 1232 + 164 = 1396.

S13 CHECK FAILED (same template; two slots change)
Order: top bar, A hero (identical), PROBLEM CARD (new), B ladder, C check row (changed copy and 88 tall), D parts, E July, F footer (identical labels). The problem is read before anything but the amount and the due date. 'No hidden charges or penalties' is NOT shown here (a higher booked power is a charge she may not want).
Y: hero 124 to 276, problem card 288 to 710 (422), ladder 722 to 1036, check row 1048 to 1136, parts 1148 to 1406, July 1418 to 1678, frame 1678 + 164 = 1842. In the 852 mock the whole problem card is visible above the footer (the last 6 px of card padding sits under the fade).

PROBLEM CARD, y 288 to 710 (422), white, radius 16, clip on, no card padding. Component Ohm / Problem card (State: First bill | Agreement; Copy: Default | Copied). Order is now rupees first, then the bars, so the money is not outshouted by a 29 percent bar.
 - BAND 288 to 368 (80), fill warning-subtle #FFF7D6, padding 16 all round. Leading: Bill status mini State Flagged, Size L, Tile Off (new boolean: no blue wash on the amber band; paper fills 48 x 48). One skeleton line is highlighted amber, badge shows '!'. 12 gap, text column 269: eyebrow '1 thing to look at' (Ohm / Section label, warning, uppercase) y 306 to 322; 4; title 'Contract demand changed' Text-base/Semi Bold ink-strong y 326 to 350. Band and title hug: a wrapped title grows the band by 24 (S13.1's 'Contract demand does not match' measures about 258 of 269, so it fits with 11 px to spare).
 - BODY 368 to 710 (342), padding 16 20 16.
   384 to 446 STATS (62): two columns with a 1 px line separator and 12 gap (each about 148). Col 1 '₹4,620' Text-xl/Semi Bold ink-strong over 'more this month' Text-xs/Regular ink-muted. Col 2 '₹55,440' over 'more in a year, if it repeats' (2 lines). 4,620 x 12 = 55,440. Plain ink, not amber.
   16 gap, 462 to 478 caption 'The power you booked (contract demand)' Text-xs/Medium ink-muted (reuses S05's plain words for the jargon).
   8 gap, 486 to 562 BARS (76): two rows of 34 (label 20, 6, bar 8) with 8 between. Row 1: label 'Your first bill' Text-sm/Regular ink-muted, value '700 kVA' Text-sm/Medium ink, bar 250 wide line-strong. Row 2: label 'This bill', value '900 kVA' Text-sm/Semi Bold warning, bar 321 wide: first 250 line-strong, last 71 warning (the extra 200 kVA). Common zero-based scale (700/900 x 321 = 250).
   16 gap, 578 to 622 BUTTON: shadcn Button Outline, pill, 44, full width 321, Lucide copy 16, label 'Copy details for Northgrid'.
   12 gap, 634 to 694 NOTE (3 lines, 60): Lucide info 16 ink-muted + Text-sm/Regular ink-muted 'You can still pay now and keep the ₹32,971 discount. Raise this with Northgrid separately.' with '₹32,971' in Text-sm/Semi Bold ink (not green).
   16 bottom padding.
 - If a first screen ever overflows, shrink the 16 gaps to 12 before shrinking anything else.

C (S13). Check row, 88 tall (two-line sub). Bill status mini Checked, Size L, Tile On. Title 'Everything else checks out' Text-sm/Semi Bold ink-strong; sub 'Rates, meter, category, penalties and your discount are fine' Text-sm/Regular ink-muted (2 lines in 245). Taps to S07, where the contract demand row is amber and the other five are ticked. No count of checks anywhere.

S13.1 CHECK FAILED, YOUR AGREEMENT SAYS 700 kVA (replaces S13b 'Check failed, your number')
Why the old name failed: 'your number' says nothing about what is wrong or what it was compared to. The new name states the baseline Ohm used (what Neha told Ohm in S05) and does not claim the bill is wrong, which Ohm cannot know (the contract may have been amended). Optional parallel rename of S13 to 'S13 Check failed, changed since first bill' (decided: yes, rename so the two read as a pair).
Full clone of S13 (1842), kept as a full frame because the prototype needs the complete screen and component variants make it nearly free; the delta is marked with a magenta outline layer that is hidden in exports. ONLY these change: frame name; band title 'Contract demand does not match'; bars row 1 label 'Your agreement'; clipboard text, share text and S07 flagged row use 'agreement' wording; everything else identical.

S13.2 SHARE WITH OWNER, 1 THING TO LOOK AT (viewport state 393 x 852)
Behind: clone of the first screenful of S13 (reactions stripped) under a dim layer (ink-strong at 40%). shadcn Drawer from the bottom, white, top radius 24, natural height 798 (y 54 to 852). On the web it is capped at max-h 90dvh: grabber, title row and the channel row are pinned, the body between them scrolls (at 852 the body scrolls about 30 px; at 660 about 230). Colours as the audit table.
 - Grabber 36 x 5 line token, y 8 to 13. Title row y 29 to 69: 'Share with owner' Text-lg/Semi Bold ink-strong at x 20; close shadcn Button ghost icon 44 x 44 (Lucide x 20), right edge x 377.
 - y 73 to 93 description 'This page opens when the owner taps the link' Text-sm/Regular ink-muted (this is honest: the card is the linked page; the message below is what is sent).
 - STAGE y 109 to 522 (413): surface-muted, radius 16, padding 16. PREVIEW CARD (Ohm / Share preview card, State One thing to look at): white, radius 12, soft shadow (y 1, blur 3, ink-strong 8%), width 329, padding 16, height 381, inner width 297:
   'August electricity bill · Northgrid' Text-xs/Regular ink-muted (16). 8. '₹36,42,160' Text-3xl/Semi Bold ink-strong (36). 8. Row (28): left Due line Size S (Lucide calendar-days 16 + 'Due Wed 16 Sep' Text-sm/Semi Bold ink-strong), right Lucide zap 12 ink-muted + 'Checked by Ohm' Text-xs/Regular ink-muted.
   12. Amber block (warning-subtle, radius 12, padding 12, 128 tall): Lucide triangle-alert 16 warning + '1 thing to look at' Text-sm/Semi Bold ink-strong (20); 4; paragraph Text-xs/Regular ink, up to 5 lines (80): 'Contract demand is the most power Northgrid agrees to supply. This bill says 900 kVA, the first bill said 700 kVA. It costs ₹4,620 more this month, ₹55,440 a year if it repeats.'
   12. Lucide circle-check 14 success + 'Everything else checks out' Text-xs/Regular ink-muted (16). 12. Separator line token. 12. Ask, Text-sm/Medium ink, 3 lines (60): 'Plan: pay ₹36,09,190 by Tue 8 Sep and save ₹32,971. Raise this with Northgrid separately. OK to go ahead?' ('₹32,971' in success Semi Bold). 16 bottom padding.
 - y 538 to 554 caption 'Message that goes with the link' Text-xs/Medium ink-muted; 6; y 560 to 648 message block (surface-muted, radius 12, padding 12, Text-xs/Regular ink, 4 lines) with the WhatsApp text (the email body is the same text).
 - y 664 to 744 channel row (pinned), 3 items evenly spaced across 361: shadcn Button secondary icon 56 x 56 circle, fill surface-muted, icon 24 ink-strong (WhatsApp brand logo from the Phosphor or Tabler set drawn in ink, Lucide mail, Lucide link), label 8 under Text-xs/Medium ink: 'WhatsApp', 'Email', 'Copy link'. 20 gap, 34 home-indicator zone, total 798.

S09 UPDATE (happy-path share drawer over S06, so it stops contradicting S06)
Same structure as S13.2, natural height 666 (y 186 to 852). Title 'Share with owner'; description 'This page opens when the owner taps the link'. Preview card (State All good), padding 16, height 249: header 'August electricity bill · Northgrid'; '₹36,42,160'; row Due line Size S 'Due Wed 16 Sep' + 'Checked by Ohm'; 12; Lucide circle-check 14 success + 'No hidden charges or penalties' Text-sm/Medium ink; 4; '₹53,820 more than July (1.5%)' Text-sm/Regular ink-muted; separator; 'Plan: pay ₹36,09,190 by Tue 8 Sep and save ₹32,971. OK to go ahead?' Text-sm/Medium ink (2 lines, saving in success). Stage 109 to 390; caption 406 to 422; message block 428 to 516 (4 lines); channels 532 to 612; 20; 34. Remove the green pill 'All 6 checks passed', the 'Up 1.5%' sentence and the blue box. Rebuild the dim clone behind from the new S06.

S13.3 COPIED, DETAILS FOR NORTHGRID (state of S13, frame 2074)
 - 'Copy details for Northgrid' becomes 'Copied' with a Lucide check 16 in ink (Outline, no fill change) for 3 s; aria-live polite announces 'Copied'.
 - Between the button and the note (12 gaps) a block appears and stays until she leaves: caption 'What we copied. Paste it, or send it now.' Text-xs/Medium ink-muted (16); 4; text block surface-muted, radius 12, padding 12, Text-sm/Regular ink, up to 6 lines (144 tall) with the clipboard text; 12; a pair of shadcn Button Outline pills 44 tall, 8 gap, each 156 wide: Lucide message-circle-based WhatsApp mark + 'WhatsApp', Lucide mail + 'Email' (same labels as the share channels). Block adds 232 (16 + 4 + 144 + 12 + 44 + 12); everything below shifts down 232 (note 866 to 926, card ends 942).
 - No toast. The inline state is the confirmation.

S06.1 AFTER TUE 8 SEP (time state, clone of S06, the proof of the model; date Wed 9 Sep; frame 1396, height unchanged)
Ladder order top to bottom: row 1 (past), Today, row 2 (active), row 3. Row 1 goes quiet: node and text ink-muted, node border line-strong, amount '₹36,09,190' struck through Text-base/Medium ink-muted, no sub-line. Row T moves between rows 1 and 2 ('Today' tag, 'Wed 9 Sep'). Row 2 becomes the active tile (80): 'Pay by Wed 16 Sep' Text-base/Semi Bold ink-strong left, 'Bill amount' Text-base/Semi Bold ink-strong right, line 2 '7 days left' Text-sm/Regular ink-muted (no green). The ink-strong rail segment runs from the Today node to row 2. Footer primary 'Pay ₹36,42,160 by Wed 16 Sep'. Ladder height stays 212 because the quiet row is 24 and the tile is 80.

S06.2 PAID (frame 1170)
Hero: eyebrow 'August bill', amount '₹36,09,190' (what was paid, as Home), Due line in the Paid tone: Lucide check 20 + 'Paid Thu 3 Sep' ink-strong. Payment card (replaces the ladder; y 288 to 376, 88 tall, padding 20): title 'Paid, waiting for Northgrid to confirm' Text-base/Semi Bold ink-strong; sub 'Your saving of ₹32,971 applies once Northgrid confirms.' Text-sm/Regular ink-muted. Once confirmed: title 'Northgrid confirmed', sub 'You saved ₹32,971' ('₹32,971' success Semi Bold). Then check row 388 to 464, parts 476 to 734, July 746 to 1006, frame 1170. Footer: primary 'View receipt' (Default, 50) to S11, plus 'Share with owner' (Outline, 44). On S13 after payment the problem card stays; its note becomes 'You have paid. You can still raise this with Northgrid.'

TIME STATES (all other blocks unchanged; one countdown, in the active row)
- Thu 3 to Sun 6 Sep: Due 'Due Wed 16 Sep'. Hero ₹36,42,160. Today above row 1. Row 1 sub 'Save ₹32,971 · N days left' (5, 4, 3, 2). Footer 'Pay ₹36,09,190 by Tue 8 Sep'. Note (S13) with discount.
- Mon 7 Sep: row 1 days text '1 day left' in Semi Bold ink-strong (words, no colour).
- Tue 8 Sep: row 1 shows the amber 'Last day' tag. Footer the same.
- Wed 9 to Mon 14 Sep: S06.1 (row 2 'N days left': 7 on 9 Sep). Footer 'Pay ₹36,42,160 by Wed 16 Sep'. S13 note: 'You can still pay now. Raise this with Northgrid separately.' Share plan line: 'Plan: pay ₹36,42,160 by Wed 16 Sep.'
- Tue 15 Sep: Due line 'Due tomorrow' (ink-strong). Row 2 sub '1 day left'.
- Wed 16 Sep: Due line 'Due today' with Lucide clock, warning. Row 2 shows the amber 'Last day' tag. Footer 'Pay ₹36,42,160 by Wed 16 Sep'.
- From Thu 17 Sep (annotated only, not built as a frame): Due line 'Overdue since Wed 16 Sep' with Lucide triangle-alert, danger. Hero becomes ₹36,87,690 (Home's rule, and the hero morph needs the same number). Rows 1 and 2 past (row 2 right shows '₹36,42,160' struck through). Today between rows 2 and 3. Row 3 is the active tile: 'From Thu 17 Sep' / '₹36,87,690' / 'Includes the charge for paying late'. Footer 'Pay ₹36,87,690 now'. Share plan line: 'Plan: pay ₹36,87,690 now.'
- After payment: S06.2.

HANDOFFS (other frames must follow so the app is consistent)
- HOME S01 (this is a small amendment to a Round 1 Home decision, flagged): keep the eyebrow 'August bill · due Wed 16 Sep' and the card height 283 for Default, Save today, Due today, Overdue, Flagged (320) and Paid. Only the type changes: the 'due Wed 16 Sep' span becomes Medium ink-strong (was Regular ink-muted) so Home and S06 say the date the same way. No chip, no icon, no height change on any Home layout. The date-driven words already match (due tomorrow, due today, overdue). 'Review and pay' lands on S06, whose hero is the same number (hero morph unchanged). Open question 1 asks for sign-off.
- S10 PAY: the Due line (Size M) sits under the title; the options are named 'Pay by Tue 8 Sep' and 'Pay by Wed 16 Sep' (same as the ladder rows); the active option is preselected; buttons follow the size set above. S10 owner re-measures its height.
- S11 PAID: Due line in the Paid tone 'Paid Thu 3 Sep'; saving shown as 'Your saving of ₹32,971 applies once Northgrid confirms' while the status is waiting. S11 owner re-measures.
- S07 'What Ohm checked': title unchanged. First thing on the screen (not collapsed): 'Hidden charges are wrong rates, changed settings or penalties that raise your bill. Ohm checks these on every bill, so you do not have to.' (no count). Each of the six rows gets one 'Why it matters' line (copy list). Flagged state: the contract demand row is amber, text 'Contract demand changed. 900 kVA on this bill, 700 kVA on your first bill.' (S13.1: 'does not match', 'in your agreement'), and the other five rows are ticked.
- S08: under the Booked capacity row add 'Billed on 664 kVA, the most power you used. You booked 700 kVA.' so 664, 700 and 900 stop looking like three competing numbers. No other change. S12: unchanged.
- S01a Your connection: now opens from the S06 and S13 'Northgrid' top bar button and the S07 link (the label 'Northgrid · HT' is gone).
- Foundations: add line-strong #8590A2; add Bill status mini properties Size (M 36, L 48) and Tile (On, Off) to the existing set without changing current instances (this track owns it).

COMPONENT LIST (local, page Foundations, Section 'Components · S06 S13')
Ohm / Due line (Tone: Default, Tomorrow, Today, Overdue, Paid; Size M, S). Ohm / Price ladder (Today position: Start, After early, After due; row State: Active, Next, Past; row 2 right text: Bill amount or struck amount). Ohm / Nav row. Ohm / Check result row (Passed, Other checks passed). Ohm / Problem card (First bill, Agreement; Default, Copied). Ohm / Units bar. Ohm / Split rows (existing P3, fill changed from primary to line-strong, rupees added). Ohm / Share preview card (All good, One thing to look at). Bill status mini gets Size L and Tile on/off.

REVISION MAP (critique issue to fix)
H1 one model: amounts and dates recounted, 'Bill amount' replaces the echo, one countdown. H2 button carries the deadline. H3 Home: typographic only, no height change, flagged for sign-off. H4 no check count anywhere; 'Everything else checks out'. M saving: active tile, base-size green saving, 'Last day' tag. M ladder spacing: uniform 12 gaps. M July: units bar. M colour: audit table, line-strong, one dark. M contrast: line-strong. M fold: designed for 660, hug everywhere. M targets: 44 minimum, nav rows, one outline rule. M states: S06.2, time table, overdue, singular. M kVA: rupees first, S05 wording, S08 line. M copy text: actionable, WhatsApp and Email buttons. M share: link page plus message, ask inside, plain explainer, 90dvh scroll.

## Copy

- **S06, S13 top bar title**: Bill summary
- **Top bar trailing button (opens Your connection)**: Northgrid
- **Hero eyebrow**: August bill
- **Hero amount**: ₹36,42,160
- **Due line, default (3 to 14 Sep)**: Due Wed 16 Sep
- **Due line tones by date**: 15 Sep: Due tomorrow (ink-strong). 16 Sep: Due today (warning, clock icon). From 17 Sep: Overdue since Wed 16 Sep (danger, alert icon). Paid: Paid Thu 3 Sep (ink-strong, check icon)
- **Hero VoiceOver label**: August bill, 36 lakh 42 thousand 160 rupees. Due Wednesday 16 September.
- **Price ladder title**: What you pay depends on the day
- **Price ladder sentence**: Pay early for a discount. Late costs more.
- **Ladder Today row**: Today · Thu 3 Sep (tag 'Today', then 'Thu 3 Sep')
- **Ladder row 1 title / amount**: Pay by Tue 8 Sep / ₹36,09,190
- **Ladder row 1 sub**: Save ₹32,971 · 5 days left (only 'Save ₹32,971' is green). 7 Sep: 1 day left. 8 Sep: Last day (amber tag)
- **Ladder row 2 title / right text**: Pay by Wed 16 Sep / Bill amount
- **Ladder row 3 title / amount**: After Wed 16 Sep / ₹36,87,690
- **Ladder row 3 sub**: ₹45,530 more than the bill amount
- **Ladder VoiceOver label**: Price by date. Today, Thursday 3 September. Pay by Tuesday 8 September: 36 lakh 9 thousand 190 rupees, you save 32 thousand 971 rupees, 5 days left. Pay by Wednesday 16 September: the bill amount. After Wednesday 16 September: 36 lakh 87 thousand 690 rupees, 45 thousand 530 rupees more than the bill amount.
- **S06 check row title / description (Round 1 phrase)**: No hidden charges or penalties / Charged at the regulator's rates
- **Parts card title**: Where the money goes
- **Parts rows (label / amount / percent)**: Electricity used / ₹22,52,850 / 62%; Fuel adjustment / ₹3,91,800 / 11%; Wires / ₹3,59,150 / 10%
- **Parts nav row**: See all 7 parts
- **July card title**: Compared with July
- **July card headline**: ₹53,820 more than July
- **July card sub**: That is 1.5% more. You used 1.8% more electricity.
- **July units bar caption (left / right)**: Units of electricity used / +5,700 units
- **July units bar labels (left / right)**: July 3,20,800 / August 3,26,500
- **July units bar VoiceOver label**: Units of electricity used. July 3 lakh 20 thousand 800. August 3 lakh 26 thousand 500. That is 5 thousand 700 more.
- **July card nav row**: See trends
- **Footer primary (always the active ladder row, with its deadline)**: Pay ₹36,09,190 by Tue 8 Sep (then: Pay ₹36,42,160 by Wed 16 Sep; from 17 Sep: Pay ₹36,87,690 now; paid: View receipt)
- **Footer secondary**: Share with owner
- **S13 problem band eyebrow (uppercase by style)**: 1 thing to look at
- **S13 problem band title**: Contract demand changed
- **S13.1 problem band title**: Contract demand does not match
- **Problem card stats**: ₹4,620 / more this month; ₹55,440 / more in a year, if it repeats
- **Problem card bars caption**: The power you booked (contract demand)
- **S13 bar labels / values**: Your first bill / 700 kVA; This bill / 900 kVA
- **S13.1 bar labels / values**: Your agreement / 700 kVA; This bill / 900 kVA
- **Problem card button (Outline, left icon copy)**: Copy details for Northgrid
- **Problem card button, copied state**: Copied
- **Problem card note, until 8 Sep (₹32,971 in plain ink Semi Bold)**: You can still pay now and keep the ₹32,971 discount. Raise this with Northgrid separately.
- **Problem card note, 9 Sep onward**: You can still pay now. Raise this with Northgrid separately.
- **Problem card note, after payment**: You have paid. You can still raise this with Northgrid.
- **Problem card VoiceOver label (S13)**: 1 thing to look at. Contract demand changed. It costs 4 thousand 620 rupees more this month, 55 thousand 440 rupees a year if it repeats. 900 kVA on this bill, 700 kVA on your first bill.
- **S13 check row title / description**: Everything else checks out / Rates, meter, category, penalties and your discount are fine
- **S13.3 caption above copied text**: What we copied. Paste it, or send it now.
- **S13.3 send buttons**: WhatsApp; Email
- **Clipboard text, S13 (first bill). Mock shows the masked 4410 28••••; the build inserts the full number read from the PDF, and the bill number if present**: Harbourline Hotels, Riverside. Account number {account_number}. August 2026 bill. This bill shows contract demand 900 kVA. Our first bill said 700 kVA. It adds ₹4,620 to this month's bill. Please check and send a corrected bill.
- **Clipboard text, S13.1 (agreement)**: Harbourline Hotels, Riverside. Account number {account_number}. August 2026 bill. This bill shows contract demand 900 kVA. Our agreement says 700 kVA. It adds ₹4,620 to this month's bill. Please check and send a corrected bill.
- **Email subject to Northgrid (S13.3)**: Contract demand on our August 2026 bill
- **Share drawer title (S09 and S13.2)**: Share with owner
- **Share drawer description**: This page opens when the owner taps the link
- **Share preview header**: August electricity bill · Northgrid
- **Share preview amount and Due line**: ₹36,42,160 / Due Wed 16 Sep
- **Share preview footer item (right of the Due line)**: Checked by Ohm
- **S13.2 amber block title**: 1 thing to look at
- **S13.2 amber block text**: Contract demand is the most power Northgrid agrees to supply. This bill says 900 kVA, the first bill said 700 kVA. It costs ₹4,620 more this month, ₹55,440 a year if it repeats.
- **S13.1 amber block second sentence**: This bill says 900 kVA, the agreement says 700 kVA.
- **S13.2 reassurance line**: Everything else checks out
- **S13.2 plan and ask**: Plan: pay ₹36,09,190 by Tue 8 Sep and save ₹32,971. Raise this with Northgrid separately. OK to go ahead?
- **S09 preview lines**: No hidden charges or penalties / ₹53,820 more than July (1.5%) / Plan: pay ₹36,09,190 by Tue 8 Sep and save ₹32,971. OK to go ahead?
- **Message caption**: Message that goes with the link
- **Channel labels**: WhatsApp; Email; Copy link
- **Copy link, done state label (2 s)**: Copied
- **WhatsApp text, S09 (happy)**: Northgrid's August bill is ₹36,42,160, due Wed 16 Sep. No hidden charges or penalties. Plan: pay ₹36,09,190 by Tue 8 Sep and save ₹32,971. OK to go ahead? {share_url}
- **WhatsApp text, S13.2**: Northgrid's August bill is ₹36,42,160, due Wed 16 Sep. 1 thing to look at: contract demand is 900 kVA, was 700 (₹4,620 more). OK to pay and raise it with Northgrid? {share_url}
- **WhatsApp text, S13.1 variant**: Same as S13.2 but the middle sentence reads: 1 thing to look at: contract demand is 900 kVA, our agreement says 700 (₹4,620 more).
- **Email subject, S09 / S13.2 (body is the WhatsApp text)**: Northgrid August bill: ₹36,42,160, due Wed 16 Sep / Northgrid August bill: ₹36,42,160, 1 thing to look at
- **S06.1 Today row**: Today · Wed 9 Sep
- **S06.1 row 2 sub**: 7 days left
- **S06.2 payment card, waiting**: Paid, waiting for Northgrid to confirm / Your saving of ₹32,971 applies once Northgrid confirms.
- **S06.2 payment card, confirmed**: Northgrid confirmed / You saved ₹32,971
- **Overdue ladder row 3 (annotated)**: From Thu 17 Sep / ₹36,87,690 / Includes the charge for paying late
- **S07 opening line (handoff, no count)**: Hidden charges are wrong rates, changed settings or penalties that raise your bill. Ohm checks these on every bill, so you do not have to.
- **S07 'why it matters' lines (handoff, one per check)**: Charges add up: A wrong rate or a typo would raise your bill. | Contract demand unchanged: A higher booked power means a higher fixed charge every month. | Category fits: The wrong category can mean a higher rate on every unit. | Meter multiplier unchanged: A wrong multiplier makes every unit count too many. | No penalties: Penalties come from going over your booked power or a poor power factor. | Discount worked out right: So you get the full early-payment saving.
- **S07 flagged row, S13 (handoff)**: Contract demand changed. 900 kVA on this bill, 700 kVA on your first bill.
- **S07 flagged row, S13.1 (handoff)**: Contract demand does not match. 900 kVA on this bill, 700 kVA in your agreement.
- **S08 Booked capacity footnote (handoff)**: Billed on 664 kVA, the most power you used. You booked 700 kVA.
- **Home eyebrow (handoff, same words, due span Medium ink-strong)**: August bill · due Wed 16 Sep
- **S10 option names (handoff)**: Pay by Tue 8 Sep; Pay by Wed 16 Sep
- **Frame names**: S06 Bill summary (keep); S06.1 After Tue 8 Sep; S06.2 Paid; S13 Check failed, changed since first bill (renamed); S13.1 Check failed, your agreement says 700 kVA (replaces 'S13b Check failed, your number'); S13.2 Share with owner, 1 thing to look at; S13.3 Copied, details for Northgrid

## Illustrations

### Bill status mini, Size L (S04 language at icon size)
- Concept: The S04 reading illustration (white paper, soft skeleton lines, round corner badge) reused as the single visual for 'Ohm read this': a green tick badge when fine, an amber '!' badge when one line is off. It replaces the green banner and the checks count.
- Construction: Reuse the existing Home component set 'Bill status mini' (State Checking, Checked, Flagged, 36 x 36) and add two properties. Size L = 48 x 48 (everything scaled 1.333: tile radius 13, paper 27 x 35, badge 19 with a 2 px white ring, skeleton lines 3.3 tall). Tile On | Off: Off removes the primary-subtle #E9EFFF tile and enlarges the paper to 32 x 42 at (8, 3) so it can sit on the amber band with no blue next to yellow. Flagged adds one highlighted skeleton line: fill warning-subtle #FFF7D6, 1 px stroke warning #A54800, radius 2, and the badge shows '!' (Inter 12 semibold, warning on warning-subtle). Checked badge: success-subtle with a Lucide check 12, stroke 2, success. Paper fill white, lines line #DCDFE4. Used in the S06 row (Checked, Tile On), the S13 row (Checked, Tile On) and the S13 band (Flagged, Tile Off). Size M instances on Home are unchanged.
- Hover: No hover on a phone. First view after a check finishes: the badge cross-fades white to its tone (150 ms) and the tick draws in with stroke-dashoffset (160 ms) with a 1.0 to 1.08 to 1.0 scale (about 250 ms). Flagged: the highlighted line fades its fill in (200 ms). prefers-reduced-motion: single cross-fade. Never loops.
### Price ladder (the one timeline)
- Concept: A vertical schedule that shows the price changing with the date, with Today marked on the rail and the current window sitting on a grey tile. Modelled on Afterpay's payment schedule: dots on a rail, date left, amount right.
- Construction: Rail 2 px wide at x 47 to 49. Nodes are 12 px circles: Today filled ink-strong with a 3 px white ring; row nodes hollow, 2 px border, white fill (active ink-strong, others line-strong). The ink-strong segment is the stretch from Today to the next price change; other segments are line-strong; the last segment is dashed (open ended, as Lloyds does). Content column 289 wide, rows 12 apart. Active row is a surface-muted tile (radius 12, padding 12, 80 tall) with the title Text-base/Semi Bold, amount Text-xl/Semi Bold and the line 2 'Save ₹32,971 · 5 days left'. Other rows are 24 tall (row 3 is 48 because it states the difference). Past row: ink-muted with a struck-through amount, 24 tall. Component set 'Ohm / Price ladder' with properties Today position (Start, After early, After due) and row State (Active, Next, Past). Total height 212 in every state before overdue.
- Hover: Static. On a date change the Today tag slides down the rail 8 px and cross-fades (200 ms), the tile moves to the next row (150 ms), the new active amount grows from 16 to 20 px. prefers-reduced-motion: instant swap.
### Units bar, July vs August (honest, in units)
- Concept: One zero-based bar in units, not rupees: July's length in grey plus a tiny dark extension labelled '+5,700 units'. It shows why the bill moved (a little more electricity) and, because it is honest, the change looks small, which is the true size of 1.8 percent. The rupee change lives in the headline as text.
- Construction: Caption row 16 (left 'Units of electricity used' Text-xs/Medium ink-muted; right '+5,700 units' Text-xs/Semi Bold ink-strong). Bar 8 tall, radius 4, full width 321 = 3,26,500 units: July segment 315 wide in line-strong, extension 6 wide in ink-strong (321 x 5,700 / 3,26,500 = 5.6). Labels row 16: 'July 3,20,800' left, 'August 3,26,500' right, Text-xs/Regular ink-muted. role img with the aria label from the copy list. Total 52.
- Hover: On first view the July segment grows from 0 to width over 400 ms, then the extension appears (150 ms). prefers-reduced-motion: no growth.
### Booked power bars, 700 vs 900 kVA (S13, S13.1)
- Concept: Shows the problem at a glance: the booked power is the same bar plus an amber extension. It sits below the rupee stats so the money, not a 29 percent bar, leads.
- Construction: Caption 'The power you booked (contract demand)' Text-xs/Medium ink-muted. Row 1 'Your first bill' (S13.1: 'Your agreement') 700 kVA, 250 wide in line-strong. Row 2 'This bill' 900 kVA, 321 wide: first 250 line-strong, last 71 warning #A54800 (the extra 200 kVA). Value '900 kVA' Text-sm/Semi Bold warning. Common zero-based scale (700/900 x 321 = 250). 8 tall radius 4, rows 34 tall, 8 apart.
- Hover: On first view the amber extension wipes in left to right over 300 ms after the bars settle. prefers-reduced-motion: none.
### Share preview card (document in skeleton language)
- Concept: The page the owner opens, drawn as a small white page on a grey stage, so she sees exactly what leaves the app. The exact message sent with the link sits right under it.
- Construction: Stage surface-muted, radius 16, padding 16. Card white, radius 12, padding 16, width 329, shadow y 1 blur 3 ink-strong 8%. Stack: header, amount, Due line Size S plus 'Checked by Ohm', then either a tick row and the July line (S09, height 249) or the amber block, reassurance line and the ask (S13.2, height 381), then plan and ask. State property: All good, One thing to look at.
- Hover: On open the card rises 8 px and fades in (200 ms) after the drawer settles. prefers-reduced-motion: fade only.

## New screens

### S13.1 Check failed, your agreement says 700 kVA (replaces S13b 'Check failed, your number')
- Purpose: The S13 version where the baseline is what Neha told Ohm (her Northgrid agreement says 700 kVA, set in S05) instead of her first bill. The old name said nothing about what failed. The new name states the baseline and does not claim the bill is wrong (Ohm cannot know). Place to the right of S13, same y, 80 gap.
- Layout: Full clone of S13 (393 x 1842). Only changes: frame name; band title 'Contract demand does not match'; bars row 1 label 'Your agreement'; clipboard, share and S07 text use the agreement wording (copy list). A hidden magenta outline layer marks the delta for reviewers. Footer, stats, note, ladder and other cards identical.
### S13.2 Share with owner, 1 thing to look at
- Purpose: Answers 'what happens when I tap Share with owner in this state, I want to see the preview'. It shows the page the owner opens, the ask, and the exact message sent. Place to the right of S13.3.
- Layout: Viewport frame 393 x 852. Dimmed clone of the first screenful of S13 behind. Drawer natural height 798 (y 54 to 852): grabber, title row with 44 px close, description 'This page opens when the owner taps the link', stage with the preview card (381 tall), caption 'Message that goes with the link' and the message block (4 lines), pinned channel row (WhatsApp, Email, Copy link, 56 px circles), 34 zone. Web cap 90dvh, body scrolls.
### S13.3 Copied, details for Northgrid
- Purpose: Shows the result of 'Copy details for Northgrid' and exactly what she copied, with one tap to send it on WhatsApp or by email. Place to the right of S13.1.
- Layout: Clone of S13, frame 393 x 2074. Button reads 'Copied' with an ink check. Between the button and the note: caption 'What we copied. Paste it, or send it now.', a surface-muted text block (6 lines, 144), then WhatsApp and Email outline buttons (44). Adds 232; everything below shifts down 232.
### S06.1 After Tue 8 Sep
- Purpose: Proves the ladder model over time: Today moves down the rail, the early row goes quiet and struck through, row 2 becomes the active tile, the footer amount and deadline change. Place under S06 with an 80 gap.
- Layout: Clone of S06, frame 393 x 1396 (height unchanged), date Wed 9 Sep. Changes: Today row between rows 1 and 2; row 1 muted with a struck-through amount; row 2 active tile with '7 days left'; footer 'Pay ₹36,42,160 by Wed 16 Sep'. Overdue (from Thu 17 Sep) is annotated only.
### S06.2 Paid
- Purpose: The state after payment, so S06 and S13 never show a ladder or a 'Pay' button for a bill that is already paid. Matches Home's Paid layout (hero ₹36,09,190, 'View receipt').
- Layout: Frame 393 x 1170. Hero with Paid Due line; payment card (88) in place of the ladder; check row, parts and July cards unchanged; footer 'View receipt' (Default, 50) and 'Share with owner' (Outline, 44).
### S09 update (existing frame, content change)
- Purpose: S09 still shows 'All 6 checks passed', 'Up 1.5%' and a blue box, which contradict the new S06 and break the colour rules. It takes the same Drawer structure as S13.2.
- Layout: Same as S13.2 with State All good: tick row 'No hidden charges or penalties', '₹53,820 more than July (1.5%)', plan and ask, 'Checked by Ohm', then the message block. Natural height 666. Title 'Share with owner'. Rebuild the dimmed clone behind it from the new S06.

## Interactions

- S06 or S13: tap Back in the top bar -> Pop to S01 Home (slide right, 300 ms). 44 x 44 hit area.
- S06, S13, S13.1: tap the 'Northgrid' top bar button -> Opens the Your connection Drawer (S01a, read-only, Large). Closing returns to the same scroll position.
- Tap the Due line, the Today tag or any Price ladder row -> Nothing. They are not controls: no press state, not in the tab order. The ladder is one labelled ordered list for screen readers.
- Tap the check row ('No hidden charges or penalties' on S06, 'Everything else checks out' on S13) -> Pressed fill surface-muted, then push S07 'What Ohm checked', which opens with what hidden charges are and why Ohm checks. In S13 states the contract demand row is amber and the other five are ticked.
- Tap the nav row 'See all 7 parts' -> Push S08 Where the money goes. Pressed fill surface-muted. The card is not otherwise tappable.
- Tap the nav row 'See trends' -> Push S12 Trends.
- Tap the footer primary ('Pay ₹36,09,190 by Tue 8 Sep') -> Push S10 Pay with the option matching the active ladder row preselected ('Pay by Tue 8 Sep' until 8 Sep, then 'Pay by Wed 16 Sep', then the late amount). Same in S13 and S13.1: paying is never blocked. In paid states the button is 'View receipt' and opens S11.
- S06: tap 'Share with owner' -> Opens the S09 Drawer (happy preview) over a dimmed S06.
- S13, S13.1: tap 'Share with owner' -> Opens S13.2: the same Drawer, whose preview card shows the amber '1 thing to look at' block, the plan and the ask, with the exact message below it.
- S13: tap 'Copy details for Northgrid' -> navigator.clipboard.writeText with the clipboard text (fallback: hidden textarea and execCommand for iOS Safari). Label becomes 'Copied' with an ink check for 3 s, aria-live polite 'Copied', and the 'What we copied' block with the WhatsApp and Email buttons appears (S13.3). It stays until she leaves.
- S13.3: tap WhatsApp or Email under the copied text -> WhatsApp opens https://wa.me/?text= with the same text (she picks the contact, so it can go to Northgrid or to a colleague). Email opens a mailto: with subject 'Contract demand on our August 2026 bill' and the text as body, no recipient.
- S13.2 or S09: tap WhatsApp -> Opens https://wa.me/?text= with the prefilled message (URL encoded, share_url appended). Hands off to the WhatsApp app on iPhone.
- S13.2 or S09: tap Email -> Opens a mailto: link with the subject and the same text as body.
- S13.2 or S09: tap Copy link -> Copies share_url. The link icon swaps to a check and the label to 'Copied' for 2 s. No toast.
- S13.2 or S09: tap X, drag the grabber down, or tap the dimmed area -> Dismiss and return to the underlying screen at the same scroll position.
- S13.2 or S09 on a short screen -> Drawer is capped at 90dvh. Grabber, title row and channel row stay pinned; description, preview and message scroll between them.
- Scroll the content -> A 1 px line token fades in under the top bar after 8 px. The footer fade sits above the buttons. The ladder, bars and cards do not animate on scroll.
- Press any button on web -> Default shadcn pressed state only (scale 0.98, 100 ms). No glass or morph effects.
- Date rolls over (IST midnight): 7, 8, 9, 15, 16, 17 Sep -> Follow the TIME STATES table: the Today tag moves down the rail, the passed row goes quiet and struck through, the next row becomes the active tile, the footer label follows, the Due line changes words, and the note and share plan lines pick the copy for that window. One source of truth drives hero, Due line, ladder and footer.
- Payment completes (S11, then Done) -> S06 becomes S06.2: Due line 'Paid Thu 3 Sep', the ladder is replaced by the payment card, footer 'View receipt'.
- Prototype links in Figma -> S06: back to S01, Northgrid to S01a, check row to S07, 'See all 7 parts' to S08, 'See trends' to S12, Pay to S10, Share with owner to S09. S13 and S13.1: same, Share with owner to S13.2, Copy details to S13.3. S13.2 close back to S13. S06.2: View receipt to S11.

## Research

- Afterpay (Payment schedule) https://mobbin.com/screens/896a8f02-33b2-45e2-8d85-2d30cba028b8: A vertical rail with dots, date on the left, amount on the right, a sub-line under each. The next step is a hollow dot and later steps fade. The model for the Price ladder and its past-row state.
- Afterpay (Payment Calculator) https://mobbin.com/screens/1d60012d-bc33-4af1-a2bb-53880b03fda5: The first date row carries the word 'Today' as a small caption on the rail, so 'where am I in the schedule' needs no explanation. Basis for the Today tag.
- CRED (statement view with due tag and 'zero hidden charges detected') https://mobbin.com/screens/4b32ea66-a7dc-4ba1-99f1-335da21df047: The amount sits with one clear due-date mark, and the reassurance is a quiet one-line fact after the money, not a status banner. Supports a single Due line under the amount and the reassurance row.
- CRED (Bill payment sheet) https://mobbin.com/screens/2d6962d4-70e9-4d2a-bca2-5f42ed96aeae: The due mark lives in the payment sheet header too, and each pay option is one row with one amount. The due date reads the same wherever the bill appears.
- CRED (this will change your bill amount) https://mobbin.com/screens/bf7326c3-8400-4c4e-938c-7ec9c1ac7251: Original amount, change and result as a short stacked list with a tiny caption under each label; colour only on the one number that changed. Same restraint as the ladder rows.
- Mercury (expense flagged) https://mobbin.com/screens/25035383-61d3-4260-9de7-ca33e00e2f8f: The issue is a soft warm-tinted card with dark text and a neutral button, directly under the amount and above the details. Informs the amber band with ink text and an Outline action.
- Revolut Business (caution card) https://mobbin.com/screens/c75c5e2a-7f11-4d53-8bb2-52217f144c1a: A muted card with one amber warning icon and neutral Share and Cancel pills; caution is one small accent, not a coloured block. Supports keeping amber to the band, eyebrow and a bar extension.
- Revolut Business (bill detail, 'due today' only on the day) https://mobbin.com/screens/ef78b340-6893-4314-973a-96a757d46812: Urgency colour appears only on the due day. This is why the Due line goes warning only on 16 Sep and 'Last day' is the only amber tag on the ladder.
- Zip (statement with late fee warning) https://mobbin.com/screens/d3fed15d-3ef3-4ec2-a6e9-9400a65db6b5: New balance, payment due and due date as plain label and value lines, then the consequence of paying late in plain words. Confirms stating the late price as a plain consequence, not an alarm.
- Wise (Spending bars) https://mobbin.com/screens/4c1c1130-02b5-4f97-b777-6595740c4096: The selected month is the one dark bar and the other months are light grey, with labelled months and the amount under. One emphasised mark and a neutral rest is the chart rule for S06 and S13.
- Copilot (Monthly spending) https://mobbin.com/screens/c234ccb2-d1cb-4582-9df5-87c3a4a3d697: Counterexample: green and red bars plus an amber dot per row. Colour carries too many meanings at once, which is what made the old S06 feel messy.
- Deepstash (Share Idea) https://mobbin.com/screens/ce468a96-88a6-4977-8459-7906105e4f88: The share sheet shows a preview of the thing being sent at the top, then a Share to row with WhatsApp first, then a share link with Copy. Basis for the preview-first Drawer and WhatsApp-first order.
- inDrive (Receipt with Download, Share, Mail) https://mobbin.com/screens/e7ce7ac5-22ca-4d50-9bcf-8aaddf7da919: The document itself is the preview and the actions are three round icon buttons with labels below. Matches the 56 px channel buttons.
- Gojek (Review payment) https://mobbin.com/screens/36a68195-aca3-4a1e-91d6-6b2a974be896: The pinned pay button carries the amount ('Pay now Rp888.000'). We add the deadline to the label so the button explains itself on every screen.
- Lloyds Mobile Banking (Upcoming payments timeline) https://mobbin.com/screens/cd152d76-844d-411c-b3f7-a4b92a6c5cd2: A dashed connector ends in a dot to show an open-ended range. Used for the dashed last rail segment after the due date.
- Revolut Business (application timeline) https://mobbin.com/screens/785cad2b-1c55-4a83-adfb-cafb61d01340: Done steps in full ink with a time and future steps muted with an estimate. Supports muting the passed ladder row and the Today caption.

## Code notes
Buildable with shadcn on a phone-width web page; no glass or iOS chrome.
- Page shell: max-w 393 centred on desktop, full width on phones. Header = sticky top-0 div on surface-muted (54 tall on the web; the 62 px status bar in Figma is device context). Footer = fixed bottom-0 with a 24 px gradient above (from-transparent to surface-muted) and padding 12px 16px max(12px, env(safe-area-inset-bottom)), about 126 tall in Safari. Content padding-bottom about 142 on the web (footer plus 16); the Figma frames use 164. Use dvh, never vh, for the page and drawers. Test at 393 x 660. Top bar line via an IntersectionObserver sentinel (8 px).
- Fonts: the rupee sign (U+20B9) is in Inter's latin-ext subset, not latin. Load Inter latin plus latin-ext (or self-host full Inter), and test the ₹ in the hero, ladder and footer button. Re-measure the hero amount, ladder amounts and button label with the real glyph. Text widths in this spec are measured with fallback ₹ and are approximate by a few px.
- Money: Intl.NumberFormat('en-IN') gives 36,42,160. Never use Intl for dates (en-IN renders September as 'Sept'); use a small formatter: weekday short + ' ' + day + ' ' + month short ('Sep'). Hero ₹ is a span at 0.7em in ink-muted with a 4 px gap.
- One source of truth: a function priceWindow(nowIST) returns early, standard or late and drives the hero amount (bill amount until 16 Sep, late amount from 17 Sep, paid amount when paid), the Due line words and tone, the ladder row states, the footer label, the S13 note, and the share plan line. Windows in Asia/Kolkata: until end of 8 Sep early, until end of 16 Sep standard, else late (assumption, see open question on deadline semantics).
- Cards: shadcn Card with rounded-2xl border-0 shadow-none bg-card p-5, all hug (no fixed heights). Back = Button variant ghost size icon (44). Northgrid = Button variant ghost h-11 with chevron-down. Footer = Button default rounded-full h-[50px] and Button outline rounded-full h-11. Check row = Item inside a Card. Nav row = a button element, full width, h-12, text-sm font-medium text-primary, with a border-t inset 20. Parts bars = plain divs (track surface-muted, fill line-strong) or shadcn Progress with the indicator colour overridden.
- Ladder: <ol aria-label='Price by date'> with <li> per row; active row aria-current='step'; Today is plain text in the first li. Rail drawn with a ::before on the ol (2 px) and per-li ::after segments; node = 12 px span with a 2 px border; dashed last segment = border-left dashed. Active row tile = li inner div bg surface-muted rounded-xl p-3. The Due line is a plain div with an icon and text (not a Badge and not a Button).
- Bars: divs with percentage widths (units extension = 5,700 / 3,26,500 = 1.75% of the bar; 700 kVA = 77.78% of 900). role='img' with the aria-label from the copy list; the segmented bars are two divs. Animate width once with a CSS transition and respect prefers-reduced-motion. Data marks use line-strong (3.2:1 on white); every value is also text.
- Problem card: Card overflow-hidden; band div bg warning-subtle, padding 16. No role=alert on load (page content, not an interruption). The Copy button uses navigator.clipboard.writeText with a textarea and execCommand fallback for iOS Safari; label swap to 'Copied' for 3000 ms; an aria-live='polite' span announces it. The clipboard text is built from fields Ohm already read: account number, month, the two kVA values and the extra cost; nothing is invented. The full account number must be stored for this to work (the S01a display is masked).
- Share = shadcn Drawer (vaul), shouldScaleBackground off (the dim layer is enough). DrawerContent max-h-[90dvh] flex flex-col: header and channel row are flex-none, the middle is overflow-y-auto. WhatsApp: <a href='https://wa.me/?text='+encodeURIComponent(msg)>. Email: mailto with subject and body. Copy link: clipboard with the same fallback. Optional 4th 'More' item calls navigator.share when available.
- Contrast checked (WCAG): white on ink-strong about 16:1; warning on warning-subtle about 5.5:1; success on white about 6:1; ink-muted on white about 7.7:1; line-strong on white about 3.2:1 (graphics need 3:1). #DCDFE4 on white is 1.3:1, so it is only used for separators and tracks, never for a mark that carries meaning.
- Touch targets 44 or more (nav rows 48, channel buttons 56, footer 50 and 44, close and back 44).
- Figma build notes: new components go in Foundations Section 'Components · S06 S13'. Add the line-strong variable first. Build S06 first, then clone to S13 and swap slot 2 (insert the problem card after the hero, change the check row copy and height). S13.1 and S13.3 are clones of S13; S06.1 and S06.2 are clones of S06. Frame heights grow (S06 1396, S06.2 1170, S13 1842, S13.3 2074); the footer and top bar are absolute with constraints Bottom and Top. Rebrand pass on every frame. Run the duplicate-text scan afterwards. The Bill status mini needs Size L and Tile on/off; this track adds them.
- Arithmetic used (none invented): 36,42,160 minus 35,88,340 = 53,820; 53,820 / 35,88,340 = 1.5%; 3,26,500 minus 3,20,800 = 5,700 units (5,700 / 3,20,800 = 1.8%); 36,87,690 minus 36,42,160 = 45,530; 4,620 x 12 = 55,440; 900 minus 700 = 200 kVA; 700/900 x 321 = 250 px; 8 Sep minus 3 Sep = 5 days; 16 Sep minus 9 Sep = 7 days.
- Not shown on purpose: ₹78,500 (late minus early) and any chain such as '36,42,160 minus 36,09,190', because that difference is ₹32,970, one rupee off the stated ₹32,971 (1% of ₹32,97,130). The July bill total is no longer shown on S06 at all, and the July paid amount and 'Saved ₹32,480' never appear next to it.

## Open questions

- 1. Home amendment, needs sign-off from the Home owner: Round 1 put the due date in Home's eyebrow and avoided a strip or badge, and I kept that. The only requested change is typographic: the 'due Wed 16 Sep' span becomes Medium ink-strong (no height change on any Home layout). I dropped my earlier dark Due chip and its Home height change because it reopened that decision. If Home keeps the muted regular span, S06 still works but 'consistently' is weaker. Approve the one-line type change?
- 2. I disagree in part with the critique on the S06 check row. I kept the Round 1 phrase and sub-line ('No hidden charges or penalties / Charged at the regulator's rates') so Home and S06 match, and put the 'what are the checks and why do I need them' answer first on S07 (one tap away, never a count). Option B if the lead wants it on S06: a one-line caption under the row, 'Ohm checks every bill so you do not have to', which costs about 28 px. Which do you prefer?
- 3. I kept 'Wed 16 Sep' in the Due line, ladder row 2 and ladder row 3 ('After Wed 16 Sep'), because the ladder is a schedule and dates are its axis. The repeated amount, the 'Due date.' sub-line and the second countdown are gone. If the lead still reads the three dates as repetition, row 3 can say 'After the due date'.
- 4. Rounding: ₹36,42,160 minus ₹36,09,190 is ₹32,970, one rupee under the stated saving ₹32,971 (1% of ₹32,97,130). I show 'Save ₹32,971' only and never a subtraction. Should Northgrid or finance confirm which figure is authoritative?
- 5. Deadline semantics: does 'by Tue 8 Sep' mean up to 11:59 PM IST, and is a net banking payment started on 8 Sep but confirmed by Northgrid on 9 Sep still discounted? The ladder switches at IST midnight on this assumption. S11 already shows 'Paid, waiting for Northgrid to confirm', which is why S06.2 says the saving applies once Northgrid confirms.
- 6. S13 figures: the printed Booked capacity line is 664 kVA x ₹420 = ₹2,78,880, so the ₹4,620 extra for 900 kVA cannot be derived from the bill, and 200 kVA x ₹420 would be ₹84,000. I use ₹4,620 and ₹55,440 (x 12) as given and label them only 'more this month' and 'more in a year, if it repeats'. Please confirm the basis, and that it still holds when the baseline is the agreement (S13.1), before build.
- 7. The July card explains the rise in units only (5,700 more units); I did not split the ₹53,820 into rupee parts because July's parts and rates are not available. Is units-only acceptable, or can we get July's parts later?
- 8. Share link: is share_url a public read-only page (no login) for the owner, with an expiry? It carries financial figures, so signing, expiry and revocation must be decided before WhatsApp and Email ship. The drawer says 'This page opens when the owner taps the link', so that page must exist as drawn.
- 9. Account number: S01a only holds the masked 4410 28••••, but the 'Copy details for Northgrid' text needs the full number (and the bill number if the PDF prints one). The mock shows the masked value. Does Ohm store the full number read from the PDF?
- 10. S13.1 is kept as a full 1842 px clone with a hidden delta outline, not a partial frame, because the prototype needs a complete screen and variants make it cheap. Rename of S13 to 'S13 Check failed, changed since first bill' is decided (yes). Say if you would rather show S13.1 as a labelled overlay on S13.
- 11. Top bar: I changed the title to 'Bill summary' and the button to 'Northgrid' with a chevron-down (opens Your connection). 'HT' is dropped as jargon. S01a and S07 links must use the new label. Agree?