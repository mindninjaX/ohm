# global-web-system

## Summary

v3 keeps the v2 kit (Top bar, Bottom nav, Footer, Sheet, Toast, one Button, one Icon button, all flat, all buildable in CSS) and fixes what the critique found, using facts I checked in the live Figma file and in vendor docs. Main changes: (1) the header is now WHITE with a bottom hairline, like the footer and nav, because installed iOS web apps paint their own status bar and black-translucent forces white status text (invisible on grey); the meta tag is status-bar-style default. (2) Only two title patterns remain: a compact 18/28 bar title on every pushed screen, and the tab-root bars (Home identity bar, Large 30/36 on Trends). The scrolling Page title is deleted. (3) Footers are Single (106) by default; Stack stays only on S11 and confirm sheets; 'Something looks off' becomes a Link M and 'Share with owner' an Outline L in content, so fixed chrome on S05, S06 and S13 drops from 280 to 224 of 852. (4) Sheets never clamp in static frames, dismiss four ways and never commit; a height table shows which sheets fit at 700 tall (only S05.1 scrolls). (5) Buttons: six allowed styles in one Figma property, tinted Destructive, identical pressed overlays in Figma and code, verb-first labels with one documented exemption. (6) One toast variant with a full toast table and a rule for toasts over sheets. (7) Routing and Back semantics, the install and push reality (iOS web push needs a Home Screen app), payment-failed and offline states, desktop overlay limits, accessibility fixes. (8) The migration list is now a frame table of all 27 live frames with node IDs, measured current chrome, new chrome, footer type and expected height, plus a round-1 to live name cross-reference. Nine open questions became sixteen decisions marked 'override if you disagree'; only real open items remain.

## Layout

WEB CHROME SPEC v3 (supersedes v2). Applies to every frame under Section 'Screens' (9:7426) except S02, a real iOS lock screen that stays as built. Items marked CHANGED differ from v2.

0. DECISIONS (each one is 'override if you disagree'; everything that could be decided now is decided)
D1 CHANGED. Chrome is flat and WHITE. Header, Footer and Bottom nav are white (library 'card'), each with one 1 px brand/line hairline on the edge that faces the content (header: bottom edge; footer and nav: top edge). The page stays surface-muted. No glass, no blur, no drop shadow, no floating pill. Why white and not the v2 grey header: in an installed iOS web app the system paints the status bar; with status-bar-style black-translucent iOS forces WHITE status text (see research), invisible on grey. With status-bar-style default the text is dark on a light bar, so a white header continues it. It also makes top bar, footer and nav one family and deletes the 'Scrolled' hairline logic and its IntersectionObserver.
D2 CHANGED. Two title patterns only. Compact bar with an 18/28 title on every pushed screen. Tab roots have their own bar: Home identity bar (S01) and Large 30/36 bar (S12 Trends). The scrolling Page title, the 'Show title' property and the title fade are deleted. S07's title is 'What Ohm checked' (not '6 checks').
D3 CHANGED. Bottom nav only on S01 and S12. S01.1 All bills and S01.2 July bill are pushed pages: Back, no nav.
D4 CHANGED. At most one footer, and Single by default. Stack only on S11 (Share receipt over Done) and confirm sheets (S04d, S04.1). S05, S06, S13 get Single. 'Something looks off' becomes a Link M in content, directly under the details card (S05 family). 'Share with owner' becomes an Outline L in content, directly under the discount card (S06 and S13).
D5 CHANGED. One toast variant, one rule, one table (section 7). 'Rechecked. 1 thing to look at.' is not a toast: it is the S13 style summary with an inline Alert.
D6 Copy feedback is a toast everywhere. The button label and width never change (retires the 'Copied' label swap).
D7 Razorpay Checkout options.theme.color = #265CFF. Nothing else inside Checkout is styled by us.
D8 CHANGED. Pressed and hover states are overlays, identical in Figma and code: ink-strong at 12% over Primary and 6% over every other style (hover is half of that: 6% and 3%). Overlays only, no new variables. For reference, Primary pressed renders about #2355E8 (primary mixed 12% with ink-strong).
D9 CHANGED. Sheets dismiss four ways: Close, tap on the dim, swipe down, Esc. Dismissal always means cancel or Back, never a commit (on S04d it equals 'Keep reading'). Sheet max height = viewport height minus 56. Static Figma frames always show the sheet's FULL content, never clamped.
D10 CHANGED. Destructive is tinted: danger-subtle fill, danger label, never solid red. Used only on S04d (round 1 chose tinted because only an upload is lost).
D11 CHANGED. Meta: apple-mobile-web-app-status-bar-style = default (not black-translucent). viewport-fit=cover stays for the bottom inset only.
D12 CHANGED. Back = history back when the app has in-app history, otherwise the screen's parent route (section 8). Sheets push a history entry so the browser Back closes them.
D13 CHANGED. Button labels are verb first, with one listed exemption: 'Something looks off' (round-1 copy the lead accepted; it states her situation instead of accusing Northgrid). Renamed: 'Northgrid · HT' becomes 'Your connection'; 'Full bill' becomes 'View full bill'; 'Or upload a clearer copy of the bill' becomes 'Upload a clearer copy'.
D14 CHANGED. One name per bill: 'August bill' on Home, S06 and S10; 'July bill' for the past one. The year only appears as a subtitle where needed.
D15 CHANGED. S04 Close is a trailing X (same position as every sheet), and the round-1 caption is restored so the X is explained in words, not only by aria-label.
D16 CHANGED. The migration list covers every live frame (27 today, with node IDs) and every frame built later; QA and export run over the whole Section, not 13 frames.

1. THE FIVE RULES
1) Chrome is flat and white. Fills, 1 px hairlines, radius. Separation comes from a hairline or a change of fill. 2) One fixed thing at the bottom at a time: footer, bottom nav or sheet. 3) Frames are as tall as their content (minimum 852) and every static frame shows all of its content, sheets included. Header, footer, nav and home indicator are pinned layers that never cover content. 4) One button label style everywhere (Inter 16/24 Semi Bold). Two heights: 48 (full width) and 40 (hug). Six allowed button styles. 5) Device context is system painted: the 62 px status zone and the 34 px home indicator zone. They are named 'iOS / ...', pinned, and ignored by the build. The web header is 56 tall and the footer, nav and sheet footer own the bottom inset.

