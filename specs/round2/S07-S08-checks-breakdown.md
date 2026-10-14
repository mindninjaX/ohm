# S07-S08-checks-breakdown

## Summary

Revision 2 keeps what worked (three plain questions, single-hue share bars, the diverging time-of-day bar, the final amount first, the S07b failed variant) and fixes every high and medium critique point. S07 now says each fact ONCE per card: title, one plain sentence about what the check protects, ONE flat evidence tile in the S04 language (soft grey tile, blue focus row, round badge only when something needs a look), and a rupee line ONLY where a real stake exists (₹32,971 discount, ₹0 penalties, and ₹4,620 / ₹55,440 when contract demand fails). Gone: the invented ₹30,038, the ₹36,42,160 stake, the 'FOR YOUR BILL' label, the 7-tick strip and the claim that every line is checked (sales tax ₹97,754 does not equal 30 paise x 3,26,500, so check 1 now names only the four charges that really are reading x rate and no tick is put on Taxes). The 700 vs 664 'booked' contradiction is fixed with two terms (Contract demand 700 kVA, Highest use 664 kVA). Equation chips that overflowed are replaced by receipt rows, bars and a 2-line meter chain that fit at 305 px and stack below that. Power factor is a marker on a 0 to 1 scale (no near-full gauge) and headroom is stated as 36 kVA to spare. 'How we check' stays dissolved into the two group helpers; Penalties has no group header. S08 drops the dropdown completely: Taxes and Time of day are always open, so the default S08 frame IS the 'everything expanded' view the lead asked for. Rows are ordered so the five pre-tax parts come first, then a 'Before taxes ₹32,97,130' subtotal (so duty and discount can be verified), then Taxes and last month's balance. The total leads with ₹36,42,160 and rounding is one 12 px muted line, 'Rounded by Northgrid.' One link name everywhere, 'Breakdown'. Both pages keep the pinned Pay and Share footer, with a date and paid state table, and S08b shows the failed-check state. Heights: S07 about 2,267 (was 2,700), S07b about 2,399, S08 about 1,465, S08b about 1,633, S08c about 1,465.

## Layout

GLOBAL RULES (S07, S07b, S08, S08b, S08c)
- Web chrome only. Frame 393 wide, fill surface-muted #F1F2F4, vertical auto layout, height HUG, clip content OFF, so nothing is ever cut. Gutter 16, cards 361 wide, card inner 329. Children in order: Status bar, App bar, content, Pay footer. The home indicator is an absolute overlay named `iOS / Home indicator` at x 0, y = frame height minus 34. Status bar (local 5:2866) and home indicator are device context only. No iOS nav bar, no tab bar, no glass, no scroll-edge effect.
- Placement: S07b under S07; S08b and S08c under S08. Each sits 160 below the previous frame's ACTUAL bottom (not a fixed step). Heights below are computed from the component specs; re-measure after build.
- App bar (local component, shared; reuse if another track already made it): 56 tall (y 62 to 118), fill surface-muted, padding 0 12, gap 8, centred. Leading shadcn Icon Button, Ghost, 40 x 40 visual inside a 44 x 44 hit frame, fully round, Lucide chevron-left 24 (stroke 2, ink-strong), accessible name "Back". Title Text-base/Semi Bold 16/24 ink-strong, 1 line, fill. No trailing item. Build: sticky top-0, same fill.
- Pay footer (local component, shared with S06 and S13; copy theirs if it differs): fill card white, 1 px top border line #DCDFE4, padding 12 16 0, gap 8, vertical. Button Default, Rounded, 361 x 50, primary, Text-base/Semi Bold white "Pay ₹36,09,190" (to S10). Button Outline, Rounded, 361 x 44, Text-base/Medium ink "Share with owner" (to S09). 34 spacer where the home indicator sits. Height 1 + 12 + 50 + 8 + 44 + 34 = 149. Last child; build: sticky bottom-0 with pb-[env(safe-area-inset-bottom)]. Amount and button set follow S06's footer for every date and paid state (see DATE AND PAYMENT STATES). For a scrolling prototype wrap content in a 393 x 852 viewport frame (Overflow Vertical) with App bar and Pay footer Fixed.
- Rhythm: 12 between cards, 24 between groups, 12 between a group header and its first card.
- ONE GREY LEVEL: a white card (radius 16, borderless) may contain only one grey surface level (a tile in surface-muted, radius 12, or chips in surface-muted, radius 10). Never a grey panel that holds white chips, never white-in-grey-in-white.
- FACTS ONCE: inside a card every number or claim appears once (sentence OR visual label, never both). A fact stated in a group helper is not repeated in the card sentences.
- COLOUR: primary is the data colour; ink-muted is the reference bar; success only for the card tick, the ₹32,971 saving, ₹0 penalties and amounts or bars that take money off; warning only in the Look state (S07b, S08b). Amounts use tabular figures. Every brand-token paint carries the real hex as fallback (gotcha 3). Run the rebrand pass and the duplicate-text scan; the dash lint checks U+2013 and U+2014 only (× is U+00D7 and − is U+2212, both allowed).
- Type: library styles only. Nothing below 12 px; visual captions are 14 px where there is room.
- NARROW WIDTHS: frames are drawn at 393 but built fluid. At 375 and 360 the card inner is 311 and 296. Rules: tiles and chips use min-w-0 with the label free to wrap to 2 lines and the value shrink-0 nowrap; every bar is a percentage width computed from data, never px; the meter chain (check 5) stacks vertically below 340 px viewport width (chip, arrow down with the multiplier, chip); S08 maths lines may wrap to 2 lines (row grows by 20).

=================================================
S07 CHECKS (rebuild frame 9:7654 in place). Hug height about 2,267.
=================================================
y 0 to 62 Status bar. y 62 to 118 App bar, title "What Ohm checked" ("6 checks" is retired as a title: a number is not a purpose; the count lives in the hero sub-line logic and in S07b as '1 thing to look at').

HERO (centred), y 118 to 390
- 8 top padding. Illustration / Bill instance (S04 set), Size=Compact, Focus=Checks, Status=Done: 240 x 128 at x 76, y 126 to 254, not scaled. The crop shows the block where the contract demand, category, multiplier, peak and power factor are printed (4 of the 6 checks); S04 owns the component.
- 16 gap. Headline "No hidden charges / or penalties" (manual break after charges; build text-balance), Text-2xl/Semi Bold 24/32, ink-strong, centred, x 32, w 329, 2 lines, y 270 to 334.
- 8 gap. Sub-line Text-base/Regular 16/24, ink-muted, centred, w 329, 2 lines, y 342 to 390: "A hidden charge is a wrong rate or a changed setting. Ohm found none." (defines the term from round 1, then answers it).
- 24 gap.

GROUP 1 "Is the maths right?" (cards 1 and 2)
- Group header (local component): x 32, w 329. Label Text-base/Semi Bold 16/24 ink-strong; 2 gap; helper Text-sm/Regular 14/20 ink-muted, max 2 lines; optional Link row (4 gap, 32 tall). G1: label "Is the maths right?", helper "Redone with the rates the state regulator approved." (2 lines). Header 66 tall, y 414 to 480. This helper is the only place that says the regulator's rates were used, so the card sentences do not repeat it.
- Card 1 Charges add up, y 492 to 705 (213). Card 2 Discount worked out right, y 717 to 930 (213).

GROUP 2 "Did anything change?" (cards 3, 4, 5), 24 gap, header y 954 to 1,056 (102)
- Label "Did anything change?"; helper "Compared with your first bill. If one changes, we tell you." (2 lines); then Link button (Button Link sm, 32 tall, 44 hit, Lucide chevron-right 14, primary Text-sm/Medium) "See the details we compare against" opening the read-only Your connection Drawer. This helper is the only place that says 'first bill', so cards 3 to 5 do not repeat it except as a visual label where the visual needs it.
- Card 3 Contract demand unchanged, y 1,068 to 1,280 (212). Card 4 Category fits your business, y 1,292 to 1,512 (220). Card 5 Meter multiplier unchanged, y 1,524 to 1,680 (156).

