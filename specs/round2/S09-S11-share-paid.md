# S09-S11-share-paid

## Summary

Revised after critique. One web-buildable Share card (337 wide, borderless, exported as an image) now has two independent properties: Payment (Unpaid | Paid) and Checks (Clear | Look), so all four real cases exist (Unpaid+Clear is S09, Paid+Clear is S11.1, Unpaid+Look is S13.2, Paid+Look is a fourth variant for a bill paid while a check was flagged). The status band says only the payment state and follows rule R3: Unpaid is neutral grey with a clock ("Unpaid, Due Wed 16 Sep"); Paid is warning with a clock ("Paid, Waiting for Northgrid to confirm") because Northgrid has not confirmed, matching the S11 status badge. Green is kept for the saving and the stamp line. Every card ends in a richer "Ohm stamp" (blue Ohm bolt, "Checked by Ohm", date checked, the result in plain words, source: the Northgrid bill of 1 Sep); when a check fails it says "1 changed setting found" instead of the vague "5 of 6 checks passed". All card text is Text-sm (14) or larger so it still reads at WhatsApp size, and the cards were thinned: no "After 16 Sep" line, no 1.5%, neutral change arrow, no repeated "1 thing to look at". The S09 glass sheet becomes a shadcn Drawer with the card at 100% (it scales to fit short Safari viewports, floor 0.72, and a 664 px mock proves it), and three share targets: WhatsApp (real Remix glyph on WhatsApp green), Email, Copy text. "More" is removed (on iPhone WhatsApp opens the system share sheet with the PNG attached, which already lists every other app). The in-place "Copied" state replaces the toast. S11 drops the green circle for the S04 bill page, whole and at 0.75 scale, with no scan line, a green block and the S04 corner badge showing a check: the page Neha watched being read is now done. No stamp, no words, no gradient, no crop. The S11 caption is deleted and the entrance is one calm tick draw. Frames: S09, S09.1, S11, S11.1 and S13.2 are 393 x 852 (drawers 695, 695, 705 and 785 tall, nothing clips); S13.3 is a 393 x 664 viewport mock.

## Layout

A. RULES FOR THIS TRACK
- Web, not iOS glass. Keep only the iPhone Status bar (top, 62) and Home indicator (y = frame height minus 34) as device context. No iOS "Sheet - iPhone" kit, no glass buttons. Drawer, buttons, badges and toast are shadcn parts or compositions of them.
- Rebuild S09 (9:7722) and S11 (9:7820) in place (keep names and ids, replace contents). New frames go in Section 9:7426 under their parents. Cross-track: S06 and S13 own their own frames; this track only asks them for the three changes listed in section I.
- Tokens only (brand variables, library `card` for white). One documented exception: WhatsApp green #25D366 on the WhatsApp target circle (third-party brand mark, not a variable).
- Text styles from the build guide. Inter. Indian number format, 12-hour clock, no em or en dashes. Money is set with the Foundations component Ohm / Amount: L = digits Text-4xl/Semi Bold ink-strong 36 with the rupee sign 26 in ink-muted, M = digits 24 with the rupee sign 18. (This replaces the earlier 30 / 20 and 36 / 24 pairs.)
- Minimum text size on any share card is Text-sm (14). No Text-xs on a card. Reason: in a WhatsApp chat the image is shown at about 70% of its width, so 12 px would land near 8 px.
- Buttons are the one system: primary = Button Default Rounded 50 tall; secondary = Outline Rounded 44 tall; tertiary = Ghost Rounded 44 tall; 8 between. Drawer titles equal the button labels: "Share with owner", "Share receipt".
- R1: the white Share card has NO stroke (white card on the grey preview well, borderless). The exported PNG is the well, not the bare card (see code notes), so the card keeps an edge on any chat background without a stroke.
- R3: pending (waiting on someone else) is warning with the clock; success is passed, paid, saved; the card never colours a pending payment green.
- Policy for the one rupee gap (decision, applied everywhere): the bill total (₹36,42,160) and the pay-by amount (₹36,09,190) are printed together only on the Unpaid+Clear card and its message, exactly as S06 prints them. Subtracting gives ₹32,970 against the stated saving of ₹32,971; this is a known data issue shared with S06 (the 7 parts sum to ₹36,42,169, rounded to ₹36,42,160) and is NOT footnoted on the card. The Look cards print the bill total and the saving only (never the pay-by amount). The Paid cards print the amount paid and the saving only (never the bill total). If the lead wants zero exposure, the one-step cut is to hide the bill total on every owner card.

B. SHARE CARD SYSTEM (local component set "Share card" on Foundations, Section "Components · Share")
Properties: Payment = Unpaid | Paid, Checks = Clear | Look. Frame 337 wide, height hugs, vertical auto layout gap 0, clip ON, fill `card`, radius 16, no stroke, no shadow, no buttons, no animation (it is the thing that is exported).
Heights (sums shown in B2): Unpaid+Clear 428, Unpaid+Look 518, Paid+Clear 438, Paid+Look 490.

B1 Status band (child set "Status band", Payment = Unpaid | Paid, 337 x 56)
- Horizontal auto layout, padding 8 16, gap 12, centred vertically, fills card width, top corners follow the card (clip).
- Lucide icon 20 (stroke 2), then a text column: label Text-sm/Semi Bold `ink-strong` (20) over sub Text-sm/Regular `ink-muted` (20). Text is always ink so contrast stays above 4.5:1; only the fill and the icon carry the tone.
- Unpaid: fill `surface-muted`, `clock` in `ink-muted`. "Unpaid" / "Due Wed 16 Sep". (The due date moved here from the amount block, so it is said once.)
- Paid: fill `warning-subtle`, `clock` in `warning`. "Paid" / "Waiting for Northgrid to confirm". Same tone and icon as the S11 Status badge (Foundations R3, pending).
- The band says payment state only. It never says how the checks went; the stamp and the issue panel do that. Unpaid+Look therefore wears the same grey band as Unpaid+Clear, and the amber lives in the issue panel and the stamp.

B2 Body (below the band): vertical auto layout, padding 16, gap 12, children fill 305. Order per variant:
- Unpaid+Clear (428): title block, amount, offer strip, change row, stamp.
- Unpaid+Look (518): title block, amount, issue panel, pay line, stamp (Look).
- Paid+Clear (438): title block, amount with date, receipt panel, stamp.
- Paid+Look (490): title block, amount with date, receipt panel, issue line, stamp (Look).
Height sums: Unpaid+Clear 56 band + 16 + 44 + 12 + 40 + 12 + 80 + 12 + 40 + 12 + 88 + 16 = 428. Unpaid+Look 56 + 16 + 44 + 12 + 40 + 12 + 190 + 12 + 20 + 12 + 88 + 16 = 518. Paid+Clear 56 + 16 + 44 + 12 + 62 + 12 + 120 + 12 + 88 + 16 = 438. Paid+Look 56 + 16 + 44 + 12 + 62 + 12 + 120 + 12 + 40 + 12 + 88 + 16 = 490.

