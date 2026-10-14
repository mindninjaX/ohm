# S01
Review verdict: fix (11 issues)

## Frames
- S01 Home. Rebuilt in place and now edge to edge: Content (9:7435) is 393x852 at 0,0, scrolls vertically and has 128 top padding, so it rests | 9:7427
- S01.1 All bills. Explainer now keeps 'August 2025' together; Earlier bills stack instance repainted. | 11:11635
- S01.2 July 2026 bill. Nav type fixed; hero has a 6 gap above 'paid on'; the Saved alert is a local row with a 20 pt icon. | 11:12124
- S01.3 Where these numbers come from. The sheet is a floating custom-height sheet, 535 tall, at y 311. 'S01 Home (behind)' 11:12485 mirrors t | 11:12484
- Components · S01 (section, Foundations page). Fill now uses brand/surface-muted, the same as Components · S05. | 11:9926
## Still off
- The S01.3 sheet is solid white (the Large variant's Frame), not the Liquid Glass background that the kit's floating Medium variant uses. Overriding the fill to glass isn't available on that frame.
- In S01.3, the floating sheet's 6 pt bottom inset shows a sliver of S01 behind it, which the bottom scroll edge and the dim mostly hide. This matches iOS 26 floating sheets.
- The three local icon copies (and the new 20 pt piggy-bank) should become library instances once the shadcn icon imports work.
- On S01, the top scroll edge is a static gradient. iOS 26 uses a progressive blur, which Figma can't show in a prototype.
## Open questions
- S06's nav (9:7594) still has the kit sizes (15 pt title, 17 pt 'Northgrid · HT') and the kit black and grey. I didn't touch it because S06 belongs to another builder. Should the S06 owner (or the lead) apply the same nav override, so S01, S01.2 and S06 match? The override is: title 18/24 Semibold in ink-strong, subtitle 14/20 Regular in ink-muted, glass text buttons 16 Medium in ink-strong.
- S01.3 now uses a floating 535 pt custom detent built on the Large variant (white sheet). Is that acceptable, or should it use the kit's glass background, which only the fixed-height Medium variant has?
- Library icon imports (receipt-indian-rupee, piggy-bank, indian-rupee) are still pending. Should I swap them in once they import?
- The July data issue is unchanged: the July screen shows only the amount paid and the amount saved.

# S02
Review verdict: fix (7 issues)

## Frames
- S02 Notification (rebuilt in place, QA fixes applied) | 9:7470
## Still off
- At 1x (38.33pt) the Small icon reads as a white page on a blue squircle with a solid blue tile and a white bolt in it. The grey skeleton lines and the blue scan line are 1 to 2pt bands. They read as texture rather than distinct lines, which is expected at that size. The bolt is about 5 x 8pt and is readable at 3x; at 1x it shows as a light mark in the blue tile.
- Foundations layout outside S02: 'Components · Journey' 11:9945 (x 9600 to 10800, y 0 to 1400) sits inside the range of 'Components · S05' 11:9959 (x 8400 to 10800, y 0 to 2400). I did not touch either, because they belong to other areas. Flagging it for the Foundations builder.
- With the dark wallpaper the glass clock reads as a cool grey-lavender (the kit's glass effect over navy). That is the kit's own treatment and I left it unchanged.
## Open questions
- Wallpaper is now Dark. The 'before' screenshot (Light) is the last file in screenshots. Does the lead accept Dark, or want Light for continuity with the light app?
- App icon: does the lead accept the Size=Small bill-with-blue-tile variant at notification size, or prefer the pure bolt-only fallback (blue squircle, white bolt)? The fallback would be a third variant, or it would replace Small.
- Should the inset, rounded scan line (a change from the spec's edge-to-edge line) also be used in S04's illustration so the two match? S04 belongs to another area.
- S06's first line should echo 'No hidden charges or penalties' so the tap lands on the same message. That screen belongs to the S06 owner.
- The Foundations builder should know that 'Components · S02' moved to x 7200, y 3200 (1200 x 2428), because S03's section grew down to y 2922.

# S03
Review verdict: fix (10 issues)

## Frames
- S03 Add a bill. Reworked: Medium sheet with a 2x2 'Add methods' grid of Add bill tile instances. Header unchanged, no helper line, 'S01 Home | 9:7475
- S03.1 Forward the email. S01 behind clone 11:10840, cloned kit Sheet Medium 11:10963 with glass back, title and glass xmark close. Content ' | 11:10839
## Still off
- Not played in Present. The plugin API cannot run the prototype, so three things are unconfirmed: the in-sheet slide between S03 and S03.1, the hover Smart animate of the nested Art pose, and click-after-hover navigation. The structure is in place: names and paths match ('Sheet content' > 'Add methods' / 'S03.1 content'; tile > 'Art area' > 'Art' in both Rest and Active tile variants), and the Content slot clips the parked content. If the nested pose snaps instead of animating, the spec's fallback is to detach the Art in the six live tile variants and keep the layer names.
- The S03 and S03.1 sheets still show a grabber on a single-detent Medium sheet. I left it as is: the S03 sheet was to stay unchanged, and QA marked this as a lead decision (see open questions).
- The forward and unplug glyphs are not library instances yet; the library imports are still stalled.
- The 7 x 7 zap mark sits at a half point (1.5 pt inside its 10 pt mark), and its 1.25 pt stroke cannot land on whole points. Both follow the spec. The dashed Connect wires are 1.5 pt on a whole-point centreline, so they are slightly soft at 1x.
## Open questions
- Grabber: the S03 and S03.1 sheets use the single [.medium] detent at default text size, and iOS shows a grabber only on resizable sheets. Should Show Grabber be turned off on both sheet instances together (9:7519 and 11:10963)? Turning off both keeps the Smart animate matched.
- Add bill tile text properties: keep Option B (shared Title/Subtitle properties plus Type/State captions on Foundations), or switch to Option A (drop the properties and type each variant's own copy)? With A, the four S03 tiles and the spec-board strip would need re-checking.
- Library imports from the shadcn kit still hang for keys that are not yet in the file (forward, unplug; earlier also reply, redo, send), and the REST token for figma-console is invalid (401). Should someone check the library connection and token before other builders need new icons?
- Connect Enabled: is 'rests on a blue unplug, plugs in on hover' the behaviour the lead wants? The other reading is 'rests on plug, no swap'; that is a one-glyph change on 11:10113 plus a note edit.
- The spec's own open questions still stand: address placement (S03.1 page vs a row on S03 at Large), share-sheet PDF import, an inert vs 'notify me' Connect tile, the mail-rule tip, S04 error states for unreadable or duplicate PDFs, a camera placeholder frame, and once-per-session vs once-ever entrance.

# S05
Review verdict: fix (15 issues)

## Frames
- S05 Confirm connection (rebuilt as 'Your connection', World A, 700 kVA) | 9:7555
- S05.1 What looks off | 11:13504
- S05.2 On your bill | 11:14760
- S05.3 Fix contract demand (700 world, empty state) | 11:15450
- S05.4 Ask the Ohm team | 11:15577
- S05.5 Your connection, 900 kVA bill (World B start, flow 'Bill is wrong') | 11:15725
- S05.6 On your bill, 900 kVA | 11:16647
- S05.7 Fix contract demand (filled, 900 vs 700) | 11:14969
- S05.8 Your connection, set by you | 11:16230
- S05.9 Your connection, sent | 11:15883
- S13.1 Check failed, your number | 11:16853
## Still off
- S05.8 and S05.9: below the toast (678 to about 688), a thin strip of the white Details card shows before the footer fade starts. No text or badge is cut. It reads as scrolled content, but it is a small flat band.
- S05.3 (empty): the dashed tile and 'Type below' point to the field, but the field itself still shows only 'kVA' on the right with nothing on the left. Adding a placeholder was not done, because any number would be invented.
- S05.1 opens with a dissolve in the prototype, not the kit sheet slide (annotated).
- S05 and its clones still can't show the below-the-fold content (About your business, footnote) in a static frame. The positions were verified last round.
## Open questions
- Section label style for the app: keep the spec's uppercase Text-xs Semi Bold with 0.5 tracking (S05, S03), or move to S01's Text-lg Semi Bold sentence case? If uppercase stays, should Foundations add a local text style 'Section label' so the recipe is linked rather than detached?
- Scroll edge: keep the kit effect plus the blurred surface-muted tint (current, token-bound), or the kit effect alone as the spec says?
- Option row is now a local component instead of a wrapper around the library Item, because Item text can't carry props. Is that acceptable, or does Foundations want a kit-Item-based row?
- S05.3 empty input: add a neutral placeholder (for example 'Number on your agreement'), or keep it empty?
- Toast elevation: keep the spec's y 4 / blur 16 shadow plus the new line stroke, or raise it to y 6 / blur 20?
- Is it still acceptable that all five S05 rows go to the Contract demand evidence screen (S05.2 / S05.6) until the other S05b variants are built in tier 2 and 3?

# JOURNEY
Review verdict: fix (9 issues)

## Frames
- Journey map: bill to paid (same node and name, page 02 Journey map, inside Section 02 Journey map 1:105). Now 1984 x 1576 after the App lane | 1:2
- Section 02 Journey map, resized to frame + 80 margin: 2144 x 1736 (fill left alone) | 1:105
## Still off
- Alternate card body still wraps between '930' and 'kVA' (QA low). I did not change it: a no-break space would change the string's bytes, so it waits for the lead (see open questions).
- The subtitle still says 'August 2024' and '1 Sep 2024' (QA low). The spec requires this string unchanged, so it waits for the lead.
## Open questions
- May I replace the space between '930' and 'kVA' in the Alternate card with a no-break space (U+00A0)? It is invisible, but it changes the string's bytes. If not, the wrap stays and the column width stays the same.
- Subtitle dates: should 'August 2024' and '1 Sep 2024' stay as a historical case-study sample, or change to 'August 2026' and '1 Sep 2026' to match the app screens? The footer 'Case 211 of 2024' is a legal citation and stays either way.
- Should 'Components · Journey' stay on the journey page (x 2224, y 0), or move to Foundations once nothing covers x 9600, y 0? Components · S05 currently spans 8400 to 10280.