CARD 6 No penalties (no group header: its title already is the question, and the hero defines penalties), 24 gap, y 1,704 to 2,002 (298).

FOOT: 24 gap. shadcn Item (white card, 361 x 68, padding 14 20): leading 36 circle primary-subtle with Lucide file-search 20 in primary; title Text-sm/Medium ink "See how Ohm read this bill"; description Text-sm/Regular ink-muted "Every step, from finding your bill to these checks"; trailing chevron-right 16 ink-muted. Goes to S04r. y 2,026 to 2,094. 24 gap, Pay footer y 2,118 to 2,267. Frame about 2,267.
First view (y 0 to 703 visible above the footer): hero, group 1 header and card 1.

CHECK CARD (local component set "Check card", State = Clear | Look; slots: Visual (instance swap), Stake (boolean), Action (boolean)). White card radius 16, borderless, padding 16, vertical, 361 wide.
 a. Header row 24: Lucide circle-check 20 success (Look: triangle-alert 20 warning), 8 gap, title Text-base/Semi Bold ink-strong (Look: warning), fill; optional trailing Link button.
 b. 4 gap. Sentence Text-sm/Regular 14/20 ink, 2 lines (40). It says what the check protects in plain words, with no numbers that the visual shows.
 c. 12 gap. Visual (see Illustrations), 329 wide.
 d. Optional stake row, 12 above: amount Text-xl/Semi Bold 20/28 tnum (hug), 12 gap, descriptor Text-sm/Regular ink-muted (fill, up to 2 lines, top aligned). No label, no separator. Only cards with a REAL rupee consequence have it: card 2 (merged into the visual's result row), card 6 (₹0), S07b card 3 (₹4,620).
 e. Optional Action button, 12 above (S07b only).
 Accessibility name of the card: "Contract demand unchanged, clear" or "Contract demand changed, needs a look".

CARD CONTENT (all strings final)
 1 Charges add up: header link "Breakdown" (to S08). Sentence "Redone for electricity, fuel adjustment, wires and booked capacity. All four match." Visual Receipt: Units used 3,26,500 / Approved rate per unit × ₹6.90 / divider / Electricity used ₹22,52,850 (focus row, primary-subtle). Tile 101. No stake. Sales tax and state duty are deliberately not claimed here.
 2 Discount worked out right: Sentence "Worked out on your bill before taxes. You get it if you pay by Tue 8 Sep." Visual Receipt: Bill before taxes ₹32,97,130 / Early-payment discount × 1% / divider / You save ₹32,971 (focus row success-subtle, value success). The result row IS the stake, so ₹32,971 is printed once. Tile 101.
 3 Contract demand unchanged: Sentence "The most power you agreed to draw at once. A change would change your bill." Visual Compare bars, scale 0 to 700 kVA: First bill 700 kVA (ink-muted bar, full) / This bill 700 kVA (primary bar, full). Tile 100. No stake.
 4 Category fits your business: Sentence "Your rate plan sets the rates on your bill, so it has to fit your business." Visual Business and plan: icon building, caption "Your business", value "Hotel"; 12 gap with a 1 x 12 connector line between the icon circles; icon file-check, caption "Your rate plan (high voltage)", value "HT Commercial". Tile 108. No stake.
 5 Meter multiplier unchanged: Sentence "Your meter count is multiplied by a fixed number to get the units you pay for." Visual Meter chain: chip "Meter count / on your meter", operator "× 2,000" with arrow, result chip "3,26,500 / units billed" (primary-subtle). No outer tile, 44 tall. No stake. The meter count itself (163.25) is never printed, and no blank skeleton stands in for it: the first chip is a label, not a missing number.
 6 No penalties: Sentence "Ohm checked the two things that can bring a penalty." Visual Headroom and power factor, tile 146. Stake: ₹0 (success) "in penalties on this bill."

=================================================
S08 BREAKDOWN (rebuild frame 9:7679 in place). Hug height about 1,465. No dropdowns.
=================================================
y 0 to 62 Status bar. y 62 to 118 App bar, title "Where the money goes". No intro line (the title says it).
- 8 gap. TABLE CARD at y 126, white, radius 16, borderless, padding 0, clip off, vertical, 361 wide, ends y 1,196 (1,070 tall).
- BILL PART ROW (local component set, Type = Plain | Split | Subtotal, Info = None | Popover). Row: padding 14 16, vertical. Line 1 (24): name Text-base/Medium ink, 4 gap, optional Info button (Lucide info 16 ink-muted, 44 x 44 hit), spacer, amount Text-base/Semi Bold ink-strong tnum right. 2 gap. Line 2 (20): maths Text-sm/Regular ink-muted tnum (fill, 1 line), share Text-sm/Regular ink-muted tnum right (hug). 8 gap. Share bar 329 x 6, radius 3, track primary-subtle, fill primary, width = part / ₹36,42,169 x 329, minimum 2 px, aria-hidden. Plain row height 88. Hairline separators (Separator, line #DCDFE4, inset 16) between rows.
- Rows in order (name, amount, share, maths, bar px of 329):
 1 y 126 to 214. Electricity used, ₹22,52,850, 62%, "3,26,500 units × ₹6.90 per unit", 203.5
 2 y 215 to 303. Fuel adjustment (i), ₹3,91,800, 11%, "3,26,500 units × ₹1.20 per unit", 35.4
 3 y 304 to 392. Wires (i), ₹3,59,150, 10%, "3,26,500 units × ₹1.10 per unit", 32.4
 4 y 393 to 481. Booked capacity (i), ₹2,78,880, 8%, "Highest use 664 kVA × ₹420 per kVA", 25.2
 5 y 482 to 750 (268). Time of day, ₹14,450, 0.4%, "Evenings add most, nights take off", 2 (true 1.3), then SPLIT BLOCK (below).
 6 y 750 to 824 (74). SUBTOTAL band, full bleed, fill surface-muted, no hairline, no share, no bar: "Before taxes" Text-base/Semi Bold ink-strong + ₹32,97,130 Text-base/Semi Bold ink-strong tnum; line 2 "Sum of the five parts above" Text-sm/Regular ink-muted. It is not a part, so the count stays 7.
 7 y 824 to 1,016 (192). Taxes, ₹3,45,039, 9%, "State duty plus sales tax", 31.2, then SPLIT BLOCK.
 8 y 1,017 to 1,111 (94). Last month's balance, name and amount in ink-muted, ₹0, no share, no bar, line 2 (2 lines) "₹2,140 carried over and cleared, so it adds nothing." (same words as S04 row 3, which uses 'cleared').
- Full-width separator at y 1,111. TOTAL BLOCK y 1,112 to 1,196 (84), padding 16: row 32: "Bill total" Text-base/Medium ink left; right "₹" Text-base/Medium ink-muted + "36,42,160" Text-2xl/Semi Bold 24/32 ink-strong tnum. 4 gap. Small line Text-xs/Regular 12/16 ink-muted: "Rounded by Northgrid." (no ₹36,42,169, no rule stated).
- SPLIT BLOCK (always open, no accordion): sits 12 below the share bar inside the row, inside the row's 16 side padding, 329 wide, with a 2 px left rule (line #DCDFE4) and 12 left padding, inner width 315. The row's bottom padding 14 stays. No grey panel (one grey level).
  Taxes block (92 tall): sub-line A line 1 (20) "State electricity duty" Text-sm/Medium ink + ₹2,47,285 Text-sm/Semi Bold ink-strong tnum right; line 2 (20) "7.5% of ₹32,97,130 (Before taxes)" Text-sm/Regular ink-muted. 12 gap. Sub-line B "Sales tax" ₹97,754 / "Charged per unit, on 3,26,500 units". No sum pill (the row amount above is the sum).
  Time of day block (168 tall): three slot rows with 12 between, each 32: line 1 (20) slot name Text-sm/Medium ink + signed amount Text-sm/Semi Bold tnum right (adds in ink-strong, take-off in success); 4 gap; DIVERGING BAR 315 x 8 (track surface-muted radius 4, 1 px centre axis ink-muted at x 157.5, 12 tall; adds primary to the right, takes-off success to the left; scale 157 px = ₹68,550). Mornings +₹22,800 (52.2 right). Evenings +₹60,200 (137.9 right). Nights −₹68,550 (157 left). 8 gap, caption Text-sm/Regular 14/20 ink-muted, 2 lines: "Bars to the right add to your bill. Bars to the left take off." No sum pill.
- 16 gap. NOTE 1 (no card), x 16, 361 wide, 8 gap: Lucide circle-check 16 success (top aligned) + column: Text-sm/Regular ink-muted "Ohm checked this bill before showing it to you." then Link button sm "What Ohm checked" with chevron-right 14 (to S07). Height 48, y 1,212 to 1,260.
- 8 gap. NOTE 2, x 16, Text-base/Regular 16/24 ink-muted: "Pay by Tue 8 Sep and " + "save ₹32,971" in Medium success (identical to the Home supporting line; separate text layers). y 1,268 to 1,292.
- 24 bottom padding, Pay footer y 1,316 to 1,465. Frame about 1,465 (home indicator y 1,431).
- (i) POPOVER: shadcn Popover, white, radius 12, padding 12, width 260, shadow y 4 blur 16 ink-strong 12%, Text-sm/Regular ink, anchored 8 below the info icon, left aligned to x 16, no dim layer. Only Fuel adjustment, Wires and Booked capacity have (i); Electricity used, Taxes, Time of day do not (they are plain words or already show their split).

=================================================
S07b (variant: one check needs a look). Hug about 2,399. Changes only:
=================================================
- Hero illustration Compact / Focus=Checks / Status=Flagged. Headline "1 thing to look at" (plural: "2 things to look at"). Sub-line "5 of 6 checks are clear. You can still pay now and keep the ₹32,971 discount." (3 lines at worst, hero ends y 414, everything below moves +24).
- Group 2 helper unchanged. Card 3 State=Look, y 1,092 to 1,412 (320): fill warning-subtle #FFF7D6, header triangle-alert 20 warning, title "Contract demand changed" in warning #A54800, sentence "Higher than your first bill, and you have not asked for a change." (2 lines, no numbers: the visual carries them). Visual Compare bars Look (white tile, scale 0 to 900 kVA): First bill 700 kVA (237.2 px, ink-muted), This bill 900 kVA (305 px, warning), round warning badge on the tile corner. NO '+200 kVA' bracket (it invites 200 x ₹420 = ₹84,000, which is not how ₹4,620 arises). Stake row: ₹4,620 in warning + "more this month. ₹55,440 a year if it repeats." (2 lines). Action: Button Secondary (grey fill), Rounded, 44 tall, 329 wide, Lucide copy 16, "Copy details for Northgrid" (Secondary, not Outline, so it can never be mistaken for the footer's Outline 'Share with owner'; S13 should adopt the same style, see handoffs).
- Card 6 unchanged from S07 (peak 664 is under the 700 kVA agreed; the bill's 900 is never adopted as a 'booked' figure). Cards 4 and 5 unchanged. Footer unchanged. Positions: G1 header 438, cards 1 and 2 at 516 and 741, G2 header 978, card 3 1,092, card 4 1,424, card 5 1,656, card 6 1,836 to 2,134, Item 2,158 to 2,226, footer 2,250 to 2,399.

S08b (variant: one check needs a look). Hug about 1,633. S08 plus: shadcn Alert at y 126 to 282 (156), 361 wide, fill warning-subtle, radius 16, padding 16, Lucide triangle-alert 16 warning, title Text-sm/Semi Bold warning "Contract demand changed", description Text-sm/Regular ink "This bill says 900 kVA, not the 700 kVA on your first bill. It costs ₹4,620 more this month." (3 lines), Link button sm "See the check" with chevron-right 14 (to S07b, replace). 12 gap, then the table card at y 294 (unchanged rows: the demo data does not say which part carries the ₹4,620, so no row is marked). Note 1 flips to Lucide triangle-alert 16 warning with "Ohm found 1 thing to look at." and the same link "What Ohm checked". Footer unchanged.

S08c: S08 with the Popover open under the (i) after Fuel adjustment: info icon at x 141 to 157, y 233 to 249; popover x 16, y 257 to 341 (3 lines, 84 tall), copy "An extra charge for changes in the cost of the fuel that makes your power." The other two sentences are variants next to the frame. Hug about 1,465.

=================================================
DATE AND PAYMENT STATES (S07, S07b, S08)
=================================================
Today Thu 3 Sep 2026 is state A. The Pay footer and S08 Note 2 are shared components fed by the same date logic as S06 and Home, so they always follow those rules. Only the strings below are owned here.
- A, unpaid, until Tue 8 Sep: footer Pay ₹36,09,190 + Share with owner. Check 2 as drawn (You save ₹32,971, success). S07b sub-line as drawn. Note 2 "Pay by Tue 8 Sep and save ₹32,971".
- B, unpaid, Wed 9 to Wed 16 Sep: footer per S06 (undiscounted amount) + Share. Check 2 sentence "Worked out on your bill before taxes. The discount ended on Tue 8 Sep." Result row "Discount, ended Tue 8 Sep" with ₹32,971 in ink-muted, no highlight. S07b sub-line "5 of 6 checks are clear. Pay by Wed 16 Sep to avoid paying ₹45,530 more." (₹45,530 = ₹36,87,690 minus ₹36,42,160). Note 2 follows the Home line.
- C, unpaid, after Wed 16 Sep: footer per S06 (late amount). Check 2 as B. S07b sub-line "5 of 6 checks are clear. This bill is now past its due date." The late total ₹36,87,690 is not printed on S07 or S08. Note 2 follows the Home line.
- D, paid (S11, Thu 3 Sep, 11:42 AM): the footer becomes one Button Outline Rounded 44 "View payment" (to S11), height 91. Check 2 sentence "Worked out on your bill before taxes. You paid before Tue 8 Sep." Result row "You saved" ₹32,971 (success). S07b sub-line "5 of 6 checks are clear. Your payment is made." Note 2 becomes "Paid Thu 3 Sep, 11:42 AM" in ink-muted.
- Loading (a deep link before Ohm has finished reading): shadcn Skeleton blocks with the same app bar: hero (240 x 128 plus two text lines) and 3 card skeletons on S07; one 361 x 520 card skeleton on S08. Error: shadcn Alert (danger-subtle, triangle-alert) "We could not load this bill's checks." with Button Outline sm "Try again". These screens are normally reached only from screens that already hold a finished bill.

=================================================
REQUIRED HANDOFFS (not assumptions; each owner must confirm)
=================================================
- S01 Home bill card (approval item): eyebrow row, right aligned, Button Link size sm "Breakdown" with chevron-right 14 (primary, Text-sm/Medium, about 96 px; the longest eyebrow is 215 px of 321 so it fits). Baseline aligned with the eyebrow; hit area extends into the card padding so the card stays 283 tall. Opens S08. The reassurance footer row still opens S07. If Home rejects it, S08 is reached from S06 and S07 only.
- S06 Bill summary: the 'Where the money goes' card header has the title left and Button Link "Breakdown" right at the TOP; the card is ONE stretched link (the header link's ::after covers the card, rows inside are not interactive, so no nested anchors); it shows the 3 largest parts (Electricity used, Fuel adjustment, Wires) with the same share bars; pressed fill surface-muted; the frame grows so nothing is clipped. Remove the low 'See all 7 parts' link. The hero sub-line gets NO link (it stays a plain due date).
- S13: the '1 thing to look at / 5 of 6 checks passed' strip becomes a link to S07b (it has no link today).
- S04 and S04r: (1) row 4 detail order becomes Charges add up, Discount worked out right, Contract demand unchanged, Category fits your business, Meter multiplier unchanged, No penalties. (2) Row 4 detail 1 text becomes "Redone for electricity, fuel adjustment, wires and booked capacity. All four match." (3) Row 2 detail 2 sub-text "You booked 700 kVA" becomes "You agreed 700 kVA"; flagged variant "This bill says you booked 900 kVA" becomes "This bill says 900 kVA". (4) Row 2 detail 3 sub-text "Close to 1 means no penalty" becomes "1 is best" (no penalty rule is in the data). (5) Maths uses × instead of x; prose keeps the word 'minus'. (6) The S07 'See how Ohm read this bill' Item lives in the bottom row.
- S01a / S05 saved view: 'See the details we compare against' opens it as a shadcn Drawer (bottom sheet), read-only.
- S13: 'Copy details for Northgrid' should use Button Secondary Rounded 44 to match S07b (or the lead picks Outline for both and S07b follows; the only rule is that the two screens match and differ from the footer's Outline 'Share with owner').

## Copy

- **S07 app bar title**: What Ohm checked
- **S07 hero headline (line break after charges)**: No hidden charges
or penalties
- **S07 hero sub-line (clear)**: A hidden charge is a wrong rate or a changed setting. Ohm found none.
- **S07b hero headline (plural form for 2 or more)**: 1 thing to look at  /  2 things to look at
- **S07b hero sub-line**: 5 of 6 checks are clear. You can still pay now and keep the ₹32,971 discount.
- **S07 group 1 label**: Is the maths right?
- **S07 group 1 helper**: Redone with the rates the state regulator approved.
- **S07 group 2 label**: Did anything change?
- **S07 group 2 helper**: Compared with your first bill. If one changes, we tell you.
- **S07 group 2 link button**: See the details we compare against
- **S07 check 1 title**: Charges add up
- **S07 check 1 header link button**: Breakdown
- **S07 check 1 sentence**: Redone for electricity, fuel adjustment, wires and booked capacity. All four match.
- **S07 check 1 receipt rows (label | value)**: Units used | 3,26,500   ·   Approved rate per unit | × ₹6.90   ·   Electricity used | ₹22,52,850
- **S07 check 2 title**: Discount worked out right
- **S07 check 2 sentence**: Worked out on your bill before taxes. You get it if you pay by Tue 8 Sep.
- **S07 check 2 receipt rows (result row in success)**: Bill before taxes | ₹32,97,130   ·   Early-payment discount | × 1%   ·   You save | ₹32,971
- **S07 check 3 title**: Contract demand unchanged
- **S07 check 3 sentence**: The most power you agreed to draw at once. A change would change your bill.
- **S07 check 3 bar labels**: First bill | 700 kVA   ·   This bill | 700 kVA
- **S07 check 4 title**: Category fits your business
- **S07 check 4 sentence**: Your rate plan sets the rates on your bill, so it has to fit your business.
- **S07 check 4 visual (caption | value)**: Your business | Hotel   ·   Your rate plan (high voltage) | HT Commercial
- **S07 check 5 title**: Meter multiplier unchanged
- **S07 check 5 sentence**: Your meter count is multiplied by a fixed number to get the units you pay for.
- **S07 check 5 chain (value / caption)**: Meter count / on your meter   ×  2,000   3,26,500 / units billed
- **S07 check 6 title**: No penalties
- **S07 check 6 sentence**: Ohm checked the two things that can bring a penalty.
- **S07 check 6 row A (label | value, caption)**: Highest use (peak demand) | 664 kVA   ·   caption: 36 kVA to spare, under the 700 kVA you agreed.
- **S07 check 6 row B (label | value, captions)**: Power factor | 0.998   ·   captions: How efficiently you use power  /  1 is best
- **S07 check 6 stake (amount in success)**: ₹0 | in penalties on this bill.
- **S07 bottom Item title**: See how Ohm read this bill
- **S07 bottom Item description**: Every step, from finding your bill to these checks
- **S07b check 3 title (Look)**: Contract demand changed
- **S07b check 3 sentence**: Higher than your first bill, and you have not asked for a change.
- **S07b check 3 bar labels**: First bill | 700 kVA   ·   This bill | 900 kVA
- **S07b check 3 stake (amount in warning)**: ₹4,620 | more this month. ₹55,440 a year if it repeats.
- **S07b check 3 button (Secondary, Rounded, 44)**: Copy details for Northgrid
- **S07 state D check 2 sentence and result row (paid)**: Worked out on your bill before taxes. You paid before Tue 8 Sep.  /  You saved | ₹32,971
- **S07 state B and C check 2 sentence and result row (discount ended)**: Worked out on your bill before taxes. The discount ended on Tue 8 Sep.  /  Discount, ended Tue 8 Sep | ₹32,971 (ink-muted)
- **S07b sub-line, state B**: 5 of 6 checks are clear. Pay by Wed 16 Sep to avoid paying ₹45,530 more.
- **S07b sub-line, state C**: 5 of 6 checks are clear. This bill is now past its due date.
- **S07b sub-line, state D**: 5 of 6 checks are clear. Your payment is made.
- **S08 app bar title**: Where the money goes
- **S08 row 1**: Electricity used | ₹22,52,850 | 62% | 3,26,500 units × ₹6.90 per unit
- **S08 row 2**: Fuel adjustment (i) | ₹3,91,800 | 11% | 3,26,500 units × ₹1.20 per unit
- **S08 row 3**: Wires (i) | ₹3,59,150 | 10% | 3,26,500 units × ₹1.10 per unit
- **S08 row 4**: Booked capacity (i) | ₹2,78,880 | 8% | Highest use 664 kVA × ₹420 per kVA
- **S08 row 5 (Time of day, split always open)**: Time of day | ₹14,450 | 0.4% | Evenings add most, nights take off
- **S08 Time of day slots**: Mornings +₹22,800  ·  Evenings +₹60,200  ·  Nights −₹68,550 (success)
- **S08 Time of day caption**: Bars to the right add to your bill. Bars to the left take off.
- **S08 subtotal band**: Before taxes | ₹32,97,130 | Sum of the five parts above
- **S08 row 7 (Taxes, split always open)**: Taxes | ₹3,45,039 | 9% | State duty plus sales tax
- **S08 Taxes split, line 1**: State electricity duty | ₹2,47,285 | 7.5% of ₹32,97,130 (Before taxes)
- **S08 Taxes split, line 2**: Sales tax | ₹97,754 | Charged per unit, on 3,26,500 units
- **S08 row 8 (no bar, no share, muted)**: Last month's balance | ₹0 | ₹2,140 carried over and cleared, so it adds nothing.
- **S08 popover, Fuel adjustment**: An extra charge for changes in the cost of the fuel that makes your power.
- **S08 popover, Wires**: Fee for carrying power to you through Northgrid's network.
- **S08 popover, Booked capacity**: Charged on your highest use this month, not on the 700 kVA you agreed.
- **S08 total label**: Bill total
- **S08 total amount**: ₹36,42,160
- **S08 total small print**: Rounded by Northgrid.
- **S08 note 1 text and link button**: Ohm checked this bill before showing it to you.  /  What Ohm checked
- **S08b note 1 text (flagged)**: Ohm found 1 thing to look at.
- **S08 note 2 (only 'save ₹32,971' in success, Medium)**: Pay by Tue 8 Sep and save ₹32,971
- **S08 note 2, state D**: Paid Thu 3 Sep, 11:42 AM
- **S08b alert title**: Contract demand changed
- **S08b alert description**: This bill says 900 kVA, not the 700 kVA on your first bill. It costs ₹4,620 more this month.
- **S08b alert link button**: See the check
- **Pay footer primary (S07, S07b, S08, S08b, S08c)**: Pay ₹36,09,190
- **Pay footer secondary**: Share with owner
- **Pay footer, state D (single Outline button)**: View payment
- **Home bill card eyebrow-row link (handoff, one name everywhere)**: Breakdown
- **S06 breakdown card header title and link (handoff)**: Where the money goes  /  Breakdown
- **Error alert (read failed)**: We could not load this bill's checks.  /  Try again
- **Accessible names**: Back; Breakdown, opens Where the money goes (aria-label on every Breakdown link); What is Fuel adjustment? (info button); Contract demand unchanged, clear; Contract demand changed, needs a look; Bill total ₹36,42,160

## Illustrations

### Check tile (shared surface, one grey level)
- Concept: The S04 language at card scale, flattened: a soft grey tile like the page behind the bill, with the one line that was checked picked out by a pale blue focus box (the same idea as S04's focus box on the bill) and a round badge on the corner only when something needs a look. Skeleton lines are NOT used inside the tiles: next to real numbers they read as loading, and they added height. They live in the hero illustration, where the lead loves them.
- Construction: Frame 329 wide, hug height, radius 12, fill surface-muted, padding 12, vertical, clip off. Inside it only text, bars, icons and one focus row. Focus row = a rect behind the key line, radius 8, extending 4 px up and down and 8 px left and right into the tile padding (no height change), fill primary-subtle (success-subtle for the discount saving). Round badge (Look only): 20 circle, fill warning-subtle #FFF7D6, Lucide triangle-alert 12 in warning, at the tile's top right corner offset (-6, -6), the same overlap as the S04 badge. Look state tile fill is white because the card is warning-subtle.
- Hover: Badge pops (scale 0.6 to 1, 200 ms soft spring) after the bars land; Reduce Motion: fades in. No hover on touch; on desktop only the cursor changes if the visual is a link.
### Check visual / Receipt (checks 1 and 2)
- Concept: A worked example laid out like a till receipt: what you used, what it was multiplied by, what it came to. A finance reader recognises it at once, and unlike a row of chips it fits any width.
- Construction: Check tile (101 tall). Three rows of 20: label Text-sm/Regular ink-muted left (fill, may wrap), value Text-sm/Medium ink tnum right (shrink-0). Rows 1 and 2 have a 4 gap. A 1 px line #DCDFE4 divider with 6 above and 6 below (13). Result row 20: label Text-sm/Medium ink, value Text-sm/Semi Bold ink-strong tnum, with the focus row behind it. Check 1: Units used 3,26,500 / Approved rate per unit × ₹6.90 / Electricity used ₹22,52,850. Check 2: Bill before taxes ₹32,97,130 / Early-payment discount × 1% / You save ₹32,971 (result value and focus row in success). Widest label is 'Early-payment discount' at about 158 px next to a 56 px value, 214 of 305.
- Hover: Rows fade and rise 4 px in sequence (80 ms apart, 200 ms ease out); the result row highlight draws in last. Reduce Motion: static.
### Check visual / Compare bars (check 3, Clear and Look)
- Concept: Two bars on the same scale, 'First bill' above 'This bill'. Equal bars mean nothing changed; a longer bar is visible at a glance and needs no explanation.
- Construction: Check tile (100 tall). Two blocks with 12 between. Each: label row 20 (label Text-sm/Regular ink-muted left, value Text-sm/Semi Bold ink-strong tnum right), 4 gap, bar 305 x 8, radius 4, track white. Clear: scale 0 to 700 kVA, both bars full width (305), first bill fill ink-muted, this bill fill primary. No tick, no caption (the card title and the group helper already say 'unchanged' and 'first bill'). Look (S07b): scale 0 to 900 kVA, first bill 237.2 px ink-muted, this bill 305 px warning, tile fill white, round warning badge on the tile corner, no bracket and no '+200' label (to avoid inviting 200 x ₹420).
- Hover: Bars grow left to right (400 ms ease out), the second 80 ms later. Reduce Motion: static.
### Check visual / Business and plan (check 4)
- Concept: Your business and the rate plan you are billed on, joined by a thin link, so 'category fits' means two matching things and not a tariff lecture.
- Construction: Check tile (108 tall). Two rows of 36 with 12 between. Each: 32 circle fill primary-subtle with a Lucide icon 16 in primary (building for 'Your business', file-check for 'Your rate plan (high voltage)'), 8 gap, text column: caption Text-xs/Regular ink-muted (16), value Text-sm/Semi Bold ink-strong (20). A 1 x 12 line #DCDFE4 connects the two circles at their centre x. Values: Hotel; HT Commercial. If the business did not fit, the connector breaks, a warning badge appears and the card goes to Look.
- Hover: Rows slide 8 px in (200 ms), then the connector draws downward (200 ms). Reduce Motion: static.
### Check visual / Meter chain (check 5)
- Concept: Meter count, times the fixed multiplier, gives the units you pay for. It shows what 'multiplier' does without printing a derived meter count and without a blank placeholder.
- Construction: No outer tile: three elements directly on the white card, vertically centred, 8 gap, 44 tall. Chip A: surface-muted, radius 10, padding 8 10, value 'Meter count' Text-sm/Semi Bold ink-strong, caption 'on your meter' Text-xs/Regular ink-muted (about 100 wide). Operator column (about 58 wide): '× 2,000' Text-sm/Semi Bold ink-strong, below it a 1 px line #DCDFE4 ending in Lucide arrow-right 14 ink-muted. Chip B: primary-subtle fill, radius 10, padding 8 10, value '3,26,500' Text-sm/Semi Bold tnum, caption 'units billed' (about 96 wide). Total about 270 of 329, so it also fits at 296; below 340 px viewport it stacks vertically (chip, arrow down with × 2,000, chip).
- Hover: Chip A, arrow and chip B fade and rise in order (80 ms apart); the arrow draws left to right (200 ms). Reduce Motion: static.
### Check visual / Headroom and power factor (check 6)
- Concept: Two different questions drawn in two different ways so they cannot be misread as the same gauge: how much room you left under what you agreed (a bar with the spare part drawn dashed), and where your power factor sits on its scale (a marker, not a fill, because a 0.998 fill would look 'almost full' like a danger).
- Construction: Check tile (146 tall), two blocks with 12 between. BLOCK A (52): label row 20 'Highest use (peak demand)' Text-sm/Regular ink-muted left, '664 kVA' Text-sm/Semi Bold ink-strong tnum right; 4 gap; bar 305 x 8, radius 4, scale 0 to 700 kVA, filled part primary 289.3 px, spare part 15.7 px as a dashed 1 px outline in line colour, no fill; 4 gap; caption Text-xs/Regular ink-muted '36 kVA to spare, under the 700 kVA you agreed.' (700 minus 664 = 36). BLOCK B (58): label row 20 'Power factor' left, '0.998' right; 4 gap; scale row 14: a 305 x 4 track in line colour, radius 2, with a 14 circle marker in primary (white 2 px ring) at x 298 (0.998 x 305 = 304.4, clamped so the marker stays inside); 4 gap; caption row 16, Text-xs/Regular ink-muted: 'How efficiently you use power' left and '1 is best' right. No penalty threshold is drawn because none is in the data; if the data owner supplies one, add a tick on the track. Stake row below the tile: ₹0 in success, 'in penalties on this bill.'
- Hover: The bar fills (500 ms ease out), the marker slides from the left end to 0.998 (700 ms) while the value counts up from 0.000. Reduce Motion: final state with a 150 ms fade.
### Illustration / Bill, Compact, Focus=Checks, Status=Done or Flagged (S07 hero, reused from S04)
- Concept: The lead's S04 bill page cropped to the block where the contract demand, category, multiplier, peak and power factor are printed, inside a focus box with the round badge. It tells Neha the checks ran on her actual bill. It is the one place the skeleton-line language appears on this page.
- Construction: Reuse the S04 component set 'Illustration / Bill' exactly (Size=Compact, 240 x 128 crop at 100%, Focus=Checks region 6, 42, 188, 82). Status=Done: success focus stroke and 6% fill, 36 badge at (194, 84), Lucide check 18 stroke 2.5 on success-subtle. Status=Flagged: warning tones, triangle-alert. Placed at x 76, y 126, never scaled. The Hero size with Focus=None (240 x 290) shows the whole bill but would add 162 px, so it is not used here.
- Hover: On entering S07 the focus box draws its outline in (300 ms) and the badge crossfades from the Reading spinner to Done (200 ms, icon scale 0.6 to 1). No scan line (reading is finished). Reduce Motion: static.
### Share bar (S08 rows)
- Concept: A thin single-colour bar under each part showing its share of the whole bill. One hue avoids a rainbow legend and keeps rupees (right) and proportion (bar) apart. Kept together with the % because they do different jobs: the % is the exact figure, the bar is for people who do not read numbers.
- Construction: Frame 329 x 6, radius 3, track primary-subtle, inner rect primary, width = part / ₹36,42,169 x 329: Electricity used 203.5, Fuel adjustment 35.4, Wires 32.4, Booked capacity 25.2, Time of day 2 (true 1.3), Taxes 31.2; no bar on the ₹0 balance row or the subtotal band. The track is 100 percent of the bill, not the largest part, so lengths are honest. aria-hidden; the amount and % carry the meaning. Build with shadcn Progress anatomy.
- Hover: Grows from 0 on first view (400 ms ease out, 40 ms stagger per row). No hover. Reduce Motion: static.
### Time of day diverging bars (S08, always open)
- Concept: Some slots add to the bill and some take off, which is the only confusing thing about this part. A centred axis makes plus and minus visible: right adds, left takes off. Green appears only on the take-off, where it means 'saves you money'.
- Construction: Three slot rows in the always-open split block (2 px left rule, 12 left padding, inner 315). Each bar 315 x 8, track surface-muted radius 4, 1 px axis in ink-muted at x 157.5 (12 tall). Scale 157 px = ₹68,550. Mornings +₹22,800: primary 52.2 px to the right. Evenings +₹60,200: primary 137.9 px to the right. Nights −₹68,550: success 157 px to the left, amount in success. Caption Text-sm/Regular ink-muted. No sum pill: the signs already add to ₹14,450 (22,800 + 60,200 − 68,550) and the row amount above is that sum. The Taxes split uses the same left rule and sub-lines without bars.
- Hover: Bars grow outward from the axis on first view (350 ms ease out, 60 ms stagger). Reduce Motion: static.

## New screens

### S07b Checks, 1 thing to look at
- Purpose: The failed-check version of the checks page, so S07 never claims 'No hidden charges or penalties' when contract demand is 900 kVA against 700 kVA. Reached from S13's strip (handoff) and from the S08b alert. It shows the same facts as S13 (₹4,620 more this month, ₹55,440 a year), keeps the discount message, and does not adopt the unrequested 900 kVA as a 'booked' figure.
- Layout: Clone of S07 under it (parent bottom plus 160). Hug about 2,399. Hero Compact/Checks/Flagged, headline '1 thing to look at', sub-line '5 of 6 checks are clear. You can still pay now and keep the ₹32,971 discount.' (3 lines, +24). Card 3 State=Look (320 tall, y 1,092 to 1,412): warning-subtle fill, triangle-alert, title 'Contract demand changed' in warning, 2-line sentence without numbers, white compare-bars tile on a 0 to 900 kVA scale (700 kVA bar 237.2 px ink-muted, 900 kVA bar 305 px warning, round warning badge on the tile corner, no bracket), stake ₹4,620 in warning with '₹55,440 a year if it repeats', Secondary pill 'Copy details for Northgrid'. Card 6 and everything else, including the Pay footer, unchanged.
### S08b Breakdown, 1 thing to look at
- Purpose: The failed-check state of the breakdown, so S08 does not sit under a green reassurance while contract demand is wrong. Replaces the earlier 'all splits open' frame, which is no longer needed because the default S08 already shows every split open.
- Layout: Clone of S08 under it (parent bottom plus 160). Hug about 1,633. Alert (warning-subtle, 156 tall) above the table card with 'Contract demand changed', the 900 vs 700 kVA sentence, '₹4,620 more this month' and the link 'See the check' (to S07b). Table rows unchanged (no row is marked because the data does not say which part carries the extra). Note 1 switches to a warning triangle-alert and 'Ohm found 1 thing to look at.' Footer unchanged.
### S08c Breakdown, part meaning popover
- Purpose: Shows what the (i) buttons open, because jargon meanings (Fuel adjustment, Wires, Booked capacity) no longer live in permanent subtexts.
- Layout: Clone of S08 with the Popover open under the (i) after Fuel adjustment (x 16, y 257 to 341, width 260, 3 lines, white, radius 12, padding 12, shadow y 4 blur 16 ink-strong 12%, no dim layer). The Wires and Booked capacity sentences are shown as popover variants beside the frame (not separate frames). Hug about 1,465.

## Interactions

- Home: tap 'Breakdown' in the bill card eyebrow row (approval item, see handoffs) -> Push to S08 (push left, 300 ms, ease out). Back returns to Home.
- S06: tap anywhere on the 'Where the money goes' card (header link 'Breakdown' is the single anchor, stretched over the card) -> Push to S08. Back returns to S06. Pressed fill surface-muted. The S06 hero sub-line has no link.
- S07: tap 'Breakdown' in the Charges add up card header -> Replace S07 with S08 (router.replace, no history entry), so Back from S08 goes to where the user came from (Home, S06 or S13), never back into an S07 and S08 loop.
- S08: tap 'What Ohm checked' in Note 1 -> Replace S08 with S07 (clear), or S07b when a check is failing. Same no-history rule.
- Home reassurance footer row, or S06 reassurance row ('No hidden charges or penalties') -> Push to S07 (clear). If a check failed, those rows say '1 thing to look at' and open S13, and S13's strip opens S07b.
- S08b: tap 'See the check' in the Alert -> Replace with S07b.
- S07: tap 'See the details we compare against' -> Open the read-only 'Your connection' Drawer from the bottom, 300 ms. Close returns to S07 at the same scroll position.
- S07: tap the 'See how Ohm read this bill' Item -> Push to S04r (push left, 300 ms). Back returns to S07.
- S07 or S08: tap Back (ghost icon button, 44 x 44 hit area) -> Navigate back to the previous screen in history.
- S07, S07b, S08, S08b, S08c: tap 'Pay ₹36,09,190' -> Push to S10 Pay. In state D the footer is 'View payment' and pushes to S11.
- S07, S07b, S08, S08b, S08c: tap 'Share with owner' -> Push to S09 Share.
- S07b: tap 'Copy details for Northgrid' -> Same behaviour as S13: copies the details text, shows the toast, button label unchanged.
- S08: tap the (i) after Fuel adjustment, Wires or Booked capacity (44 x 44 hit area) -> Opens a shadcn Popover (S08c) with one plain sentence. Tap outside, press Escape or tap the icon again to close. One popover at a time. The row itself is not tappable. There are no accordions, no Expand all, and no other tappable rows on S08.
- First view of S08 and of each S07 visual -> Share bars grow from 0 (400 ms ease out, 40 ms stagger per row); Time of day bars grow outward from the axis (350 ms, 60 ms stagger); S07 compare bars and the headroom bar grow left to right (400 ms); the power factor marker slides in (500 ms); the round badge in Look states pops (scale 0.6 to 1, 200 ms). Runs once per visit. With Reduce Motion everything is drawn at final size with one 150 ms fade.
- Hover or press on a link or button (mouse or touch) -> Link buttons: underline. Primary and Outline buttons: kit hover state. The stretched S06 card: surface-muted fill while pressed. No custom scale, no haptics.
- Date, payment or check-result changes -> Only text and state change, following the DATE AND PAYMENT STATES table. S07 never says 'No hidden charges or penalties' while a check is failed: it switches to S07b ('N things to look at' when more than one). S08 is the same after payment except Note 2 and the footer.

## Research

- Credit Karma https://mobbin.com/screens/f219b700-6dda-470f-acba-1f5be7c431c9: Each credit factor is its own card with a plain headline and an impact tag, so every card answers 'how does this affect me'. Model for the one plain sentence per check card and for showing a stake only where a real impact exists (we dropped the stake from checks with none).
- Chime (Security Center) https://mobbin.com/screens/11d18401-3658-454a-8275-b1352bc0d139: A big verdict on top, then green-tick check rows underneath. Supports leading S07 with the verdict ('No hidden charges or penalties') and the S04 illustration before listing the proof.
- YNAB (Spending Breakdown) https://mobbin.com/screens/8d4d0215-caa1-4c47-81df-81e7f3b7639c: Category rows with name left, amount right, a share under the name and a single-hue bar. This is the S08 row: one colour, honest proportion, no legend.
- Singapore Airlines (Cost Breakdown) https://mobbin.com/screens/b553a2b4-0eac-4f4f-a20e-7bd597759d44: A bold 'Airport / government taxes' line with its components indented below with their own amounts, then a large grand total. Hierarchy for S08: Taxes with indented duty and sales tax, a Before taxes subtotal, and a total that leads with the final amount.
- Careem (Payment summary) https://mobbin.com/screens/804c1fc1-e613-465c-9b66-2bde5acc584a: Jargon lines ('Service fee', 'Delivery fee') carry a small (i) icon instead of a permanent subtext, and the total is the bold last row. Direct precedent for the (i) popovers on Fuel adjustment, Wires and Booked capacity only.
- Taco Bell https://mobbin.com/screens/2180bc4a-c7c7-443f-a6a5-641d6745a0a9: A rounding line is one small muted row near a larger Total. Supports 'Rounded by Northgrid.' in 12 px muted text under a large final amount.
- Coverage note (no new searches this revision) : This pass ran no Mobbin searches; the 6 citations above are carried from pass 1, which used 5 searches (one over the 2 to 4 brief, so it is capped here at 6 citations). Indian fintech coverage is still CRED only (the CRED hidden-charges explainer from round 1 is the source of the hero definition); no PhonePe, Paytm, Jupiter or Groww breakdown or checks screens surfaced.

## Code notes
FIGMA BUILD
- Figma was not touched in this revision (read-only task). Rebuild in place: S07 9:7654, S08 9:7679. New frames: S07b, S08b, S08c. The earlier 'S08b all splits open' is dropped: the default S08 is the all-open view.
- New local components on page Foundations in a Section 'Components · Checks and breakdown': App bar, Pay footer (shared; reuse S06's), Check card (State Clear|Look; slots Visual, Stake, Action), Stake row, Group header, Check tile with visuals (Receipt, Compare bars Clear|Look, Business and plan, Meter chain, Headroom and power factor), Bill part row (Type Plain|Split|Subtotal, Info None|Popover; there is no Open property), Split block (Taxes|Time of day), Share bar, Diverging bar, Info popover, Link button (shadcn Button Link plus Lucide chevron-right 14), Alert (shadcn, warning).
- Icons (Lucide, look up keys read-only): chevron-left, chevron-right, circle-check, triangle-alert (alert-triangle in some kits), arrow-right, info, file-search, file-check (key 48ae67298c4f0389600f687ea16040ace47abf60), building (key 904d1e4a0ea4083f23c797644c711362cea2b1ce), copy. If one is missing use the closest and note it.
- Buttons stay consistent: Default pill 50 'Pay ₹36,09,190'; Outline pill 44 'Share with owner' and 'View payment'; Secondary pill 44 'Copy details for Northgrid' (S07b and S13 must match); Link size sm for every 'Breakdown', 'What Ohm checked', 'See the check' and 'See the details we compare against'; Icon Button Ghost 40 inside a 44 hit frame for Back.
- Height: every frame vertical auto layout, primary axis HUG, clip OFF. Build content first, footer last, home indicator absolute at height minus 34 with bottom constraint. Quoted heights are arithmetic from the component specs (S07 2,267; S07b 2,399; S08 1,465; S08b 1,633; S08c 1,465); measure after build.
- Text styles from the library only. The old uppercase 'FOR YOUR BILL' style is deleted, so no new style is needed. Mixed-colour span only in S08 Note 2: separate text layers. Glyph rule decided app-wide: × (U+00D7) for maths, − (U+2212) for signed amounts, prose keeps the word 'minus'; S04 changes x to × (handoff).

SHADCN / WEB BUILD
- App bar: div h-14 sticky top-0 with Button variant ghost size icon (h-11 w-11, rounded-full, ChevronLeft) and h1. Pay footer: div sticky bottom-0 bg-card border-t p-4 with two Buttons (rounded-full, h-12 default, h-11 outline) and pb-[env(safe-area-inset-bottom)]. Page bottom padding equals the footer height so nothing hides behind it.
- S07: section per group (Penalties card has no header); Card (border-0, rounded-2xl) per check; tiles are plain flex/grid divs with @container so the meter chain can stack; no Badge component. Bars are divs with percentage widths computed from data, never hard-coded px (the px in this spec are for the 329, 315 and 305 widths in Figma). Power factor marker is an absolutely positioned dot on a track, no SVG needed.
- S08: NO Accordion. Build as a semantic table or description list: rows are plain elements on one grid so amounts align; the two split blocks are always rendered (nested list with a border-l-2). Share bars use shadcn Progress (h-1.5, track primary-subtle, indicator primary), aria-hidden. Info buttons use Popover with a 44 px hit area, one open at a time, aria-label 'What is Fuel adjustment?'. Amounts use font-variant-numeric: tabular-nums.
- Entry points: one anchor per target. S06 card = stretched link from the header 'Breakdown' link (::after inset-0), no links nested inside the card. Cross-links between S07 and S08 use router.replace.
- Accessibility: every tick or warning icon has a text equivalent ('Clear' or 'Needs a look'); bars aria-hidden with the numbers carrying meaning; focus ring primary on all buttons; 44 px minimum targets; Reduce Motion removes bar growth and marker sweep; Look cards also differ by icon and title wording, not only colour; the diverging bar sign is in the text (+ and −), not only colour.

DERIVED VALUES (checked by arithmetic)
- ₹32,97,130 = 22,52,850 + 3,91,800 + 3,59,150 + 2,78,880 + 14,450. 1% of it is ₹32,971.3, shown ₹32,971. 7.5% is ₹2,47,284.75, shown ₹2,47,285. ₹2,47,285 + ₹97,754 = ₹3,45,039. Parts sum 32,97,130 + 3,45,039 + 0 = ₹36,42,169 (bill shows ₹36,42,160, not printed on these screens).
- The four meter-based charges all check: 3,26,500 x 6.90 = 22,52,850; x 1.20 = 3,91,800; x 1.10 = 3,59,150; 664 x 420 = 2,78,880. Sales tax does NOT (30 paise x 3,26,500 = ₹97,950 vs ₹97,754), which is why check 1 names four charges only.
- Time of day: 22,800 + 60,200 − 68,550 = ₹14,450. Bar widths on a 315 track with 157 px = ₹68,550: 52.2, 137.9, 157.
- Share bar widths on 329 from ₹36,42,169: 203.5, 35.4, 32.4, 25.2, 31.2, 1.3 (drawn 2). Data's rounded shares 62, 11, 10, 9, 8, 0.4 are displayed; no sum of percentages is ever shown.
- Headroom 700 − 664 = 36 kVA (15.7 of 305 px). Power factor marker 0.998 x 305 = 304.4. Look scale 700 / 900 x 305 = 237.2. ₹55,440 = 4,620 x 12. ₹45,530 = 36,87,690 − 36,42,160.
- Pay amount: 36,42,160 − 32,971 = 36,09,189, but the footer says ₹36,09,190 (₹1 gap, data question).

DATA RULES KEPT
- July figures never appear. The 30 paise sales tax rate and the meter count 163.25 are never printed. The ₹36,87,690 late amount does not appear on S07 or S08 (only the footer, via S06's rule, and the derived ₹45,530 in state B). Percentages are never summed. No stake is printed unless it is real (₹32,971, ₹0, ₹4,620, ₹55,440).

CRITIQUE RESOLUTION (issue numbers follow the critique order)
1 False 'all 7 parts' claim: tick strip and 'every line' removed; check 1 names the four charges that reconcile; Taxes unticked; data fix listed as an open question. 2 'Booked' contradiction: Contract demand (700) vs Highest use (664) everywhere, popover says charged on highest use, S07b no longer says 'booked 900', bracket removed, S04 handoff. 3 Stake line: label deleted, stakes only on discount, penalties and the failed check; ₹30,038 and ₹36,42,160 stakes deleted. 4 Repetition: facts-once rule per card, helpers carry the 'how' once, card 6 has no header, one tick per card, intro line and sum pills deleted. 5 Overflow: receipt rows, bars and a chain that fits at 270 of 329 with a stack rule; every string measured with an Inter width estimate (sentences 2 lines, 14 px; hero sub-line 2 lines; S07b sub-line allowed 3). 6 Peak vs power factor: headroom bar with 36 kVA spare vs a marker on a scale; no blank skeleton. 7 Before taxes: subtotal band added and rows reordered. 8 Dropdowns: removed entirely, always-open default, Expand all deleted, informative Time of day line, per-unit maths pattern consistent. 9 Failed scenario: S08b with alert and neutral Note 1 swap, Copy button now Secondary, handoffs listed as required. 10 Entry points: one name 'Breakdown', S06 single stretched anchor, S06 hero link removed, Home link flagged for approval, replace navigation. 11 Total: ₹36,42,169 removed, 'Rounded by Northgrid.', ₹1 gap raised. 12 States: table A to D plus loading and error. 13 Jargon: glosses at first use (most power at once, peak demand, power factor, multiplier, high voltage), balance row in S04's words, 'changes every month' removed, hero crop reason given. 14 Length and focus: 2,700 to 2,267, one grey level, green reserved. 15 Accessibility: 44 hit areas, no div-in-button (no accordion), uppercase style removed, captions 14 px. 16 Process: 6 citations, Mobbin notice moved out of the spec into the notice at the end of open_questions, glyph convention decided.

## Open questions

- BLOCKER, sales tax data: 30 paise x 3,26,500 = ₹97,950 but the bill says ₹97,754 (₹196 less). A true 'Charges add up' check would flag it, so check 1 now claims only electricity, fuel adjustment, wires and booked capacity, and Taxes carries no tick. Should the demo data be corrected (and Taxes, the parts sum and the 9% share with it, after which check 1 can say 'every line' again), or should the narrower claim stay?
- Check 1 scope also leaves state duty out of the claim even though 7.5% of ₹32,97,130 = ₹2,47,284.75 does reconcile. Add duty to the sentence (electricity, fuel adjustment, wires, booked capacity and state duty), or keep four for simplicity?
- S04 must follow: row 4 order (Charges, Discount, Contract demand, Category, Multiplier, No penalties), the narrowed row 4 detail 1 text, 'You agreed 700 kVA' instead of 'You booked 700 kVA', '1 is best' instead of 'Close to 1 means no penalty', and × instead of x. Confirm with the S04 owner before S07 is built.
- Home link (I disagree with the critique's default of leaving Home alone): I kept a right-aligned 'Breakdown' link on the eyebrow row because the brief asks for an entry from Home and the lead's complaint was 'I cannot see any entry'. It adds a fourth tap target to a card whose round 1 rule was one pill and one footer row, so it is an approval item. Fallback: remove it; Home reaches S08 in two taps via S06 and S07, and the S06 card and S07 check 1 still cover entry.
- Link name: 'Breakdown' (one word) is used everywhere because it is the only name that fits the Home eyebrow row (about 96 of 106 px); 'See the breakdown' would not. The page title stays 'Where the money goes'. Fine, or rename the page 'Breakdown'?
- Page length (partial disagreement): S07 is about 2,267 tall (was 2,700, about 2.7 screens); the critique target was 1,900. I stopped there because the lead asked for a visual per check and the six visuals alone are about 650 px. If still too long, fold checks 3 to 5 into one card with three rows (saves about 200) or drop the hero illustration to a 56 px badge.
- Hero crop (partial disagreement): kept Compact / Focus=Checks (4 of the 6 checks are read from that block). The whole-bill Hero / None / Done variant exists but is 290 tall and adds 162 px. Swap if the lead prefers the full bill.
- Share % and bar are both kept on every S08 row (the critique said not both). They carry different information: the exact figure for finance readers and the bar for non-technical ones, and the % is already in today's design. Drop the % on the five small rows if the table feels busy.
- Power factor has no penalty threshold in the data, so it is a marker on a scale with 'Best' on the right, not a gauge with a danger zone (the lead's brief suggested a gauge). Can the data owner supply the threshold so a tick can be drawn, and confirm that peak demand above the agreed 700 kVA is what triggers a penalty (the sentence avoids stating a rule)?
- Stakes are billing assumptions to confirm: (a) the HT Commercial plan sets the rates on the bill (check 4 sentence), (b) 'high voltage' is the right plain gloss for HT, (c) a change in contract demand 'would change your bill' (supported only by the S13 figures). The S07b ₹4,620 is not explained (it is 11 x ₹420, not 200 x ₹420), and no S08 row is marked in S08b because the data does not say which part carries it. Which part, and what is the billing-demand rule?
- Popover sentences for Fuel adjustment and Wires are generic definitions (the earlier 'changes every month' claim was removed as unsupported); the Booked capacity one says it is charged on highest use, not on the agreed 700 kVA, which raises 'why not 700?' Confirm all three wordings and whether non-technical testers open the (i) buttons; the fallback is a permanent 12 px muted second line under those three names (adds 16 px per row).
- Rounding: the small print is just 'Rounded by Northgrid.' and ₹36,42,169 is gone from S08 (the lead said she does not need to know). Finance reviewers who add the 7 parts will find ₹9 more than the total; if that causes questions, add the sum back in the small print. The rule is not stated (36,42,169 rounds down to 36,42,160 but nearest-₹10 would give 36,42,170). Separately: 36,42,160 − 32,971 = 36,09,189, not the ₹36,09,190 on the Pay button, a ₹1 gap visible whenever total, saving and button are on one screen (Note 2 bridges them); data owner to confirm.
- Footer: S07 and S08 carry the same two buttons as S06 (Pay ₹36,09,190, Share with owner), and 'View payment' once paid. Is a lighter footer (single Pay button) preferred on explainer pages?
- Always-open S08 is the default, so the lead's 'expanded variant' is S08 itself and there is no collapsed frame. If it feels long (1,465), the fallback is to collapse only Time of day behind a row tap and add a collapsed S08 variant.
- Copy details button: S07b uses Secondary (grey fill) so it cannot be mistaken for the footer's Outline 'Share with owner'. S13 currently uses Outline for the same action; S13 must change to Secondary, or the lead picks Outline for both. S07b is also reached only if S13's strip links to it (required handoff).
- Notice relayed from Mobbin (not a design question; for the user, as its own block): 'Your Mobbin AI usage is high this month. Usage is unlimited during beta. If your usage stays at this level, you may need to purchase more credits once limits take effect.' View usage and plan options: https://mobbin.com/settings/billing-and-usage