2. SHARED NUMBERS AND TOKENS
- Frame width 393. Gutter 16 (cards 361 wide, inner 329 with padding 16). 4 px grid. Gap between cards 12, between sections 24. Hit target minimum 44 x 44.
- Fills: Page = brand/surface-muted #F1F2F4. Cards = library card white, radius 16, borderless. Header, Footer, Bottom nav, Sheet = library card (white). Toast = ink-strong #091E42. Dim = ink-strong at 45%. Hairline = 1 px brand/line #DCDFE4.
- Text styles (library keys in the build guide): Text-3xl/Semi Bold 30/36 (Large bar), Text-lg/Semi Bold 18/28 (bar and sheet titles), Text-base/Semi Bold 16/24 (ALL button labels), Text-sm/Medium 14/20 (toast, inline links), Text-xs/Regular 12/16 (bar subtitle), Text-xs/Medium and Semi Bold (nav labels).
- Icons: Lucide only, instance.rescale(size/24), stroke bound to a brand token. Sizes: 24 (bars, nav, icon buttons), 20 (L button), 18 (M button), 16 (chevrons, inline). All keys below exist in the shadcn library file rbjdZF2zNKeubApgiy0ifS (checked): chevron-left 3f96be810e80d0bb4506ab67655e1a6d579be44b, x af7ca0cb001cf8163e3924e6a41bfb77a671e25b, file-text 4d99fc808e5c985b740ddf0fea70590b683e8b1c, bar-chart-3 157d53dd53990afefb83639dbf71ec0ef44e9daf (Trends tab; the kit's name for the column chart glyph; chart-column is not in the kit), circle-check 4fcde8356ffeb3749380ca73dc385c4188280ea7, info 2e14764018f1910c482378c26a108db5b6306476, lock fe58baf85db85a388c4f499ecdb6cadc0fcf3ff7, plus c415efc3bfd6b90dfdd36ece15276549606cfe30, copy af406fb0086ad4d2cf4dda1b39306c9961927666, share c49c74b19b1aa55b69536fdf6e4f8497270ce455, chevron-right f050f05fc38650d3503b852ac0b1d907a27fa6ff, upload 0155076a09c45c0967a87b596733689eb7574e8d, paperclip 67b4cc13e0820fd8f459db0ac5477a7a25914abf, circle-x b622aad359fe50eba0c65a56331e70e707714c7f, triangle-alert 43f628c7dca7be4788e16948f98969ec3c06f9b9, wifi-off 51cc18d478679b119fc764c3c43a06b0c8d72650, scan-text 90ed7abeeb44a9c7b5d41fad2f313990fd4a1bcd. Spinner = kit Spinner (size-5) key e4f57c11398523e5167ea4a2536120e4ae35b1ac. Earlier builders saw imports hang for keys not yet in the file: start every import as an un-awaited promise at the start of the session, poll for it, and keep every step idempotent. No local vector fallback is needed because every key resolves.
- Z order: content 0, header / footer / nav 30, dim 50, sheet 51, toast 60.

3. WHAT STAYS AND WHAT GOES
Stays (device context only, never built in the web app): local 'Status bar' 5:2866 (393 x 62), instance renamed 'iOS / Status bar'; kit Home Indicator (Device=iPhone, Portrait) as 'iOS / Home indicator'. Both pinned. The S02 lock screen and its notification stay.
Retired everywhere else: kit 'Toolbar - Top - iPhone', 'Tab Bar - iPhone', 'Sheet - iPhone' and its Grabber and Overlay, the glass Button Group capsules, the kit 'Scroll edge' gradients (S01 has two frames named 'Scroll edge (top)' and 'Scroll edge (bottom)'), SF Symbol glyphs, and the local 'Bottom nav' set 5:2903 and 'Top bar' 5:2873 (never edited, v1 archive pages use them). New local components carry an 'Ohm / ' prefix and live on page Foundations in a new Section 'Components · Web chrome' at x 0, y 1900, width 2400 (checked free: today the page holds only the Foundations frame 5:1282 at 0,0 sized 1419 x 1700 and sections at x 6000 and beyond; re-run an overlap scan before placing). Status bar and home indicator zones: the mock shows them over our bars; in the build iOS paints them.

4. THE CHROME KIT (new local components, Foundations page)

A0. SAFE AREA (CHANGED, now honest about the real values)
- Mock: status zone 0 to 62 (kit status bar height, NOT the real inset), home indicator zone bottom 34. Real values: 393 wide Dynamic Island iPhones report env(safe-area-inset-top) = 59 (62 on the 402 wide Pro models). With status-bar-style default the page starts BELOW the system status bar, so the top inset is 0 and the web header is just the 56 bar; in a Safari tab both insets are 0 and the browser draws its own bars. The bottom inset (34) is real with viewport-fit=cover in an installed app.
- So: Mock header 118 = 62 device + 56 web. In the build the header is 56 tall (plus env(safe-area-inset-top), usually 0). Footers, nav and sheet footers own the bottom inset (padding-bottom). Nothing tappable sits inside either zone.

A1. Ohm / Top bar (component set, Type = Compact | Large | Home), fixed. CHANGED: white fill, 1 px bottom hairline, no 'Show title', no 'Scrolled'.
Common: fill library card (white) that also runs behind the status zone; 1 px brand/line stroke on the bottom edge only (inside); no shadow. Layer 'Header' = 'iOS / Status bar' (62) + the bar.
Compact (every pushed screen): 393 x 56. Horizontal auto layout, centre aligned, gap 4. Padding right 16 with a Button M trailing, 8 with an Icon button trailing, 16 with nothing. Padding left 0 when Back is shown (Back touches the screen edge for thumb reach), 16 when Back is hidden (S04).
- Back: Ohm / Icon button Ghost 44, chevron-left 24 ink-strong, aria-label 'Back'.
- Title block: starts x 48 (x 16 without Back), fills the rest, min width 0. Title Text-lg/Semi Bold 18/28 ink-strong, one line, ellipsis. Optional subtitle Text-xs/Regular 12/16 ink-muted (block 44 tall, fits in 56). The title truncates before a trailing button ever shrinks. It is the page's single h1.
- Trailing, at most one: Icon button Ghost 44 (x, share) or Ohm / Button Outline M ('Your connection', 'View full bill'). Never a non-tappable text capsule.
- Component properties: Back (bool), Subtitle (bool), Trailing (none | icon | button).
- Header = 62 + 56 = 118.
Large (S12 Trends): 393 x 64. Title Text-3xl/Semi Bold 30/36 ink-strong at x 16, centred vertically, optional trailing Icon button. Header = 62 + 64 = 126. One fixed row, no collapsing.
Home (S01): 393 x 64, padding 0 16, gap 12. Avatar 40 (kit fallback, fill primary-subtle, 'NK' Text-sm/Semi Bold in ink-strong; CHANGED from primary, which is only 4.5:1 on that fill). Text block: 'Harbourline Hotels' Text-base/Semi Bold ink-strong (truncates first) over 'Riverside · Northgrid' Text-sm/Regular ink-muted. Trailing Button Outline M 'Add bill' with plus 18. Only the button is tappable. Header = 126.
A2. REMOVED (the scrolling Page title).

A3. Ohm / Bottom nav (component set, Active = Bills | Trends), fixed, 393 x 94 = 60 content + 34 inset.
- White fill, 1 px top hairline, no shadow, no blur, flush to both edges. Reason (CHANGED wording): nothing ever scrolls under it that needs blurring, it matches the white header and footer, and a Figma frame equals its CSS one to one. Optional glass hint if the lead wants it later: bg-card/90 with backdrop-blur-md, solid fallback under @supports not (backdrop-filter), nav and header only; not the default.
- Two tabs, each 196.5 x 60, link semantics. Vertical stack, centred: padding-top 8, indicator 56 x 28 radius 14 (icon 24 inside), gap 4, label 16 tall, padding-bottom 4 (8 + 28 + 4 + 16 + 4 = 60).
- Active: pill fill primary-subtle, icon primary, label primary Text-xs/Semi Bold (primary on white 5.2:1, icon on pill 4.5:1, icons need 3:1). Inactive: no pill, icon and label ink-muted (7.7:1) Text-xs/Medium. Focus: 2 px primary outline, 2 px offset.
- Labels 'Bills' (file-text) and 'Trends' (bar-chart-3). aria-label 'Main', active tab aria-current='page'.
- Only on the two tab roots S01 and S12.

A4. Ohm / Footer (component set, Type = Single | Stack | Pay | Helper), fixed, white, 1 px top hairline, no shadow.
- Padding 12 top, 16 sides, 12 + 34 bottom. Buttons are Ohm / Button L (fill, 361), gap 8.
- Single: one L. 12 + 48 + 12 + 34 = 106.
- Stack: primary or destructive L on top, Outline or Ghost L below. 12 + 48 + 8 + 48 + 12 + 34 = 162. Only S11, S04d and S04.1.
- Pay (S10): Primary L + 8 + a 16 tall line (lock 12 + 'Secured by Razorpay' Text-xs/Regular ink-muted, centred). 12 + 48 + 8 + 16 + 12 + 34 = 130.
- Helper (NEW): a 20 tall helper line (Text-sm/Regular ink-muted, centred) above one L: 12 + 20 + 8 + 48 + 12 + 34 = 134. Used when a Primary is disabled for a reason that is not a field (offline: 'Reconnect to pay').
- Never more than two buttons, primary on top. Same paddings inside a sheet. Content must clear it: Content padding-bottom = footer height + 24.

A5. Ohm / Sheet (shadcn Drawer, bottom), 393 wide, hugs its content. CHANGED rules.
- White fill, radius 24 top corners only, flush left, right and bottom, no border, no shadow. Max height = viewport height minus 56 (796 at 852).
- Dim: ink-strong 45% over the whole viewport including header, footer and nav. No blur.
- Grabber zone 16: bar 36 x 4 radius 2, ink-muted at 30%, 6 above and below.
- Header 56, padding 0 4 0 16, gap 4. Title Text-lg/Semi Bold 18/28 ink-strong, left, one line (the sheet's accessible name; it is NOT an h1). Close = Ohm / Icon button Ghost 44 with x 24, aria-label 'Close', right. Property Close (bool): off only on confirm sheets whose buttons already say it (S04d). A second-step sheet (S03.1) shows a Back icon button at the left (title starts x 52, padding-left 0).
- Chrome above the body = 16 + 56 = 72. Body padding 0 16, bottom padding 16, plus 34 inset when there is no footer. Footer (optional) = A4, with a hairline above it that appears only when the body scrolls.
- DISMISSAL: Close, tap on the dim, swipe down, Esc, and the browser Back. All of them mean cancel (S04d: Keep reading). Nothing commits on dismissal. Focus returns to the control that opened the sheet.
- HEIGHT RULE (CHANGED): a sheet is designed so its full content fits in the cap. In Figma the Sheet frame always shows full content: Sheet height = content height; screen frame = 393 x max(852, sheet height + 56); layers 'Backdrop' (clone of the final underlying screen resized to 852 so its pinned footer or nav re-pins to the viewport bottom), 'Dim' (full frame), 'Sheet' (anchored to the bottom). A sheet taller than the cap scrolls inside in the real build (header and footer stay pinned) and must be called out. Heights (header 72 included):
  S03 Add a bill 465 (72 + 343 + 16 + 34). S03.1 Forward the email 472 (72 + 278 + 16 + footer 106). S01.3 Where these numbers come from 519 (72 + 325 + 16 + footer 106; the in-body heading moved to the header). S09 Share 536 (72 + preview 320 at 100% + 14 + targets 80 + 16 + 34). S04d Stop reading 322 (72 + body 72 + 16 + footer Stack 162). S04.1 about 540. S05.1 What looks off 753 (72 + 631 + 16 + 34).
  Fit check at a 700 tall viewport (cap 644) and at 740 (cap 684): everything fits EXCEPT S05.1, which scrolls about 109 and 69 px. It fits at 852 (cap 796, needs 809 of viewport). S05.1 therefore ships with a Foundations specimen pair: full content (753) and 'on a 700 tall screen' (644, body scrolling, 16 px fade at the bottom). Decision: keep S05.1 a sheet; moving it to a pushed page is the fallback if testing shows the scroll is missed.

A6. Ohm / Toast (component, no variants), fixed, z 60. CHANGED: one variant, Neutral deleted (no screen used it).
- 361 x min 48 (2 lines max), padding 12 16, gap 12, radius 12, fill ink-strong, no shadow. Icon circle-check 20 in success-subtle #DCFFF1. Text Text-sm/Medium 14/20 white, 60 characters or fewer, sentence case, no trailing full stop.
- Position: centred (x 16), bottom edge 12 above the top edge of the top-most bottom chrome: Single footer 106 gives y 686 to 734; Nav 94 gives y 698 to 746; Pay footer 130 gives y 662 to 710; no chrome gives y 758 to 806 (12 above the inset). OVER A SHEET (CHANGED): 12 above the sheet's TOP edge, over the dim, so it never covers sheet content: S03.1 (sheet 472, top y 380) gives y 320 to 368; S09 (sheet 536, top y 316) gives y 256 to 304. In the mock it is an absolute fixed layer with a Bottom constraint.
- Lives 4 s, one at a time (a new one replaces the old), pauses while pressed. Confirms an action whose result is not on the screen where she did it: the clipboard, or the screen she returned to. Errors never use a toast; they use an inline Alert. Full list in section 7.

5. BUTTON SYSTEM (one local component set 'Ohm / Button' plus 'Ohm / Icon button'; never use the kit Button on screens again)
Why local: overriding the kit Button per instance (its sizes are 28 to 36 with a 12 or 14 px label) is how 50 vs 44 tall and 14 vs 16 px labels got in. Live count today: S01 3 kit buttons (50, 44, 44), S05 family 2 each (50, 44), S06 3 (50, 44, 44, 14 px labels), S13 and S13.1 4, S07 six hidden 28 tall 12 px 'Button' placeholders inside Item slots (delete them), S09 five.
Build: auto-layout frame, fully bound to brand variables. Properties: Style, State, Label (text), Icon start (bool + swap), Icon end (bool + swap).

5.1 Allowed styles (CHANGED: one 'Style' property, so illegal combinations cannot be picked)
| Style | Height | Width | Fill | Label | Where |
| Primary L | 48 | fill | primary | white | the one action per view, in Footer or a card |
| Outline L | 48 | fill | white, 1 px line | ink-strong | equal-weight alternative or content action |
| Ghost L | 48 | fill | none | ink-strong | quiet exit under a primary, or alone while no primary exists yet (S04 reading) |
| Destructive L | 48 | fill | danger-subtle | danger | confirm sheets only (S04d) |
| Outline M | 40 | hug | white, 1 px line | ink-strong | bars and card headers: Add bill, Your connection, View full bill |
| Link M | 40 | hug | none | primary | navigation inside content: See trends, All bills, See all 7 parts, Something looks off, See how Ohm read this bill, Upload a clearer copy |
Not allowed: Primary M, Ghost M, Link L, Destructive M, kit Default (black) and Secondary, kit sizes xs/sm/default/lg, a second Primary in one view, side by side buttons, ALL CAPS, trailing punctuation, arrows in labels, emoji.
Icon button: one size 44 x 44, circle, icon 24, Ghost only, aria-label required. (S09 share targets, 56 round, are not Buttons.)

5.2 Anatomy
- L: padding 0 20, gap 8, icon 20, radius full. ALWAYS full width (361 in a footer, 329 inside a 16 padded card). M: padding 0 16, gap 6, icon 18, radius full, always hug; in code the hit area grows to 44 with 2 px invisible padding top and bottom; in Figma leave 2 px of space around it in bars.
- Label (all styles, both sizes): Inter 16/24, weight 600, letter spacing 0, sentence case, one line at normal text size. Longest label 'Save and see August bill' is about 206 of 288 available. In code heights are min heights, so at large text the label wraps and the button grows instead of clipping.
- Link M: padding 0 4, optional chevron-right 16 after the label.
- Colours: Primary white on primary 5.2:1. Destructive danger #AE2E24 on danger-subtle #FFECEB 5.7:1. Outline border #DCDFE4 on white is 1.3:1: the label, not the border, identifies the button (WCAG 1.4.11 does not require the border here). Inputs differ (see open questions).
- States (all styles): Default, Hover (desktop only), Pressed, Focus (2 px primary outline, 2 px offset), Disabled (50% opacity, no pointer), Loading. Pressed = ink-strong overlay 12% on Primary and 6% on every other style; Hover = 6% and 3%; Link pressed = 60% opacity. 100 ms, no scale, no shadow.
- Loading: kit Spinner size-5 appears to the left of the label with gap 8, the label stays, the button keeps its width and the group re-centres (label moves about 14 px left). A button with an icon swaps the icon for the spinner.
- Disabled always has a visible reason: a field help line in content, or the Footer Helper type.

5.3 Writing rule
Verb first, sentence case, one icon at most and only if it clarifies the verb (plus, share, copy, file-text, upload). Amount only on pay buttons ('Pay ₹36,09,190'). Exempt: 'Something looks off'. Inline text links inside a sentence are not buttons: they inherit the sentence size at weight 500 (Text-sm/Medium in 14 px text), primary, underline on hover and press, 44 px tall hit area. They differ from Link M on purpose: a 16/600 link inside a 14 px sentence breaks the line rhythm.

5.4 Sticky footer layout
Footer = A4. Content above ends with 24 clear space. The home indicator sits on the footer's white fill, never on the button. Sheets use the same footer paddings. Screens whose primary lives in a card (S01) have no footer; they have the nav.

6. FRAME RULES (every frame, no exceptions)

6.1 Height and structure
- Every screen frame: width 393, vertical auto layout, primary axis Hug, counter axis Fixed 393, minHeight 852, fill surface-muted, clipsContent on, overflowDirection VERTICAL (set explicitly, do not rely on automatic scrolling).
- Nothing is clipped, hidden or faded at the bottom. States that reveal copy (accordions, expanded rows, sheets) show open in the base frame or get a variant frame that shows them open.
- Children, back to front (index 0 first): 'Content', 'Header', 'Footer' or 'Bottom nav', 'Toast' (only when shown), 'iOS / Home indicator'.
- 'Content': vertical auto layout, fill width, hug height, side padding 16, gap 12 (24 between sections). padding-top = header height + 12: 130 with a Compact bar, 138 with Large or Home, 74 with a status-zone-only header (S11). padding-bottom = footer + 24: Single 130, Pay 154, Helper 158, Stack 186; nav 94 + 24 = 118; nothing 34 + 24 = 58.
- 'Header', 'Footer', 'Bottom nav', 'Toast', 'iOS / Home indicator': layoutPositioning 'ABSOLUTE'. Constraints: Header horizontal STRETCH vertical MIN; Footer, Bottom nav horizontal STRETCH vertical MAX; Toast horizontal CENTER vertical MAX; Home indicator horizontal CENTER vertical MAX. Header at y 0; the bottom group at y = frame height minus its height.
- S11: Header = status zone only (62, white, hairline) because iOS paints that zone white in the installed app; the hero keeps its own 24 top gap.

6.2 Pinned layers (CHANGED: evidence and fallbacks)
- Figma Help, 'Scrolling and position behavior': constraints define how a fixed layer sits relative to the edges of the VIEWER window; a Bottom constraint keeps the layer's offset from the viewer's bottom edge; layers in auto layout need 'Ignore auto layout' first (= ABSOLUTE); if scrolling content covers a fixed layer, Canvas stacking may need 'First on top' (itemReverseZIndex). Plugin typings 1.121.0: frame.numberOfFixedChildren, and the fixed layers are the LAST N entries of frame.children (top-most in the layer panel). So with children ordered as in 6.1, set numberOfFixedChildren = 3 (Header, Footer or Nav, Home indicator) or 4 with a Toast. By hand: select those layers, Constraints, 'Fix position when scrolling'.
- Build once on 'Screen template' (Foundations, Section 'Components · Web chrome'), have a human test it, then clone it for every screen so the order and the fixed count are inherited.
- HUMAN TEST (5 minutes; agents cannot run Present because the plugin API cannot play a prototype): put the template's prototype link in front of the design owner. Present with device iPhone 16 (393 x 852); if the preset is missing, use a custom 393 x 852. Do NOT use iPhone 16 Pro or 17 Pro (402 x 874): they letterbox a 393 wide frame and shift the bottom. Pass: header stays at the top, footer stays at the viewport bottom, content scrolls under both, footer buttons are tappable, the home indicator stays, a toast stays pinned.
- If the footer is wrong, in this order: FALLBACK A (community confirmed): put Footer and Home indicator in one transparent frame 'Bottom pin' (393 x 852, no fill, no clip) pinned at the bottom of the tall frame, with the footer inside it at its bottom; constraint Bottom, fixed. FALLBACK B: a prototype-only page with one 852 tall clone per screen, built by script (clone the tall frame, resize to 852, move Footer to y = 852 minus its height, put Content in a nested vertical scroll frame). Both are budgeted now; neither shrinks the review frames.
- Agent QA is structural (6.7); the lead walks the three flows (Monthly bill from S02, First bill from S01, Something is off from S13) in Present.

6.3 Canvas packing
- Frame x positions stay (S01 x 80 ... S13 x 5756, y 80). Variants sit in the column under their parent at y = parent bottom + 160, each next at previous bottom + 160. Stop using y = 1092 + n x 1012 (it assumed 852 tall frames).
- Example for the S05 column with the expected heights: S05 y 80 (about 1,200), S05.1 y 1,440, S05.2 y 2,452, S05.3 y 3,464, S05.4 y 4,476, S05.5 y 5,488 (about 1,200), S05.6 y 6,848, S05.7 y 7,860, S05.8 y 8,872 (about 1,230), S05.9 y 10,262, ending near 11,490.
- Resize Section 9:7426 (today 6400 x 10300) after every build to the tallest column bottom plus 80 (about 11,600 for the S05 column).

6.4 Overlay frames
Sheet and dialog frames follow A5 (frame = max(852, sheet + 56); Backdrop, Dim, Sheet). Backdrop clones are re-cloned from the migrated parent AFTER the parent is final, which is why the work order in section 11 matters. The live 'behind' clones (S01 Home (behind) 11:12485 inside S01.3, plus the clones inside S03, S03.1, S05.1 and S09) are stale and are replaced.

6.5 Responsive and height budget (CHANGED: height is now checked too)
- Auto layout fill widths so one frame works at 360 and 430. Check a clone at 360: the widest labels ('Save and see August bill' 206 of 288; 'Your connection' bar button about 156 beside 'August bill' about 98) must not wrap or collide; 'Harbourline Hotels' truncates before 'Add bill'. Desktop shows the same column, max width 480, centred; sheets and toasts also max 480 (section code notes).
- Visible content area (viewport minus fixed chrome):
  Standalone 852 tall (insets 62 and 34 in the mock): Compact + Single footer 852 - 118 - 106 = 628; Compact + Pay footer 604; Large + Nav 852 - 126 - 94 = 632.
  Safari tab on an 852 phone (about 664 visible, insets 0, so header 56, Single footer 72, Pay footer 96, nav 60): Compact + Single 536; Large + Nav 664 - 64 - 60 = 540.
  Small phone 667 standalone (top inset 20, bottom 0, so header 76, Single footer 72): Compact + Single 519.
  Dropping the Stack footer on S05, S06 and S13 is what keeps these above 500 everywhere (with the v2 Stack footer it was 572 at 852 and 387 on a 667 phone).
- Test heights 667 and 740 and a desktop width of 1280 in QA.

6.6 Reactions
Before deleting any layer, dump every reaction on the frame and its descendants (layer path, trigger, destinationId, navigation, transition) to a local JSON (suggested /Users/rishabh/Projects/ohm/specs/round2/reactions-before.json) and re-apply each to the replacement layer. Only S04 has a frame-level reaction today (AFTER_TIMEOUT 1.5 s to S05); every other reaction lives on nested layers and the frame count of 0 hides them. After migration, a script checks every destinationId still resolves.

6.7 QA gate (script, then eyeball), run over EVERY frame under Section 9:7426 except S02
1) Frame height >= 852 and Content.y + Content.height equals the frame height with Content padding-bottom as in 6.1 (nothing clipped, no gap). 2) numberOfFixedChildren equals the number of ABSOLUTE chrome children and they are the last children, named 'Header', 'Footer' or 'Bottom nav', 'Toast', 'iOS / Home indicator'. 3) Every button is an 'Ohm / Button' instance, Style in the allowed list, label Inter 16/24 600, height 48 (width = container) or 40 (hug); zero kit Button instances, including hidden ones. 4) No instance whose main component is 'Toolbar - Top - iPhone', 'Tab Bar - iPhone', 'Sheet - iPhone' or the local 5:2903 Bottom nav; no node named 'Scroll edge'; no BACKGROUND_BLUR or DROP_SHADOW on Header, Footer, Bottom nav, Sheet or Toast. 5) Only 'iOS / Status bar' and 'iOS / Home indicator' carry the 'iOS /' prefix (S02 excepted). 6) Reaction audit (6.6). 7) Duplicate text scan (timed-out calls twice earlier) and a dash scan for em and en dashes. 8) Copy scan against the copy list. 9) Responsive clone at 360 and 430, and sheet height table re-measured against A5. 10) Export: full-height PNGs at 2x of every changed frame only (all except S02); the tallest, S13 and S13.1 at about 1,280, export at about 2,560 px tall (use exportAsync, the screenshot tools cap at 1568 px).

