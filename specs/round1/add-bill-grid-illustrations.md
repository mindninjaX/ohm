# add-bill-grid-illustrations

## Summary

The Medium sheet the user likes stays as it is, and its list becomes a 2x2 grid of white tiles. Each tile has a 150 x 96 drawing in the S04 language: white skeleton paper with the Northgrid zap mark, on a primary-subtle tint, with clear air around it. Upload and Forward are now a matched pair: a bill rising out of a Files folder, and a bill rising out of an open envelope, each with S04's corner badge for the verb. Photo shows a tilted bill that straightens inside thin camera brackets. Connect is a grey, unplugged cable from Northgrid to a bill. Blue means only two things: the Northgrid mark, and one verb per tile. The motion is short and plays on pointer hover and on touch, plus a one-time entrance when the sheet settles, so iPhone users actually see it. The address does not fit in a tile, so it lives on a one-tap S03b page with a large Copy button, and a long-press on the tile also copies it.

## Layout

FRAME "S03 Add a bill", 393 x 852, light. Behind layer unchanged: the S01 clone under the kit sheet's dimming layer.

1. SHEET
- Sheet - iPhone, Detent = Medium, unchanged. The kit fixes its height, with the top edge at y 389.
- Kit toolbar unchanged: Leading glass close button (xmark), 44 x 44 at x 22, y 403. Title "Add a bill". No trailing item.
- Detents in code: [.medium] at Large text size and below. From xLarge up: [.medium, .large], opening at .large (see code_notes, Dynamic Type).

2. GRID "Add methods" (in the sheet's Content slot)
- Starts at y 466, 347 wide (x 23 to 370), the same edges as the old rows.
- Auto layout Grid, 2 columns x 2 rows, column gap 11, row gap 11. Columns are fixed at 168: 2 x 168 + 11 = 347.
- Rows are 166 tall at the default text size, so the grid runs from y 466 to 809. That leaves about 37 pt above the sheet's bottom edge (about 846) and clears the home indicator.
- If Grid auto layout is not available: a vertical stack, gap 11, holding two horizontal rows, gap 11.
- Order: row 1 "Upload the PDF" (x 23), "Take a photo" (x 202). Row 2 "Forward the email" (x 23), "Connect Northgrid" (x 202, disabled).
- Instances: Add bill tile Type=Upload State=Rest, Type=Photo State=Rest, Type=Forward State=Rest, Type=Connect State=Disabled.

3. TILE: new local component set "Add bill tile"
Properties:
- Type = Upload | Photo | Forward | Connect.
- State = Rest | Active | Disabled.
- 7 variants: Upload, Photo and Forward each in Rest and Active, plus Connect/Disabled.
- Title (text) and Subtitle (text).
- No instance-swap property. Each variant holds a plain nested instance of its own Art set with the Pose fixed (Rest variant holds Pose=Rest, Active holds Pose=Active), so changing the variant also changes the drawing.

Tile frame:
- W 168 (fill column), height hug with min 166. Tiles in one row stretch to equal height.
- Fill #FFFFFF, radius 16, no stroke, no shadow (the brand's borderless white card).
- Vertical auto layout, padding T6 R6 B12 L6, gap 10.
- No chevron: the whole tile is the button.

Art area:
- W fill (156) x H 96 fixed, radius 10 (concentric: 16 - 6), clip content.
- Fill brand/primary-subtle #E9EFFF. Connect/Disabled uses brand/surface-muted #F1F2F4.
- Child: the Art instance, 150 x 96, at x 3, y 0.

Text block:
- W fill, vertical auto layout, padding L6 R6, gap 0. The text column is 144 wide and starts 12 pt from the tile edge.
- Title: Text-sm/Semi Bold (14/20), brand/ink-strong #091E42.
- Subtitle: Text-sm/Regular (14/20), brand/ink-muted #44546F.
- Text wraps (no truncation). At the default size every string is one line; the measured widths are in code_notes.

Disabled (Connect):
- Title in brand/ink-muted. Subtitle hidden.
- Kit Badge, State = Secondary, "Coming soon" (22 tall) in the subtitle's place. Tile height: 6 + 96 + 10 + 20 + 22 + 12 = 166.
- Tile opacity stays 100%: the grey, blue-free drawing carries the disabled look and keeps the badge readable.
- No hover, no press.

Active: identical to Rest except the nested Art is at Pose=Active. It is the end pose for the Figma hover preview and documents the code animation.

Figma prototype on the component, for each Rest variant:
- While hovering: Change to State=Active, Smart animate, ease out, 180 ms.
- While pressing: the same.

4. SHARED DRAWING VOCABULARY (scaled from S04)
S04 reference: paper 180 x 231, radius 16, 1 pt line edge, 22 pt zap mark, 52 pt white badge on the paper's bottom-right corner (29% of the paper width).

Safe area, in every Art:
- At Rest, nothing above y 10 or below y 90.
- In Active, nothing above y 5.
- Drawings are centred on x 75, with at least 9 pt of tint at each side.

Paper:
- Fill #FFFFFF, 1 pt inside stroke brand/line #DCDFE4, radius 5. No shadow.

Containers:
- Folder front, envelope pocket and flap: white with 1 pt brand/line.
- Their inside faces (folder back, envelope back): brand/surface-muted #F1F2F4. This gives depth without new colours.

Skeleton:
- Line: rectangle 4 tall, radius 2, brand/line.
- Block: brand/surface-muted, radius 3.

Northgrid mark (the noun, on every bill paper, as on S04):
- 10 x 10, radius 3, brand/primary-subtle.
- Lucide zap 7 x 7, centred, stroke 1.25, brand/primary.

Verb badge:
- Circle 24 x 24, fill #FFFFFF, 1 pt inside stroke brand/line.
- Centre on the container's bottom-right corner, 4 pt in (S04's spinner-badge position). 24 is about 33% of the container width, close to S04's 29%.
- 'glyph': Lucide 12 x 12, stroke 1.5 pt as rendered, brand/primary, masked by the circle.
- 'ring': the same circle, no fill, 1.5 pt inside stroke brand/primary, opacity 0 at Rest and 100% in Active.