Items:
1. Title block (44, gap 0): "August electricity bill" Text-base/Semi Bold `ink-strong` (24) over "Harbourline Hotels, Riverside" Text-sm/Regular `ink-muted` (20). ("Northgrid HT" is gone: jargon. Northgrid is named in the stamp.)
2. Amount: instance Ohm / Amount L (40 tall). Unpaid and Look: ₹36,42,160. Paid: ₹36,09,190, then 2 below a date line "3 Sep 2026, 11:42 AM" Text-sm/Regular `ink-muted` (20), total 62. The small "Bill total" and "Amount paid" labels are dropped: the title above and the band name the amount.
3. Offer strip (Unpaid+Clear, 80): a Variant of the Foundations component Early payment (Strip) called "Share": fill `primary-subtle`, radius 12, padding 12, gap 4. "Pay by Tue 8 Sep" Text-sm/Medium `ink-muted` (20); row (32, space between, baseline aligned): Ohm / Amount M "36,09,190" and right-aligned "Saves ₹32,971" Text-sm/Semi Bold `success`. Same three facts as every Early payment (pay what, by when, what it saves); the day bar and the late amount stay on S06. Only the saving is green.
4. Change row (Unpaid+Clear, 40): 28 circle fill `surface-muted`, Lucide `arrow-up` 16 `ink-muted`, gap 12, text column: "Up ₹53,820 from July" Text-sm/Medium `ink` (20) over "Usage rose 1.8%" Text-sm/Regular `ink-muted` (20). Neutral on purpose: a 1.5% rise is not a warning (S06 owner is asked to match, section I). Derivation: ₹36,42,160 minus ₹35,88,340 = ₹53,820. The July bill total itself is never printed; no July paid or saved figure appears on any card.
5. Receipt panel (Paid, 120): fill `surface-muted`, radius 12, padding 12, gap 8. Two Receipt rows (20, label left Text-sm/Regular `ink-muted`, value right): "You saved" / "₹32,971" (value Text-sm/Semi Bold `success`); "Method" / "Net banking, HDFC Bank" (Text-sm/Medium `ink`). Third row is stacked and left aligned (20 + 20, gap 0): "Reference" label over "UTR HDFCR52026090312345" Text-sm/Medium `ink`, so the long reference never wraps. 12 + 20 + 8 + 20 + 8 + 40 + 12 = 120.
6. Issue panel (Unpaid+Look, 190): fill `warning-subtle` (same family as S13's own card), radius 12, padding 12. Row 1 (20): Lucide `triangle-alert` 16 `warning`, 6 gap, "Contract demand changed" Text-sm/Semi Bold `ink-strong`. 4 gap. Row 2 (40, two lines): "Contract demand is the power you booked. No change was requested." Text-sm/Regular `ink-muted` (the plain-words gloss, said once). 8 gap. Row 3 Bar pair (46). 8 gap. Row 4 (40, two lines): "₹4,620 more this month. ₹55,440 a year if it repeats." Text-sm/Semi Bold `warning`. 12 + 20 + 4 + 40 + 8 + 46 + 8 + 40 + 12 = 190. Derivation: 4,620 x 12 = 55,440.
7. Pay line (Unpaid+Look, 20, one line): "Pay by Tue 8 Sep and still save ₹32,971." Text-sm/Regular `ink`. It answers "can we still pay and keep the discount" without repeating the pay-by amount.
8. Issue line (Paid+Look, 40): Lucide `triangle-alert` 16 `warning`, 6 gap, "Contract demand changed: 900 kVA, the first bill said 700 kVA." Text-sm/Medium `ink` (two lines).
9. Ohm stamp (see B4).

B3 Bar pair (component "Bar pair (kVA)", 281 x 46)
- Vertical, gap 6, two rows of 20. Row widths add up: label 64 + gap 8 + bar zone 137 + gap 8 + value 64 = 281.
- Label Text-sm/Regular `ink-muted`: "First bill", "This bill". Value right aligned: "700 kVA" Text-sm/Medium `ink-strong`; "900 kVA" Text-sm/Semi Bold `warning`.
- Bars 10 tall, radius 5, left aligned from zero (honest baseline): First bill 700 / 900 x 137 = 107 wide in `ink-muted` (about 6.6:1 on warning-subtle, so the baseline bar stays visible; `line` was 1.2:1 and is not used); This bill 137 wide in `warning`. No axis, no gridlines, no track. Units are printed on the values so kVA is never confused with rupees.

B4 Ohm stamp (component set, Checks = Clear | Look, 305 x 88)
- Horizontal auto layout, padding 12, gap 10, top aligned, radius 12, 1 px inside stroke `line`, no fill (the only outlined element on the card, so it reads as the sign-off).
- Seal: instance of `Bill status mini` 36 x 36, State = Checked (Clear) or Flagged (Look). Same tiny bill with a tick that Home and S07 use, so Home, S07 and the card read as one object.
- Text column (fill 235, gap 2). L1 (20, space between): Lucide `zap` 14 `primary` + 4 + "Checked by Ohm" Text-sm/Semi Bold `ink-strong` on the left (the Ohm bolt is the brand mark the lead liked); "3 Sep 2026" Text-sm/Regular `ink-muted` on the right. L2 (20): Clear "No hidden charges or penalties" Text-sm/Medium `success`; Look "1 changed setting found" Text-sm/Medium `warning` (S07 defines hidden charges as wrong rates, changed settings or penalties, so the Look stamp states the count in plain words and never claims the reassurance phrase). L3 (20): "From the Northgrid bill of 1 Sep" Text-sm/Regular `ink-muted`.
- What it attests, in order: when Ohm checked (3 Sep 2026), the result in plain words, and the source (read from the bill issued 1 Sep). L2 has no icon; the seal and the colour carry the tone. Measured fit in 235: L2 about 209, L3 about 220, L1 about 200.

C. SHARE DRAWER (shadcn Drawer, shared by S09, S11.1, S13.2; component "Share drawer", 393 wide, height hugs)
- Vertical auto layout pinned to the bottom of the frame, fill `card`, top corners radius 16, bottom 0, 1 px top and side inside stroke `line`, clip ON.
1. Handle zone (24): kit Drawer handle (pill 100 x 8, fill `line`), centred, 8 from the top.
2. Header (52): title centred, Text-lg/Semi Bold `ink-strong`. Close = Ghost Icon Button Rounded 44 x 44 at x 333 (16 from the right), Lucide `x` 20 `ink`, aria-label "Close".
3. Body (scrolls only when the card cannot be scaled to fit): padding 0 16 16. Inside, the "preview well": vertical, padding 12, fill `surface-muted`, radius 16, width 361; the Share card (337) is centred at 100%.
4. Footer (151, sticky): 1 px top border `line`; padding 16 16 50 (the 50 contains the 34 safe area; in Safari with a toolbar the safe area is 0 and the footer is 117). Three equal columns of 120, tile 120 x 84: Share target instances (button 56 + gap 8 + label Text-sm/Medium `ink` 20).
- Heights at 100%: 24 + 52 + (12 + card + 12 + 16) + 151 = 267 + card. S09 695, S11.1 705, Paid+Look 757, S13.2 785. A drawer never starts above y 67 (5 below the status bar).
- Fit to height (this is how the lead's "no clipped content" is met on a real iPhone): in the browser the drawer is capped at 100dvh minus max(24px, safe-area-top). The card is scaled to fit: s = max(0.72, min(1, availableWidth / 337, availableBodyHeight / cardHeight)), where availableBodyHeight is the body height minus 40 (well padding 24 plus bottom padding 16). Worked example, Safari viewport 664 high: drawer 640, body 447, card room 407. Unpaid+Clear s = 0.95, Paid+Clear 0.93, Paid+Look 0.83, Unpaid+Look 0.79. All four show the offer, the issue and the Checked by Ohm stamp without scrolling. Below s = 0.72 (very short phones) the body scrolls and the stamp is reachable. In a standalone web app (852 high) all four cards show at or near 100%.

Share target (component set "Share target", Brand = WhatsApp | Email | Copy, State = Default | Copied | Disabled)
- WhatsApp: 56 circle filled #25D366 (documented exception) with the white WhatsApp glyph 28. Glyph source in order: Remix `whatsapp-fill`, Phosphor `whatsapp-logo` (Fill), Tabler `brand-whatsapp`. Never Lucide message-circle. White on #25D366 is about 2:1: acceptable only because it is the brand mark; the label below carries the name. Fallback if the lead wants it calmer: glyph in #25D366 on a `surface-muted` circle.
- Email and Copy: Icon Button Secondary Rounded resized to 56 (fill `surface-muted`), Lucide `mail`, `copy` 24 in `ink`. Copy label is a property: "Copy text" now, "Copy link" only once a hosted link exists (see open questions).
- Copied (Copy only, 2 s): icon `check` in `success`, label "Copied" in `success`, announced with aria-live polite. No toast: the in-place flip is the only confirmation.
- Disabled (while the PNG renders, usually 300 to 800 ms after the drawer opens): whole tile at 50% opacity, aria-disabled, not tappable.
- Pressed: scale 0.96, 80 ms.
- Failure toast (component "Toast / Error", shown only on failure): Sonner destructive, top-center, offset calc(env(safe-area-inset-top) + 16px), 361 x 52, fill `card`, 1 px `line`, radius 12, shadow y 4 blur 12 `ink-strong` at 12%, Lucide `circle-alert` 20 `danger`, "Could not share. Try Copy text." Text-sm/Medium `ink-strong`. Drawer stays open.

D. S09 SHARE (393 x 852, fill `surface-muted`)
Layers bottom to top: "S09 (behind)" = clone of the FINAL S06 (build this after the S06 track lands), status bar hidden, reactions stripped; Overlay rect 393 x 852 `ink-strong` at 50%; "Share drawer" (title "Share with owner", card Payment=Unpaid, Checks=Clear) at y 157, height 695, so 157 of the dimmed S06 shows above it; Status bar instance at y 0; iOS Home indicator at y 818 (absolute, on top).
- Card top to bottom: grey band "Unpaid / Due Wed 16 Sep", title block, ₹36,42,160, blue offer strip (Pay by Tue 8 Sep, ₹36,09,190, Saves ₹32,971), neutral change row (Up ₹53,820 from July, Usage rose 1.8%), Ohm stamp (Clear).
- Footer targets: WhatsApp, Email, Copy text.

E. S11 PAID (393 x 852; grows only if content ends below 700; footer stays pinned)
Fill `surface-muted`. Top to bottom (y, height):
- Status bar instance (0, 62). No nav bar (end of flow).
- Illustration / Paid bill instance, centred (x 112), y 80, 168 x 194 (ends 274). Decorative: aria-hidden, the title carries the meaning. Replaces the 96 px green circle.
- Title row, centred (y 290, 40, ends 330), one baseline-aligned row, gap 8: "Paid" Text-4xl/Semi Bold `ink-strong`, then Ohm / Amount L (rupee sign 26 `ink-muted`, digits "36,09,190" Text-4xl/Semi Bold `ink-strong`). About 300 wide, fits 361. This matches the Foundations screen fix for S11.
- Date (y 334, 20): "3 Sep 2026, 11:42 AM" Text-sm/Regular `ink-muted`, centred.
- Saving chip (y 366, 24, ends 390): Ohm / Tone badge, Success: fill `success-subtle`, `circle-check` 12 and text "You saved ₹32,971" in `success`, Text-xs/Medium (the kit badge size). Centred.
- Receipt card (x 16, y 414, 361 x 192, ends 606): library `card`, radius 16, no stroke, padding 0 16, four Key-value rows of 48 with Separators in `line`. Label Text-sm/Regular `ink-muted` left, value Text-sm/Medium `ink` right. Rows: "Bill" / "August 2026"; "Method" / "Net banking, HDFC Bank"; "Reference" / "UTR HDFCR52026090312345"; "Status" / Ohm / Tone badge Warning with `clock` 12, "Paid, waiting for Northgrid to confirm". Unchanged apart from the clock the Foundations screen fix already adds (the lead said this part looks fine).
- NO caption. "We will notify you when Northgrid confirms." is deleted: it promised a capability nobody has confirmed and repeated the Status row one line above it.
- Footer, pinned (y 700 to 852, 152): fill `card`, 1 px top border `line`, padding 16 16 0. Button "Share receipt" (Default, Rounded, 50 tall, full width, Lucide `share` 16 left), 8 gap, Button "Done" (Ghost, Rounded, 44 tall, full width), then the 34 home indicator zone: 16 + 50 + 8 + 44 + 34 = 152, the same as S06, S10 and S13.
- Spare space between the receipt card and the footer is 94; if text scale grows the content, the frame grows and the footer stays at the bottom. In the browser the content scrolls above the pinned footer.

F. S11.1 AND S13.2 (see new_screens), S09.1 is S09 with Copy target State = Copied.

G. COMPONENTS TO ADD ON FOUNDATIONS (Section "Components · Share"): Share card (4 variants), Status band, Ohm stamp, Bar pair (kVA), Receipt row, Early payment / Share (variant of C3), Share target, Share drawer, Toast / Error, Illustration / Paid bill. Reuse and do not edit: Status bar, Bill status mini, Ohm / Amount, Ohm / Tone badge, Key-value row, Illustration / Reading your bill (S04). The Paid+Look card is not its own screen frame; it lives on the component board (and in the build it is what S11.1 shows when the paid bill had a flagged check).

H. DATA-DRIVEN VARIANTS NOT DRAWN AS FRAMES (build rules, listed so nothing is surprising after 8 Sep)
- Offer = Ended (Wed 9 Sep to Wed 16 Sep): the offer strip is removed, the band stays "Unpaid / Due Wed 16 Sep", the card is 92 shorter (336). Offer = Overdue (after Wed 16 Sep): band becomes warning with `clock`, "Unpaid" / "Was due Wed 16 Sep", the amount becomes the payable ₹36,87,690 (the bill's after-due figure), strip removed. Copy needs sign-off (open questions).
- The image is a snapshot as of the stamp date. Once Northgrid confirms, a re-share produces a Paid card with a confirmed band (copy to be set when the signal exists).

I. CROSS-TRACK ASKS (not edited here)
- S06 and S13 "Share with owner" (Outline Rounded, 44) gain the Lucide `share` 16 left icon so the three share buttons match S11 "Share receipt".
- S06's "Up 1.5% from July" arrow chip is amber (warning); a normal rise reads as an alert. Suggest surface-muted with an ink-muted arrow, as on the card.
- S11 "Done" lands on S01 Home, which needs a paid state for the August bill card once paid.

J. BUILD ORDER
1 Bar pair, Receipt row, Status band, Ohm stamp. 2 Share card set; check heights 428 / 518 / 438 / 490 and that no text wraps beyond the spec. 3 Share target set (import the WhatsApp glyph first, slow library import). 4 Share drawer. 5 S09, S09.1, S11.1, S13.2, S13.3 (S09 behind comes from the final S06, last). 6 Illustration / Paid bill (own component, copied from the measured S04 geometry; never edit the S04 master). 7 S11. 8 Prototype links. 9 Rebrand pass on every frame (skip layers named iOS / ...), then the duplicate-text scan (a timed-out call can run twice).

## Copy

- **S09 / Drawer title**: Share with owner
- **S09 / Close button aria-label**: Close
- **S09 / Target 1**: WhatsApp
- **S09 / Target 2**: Email
- **S09 / Target 3 (becomes "Copy link" only when a hosted link exists)**: Copy text
- **S09 / Target 3 after tap (2 s, in place, also announced with aria-live polite)**: Copied
- **S11.1 / Drawer title**: Share receipt
- **S13.2 / Drawer title**: Share with owner
- **Card / Band label (Unpaid)**: Unpaid
- **Card / Band sub (Unpaid)**: Due Wed 16 Sep
- **Card / Band label (Paid)**: Paid
- **Card / Band sub (Paid)**: Waiting for Northgrid to confirm
- **Card / Title**: August electricity bill
- **Card / Subtitle**: Harbourline Hotels, Riverside
- **Card / Amount (Unpaid, Look)**: ₹36,42,160
- **Card / Amount (Paid)**: ₹36,09,190
- **Card / Amount date line (Paid)**: 3 Sep 2026, 11:42 AM
- **Card / Offer strip label (Unpaid)**: Pay by Tue 8 Sep
- **Card / Offer strip amount (Unpaid)**: ₹36,09,190
- **Card / Offer strip saving (Unpaid)**: Saves ₹32,971
- **Card / Change row title (Unpaid)**: Up ₹53,820 from July
- **Card / Change row sub (Unpaid)**: Usage rose 1.8%
- **Card / Receipt row 1 (Paid)**: You saved | ₹32,971
- **Card / Receipt row 2 (Paid)**: Method | Net banking, HDFC Bank
- **Card / Receipt row 3 (Paid, stacked)**: Reference / UTR HDFCR52026090312345
- **Card / Issue panel title (Look)**: Contract demand changed
- **Card / Issue panel desc (Look)**: Contract demand is the power you booked. No change was requested.
- **Card / Bar pair labels and values (Look)**: First bill | 700 kVA ; This bill | 900 kVA
- **Card / Issue panel cost (Look)**: ₹4,620 more this month. ₹55,440 a year if it repeats.
- **Card / Pay line (Unpaid+Look)**: Pay by Tue 8 Sep and still save ₹32,971.
- **Card / Issue line (Paid+Look)**: Contract demand changed: 900 kVA, the first bill said 700 kVA.
- **Ohm stamp / L1**: Checked by Ohm
- **Ohm stamp / L1 right**: 3 Sep 2026
- **Ohm stamp / L2 (Clear)**: No hidden charges or penalties
- **Ohm stamp / L2 (Look)**: 1 changed setting found
- **Ohm stamp / L3**: From the Northgrid bill of 1 Sep
- **S11 / Title (Paid + Ohm / Amount L)**: Paid ₹36,09,190
- **S11 / Date**: 3 Sep 2026, 11:42 AM
- **S11 / Saving chip**: You saved ₹32,971
- **S11 / Receipt row labels and values**: Bill | August 2026 ; Method | Net banking, HDFC Bank ; Reference | UTR HDFCR52026090312345 ; Status | Paid, waiting for Northgrid to confirm (Warning badge with clock)
- **S11 / Caption**: Deleted (no caption)
- **S11 / Primary button (Lucide share 16 left)**: Share receipt
- **S11 / Ghost button**: Done
- **S11 / Illustration**: No text on the paper. Decorative, aria-hidden. The PAID stamp is removed.
- **Share message, Unpaid+Clear (WhatsApp text and Email body; add the link on a new line only once a hosted link exists)**: August electricity bill from Northgrid: ₹36,42,160, due Wed 16 Sep. Not paid yet. Paying ₹36,09,190 by Tue 8 Sep saves ₹32,971. Checked by Ohm: no hidden charges or penalties.
- **Share message, Paid+Clear**: Paid the August electricity bill from Northgrid: ₹36,09,190 on 3 Sep 2026, 11:42 AM, saving ₹32,971. Waiting for Northgrid to confirm. Reference: UTR HDFCR52026090312345.
- **Share message, Unpaid+Look**: August electricity bill from Northgrid: ₹36,42,160, due Wed 16 Sep. Not paid yet. 1 thing to look at: contract demand is 900 kVA, the first bill said 700 kVA, and no change was requested. It costs ₹4,620 more this month, ₹55,440 a year if it repeats. You can still pay by Tue 8 Sep and save ₹32,971.
- **Share message, Paid+Look**: Paid the August electricity bill from Northgrid: ₹36,09,190 on 3 Sep 2026, 11:42 AM, saving ₹32,971. Waiting for Northgrid to confirm. Reference: UTR HDFCR52026090312345. One thing is still open: contract demand is 900 kVA, the first bill said 700 kVA.
- **Email subjects (Unpaid+Clear ; Paid ; Unpaid+Look ; Paid+Look)**: August electricity bill, ₹36,42,160, due 16 Sep ; Paid: August electricity bill, ₹36,09,190 ; August electricity bill: 1 thing to look at ; Paid: August electricity bill, ₹36,09,190, 1 thing still open
- **Card preview alt text pattern (on the preview well, role img)**: Preview of the card that will be sent. Status: <payment state and its sub line>. <amount line>. <checks result>. Checked by Ohm on 3 Sep 2026.
- **Share failed toast (destructive)**: Could not share. Try Copy text.

## Illustrations

### Illustration / Paid bill (S11 success visual, replaces the green check circle)
- Concept: The S04 bill page Neha watched Ohm read, now finished. Same white paper, rounded skeleton lines, Mark chip and round corner badge as S04, drawn as one whole drawing at 0.75 scale (Foundations 5.1: scale the whole drawing, never one part), so the app starts and ends with the same object. Three differences from S04, all inside the Foundations Always and Never lists: the scan line and glow are gone (reading has stopped), the table block turns success-subtle (the one accent moves from blue to green), and the corner badge shows the Done check. No words, no figures, no gradient, no shadow, one badge, no crop, no stamp. No bare check in a circle anywhere.
- Construction: Own component (a sibling, never an edit of the S04 master; S04 is being rebuilt by another track). Built from the measured Foundations 5.1 geometry of Illustration / Reading your bill (frame 224 x 258, paper 180 x 232, Mark 22, lines 148 / 104 / 133, Skeleton Card 148 x 70, lines 118 / 81, badge 52) at 0.75 and rounded to whole points. Frame 168 x 194, clip off, no fill. (1) Paper 136 x 174 at (16, 0): fill `card`, radius 11, 1 px inside stroke `line`, vertical auto layout, padding 12, gap 7. Head row: Mark chip 16 x 16, radius 5, `primary-subtle`, Lucide zap 10 in `primary` (it stands for the power company's logo, identical to S04 so it reads as the same bill), 6 gap, kit Skeleton Text 88 x 8. Three kit Skeleton Text lines 6 tall: 112, 78, 100 wide. Block 112 x 52, radius 9, fill `success-subtle`, empty (replaces S04's grey Skeleton Card). Two kit Skeleton Text lines 6 tall: 88 and 61 wide. The 10 left at the bottom stays empty, as in S04. (2) Badge: 40 circle at (128, 154), fill `success-subtle`, no stroke, no shadow, Lucide check 18 (24 x 0.75), stroke 2, `success`. Its centre (148, 174) sits on the paper's bottom edge, 4 in from the right edge, exactly as in S04's Done state. Frame bottom 194 = paper 174 + 20 badge overhang. Icon sizes 10 and 18 are the only places Lucide is not 12 or 24; they come from the whole-drawing scale. If the S04 track ships a different page (for example the 200 x 264 Indian HT bill with a Total box), re-measure, tint that single accent block success-subtle, leave out any real rupee glyph (Foundations Never: real figures or words on the paper), and choose the scale that keeps the frame near 194 tall (about 0.67 for a 264 page). If the lead prefers no tint, swap in S04's own Hero / Done at the same scale.
- Hover: No hover on touch. First view only: the tick draws in over 160 ms (stroke-dashoffset), starting 200 ms after the screen appears. Reduce Motion: static final state. No stamp slam, no ring pulse, no tap replay. aria-hidden.
### Ohm stamp (the richer "Checked by Ohm" attestation block)
- Concept: A small bordered block at the foot of every share card that works as the signature. The seal is the same tiny bill wearing a tick that Home and S07 use; beside it the Ohm bolt and "Checked by Ohm" keep the branding the lead liked; then three plain lines say what Ohm vouches for: when it checked, the result, and the source. When a check fails it states the count of changed settings instead of the reassurance phrase.
- Construction: Component set Checks = Clear | Look, 305 x 88, radius 12, 1 px inside stroke `line`, padding 12, gap 10, no fill, no shadow. Seal: Bill status mini instance 36 x 36 (Checked or Flagged). Text column 235 wide: L1 Lucide zap 14 `primary` + "Checked by Ohm" Text-sm/Semi Bold `ink-strong`, "3 Sep 2026" Text-sm/Regular `ink-muted` right aligned; L2 Text-sm/Medium, Clear: "No hidden charges or penalties" in `success`, Look: "1 changed setting found" in `warning`; L3 "From the Northgrid bill of 1 Sep" Text-sm/Regular `ink-muted`. Every line is 20 tall.
- Hover: None. Static in the drawer and in the exported image.
### Bar pair (kVA), the visual aid on the Needs a look card
- Concept: A two-bar comparison so a non-technical reader sees the problem without reading: the first bill's 700 kVA against this bill's 900 kVA. Labelled, units printed on each value, honest zero baseline, one amber bar for the new figure. The lead's liked bar-chart idea at the smallest scale; kVA stays clearly apart from rupees.
- Construction: Frame 281 x 46 inside the Issue panel, vertical, gap 6, two rows of 20. Row: label 64 (Text-sm/Regular `ink-muted`: First bill, This bill) + 8 + bar zone 137 + 8 + value 64 right aligned (Text-sm/Medium `ink-strong` 700 kVA; Text-sm/Semi Bold `warning` 900 kVA). Bars 10 tall, radius 5, from zero: First bill 107 wide in `ink-muted` (6.6:1 on warning-subtle; `line` failed at 1.2:1), This bill 137 wide in `warning`. No axis, no gridlines, no track. 64 + 8 + 137 + 8 + 64 = 281.
- Hover: On drawer open the bars grow from 0 width (400 ms, ease out, 60 ms stagger). Reduce Motion and the exported image show final widths.
### Share target / WhatsApp mark
- Concept: A real brand mark instead of the speech bubble: the WhatsApp glyph in white on WhatsApp green, a deliberate third-party exception. It is the only saturated colour in the footer, which is right because WhatsApp is how an Indian finance manager sends something to the owner.
- Construction: 56 circle, fill #25D366 (documented exception, kept in one constant, no variable), glyph 28 white from the library's Remix whatsapp-fill (else Phosphor whatsapp-logo Fill, else Tabler brand-whatsapp). Label "WhatsApp" Text-sm/Medium `ink` below, gap 8. Fallback if the lead wants it calmer: glyph in #25D366 on a `surface-muted` circle.
- Hover: Pressed: scale 0.96 over 80 ms. No hover on touch.

## New screens

### S09.1 Text copied
- Purpose: Shows the in-place Copied state (the only confirmation, no toast) so the build has a real pattern.
- Layout: Frame 393 x 852 at x 3864, y 1092. Clone of S09 with one change: Share target Copy set to State = Copied (check icon in `success`, label "Copied" in `success`). After delay 2000 ms returns to S09 (Smart animate 200 ms).
### S11.1 Share receipt
- Purpose: The share-receipt preview the lead asked for: Neha sees exactly the card the owner will receive, with Paid status, and sends it from here.
- Layout: Frame 393 x 852 at x 4810, y 1092. Layers: clone of S11 (behind, reactions stripped); overlay `ink-strong` 50%; Share drawer (height 705, y 147) titled "Share receipt" containing the Share card Payment=Paid, Checks=Clear (438 tall: warning band with clock "Paid / Waiting for Northgrid to confirm", title block, ₹36,09,190 with "3 Sep 2026, 11:42 AM", receipt panel You saved ₹32,971 / Method / Reference, Ohm stamp Clear); footer targets WhatsApp, Email, Copy text; Status bar and Home indicator on top. Close and overlay tap return to S11. The Paid+Look card (490, drawer 757 at y 95) is the same frame with that variant swapped in and lives only on the component board.
### S13.2 Share preview (Needs a look)
- Purpose: Lets Neha tell the owner that one thing needs a look while keeping the pay decision clear. Named S13.2 because S13.1 is already "Check failed, your number" (node 11:16853).
- Layout: Frame 393 x 852 at x 5756. Read S13.1's y first; if S13.1 is in the n = 0 slot (y 1092), S13.2 goes at y 2104. Layers: clone of S13 (behind, reactions stripped); overlay `ink-strong` 50%; Share drawer (height 785, y 67, so it clears the status bar) titled "Share with owner" containing the Share card Payment=Unpaid, Checks=Look (518 tall: grey band "Unpaid / Due Wed 16 Sep", title block, ₹36,42,160, warning-subtle issue panel with Contract demand changed, gloss, kVA Bar pair and the cost line, pay line "Pay by Tue 8 Sep and still save ₹32,971.", Ohm stamp Look with "1 changed setting found"); footer targets; Status bar and Home indicator (y 818) on top. The frame stays 852; if a future card makes the drawer taller than 785 the frame grows by the excess and the drawer keeps a 67 top gap.
### S13.3 Share preview, short screen
- Purpose: Proves the drawer fits a real iPhone Safari viewport (about 664 high with toolbars), which is the worst case for the tallest card, so the Checked by Ohm stamp is never below the fold.
- Layout: Frame 393 x 664 at x 5756, y = S13.2's y + 1012. It is the browser viewport only: no status bar, no home indicator (Safari toolbars sit outside it). Dimmed S13 clone behind, drawer 640 high at y 24 (24 top gap). Handle 24, header 52, body 447 (well 361 x 431, 12 padding, 16 bottom), footer 117 (no safe area). The Share card instance is rescaled to 0.79 (265 x 409) with the whole instance, as the build's scale-to-fit does, so the issue panel, pay line and stamp are all visible. Label on the frame: "Safari viewport 664".

## Interactions

- S06 or S13 tap "Share with owner" (Outline Rounded 44, Lucide share 16 left) -> Navigate to S09 (S13 goes to S13.2). Overlay fades to ink-strong 50% (200 ms), drawer slides up (280 ms, ease out). In the build the shadcn Drawer opens and the PNG starts rendering at once.
- S09, S11.1 or S13.2: tap the X, tap the dimmed area, or drag the drawer down -> Drawer slides down (220 ms) and the screen underneath is shown again (Figma: Back). Focus returns to the button that opened it (Share with owner or Share receipt).
- Drawer opens (any) -> Targets show State = Disabled until the PNG is ready (about 300 to 800 ms), then enable. On Unpaid+Look and Paid+Look the kVA bars grow from 0 (400 ms, ease out, 60 ms stagger). The exported image always shows the final state. Reduce Motion: no growth.
- Tap WhatsApp (S09 or S13.2) -> Build: if the PNG file is ready and navigator.canShare({ files }) is true (iPhone Safari, Android Chrome), call navigator.share({ files: [card.png], text: message }) synchronously inside the tap; the system share sheet opens and WhatsApp is one tap there, with the card image attached. Otherwise (desktop, or file sharing unsupported) open https://wa.me/?text=<message>, text only. Prototype: Navigate to the parent screen (S06 or S13), standing for coming back from WhatsApp. No toast.
- Tap Email -> Build: mailto: with the status subject and the pre-filled message (mailto cannot attach the image, so the message repeats every key fact). Prototype: back to the parent screen.
- Tap Copy text -> navigator.clipboard.writeText(message). The target flips in place to a check in success and the label "Copied" for 2 s, announced with aria-live polite. No toast. Prototype: Navigate to S09.1 (same drawer, Copied state); S09.1 after delay 2000 ms returns to S09 (Smart animate 200 ms).
- S11 tap "Share receipt" -> Navigate to S11.1 (same drawer motion). Drawer titled "Share receipt" shows the Paid card (Paid+Look if the paid bill had a flagged check).
- S11 tap "Done" -> Navigate to S01 Home (Push left, 300 ms). Needs the paid state on S01 (cross-track ask).
- S11 first view, no touch -> One calm motion only: the corner badge tick draws in over 160 ms, starting 200 ms after the screen appears. No page rise, no stamp, no ring pulse, no replay on tap. Reduce Motion: final state, no motion.
- S13 tap "Share with owner" -> Navigate to S13.2 (drawer with the Unpaid+Look card).
- Viewport shorter than the drawer needs (iPhone Safari with toolbars, about 664 high) -> The card scales to fit (floor 0.72) so the stamp stays above the fold; handle, header and target row stay pinned. S13.3 shows the worst case. Below the floor the body scrolls.
- Share or copy fails -> Destructive toast "Could not share. Try Copy text." at top-center, offset 16 plus the safe-area top. The drawer stays open. If the user cancels the system sheet (AbortError) nothing is shown.
- Card data changes (after Tue 8 Sep, after Wed 16 Sep, or when Northgrid confirms) -> The card is rendered from data, so Offer = Ended or Overdue and a confirmed band appear automatically (see layout section H). A sent image is a snapshot as of the date on its stamp.

## Research

- CRED (India) https://mobbin.com/screens/afc4ae67-96ec-4ef5-b3ad-06429f738d00: Payment successful sheet: amount and timestamp lead, "share receipt" is a first-level action beside payment history and support, not buried. Supports a primary Share receipt on S11 and the plain date line.
- Gojek (Indonesia super-app, UPI-like wallet) https://mobbin.com/screens/e0e1b0bb-525d-4c56-8817-072c9855a855: The nearest PhonePe or Paytm style receipt Mobbin has: label and value rows (Status, Payment method, Time, Date, Transaction ID) with an outline Share receipt button right under them. Backs the receipt rows, the reference line and the share button directly after the receipt. Mobbin returned no PhonePe or Paytm screens.
- Careem Pay https://mobbin.com/screens/8a6663ca-f144-4f37-83a4-b2ae0cca8b8c: The success visual is an illustrated object (a plane with a coin) above the amount, with Share and Transfer again as outline buttons. Another precedent for an object instead of a bare check, and for keeping the status line to one calm word.
- Lloyds Mobile Banking https://mobbin.com/screens/2b966b9f-f6f5-461a-aa99-7c942a862619: A neutral paper-plane drawing, "Success", and a grey clock note ("should be received within two hours") for the pending part. Supports the clock on our pending band and not painting a pending payment green.
- Starling https://mobbin.com/screens/3c46b304-4259-4c8f-89cd-c2a54b3f1ebf: A calm "Paid" chip plus one sentence about settlement time in the same block, with label and value rows below. Model for our Paid band with "Waiting for Northgrid to confirm".
- Setel https://mobbin.com/screens/04020309-c2eb-4e19-ad07-2bd1458f2883: A round green tick badge sits on the edge of the receipt card and a labelled Share receipt button sits directly under the rows. Same idea as our corner badge on the paid page and the share button right after the receipt.
- Vipps https://mobbin.com/screens/5728a722-78c7-44eb-897b-bb3d3342f45e: Green Paid pill above a big amount, then a Share receipt tile, then Paid with / Date / Reference rows. Confirms the order status, amount, receipt rows.
- Lyft https://mobbin.com/screens/4db751b8-295c-411f-b282-9b34c2e56fec: The success visual is an object (a gift box) wearing a small green check badge on its corner, not a bare check circle. Direct precedent for the bill page wearing a tick badge.
- Shopee (counter-example) https://mobbin.com/screens/b590eb87-2252-4566-84ac-9d005dcb24b9: The big solid green check in a circle above the amount is the pattern the lead rejected ("looks ridiculous"); shown only as what to avoid.
- WhatsApp (iOS) https://mobbin.com/screens/f4b2a53f-3808-4040-b48c-df6d7ca27779: What the owner actually sees: a shared image full width with an "Add a caption" field under it. The card therefore has to be a self-contained image (every key fact on it, text 14 px or more), and the message text is only a caption that some apps drop.
- Bond https://mobbin.com/screens/49fe7bab-bf43-4af0-ae4f-b64cc53888f2: Share sheet with a full card preview and a row of round targets where WhatsApp is the real green mark with a white glyph while Copy link and Messages stay neutral. Basis for the Share target row.
- Brink https://mobbin.com/screens/030d8444-998f-4263-aa6a-9ed1a7d3c072: A tall sheet whose main content is the share card itself at near full size, with a small brand mark at the card foot. Supports showing the card at 100% and the Checked by Ohm stamp as quiet branding.
- Lovi https://mobbin.com/screens/409a8184-2efd-4fef-ad33-e178946c6ccf: The Copy target flips to "Copied!" in place instead of opening something new, with no separate toast. Used for the Copied state, and the reason the toast is dropped.
- Substack (web) https://mobbin.com/screens/f75bc251-6022-4fd1-9f95-e61a86c8fdfa: Preview card on top, then a single row of equal round targets with labels under each (Copy link, Email, More). The same footer structure we use, in three columns.

## Code notes
Build mapping (shadcn/ui, Tailwind):
- Drawer: shadcn Drawer (vaul). DrawerContent className "flex flex-col rounded-t-2xl border bg-card max-h-[calc(100dvh-max(24px,env(safe-area-inset-top)))]". Stock handle (bg-line). DrawerHeader fixed (DrawerTitle text-lg font-semibold text-center, DrawerClose ghost icon button 44 x 44 absolute right-4 with aria-label "Close"). Body "flex-1 min-h-0 overflow-y-auto px-4 pb-4" holding the preview well "rounded-2xl bg-surface-muted p-3". Footer "border-t px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]" with "grid grid-cols-3". Overlay "bg-ink-strong/50". Return focus to the opening button on close (Radix does this when the trigger is the Dialog trigger; if the drawer is opened programmatically, store and restore document.activeElement). The preview well gets role="img" and aria-label from the alt text pattern (children are then hidden from assistive tech, so the label carries the facts).
- One React component renders the card for the drawer AND for export: <ShareCard payment="unpaid|paid" checks="clear|look" data={...} />. Fixed width 337px, no animation classes, no interactive children, min text 14px, no border.
- Scale to fit: measure the scroll body with ResizeObserver. s = Math.max(0.72, Math.min(1, (wellWidth - 24) / 337, (bodyHeight - 40) / cardHeight)). Render <div style={{ width: 337 * s, height: cardHeight * s }}><div style={{ width: 337, transform: `scale(${s})`, transformOrigin: 'top left' }}>card</div></div>. (CSS zoom also works in Safari; transform is the portable choice.)
- Export: render a second, unscaled, off-screen well (position fixed, left -9999px, width 361, padding 12, background surface-muted, border-radius 0 so the PNG has no transparent corners) containing the same <ShareCard>. Export that node, not the scaled one: html-to-image toPng(node, { pixelRatio: 3, cacheBust: true }) gives about 1083 px wide. The well is the exported image so the white card keeps an edge on any chat background without a stroke (R1). Await document.fonts.ready and inline Inter first, otherwise the rupee sign falls back. On iOS Safari the first toPng call can return a blank image: call it once, discard, call again (known quirk), or render the PNG on the server (Satori or @vercel/og).
- Render the PNG when the drawer opens, not on tap: keep { file, ready } in state; targets are aria-disabled at 50% until ready. This keeps navigator.share() synchronous inside the click handler, which iOS Safari needs (it throws NotAllowedError if user activation is lost after an await).
- Sharing: const file = new File([blob], 'ohm-august-bill.png', { type: 'image/png' }). WhatsApp: if (file && navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], text: message }) (call share without any earlier await in the handler); else window.open('https://wa.me/?text=' + encodeURIComponent(message)). Email: location.href = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message). Copy text: navigator.clipboard.writeText(message) inside try/catch, then set copied for 2000 ms and announce "Copied" in an aria-live="polite" region. Treat AbortError as success with no toast; any other error shows the destructive toast "Could not share. Try Copy text." (sonner, position top-center, offset calc(env(safe-area-inset-top, 0px) + 16px), duration 4000). When a hosted snapshot link exists: append it on a new line of the message, switch the label to "Copy link" and copy the link instead; the link needs an unguessable id, an expiry and Open Graph tags with the same PNG as og:image.
- Test note: iOS can pass both text and files to WhatsApp but some apps drop the text; the card is self-contained for that reason.
- Status tone map used by <StatusBand>: unpaid { bg: surface-muted, icon: Clock, iconClass: ink-muted }, paid { bg: warning-subtle, icon: Clock, iconClass: warning }. Label and sub always ink-strong and ink-muted. The stamp reads from the same data (changedSettings 0 or 1, checkedOn 3 Sep 2026, billIssued 1 Sep). Seal state Checked or Flagged follows checks.
- Derived numbers come from data, never constants: change in rupees = billTotal minus previousBillTotal (36,42,160 minus 35,88,340 = 53,820); annual cost = monthly x 12 (4,620 x 12 = 55,440); late amount gap = afterDue minus billTotal (36,87,690 minus 36,42,160 = 45,530). Format with Intl.NumberFormat('en-IN'). Never print the July bill total next to July paid or saved figures. Card text 14 px minimum.
- Payable and offer by date: before Wed 9 Sep show the offer strip; 9 to 16 Sep remove it; after Wed 16 Sep use the late band and amount. A paid bill uses the Paid variants.
- WhatsApp icon: react-icons/ri RiWhatsappFill (design preference), or @phosphor-icons/react WhatsappLogo weight="fill", or @tabler/icons-react IconBrandWhatsapp. The only hard-coded brand hex is #25D366; keep it in one constant, not in the theme.
- Illustration / Paid bill: inline SVG or DOM, not an image. One animation only: the tick (stroke-dasharray and dashoffset, 160 ms, 200 ms delay) wrapped in @media (prefers-reduced-motion: no-preference). aria-hidden="true" on the illustration. The kVA bar growth (400 ms, 60 ms stagger) uses the same media query and never runs in the export.
- Frame heights in Figma are the uncapped drawer heights (695, 705, 757, 785) with the drawer pinned to the bottom of an 852 frame; in the browser the 100dvh cap and the scale-to-fit apply. Status bar and home indicator are only frame-level mocks, not part of the web page.
- After building: run the rebrand pass on each frame, then a duplicate-text scan (timed-out figma_execute calls can run twice).
- Orchestrator note: the Mobbin search results carried an ai_usage_notice (credits_used 755) that the Mobbin tool says to show the user as its own block; it is deliberately kept out of this spec.