7. TOAST TABLE (every toast; type is always the single Success toast; errors use an Alert)
| Frame | Trigger | Text | Position |
| S03.1 Forward the email | Copy address | Address copied | over sheet, y 320 to 368 |
| S05.8 Your connection, set by you (round-1 S05d) | Save 700 kVA, back on S05 | Saved 700 kVA as your starting point | over Single footer, y 686 to 734 |
| S05 family, after a recheck passes (round-1 S05g, not built) | Save and recheck, then back | Rechecked. No hidden charges or penalties | y 686 to 734 |
| S05 family, set by you to bill number (round-1 S05be to S05w, not built) | Use the bill's number | Back to 900 kVA, as on your bill | y 686 to 734 |
| S05.9 Your connection, sent (round-1 S05f) | Send to the Ohm team | Sent. We will notify you | y 686 to 734 |
| S05s Your connection, saved (not built) | Change business type | Business type saved | no footer there, y 758 to 806 |
| S13.1 and S13 | Copy details for Northgrid | Details copied | y 686 to 734 |
| S09 Share | Copy link | Link copied | over sheet, y 256 to 304 |
No toast exists for 'Rechecked. 1 thing to look at.': that outcome opens the S13 style summary whose Alert says it. A copy action never changes the button label.

8. ROUTING, BACK AND INSTALL (NEW)
- One URL per screen: / (S01), /bills (S01.1), /bills/2026-07 (S01.2), /add and /add?step=forward as sheets via ?sheet=add-bill&step=forward (S03, S03.1), /reading/:jobId (S04), /connection (S05) and /connection/:detail (S05.2, S05.6), /connection/:detail/fix (S05.3, S05.7), /connection/ask (S05.4), /bill/2026-08 (S06), /bill/2026-08/checks (S07), /parts (S08), ?sheet=share (S09), /pay (S10), /paid (S11), /trends (S12). ?sheet=what-looks-off (S05.1), ?sheet=numbers (S01.3), ?sheet=stop-reading (S04d).
- Back means history back when location.key is not the entry key (the app has in-app history); otherwise router.replace(parent). Parents: every /bill/2026-08/... page except /paid goes to /bill/2026-08; /bill/2026-08, /connection, /bills, /trends, /paid and /reading go to /. A push notification (S02) opens /bill/2026-08 with no history, so Back lands on Home.
- Use replace so Back never returns to a finished step: after 'Save and see August bill' go replace('/bill/2026-08'); after payment success replace the pay page with /paid; Done goes replace('/'). This removes the round-1 exception 'S06 and S13 Back go to S01' as a special case: it falls out of the parent rule.
- Sheets push one history entry (shallow route with a search param). Close, dim tap, swipe and Esc call history.back() when the sheet was opened in this session, or replace without the param on a cold load. The browser or Android Back therefore closes a sheet instead of leaving the page.
- INSTALL AND PUSH (decided): iOS web push works only for web apps added to the Home Screen (iOS 16.4 and later, manifest display standalone, permission requested from a tap). Default: after the first bill is read, a one-time sheet 'S04.1 Get bill alerts' explains Add to Home Screen; the fallback channel for 'bill ready' is email. In a plain Safari tab the S02 notification becomes an email 'August bill is here: ₹36,42,160' with a link to /bill/2026-08. The S04 caption 'We will notify you when it is ready' stays true in both cases.