Colour rule:
- Blue = the Northgrid mark (plus the PDF chip, which labels that same bill) + one verb per tile.
- Everything else is white or grey. No solid blue fills anywhere.
- Where the verb sits:
  - Upload and Forward: a corner badge.
  - Photo: the bracket frame is the verb, so there is no badge.
  - Connect: the verb is the plug in the middle of the cable.
- Checked at 1x with the three live tiles side by side: equal weight. Photo has more stroke length, but its 1.5 pt strokes are thinner than the badge glyph masses.

Component sets:
- Art/Upload, Art/Photo, Art/Forward: Pose = Rest | Active.
- Art/Connect: State = Disabled | Enabled | Enabled active.
- Each is 150 x 96, no fill.
- Layer names are identical across poses so Smart animate and the code can match them: folder-back, folder-front, flap, back, pocket, paper, badge, ring, glyph, tl, tr, bl, br, source, source-glyph, wire-a, wire-b, dot.

5. SPEC BOARD (next to S03)
- Each Art at 2x in Rest and Active, annotated with its motion notes from the illustrations list.
- One annotation for the sheet entrance: "Plays once per app session when the sheet settles: tiles 1 to 3 go Rest to Active and back, 180 + 180 ms, 60 ms apart. Skipped under Reduce Motion."
- A 1x strip of the three live tiles side by side, for the ink-weight check.

6. REMOVED FROM S03
- The 4 Outline Items, their Lucide row icons and the chevrons.
- The email address: it now lives on S03b (see new_screens).

## Copy

- **Sheet toolbar title (S03)**: Add a bill
- **Tile 1 title**: Upload the PDF
- **Tile 1 subtitle**: From the Files app
- **Tile 1 drawing chip (decorative, hidden from VoiceOver)**: PDF
- **Tile 2 title**: Take a photo
- **Tile 2 subtitle**: Of your paper bill
- **Tile 3 title**: Forward the email
- **Tile 3 subtitle**: From your mail app
- **Tile 4 title (disabled)**: Connect Northgrid
- **Tile 4 badge (kit Badge, Secondary)**: Coming soon
- **VoiceOver tile 1 (label / hint)**: Upload the PDF, From the Files app / Opens Files
- **VoiceOver tile 2 (label / hint)**: Take a photo, Of your paper bill / Opens the camera
- **VoiceOver tile 3 (label / hint)**: Forward the email, From your mail app / Shows the address to forward it to
- **VoiceOver tile 4 (label, not enabled, read as dimmed)**: Connect your Northgrid account, Coming soon
- **Tile 3 long-press context menu title**: bills+harbourline@ohm.app
- **Tile 3 long-press context menu, item 1**: Copy address
- **Tile 3 long-press context menu, item 2**: Share address
- **S03b sheet toolbar title**: Forward the email
- **S03b step 1**: Open Northgrid's email in your mail app
- **S03b step 2, line 1**: Forward it to this address
- **S03b step 2, line 2 (the address, selectable)**: bills+harbourline@ohm.app
- **S03b step 3**: We read the PDF and let you know when it is checked
- **S03b primary button (default)**: Copy address
- **S03b primary button (after tap, 2 s)**: Copied
- **VoiceOver announcement after copying (button or context menu)**: Address copied
- **Camera permission purpose string (NSCameraUsageDescription, shown in the iOS prompt on first use)**: Ohm uses the camera to photograph your paper bill.
- **Camera denied alert title (native iOS alert)**: Ohm can't use the camera
- **Camera denied alert message**: Allow camera access in Settings to photograph your bill.
- **Camera denied alert buttons (cancel / preferred)**: Not now / Open Settings

## Illustrations

### Art/Upload (tile 1, Upload the PDF)
- Concept: Your bill PDF rises out of a Files folder. The folder says where the bill is now (the Files app), the PDF chip names the file type a non-technical user knows, and the up-arrow badge is the action. It pairs with the Forward drawing: same structure (back, bill, front), different container. The bill paper carries the same Northgrid zap mark as S04, so the next screen reads as the same paper being read.
- Construction: Art frame 150 x 96, no fill, on the brand/primary-subtle art area. Layers from bottom to top.

