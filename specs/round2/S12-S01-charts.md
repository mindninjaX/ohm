# S12-S01-charts

## Summary

ONE bar chart system for S12 and Home, rebuilt around the critique. (1) Congestion: 13 zero-based bars, 22.2px slots, single-letter month labels plus a year row, and the SELECTED month is spelled out as a 3-letter primary pill (so A, J, M repeats are resolved on demand); 2026 and 2025 tabs use wide bars with 3-letter labels. (2) One highlight rule, now honest on contrast: selected bar primary #265CFF (5.18:1), all other bars a neutral blue-grey #8993A4 (3.10:1 on white, passes the 3:1 mark rule; validator: protan DE 20.7, normal DE 24.6). The old 2.16:1 tint is gone. Primary appears only on the selected bar and its pill, plus links. No ring markers, no hover blue, no dark comparison tip, no amber chip on Trends. (3) Tabs: 'All time' (13 months, both Augusts visible), '2026', '2025'; tabs exist only when they show 3 or more bars and are not duplicates, so 'Rupees 2025' and other dead ends cannot occur. (4) Metric switch: a two-trigger tab control with icon, label and one-line descriptor and NO numbers ('Units used / 1 unit is 1 kWh' and 'Bill amount / What Northgrid billed'), so it answers 'what is the Rupees tab' without repeating figures. (5) Rupees: one rule everywhere, bars only from 3 data points. With 2 rupee months Ohm shows a 'Months building up' card (readout, S04-style illustration, honest sentence, a 13-slot months meter '2 of 13') instead of a chart that is 85% empty; the rupee bar chart appears by itself with the 3rd bill. (6) Order is now contiguous by scope: metric toggle, range tabs, chart, Highs and lows, Every month, then 'How August compares' (the only unscoped section, last). (7) Comparisons are redesigned to be readable, not chrome: 'Compared with July' gets a swing strip (this month's change as a primary marker among the 11 earlier monthly changes as grey ticks on a Down 12% to Up 12% ruler, so 1.8% is visibly the smallest change of the year); 'Compared with last August' is a compact text block. No paired near-equal bars. (8) Repetition removed: the chip owns the percent, the comparison owns amounts and context, tiles own extremes; every number appears once per screen state (the Every month table is the intentional twin). (9) Home: compact 13-bar version of the same chart (88px plot), whole chart is ONE tap target to Trends (no per-bar navigation), bare icons only, chevron on 'See trends'. (10) Frame heights recomputed from the layout and listed in Part H (default 1,460; open table 2,064; 2026 open 1,844; 2025 1,476 and 1,728; Rupees 871).

## Layout

════ PART 0. REVISION MAP (critique issue to fix) ════
H1 Repetition: metric toggle holds no numbers; the change chip owns the percent; comparison owns amounts and context; pills, paired-bar labels, ring markers and the July number in Units comparison are gone. Each number once per screen state (Every month table is the deliberate twin and is closed by default).
H2 Rupees mostly empty: rule 'bars only with 3 or more data points, everywhere' (Home already had it). Rupees now uses the Months building up card (Part D). Range tabs hide when they would be empty or duplicates, so no S12.5 dead end.
H3 Colour noise: solid primary only on the selected bar and its letter pill. Selected metric trigger = primary-subtle fill with primary icon, no ring, no solid tile. Range tabs neutral. Readout tile removed (bare icon). Hover blue removed. Dark tip, ring markers, amber chip removed.
H4 Comparison visuals: swing strip for vs July, text block for vs last August (Part B7).
H5 Contrast: rest bars #8993A4 = 3.10:1 on white; Part A has the validator result and the stated reason; wrong 5.05:1 claim dropped (primary on primary-subtle is 4.50:1, so range tabs no longer use it).
M6 Chip overflow: chips shortened ('Highest', 'Lowest', 'Earliest month'), worst case 312 of 329, plus wrap fallback. Extremes use a peak or dip glyph, never an arrow, so arrows only mean direction.
M7 Scrub: touch selects on pointerup (tap) or after 8px horizontal drift; mouse selects on pointerdown; pressed colour removed.
M8 Scope: contiguous order (Part B). No scope label needed.
M9 Tab names: 'All time' (13 bars, honest), '2026', '2025'; footnote says 'usage table', not '12-month table'.
M10 Ambiguous letters: selected month shown as 3-letter pill; year row; readout names the month in full.
M11 Provenance: Rupees footnote 'From bills Ohm has read since July 2026'; kWh caption gated (open question 1).
M12 Heights recomputed (Part H). M13 Illustrations redrawn on a 112 canvas with 8px safe margin. M14 Buttons: Link for every inline switch, kit Icon Button for steppers, no Outline CTA needed.
Low: error and offline, large text, focus ring, chart 200px tall, Home single icon treatment, whole-chart tap.