9. STATES ADDED (NEW)
- S10.1 Payment did not go through (frame under S10): kit Alert (Destructive) at the top of Content, 12 below the header: circle-x, title 'Payment did not go through', description 'Check your bank before you pay again.' Footer Pay type, Primary L label 'Try again'. Razorpay dismissed without paying ('Checkout closed'): no alert, Loading ends and the button returns to 'Pay ₹36,09,190'.
- Offline pattern (Foundations board 'Alert patterns', not a frame): kit Alert with wifi-off, title 'You are offline', description 'Connect to the internet to pay.'; Footer Helper type with the line 'Reconnect to pay' above a disabled Primary L 'Pay ₹36,09,190'.
- S11 keeps Primary 'Share receipt' over Ghost 'Done': after paying, the finance manager's next job is proof for the owner; Mercury and PayPal show Done as primary because a receipt sheet has nothing else to do.

10. MIGRATION TABLE: all 27 live frames (node IDs checked in the file). 'Now' is measured; heights are expected values derived as: old content bottom + shift for the new first-card position + new padding-bottom. If the built frame is off by more than 5%, something is clipped or mis-padded. Footer: S = Single, K = Stack, P = Pay, none.
S01 Home 9:7427. Now: no auto layout; Content 852 scrolling (padding-top 128, Past bills end at 917); 'Scroll edge (top)' 128 and '(bottom)' 56; kit Toolbar 'Title 2 Line Left' (iOS / Nav bar 54) with glass Add bill capsule; local Bottom nav wrapping the kit glass Tab Bar (95, absolute y 757, covers Past bills); kit buttons 50, 44, 44. Becomes: delete both Scroll edge frames, Nav bar, Bottom nav; Header Type=Home (126); Content padding 138 and 118; Ohm / Bottom nav Active=Bills; Add bill = Outline M with plus; 'Review and pay' = Primary L (329 by 48, was 50); 'See trends' and 'All bills' = Link M. Nav only, no footer. About 1,045 (917 + 10 + 118). Re-add: Add bill to S03; Review and pay to S06; footer row 'No hidden charges or penalties' to S07; Trends tab to S12.
S01.1 All bills 11:11635. Now: vertical; kit Large Title toolbar (105); Content 685; local Bottom nav; one kit Button 44. Becomes: Header Compact, Back, title 'All bills'; no nav; 'See usage in Trends' = Link M; padding-bottom 58. 852.
S01.2 July bill 11:12124 (round-1 'July 2026 bill'). Now: toolbar 54; Content 736; local Bottom nav; kit buttons 44 and 50. Becomes: Header Compact, Back, title 'July bill', subtitle 'Northgrid Electric', trailing Outline M 'Your connection'; no nav; 'View bill PDF' = Outline L with file-text 20 in Content; never show the July bill total beside the paid and saved figures. 852.
S01.3 Where these numbers come from 11:12484. Now: no auto layout; 'S01 Home (behind)' 11:12485; kit sheet frame 535 at y 311 with a kit Toolbar, in-body heading, Footer with a 50 tall kit button; the clone carries 4 more kit buttons. Becomes: Backdrop (re-cloned final S01, 852), Dim, Ohm / Sheet 519 with header title 'Where these numbers come from' and Close, body illustration plus two rows, Footer Single Outline L 'See every month in Trends'; frame 852. Re-add: Close and dim to S01; Trends button to S12.
S02 Notification 9:7470. Unchanged. Reaction to S06 stays.
S03 Add a bill 9:7475. Now: kit Sheet (Medium) with glass toolbar and grabber; stale 'S01 Home (behind)'; a hidden 'S03.1 content' frame inside the sheet content. Becomes: Ohm / Sheet 465, title 'Add a bill', Close; body = the 2 x 2 grid (343); no footer; remove the hidden S03.1 child; Backdrop re-cloned. Re-add: Close to S01 (Back); Upload tile to S04. 852.
S03.1 Forward the email 11:10839. Now: same kit sheet with Back and Close; hidden 'Add methods' child; 'Copy address' kit button 50. Becomes: Ohm / Sheet 472 with Back icon button; body = Info (278); Footer Single Primary L 'Copy address' with copy 20; tap shows the toast 'Address copied'. Layer names Backdrop, Dim, Sheet, Header match S03 for Smart animate. Re-add: Back to S03.
S04 Reading 9:7521. Now: vertical; kit toolbar (54) with the leading slot hidden and NO close; Content 736; one reaction AFTER_TIMEOUT 1.5 s to S05. Becomes: Header Compact, Back=false, title 'Reading your bill', trailing Icon button X (aria-label 'Close'); restore the caption 'Takes about 10 seconds. You can close this screen. We will notify you when it is ready.'; Footer Single with Ghost L 'Stop reading this bill' (replaced in place by Primary L 'Continue' or 'Choose another file' when done or failed). About 857 (caption ends 727 + 130). Keep the reaction. The beat, details, done, flagged and failed frames (S04a-1 to S04g) are not built yet; build them on this chrome. S04d Stop reading: Ohm / Sheet 322, title 'Stop reading?', Close off, body 'Ohm will delete the file you uploaded. Nothing has been paid or changed. You can add the bill again any time.', Footer Stack: Destructive L 'Stop reading' over Outline L 'Keep reading'; Esc, dim tap and swipe all mean Keep reading.
S05 Your connection 9:7555. Now: kit Large Title toolbar (105), Content 685 with content to 1,034 clipped, Footer 148 absolute (Primary 50 + Ghost 44), home indicator. Becomes: Header Compact, Back, title 'Your connection'; Footer Single Primary L 'Save and see August bill'; Link M 'Something looks off' under the details card (before 'About your business'); Content padding 130 and 130. About 1,200 (round-1 scroll height 1,198: minus 41 for the smaller bar, minus 56 for the smaller footer, plus 56 for the link row, plus the footnote). Re-add: Save and see to S06; Back; Something looks off to S05.1; rows to S05.2.
S05.1 What looks off 11:13504. Now: kit Large sheet 790 at y 62 over 'S05 Confirm connection (behind)'. Becomes: Ohm / Sheet 753, title 'What looks off?', Close; body unchanged (intro 48, details card 334, Something else 157, footnote 20); Backdrop re-cloned from the migrated S05; frame 852; scrolls on viewports shorter than 809.
S05.2 On your bill 11:14760. Now: toolbar 54 with a 'Full bill' glass capsule; Content 736; no footer. Becomes: Header Compact, title 'Contract demand', subtitle 'Page 1, August bill', trailing Outline M 'View full bill'; no footer. 852.
S05.3 Fix contract demand, empty 11:15450 and S05.7 Fix contract demand, filled 11:14969. Now: toolbar 54; Content 736; Footer 112 absolute (Primary 50), a kit Outline button 44 with paperclip. Becomes: Header Compact, title 'Fix contract demand'; Footer Single Primary L 'Save 700 kVA' (disabled until valid, reason in the field help line); 'Add a photo of your agreement' = Outline L with paperclip. 852.
S05.4 Ask the Ohm team 11:15577. Same pattern: Footer Single Primary L 'Send to the Ohm team'; the form card's attach button becomes Outline L. About 852.
S05.5 Your connection, 900 kVA bill 11:15725. Same as S05 (about 1,200).
S05.6 On your bill, 900 kVA 11:16647. Same as S05.2 (852).
S05.8 Your connection, set by you 11:16230 and S05.9 Your connection, sent 11:15883. Now: as S05 plus the round-1 Toast (white, shadow, y 630) and Footer 172. Becomes: as S05 plus the new Toast (section 7), y 686 to 734; about 1,230 (S05 plus the 30 the changed row adds). Re-add the same reactions as S05.
S06 Bill summary 9:7592. Now: toolbar 'Title 2 Line Left' with a glass 'Northgrid · HT' capsule; Content 587 (the last card ends at 796, clipped); 'Sticky footer' 149 (Pay 50 and Share 44, both with 14 px labels). Becomes: Header Compact, Back, title 'August bill', subtitle 'Northgrid Electric', trailing Outline M 'Your connection'; Footer Single Primary L 'Pay ₹36,09,190'; 'Share with owner' = Outline L under the discount card; 'See all 7 parts' = Link M. About 990 (796 + 6 + 60 + 130). Re-add: Back to S01 (parent rule); Your connection to the S05 saved view; alert to S07; See all to S08; Pay to S10; Share with owner to S09.
S07 Checks 9:7654. Now: kit Large Title '6 checks' (105); six hidden kit buttons (28 tall, 12 px, 'Button wrapper' in Item slots); Content 685. Becomes: Header Compact, title 'What Ohm checked'; delete the six hidden buttons; add Link M 'See how Ohm read this bill' inside the How we check card (card grows 48); no footer; padding-bottom 58. 852.
S08 Breakdown 9:7679. Now: toolbar 54; Content 736 with row 1 open. Becomes: Header Compact 'Where the money goes'; no footer. 852 with row 1 open; new variant 'S08 all open' under it (section new_screens).
S09 Share 9:7722. Now: kit Medium sheet (preview scaled to 76%) over 'S06 Bill summary (behind)'; three 56 icon-button targets. Becomes: Ohm / Sheet 536, title 'Share with the owner', Close; preview at 100% (329 wide, about 320 tall), targets WhatsApp, Email, Copy link (56 round, labels 16); Backdrop re-cloned from the migrated S06; Copy link shows the toast 'Link copied' above the sheet. 852. Re-add: every target and Close to S06.
S10 Pay 9:7787. Now: Large Title (105); Content 564; Footer 121 (Pay 50 with a 14 px label and the lock line). Becomes: Header Compact, title 'Pay August bill'; Footer Pay (130); Pay shows Loading until Razorpay Checkout opens. About 852 (content ends about 678 + 154). Re-add: Pay to S11; Back.
S11 Paid 9:7820. Now: no bar; Content 642; Footer 148 (Primary 50 with share icon, Ghost 44). Becomes: Header = status zone only (62); Footer Stack: Primary L 'Share receipt' with share 20 over Ghost L 'Done'. About 866 (680 + 186). Re-add: Done to S01; Share receipt to S09.
S12 Trends 9:7850. Now: Large Title toolbar (105); local Bottom nav with the kit glass Tab Bar (95, absolute y 757); Content 685. Becomes: Header Type=Large 'Trends' (126); Ohm / Bottom nav Active=Trends (94); Content padding 138 and 118; units and rupees tabs and the chart belong to the chart track. About 852 (measure). Re-add: Bills tab to S01.
S13 Check failed 9:7932 and S13.1 Check failed, your number 11:16853. Now: S06 layout plus the warning card (content to 1,078), Sticky footer 149, four kit buttons (one 50, three 44). Becomes: S06 migration plus 'Copy details for Northgrid' as Outline L (329 by 48, was 44) with the toast 'Details copied', and 'Share with owner' Outline L in content. About 1,280 (1,078 + 6 + 4 + 60 + 130). S13.1: Header Compact with Back and the same footer.
ROUND-1 NAME TO LIVE NAME: S05a = S05.1; S05b = S05.2; S05bw = S05.6; S05c = S05.7 (S05.3 is its empty state); S05e = S05.4; S05w = S05.5; S05d = S05.8; S05f = S05.9; S13b = S13.1; 'All bills' = S01.1; 'July 2026' = S01.2; 'Where these numbers come from' = S01.3. NOT BUILT YET (use this chrome when they are): S04a-1 to S04g, S04d, S04r, S01b, S01c, S05bu, S05be, S05c2, S05g, S05u, S05s, S06p, S03b, S05v, S04.1, S10.1.

