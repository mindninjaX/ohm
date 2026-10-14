# lock-screen-notification

## Summary

Rebuild S02 from Apple's own iOS 27 kit parts at 1x: no scaled lock screen, the same Dynamic Island status bar as S01, and a notification laid out the way Apple builds it. It has a one-line title, "now" on the title row, a body that runs under the time, and the Ohm icon set as the kit icon's image fill. The new copy names the bill and replaces "6 checks" with a plain verdict ("August power bill: ₹36,42,160" / "Checked: no mistakes, no penalties." / "Pay by Tuesday 8 Sep to save ₹32,971."). I re-measured it in SF Pro Text 15 against the current PNG: it is exactly 2 body lines with 22pt or more to spare. The card is bottom-anchored 30pt above the controls, the gap measured from Apple's Examples/Notifications.

## Layout

CORRECTIONS TO MY PREVIOUS SPEC (read first)
- My earlier text widths were wrong. I measured with SF Pro at optical size 28 (the Display design) because the kit stores opsz 28. Figma actually renders this 15pt text with Text metrics. I checked against the current PNG: the title "August bill is here: ₹36,42,160" is 217pt there and measures 218.1 in SF Pro Text. Every width below is SF Pro Text 15 with -0.23 tracking, measured in CoreText.
- The node IDs I gave before (5:6097, 5:6173, 5:6187) are on the locked archive page "v1 · Screens · 13 Oct". Do not touch that page. The working frame is S02 Notification 9:7470 on page "Screens". It has 4 children:
  - 9:7471, the lock screen scaled to 97.8%.
  - 9:7472, the notification. It already has Title set to Fill + truncate and Time set to "now", and it carries the On tap > S06 link.
  - 9:7473, the floating "Ohm app glyph".
  - 9:7474, a kit "Status bar - iPhone 17 Pro" added only for the island, with its Levels hidden.

DIAGNOSIS (why it looks broken)
1. The whole lock screen was scaled with K from 402 to 393, so every system part is off by about 2%: status icons 12.7 instead of 13, date 21.5pt instead of 22, controls 56.7 instead of 58, all on fractional positions.
2. The kit's lock-screen status bar has empty spacers and no Dynamic Island. That is the "broken menu bar".
3. The notification was resized from 386 to 377, but the kit's text layers are fixed width (Title 235.67, Description 309.67), so the title ran under the time label.
4. The time label "Ohm · now" (75pt) is not how iOS does it. iOS shows no app name when a notification has a title.
5. The glyph floats above the card instead of being the icon.
6. The body orphaned "₹32,971." on a third line.

FRAME
- Frame: S02 Notification (9:7470).
- Layout: remove auto layout (it is Vertical now; children keep their positions).
- Clip content: ON.
- Fill: #000000. It is never visible.
- Delete: 9:7471 (scaled lock screen), 9:7473 (floating glyph) and 9:7474 (extra kit status bar).
- KEEP 9:7472 (the notification), because it carries the prototype link to S06. You will move it into a wrapper.
- Layer order below runs front to back.

1. STATUS BAR (front)
- What: an instance of the local component "Status bar" (5:2866, key de29c200c093cec385915f0eb6a377399f497895), the same one S01 uses, so the island and glyphs do not jump between screens.
- Position: x 0, y 0, W 393, H 62.
- Hide ONLY "iOS / Status bar - iPhone 17 Pro > Time > Frame" (the 37 x 22 "9:41" label). Keep the 125pt "Time" container visible as a spacer.
- Colour mode: in Appearance, set the variable collection "Colors" to Dark on this instance. The kit binds Time, Cellular, Wi-Fi and Battery to Labels/Primary, so they turn white. Apple's own iPhone 17 Pro lock-screen example does exactly this. If the glyphs stay dark, set the same mode on the nested "iOS / Status bar - iPhone 17 Pro" instance.
- Result, left: empty. On the lock screen the time lives in the big clock.
- Result, centre: Dynamic Island, a 125 x 37 pill in #000000 at x 134, y 13.67.
- Result, right: cellular 19.33 x 12.33, Wi-Fi 16.67 x 12.33 and battery 27.33 x 13, gap 7, white, spanning x 278.34 to 355.66 at y 25.67.