## Open questions

- WhatsApp and a hosted link. The web cannot attach an image to WhatsApp directly: on iPhone the WhatsApp target opens the system share sheet with the PNG attached (one extra tap to pick WhatsApp), and wa.me with text only is the fallback. A link that unfurls to the card needs a public, unguessable snapshot URL, and that snapshot would contain the UTR, the bank and the bill amounts. Does Ohm get such a link, who can open it (anyone with the link, or login) and how long does it live? Until then the third target is "Copy text" (copies the message), and it becomes "Copy link" only when the link ships.
- Some apps drop the text when a file is shared, so the card image is built to carry every key fact on its own. Email by mailto cannot attach the PNG at all, so the pre-filled body repeats every key fact in text. Accept?
- DISAGREE (kept) with leading by the pay-by figure: the hero stays the bill total. The lead liked that hierarchy in v1, S06 leads with it, and the offer strip is 24 px against 36 px, so there is still one hero. Cut if wanted: hide the bill total on all owner cards and lead with the pay-by amount.
- DISAGREE (kept) with dropping the rupee change: the brief says Ohm explains the change from last month in rupees, so the Unpaid card keeps "Up ₹53,820 from July" (derived: ₹36,42,160 minus ₹35,88,340). I did drop the 1.5%, the (₹45,530 more) line, the repeated dates and the amber arrow.
- The rupee gap (bill total and pay-by amount differ by ₹32,970 against a stated saving of ₹32,971) is kept as a known data issue shared with S06, with one policy on all cards (see layout section A). Accept, or hide the bill total everywhere?
- The Paid band is warning with a clock because Northgrid has not confirmed (Foundations R3, same as the S11 badge), with green kept for "You saved" and the stamp line. Alternative from Foundations: a neutral pending tone so amber means only "look at this". When Northgrid confirms the band should turn success with circle-check; that needs a confirmation signal and copy (for example "Confirmed by Northgrid") that does not exist yet.
- S11 caption deleted because "We will notify you when Northgrid confirms." promises a capability nobody has confirmed. Add it back to the Status row only if Ohm can detect Northgrid's confirmation.
- The S11 illustration is its own sibling built from the measured S04 geometry at 0.75 scale, not an edit of the S04 component (another track is rebuilding S04 and may ship a different page, for example the Indian HT bill with a Total box and a real rupee glyph, which would itself break the Foundations Never list of no real figures on the paper). Re-measure after S04 lands. Is the green block on the paper acceptable, or should it keep S04's grey block and rely on the green badge alone?
- "More" was removed (three targets of 120). Brief asked for WhatsApp, Email and Copy link; on iPhone the WhatsApp tile already opens the system sheet that lists every app and Save Image. Restore a fourth "Other apps" tile only if WhatsApp is changed to open directly.
- "No hidden charges or penalties" is now a claim a third party reads on a card with Ohm's name on it. Legal and product to confirm it (the Home card spec already asks this; softer fallback "No overcharges found"). The Look stamp says "1 changed setting found", which follows S07's own definition of a hidden charge.
- Stamp date: "3 Sep 2026" is the date Ohm ran the checks, which equals the share date in the demo. If someone shares later, should the stamp show the check date or the share date? A sent image is a snapshot either way.
- Ended and Overdue variants (layout section H) need copy sign-off, especially the overdue hero ₹36,87,690 and how to word the extra ₹45,530 without printing a misleading pair.
- Subtitle "Harbourline Hotels, Riverside" assumes the business name is available as data. If a business has several connections, print the connection's nickname.
- Cross-track: S06 and S13 Share buttons need the share icon, S06's change arrow chip should go neutral, S01 needs a paid state for when Done lands, and S09 behind and S13.2 behind must be cloned from the final S06 and S13. S13.2's y depends on where S13.1 (11:16853) actually sits.
- Scale-to-fit floor is 0.72 so the 14 px text stays at about 10 px. On very short or narrow phones (iPhone SE class) the body scrolls and the stamp is reachable by scrolling. Accept, or shorten the Look card further (the cheapest cut is the pay line, 32 including its gap)?