11. ORDER OF WORK (matters because of the stale Backdrop clones)
1) On Foundations: fonts, icon imports (un-awaited), then Ohm / Button, Icon button, Top bar, Bottom nav, Footer, Sheet, Toast, the three boards, and the Screen template. 2) Human Present test of the template (6.2); pick the fallback if needed. 3) Dump reactions (6.6). 4) Migrate the parents first: S01, S05, S06. 5) Migrate the pushed screens: S01.1, S01.2, S04, S05.2 to S05.9, S07, S08, S10, S11, S12, S13, S13.1. 6) Rebuild the sheets with fresh Backdrops: S03, S03.1, S01.3, S05.1, S09. 7) Re-apply reactions and run the QA gate over the whole Section. 8) Resize the Section, pack the columns, export, and update page 'Source of truth' (components, rules, change log) and the Foundations boards (Web chrome, Buttons, Frame rules).

## Copy

- **Bottom nav, tab 1 label**: Bills
- **Bottom nav, tab 2 label**: Trends
- **Bottom nav, aria-label**: Main
- **Top bar back icon button aria-label**: Back
- **Sheet close and S04 close icon button aria-label**: Close
- **S01 Home bar, name and subtitle**: Harbourline Hotels / Riverside · Northgrid
- **S01 header button (Outline M, plus icon)**: Add bill
- **S01 bill card button (Primary L)**: Review and pay
- **S01 row links (Link M)**: See trends / All bills
- **S01.1 bar title**: All bills
- **S01.1 link (Link M)**: See usage in Trends
- **S01.2 bar title and subtitle**: July bill / Northgrid Electric
- **S01.2 trailing button (Outline M)**: Your connection
- **S01.2 content button (Outline L, file-text icon)**: View bill PDF
- **S01.3 sheet title (in the header, not the body)**: Where these numbers come from
- **S01.3 footer (Outline L)**: See every month in Trends
- **S03 sheet title**: Add a bill
- **S03.1 footer button (Primary L, copy icon)**: Copy address
- **S04 bar title**: Reading your bill
- **S04 caption under the checklist**: Takes about 10 seconds. You can close this screen. We will notify you when it is ready.
- **S04 footer while reading (Ghost L)**: Stop reading this bill
- **S04 footer when done (Primary L)**: Continue
- **S04g footer (Primary L)**: Choose another file
- **S04d sheet title**: Stop reading?
- **S04d sheet body**: Ohm will delete the file you uploaded. Nothing has been paid or changed. You can add the bill again any time.
- **S04d buttons (Destructive L over Outline L)**: Stop reading / Keep reading
- **S04.1 sheet title**: Get bill alerts
- **S04.1 body**: Add Ohm to your Home Screen and we can notify you when a bill is ready.
- **S04.1 steps**: Tap Share in Safari / Tap Add to Home Screen / Open Ohm from your Home Screen
- **S04.1 buttons (Primary L over Ghost L)**: Continue / Email me instead
- **S05 bar title**: Your connection
- **S05 footer (Primary L)**: Save and see August bill
- **S05 content link (Link M, exempt from verb first)**: Something looks off
- **S05.1 sheet title**: What looks off?
- **S05.2 bar title, subtitle, trailing button (Outline M)**: Contract demand / Page 1, August bill / View full bill
- **S05.3 and S05.7 bar title**: Fix contract demand
- **S05.3 and S05.7 footer (Primary L) and content button (Outline L, paperclip)**: Save 700 kVA / Add a photo of your agreement
- **S05 clearer copy link (Link M, upload icon)**: Upload a clearer copy
- **S05.4 footer (Primary L)**: Send to the Ohm team
- **S06 bar title, subtitle, trailing button (Outline M)**: August bill / Northgrid Electric / Your connection
- **S06 and S13 footer (Primary L)**: Pay ₹36,09,190
- **S06 and S13 content button under the discount card (Outline L)**: Share with owner
- **S06 link (Link M)**: See all 7 parts
- **S07 bar title**: What Ohm checked
- **S07 card link (Link M)**: See how Ohm read this bill
- **S08 bar title**: Where the money goes
- **S09 sheet title**: Share with the owner
- **S10 bar title**: Pay August bill
- **S10 footer (Primary L) and note**: Pay ₹36,09,190 / Secured by Razorpay
- **S10.1 alert title and description**: Payment did not go through / Check your bank before you pay again.
- **S10.1 footer (Primary L)**: Try again
- **Offline alert title and description**: You are offline / Connect to the internet to pay.
- **Offline footer helper line**: Reconnect to pay
- **S11 footer (Primary L over Ghost L)**: Share receipt / Done
- **S12 bar title (Large)**: Trends
- **S13 card button (Outline L, copy icon)**: Copy details for Northgrid
- **Toast, S03.1**: Address copied
- **Toast, S05.8**: Saved 700 kVA as your starting point
- **Toast, after a passed recheck**: Rechecked. No hidden charges or penalties
- **Toast, back to the bill's number**: Back to 900 kVA, as on your bill
- **Toast, S05.9**: Sent. We will notify you
- **Toast, business type**: Business type saved
- **Toast, S13 and S13.1**: Details copied
- **Toast, S09**: Link copied
- **Button label rule**: Verb first, sentence case, no trailing punctuation, no arrows, no emoji, amount only on pay buttons, at most one icon. One exemption: Something looks off
- **Toast rule**: 60 characters or fewer, one variant, confirms an action whose result is not on the screen where she did it (clipboard, or the screen she returned to). Errors use an inline Alert

## New screens