════ PART A. SYSTEM RULES (S12 and Home share them) ════
FORM: single series, vertical bars, oldest left, newest right, ZERO baseline always. Dataviz form: 'emphasis' (highlight one, gray the rest). No dual axis, no dashed grid, no legend box (the card names the series). Bars exist only for months that have data, so there are no empty slots and selection can never land on nothing.
SCALE: units domain 0 to 4,00,000 on every tab (rule: next whole lakh above max x 1.08; 3,42,210 x 1.08 = 3,69,587 so 4 lakh). 1 lakh = 50px on S12, 22px on Home. Zero baseline means a 1.8% change is only about 3px on S12; the readout chip and the Compared with July block carry the exact change, and the caption says each bar shows how much, not how it changed.
COLOUR: selected = primary #265CFF (5.18:1 on white). Rest = chart/rest #8993A4 (3.10:1 on white, an ink-muted-family blue-grey, opaque). Grid and baseline = line #DCDFE4 1px solid. All text ink-muted #44546F or ink-strong #091E42; text never wears the bar colour. One new local paint style only: chart/rest. Selected-vs-rest is carried by hue (blue vs grey, DE 24.6 normal, 20.7 protan) plus the letter pill plus the readout, so it survives colour blindness and greyscale.
VALIDATOR (dataviz skill, mode light, surface #FFFFFF, run on '#265CFF,#8993A4'): lightness band PASS, CVD separation PASS (protan 20.7, tritan 11.6), normal-vision floor PASS (24.6), contrast vs surface PASS (3.10 and 5.18). Chroma floor FAILS by design: the rest colour is the de-emphasis gray, not a category hue. Rejected #93AEFF (2.16:1, WARN, relief required). Other contrasts: primary text on white 5.18; ink-strong on surface-muted 14.69; ink-muted on primary-subtle 6.4; primary on primary-subtle 4.50 (icons only, never small text).
BAR GEOMETRY: slot = min(plotWidth / n, 60); bar = min(round(slot x 0.62), 24); group right-aligned so the newest bar is at the right edge; top corners radius 4, bottom square; no border, no shadow. Bars never touch (gap at least 8px), so no surface-gap rule is needed.
MONTH LABELS: slot under 34 = single letter, xs 12/16 Medium ink-muted. Slot 34 or more = 3-letter month. SELECTED month = filled primary pill, 30 x 20 radius 10, white Semibold 3-letter name (always 3 letters, even on 13 bars; pill spans slot centre +/- 15, neighbour letters end 17.7 away, 2.7 clear). YEAR ROW: 1px #DCDFE4 bracket per calendar-year group (2px inset each end), year centred under it, xs 12/16 Medium ink-muted. Never two-line labels.
TABLE TWIN: the Every month accordion carries every value; the bars can be aria-hidden.
RULE FOR CONTROLS: Tabs (metric and range) are one visual family: white container radius 16, padding 4, triggers radius 12, Medium unselected / Semibold selected. Only the selected fill differs by rank (metric = primary-subtle, range = surface-muted).
RULE FOR ARROWS AND CHEVRONS: arrow-up, arrow-down, equal = direction of change only. Peak and dip glyphs (custom) = Highest and Lowest. Link buttons with a chevron-right navigate to another screen or tab; Link buttons without a chevron change something on the same page.
RULE FOR NUMBERS: chip = percent change from previous month; comparison = amounts and context; tiles = extremes; readout = selected value. Each once.

════ PART B. S12 TRENDS, DEFAULT (Units, All time, Aug 2026 selected) ════
FRAME 393 x 1,460 (hug content). Fill surface-muted #F1F2F4. Fixed layers: status bar (device context), web bottom nav pinned with safe area (owned by the global nav track), home indicator (device context). Content bottom inset 104. Gutter 16, cards 361 wide, white, radius 16, borderless. No iOS large title: the heading is plain content.
ORDER (contiguous by scope): 1 title, 2 metric toggle (scopes the page), 3 range tabs (scope 4 to 6), 4 chart card, 5 Highs and lows, 6 Every month, 7 How August compares (not range scoped, last).

1. TITLE y 76 to 112: 'Trends', 3xl 30/36 Semibold ink-strong. No sub line.

2. METRIC TOGGLE y 124 to 196 (72). shadcn Tabs list, white, radius 16, padding 4, two triggers 176.5 x 64, radius 12, padding 12, vertical stack gap 4. Row 1 (20): Lucide icon 20 (zap for Units, indian-rupee for Bill amount) + gap 8 + label sm 14/20. Row 2 (16): descriptor xs 12/16 Regular ink-muted, left aligned under the icon. No numbers.
 - Trigger 1: zap, 'Units used', '1 unit is 1 kWh'.
 - Trigger 2: indian-rupee, 'Bill amount', 'What Northgrid billed'.
 - SELECTED: fill primary-subtle #E9EFFF, icon primary #265CFF, label ink-strong Semibold. UNSELECTED: transparent, icon and label ink-muted, label Medium. No ring, no solid tile. Focus-visible: 2px primary ring offset 2.

3. RANGE TABS y 208 to 256 (48). shadcn Tabs list, white, radius 16, padding 4, triggers 117.7 x 40 radius 12. Labels 'All time' | '2026' | '2025'. Selected: fill surface-muted #F1F2F4, ink-strong Semibold sm. Unselected: ink-muted Medium. Rules: a tab exists only if it shows 3 or more bars for the active metric and is not the same set of bars as another tab. Calendar-year tabs newest first. When Ohm stores more than 13 months the first tab becomes 'Last 12 months' and 'All time' follows it; more than 4 tabs scroll horizontally inside the list. Why 'All time': 13 months exist, so 'Last 12 months' would hide Aug 2025 and lose Aug vs last Aug; 'All time' is exactly what the bill's table holds.

4. CHART CARD y 268 to 720 (452). Padding 16, inner x 32 to 345... (329 wide, x 32 to 361).
 a. READOUT y 284 to 332 (48). Left stack at x 32. Label row (16): Lucide zap 14 ink-muted + gap 6 + 'Units used in August 2026' xs 12/16 Medium ink-muted. Value row (32): '3,26,500' 2xl 24/32 Semibold ink-strong (proportional figures) + gap 6 + 'units' sm 14/20 Regular ink-muted, baseline aligned. Right: two kit Icon Buttons (variant Secondary, 36px, Lucide chevron-left and chevron-right 16, hit area extended to 44 x 44, centres x 295 and 339), disabled at the first and last bar at 40% opacity. Label width is capped at 233 (worst case 'Units used in September 2026' about 190).
 b. CHIP ROW y 340 to 368 (28, gap 8, wraps if needed, row gap 8; card grows 36 per extra row). Change chip = shadcn Badge pill, height 28, padding 0 10, gap 6, fill surface-muted, direction icon 14 ink-muted + text sm 14/20 Medium ink. Variants: Up (arrow-up) 'Up 1.8% from July'; Down (arrow-down) 'Down 3.6% from June'; Same under 0.5% (equal) 'About the same as June'; first month (calendar) 'Earliest month'. Extreme badge (second chip when the selected bar is the highest or lowest of the visible range): same Badge with the peak or dip glyph 14 + 'Highest' or 'Lowest' (aria 'Highest month'). Worst cases measured at 0.56em: Feb 'Down 10.0% from January' + 'Lowest' = 312 of 329; Aug 2025 'Earliest month' + 'Highest' = 253. On the default load (latest month) the chip row shows only the change chip.
 c. CAPTION ROW y 380 to 396 (16): left 'Each bar is one month' xs 12/16 Regular ink-muted; right-aligned at x 361 the axis title 'units' xs 12/16 Medium ink-muted.
 d. PLOT y 408 to 608 (200 tall, 1 lakh = 50px), x 32 to 321 (289 wide), right axis gutter x 321 to 361 (40). Tick labels xs 12/16 Regular ink-muted tabular, left aligned at x 327, vertically centred on their lines: '4 lakh' y 408, '3 lakh' y 458, '2 lakh' y 508, '1 lakh' y 558, '0' y 608. Gridlines 1px #DCDFE4 at those y from x 32 to 321, behind the bars; the 0 line is the baseline.
   Bars (13 slots of 22.23, bar 14, x = 32 + 22.23 i + 4.1). Heights = units / 2,000: Aug25 160.1 (x 36.1) . Sep 155.1 (58.3) . Oct 159.6 (80.6) . Nov 145.7 (102.8) . Dec 149.8 (125.0) . Jan26 145.2 (147.3) . Feb 130.7 (169.5) . Mar 145.5 (191.7) . Apr 157.8 (214.0) . May 171.1 (236.2) . Jun 166.4 (258.4) . Jul 160.4 (280.7) . Aug26 163.3 (302.9 to 316.9). Aug26 is primary, the other 12 are chart/rest. Tallest bar (May) tops at y 436.9, clear of the 4 lakh line at 408.
   Letters row y 616 to 632: A S O N D J F M A M J J A on slot centres (x = 32 + 22.23 i + 11.1). Selected Aug26 = 30 x 20 primary pill (x 294.9 to 324.9, y 614 to 634) with white Semibold 'Aug'; it overhangs the plot by 3.9px into the empty gutter at that row, nothing collides.
   Year row: bracket 1px #DCDFE4 at y 640: '2025' x 34 to 141.2 (slots 0 to 4), '2026' x 145.2 to 319 (slots 5 to 12); year text y 644 to 660 centred at x 87.6 and x 232.1.
   Touch band: one transparent layer over y 408 to 634, full plot width, touch-action pan-y; x snaps to the nearest bar. The 22px column is not the target (the whole band is), and the 44px steppers are the equivalent control (WCAG 2.5.8).
 e. FOOTNOTE ROW y 668 to 712 (44, a button, sibling of the chart): Illustration 'Bill history chip' 28 x 36 + gap 10 + stack: 'From the usage table on your August bill' xs 12/16 Regular ink-muted; 'Where these numbers come from' xs 12/16 Medium primary. Opens the existing sheet. Card bottom padding 8.

5. HIGHS AND LOWS header y 744 to 772: 'Highs and lows' lg 18/28 Semibold ink-strong, no scope label (the tabs above scope it). TILES y 780 to 872 (92): two shadcn Item buttons 176.5 x 92, gap 8, white, radius 16, padding 12. Row 1 (20): peak glyph (Highest) or dip glyph (Lowest) 20 + gap 8 + label sm 14/20 Medium ink-muted. Row 2 (28, gap 4): '3,42,210' lg 18/28 Semibold ink-strong + ' units' xs ink-muted. Row 3 (16): 'May 2026' xs 12/16 Regular ink-muted. Hidden when fewer than 4 months have data. Values: All time and 2026: Highest May 2026 3,42,210, Lowest Feb 2026 2,61,320. 2025: Highest Aug 2025 3,20,140, Lowest Nov 2025 2,91,460.

6. EVERY MONTH accordion y 888 to 944 (56): shadcn Accordion in a white card. Trigger: 'Every month' base 16/24 Medium ink-strong; right '13 months' xs ink-muted + chevron-down 16. Open: header row 32 (xs Medium ink-muted: 'Month' left, 'Units' right at x 247, 'Change' right at x 329), then 44px rows newest first, 1px separators inset 16: month sm Medium ink, units sm Semibold ink-strong tabular, change sm Regular ink-muted tabular. Rows: Aug 2026 3,26,500 +1.8% . Jul 2026 3,20,800 -3.6% . Jun 2026 3,32,800 -2.7% . May 2026 3,42,210 +8.4% . Apr 2026 3,15,630 +8.5% . Mar 2026 2,90,910 +11.3% . Feb 2026 2,61,320 -10.0% . Jan 2026 2,90,430 -3.1% . Dec 2025 2,99,620 +2.8% . Nov 2025 2,91,460 -8.7% . Oct 2025 3,19,220 +2.9% . Sep 2025 3,10,110 -3.1% . Aug 2025 3,20,140 'First'. The selected month's row is tinted surface-muted (not primary). Open height 56 + 32 + 13 x 44 = 660, so the frame grows by 604. Rows are scoped to the tab (2026 = 8 rows, 2025 = 5 rows). Hidden when the metric has fewer than 3 months.

7. HOW AUGUST COMPARES header y 968 to 996 (lg 18/28 Semibold ink-strong). Card y 1004 to 1356 (352), white, radius 16, blocks separated by 1px separators inset 16. Always about the latest bill, not range scoped. Hidden when there is no previous month; block 2 hidden when there is no August 2025 (it is never shown as a disabled block).
 BLOCK 1 'Compared with July' (188 tall, padding 16): title sm 14/20 Medium ink-muted (20); gap 4; big line row (28): arrow-up 20 ink-strong + gap 8 + '5,700 more units' xl 20/28 Semibold ink-strong; gap 2; sub line sm 14/20 Regular ink 'Smallest change in the past year.' (20); gap 12; SWING STRIP (70); bottom padding 16.
  SWING STRIP, 329 wide: it shows each monthly change on one ruler so a reader can see 1.8% is small. Marker label row (16): 'August' xs 12/16 Semibold ink-strong, centred on the marker x (clamped inside 0 to 329). Gap 2. Band (32): 1px #DCDFE4 baseline at its middle; zero tick 1px x 12 ink-muted at x 164.5; 11 earlier months as 3 x 16 radius 1.5 ticks in chart/rest on the baseline; August as a 4 x 28 radius 2 primary marker (y 2 to 30). Scale: plus or minus 12% (rule: ceil(max absolute change x 1.05 / 2) x 2 = 12), 13.71px per 1%, x = 164.5 + change x 13.71. Tick x: Sep 121.6 (-3.1) . Oct 204.8 (+2.9) . Nov 45.3 (-8.7) . Dec 202.9 (+2.8) . Jan 122.5 (-3.1) . Feb 27.1 (-10.0) . Mar 319.7 (+11.3) . Apr 281.0 (+8.5) . May 279.9 (+8.4) . Jun 126.8 (-2.7) . Jul 115.1 (-3.6) . Aug marker 188.9 (+1.8). Near-equal values overlap (Oct and Dec, Apr and May, Sep and Jan); that is fine, ticks are opaque. Gap 4. Axis labels row (16): 'Down 12%' left, 'No change' centred at 164.5, 'Up 12%' right, xs 12/16 Regular ink-muted. No numbers on the ticks. Shown only with 4 or more monthly changes.
  Sub-line templates by rank among the last 12 absolute changes: smallest 'Smallest change in the past year.'; largest 'Biggest change in the past year.'; otherwise 'Bigger than {k} of the other 11 monthly changes.'; with fewer than 12 changes, 'so far' replaces 'in the past year'. Direction variants: arrow-down + '{n} fewer units'; equal + 'About the same'.
  BRIDGE ROW (56, 1px separator above, padding 0 16): sentence sm 14/20 Regular ink 'Your bill is up ₹53,820.' left; Link button 'Show in rupees' sm Medium primary right (no chevron, same page, 44 hit).
 BLOCK 2 'Compared with last August' (106 tall, padding 16): title sm Medium ink-muted (20); gap 4; big line (28): arrow-up 20 + '6,360 more units' xl Semibold ink-strong; gap 2; sub line sm Regular ink 'Up 2.0% on Aug 2025 (3,20,140).' (20); bottom padding 16. No chart: there is only one year-on-year point, and a strip with one tick would say nothing. Total card: 188 + 1 + 56 + 1 + 106 = 352.

════ PART C. 2026, 2025 AND MONTH-SELECTED VARIANTS ════
Same stack, same heights unless stated.
2026 tab: 8 slots of 36.13, bar 22 (x = 32 + 36.13 i + 7.07), 3-letter labels Jan to Aug, one bracket '2026' x 34 to 319 centred 176.5, Aug selected as a 30 x 20 pill (centre x 302.9). Highs and lows: May 3,42,210, Feb 2,61,320. Every month 8 rows.
2025 tab: 5 slots of 57.8, bar 24 (x = 32 + 57.8 i + 16.9), labels Aug to Dec, bracket '2025', selection jumps to Dec (latest in range; pill centre x 292.1), readout 'Units used in December 2025' 2,99,620 units, chip 'Up 2.8% from November'. The caption is replaced by 'Ohm has 5 months of 2025. Your bill's table starts in Aug 2025.' (2 lines, card +16). Highs and lows: Aug 2025 3,20,140, Nov 2025 2,91,460. Every month 5 rows.
Selection carries over if the month exists in the new tab, else jumps to the latest month in it (2026: Aug, 2025: Dec).
Month selected (May): May bar primary (x 236.2 to 250.2), Aug returns to chart/rest, pill 'May' centred x 243.2 (228.2 to 258.2; Apr and Jun letters stay clear by 2.6), readout 'Units used in May 2026' 3,42,210 units, chips 'Up 8.4% from April' and the Highest badge (peak glyph + 'Highest'). Both steppers enabled.

════ PART D. RUPEES AND THE MONTHS BUILDING UP CARD ════
Rule: bars are drawn only with 3 or more months of data, for either metric. Ohm holds 2 rupee months (July and August 2026), so Bill amount shows this card instead of a chart.
Selecting 'Bill amount': range tabs hide (no tab has 3 bars), the chart card is replaced, Highs and lows and Every month are hidden (2 values are fully on screen), 'How August compares' stays.
CARD y 208 to 544 (336), padding 16:
 - Readout y 224 to 272: label row indian-rupee 14 ink-muted + 'Bill amount for August 2026' xs Medium ink-muted; value '₹36,42,160' 2xl Semibold ink-strong with the ₹ glyph 18px and ink-muted (Home hero treatment).
 - Chip row y 280 to 308: Badge 'Up 1.5% from July' (neutral, arrow-up 14). Neutral on purpose: Trends describes, S06 warns.
 - Gap 16, row y 324 to 412 (88): Illustration 'Rupee history starts' (112 canvas shown at 88 x 88) left, gap 12, text stack right (width 229): heading 'Rupee history is new' base 16/24 Semibold ink-strong; gap 4; body sm 14/20 Regular ink-muted 'Rupee amounts start with your July 2026 bill. Ohm draws a chart once it has 3 months.' (3 lines).
 - Gap 16, MONTHS METER block y 428 to 480: header row (16): left 'Months with rupee amounts' xs 12/16 Medium ink-muted, right '2 of 13' xs 12/16 Semibold ink-strong; gap 8; 13 segments, each 8 tall, radius 4, gap 4, width 21.6 (329 total); filled: July chart/rest #8993A4, August primary; empty: surface-muted #F1F2F4; gap 4; end labels (16) 'Aug 2025' left and 'Aug 2026' right, xs Regular ink-muted. The 13 slots match the 13 bars of the Units chart, so the meter reads as 'how much of that year has rupees'.
 - Gap 12, footnote row y 492 to 536 (44): Illustration 'Bill history chip' + 'From bills Ohm has read since July 2026' / 'Where these numbers come from'. Card bottom padding 8.
COMPARISON (Rupees): header y 568; card y 604 to 767 (163) with block 1 only: title 'Compared with July'; big line arrow-up + '₹53,820 more'; sub 'July was ₹35,88,340.'; bridge row 'You used 5,700 more units.' + Link 'Show in units'. Block 2 hidden (the card above already says amounts start in July 2026). No strip (one change only).
Rupees never shows July paid or saved figures; only bill totals.
FUTURE (not a frame, rule only): from the 3rd bill the rupee chart appears automatically with the same component: domain 0 to ₹40 lakh (rule: next ₹10 lakh above max x 1.08), 1 ₹10 lakh = 50px, axis gutter 56 (so '₹40 lakh' fits), ticks '₹0', '₹10 lakh', '₹20 lakh', '₹30 lakh', '₹40 lakh', bars sized by the same slot rule (3 bars: slot 60, bar 24, right aligned), readout, chip, Highs and lows (from 4 months), Every month and range tabs return.
UNITS WITH FEWER THAN 3 MONTHS (bill without a usage table): same card, readout of the latest month, no chip when there is no previous month, heading 'Usage history is new', body 'Ohm will draw your usage once it has 3 months.', meter 'Months with usage' with '1 of 13', illustration 'Waiting for 3 months', footnote 'This bill has no usage table'. Comparison hidden with one month, block 1 only with two.

════ PART E. LOAD STATES ════
Error: the chart card position holds a shadcn Alert (neutral, circle-alert 20 ink): 'Couldn't load your trends' / 'Check your connection and try again.' + Outline pill sm 'Try again'; toggle stays, everything below hides. Offline with cached data: keep the data and show a one-line Alert above the toggle: 'You are offline. These numbers are from your last visit.' First load: Skeleton layout (toggle 72, tabs 48, card with 13 skeleton bars of fixed mock heights, then two skeleton blocks). Refetch: keep the frame at 50% opacity with a Spinner 16 left of the readout label, no skeleton flash.
Large text (AX1 and up): metric triggers stack 1 per row (each about 72), year row hidden, chips wrap, readout label wraps, bars unchanged; table carries all values.
Focus: the plot group has a 2px primary focus ring offset 2; the steppers, tiles and tabs use the kit focus ring.

════ PART F. S01 HOME USAGE MODULE (replaces the line chart) ════
Card x 16, y 430, 361 x 314 (was 322), white, radius 16, padding 8 top, 20 sides, 8 bottom. The card is not a button; the chart frame, the See trends link and the footnote row are separate targets. Everything below moves up 8 (Past bills header y 768, Home content height 1,028).
 F1 TITLE ROW 44: left Lucide zap 16 ink-muted (bare, no circle) + gap 8 + 'Electricity used' sm 14/20 Medium ink-muted; right Link button 'See trends' sm Medium primary with a trailing chevron-right 14 (it goes to another tab), 44 hit, -8 right margin.
 F2 HEADLINE 28: 'Up 1.8% from July' xl 20/28 Semibold ink-strong, no icon circle (the word Up carries direction; one icon treatment on this card: bare icons).
 F3 SUB LINE (gap 4) 20: '3,26,500 units in August. July was 3,20,800.' sm Regular ink-muted.
 F4 CHART FRAME (gap 12) 321 x 138, ONE button (opens Trends, default state), no gridlines, no axis, no value labels (the sub line carries the numbers). Baseline 1px #DCDFE4 at y 88; plot y 0 to 88, 1 lakh = 22px, same 0 to 4 lakh domain as S12. 13 slots of 24.69, bar 15, x = 24.69 i + 4.85, radius 4 top. Heights (units x 88 / 4,00,000): Aug25 70.4 . Sep 68.2 . Oct 70.2 . Nov 64.1 . Dec 65.9 . Jan26 63.9 . Feb 57.5 . Mar 64.0 . Apr 69.4 . May 75.3 . Jun 73.2 . Jul 70.6 . Aug26 71.8. Aug26 (x 301.2 to 316.2) primary, the other 12 chart/rest #8993A4. Letters y 94 to 110: A S O N D J F M A M J J A xs 12/16 Medium ink-muted on slot centres (12.35 + 24.69 i); the Aug26 letter is ink-strong Semibold (no pill on Home). Year row: bracket 1px #DCDFE4 at y 118, '2025' over slots 0 to 4 (x 2 to 121.5), '2026' over slots 5 to 12 (x 125.5 to 319), text y 122 to 138 xs Medium ink-muted. Pressed state: the frame at 60% opacity for 100ms (as round 1). The frame is a single target (no per-bar navigation) because 24px columns on a scrolling page make a per-bar jump to another tab a surprise.
 F5 FOOTNOTE ROW (gap 8) 44: Illustration 'Bill history chip' 28 x 36; 'From the usage table on your August bill' xs Regular ink-muted; 'Where these numbers come from' xs Medium primary. Opens the sheet. Card ends y 744.
 STATES (component 'Usage summary', Direction Up, Down, Same changes the headline words only): 13 months as above; 3 to 12 months: n bars, slot = min(321 / n, 40), bar = min(round(slot x 0.62), 24), group right-aligned, 3-letter labels when slot is 34 or more, year row only when 2 years show; 2 months: no chart, gap 8, 'Ohm will draw your usage once it has 3 months.' sm ink-muted, card 192 tall; 1 month: '3,26,500 units in August' xl then 'Ohm will compare months when your next bill arrives.'; no usage table: footnote 'This bill has no usage table'; first load: Skeleton card 361 x 314 with 13 skeleton bars; refetch: 50% opacity plus Spinner 16 left of See trends; AX1 and up: year row hidden, text wraps, card grows.

════ PART G. COMPONENTS TO BUILD (local, on Foundations) ════
Metric toggle (Tabs, 2 triggers: Units, Bill amount x Selected) . Range tabs (Tabs, 3 triggers, Selected 1 to 3) . Usage bars (Variant Full or Compact, Months 13, 8, 5, 3, Selected month) . Readout (Metric, Chips 0 to 2) . Change chip (Direction Up, Down, Same, Earliest) . Extreme badge (Highest, Lowest) . Peak and dip glyphs . Swing strip . Comparison block (Metric, Direction, With strip) . Months building up card (Metric Units or Rupees) . Months meter . High-low tile (Highest, Lowest) . Every month accordion (Open, Closed, Metric) . Home usage chart (Months 13 or n) . Reuse shadcn Tabs, Badge, Button (Link, Outline sm pill), Icon Button (Secondary, 36), Item, Separator, Accordion, Alert, Skeleton, Spinner; Lucide zap, indian-rupee, arrow-up, arrow-down, equal, chevron-left, chevron-right, chevron-down, calendar, circle-alert (check old kit names such as bar-chart-3 vs chart-column).

════ PART H. FRAME HEIGHTS (recomputed from the layout above; frames hug content) ════
S12 default 1,460: title 76 to 112, toggle 124 to 196, tabs 208 to 256, chart card 268 to 720, highs header 744, tiles 780 to 872, accordion 888 to 944, compare header 968, compare card 1,004 to 1,356, inset 104. With Every month open: +604 = 2,064.
S12.1 2026: 1,460 closed, 1,844 open (8 rows = 56 + 32 + 352 = 440, +384).
S12.2 2025: 1,476 closed (caption wraps, +16), 1,728 open (5 rows, +252).
S12.3 May selected: 1,460.
S12.4 Rupees building up: 871 (card 208 to 544, header 568, compare card 604 to 767, inset 104).
S12.5 Units, 1 month, no table: 852 (content ends about 508 plus inset, shorter than the device).
S12.6 Error: 852.
Home: card 430 to 744, content height 1,028.
Text widths were estimated with Inter at about 0.56em per character (the scale the critique measured); the three tightest strings (Feb chips, Show in rupees row, Units used in September 2026) have 17px, 37px and 43px spare. Re-check in the render.

## Copy

- **S12 page title (no sub line)**: Trends
- **Metric toggle 1 (label / descriptor)**: Units used / 1 unit is 1 kWh
- **Metric toggle 2 (label / descriptor)**: Bill amount / What Northgrid billed
- **Range tabs**: All time | 2026 | 2025 (future: 'Last 12 months' first once more than 13 months are stored; a tab shows only with 3 or more bars)
- **Readout label, Units**: Units used in August 2026
- **Readout value, Units**: 3,26,500 units
- **Readout label, Rupees**: Bill amount for August 2026
- **Readout value, Rupees**: ₹36,42,160
- **Change chip, Up (Units, Aug)**: Up 1.8% from July
- **Change chip, Down (template)**: Down {n}% from {previous month}  (example Jul: Down 3.6% from June)
- **Change chip, Same (under 0.5%)**: About the same as {previous month}
- **Change chip, first month**: Earliest month
- **Change chip, Rupees Aug**: Up 1.5% from July
- **Extreme badges**: Highest | Lowest (aria: Highest month | Lowest month)
- **Chart caption, Units**: Each bar is one month
- **Chart caption, 2025 tab**: Ohm has 5 months of 2025. Your bill's table starts in Aug 2025.
- **Axis title**: units
- **Y ticks, Units**: 0, 1 lakh, 2 lakh, 3 lakh, 4 lakh
- **Y ticks, Rupees (future chart, 3 or more bills)**: ₹0, ₹10 lakh, ₹20 lakh, ₹30 lakh, ₹40 lakh
- **X labels, All time**: A S O N D J F M A M J J A; years row 2025 (Aug to Dec) and 2026 (Jan to Aug); selected month as a 3-letter pill (Aug)
- **X labels, 2026 and 2025 tabs**: Jan Feb Mar Apr May Jun Jul Aug | Aug Sep Oct Nov Dec
- **Footnote, Units**: From the usage table on your August bill / Where these numbers come from
- **Footnote, Rupees**: From bills Ohm has read since July 2026 / Where these numbers come from
- **Footnote, bill without a usage table**: This bill has no usage table / Where these numbers come from
- **Months building up card, Rupees (heading / body)**: Rupee history is new / Rupee amounts start with your July 2026 bill. Ohm draws a chart once it has 3 months.
- **Months building up card, Units (heading / body)**: Usage history is new / Ohm will draw your usage once it has 3 months.
- **Months meter**: Months with rupee amounts (or Months with usage) / 2 of 13 / Aug 2025 / Aug 2026
- **Comparison section header**: How August compares
- **Block 1 title / big line / sub line (Units)**: Compared with July / 5,700 more units / Smallest change in the past year.
- **Swing strip labels**: August (marker) | Down 12% | No change | Up 12%
- **Swing sub-line templates**: Smallest change in the past year. | Biggest change in the past year. | Bigger than {k} of the other 11 monthly changes. ('so far' replaces 'in the past year' with fewer than 12 changes)
- **Bridge row (Units)**: Your bill is up ₹53,820.  [Show in rupees]
- **Block 2 title / big line / sub line (Units)**: Compared with last August / 6,360 more units / Up 2.0% on Aug 2025 (3,20,140).
- **Block 1 (Rupees)**: Compared with July / ₹53,820 more / July was ₹35,88,340.
- **Bridge row (Rupees)**: You used 5,700 more units.  [Show in units]
- **Comparison direction words**: {n} more units | {n} fewer units | About the same
- **Highs and lows header**: Highs and lows
- **High tile**: Highest / 3,42,210 units / May 2026
- **Low tile**: Lowest / 2,61,320 units / Feb 2026
- **Accordion title / count**: Every month / 13 months
- **Accordion columns, Units**: Month | Units | Change
- **Accordion first row change**: First
- **Error card**: Couldn't load your trends / Check your connection and try again. / Try again
- **Offline banner**: You are offline. These numbers are from your last visit.
- **Sheet row 1 (unchanged)**: Units: Aug 2025 to Aug 2026 / Your August bill lists the units used each month since August 2025. Ohm read that table.
- **Sheet row 2 (amended)**: Rupees: from July 2026 / Rupees are bill totals, before any early-payment discount. Ohm has them from your July 2026 bill, the first one it read.
- **Home usage title / link**: Electricity used / See trends (with chevron)
- **Home headline / sub line**: Up 1.8% from July / 3,26,500 units in August. July was 3,20,800.
- **Home chart letters and years**: A S O N D J F M A M J J A / 2025 / 2026
- **Home footnote**: From the usage table on your August bill / Where these numbers come from
- **Home empty (two months)**: Ohm will draw your usage once it has 3 months.
- **Aria, metric toggle**: Units used, 1 unit is 1 kWh | Bill amount, what Northgrid billed
- **Aria, chart group**: Units used each month, August 2025 to August 2026
- **Aria, one bar**: May 2026, 3,42,210 units, highest month
- **Aria, steppers**: Previous month | Next month
- **Aria, swing strip**: August changed 1.8%, the smallest of the past 12 monthly changes.
- **Aria, Home chart**: Units used each month, August 2025 to August 2026. August 2026: 3,26,500 units, up 1.8% from July. Opens Trends.

## Illustrations

### Rupee history starts
- Concept: S04 language: the current bill page is solid with a scan line and a round rupee badge; earlier months are empty outline pages behind it, so the missing rupee months read as 'nothing before this page' and not as an error. Used in S12.4 at 88 x 88.
- Construction: 112 x 112 canvas, no background, 8px safe margin (nothing within 4px of an edge; checked). FRONT page 56 x 72 at (38, 22), white, radius 8, 1px line #DCDFE4. Five skeleton lines height 4, radius 2, fill #DCDFE4, x 46, y 34, 46, 58, 70, 82, widths 70%, 90%, 60%, 80%, 50% of 40. One 2px primary #265CFF scan line at y 58 across the page, 4px past both page edges (x 34 to 98), with a 16% primary glow band 12px tall under it. Round badge 24px centred at (94, 20), fill primary, Lucide indian-rupee 14 white, 2px white outside ring (spans x 80 to 108, y 6 to 34). Two GHOST pages behind, same size, no fill, 1.5px #DCDFE4 stroke: one at (22, 28), one at (6, 34) at 55% opacity (bottom edge y 106).
- Hover: On mount the scan line sweeps top to bottom over 1.2s ease-in-out once and the ghost pages fade in left to right with 120ms stagger. Focus or hover on a pointer-fine device replays the scan once. prefers-reduced-motion: static.
### Waiting for 3 months
- Concept: S04 page whose lower half is a tiny bar chart with one empty outlined bar, for 'Ohm will draw your usage once it has 3 months'.
- Construction: 112 x 112 canvas, 8px safe margin. White page 64 x 80 at (24, 20), radius 8, 1px #DCDFE4. Three skeleton lines height 4, radius 2, #DCDFE4 at x 32, y 30, 37, 44 with widths 80%, 55%, 70% of 40 (ends y 48). Baseline 1px #DCDFE4 at y 82. Three bars 10 wide at x 36, 54, 72: two in #8993A4 (heights 22 and 26, top radius 3) and one outlined ghost bar (1.5px primary stroke, no fill, height 30, top at y 52) crossed by a 2px primary scan line at y 62. Round badge 24px centred at (90, 18) with Lucide chart-column 14 white on primary and a 2px white ring (spans y 4 to 32).
- Hover: On mount the ghost bar outline draws in (stroke dash 400ms) and the scan line sweeps once. Tap or hover: the ghost bar rises from the baseline to its outline height in 300ms ease-out. Reduced motion: static.
### Peak and dip glyphs
- Concept: Replaces the ring-arrow marker. A 3-bar pictogram in the chart's own language: the middle bar stands out for Highest and dips for Lowest. No arrow, so arrows only ever mean direction of change.
- Construction: 20 x 20 (14 x 14 in badges, same shapes scaled). Three bars 4px wide at x 2, 8, 14 on a shared baseline y 18, top radius 1.5. Peak: heights 8, 16, 10 with the middle bar ink-strong #091E42 and the other two #8993A4. Dip: heights 14, 6, 12 with the middle bar ink-strong. Used on the two Highs and lows tiles and in the Highest and Lowest badges; not drawn on the chart.
- Hover: None (static).
### Months meter
- Concept: A quiet progress cue, not a chart: 13 segments for the 13 months a chart can show, only the months Ohm has are filled. It shows honestly how little rupee history exists without encoding any rupee value in a bar height.
- Construction: 329 x 8 row of 13 segments, each 21.6 wide, 8 tall, radius 4, gap 4. Filled: all but the last in #8993A4, the latest in primary. Empty: surface-muted #F1F2F4. Header row above (label left, 'n of 13' right) and end labels below ('Aug 2025', 'Aug 2026'). Static, one tap-free element.
- Hover: On mount the filled segments fill left to right over 200ms (stagger 40ms). Reduced motion: static.

## New screens

### S12.1 Trends, 2026
- Purpose: Show the 2026 tab: 8 wide bars with full 3-letter month names (the congestion answer for a short range).
- Layout: Same stack as S12, 1,460 tall closed, 1,844 with Every month open. Tab 2026 selected in the range tabs. Plot has 8 slots of 36.13, bars 22 wide, labels Jan to Aug, one year bracket '2026', Aug selected as a 30 x 20 pill. Highest May 2026 3,42,210, Lowest Feb 2026 2,61,320. Every month lists 8 rows.
### S12.2 Trends, 2025
- Purpose: Show the 2025 tab and the honest partial-year note.
- Layout: Same stack, 1,476 closed, 1,728 open. Tab 2025 selected. 5 slots of 57.8, bars 24 wide, labels Aug to Dec, Dec selected, readout 'Units used in December 2025' 2,99,620 units, chip 'Up 2.8% from November'. Caption replaced by 'Ohm has 5 months of 2025. Your bill's table starts in Aug 2025.' (2 lines). Highest Aug 2025 3,20,140, Lowest Nov 2025 2,91,460. Every month lists 5 rows.
### S12.3 Trends, month selected (May)
- Purpose: Show selection and scrub state, the Highest badge, and the spelled-out month pill.
- Layout: Default frame (1,460) with May 2026 selected: May bar primary, Aug back to chart/rest, 'May' pill on slot 9. Readout 'Units used in May 2026' 3,42,210 units; chips 'Up 8.4% from April' and the Highest badge with the peak glyph. Both steppers enabled. How August compares unchanged.
### S12.4 Trends, Bill amount (months building up)
- Purpose: Show what Bill amount contains and how only 2 rupee months are handled honestly, without a mostly empty chart.
- Layout: Frame 871 tall. Bill amount trigger selected (primary-subtle, indian-rupee icon), no range tabs. Card: readout 'Bill amount for August 2026' ₹36,42,160, chip 'Up 1.5% from July', illustration 'Rupee history starts' with heading 'Rupee history is new' and the body about July 2026 and 3 months, the 13-segment months meter '2 of 13' (Jul grey, Aug primary), footnote 'From bills Ohm has read since July 2026'. Below: How August compares with the Rupees block 1 only (₹53,820 more, July was ₹35,88,340., 'You used 5,700 more units.' + Show in units). No Highs and lows, no Every month.
### S12.5 Trends, Units with fewer than 3 months
- Purpose: State for a bill with no usage table and under 3 months of units.
- Layout: Frame 852. Same Months building up card as S12.4 with Units copy: readout of the latest month, heading 'Usage history is new', body 'Ohm will draw your usage once it has 3 months.', meter 'Months with usage 1 of 13', illustration 'Waiting for 3 months', footnote 'This bill has no usage table'. No chip, no comparison section.
### S12.6 Trends, error
- Purpose: Load failure state so the page never shows a blank chart.
- Layout: Frame 852. Title and metric toggle stay; the chart card position holds an Alert (circle-alert 20, 'Couldn't load your trends', 'Check your connection and try again.') and an Outline pill sm 'Try again'. Everything below is hidden. The offline-with-cache variant is a one-line Alert above the toggle (annotation only).
### S01 Home, usage module (replaces the line chart)
- Purpose: Compact bar version of the S12 chart on Home: same colours, letters, years and domain.
- Layout: Card 361 x 314 at y 430: zap + 'Electricity used' + See trends with chevron, 'Up 1.8% from July' headline, sub line, 321 x 138 chart (88px plot, 13 bars of 15px, single letters, year row; Aug26 primary, others #8993A4; the whole chart is one button), footnote row. Past bills moves up 8, Home content height 1,028. States: 3 to 12 months, two months, one month, no usage table, skeleton, updating, large text.

## Interactions

- Open Trends from the bottom nav -> Opens on Units, All time, Aug 2026 selected, scrolled to top. Last-used metric and range are not remembered, so the first view is always the same.
- Tap the Bill amount trigger (or the Units trigger) -> Switches metric. Range tab stays if it still exists for the new metric, otherwise All time; selected month stays if it has data, otherwise the latest month. With fewer than 3 months for the metric the Months building up card replaces the chart and the range tabs, Highs and lows and Every month hide. Units to Bill amount: bars fade out 150ms and the card cross-fades; no bars grow in Rupees today. Focus stays on the trigger. Reduced motion: instant.
- Tap a range tab (All time, 2026, 2025) -> Bars cross-fade 150ms, slots and labels re-flow by the slot rule, scale stays 0 to 4 lakh. Selected month kept if in range, else latest month in range. Highs and lows and Every month rescope (they sit directly below the tabs); How August compares does not change.
- Touch: tap a bar (anywhere in the plot band) -> Selection happens on pointerup if the finger moved under 10px and lasted under 500ms; x snaps to the nearest bar. The bar turns primary, the previous one returns to chart/rest, the letter pill moves, and the readout and chips update. No floating tooltip: the readout above is the tooltip and the finger never covers it.
- Touch: press and drag horizontally across the plot (scrub) -> Scrub begins only after 8px of horizontal drift where horizontal movement exceeds vertical (touch-action pan-y); then pointer capture, selection and readout follow the finger bar to bar and the last bar under the finger stays selected on release. If the browser takes the gesture for vertical scroll (pointercancel) nothing changes, so scrolling past the chart never changes the month.
- Mouse: click a bar -> Selects on pointerdown (mouse only). No hover colour and no hover preview; hover only changes the cursor. Hover never gates a value.
- Tap the previous or next month button (44 x 44) -> Moves selection one bar with the same updates. Disabled at the first and last bar of the current range. This is the 44pt route for fine selection (the equivalent control for the 22px columns) and the keyboard route.
- Keyboard on the plot (one tab stop, role group) -> Left and Right arrows move one bar, Home and End go to the first and last bar, readout is aria-live polite. Focus shows a 2px primary ring with offset 2.
- Tap the Highest or Lowest tile -> Selects that month's bar; the chart card scrolls into view smoothly only if it is not fully visible; readout and chips update (the Highest or Lowest badge appears). No pulse animation.
- Tap 'Show in rupees' or 'Show in units' in the bridge row -> Switches metric exactly like the toggle. Because the link sits at the bottom, the page scrolls smoothly to the metric toggle only when the chart card is off screen, so the user sees the change. No navigation, so no chevron.
- Tap Where these numbers come from -> Opens the existing provenance sheet (row 2 copy amended).
- Tap Every month -> Accordion opens in place; the frame grows by 604 for 13 rows (384 for 8, 252 for 5); the selected month row is tinted surface-muted. Rows are not interactive.
- Home: tap the chart frame or See trends -> Both switch to the Trends tab in its default state (Units, All time, Aug 2026). The chart frame is one button, there is no per-bar navigation. Pressed state: 60% opacity for 100ms. Deep links from other screens keep working (?metric=units&range=all&month=2026-07 from the July screen; table=open from the sheet button).
- Home: tap the footnote row -> Opens the Where these numbers come from sheet.
- New bill arrives -> A new bar grows in at the right (200ms), the window shifts one slot, selection moves to the new month, Home headline updates. The 3rd rupee bill makes the rupee chart, range tabs, Highs and lows and Every month appear for Bill amount. More than 13 months stored: 'Last 12 months' becomes the first tab.
- Data refetch -> Keep the current chart at 50% opacity with a Spinner 16 left of the readout label. No skeleton flash, no layout jump. First load only: Skeleton layout.
- Error or offline -> Error: Alert in the card position with Try again (Outline pill sm); retry shows the skeleton once. Offline with cached data: data stays, a one-line offline Alert shows above the toggle.
- prefers-reduced-motion -> All bar growth, fade and scroll animations become instant; scrub behaviour is unchanged.

## Research

- CRED (spends summary, dark) https://mobbin.com/screens/7f33e880-f2cb-450b-a1bd-90def15a9e64: Indian fintech precedent for 12 thin bars with single-letter month labels, only two axis values, latest month highlighted and a plain 'from last month' delta above. Confirms single letters are readable for this audience.
- CRED (spends in a month, light card) https://mobbin.com/screens/3563156c-78ab-44f5-a0ad-00d5f5d93d35: Grey bars with ONE blue current-month bar and a plain-words sentence under the number: the emphasis scheme we adopted (grey rest, one highlight), now with a 3:1 grey.
- Monzo (average monthly spending) https://mobbin.com/screens/e0ee1ad7-d20c-4667-89d4-0fc184537e39: 12 months as single letters with value ticks on the right edge; a sentence with the number leads the chart. Source of the right axis gutter and the headline-first readout.
- Strava (historical activity) https://mobbin.com/screens/72993508-4631-4347-bf9a-666982abfe87: Selected bar in the accent, the rest grey, and the selected month's label inverted into a filled chip. Source of the selected-letter pill, here widened to a 3-letter name to remove the A, J, M ambiguity.
- Octopus Energy (usage) https://mobbin.com/screens/c2ed3983-9a5c-4c5d-a782-ac0be81b4b5d: Closest domain match: a lightning icon beside 'kWh used' and an explicit kWh / money switch with range tabs. Supports the zap and indian-rupee triggers with a unit descriptor.
- MacroFactor (expenditure, range pills) https://mobbin.com/screens/54a9e6bc-27f5-4247-a8d8-3ffbd0539d56: Range pills end in 'All' and the hero shows an average and a difference with the date range under it. Supports an 'All time' tab and a readout that names its period.
- Google Health / Fitbit (energy burned) https://mobbin.com/screens/87da4565-88e3-4345-9001-744c9dafab89: Range tabs, previous and next arrow buttons beside the date, and a big hero above the bars; basis for the stepper pair and readout row.
- Visible (Morning Stability, no score yet) https://mobbin.com/screens/ae46b309-ea0a-4331-9c73-e39c60dc0a24: An honest 'No score yet' card with a segmented progress bar ('1 / 4 days completed') and one sentence saying what unlocks it. Direct precedent for the Months building up card and the 'n of 13' meter instead of a near-empty chart.
- Linktree (Interests, not enough data) https://mobbin.com/screens/e0fd331b-372f-43ba-8c93-574ba7c31792: Small illustration plus a plain statement of the threshold ('at least 100 unique visitors') where a chart would be. Supports 'Ohm draws a chart once it has 3 months' with an S04 illustration.
- Linktree (Insights, reference lines) https://mobbin.com/screens/cf8181f0-222a-498b-8269-db9ee3440771: The user's own value drawn against reference marks ('Your average', 'Benchmark') so the number is read in context. Same idea as the swing strip: show where this month's change sits among earlier months.
- Bevel (trends analysis) https://mobbin.com/screens/522ddab2-6b35-4dea-889c-a60767f75809: A compact table of period, signed change with an arrow, and a 'no data' row for the period it cannot compute, directly under the chart. Supports the Every month table and hiding comparisons that have no data.
- Lloyds Mobile Banking (spending insights) https://mobbin.com/screens/c792115c-8ac3-4bfd-bab8-ea72deb09752: A plain-words delta with an arrow naming the comparison period; informs the change chip wording ('Up 1.8% from July').
- Quicken (spending by month) https://mobbin.com/screens/f74af978-aeef-4149-b481-37809806fb66: The month-by-month table directly under the bar chart as its accessible twin; supports the Every month accordion.

## Code notes
BUILD AS ONE SVG COMPONENT, not Recharts: <UsageBars variant='full'|'compact' data domainMax selectedKey onSelect/>. Bars are <path>s (top-only radius 4; SVG rect rx rounds all four corners). viewBox width 329 (full: plot 289 + 40 gutter for Units, plot 273 + 56 gutter for a future Rupees chart) and 321 (compact), height from the spec, scaled by CSS width. Slot rule: slot = min(plotW / n, 60) (Home: min(321 / n, 40)); bar = min(round(slot x 0.62), 24); group right-aligned; labels are 3-letter when slot >= 34 else 1 letter; the selected label is always a 3-letter pill; year row groups consecutive months by calendar year. If shadcn Chart (Recharts) is preferred: BarChart radius [4,4,0,0], Cell fill per selection, custom XAxis tick; the scrub layer, pill and year row need custom overlays anyway.
TOKENS: --chart-rest: #8993A4 (3.10:1 on white). Selected = var(--primary). Gridlines and baseline var(--line). Do not use opacity for rest bars (grid would show through). No hover or pressed bar colours.
INTERACTION (touch-safe): plot has touch-action: pan-y. pointerdown (touch): record x, y, time only. pointermove: if |dx| > 8 and |dx| > |dy| then setPointerCapture and select the nearest bar on every move. pointerup: if no scrub, movement under 10px and under 500ms, select the nearest bar (tap). pointercancel (the browser took a vertical scroll): do nothing. pointerType mouse: select on pointerdown. Nearest bar = clamp(round((x - plotLeft - groupOffset - slot/2) / slot)). Readout is aria-live=polite; plot is one focusable group (Left, Right, Home, End). Steppers are real <button>s with 44px hit areas. The Every month accordion is a real <table> and the screen-reader route; bars can be aria-hidden. 22px columns are below the 24px target by design: the whole band is the target and the steppers are the WCAG 2.5.8 equivalent control.
DATA MODEL: {month:'2026-08', units:326500, rupees:3642160|null, source:'bill-table'|'ohm'}. A series is drawable when it has 3 or more non-null points; bars exist only for non-null months. Range tabs: build the candidate sets (latest month plus the 12 before; each calendar year with data; all months), drop sets with under 3 bars for the metric, drop duplicates, order All time or Last 12 months first then years newest first. Domain: units ceil(max x 1.08 / 100000) x 100000; rupees ceil(max x 1.08 / 1000000) x 1000000; shared across tabs for a metric. Format with Intl.NumberFormat('en-IN'); axis label = value / 100000 + ' lakh' (rupees prefix ₹). Deep link: /trends?metric=units|rupees&range=all|2026|2025&month=YYYY-MM&table=open.
SWING STRIP: changes[i] = (units[i] - units[i-1]) / units[i-1] x 100. Domain = plus or minus ceil(max(abs(changes)) x 1.05 / 2) x 2 (=12 for this data). x = width/2 + change x (width/2 / domain). Sub line from the rank of abs(selected change) among the last 12 abs changes. Needs 4 or more changes.
DERIVED NUMBERS (arithmetic only, no new figures): Aug vs Jul 3,26,500 - 3,20,800 = 5,700 units; 5,700 / 3,20,800 = 1.78%, shown 1.8%. Aug vs Aug 2025 3,26,500 - 3,20,140 = 6,360; 6,360 / 3,20,140 = 1.99%, shown 2.0%. Rupees ₹36,42,160 - ₹35,88,340 = ₹53,820; / ₹35,88,340 = 1.50%. Monthly changes (this - previous) / previous, 1 decimal: Sep -3.1, Oct +2.9, Nov -8.7, Dec +2.8, Jan -3.1, Feb -10.0, Mar +11.3, Apr +8.5, May +8.4, Jun -2.7, Jul -3.6, Aug +1.8. Aug's absolute change 1.8 is below the smallest of the other 11 (Jun 2.7), which is why the copy says smallest. Use an ASCII hyphen for negative changes (no en dash, no minus glyph).
DATAVIZ AUDIT: form = emphasis (one highlight, gray the rest), single series, no legend box; zero baseline, one axis; solid hairline grid; bars at most 24px with 4px top radius and 8px or more gap; labels selective (selected pill, axis ticks), never a number on every bar; text on ink tokens only; tap and scrub layer present (readout replaces tooltip on touch); table twin present; refetch keeps the frame; chart drawn only with 3 or more points. Validator result in Part A (rest grey passes contrast 3.10:1 and CVD; chroma floor fails by design because it is the de-emphasis gray).
FRAME HEIGHTS (Part H): default 1,460 / open 2,064; 2026 1,460 / 1,844; 2025 1,476 / 1,728; Rupees building up 871; Home content 1,028. Heights are content-driven: let frames hug content; do not hard-code.
RENDER CHECKS STILL NEEDED in Figma and the browser: Aug26 pill overhang into the gutter (x 294.9 to 324.9), May and Apr pill clearance (2.6px), Feb chip row width (312 of 329 estimated at 0.56em Inter), Show in rupees row width, the three-line body in the building-up card, swing strip tick overlaps.
Mobbin notice (returned with the search results, shown as given): 'Your Mobbin AI usage is high this month. Usage is unlimited during beta. If your usage stays at this level, you may need to purchase more credits once limits take effect. View usage and plan options: https://mobbin.com/settings/billing-and-usage'

## Open questions

- Unit: the brief says kWh, but HT commercial bills are often billed in kVAh. Confirm on the Northgrid bill that the printed units are kWh. Until then the only kWh claim is the toggle descriptor '1 unit is 1 kWh'; fallback copy is 'As printed on your bill' (descriptor) and the aria text updated to match.
- July data issue: Bill amount shows July's BILL total (₹35,88,340, in the Rupees comparison sub line) while Past bills on Home shows July PAID (₹35,53,720, Saved ₹32,480). They are never on the same screen and Trends never shows paid or saved, but the gap is still open. Safer fallback if it is unresolved at build time: drop 'July was ₹35,88,340.' and keep only '₹53,820 more' plus the chip.
- I kept the metric descriptors (toggle 72 tall) instead of the critique's 48px segmented control: the lead's complaint was literally 'what is this Rupees tab, what does it show', and a one-line descriptor answers that in place. Plot is 200px tall, sub line removed, so the chart still starts at y 408.
- I disagree with hiding the change chip on the latest month. The chip is the readout's change cue for ANY selected month, so hiding it only for August makes the readout inconsistent; and the comparison section is now last (after the scoped sections), not directly below. Instead I removed the pills and every repeated number from the comparison (it carries amounts and context). Confirm.
- I kept the selected letter as a primary pill: bar and pill are treated as one selection element, and the pill now spells out the 3-letter month, which resolves the A, J, M repeats the critique raised. Primary is otherwise limited to links and the selected metric trigger (primary-subtle).
- New derived insight: the swing strip and the sentence 'Smallest change in the past year.' (August 1.8% versus a smallest earlier change of 2.7%). It is pure arithmetic on the printed table, but it is a new claim on screen; confirm the lead wants it, otherwise block 1 falls back to text only (about 70px shorter).
- Amber for money: Trends chips are neutral for both Units and Rupees (descriptive screen), while S06 keeps amber for the bill that must be paid. Confirm.
- 'All time' replaces 'Past year' and 'Last 12 months' because 13 months exist and both Augusts must be visible; 'Last 12 months' appears first once more than 13 months are stored. Confirm that is acceptable against the lead's wording.
- Provenance: the brief says rupees come from bills 'paid with Ohm since July 2026', but the August bill is unpaid on 3 Sep. Copy now says 'From bills Ohm has read since July 2026' and sheet row 2 matches. Confirm the lead accepts the wording change.
- Rupees has no chart until the 3rd bill (about the Sep 2026 bill). The lead likes bar charts; the building-up card is the honest alternative to a 2-bar chart. If a 2-bar chart is wanted anyway, collapse the axis to the 2 existing months with wide bars and 3-letter labels, never 11 ghost slots.
- Home whole-chart tap: the chart and See trends both open Trends (default state). If you want exactly one way in, drop the chart tap and keep the link with its chevron.
- Does the global bottom-nav spec keep a 104px content inset? Frames here assume it.