2. SWIPE-DOWN INDICATOR (the Control Center hint)
- Copy Apple's own layer: select "Swipe down indicator" inside the new lock-screen instance (step 7), Cmd+C, select the S02 frame, Cmd+V.
- Its values, do not retype them: rectangle 48 x 2.33, radius 1.17, fill #FFFFFF, layer opacity 35%, background blur 29.9. That makes it a translucent grey bar, dimmer than the status glyphs.
- Position: x 293, y 45.8, centred under the glyph cluster (centre x 317).

3. NOTIFICATION AREA (bottom-anchored wrapper, so taller states grow upward as on iOS)
- Frame "Notification area": x 14, y 514, W 365, H 200 fixed, so its bottom is at 714.
- Auto layout: Vertical, alignment bottom-left, gap 8 (the iOS stack gap). No fill. Clip content OFF, so the glass shadow is not cut.
- Constraints: Left and right, Bottom.
- Move 9:7472 inside it.

3a. Notification card, 9:7472. This is the kit "Notification - Collapsed", Stack=1, key 65b751538bd42638867cc74854009fb99a217b14.
- Size: width Fill (= 365), height Hug.
- Kit styling stays untouched: radius 24, padding 14 all round, item gap 10, Clear Glass layer, white text. Apply no brand tokens to the card.
- Show Image: OFF.

  Icon ("Icon > Custom-Icon-Default", 38.33 x 38.33, vertically centred)
  - Apple's kit draws the app icon as an IMAGE fill on this square rectangle (radius 0; the rounded mask is baked into the image).
  - Replace that image fill with the 128 x 128 PNG exported from "Ohm / App icon" (see illustrations). Fill mode: Fill.
  - No floating layers.

  Text column ("Frame")
  - Fill. Width = 365 - 14 - 38.33 - 10 - 14 = 288.67, starting at screen x 76.33.

  Top row
  - "Title and Description" (Fill) = 249.67.
  - Then gap 10.
  - Then "Time and Image" (Hug) = 29.

  Title (layer "Title")
  - Set the component property Title#135:0 to: August power bill: ₹36,42,160
  - Layer settings: horizontal Fill (already set in 9:7472), Text resizing "Auto height", Truncate text ON, Max lines 1.
  - Measured 214.6 of 249.67, so 35pt spare.
  - Type is the kit's, unchanged: SF Pro Semibold 15/17, -0.23, white bound to the kit variable.

  Time (nested instance "Time")
  - Its Time#533:15 property stays "now", lowercase.
  - DO NOT change its fill or blend mode. The kit draws it as #4D4D4D with Plus Lighter (Linear Dodge) on the instance, which reads as light grey on glass. A plain #4D4D4D fill would show as a dark smudge.
  - No app name and no "·".

  Description (layer "Description")
  - Set Message#135:4 to "Checked: no mistakes, no penalties." then a soft line break (double-click the text on canvas, Shift+Return), then "Pay by Tuesday 8 Sep to save ₹32,971."
  - Horizontal resizing: FIXED, W 288.67, the full text-column width. This is Apple's construction: the kit master has Description fixed at 309.67 = 386 - 76.33 inside a 241.67 parent, so the body runs under the time label as on a real iPhone. Rule: Description W = card W - 76.33.
  - Text resizing: Auto height. Truncate ON, Max lines 4 (iOS shows at most 4 body lines collapsed).
  - Measured line 1 is 246.1 and line 2 is 266.1 of 288.67.

  If Figma blocks an override, work through these in order:
  (1) Try the overrides above. Figma already accepted the Fill + truncate overrides on this exact instance (9:7472), so sizing overrides work in this file.
  (2) If the W field of Description is locked, do NOT use Fill. Fill gives 249.67, and line 2 (266.1) would wrap into the orphan again. Instead right-click 9:7472 and choose Detach instance. Clear Glass, Icon and Time stay linked kit instances; keep their effects and styles. Then set Title to Fill + Auto height + truncate 1 line and Description to Fixed 288.67 + Auto height + max 4 lines.
  (3) After detaching, check the On tap > S06 link is still on the card.

  AS BUILT (round 1, accepted by QA): Figma would not take a width override on the Fixed Description (it snaps back to 309.67), so S02 uses Description = Fill (249.67) and keeps 9:7472 linked to the kit and to S06. The round 1 copy fits: line 2 "Pay by Tue 8 Sep to save ₹32,971." is 235 of 249.67, so Description H is 36 and card H is 81. Any new or longer body copy (for example S02b's 269.2pt line) must be re-measured against 249.67, not 288.67. Detach only if a line wider than 249.67 is needed.

  QA, required before moving on
  - Title H 17, Description H 36 (2 lines x 18), card H 81, icon at y 21.33 inside the card.
  - If Description reads 54, the copy wrapped. Stop and check the soft break and the 288.67 width; never shrink the type.
  - A card H of 81.5 is acceptable only if the Title kept a fixed 17.5 height.

  Screen positions
  - Card: x 14 to 379, y 633 to 714.
  - Icon: x 28, y 654.33.
  - Title: x 76.33 to 326, y 647 to 664.
  - "now": x 336 to 365, y 647 to 664.
  - Body: x 76.33 to 365, y 664 to 700.
  - 14pt padding to the card bottom.

4. LEGIBILITY SHADOW (Apple's, from "Notification - Collapsed - List")
- Rectangle "Notification shadow": x 0, y 607, W 393, H 140 (card top - 26 to card bottom + 32.67).
- Fill #000000 at 5%, blend Linear Burn, layer blur 100.
- Place it behind "Notification area". It is barely visible by design.

5. CONTROLS (flashlight and camera)
- Copy the "Controls" frame from inside the new lock-screen instance (step 7) and paste it into S02. Its two buttons are instances of the kit's private "_Controls - Lock Screen" (58 x 58 Clear Glass circles), which you cannot insert from Assets.
- Position: x 46, y 744, W 301, H 58. Set the auto layout gap from 194 to 185 (393 - 46 - 46 - 58 - 58).
- Leave the symbols as the kit has them: SF Pro Bold 21, #D9D9D9, Plus Lighter.
- The gap from the card bottom (714) to the controls (744) is 30. I measured it in Apple's Examples/Notifications (iPhone 17 Pro):
  - The list ends 122pt above the screen bottom with 16pt padding, so the card bottom is 138pt above the bottom.
  - Apple's controls sit 108pt above the bottom.
  - 138 - 108 = 30.

6. HOME INDICATOR
- Kit "Home Indicator", Device=iPhone, Orientation=Portrait (key 73996dc9c7ff1e55d03d8941dece5823b82a3f6c).
- Position: x 0, y 818, W 393, H 34.
- Colors = Dark, as Apple's lock screen sets it. The fill is Labels/Primary, so it turns white.
- Result: a 144 x 5 bar, radius 100, at x 124.5, y 839.

7. LOCK SCREEN BACKGROUND (back)
- A FRESH kit "Lock Screen - iPhone" (key 406cf9e9b32ef392f50679790ce909a746758ff9) at its native 402 x 874. Never use K or Scale.
- Position: x -4.5, y 0. That centres it on 196.5 and crops 4.5 off each side and 22 off the bottom; none of that is visible.
- Copy its Controls and Swipe down indicator first (steps 2 and 5). Then hide inside it: "Status bar - iPhone", "Swipe down indicator", "Controls" and "Home Indicator".
- Keep "Lock Screen Widgets" hidden.
- Keep visible:
  - Wallpaper, Mode Light.
  - "Lock Screen Widget - Inline" with Text#211:5 = "Thursday, 3 September". Kit type: SF Pro Semibold 22, white, Plus Lighter. y 82 to 108, centred.
  - "9:41 - Fill" and "9:41 - Glass Effect" (the iOS 26 glass clock), 205.06 x 87.4 at x 93.5, y 115.

VERTICAL MAP (y)
- 0 to 62: status bar (island 13.67 to 50.67).
- 45.8: swipe-down hint.
- 82 to 108: date.
- 115 to 202.4: clock.
- 202 to 633: open wallpaper.
- 607 to 747: soft shadow.
- 633 to 714: notification.
- 714 to 744: gap of 30.
- 744 to 802: controls.
- 818 to 852: home indicator (bar at 839).

TOKENS
- Chrome and notification use only Apple's kit colours and blends: Labels/Primary white, the #4D4D4D Plus Lighter time, #000000 island, Clear Glass.
- Brand colours appear only inside the app icon: primary #265CFF, primary-subtle #E9EFFF, line #DCDFE4, white #FFFFFF.

S02b (optional, S13 path)
- Duplicate S02 and change only the two text properties (see copy).
- Its card links to S13 instead of S06.

## Copy

- **Lock screen date (kit Lock Screen Widget - Inline, Text#211:5)**: Thursday, 3 September
- **Lock screen clock (kit glass clock, unchanged)**: 9:41
- **Notification title (Title#135:0), one line**: August power bill: ₹36,42,160
- **Notification time (nested Time#533:15)**: now
- **Notification message (Message#135:4), soft line break after the first sentence**: Checked: no mistakes, no penalties.
Pay by Tuesday 8 Sep to save ₹32,971.
- **S02b variant title (S13 path, opens S13)**: August power bill: ₹4,620 extra
- **S02b variant message, soft line break after the first sentence**: This bill says 900 kVA booked, not 700.
Pay by Tue 8 Sep to still save ₹32,971.
- **Truth mapping (not on screen)**: 'No mistakes' summarises checks 1, 2, 3, 4 and 6, all passed: every line = meter reading x approved rate; 700 kVA unchanged; HT Commercial fits a hotel; multiplier 2,000 unchanged; 1% of ₹32,97,130 is ₹32,971. 'No penalties' is check 5: peak 664 of 700 kVA, power factor 0.998. 'Power bill' matches S05's 'Power company'. Tuesday was derived with cal: 8 Sep 2026 is a Tuesday, 5 days after Thursday 3 Sep. 'Thursday, 3 September' is the en_IN date format, confirmed with date. The S02b figures (₹4,620, 900 vs 700 kVA, ₹32,971) all already appear on S13. No new numbers.
- **Fit check (SF Pro Text 15, tracking -0.23, CoreText; method calibrated on the current PNG within 1pt)**: 393 frame: title 214.6 of 249.67; body 246.1 and 266.1 of 288.67. S02b: title 224.3 of 249.67; body 269.2 and 261.2 of 288.67. 375pt phone (column 270.67, title slot 231.67): every line still fits. iPhone 17 Pro at 402 (column 297.67): fits. The time label 'now' is 29 wide.

## Illustrations

### Ohm / App icon (used as the notification icon image)
- Concept: A tiny version of the S04 bill illustration the user approved: a white bill page with the blue bolt tile, skeleton lines and the blue scan line, on a primary-blue tile. The lock screen and the reading screen then read as one product, instead of a generic flashlight-style bolt.
- Construction: 1. Make a local component 'Ohm / App icon' as a 1024 x 1024 frame. Corner radius 229 (22.4%), corner smoothing 60%, clip ON, fill primary #265CFF.
2. Page: rectangle 512 x 664 (S04's page ratio 179:231), radius 88, fill #FFFFFF, at x 256, y 180.
3. Bolt tile: 200 x 200, radius 52, fill primary-subtle #E9EFFF, at x 328, y 252.
4. Bolt: a custom SOLID bolt path in #265CFF, about 110 x 140, centred in the tile. Do not use a stroked Lucide zap with a fill added.
5. Skeleton lines, all fill line #DCDFE4, radius 24:
  - 120 x 48 at x 560, y 328, beside the tile.
  - 368 x 48 at x 328, y 500.
  - 240 x 48 at x 328, y 580.
  - 200 x 48 at x 328, y 740.
6. Scan line: rectangle 512 x 28, fill #265CFF, at x 256, y 660. It is clipped to the page, like the scan line in S04.
7. No gradient, text or emoji.
8. Export PNG at 0.125x (128 x 128, transparent corners) and set it as the Image fill (Fill mode) of 'Icon > Custom-Icon-Default' in the notification. This is how Apple's kit expects a custom app icon.
9. QA at 100% zoom, 38.33pt: the page, the blue tile and the scan line must read. If the page turns to mush, use the fallback: the same blue tile with only the solid bolt in #FFFFFF at 52% of the tile width.
10. Later, reuse the same master for the home-screen (60pt) and App Store (1024) icons.
- Hover: None. iOS system UI has no hover. The only motion is the arrival spring in interactions.

## New screens

### S02a Lock screen, arriving (prototype only)
- Purpose: The start of the 'Monthly bill' flow, so the notification arrives the way iOS brings it in. This is the background read that S04's 'we will notify you' promises, and the monthly path where a forwarded bill email is read without opening the app.
- Layout: An exact duplicate of S02. 'Notification area' is at y 530 (16 lower), and the card 'iOS / Notification' and 'Notification shadow' are at opacity 0. Everything else is identical. After delay 800ms, Smart animate to S02 with Gentle spring, 400ms. Move the 'Monthly bill' starting point from S02 to S02a.
### S02b Notification, check needs a look (optional)
- Purpose: The lock-screen entry to the 'Something is off' path, using only figures already on S13.
- Layout: A duplicate of S02 that changes only Title#135:0 to 'August power bill: ₹4,620 extra' and Message#135:4 to 'This bill says 900 kVA booked, not 700.' + soft break + 'Pay by Tue 8 Sep to still save ₹32,971.' Same QA: card H 81, Description H 36. The card links to S13 instead of S06.

## Interactions

- Tap the notification card (9:7472) on S02 -> Opens S06 Bill summary for August 2026. Keep the existing link (Smart animate, ease out, 250ms, the file default). S06's first line should repeat the verdict words, so the tap lands on the same message (see open questions).
- S02a after delay 800ms (S02a becomes the 'Monthly bill' flow start) -> Smart animate to S02 with Gentle spring, 400ms. In S02a, 'Notification area' sits 16pt lower (y 530), and the card 'iOS / Notification' and 'Notification shadow' are at opacity 0. The card rises and fades in, the way iOS brings a notification up from the bottom. Layer names must match between the two frames.
- Tap the S02b card -> Opens S13 Check failed. Same transition as the S02 card.
- Drag up on the bottom hotspot (393 x 44 at y 808 to 852), a prototype shortcut only -> Goes to S01 Home, Move in from bottom, 300ms. On a real phone this unlocks to the iOS Home Screen. Label the hotspot layer 'Unlock (prototype shortcut)'.
- Swipe left or long-press the notification -> System behaviour (Options or Clear, or the expanded preview). Not prototyped.

## Research

- Apple iOS and iPadOS 27 kit: Examples/Notifications and Notification - Collapsed (primary source, read-only) : This is where the build numbers come from. The card is 14pt from each screen edge, 30pt above the flashlight and camera, with a 5% blurred shadow behind it. The time is #4D4D4D in Plus Lighter. The body is fixed to the full text column, so it runs under the time. The icon is an image fill. The status bar uses Colors=Dark.
- CRED (statement screen; Indian fintech) https://mobbin.com/screens/4b32ea66-a7dc-4ba1-99f1-335da21df047: CRED puts the amount, 'pay before due date' and the verdict 'zero hidden charges detected' (attributed to CRED protect) side by side. That is the same pattern as Ohm's 'Checked: no mistakes, no penalties' next to the amount and deadline, and Indian users already know it.
- CRED (notification permission; Indian fintech) https://mobbin.com/screens/495eb35e-96b1-422d-93f4-03e811afe6f9: CRED justifies notifications with bill payment reminders. On-time bill alerts are the expected reason an Indian finance app notifies. Mobbin has no real CRED, PhonePe or Paytm lock-screen captures.
- Binance (lock screen) https://mobbin.com/screens/25d0c29d-d404-4077-9ccc-40597c87e710: Two things. First, money alerts lead with a confirmed status ('Credited' with a check), not a process; that supports a verdict instead of '6 checks passed'. Second, the chrome: nothing at top-left, white glyphs at the right, and a translucent grey swipe bar beneath them.
- DoorDash (lock screen) https://mobbin.com/screens/70df894b-4f88-4302-83e3-d8fabb7f53ad: The date line is the full weekday plus date above the clock ('Tuesday, January 9'). For en_IN that is 'Thursday, 3 September'. Note: Mobbin lock-screen captures are Live Activities on a template, so placement is taken from Apple's kit, not from these (Temu dropped as placement evidence).
- Zalando (notification mock) https://mobbin.com/screens/112cf398-5569-4dbc-8a43-56d7572a39bf: Current iOS anatomy: icon on the left, a bold one-line title sharing its row with a lowercase 'now', and the body below. There is no app-name row.
- Jobber (notification mock) https://mobbin.com/screens/200a8a3a-14ee-4fa6-ac8f-5da34b34a103: An 'APP NAME ... now' header row is the old pre-iOS 15 layout. That is why 'Ohm · now' read as wrong.
- Wealthfront (notification mock) https://mobbin.com/screens/f80dd447-b373-49d1-93c6-a4c5e5b7a6c5: The money outcome is stated in plain words, which is the tone for line 2 ('Pay by Tuesday 8 Sep to save ₹32,971.').
- Ubank (bill reminders flow) https://mobbin.com/flows/5d32443f-6b8a-41cc-88fb-0c6be93e91e9: Ubank sends a reminder the day before a bill is due. That suggests a possible Mon 7 Sep reminder before the discount ends (open question).

## Code notes
I verified everything read-only in Figma; nothing was modified.

What I read in "iOS and iPadOS 27":
- Notification - Collapsed, Stack=1 (0:11292): W 386, padding 14, gap 10, radius 24.
  - Title: SF Pro Semibold 15/17, -0.23, Fixed 235.67.
  - Description: Regular 15/18, Fixed 309.67, wider than its 241.67 parent.
  - Time instance: blend LINEAR_DODGE, text #4D4D4D, default "9:41 AM".
  - Icon: "_Custom Icon" with an IMAGE-filled rectangle.
- Lock Screen - iPhone (557:20840):
  - Controls at y 766, 58 x 58, gap 194.
  - Swipe down indicator: white, 35% opacity, background blur 29.9, x 300.2, y 45.8.
  - Home Indicator: Colors=Dark.
- Examples/Notifications, Expanded=False:
  - "Status bar - iPhone 17 Pro" with Colors=Dark, glyphs bound to Labels/Primary.
  - Notification list at y 414.67 to 752 (padding 16 and 14).
  - Shadow: black 5%, Linear Burn, blur 100.
  - Overlay: black 25% (this is for the scrolled-up list state, not one new notification, so it is not used).

What I read in "Bill app":
- Working S02 is 9:7470; v1 archive nodes 5:6097, 5:6173 and 5:6187 are locked.
- Local Status bar 5:2866: island at x 134; glyphs 278.34 to 355.66.

Measuring:
- Swift and CoreText with SFProText-Regular and Semibold at 15pt, kern -0.23 (0 for the time).
- Calibrated on exports/S02 Notification.png: title 217 rendered vs 218.1 measured; body line 285.5 vs 286.6.
- The Display optical size (opsz 28) gives about 14% narrower widths. That caused my earlier error.

For the eventual build:
- UNNotificationContent: title "August power bill: ₹36,42,160"; body with a real "\n"; no subtitle.
- en_IN number grouping.
- threadIdentifier "bill-2026-08"; deep link to the August 2026 bill (S06), or to the failed check (S13) for S02b.
- interruptionLevel .active (the deadline is 5 days away, not time-sensitive).
- Show Previews defaults to When Unlocked, so amounts appear only after Face ID.

## Open questions

- Disagreement with the critic, kept on purpose: Description stays Fixed at the full text-column width (288.67 = card width minus 76.33), not Fill. Apple's master builds it this way (Fixed 309.67 inside a 241.67 parent), so the body runs under 'now' as on a real iPhone. Fill would make it 249.67, wrap line 2 (266.1) and bring the orphan back. The reflow concern is covered by the rule 'Description W = card W - 76.33' and the QA step (Description H must be 36).
- S06's first line should repeat the notification's verdict words ('No mistakes, no penalties' or 'Checked: no mistakes, no penalties') so the tap lands on the same message. That screen belongs to another area. Please confirm the shared reassurance phrase.
- 'Power bill' vs 'electricity bill': S09 says 'August electricity bill'. 'August electricity bill: ₹36,42,160' (242.1pt) fits at 393 with only 7.6pt spare, and on 375pt phones it would truncate the amount, so I used 'power bill' (it matches S05's 'Power company'). If you prefer 'electricity', use 'August electricity: ₹36,42,160' (217.2pt).
- Apple's kit disagrees with itself on the lock-screen status bar. 'Lock Screen - iPhone' leaves the left side empty, but Examples/Notifications shows '9:41' there. A real phone may show the carrier name. I followed the Lock Screen component and the Mobbin captures (empty), because a second '9:41' above the big clock looks duplicated.
- Should a second reminder go out on Mon 7 Sep, the day before the discount ends? Example: title 'Last day tomorrow to save ₹32,971'. Not designed.
- S04 promises 'You can close this, we will notify you' but has no close control. If that area adds one, wire it to S02a.
- Wallpaper: kit Light (current, matches the light app) or Dark (more contrast behind the white date and the glass card)?