### Screen template (Foundations, Section 'Components · Web chrome' at x 0, y 1900)
- Purpose: The master every screen is cloned from, so the pinned layers, order and fixed count are inherited instead of set by hand 27 times. Also the subject of the human Present test.
- Layout: 393 x 852 frame, vertical auto layout, Hug, minHeight 852, fill surface-muted, clipsContent on, overflowDirection VERTICAL. Children in order: 'Content' (padding 0 16, padding-top 130, padding-bottom 130, gap 12, a demo block 1,300 tall), 'Header' (Status bar instance + Ohm / Top bar Compact, absolute, Top, Left and Right), 'Footer' (Ohm / Footer Single, absolute, Bottom), 'iOS / Home indicator' (absolute, Bottom, centred). numberOfFixedChildren = 3. Test in Present on iPhone 16 (393 x 852) by a human; if it fails use Fallback A, then Fallback B (section 6.2).
### Foundations board: Web chrome
- Purpose: One board showing every chrome component once at 1x so builders and the lead can compare screens against it.
- Layout: Same board rules as Foundations (1440 wide, white, radius 24). Rows: Top bar (Compact with Back, Compact without Back with trailing X, Compact with subtitle and trailing Outline M, Large, Home); Bottom nav (Bills, Trends); Footer (Single 106, Stack 162, Pay 130, Helper 134); Sheet (S03 465, S04d 322 with Close off, and the S05.1 pair: full content 753 beside 'on a 700 tall screen' 644 with the body scrolling, labelled as the exception); Toast (over a Single footer, over the nav, over a sheet, over no chrome); the sheet height and fit table and the toast table. Each specimen has its height labelled.
### Foundations board: Buttons
- Purpose: The single source for the button system so label size and heights are never overridden on screens again.
- Layout: Matrix of the six allowed Styles (Primary L, Outline L, Ghost L, Destructive L, Outline M, Link M) by State (Default, Hover, Pressed, Focus, Disabled, Loading), each with and without an icon; the loading spinner placement with and without an icon; the Icon button; the footer layouts; an allowed-combinations table; a 'do and do not' strip (one Primary only, no side by side, no kit Button, no Primary M, no ghost alone except S04). Annotate heights 48 and 40, gap 8, label Inter 16/24 600, pressed 12% and 6% overlays.
### Foundations board: Frame rules
- Purpose: Shows the anatomy of a tall frame so any builder can reproduce it, and the QA gate.
- Layout: A 393 x 1,300 specimen frame beside an exploded layer list: Content, Header, Footer or Nav, Toast, Home indicator; labels for padding-top, padding-bottom, numberOfFixedChildren and constraints; the canvas packing rule (next frame y = previous bottom + 160); Fallback A and B; the 10 point QA gate; the visible content area table.
### Foundations board: Alert patterns
- Purpose: Specifies the states S10 needs that have no frame of their own.
- Layout: Rows: payment failed (Alert Destructive with circle-x), offline (Alert with wifi-off plus the Footer Helper type with a disabled Primary), and an inline success note; each shows where it sits (top of Content, 12 below the header) and its copy.
### S08 all open (variant of S08 Breakdown)
- Purpose: Static proof that every formula is readable, since the base frame shows only row 1 open.
- Layout: Clone of the migrated S08 with all 7 accordion rows open; the frame grows to fit (measure it); Compact bar 'Where the money goes', no footer. Placed under S08 at y = S08 bottom + 160.
### S10.1 Payment did not go through (variant of S10)
- Purpose: Covers the failed payment, which has no state today.
- Layout: Clone of the migrated S10: kit Alert Destructive (circle-x, title 'Payment did not go through', description 'Check your bank before you pay again.') as the first child of Content, 12 below the header; Footer Pay type with Primary L 'Try again' and the lock line. Height 852. Placed under S10 at y 1,092.
### S04.1 Get bill alerts (sheet, proposed, needs the lead's yes)
- Purpose: Makes the push dependency real: iOS web push only works for Home Screen apps, and the S04 caption promises a notification.
- Layout: Ohm / Sheet about 540: header title 'Get bill alerts' with Close; body = one line of explanation, then three numbered steps with icons (share, plus, file-text) in 56 tall rows; Footer Stack: Primary L 'Continue' over Ghost L 'Email me instead'. Shown once, after the first bill is read. Frame 852 over a Backdrop of S01.

## Interactions