1. 'folder-back': one vector.
- Fill brand/surface-muted (the folder's shaded inside), 1 pt inside stroke brand/line.
- Shape: a body at x 39, y 26, 72 x 56, radius 6, merged with a tab on its top-left. The tab runs from x 39 to x 62 at y 20, with top corners at radius 3, and its right side slants down to (65, 26).
- Path: M39,23 Q39,20 42,20 H59 Q61,20 62.2,21.6 L65,26 H105 Q111,26 111,32 V76 Q111,82 105,82 H45 Q39,82 39,76 Z.
- Simpler alternative: union a 24 x 10, radius 3 tab rectangle at x 39, y 20 with the body, then flatten. The slant is optional.

2. 'paper': frame x 59, y 12, 40 x 52, radius 5. Fill #FFFFFF, 1 pt inside stroke brand/line, clip on.
- It sits 4 pt right of the folder centre so 20 pt of the tab stays visible.
- Inside, in paper coordinates:
  - 'mark': x 6, y 6, 10 x 10, radius 3, brand/primary-subtle. Lucide zap 7 at x 7.5, y 7.5, stroke 1.25, brand/primary.
  - 'pdf-chip': x 20, y 6, 18 x 10, radius 3, brand/primary-subtle. Text 'PDF' in Inter Semi Bold 6, letter spacing 0.2, brand/primary, centred. Decorative.
  - Skeleton lines (4 tall, radius 2, brand/line): x 6, y 22, w 28; x 6, y 29, w 20; x 6, y 36, w 26. The third line is hidden at Rest and appears in Active.

3. 'folder-front': x 39, y 46, 72 x 36, radius 6. Fill #FFFFFF, 1 pt inside stroke brand/line. It hides the paper below y 46.

4. 'badge': circle 24 x 24 at x 95, y 66. Its centre (107, 78) is the front panel's bottom-right corner, 4 pt in.
- Fill #FFFFFF, 1 pt inside stroke brand/line.
- 'ring': the same circle, opacity 0.
- 'glyph': Lucide arrow-up 12 at x 101, y 72, stroke 1.5, brand/primary, masked by the circle.

Used bounds at Rest: x 39 to 119, y 12 to 90.
Active pose: 'paper' at y 6, 'ring' at 100%.
Blue: the mark, the chip text and the arrow only.
Rendered at 1x and 2x in a scratch browser page to check.
- Hover: Leader: 'paper' moves translateY 0 to -6 over 180 ms, ease-out. The bill lifts out of the folder.

Followers, starting 40 ms later:
- 'ring' fades 0 to 1 over 150 ms, ease-out.
- 'glyph' makes one conveyor pass. It moves y 0 to -6 while fading out (100 ms, ease-in), jumps to +6 while invisible, then rises from +6 to 0 while fading in (160 ms, ease-out). The badge mask makes the arrow leave and re-enter inside the circle. The pass ends at 300 ms.

Hover-out or release: the paper returns over 160 ms (ease-out) and the ring fades out over 150 ms. The arrow does not replay.

Entrance (once, when the sheet settles): the paper goes 0 to -6 and back (180 + 180 ms), and the glyph nudges y -3 and back. No ring.

Reduced motion: no movement; only the ring fade on interaction, and no entrance.

Figma: Smart animate to Active (paper -6, ring on). The conveyor exists only in code.
### Art/Photo (tile 2, Take a photo)
- Concept: A paper bill lies slightly crooked inside four thin camera corner brackets. The brackets are the 'scan' mark people know from payment and document scanners (PayPal, Wise, Revolut Business, Craft's Scan). On interaction the corners close in and the paper straightens. That previews what the document camera does: it finds the page and squares it up. There is no badge on purpose: the brackets are the verb, and a badge would cover one bracket.
- Construction: Art frame 150 x 96, no fill. Layers from bottom to top.

1. 'paper': frame 48 x 60 at x 51, y 18, with its centre at (75, 48).
- Rotated 6 degrees clockwise about its centre (Figma rotation -6, CSS rotate(6deg)).
- Fill #FFFFFF, 1 pt inside stroke brand/line, radius 5.
- Inside:
  - 'mark' at x 6, y 6 (as on Upload).
  - Title line: x 20, y 9, w 18.
  - Lines: x 6, y 23, w 34 and x 6, y 30, w 26.
  - Block: x 6, y 38, 36 x 10, radius 3, brand/surface-muted.
  - Line: x 6, y 52, w 20.
- Tilted bounds: about x 48 to 102, y 16 to 80.

2. Brackets 'tl', 'tr', 'bl', 'br': open vectors with a 1.5 pt stroke in brand/primary, round caps and joins, 10 pt arms and a 3 pt corner radius.
- Outer edges at x 37 and 113, y 10 and 86 (centrelines on 37.75 / 112.25 and 10.75 / 85.25).
- tl: M37.75,20.75 V13.75 Q37.75,10.75 40.75,10.75 H47.75
- tr: M102.25,10.75 H109.25 Q112.25,10.75 112.25,13.75 V20.75
- bl: M37.75,75.25 V82.25 Q37.75,85.25 40.75,85.25 H47.75
- br: M102.25,85.25 H109.25 Q112.25,85.25 112.25,82.25 V75.25

The arms are 10 pt and not the suggested 12: at 12 this tile still read heavier than the others at 1x.
The tilted paper clears the brackets by 5 pt or more. There is no flash layer.

Active pose:
- Paper rotation 0.
- tl +4,+4; tr -4,+4; bl +4,-4; br -4,-4. The bracket frame becomes 41 to 109 by 14 to 82, 4 pt outside the straight paper (51 to 99 by 18 to 78).
- Hover: Leader: the four corners close in by 4 pt over 180 ms, ease-out, like a focus lock.

Follower, starting 60 ms later: 'paper' rotates from 6 degrees to 0 about its centre on the settle spring, SwiftUI .spring(response: 0.35, dampingFraction: 0.75). That is about a 3% overshoot (0.2 degrees), settled at about 360 ms in total.

The shutter flash is removed. A white blink on every pointer pass is more than 'a little bit'.

Hover-out or release: the corners return over 160 ms (ease-out). The paper goes back to 6 degrees over 220 ms, ease-in-out.

Entrance (once): the corners close and the paper straightens, then both return (180 + 180 ms).

Reduced motion: no rotation and no corner travel. Instead, a 150 ms opacity cross-fade between two stacked copies, Rest and Active.

Figma: Smart animate to the Active pose.
### Art/Forward (tile 3, Forward the email)
- Concept: Northgrid's bill arrives by email. The drawing shows the bill, with Northgrid's zap mark, rising out of an open envelope, and a forward-arrow badge (the Forward symbol mail apps use) as the action. It is the sibling of the Upload folder, with the envelope as the container. On interaction the bill rises further and the arrow nudges onward.
- Construction: Art frame 150 x 96, no fill. Layers from bottom to top.

1. 'flap': triangle with points (41, 32), (75, 14), (109, 32). Fill #FFFFFF, 1 pt stroke brand/line, round join. Its apex sits behind the paper. Each shoulder shows about 14 x 7 pt.

2. 'back': x 41, y 32, 68 x 50, radius 6. Fill brand/surface-muted (the inside of the envelope), 1 pt inside stroke brand/line.

3. 'paper': x 55, y 12, 40 x 50, radius 5. Fill #FFFFFF, 1 pt inside stroke brand/line. It is 40 wide so the flap stays readable.
- Inside:
  - 'mark' at x 6, y 6.
  - Title line: x 20, y 9, w 14.
  - Lines: x 6, y 22, w 28; x 6, y 29, w 20; x 6, y 36, w 24.

4. 'pocket': path M41,44 L75,60 L109,44 V76 Q109,82 103,82 H47 Q41,82 41,76 Z.
- Fill #FFFFFF, 1 pt stroke brand/line, round join.
- Its V top edge, from y 44 at the sides to y 60 in the middle, hides the lower paper. That V and the flap make it read as an envelope.

5. 'badge': circle 24 at x 93, y 66. Its centre (105, 78) is the pocket's bottom-right corner, 4 pt in.
- Built like the Upload badge, with 'ring'.
- 'glyph': Lucide forward 12 at x 99, y 72, stroke 1.5, brand/primary, masked.

Used bounds at Rest: x 41 to 117, y 12 to 90.
Active pose: paper at y 7; 'glyph' only at x 102 (+3; the circle does not move); ring 100%.
Also used on S03b at full size inside a 347 x 96 tint card.
- Hover: Leader: 'paper' moves translateY 0 to -5 over 180 ms, ease-out, so more of the bill rises out. The paper sits under 'pocket' in layer order, so it is hidden without a clip.

Followers, starting 40 ms later:
- 'ring' fades 0 to 1 over 150 ms.
- 'glyph' nudges x 0 to +3 and back to 0, 140 + 140 ms, ease-in-out. It ends at 320 ms.

Hover-out or release: the paper returns over 160 ms (ease-out) and the ring fades out over 150 ms.

Entrance (once): the paper goes -5 and back, and the glyph nudges. No ring. The S03b copy plays the same entrance when S03b arrives.

Reduced motion: ring fade only.

Figma: the Active pose holds paper -5, glyph +3 and ring 100%. The return nudge exists only in code.
### Art/Connect (tile 4, Connect Northgrid, disabled)
- Concept: Northgrid on the left (the same zap that marks every bill) and a bill on the right. Between them runs a dashed cable with an unplug badge in the middle: the link is drawn, but not plugged in yet. The drawing has no blue and sits on a grey tint, so it reads as 'not yet' even before the 'Coming soon' badge is read. An Enabled variant is built now, so the code has it ready when the feature ships.
- Construction: Art frame 150 x 96, no fill. The art area fill is brand/surface-muted while disabled. Layers from bottom to top.

1. 'source': x 9, y 30, 36 x 36, radius 10. Fill #FFFFFF, 1 pt inside stroke brand/line.
- 'source-glyph': Lucide zap 16 at x 19, y 40, stroke 1.75, brand/ink-muted at 50%.

2. 'wire-a' runs (45, 48) to (63, 48); 'wire-b' runs (87, 48) to (105, 48).
- Both 1.5 pt, round caps, dash 2 gap 3, brand/ink-muted at 35%.

3. 'paper': x 105, y 22, 36 x 52, radius 5. Fill #FFFFFF, 1 pt inside stroke brand/line.
- Inside:
  - Lines: x 6, y 6, w 16; x 6, y 14, w 24; x 6, y 21, w 18.
  - Block: x 6, y 29, 24 x 9, radius 3, brand/surface-muted.
  - Line: x 6, y 42, w 14.
- No zap mark here, because the source box carries Northgrid.

4. 'badge': circle 24 at x 63, y 36, with its centre (75, 48) on the wire. Fill #FFFFFF, 1 pt inside stroke brand/line.
- 'glyph': Lucide unplug 12 at x 69, y 42, stroke 1.5, brand/ink-muted at 50%.

5. 'dot': circle 4 x 4 at x 43, y 46, brand/primary, opacity 0. Used only when Enabled.

Used bounds: x 9 to 141 (centred on 75), y 22 to 74. No blue anywhere.

Enabled variant (for later):
- Art area: brand/primary-subtle.
- source-glyph: brand/primary at 100%.
- Wires: dashed brand/primary at 50%.
- Badge glyph: swapped to Lucide plug in brand/primary.

Enabled active variant: solid wires at 100% and the ring on.
- Hover: Disabled, as shipped now: no hover, no press scale and no entrance. Movement would promise an action that does nothing, and the 'Coming soon' badge does the explaining.

Enabled, when it ships:
- On hover, the wires cross-fade from dashed to solid over 150 ms.
- 'dot' fades in and travels x 45 to 105 along y 48 over 420 ms, ease-in-out, fading out over the last 80 ms.
- The badge glyph cross-fades from unplug to plug over 120 ms as the dot passes it, at about 180 ms.
- Hover-out: the wires fade back over 150 ms.

Reduced motion: the cross-fades only; the dot does not travel.

## New screens

### S03b Forward the email (inside the same Medium sheet)
- Purpose: Shows the forwarding address in full, with a large, obvious copy button and 3 numbered steps for users who are not technical. The address is 25 characters, 216 pt at 16 pt Semi Bold, and cannot fit in a 144 pt tile without truncating. A cut-off or wrapped email address leads to copy mistakes. The page also repeats the Forward drawing, so it visibly continues from the tile the user just tapped. The pattern follows Wanderlog, Tripsy and Polarsteps.
- Layout: FRAME 393 x 852, built like S03: the S01 clone with the dimming layer, and Sheet - iPhone at the Medium detent. The push does not resize the sheet.

Kit toolbar:
- Leading: glass back button (chevron.left), goes to S03.
- Title: 'Forward the email'.
- Trailing: glass close button (xmark), goes to S01.

Content group 'S03b content': 347 wide at x 23, starting at y 466. The layer name matters for the Smart animate described in interactions.

(a) Hero card, y 466 to 562:
- 347 x 96, fill brand/primary-subtle, radius 16.
- Art/Forward at Pose=Rest, full size (150 x 96), at x 98, y 0 inside the card. That is 1 pt off true centre so every stroke stays on whole points.
- Plays the Forward entrance once on arrival (skipped under Reduce Motion).

(b) After a 12 pt gap, the steps card, y 574 to 744:
- Fill #FFFFFF, radius 16, no stroke, padding 16, vertical gap 12.
- 3 rows. Each row is horizontal auto layout, gap 12, top aligned.
- Number: 24 x 24 circle in brand/primary-subtle, with the digit in Text-xs/Semi Bold, brand/primary, centred.
- Text column: fills the remaining 279 pt, with 2 pt top padding so the first line centres on the circle.
  - Row 1: 'Open Northgrid's email in your mail app' in Text-sm/Regular, brand/ink #172B4D. One line (262 pt).
  - Row 2: 'Forward it to this address' in Text-sm/Regular, brand/ink. After a 2 pt gap, 'bills+harbourline@ohm.app' in Text-base/Semi Bold (16/24), brand/ink-strong. One line (216 pt), selectable in code.
  - Row 3: 'We read the PDF and let you know when it is checked' in Text-sm/Regular, brand/ink, on 2 lines.

(c) After a 16 pt gap, the primary button, y 760 to 810:
- Kit Button, Variant Default, Roudness Rounded (pill), 50 tall, full width (347).
- Leading Lucide copy 16 in #FFFFFF, label 'Copy address'.
- Variant 'Copied': Lucide check plus 'Copied', same fill and width, so nothing shifts.

The content ends at y 810, level with the S03 grid (809), and clears the home indicator. A rendered check measured the content at 344 pt tall.

Nothing else is on this page. The mail-rule tip is left out on purpose (see open questions).

## Interactions

- S01: tap the plus (Add a bill) -> S03 opens as now: Sheet - iPhone at the Medium detent over S01. When the sheet finishes presenting, tiles 1 to 3 play the entrance once per app session (see code_notes). Prototype: unchanged Navigate.
- Pointer hover (iPad, Mac, web prototype) or touch-down (iPhone) on an enabled tile -> The drawing moves to its Active pose (motion per illustration). On press, the tile scales to 0.97 on the press spring and springs back on release. Navigation fires on touch-up straight away and never waits for the drawing. If the touch turns into a scroll or drag, the pose reverses.
- Figma prototype: pointer over, or press on, an enabled tile -> Built into the Add bill tile component: While hovering, and While pressing, Change to State=Active, Smart animate, ease out, 180 ms. The nested Art changes pose with the variant, so the end pose previews in Figma. Loops and nudges exist only in code.
- Tap Upload the PDF -> Real app: the system Files picker, limited to PDF. Picking a file dismisses the sheet and opens S04 Reading. Prototype: Navigate to S04 (the existing wiring).
- Files picker: tap Cancel -> The picker closes and S03 is back at the Medium detent, unchanged. The entrance does not replay.
- Tap Take a photo (camera allowed) -> Real app: the system document camera, which finds the page edges and straightens the photo (the tile's straightening motion previews this). Saving the scan dismisses the sheet and opens S04. Prototype: Navigate to S04, because the camera is system UI and is not drawn.
- Tap Take a photo, first time -> iOS asks for camera access with the purpose string 'Ohm uses the camera to photograph your paper bill.' Allow: the camera opens. Don't Allow: S03 stays as it is.
- Tap Take a photo when camera access was denied before -> Native iOS alert over the sheet: 'Ohm can't use the camera' / 'Allow camera access in Settings to photograph your bill.' 'Open Settings' (preferred) opens Ohm's page in the Settings app. 'Not now' closes the alert and leaves S03 at Medium. Figma: an annotation only, because it is system UI.
- Document camera: tap Cancel -> Back to S03 at Medium, unchanged.
- Tap Forward the email -> Pushes S03b inside the same Medium sheet. The sheet does not resize. Figma: Navigate to S03b, Smart animate, ease out, 250 ms. The backdrop, sheet and toolbar layers have identical names in both frames, so they stay still. Set up the content as absolute-positioned groups: S03 has 'S03b content' parked at x 416 (one screen to the right), and S03b has 'Add methods' parked at x -370 (one screen to the left). Only the content slides, and the toolbar title and leading button cross-fade. Do not use Push, which would slide the whole frame, backdrop included. On arrival, the S03b drawing plays its entrance once.
- Long-press Forward the email -> Native context menu with the address as its title. 'Copy address' (Lucide copy) copies bills+harbourline@ohm.app, plays a success haptic and announces 'Address copied'. 'Share address' (Lucide share) opens the system share sheet. Figma: an annotation only.
- Tap, hover or long-press Connect Northgrid -> Nothing happens: no hover, no press scale, no haptic, no navigation. VoiceOver reads 'Connect your Northgrid account, Coming soon, dimmed'.
- S03: tap close (xmark), or swipe the sheet down -> The sheet dismisses to S01 (Back, as now).
- S03b: tap Copy address -> Copies the address. Over 120 ms the button cross-fades its icon from copy to check and its label to 'Copied', with a success haptic and the VoiceOver announcement 'Address copied'. After 2 s it cross-fades back. The button stays full width, so nothing moves. Prototype: Change to variant Copied, then After delay 2000 ms, Change to Default.
- S03b: long-press the address text -> System text selection with Copy. The address is real, selectable text in code.
- S03b: tap back (glass chevron.left) -> Back to S03, with the same Smart animate in reverse: the content slides right. The entrance does not replay.
- S03b: tap close (glass xmark) or swipe down -> The sheet dismisses to S01 (Navigate to S01).
- Picked PDF can't be read, is password-locked, is not a Northgrid bill, or is a bill already added -> Not designed yet. S04 needs an error state for these; see open questions. S13 covers failed checks, not unreadable files.

## Research

- Hypelist (Import sheet) https://mobbin.com/screens/7726684f-cf72-4872-9905-9349609cd2be: The closest structural match: a sheet with close and a title, holding a 2x2 grid of import routes, each an illustration on a tinted tile with a one-line title. It shows the grid works at sheet scale. Its drawings are glossy 3D; ours stay flat skeleton paper to match S04.
- ABY Journal (Templates sheet) https://mobbin.com/screens/0591333b-7716-4423-93bc-5cbad432f8c6: 2x2 tiles in a sheet whose art is a miniature paper with ruled lines, plus a 'More coming soon' note. A tiny paper with skeleton lines reads instantly as 'a document'. That supports using the S04 paper as the shared noun in all four drawings.
- Craft (insert sheet: File and Scan) https://mobbin.com/screens/af7b909c-1e76-4536-b9e0-33c522c81816: 'File' is a folder and 'Scan' is corner brackets around a page. The same two metaphors drive the new Upload (bill in a folder) and Photo (bill inside brackets) drawings.
- Docusign (Add Documents) https://mobbin.com/screens/9e9d3cbf-0ee5-463c-bb7f-ecbf18f1e3c1: Scan, Photos and Files side by side, with Files drawn as a folder and Scan as brackets. Confirms that a folder means 'from Files', which is why the Upload subtitle is now 'From the Files app'.
- Fi (pet tracker by tryfi, not Fi Money): Add documents sheet https://mobbin.com/screens/85873190-10ce-4079-8267-c09316bfb393: Upload and photo tiles in a sheet, then an 'or use email' line with the address inline. This is the alternative of keeping the address on S03 (open question 1). Its address is a link inside a sentence with no copy affordance, which is the weakness S03b avoids.
- PayPal (QR Code, Scan tab) https://mobbin.com/screens/7720fa67-5720-498d-bc82-b28ad4fc83b1: A payments app using rounded corner brackets with 'Align QR code in frame'. That is why Photo's brackets read as 'scan' to people who pay by scanning. Mobbin has no PhonePe, Paytm or CRED scanner screen (searched 3 ways), so PayPal stands in.
- Revolut Business (Tap to scan a bill) https://mobbin.com/screens/635bf421-871a-4f2e-8e5a-8140eeb1e59d: Uses corner brackets as the 'scan a bill' symbol, with the promise 'We'll extract and prefill bill details'. This is the business-bill precedent for the Photo drawing.
- Perplexity (Options sheet) https://mobbin.com/screens/15765ce4-1d67-4797-a218-e2537550236f: Image, Camera, File and Connectors tiles in a sheet, with Connectors drawn as a plug. It backs the plug and cable metaphor for 'Connect Northgrid'.
- Lovi (Make a New Scan) https://mobbin.com/screens/42aef104-0c1a-4064-9082-307e937c2f8b: Option tiles with illustration, title and subtitle, and a small status pill on the tile. This is the model for showing 'Coming soon' as a badge inside the tile rather than hiding the option.
- CRED (pay all your bills) https://mobbin.com/screens/e55ac6e2-3686-4f7c-b0c9-f2d17d8c4d09: An Indian bills grid that keeps one accent colour across every tile. Its art is isometric on black, which is not a style to copy. The only takeaway is the single accent, which matches Ohm's rule: blue only for the Northgrid mark and the verb.
- Gojek (GoTagihan bills grid) https://mobbin.com/screens/376264c5-8786-4e8d-916b-41c8358d444a: A counter-example: biller tiles with a different multi-colour icon each make a busy grid. With only four tiles, one tint and one accent keep the sheet calm.
- Wanderlog (Forward your confirmation) https://mobbin.com/screens/16125d7d-c001-455b-9f77-19da0bcb9602: The forwarding address on its own sheet page, with a Copy button that turns into 'Copied' in place. This is the basis for the S03b button's state swap with no layout shift.
- Tripsy (Add Reservations via Email) https://mobbin.com/screens/a169cddf-9d8e-4a39-af71-a313ada7559f: A numbered 3-step 'How it works' (find, forward, confirmation), with the address and 'Copy this address' in step 2. This sets the S03b step structure.
- Polarsteps (Forward confirmation email) https://mobbin.com/screens/686013ee-0609-4094-9832-73f38f9e02bf: The final step promises a notification once the email has been processed. That mirrors S04's 'we will notify you', so S03b step 3 says 'let you know when it is checked'.
- Matter (Forward newsletters) https://mobbin.com/screens/078e2685-41d0-4d09-b3ec-6001d25c3576: A 'Tap to copy' address plus a pitch for an auto-forwarding rule. A useful later upgrade, but mail rules need the destination to confirm a verification email, so it is flagged, not promised.
- Careem (Pay Bills, Your accounts) https://mobbin.com/screens/f25029c8-5ecc-4955-aa3a-d6a52f73ce28: A linked biller account with 'Set up auto-pay'. It shows what 'Connect Northgrid' becomes, which is why its Enabled variant is built now.

## Code notes
MOTION TOKENS (SwiftUI is the source of truth; CSS and Motion values are derived for mass 1)
- Ease-out: cubic-bezier(0.22, 1, 0.36, 1). In SwiftUI: .timingCurve(0.22, 1, 0.36, 1, duration:).
- Ease-in, used only for the arrow exit: cubic-bezier(0.4, 0, 1, 1).
- Ease-in-out: cubic-bezier(0.65, 0, 0.35, 1).
- Press spring: .spring(response: 0.3, dampingFraction: 0.8). Equals stiffness 439, damping 33.5 (about 1.5% overshoot).
- Settle spring: .spring(response: 0.35, dampingFraction: 0.75). Equals stiffness 322, damping 26.9 (about 3% overshoot, settled in about 300 ms).
- Conversion: stiffness = (2 pi / response)^2; damping = 2 x dampingFraction x (2 pi / response).
- Timing:
  - Hover leaders 180 ms; ring fades 150 ms; returns 160 to 220 ms.
  - Followers start 40 to 60 ms after the leader.
  - No single tile sequence runs past 360 ms. Connect Enabled's dot, at 420 ms, is the one exception and ships later.
  - The sheet entrance totals 480 ms (3 tiles x 360 ms, 60 ms apart).

WHAT ANIMATES
- Only transform and opacity.
- Each drawing is one inline SVG (web) or one Canvas/Shape view (SwiftUI), 150 x 96. Group ids match the Figma layer names: folder-back, folder-front, flap, back, pocket, paper, badge, ring, glyph, tl, tr, bl, br, source, source-glyph, wire-a, wire-b, dot.
- Photo rotation uses transform-box: fill-box and transform-origin: center.
- Badge glyphs are masked by their circle.
- Lucide at 12 px with a 1.5 px stroke: size 12, strokeWidth 1.5, absoluteStrokeWidth (lucide-react). In SwiftUI, export the paths with the stroke already scaled.

TRIGGERS
- Pointer hover: iPad pointer and Mac via .onHover; web via @media (hover: hover).
- Touch-down on iPhone: a custom ButtonStyle reads configuration.isPressed. The pose reverses if the touch becomes a scroll.
- Navigation fires on touch-up straight away and never waits for an animation.
- One-shot keyframes (arrow conveyor, glyph nudge) play once per hover-enter. Rest-to-Active transitions can be interrupted and continue from the current value.
- iPadOS: .hoverEffectDisabled() on tiles. The drawing is the hover feedback, with no system lift, shadow or colour change.

ENTRANCE (this is what makes the motion visible on iPhone)
- When the sheet's present transition completes (UIKit: the transition coordinator's completion; SwiftUI: start it from the presented view after the presentation finishes, not from a short timer), tiles 1 to 3 play Rest to Active and back once.
- Leader motion only, plus the glyph nudge: 180 ms out with ease-out, 180 ms back with ease-in-out. Tile 1 leads; 60 ms stagger.
- No ring and no loops.
- Once per app session. Skipped under Reduce Motion.
- Never blocks or delays a tap. If a tile is touched mid-entrance, that tile jumps to its press pose from its current values, and the others return to Rest in 120 ms.

REDUCED MOTION (accessibilityReduceMotion / prefers-reduced-motion)
- No translate, rotate or scale, including the 0.97 press scale. No entrance.
- Keep the ring fades. Photo uses a 150 ms opacity cross-fade between stacked Rest and Active copies.

TILE
- Press: scale 0.97 on the press spring.
- Keyboard and iPad focus: 2 pt brand/primary ring, offset 2, radius 18.
- Disabled tile: .disabled(true) / aria-disabled, with no hover or press handlers.

ACCESSIBILITY
- Drawings are decorative: accessibilityHidden(true) / aria-hidden.
- Each tile is a single button element with the label and hint from copy.

COPY ACTIONS (button and context menu)
- Set UIPasteboard.general.string to the address.
- Play UINotificationFeedbackGenerator .success.
- Post the announcement 'Address copied'.
- Revert the button after 2 s.
- Tile 3 uses .contextMenu, with the address as the menu title.

SYSTEM FLOWS
- Files: UIDocumentPickerViewController with contentTypes [.pdf].
- Camera: VNDocumentCameraViewController.
- Camera permission: AVCaptureDevice.authorizationStatus. When denied, show a UIAlertController with the copy in the copy list. 'Open Settings' opens UIApplication.openSettingsURLString. This is the native alert, not the shadcn Alert: it is a system permission recovery.
- Cancel in either picker returns to S03 at Medium.

DYNAMIC TYPE AND DETENTS
- Title and subtitle scale with UIFontMetrics(forTextStyle: .subheadline).
- Large and smaller: 2x2 fixed, detents [.medium].
- From xLarge (text about 16 pt): 'Connect Northgrid' (144.2) and 'From your mail app' (144.9) pass the 144 pt column, so text wraps to 2 lines. Tiles hug, rows stay equal height, and detents become [.medium, .large], opening at .large.
- From xxxLarge: 1 column. Each tile becomes a horizontal row: a 120 x 72 art area with the drawing at 0.75 scale, then the text column. The sheet content scrolls.
- This is code only, not drawn in Figma.

FIGMA BUILD
- Art sets: Pose = Rest | Active (Connect: State = Disabled | Enabled | Enabled active).
- Tile set: Type x State, 7 variants, each with its nested Art pose fixed. No instance-swap property.
- Smart animate between tile variants interpolates the nested Art because the layer names match. Test one tile first. If a Figma build does not interpolate it, detach the Art inside the 6 live tile variants (keep the layer names), and keep the Art sets as the source for S03b and the spec board.

VERIFICATION (scratch page, not published)
- All four drawings, Rest and Active, rendered at 1x and 2x in headless Chrome with Inter, next to the S04 export. Plus S03 at 1x in both states and S03b at 1x.
- Safe areas hold at Rest: tops at y 12, 18 (tilted about 16), 12 and 22; bottoms at y 90 or above. Active tops: Upload 6, Forward 7, Photo brackets 14.
- Text widths in Inter 14:
  - Titles: Upload the PDF 104.4, Take a photo 86.4, Forward the email 120.8, Connect Northgrid 126.2.
  - Subtitles: From the Files app 122.0, Of your paper bill 114.6, From your mail app 126.8. All fit the 144 column.
  - S03b step 1 'Open Northgrid's email in your mail app' is 262.3 and fits 279. The suggested 'Open Northgrid's bill email in your mail app' is 285.0 and would wrap.
  - Address at 16 Semi Bold: 215.6.
- S03b content height: 344 (96 + 12 + 170 + 16 + 50), ending at y 810.

--- Not part of the spec. Notice returned by Mobbin with these searches, verbatim, for the design lead: ---

**Your Mobbin AI usage is high this month**

Usage is unlimited during beta. If your usage stays at this level, you may need to purchase more credits once limits take effect. [View usage and plan options](https://mobbin.com/settings/billing-and-usage)

## Open questions

- Address placement: it moves to S03b, one tap away, plus a long-press copy on the tile. The alternative, seen in Fi's 'or use email' line, keeps it on S03 as a full-width row with a Copy button under the grid. That needs the Large detent, because the grid already uses 343 of the Medium sheet's roughly 350 pt. Which does the design lead prefer?
- Share target: should Ohm accept PDFs from the iOS share sheet, so a Northgrid attachment can be sent straight from Mail? If yes, S03b could add 'Or open the PDF and share it to Ohm', and tile 1's subtitle could stay 'From the Files app'.
- Connect Northgrid: should the tile stay fully inert, or offer a 'Tell me when it is ready' sign-up? The spec keeps it inert so it promises nothing.
- Lucide names: check that the kit has 'forward', 'unplug' and 'plug' (DECISIONS notes some icons ship under older names). Fallbacks: 'arrow-right' for forward, and 'plug' at 50% grey for unplug.
- Mail-rule tip (auto-forward Northgrid's emails): left off S03b. Gmail and Outlook ask the destination to confirm a verification email first, so the tip is only true if Ohm's inbox handles that. Product needs to confirm before it goes in the copy.
- S04 error states to design: a picked or forwarded PDF that can't be read, is password-locked, is not a Northgrid bill, or is a bill already added (August again). S13 covers failed checks, not unreadable files.
- Prototype: 'Take a photo' goes straight to S04, skipping the system camera, which is not drawn. Is that fine, or should there be a camera placeholder frame?
- Deliberate deviation from the critique: the S03b drawing is full size (150 x 96) inside a 347 x 96 tint card, not scaled to 0.75. At 0.75, 1 pt strokes land on 0.75 pt and blur, and the full-size layout still ends at y 810. The critique's other suggested numbers were adjusted after rendering: the Upload paper is at x 59, not 53, so 20 pt of the folder tab shows; the Photo bracket arms are 10 pt, not 12, to even out the blue weight.
- Entrance frequency: once per app session is proposed, so Neha sees it the first time she adds a bill each day without it repeating. Should it be once ever instead?
- Outside this area, seen while checking: S04's checklist still reads 'Found Northgrid Electric, August 2024', and S01's past bill reads 'July 2024'. Both should be 2026 under the date move.