- Tap Back in a Top bar -> Router Back: history back when the app has in-app history, otherwise router.replace to the screen's parent (section 8). A push notification entry therefore lands on Home. In Figma use the Back action, except S06 and S13, which keep Navigate to S01 (the same result under the parent rule). Pressed: 6% ink-strong circle, 100 ms.
- Tap the Bills or Trends tab -> Instant switch of root screen (S01 or S12), no slide, each tab keeps its own scroll position. Re-tapping the active tab scrolls that screen to the top in 300 ms. In Figma use Navigate with no animation.
- Scroll the content under the header -> Header, footer and nav never move; the header always shows its 1 px bottom hairline (no scroll state, no fade, no title swap).
- Scroll to the end of a long screen -> The last card clears the footer or nav by 24 px. In Figma Present the tall frame scrolls under the pinned layers (human test, section 6.2).
- Tap Add bill (S01) -> ?sheet=add-bill is pushed; the dim fades in over 200 ms and the S03 sheet slides up over 300 ms ease-out; focus moves to the sheet title; the page behind is scroll locked.
- Dismiss a sheet (Close, tap on the dim, swipe down, Esc, browser Back) -> Sheet slides down 250 ms, dim fades out, focus returns to the opener, the history entry is removed. Dismissal always cancels or goes back and never commits; on S04d it equals 'Keep reading'.
- Tap Back inside S03.1 -> Body slides right 250 ms; sheet, dim and header stay (layer names Backdrop, Dim, Sheet, Header match across the two frames for Smart animate); the sheet height changes by 7 px.
- Tap a copy action (Copy address, Copy details for Northgrid, Copy link) -> Text goes to the clipboard and the Success toast appears: 8 px rise plus fade 200 ms, stays 4 s, fades out 150 ms; a new toast replaces the current one; it pauses while pressed. The button label and width never change. Over a sheet the toast sits 12 above the sheet top.
- Tap a Primary that starts a payment (Pay) -> Loading: spinner left of the label, label stays, width fixed, aria-busy, until Razorpay Checkout opens (theme.color #265CFF). Success: replace to S11. Payment failed: stay on S10 and show S10.1 (Alert plus 'Try again'). Checkout closed without paying: Loading ends silently and the button returns to its default.
- Press, hover or focus any button, icon button or tab -> Pressed: ink-strong overlay 12% on Primary, 6% on the rest, Link 60% opacity, 100 ms, no scale, no shadow. Hover (desktop only): 6% and 3%. Focus: 2 px primary outline, 2 px offset, on buttons, icon buttons, nav tabs and sheet controls. Disabled: 50% opacity, not tappable, with a visible reason (field help, or Footer Helper).
- Focus an input on a screen with a footer (S05.3, S05.4, S05.7) -> Inputs are 16 px so iOS Safari does not zoom. The footer stays in flow at the bottom; on iOS it sits behind the keyboard until the keyboard closes (iOS does not resize the layout viewport), so the keyboard's return key is set to 'Done' (enterkeyhint='done') and the field scrolls into view with 16 px above the keyboard.
- Open an accordion or expand a row that reveals copy (S08, S04b, S04c) -> The frame grows by the revealed height (auto layout), the footer stays pinned, nothing is clipped. S08 has an 'all open' variant so every formula is readable in a static frame.
- Open a sheet taller than the viewport cap (S05.1 below 809 tall viewports) -> The body scrolls inside the sheet, header and footer stay pinned, a hairline shows under the header once scrolled and a 16 px fade shows at the body bottom. The Figma frame shows the full content.
- Tap Close (X) on S04 -> Ohm keeps reading and notifies when ready (push in an installed app, email otherwise); navigate to S01 (S01b 'still reading' once built). No confirmation, because nothing is lost. The visible caption says so.
- Tap Stop reading this bill (S04) -> S04d slides up. 'Stop reading' deletes the upload, cancels the job, sends nothing and goes to S01. 'Keep reading', Esc, tap on the dim and swipe down all keep reading.
- Go offline on S10 -> Alert 'You are offline' appears at the top of Content; the footer switches to the Helper type with 'Reconnect to pay' above a disabled Pay button; it returns on reconnect.
- Open S02's notification outside an installed app -> Web push is unavailable in a plain Safari tab, so the same message arrives by email with a link to /bill/2026-08; Back from there goes to Home.
- Rotate or resize to 360 or 430 wide, to 667 or 740 tall, or to a desktop window -> Content, cards and L buttons fill the width; labels stay on one line at normal text size; 'Harbourline Hotels' truncates before 'Add bill'; heights are min heights so large text wraps instead of clipping; desktop shows one 480 wide column with sheets and toasts also capped at 480.
- prefers-reduced-motion is on -> No slides or rises: sheets and toasts only fade (150 ms).

## Research

- Google (iOS) https://mobbin.com/screens/28e1c4b5-f377-47c5-ae14-b5f4e4b1e37a: Flat white bottom nav with a pill behind the active icon and a tinted label. Adopted: a 56 x 28 primary-subtle pill behind the active tab, no float, no glass.
- Depop (iOS) https://mobbin.com/screens/abd1f751-a1ed-489b-ab2a-84431ba7f116: Solid white tab bar with a hairline on its top edge, icon over a small label, flush to the screen edges. Adopted: white fill plus a 1 px top hairline as the only separator.
- Best Buy (iOS) https://mobbin.com/screens/e0c0bb24-c877-4005-aced-ee4a3e646b99: Solid tab bar whose active tab is shown by a top-edge bar and a colour change. Considered; the pill is friendlier and simpler in CSS.
- Best Buy (iOS), sheet https://mobbin.com/screens/2e63e711-f115-49c4-bb2e-157010a53419: Bottom sheet with grabber, left title, close at the right and a pinned primary pill while the body scrolls. Adopted for the Sheet header and footer split.
- Skip (iOS) https://mobbin.com/screens/c4c06001-d3de-4c9b-ac0e-7502be01b334: Sheet header with title left and a plain X at the right; one full width pill pinned at the bottom with the price in the label. Adopted: title left, Close ghost, amount in the label ('Pay ₹36,09,190').
- Luma (iOS) https://mobbin.com/screens/2b87d56e-02ec-48c1-b0de-9630222bdbc3: Checkout sheet with a full width pill 'Pay US$5.00' and a lock cue. Supports one L height; our lock sits on the line under the button.
- eBay (iOS) https://mobbin.com/screens/b4d6eee1-efba-47b8-9ab1-5a88a6a28aac: Sheet with a short grabber, round close top right, full width pill at the bottom, large top radius. Adopted: top radius 24 and the 44 round close.
- Beli (iOS) https://mobbin.com/screens/b8c7e8ab-c828-4e6c-9e70-df9044759a99: Sheet footer holding a text action beside a pill. Confirms a footer can mix a quiet action with a primary; we stack them (and only on S11 and confirm sheets) so labels never wrap.
- CRED (iOS), payment sheet https://mobbin.com/screens/0532cbb4-90e9-4c78-8176-aa6f7da816c2: Indian fintech: bottom sheet over a dimmed page with one full width solid button and the amount echoed beside it. Supports one primary per sheet and the 45% dim.
- CRED (iOS), amount sheet https://mobbin.com/screens/17b94113-2665-4983-88f1-16fbf697988b: Sheet with a title, a few tiles and one full width button, flush to the bottom with no inset or float. Adopted: flush sheet, no floating card.
- Jobber (iOS) https://mobbin.com/screens/750a3e8e-0eb4-4e75-aba7-6ea87254bce1: Dark toast, full width with side gutters, directly above the bottom tab bar. Adopted: dark ink-strong toast 12 above the nav or footer.
- Quicken (iOS) https://mobbin.com/screens/3b0b5c12-410f-4afe-9eec-552cc5532376: Dark rounded toast above the home indicator zone on a screen with no nav. Adopted: with no bottom chrome the toast sits 12 above the 34 px inset.
- Google Drive (iOS) https://mobbin.com/screens/db60a3e2-1e3a-414c-926e-2776b2f5dfcd: Snackbar with one line and an inline text action. Confirms a one line toast; we leave the action out.
- Mercury (iOS) https://mobbin.com/screens/75fa5991-8293-4b61-bb77-7c49a3c75abb: Receipt sheet: a Primary pill 'Done' with a plain text action underneath. Supports the S11 Primary-over-Ghost pair at equal height. Note the difference: there Done is primary; on S11 Share receipt is primary because proof for the owner is her next job.
- PayPal (iOS) https://mobbin.com/screens/2b40c161-3f6e-4b74-93a0-2d649164215c: End of flow with a pinned full width pill 'Done' above the home indicator and no top bar. Supports S11 with a status zone only and a pinned footer.
- Shell (iOS) https://mobbin.com/screens/9470b196-f790-41c1-9d2c-cebee3f2ef20: Review page with a back arrow, a title, rows, a legal note and one full width button pinned low. Same structure as S10.
- Stitch (web, mobile mock) https://mobbin.com/screens/d4397c8f-75a8-4283-a380-4a28df4b4d14: Top bar with a back arrow and title plus a flat bottom nav of icons with labels. Confirms flat bars as the web norm.
- Shop (iOS), floating pill nav (what we are leaving) https://mobbin.com/screens/d3158271-a0e5-4672-bea0-44ef4aebcb1c: A floating pill tab bar over content, the Liquid Glass family. Rejected for the web build because content sits under it and Figma to CSS parity is lost.
- Sweatpals (web) https://mobbin.com/screens/7a79665c-a96a-451e-bd25-a0a01210d135: Real web drawer: title and description left, round X at the right, one full width pill pinned at the bottom while the body scrolls. At phone width this becomes the bottom Sheet; supports the header, Close and pinned footer split. Mobbin's web set is desktop, so this is a desktop drawer, not a phone capture.
- H&M (web) https://mobbin.com/screens/a4c6474d-fd72-4e23-abe6-f33911839d31: Web side drawer with Back at the left, title centred, X at the right and a full width button pinned at the bottom. Supports a two step sheet (S03.1) with Back plus Close; we left align the title for consistency with the Compact bar.
- Featurebase (web) https://mobbin.com/screens/88bb8758-e19d-4a73-9d14-5d1d4e712731: Payment page with a full width 'Pay Now' pill and a quiet text link 'Go back and modify your plan' under it. Supports Primary L with a Link for the secondary path, which is why 'Something looks off' becomes a Link M.
- Perplexity (web) https://mobbin.com/screens/91f7d5d2-65cd-45ee-99a3-6c52bca19944: Checkout summary with one full width 'Confirm and pay' and a small 'Powered by Stripe' line beneath. Supports the Pay footer: one Primary plus a trust line ('Secured by Razorpay').
- Shopify (web) https://mobbin.com/screens/bdfd3e5f-f31b-4b94-958d-629b2cd13666: Confirm dialog 'Mark bills as paid?' with a one line consequence, a plain Cancel and a dark action. Supports S04d: a one line consequence, the safe action always available.
- Figma Help Center (docs), fixed layers : Source for 6.2: constraints define a fixed layer's position relative to the viewer window, a Bottom constraint keeps its offset from the viewer bottom, and auto layout children need 'Ignore auto layout'. https://help.figma.com/hc/en-us/articles/31012379669783-FD4B-Set-page-scrolling-behavior-and-customize-animations. The Figma forum thread on fixed bars in long frames supplies Fallback A (device sized wrapper frame).
- WebKit blog (docs), Web Push on iOS : Source for the install decision: web push works only for Home Screen web apps, iOS 16.4 and later, with a manifest display of standalone or fullscreen, and permission requested from a tap. https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
- iOS status bar style (developer posts) : Source for D1 and D11: with black-translucent iOS renders white status bar text, which cannot sit on a light page; the workarounds are a dark strip or the default style. Evidence is community posts, not Apple docs, so verify on a device. https://dev.to/karmasakshi/make-your-pwas-look-handsome-on-ios-1o08 and https://developer.apple.com/forums/thread/742260
- Vaul and Sonner (docs) : Vaul Drawer.Root documents modal, dismissible (default true), handleOnly and repositionInputs (default true); shadcn's Drawer wrapper passes shouldScaleBackground, which the Vaul page does not list, so check it in drawer.tsx. Sonner documents position, visibleToasts (default 3), offset and mobileOffset (applies below 600 px); toast duration defaults to 4000. https://vaul.emilkowal.ski/api and https://sonner.emilkowal.ski/toaster
- Coverage note : Mobbin's web set is almost all desktop, so no real mobile web capture was found for top bars, bottom navs or drawers; the web items above are desktop drawers and checkouts. The mobile web behaviour rests on the vendor docs listed above plus the iOS apps. Targeted searches for PhonePe, Paytm, Groww and Jupiter returned nothing usable; CRED is the Indian reference.

## Code notes
STACK: Tailwind v4 + shadcn (sitsiilia registry) + vaul (shadcn Drawer) + Sonner. Map the brand to shadcn tokens once in globals.css; never use hex in components.

TOKENS
:root {
  --background:#fff; --card:#fff; --foreground:#172B4D; --ink-strong:#091E42;
  --muted:#F1F2F4; --muted-foreground:#44546F; --border:#DCDFE4; --input:#DCDFE4;
  --primary:#265CFF; --primary-foreground:#fff; --primary-subtle:#E9EFFF; --ring:#265CFF;
  --destructive:#AE2E24; --destructive-subtle:#FFECEB;
  --success:#216E4E; --success-subtle:#DCFFF1; --warning:#A54800; --warning-subtle:#FFF7D6;
  --safe-top:env(safe-area-inset-top,0px); --safe-bottom:env(safe-area-inset-bottom,0px);
  color-scheme:light;
}
html,body{background:var(--muted)} body{min-height:100dvh;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
Add a card radius token (16) as rounded-card in @theme (the kit's rounded-2xl is 18). Pressed states are overlays, not tokens (D8); Primary pressed renders about #2355E8.

HEAD (CHANGED: status bar style is default, theme colour white; do NOT use black-translucent, it forces white status text)
<meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover'>
<meta name='theme-color' content='#FFFFFF'> <meta name='color-scheme' content='light'>
<meta name='apple-mobile-web-app-capable' content='yes'> <meta name='mobile-web-app-capable' content='yes'>
<meta name='apple-mobile-web-app-status-bar-style' content='default'> <meta name='apple-mobile-web-app-title' content='Ohm'>
<link rel='manifest' href='/manifest.webmanifest'>  with display 'standalone', start_url '/', theme_color '#FFFFFF', background_color '#F1F2F4' (web push on iOS needs standalone or fullscreen).
Use dvh, never vh. Inputs are 16 px. Check on a real iPhone in installed mode, in system Light and Dark, that the status text is dark on the white header (sources are community posts); if a WebKit regression returns safe-area-inset-top 0 or a white gap, the layout still holds because the header only adds env(safe-area-inset-top) as padding.

SHELL (sticky inside a 480 column, not position: fixed, so it matches the Figma frame and the keyboard)
<div className='mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-muted'>
  <header className='sticky top-0 z-30 border-b border-border bg-card pt-[var(--safe-top)]'>
    <div className='flex h-14 items-center gap-1 pl-0 pr-4 data-[trailing=icon]:pr-2 data-[back=false]:pl-4' data-trailing={trailing} data-back={showBack}>
      {showBack && <IconButton aria-label='Back' onClick={goBack}><ChevronLeft className='size-6'/></IconButton>}
      <div className='min-w-0 flex-1'><h1 className='truncate text-lg font-semibold leading-7 text-ink-strong'>{title}</h1>{subtitle && <p className='truncate text-xs leading-4 text-muted-foreground'>{subtitle}</p>}</div>
      {trailing}
    </div>
  </header>
  <main className='flex-1 px-4 pb-6 pt-3'>...</main>
  <footer data-bottom-chrome className='sticky bottom-0 z-30 border-t border-border bg-card px-4 pt-3 pb-[calc(12px+var(--safe-bottom))]'> L buttons, gap-2 </footer>   {/* OR the nav, never both */}
</div>
No scroll observer: the header always has its border. Large (S12) and Home (S01) bars use h-16 with the same classes. Single h1 per page (the bar title); the sheet title is DrawerTitle.

BOTTOM NAV (no backdrop-filter anywhere)
<nav aria-label='Main' data-bottom-chrome className='sticky bottom-0 z-30 border-t border-border bg-card pb-[var(--safe-bottom)]'>
  <ul className='grid grid-cols-2'><li><a aria-current='page' className='flex h-[60px] flex-col items-center gap-1 pt-2 pb-1 text-xs font-semibold text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'><span className='grid h-7 w-14 place-items-center rounded-full bg-primary-subtle'><FileText className='size-6'/></span>Bills</a></li> ...
Inactive: text-muted-foreground font-medium, no pill fill. Icons: lucide FileText and ChartColumn (Figma name bar-chart-3).

BUTTON (CHANGED: six allowed styles, typed so the rest cannot be written; identical overlays to Figma)
const base = 'inline-flex shrink-0 select-none items-center justify-center rounded-full text-base font-semibold leading-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [background-image:linear-gradient(var(--press,transparent),var(--press,transparent))]';
const pressed = (hover, active) => `hover:[--press:color-mix(in_srgb,var(--ink-strong)_${hover}%,transparent)] active:[--press:color-mix(in_srgb,var(--ink-strong)_${active}%,transparent)]`;
variants: primary 'bg-primary text-primary-foreground ' + pressed(6,12); outline 'border border-border bg-card text-ink-strong ' + pressed(3,6); ghost 'text-ink-strong ' + pressed(3,6); destructive 'bg-destructive-subtle text-destructive ' + pressed(3,6); link 'px-1 text-primary active:opacity-60'.
sizes: l 'min-h-12 w-full gap-2 px-5 py-3 [&_svg]:size-5'; m 'relative min-h-10 w-auto gap-1.5 px-4 py-2 [&_svg]:size-[18px] after:absolute after:-inset-y-0.5 after:inset-x-0 after:content-[\'\']'.
Types: type L = { size?: 'l'; variant?: 'primary'|'outline'|'ghost'|'destructive' }; type M = { size: 'm'; variant: 'outline'|'link' }; export type ButtonProps = (L | M) & Omit<React.ComponentProps<'button'>, 'size'> & { asChild?: boolean; loading?: boolean }. Loading: aria-busy, pointer-events-none, Spinner size-5 before the label (replaces the start icon when there is one), width unchanged. Min heights, not fixed heights, so large text wraps instead of clipping. Hover rules only apply under (hover: hover), which Tailwind v4 does by default. IconButton: one size, size-11 (44), rounded-full, ghost only, aria-label required in the props type.

SHEET (shadcn Drawer = vaul): edit drawer.tsx once.
const Drawer = ({ shouldScaleBackground = false, repositionInputs = false, ...props }) => <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} repositionInputs={repositionInputs} {...props} />   // check that shouldScaleBackground exists in the installed shadcn drawer.tsx
DrawerOverlay: 'fixed inset-0 z-50 bg-ink-strong/45' (full bleed, no blur).
DrawerContent: 'fixed inset-x-0 bottom-0 z-[51] mx-auto flex max-h-[calc(100dvh-56px)] w-full max-w-[480px] flex-col rounded-t-[24px] border-0 bg-card'. On desktop the overlay stays full window while the sheet is capped at the 480 column.
Handle: 'mx-auto mb-1.5 mt-1.5 h-1 w-9 rounded-full bg-muted-foreground/30' (16 tall zone).
Header: 'flex h-14 flex-row items-center justify-between p-0 ps-4 pe-1' with DrawerTitle 'text-lg font-semibold text-ink-strong' and DrawerClose wrapping the IconButton (X, aria-label 'Close'); optional Back IconButton at the left for S03.1.
Body: 'min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4'. Footer: 'gap-2 px-4 pt-3 pb-[calc(12px+var(--safe-bottom))]' with a top border only while the body is scrollable.
Dismissal: leave vaul's defaults (dismissible true: dim tap, swipe, Esc). Do NOT set dismissible={false} anywhere (CHANGED): onOpenChange(false) means cancel; for S04d it runs the Keep reading path. The sheet registers data-bottom-chrome='sheet' with its own height so the toast clears it.

TOAST (Sonner)
<Toaster position='bottom-center' visibleToasts={1}
  offset={{ bottom: 'calc(var(--bottom-chrome, 0px) + 12px)' }}
  mobileOffset={{ bottom: 'calc(var(--bottom-chrome, 0px) + 12px)', left: 16, right: 16 }}
  style={{ '--width': 'min(361px, calc(100vw - 32px))' } as React.CSSProperties}
  toastOptions={{ duration: 4000, unstyled: true, classNames: { toast: 'flex w-full min-h-12 items-center gap-3 rounded-xl bg-ink-strong px-4 py-3 text-sm font-medium text-white', icon: 'size-5 text-success-subtle' } }} />
mobileOffset applies below 600 px; also test at 520 wide (toast must not exceed the 480 column) and at desktop width. A ResizeObserver on the topmost [data-bottom-chrome] element (sheet first, otherwise footer or nav) writes its height to --bottom-chrome on :root; the safe area is already inside that height. Over a sheet the toast sits 12 above the sheet top because the sheet publishes its own height. Use toast.success(text) only for the table in section 7. role='status' and aria-live come from Sonner.

ROUTER (section 8)
const goBack = (parent: string) => (hasInAppHistory() ? router.back() : router.replace(parent));  // React Router: location.key !== 'default'; Next.js: keep a counter in history.state and increment it on push
Sheets: router.push(`${pathname}?sheet=add-bill`, { scroll: false }); close = hasPushedSheet ? router.back() : router.replace(pathname).
After 'Save and see August bill': router.replace('/bill/2026-08'). After payment success: router.replace('/bill/2026-08/paid'). Done: router.replace('/').
Parent map: /bill/2026-08/checks, /parts, /pay to /bill/2026-08; /bill/2026-08, /connection, /bills, /trends, /paid, /reading to /; /connection/:detail to /connection.

KEYBOARD AND INPUTS: sticky footers stay in flow. iOS does not shrink the layout viewport when the keyboard opens, so the footer sits behind the keyboard until it closes; set enterkeyhint='done' and scroll the focused field into view with scroll-margin-bottom 16. Optional later: a visualViewport listener that lifts the footer by the keyboard height. Do not use position: fixed for footer or nav.

OTHER: prefers-reduced-motion swaps slide and rise for a 150 ms fade. scroll-padding-top: calc(3.5rem + var(--safe-top)). overscroll-behavior-y: contain on sheet bodies. Razorpay options: theme: { color: '#265CFF' }. Add hover and focus-visible styles to nav tabs and icon buttons (2 px primary ring, 2 px offset). Do not rely on the #DCDFE4 border to identify inputs (1.3:1): see open questions.

FIGMA PLUGIN FACTS (typings 1.121.0): frame.numberOfFixedChildren is writable and the fixed layers are the LAST N entries of frame.children; frame.minHeight and layoutPositioning 'ABSOLUTE' work on auto-layout frames and their direct children; constraints on absolute children are { horizontal: 'STRETCH' | 'CENTER', vertical: 'MIN' | 'MAX' }; frame.overflowDirection = 'VERTICAL'; frame.itemReverseZIndex is the 'Canvas stacking: first on top' switch. Gotchas from round 1: resize() on an auto-layout frame fixes its size, so set primaryAxisSizingMode = 'AUTO' afterwards; set layoutSizingHorizontal = 'FILL' only after appendChild; figma_execute times out at 30 s but can keep running, so make every step idempotent.
TEMPLATE SCRIPT (sketch)
const f = figma.createFrame(); f.name = 'Screen template'; f.layoutMode = 'VERTICAL'; f.resize(393, 852); f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'FIXED'; f.minHeight = 852; f.clipsContent = true; f.overflowDirection = 'VERTICAL';
append Content first, then Header, Footer, Home indicator; for each pinned layer: layoutPositioning = 'ABSOLUTE'; Header constraints { horizontal: 'STRETCH', vertical: 'MIN' }, x 0, y 0; Footer constraints { horizontal: 'STRETCH', vertical: 'MAX' }, y = f.height - footer.height; Home indicator constraints { horizontal: 'CENTER', vertical: 'MAX' }; then f.numberOfFixedChildren = 3.
AUDIT SCRIPT (sketch, read only): for every child of Section 9:7426 except S02, report height, Content.y + Content.height vs height, numberOfFixedChildren vs the count of ABSOLUTE chrome children, the main component of every instance (flag Toolbar - Top, Tab Bar, Sheet - iPhone, kit Button, local 5:2903), any BACKGROUND_BLUR or DROP_SHADOW on chrome layers, text nodes inside buttons whose size is not 16, and reaction destinations that no longer resolve.

## Open questions

- REAL OPEN 1, status bar on a device: the design assumes status-bar-style default (dark text on a light system bar) over a white header. The evidence that black-translucent forces white text is community posts, not Apple docs, and sources disagree on what 'default' paints. Default if untested: build as specified and check once on a real iPhone, installed, in system Light and Dark. If the lead wants a grey header instead, the only workable route is a dark strip under the status text, which changes the look.
- REAL OPEN 2, install and push: S02 only works as a push notification in an installed Home Screen app (iOS 16.4 and later). Default: the one-time S04.1 'Get bill alerts' sheet after the first bill, with email as the fallback channel and an email version of the S02 message for plain Safari. Needs the lead's yes because it adds a screen and an email channel.
- REAL OPEN 3, dark mode: tokens are light only and the page declares color-scheme light. Default: later. Chrome tokens would need twins (white bars become a dark surface, hairline becomes 10% white, toast becomes a light surface).
- REAL OPEN 4, input borders: line #DCDFE4 is 1.3:1 on white, below the 3:1 that a field boundary needs when the border is the only cue (S05.3, S05.4, S05.7). Outside this track; proposed default is a 1 px ink-muted border on inputs only.
- KEPT AGAINST THE CRITIQUE 1: 'Something looks off' stays as copy (exempt from verb first) instead of 'Report a problem'. It was accepted in round 1, describes her situation, and does not read like filing a complaint against her power company. It is now a Link M, not a ghost button.
- KEPT AGAINST THE CRITIQUE 2: S11 keeps Primary 'Share receipt' over Ghost 'Done' (Mercury and PayPal make Done primary). Her next job after paying is proof for the owner; Done is a quiet exit. Override by swapping the two styles; nothing else changes.
- KEPT AGAINST THE CRITIQUE 3: the 16/24 Semi Bold label stays on the 40 tall M buttons (Add bill, Your connection, View full bill) beside an 18/28 bar title. One label style is the lead's explicit consistency rule; a 14/20 M label would reintroduce two styles. Revisit only if the first visual check shows the bars feel heavy.
- KEPT AGAINST THE CRITIQUE 4: I did not adopt black-translucent plus the two meta tags the critique suggested; with that status bar style iOS paints white text over the light header. The two meta tags are in, with status-bar-style default (D11).
- TRADE-OFF 1, share placement: 'Share with owner' is now an Outline L under the discount card (about y 598 to 646 on S06, inside the first viewport) instead of a permanent footer button. It saves 56 px of fixed chrome on three screens. If the lead wants Share always visible, restore the Stack footer on S06 and S13 only and accept a 162 footer.
- TRADE-OFF 2, S05.1 stays a sheet that scrolls inside on viewports shorter than 809 (753 tall plus the 56 peek). If testing shows the scroll is missed, convert it to a pushed page 'What looks off' with a Compact bar; no other frame changes.
- VERIFY, Figma Present: the mechanism is documented (Bottom constrained fixed layers stay pinned to the viewer window) but nobody has run it in this file and agents cannot. Fallback A and B are budgeted (section 6.2). Also confirm the 'iPhone 16 (393 x 852)' preset exists in the Figma version in use.
- VERIFY, Vaul: the Vaul docs page does not list shouldScaleBackground; confirm it exists in the installed shadcn drawer.tsx before relying on the false default.
- Razorpay: Checkout theme colour #265CFF is decided (D7); everything else in Checkout is Razorpay's own UI over S10.