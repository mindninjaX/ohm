# DECISIONS

**Figma fileKey: `mwmHwXDuayUYeliDAlv3Fo`** (file "Bill app"; the bridge listed it under its old name "Neufin Design Assignment", and the user confirmed it is the one to use). Library (read only): `rbjdZF2zNKeubApgiy0ifS`.

## Prompt 01: foundation and scaffold

- The kit has no root component for **Card**, **Sheet**, **Progress**, **Tabs list** or **Chart bars**; its own examples compose them from frames bound to library variables plus part instances (Card header, SheetHeader, SliderTrack + SliderRange, Tab). I compose them the same way: the frame is bound to library variables, and every control inside is a library instance.
- `chart-line` is not in the kit's Lucide set under that name. It ships as `lucide/line-chart` (the older Lucide name for the same glyph), so I used that.
- Card content (`f43a7cc2…`) is not published, so it can't be imported. Card bodies are plain auto-layout frames, following the kit's own Card page.
- Text that is not inside a component (headings, amounts, captions) is a text node using a library text style, with its fill bound to a `brand` variable. No raw hex.
- Brand success/warning/danger pairs are named `success` + `success-subtle` (and the same for warning and danger), matching the spec's `primary-subtle` and "warning-subtle".
- **Status bar** (393 x 54): "9:41" in Text-base/Semi Bold plus Lucide `signal` and `battery-full`, all in `brand/ink-strong`. Per the spec, no wifi glyph.
- **Top bar** (393 x 56): Back is a library Icon Button (Ghost, lg) with `chevron-left`, resized to 44 x 44 so it's an easy tap target. The title is left aligned (Text-lg/Semi Bold) so long titles like "Where the money goes" still fit beside a right action. Properties: Back (bool), Title (text), Right action (bool), Right text (text).
- **Bottom nav** is a component set with `Active = Bills | Trends`, 80 px tall including a 26 px home-indicator inset. The active tab shows a `brand/primary` icon and label on a `brand/primary-subtle` pill; the inactive tab uses `brand/ink-muted`. Fill is library `background`, with a top stroke from library `border` (rebranded to `brand/line`).
- Screen frames use vertical auto layout with a `Status bar` instance first. Overlays (dim layer, sheets, sticky footers) are absolutely positioned children.

## Mid-run requests from the user

- **Real iOS kit** ("iOS and iPadOS 27", library file `hdZ6gl53iy8j2XNelFxm2i`, published by the user mid-run) now supplies all system chrome:
  - `Status bar - iPhone 17 Pro` sits inside the local **Status bar** component (now 393 x 62), so every frame picked it up at once.
  - `Tab Bar - iPhone` (Tabs=2, the iOS 26 floating glass pill) sits inside the local **Bottom nav** variants, pinned to the bottom of S01 and S12 over the content. The tabs are "Bills" with SF Symbol `doc.text` (U+10023F) and "Trends" with `chart.line.uptrend.xyaxis` (U+100441). I checked both code points by rendering them, because the kit's tab icons are SF Pro glyphs, not Lucide.
  - `Toolbar - Top - iPhone` replaces the local Top bar on S04 to S08, S10, S12 and S13. Back is the kit's glass back button in the Leading slot. S04 hides Leading. S12 uses Style = Large Title. S06 and S13 use Style = Title 2 Line Left, with the trailing Button Group set to Type = Text showing "Northgrid · HT"; a centered title collided with that capsule. The local **Top bar** component stays on Foundations but isn't used any more.
  - `Home Indicator` (iPhone, Portrait) is pinned to the bottom of every screen without a tab bar. S02 uses the lock screen's own.
  - S02 is `Lock Screen - iPhone` scaled to 393 wide, with its inline widget set to "Tuesday, 3 September", the modular widgets hidden and its own white status bar (the app status bar is removed on S02). `Notification - Collapsed` shows the spec title and message. The kit's time label reads "Ohm · now" so the spec's app line is kept, and the app icon is `brand/primary` with a Lucide `zap` overlaid.
  - S03 and S09 use `Sheet - iPhone` (glass, dimming layer, grabber) with my content appended to its `Content` slot; the kit's sheet toolbar carries the title and close button. S03 is Medium detent. S09 is Medium too, so S06 stays visible behind; the kit doesn't allow a taller custom detent (height and position can't be overridden), so the share preview is scaled to 76% like an image thumbnail.
  - The shadcn `SheetHeader` I built first is replaced by the kit sheet's own toolbar, which is more realistic. The rebrand pass skips iOS kit internals; their variables are the kit's own (system blue tint and so on) and aren't part of the shadcn swap list.
- **Mobbin references** used: [State Farm bill](https://mobbin.com/screens/52562e16-b7df-4098-a63c-3545cb75a7e0) and [Gojek review](https://mobbin.com/screens/36a68195-aca3-4a1e-91d6-6b2a974be896) for inset grouped rows; [Cash App bill](https://mobbin.com/screens/bcc0e21d-284f-4c55-a15d-f38ef64af51b) and [Swiggy pay](https://mobbin.com/screens/88296516-f2a9-4e27-8770-a3ec743ac907) for the single huge amount plus a savings callout; [Grab pay](https://mobbin.com/screens/a305ba9b-d834-4205-88b3-b4a7b47461fc) for the sticky pay bar; [Starling paid](https://mobbin.com/screens/3c46b304-4259-4c8f-89cd-c2a54b3f1ebf) and [Shopee paid](https://mobbin.com/screens/b590eb87-2252-4566-84ac-9d005dcb24b9) for the receipt layout; [Tesla charge stats](https://mobbin.com/screens/71b09873-9a5b-4a0a-83a8-b50e82c53264) for chart plus big stats.

## Prompt 02: S01 to S05

- Badge variants "success" and "warning" don't exist in the kit. I start from `Badge State=Secondary` and override its fill, text and icon with `brand/<tone>-subtle` and `brand/<tone>`, which is the kit's own "Custom Colors" badge recipe. The S01 past-bill Badge "Saved ₹32,480" has no tone in the spec, so I made it success (it reports a saving); a plain grey badge read as disabled.
- S01 plus is an Outline Icon Button, so it doesn't compete with the primary "View bill". Avatar "NK" uses the kit's fallback avatar (Type=Count), tinted primary-subtle so it shows against the grey page.
- S01 usage chart: 13 vertical `SliderRange` instances scaled from a zero baseline (an honest scale, so the bars look similar). August is `brand/primary` and the other months are `brand/line`. There are no month labels because the spec gives none for the small chart.
- S03 behind-layer is a clone of S01 under a `brand/ink-strong` 45% dim. The sheet is a frame (the kit has no bottom Sheet) holding `SheetHeader` (description hidden, close icon on) and 4 Outline Items. "Coming soon" is a Secondary badge swapped into the Item's button slot, and the row is at 50% opacity (the kit's disabled convention).
- S04: no back on "Reading your bill" (it's a process), spinner hero in a primary-subtle circle, with the checklist as an inset grouped card.
- S05: rows are label left (ink-muted) and value right (ink, medium), with Separators between. "Hotel" is a `NativeSelect`. "Fits a hotel" is a success badge next to "HT Commercial". Buttons are in a bottom footer, primary then ghost, both 44 px tall.
- **S02 Notification is on hold** until the iOS kit keys resolve (it needs the kit's Lock Screen and Notification).

## Prompt 03: S06 to S08

- S06 hierarchy: amount in Text-5xl/Semi Bold (48 px, the largest in the app), then "due 16 Sep", then a full-width success Alert with a chevron, then the change card, then the primary-subtle discount card (progress bar 2/7 built from `SliderRange` + `SliderTrack`, "5 days left" in primary), then "Where the money goes" with thin 6 px bars. The sticky footer holds Pay (48 px) and Share (44 px). The content area scrolls; "Where the money goes" starts above the fold.
- The Alert can't take a chevron child, so it sits in a wrapper frame with an absolutely positioned `chevron-right`.
- S07: 6 `Item` rows (circle-check in `brand/success`) in one inset card, with separators inset to the text column, iOS style. The "How we check" card is library `muted` (rebranded to surface-muted) with a `line` border so it shows on the grey page.
- S08: `AccordionItem` instances. Name and plain meaning share the Title text as two styled lines. Amount and share are a right-aligned column over each trigger. Row 1 is shown open with its maths, and its chevron is swapped to `chevron-up` because instance rotation can't be overridden. The total row shows only the spec text, right aligned.
- **Maths check:** the 7 amounts sum to ₹36,42,169 (matches). Shares round to 62/11/10/9/8/0.4. Spec numbers that don't reconcile, **kept as written**: tax "30 paise per kWh ₹97,754" (30 paise × 3,26,500 = ₹97,950); "After 16 Sep: ₹36,87,690, which is ₹45,527 more" (₹36,87,690 − ₹36,42,160 = ₹45,530).

## Prompt 04: S09 to S13

- S09: image-style preview card on a surface-muted canvas (inside the iOS sheet) with the badge, the trend line, a primary-subtle saving strip and "Checked by Ohm" with a `zap` mark. The targets are Secondary Rounded Icon Buttons at 56 x 56 with labels.
- S10: the Radio Group is two choice cards (the kit's "Choice Card" recipe): library `Radio` plus text, selected card in primary-subtle with a 2 px primary border. "Saves ₹32,971" is a success badge. "How" card with a `landmark` icon. UPI note with an `info` icon. Footer: Pay (48 px) plus a `lock` icon and "Secured by Razorpay".
- S11: no nav bar (end of flow). 96 px success circle, "Paid ₹36,09,190" in Text-3xl, key-value receipt card. The Status badge "Paid, waiting for Northgrid to confirm" uses the **warning** tone because it's pending (the spec gives no tone). Footer: Share receipt (primary with `share` icon), Done (ghost).
- S12: Tabs are library `Tab` instances (Units on) in a `brand/line` track. The chart uses exactly the 13 spec values from a zero baseline (max bar 160 px for May). August is `brand/primary` with its value label "3,26,500"; the other months are `brand/line`. Month labels "Aug 23" and "Jan 24" break onto two lines to fit the 24 px column pitch. Stats are rows ("Peak" / "May, 3,42,210": the spec's "Peak:" colon becomes the label/value split). Note card with `info`.
- S13 is a clone of S06 with only the listed changes: warning Alert (`triangle-alert`, "1 thing to look at" / "5 of 6 checks passed", chevron in warning), then the warning-subtle "Contract demand changed" card with the Outline "Copy details for Northgrid" button (`copy` icon), then the muted note. Everything below is unchanged from S06.
- Housekeeping: Figma calls sometimes overran the 30 s bridge timeout and finished in the background, which twice created duplicates (S07 rows, S11 buttons, an S10 note). All were found by a duplicate-text scan and removed.

## Prompt 05: prototype, review, export

### Interactions (all verified: every destination frame exists)

Default transition: On tap, Navigate to, Smart animate, ease out, 250 ms. "Back" is Figma's Back action.

| Screen | Layer | Trigger | Action | Target |
| --- | --- | --- | --- | --- |
| S01 Home | Button / View bill | On tap | Navigate | S06 Bill summary |
| S01 Home | Add bill (plus) | On tap | Navigate | S03 Add a bill |
| S01 Home | Bottom nav > Tab (Trends) | On tap | Navigate | S12 Trends |
| S02 Notification | iOS / Notification | On tap | Navigate | S06 Bill summary |
| S03 Add a bill | Item / Upload the PDF | On tap | Navigate | S04 Reading |
| S03 Add a bill | Sheet close (xmark) | On tap | Back | previous |
| S04 Reading | frame | After delay 1500 ms | Navigate | S05 Confirm connection |
| S05 Confirm connection | Button / Looks right | On tap | Navigate | S06 Bill summary |
| S05 Confirm connection | Nav back | On tap | Back | previous |
| S06 Bill summary | Alert / checks (tappable) | On tap | Navigate | S07 Checks |
| S06 Bill summary | Link / See all 7 parts | On tap | Navigate | S08 Breakdown |
| S06 Bill summary | Button / Pay ₹36,09,190 | On tap | Navigate | S10 Pay |
| S06 Bill summary | Button / Share with owner | On tap | Navigate | S09 Share |
| S06 Bill summary | Nav back | On tap | Navigate | S01 Home |
| S07 Checks | Nav back | On tap | Back | previous (S06) |
| S08 Breakdown | Nav back | On tap | Back | previous (S06) |
| S09 Share | Target / WhatsApp, Email, Copy link | On tap | Navigate | S06 Bill summary |
| S09 Share | Sheet close (xmark) | On tap | Navigate | S06 Bill summary |
| S10 Pay | Button / Pay ₹36,09,190 | On tap | Navigate | S11 Paid |
| S10 Pay | Nav back | On tap | Back | previous |
| S11 Paid | Button / Done | On tap | Navigate | S01 Home |
| S11 Paid | Button / Share receipt | On tap | Navigate | S09 Share |
| S12 Trends | Bottom nav > Tab (Bills) | On tap | Navigate | S01 Home |
| S13 Check failed | same 5 as S06 | On tap | Navigate | S07 / S08 / S10 / S09 / S01 |

Flow starting points on page `Screens`: **Monthly bill** at S02, **First bill** at S01, **Something is off** at S13. The Content areas of S06, S07, S08 and S13 scroll vertically.

- Back on S06 and S13 navigates to S01, because the spec says "back > S01" explicitly; every other back button uses Back. The sheet close on S03 (not in the spec) uses Back. The S09 close counts as "any", so it goes to S06.
- Flow walk-through: Monthly S02 > S06 > S07 > (Back) S06 > S08 > (Back) S06 > S09 > S06 > S10 > S11 > S01, and every hop is wired. First bill S01 > S03 > S04 > (1.5 s) S05 > S06, all wired.

### Thumb-first review (touch targets, hierarchy, reach)

Measured on every interactive layer. Zones on 852 px: hard is above 170, stretch is 170 to 511, natural is below 511.

**Fixed (clearly wrong):**
- S06 and S13 "See all 7 parts" link was 32 px tall; it's now a 44 px hit area.
- S05 "Hotel" NativeSelect was 36 px tall; it's now 44 px.
- S06 and S13 "After 16 Sep: ₹36,87,690, which is ₹45,527 more." was 12 px muted text, but it's a money consequence. It's now Text-sm (14 px).

**Passing:** every primary action except S01's is full width, 44 to 48 px, and in the natural zone with the thumb (S05 Looks right, S06 and S13 Pay, S10 Pay, S11 Share receipt). Each screen has one primary; secondary actions are outline or ghost below it, 8 px apart. Footers clear the home indicator (34 px). Share targets are 56 px. Sheet rows are 66 px. Tab bar tabs are 88 x 54. Contrast: ink-muted on white is 7.7:1; success, warning and primary on their subtle fills are 4.5:1 or better.

**Judgment calls (left as is):**
- S01 "View bill" is in the stretch zone (y 299) because it lives in the bill card per the spec. A sticky bottom CTA on Home would compete with the tab bar.
- S01 plus (Add a bill) is top right, in the hard zone, where the spec puts it. It's a rare action.
- Nav back buttons are top left, in the hard zone. That's iOS standard, and edge-swipe back covers one-handed use.
- S12 Units/Rupees tabs are 32 px tall, matching the iOS segmented control height. The full-width track gives a large hit area.
- S04 says "You can close this" but has no close control (the spec gives the top bar no action). Adding a close (xmark) wired to S01 would make the promise true; it's flagged rather than added.
- 12 px text remains for badges, captions, account number and accordion meanings. All of it is secondary, and the kit's Badge is fixed at 12 px.
- S06's "Where the money goes" starts above the fold and scrolls. The 3-second answers (amount, check, deadline) are all above the fold.

### Copy check
- Every visible text layer on all 13 frames was compared against SPEC.md (line breaks normalized): **219 lines, all verbatim, 0 em or en dashes, 0 numbers not in the spec.** SF Symbol glyphs and the kit's lock screen controls were excluded. Splits I chose (label/value, two-line month labels, name/meaning in S08 titles) keep the spec words unchanged.

### Export
- `exports/S01 Home.png` to `exports/S13 Check failed.png`: 13 PNGs at exactly 2x (786 x 1704). The bridge's screenshot tools cap at 1568 px, so frames were exported with the plugin's own `exportAsync` (scale 2) and posted to a small localhost receiver on an allowed port (9232).

## Polish pass (Mobbin research, after Prompt 05, at the user's request)

Research: 10 Mobbin searches beyond direct matches, covering fintech home dashboards (Cleo, Copilot, YNAB, Origin, Rocket Money, Octopus), invoices (PayPal, Fresha, Starlink), check lists (Uber account checkup, Chime security center), pay review (Wise, Affirm, Klarna, Airbnb, ANZ), spending charts (Lloyds, N26, Revolut, Wise), scanning (GoPay, Lovi), countdowns (Zip, Cleo) and share cards (Brink, Polarsteps, Substack).

Changes (copy and numbers untouched; the copy check was re-run and is identical):
- **Pill buttons** everywhere (kit `Roudness=Rounded`). Primary is 50 px, secondary 44 px.
- **Borderless inset cards** (white on surface-muted, radius 16). Tinted and info cards keep their edges.
- **Muted ₹ glyph** at about 70% size on hero amounts (S01, S06, S13, S10, S11), so the digits lead.
- **iOS large titles** on S05, S07 and S10 (checkup and review screens).
- **S06/S13:** "2 of 7 days" is now a 7-segment day bar (2 used) with a clock + "5 days left". "Up 1.5% from July" is a lighter row with a warning arrow chip instead of a full card.
- **S01:** the deadline sits in a primary-subtle strip with a clock icon, "Past bills" is an uppercase section label, and the past-bill Item has a receipt icon.
- **S04:** a bill-page preview built from kit Skeleton parts with a scan line, with the Spinner as a corner badge (GoPay pattern).
- **S12:** dashed gridlines behind the bars (no axis numbers, so nothing invented).
- S03 and S09 background clones were rebuilt from the updated S01 and S06 (their reactions stripped). All 30 interactions were re-verified and the 13 PNGs re-exported.

## Source of truth
- Lives **in Figma**: page **"Source of truth"**, frame "Source of truth" (1040 wide). It has 13 sections: what Ohm is, files and node IDs, rules, tokens and rebrand, design system, components with full keys, every screen, prototype, decisions, spec inconsistencies, agent playbook, research references, change log. Update it whenever the design changes.

## Feedback round 1 (13 Oct 2026): versioning and first fixes

### Design version control (user request)
- Every iteration is preserved. Before round 1 edits, the pages were duplicated into locked archive pages below a `------` divider: **v1 · Screens · 13 Oct**, **v1 · Foundations · 13 Oct**, **v1 · 02 Journey map · 13 Oct**. Each has an amber "Archived · v1" banner, and every layer is locked.
- New work happens on the un-prefixed pages (`Screens`, `Foundations`, `02 Journey map`). The working `Screens` page is a copy: frames have new node IDs, the 3 flow starting points came across, and 7 prototype links on nested instance layers (which still pointed at the original frames) were remapped by frame name. All 30 interactions point inside the working page.
- Two edits had already been made in place right after the feedback (dates to 2026, the S02 fix). They were reverted in the v1 archive, which now matches the validated pre-feedback copy line for line. The v1 PNGs in `exports/` are a second record of v1.
- Rule from now on: never edit local components (Status bar, Bottom nav) in place, because archived screens use them too. Make a new component version and swap working instances.
- Stray layers left by earlier timeouts (an Item and a "Mar" label on Screens, a type sample on Foundations) were removed.

### Done in the working copy so far
- **Dates moved to 2026** (user request): July 2026, August 2026, Thursday 3 September (3 Sep 2026 is a Thursday), 3 Sep 2026 11:42 AM, UTR HDFCR52026090312345, S12 axis labels Aug 25 to Aug 26 (Jan 26), "Rupee history starts from July 2026". This supersedes the spec's 2024 dates.
- **S02 lock screen:**
  - The kit's lock-screen status bar has no Dynamic Island. A kit `Status bar - iPhone 17 Pro` instance, with its time and indicators hidden, now sits on top to supply the island.
  - The notification's title and message were fixed widths after the resize and overflowed into the time. They now fill the text column; the title truncates to 1 line and the message wraps.
  - The time label is "now", matching how iOS shows notifications. The app name isn't shown, because the icon carries it.

### Round 1 design process
- An 8-track design workflow ran, one track per feedback area: journey map, Foundations, S01 bill card, S01 usage and past bills, S02 lock screen, S03 add a bill, S04 reading, and S05 confirm and fix. Each designer researched Mobbin (2 to 4 broad searches) and wrote a concrete spec. An adversarial critic then judged it against the feedback, and the designer revised it. The full specs are in `specs/round1/*.md`, and the shared builder instructions are in `specs/round1/BUILD_GUIDE.md`.
- These decisions override the specs where they conflict:
  - One reassurance phrase everywhere: **"No hidden charges or penalties"** (description: "Charged at the regulator's rates"). It replaces the vague "All 6 checks passed" on Home and in the notification. This is CRED-style answer-first copy, as the user asked.
  - **S01 plus button:** it adds a bill (it opens S03). It becomes a labelled iOS glass capsule, "Add bill", in the nav bar.
  - **S01 bill card:** one hero (the amount), with the real due date in the eyebrow ("August bill · due Wed 16 Sep"), one supporting line ("Pay by Tue 8 Sep and save ₹32,971", with only the saving in green), one pill ("Review and pay"), and the reassurance row as a quiet footer. The deadline strip, the "5 days left" badge and the green pill are gone.
  - **S01 usage:** the headline says the answer ("Up 1.8% from July", plus both numbers). The chart is a labelled line on a lowest-to-highest scale (Aug 2025, highest May, lowest Feb, Jul, Aug 2026). A footnote explains that the units come from the 12-month table printed on the August bill, while rupee history starts with July 2026, the first bill paid with Ohm. That answers "why 12 months when I only paid July". Past bills lists only bills paid with Ohm, with an **All bills** screen and a **July 2026** paid-bill screen.
  - **S01a "Your connection" sheet:** not built. The saved S05 view covers it.
  - **S02 notification copy:** title "August power bill: ₹36,42,160", message "No hidden charges or penalties. / Pay by Tue 8 Sep to save ₹32,971."
  - **S03:** a 2 x 2 grid of illustrated tiles in the S04 style, plus **S03.1 Forward the email** (the address can't fit in a tile). No helper line, because the Medium sheet is full.
  - **S05:** reframed from "Is this right?" to **"Your connection"**, a statement of what was read and why it is kept (the baseline for checking future bills). "Something looks off" now leads to a real flow: pick a detail, see it **on your bill** (the printed crop beside Ohm's reading), then fix it from your agreement, report a misread, or ask the Ohm team. Manual fixing is limited to the two numbers that change money: contract demand and meter multiplier. Two worlds are built: the 700 kVA bill (correct) and the 900 kVA bill (wrong, which leads to S13.1).
  - **S04:** scoped to the asks. A close xmark (keeps reading, notifies later), a separate "Stop reading this bill" with a confirm sheet, tappable step rows that expand into plain-language sub-steps (like a "thinking" disclosure), and a bill illustration redrawn as an Indian HT bill (masthead, consumer block, date boxes, meter table, 12-month usage strip, charges, total, tear-off slip with QR).
- **Data issues found (kept as written, for the user to resolve):**
  - July: ₹35,88,340 (bill) minus ₹35,53,720 (paid) is ₹34,620, but the row says "Saved ₹32,480".
  - Sales tax: 30 paise × 3,26,500 is ₹97,950, not ₹97,754.
  - "₹45,527 more" should be ₹45,530.
  - S13's ₹4,620 implies a billing-demand rule that the booked-capacity line doesn't reflect.

### Wave 1 build (round 1 specs): done
- 15 agents built, reviewed and fixed the following:
  - **S01** Home: new header with "Add bill", calm bill card, usage card, past bills. New screens S01.1 All bills, S01.2 July 2026 bill and S01.3 Where these numbers come from.
  - **S02** lock screen: native 402 kit lock screen, Dynamic Island, rebuilt notification, Ohm app icon.
  - **S03**: 2 x 2 illustrated grid with Add bill tile and Art components, plus S03.1 Forward the email.
  - **S05** Your connection: two worlds, S05.1 to S05.9, plus S13.1.
  - **Journey map**: restyled on brand tokens.
- The per-area report is in `specs/round1/wave1-report.md`. New components sit in "Components · …" sections on the Foundations page (Journey's are on the journey page).
- Lead calls on the builders' open questions:
  - S02: keep the Dark wallpaper (better contrast for the white date and the notification).
  - S02: keep the small bill-page app icon.
  - S05.3 empty field: add the neutral placeholder "Number on your agreement".
  - Journey map: a no-break space in "930 kVA" is allowed (invisible, keeps words together).
  - Journey map: the subtitle keeps "August 2024" and "1 Sep 2024", because it is a historical case-study sample and the user said not to change its content.
  - Section label style (uppercase xs on S03/S05 vs sentence-case lg on S01) is settled by the round 2 global system.
- **v2 snapshot:** pages "v2 · Screens / Foundations / 02 Journey map · 13 Oct" capture the round 1 build with iOS Liquid Glass chrome. They are locked, have banners, and their prototype links are remapped inside the archive (82 links, 4 flows).

## Feedback round 2 (S06 to S13 and global), 13 Oct 2026
- **Web pivot:** Ohm is a mobile web app, so app chrome must be web-buildable. That means no iOS Liquid Glass nav bars, tab bars or sheets. The iOS status bar and home indicator stay only as device context.
- **Frames grow to their content** (no clipping). Header, footer and nav stay fixed when scrolling.
- **One button system** everywhere.
- **Bar charts,** done properly. The S01 line chart is replaced too.
- **Subagents** now run on Sonnet (user request).

### Round 2 lead decisions (conflicts between specs), 14 Oct 2026
- 5 design tracks wrote the specs (each did Mobbin research, then an adversarial critic, then a revise): the global web system, S06/S13, S07/S08, S09/S11, S10 and S12/S01. They live in `specs/round2/`. The shared builder rules are in `specs/round2/BUILD_GUIDE_R2.md`.
- **Top bars** follow the global spec. On S06 and S13 that means Compact with Back, the title "August bill", the subtitle "Northgrid Electric" and a trailing Outline M "Your connection". The "Bill summary / Northgrid ▾" idea is rejected.
- **S06 content** (fixes "repeated, conflicting amounts", "colour mess" and "6 checks are vague"):
  - Hero: ₹36,42,160 and "Due Wed 16 Sep". There is one amount and one due date.
  - The reassurance row comes next.
  - Then the price ladder: today is marked, so the early-pay price (₹36,09,190 by Tue 8 Sep) reads as a step on the same ladder, not a second total.
  - Then a July change card ("₹53,820 more than July", with a units bar). It replaces the vague "Up 1.5%".
  - A visible "See all 7 parts" link opens S08.
  - "Share with owner" is an Outline L in the content.
  - The footer is one Primary L: "Pay ₹36,09,190 by Tue 8 Sep".
- **S06 states:** S06.1 After Tue 8 Sep, S06.2 Paid, S06.3 Payment pending, S06.4 Payment failed and S06.5 Payment cancelled.
- **S13 names say what failed:**
  - "S13 Check failed, changed since first bill"
  - "S13.1 Check failed, agreement says 700 kVA" (replaces "your number", which was meaningless)
  - "S13.3 Copied, details for Northgrid"
- **Share** (S09, S11.1 and S13.2 Share with owner, needs a look): one share card with the properties Payment (Unpaid | Paid) and Checks (Clear | Look). The share preview shows exactly what the owner will receive. The targets are WhatsApp (the real glyph in WhatsApp green, the one labelled brand-colour exception), Email and Copy link. Copy link shows the toast "Link copied". S09 gains "Mark as unpaid" and more detail under "Checked by Ohm".
- **S07 and S08 have no footer.** S08 is reached from S06 "See all 7 parts" and from S07 check 1. There is no Breakdown link on Home.
- **S08** rows are always open:
  - The final amount comes first.
  - Then a "Before taxes" subtotal and the tax breakdown.
  - Rounding is small text.
  - Extra frames: S08b (needs a look) and S08c (what a term means).
- **S10** is Razorpay's checkout. The full-amount option, the UPI note and the net-banking card are gone. The Razorpay logo is a marked "LOGO PENDING" placeholder until the user picks a source.
- **S11:** the big green check is replaced by the Indian HT bill illustration in its Done state, plus a share-receipt preview.
- **Home (S01):** compact bar chart instead of the line chart, "due Wed 16 Sep" in Medium ink-strong, and the new section header style.
- **S12:**
  - Bar charts with range tabs (All time, 2026, 2025) and a metric switch (Units used, Bill amount).
  - Rupees build up from July 2026, and a card explains why.
  - A swing strip shows the highest and lowest months.
  - Months are never squeezed.
- **New token:** brand/line-strong #8590A2 (3.2:1 on white), used for non-selected bars and neutral data marks.
- **Section headers** outside cards use one style: Text-base/Semi Bold ink-strong, sentence case.
- **Open with the user:**
  - Which source to use for the Razorpay logo.
  - Razorpay's default net banking limit per transaction (₹5,00,000) is below the ₹36,09,190 bill, so a raised limit or NEFT/RTGS is needed.
  - The data issues listed in round 1.

### Round 2 rescoped: simple chrome, effort on the screens, 14 Oct 2026
- **User direction:** no web chrome kit. Use a simple back arrow and plain website-style headers. Leave the iOS status bar, bottom bar and sheets alone (they are cosmetic and disappear in the web build). Only tone down the Liquid Glass. Spend the effort on the designs.
- **What replaces the chrome kit:**
  - Two small local components: `Ohm / Header` (plain white, Lucide arrow-left, title, optional subtitle and trailing action) and `Ohm / Button` (Primary, Secondary, Destructive, Link at L 48 and M 40, label Inter Semi Bold 16). The button is still needed because the user asked for consistent buttons.
  - Footers are plain white bars with a top line.
  - The existing Toast is reused.
- **What it overrides above:**
  - "Top bars follow the global spec" is replaced by Ohm / Header.
  - S06 states are cut to three: S06.1 After Tue 8 Sep, S06.2 Payment pending and S06.3 Payment failed.
  - S10 is cut to four frames: S10 Razorpay netbanking with HDFC selected, S10.6 demo bank page, S10.3 Confirming and S10.5 Waiting.
  - S04.3 and S09.2 are dropped.
- The superseded web system spec and guide are kept in `specs/round2/superseded/`. The current rules are in `specs/round2/BUILD_GUIDE_R2.md`.

### Payment: no Razorpay screens, 14 Oct 2026
- User decision: Razorpay is not integrated or drawn. Tapping Pay goes straight to S11 Paid (payment successful). The prototype implies that a Razorpay page opened and the transaction happened there.
- A trust line under the Pay button ("Secured by" plus the Razorpay logo) tells people a Razorpay page will open. It is one component, `Ohm / Trust line, Razorpay`. The logo is a marked placeholder until a logo file is approved.
- S10 Pay (9:7787) is removed from the working page. The v1 (5:2977) and v2 (13:18758) archives keep it. The Pay buttons on S06, S13 and S13.1 now link to S11 (Dissolve 300 ms).
- S06 keeps one state, S06.1 After Tue 8 Sep. There are no pending, failed, cancelled or confirming screens.

### Components everywhere, 14 Oct 2026
- User requirement: build everything that repeats as a component and use instances, so a change in one place reflects everywhere. The user noticed drift: "Add bill" on one screen, the old plus on another.
- Audit (14 Oct): hand-built copies repeat across frames:
  - Footer: 9 frames
  - Section label: 7
  - Footnote: 7
  - Card / Details, Card / Business, Card / Starting point: 5 each
  - Hero amount, July change card, early payment card, where-the-money-goes card: 4 each
- Process:
  - A plan agent writes `specs/round2/COMPONENTS.md` (Base A actions and chrome, Base B content and data, per-area components, the fate of existing components).
  - Two builders make the Base components first.
  - Screen builders build their area components, then compose screens only from instances, set through properties.
  - Every text node uses a text style, and every paint is bound to a variable.
  - A final read-only consistency audit scans every frame for hand-built repeats, detached instances and mismatched configs, then a fixer resolves them.
- **Razorpay logo (14 Oct):** downloaded with the user's approval from Wikimedia Commons (`Razorpay_logo.svg`, 8 KB, no scripts). A copy is in `assets/Razorpay_logo.svg`.
  - In Figma it is the local component `Brand / Razorpay logo` (18:30287), 66 x 14, full colour, vector, in Section "Brand assets" on Foundations.
  - The trust line uses it, and the placeholder is dropped.

### One data sheet, no canvas notes, user-first review, 14 Oct 2026
- User: "Ensure that the maths and the data is consistent with each other", "the flow, the UX flow, the UX journey ... just makes sense". Also: remove the annotations (noise) unless they are important. Think like the user, not like Mobbin.
- **`specs/round2/DATA.md` is now the single source for every number.** It is checked in code, and it fixes the inconsistencies found in round 1, keeping every headline figure:
  - **Rounding:** Northgrid rounds totals down to the nearest ₹10. That explains ₹36,42,169 to ₹36,42,160 and ₹36,09,197 to ₹36,09,190.
  - **Sales tax:** 30 paise × 3,26,500 = ₹97,950 (was ₹97,754). A ₹196 credit from July (Northgrid revised July's fuel charge) keeps the total at ₹36,42,169.
  - **The saving shown to users:** ₹32,970 (₹36,42,160 − ₹36,09,190), so the subtraction a finance manager does works. Only the S07 discount check mentions ₹32,971, with the rounding sentence.
  - **July:** paid ₹35,55,860 (₹35,88,340 − ₹32,480 saved). ₹35,53,720 is retired.
  - **The 900 kVA bill is its own world (S13 family, S07b, S08b):**
    - Booked capacity is charged on the higher of the 664 kVA peak and 75% of contract demand, so 675 kVA is charged instead of 664: +₹4,620, +₹4,966.50 with duty.
    - Total ₹36,47,130, Pay ₹36,14,110 by Tue 8 Sep (save ₹33,020), late ₹36,92,720.
    - "₹4,970 more on this bill, about ₹59,600 a year". ₹55,440 is retired.
  - Late amount: a 1.25% surcharge (₹45,530 more).
- No annotations on the canvas. Builders remove the old ones around their frames.
- The final workflow phase is a review: a data and maths audit against DATA.md, a UX flow walk-through as the user (every flow, every tap, dead ends, orphans, annotations), a component consistency audit, then fixes.
- Process note: messaging a running workflow agent started a second copy of it (two Base A and two Base B builders briefly wrote at once). Stopping the duplicate also stopped the original Base B. The run was resumed with a Base B finish-and-check pass. Base B's "Share bar" had 404 variants and is being rebuilt as a lean set.
- **Model split (14 Oct, user):** Opus reviews (per-area design review, and the final data, flow and component audits) and writes executable feedback. Sonnet builds and applies the fixes.
- **Page names (14 Oct, user):** the pages are organized and have emojis. The order is Screens, Journey map, Foundations, 📖 Source of truth, 🎤 Deck, then a divider, then the archives (🗄️ v2 · …, 🗄️ v1 · …; "02" dropped from the journey name).
  - Done now: Source of truth, Deck and the six archive pages, plus the new order.
  - Done after the build: "Screens" becomes "📱 Screens", "02 Journey map" becomes "🗺️ Journey map", and "Foundations" becomes "🧩 Foundations". The running builders look these pages up by exact name. Then update the guides and the Source of truth frame to match.
- **Source of truth becomes a design manual (14 Oct, user):** "full of jargon ... I would also like it to be a bit more human readable ... like a design manual ... anyone can read it."
  - The lead wrote the words in plain language (`specs/round2/MANUAL.md`): cover, 11 chapters (problem, users, what Ohm does, principles, journey, screens, example bill, look and feel, decisions, file map, open questions), plus a quieter appendix for builders and agents that points to the project files.
  - In Figma it is the frame "Ohm design manual", built from manual components. Sonnet builds it and Opus reviews it as a first-time, non-technical reader.
  - The old agent reference is kept beside it, renamed "Source of truth v1 · 13 Oct (agent reference, superseded)" and locked.
  - Screen thumbnails are added after the screen build.
- **Speed (14 Oct, user: "it's taking forever"):** Foundations and the final review now run in parallel, as a fresh workflow (`specs/round2/workflows/round2-finish.js`).
  - An attempted resume re-ran finished Opus reviews, because resume caching is order-based and parallel stages finish in a different order each time. It was stopped before anything changed.
  - About 5 hours were lost overnight (02:09 to 07:13), when all agents stalled; most likely the machine slept.
- **Error toasts:** the bridge plugin (`~/Projects/figma-desktop-bridge-plugin/code.js`, backup `code.js.bak-2026-10-14`) now logs failed agent scripts with console.warn instead of console.error, so Figma stops showing red toasts. Errors still return to the agents. This takes effect when the plugin is reloaded, after the build.

## Round 3: the user's last design feedback (14 Oct 2026)
The user reviewed every screen and asked for one last round before development. Full change list: specs/round3/FEEDBACK_R3.md. Archive of the state before it: pages "🗄️ v3 · ... · 14 Oct".
- **No Liquid Glass anywhere, including sheets and the tab bar.** New `Ohm / Sheet` (plain web bottom sheet with a slot), `Bottom nav` rebuilt as a plain web tab bar. Supersedes "leave iOS sheets and bottom bars alone".
- **One bill card** for Home and Bill summary. Home leads with the bill total ₹36,42,160 and pitches the saving; the Bill summary strikes the total through and shows ₹36,09,190 "You save ₹32,970" (after-delay Smart Animate inside the component).
- **Two dates, two jobs:** "Due Wed 16 Sep" is the deadline (ink, calendar icon); "Pay by Tue 8 Sep and save ₹32,970" is an offer (green tile, piggy-bank).
- **Pay buttons carry no date:** "Pay ₹36,09,190", "Pay ₹36,42,160".
- **"Pay early, save ₹32,970"** replaces "What you pay depends on the day": three dated rows with real amounts (₹36,09,190 / ₹36,42,160 / ₹36,87,690 with ₹45,530 late charge). "Bill amount" as a placeholder is banned.
- **"Electricity used"** card on S06 replaces "Compared with July". "See all 7 parts" becomes "See the full breakdown".
- **Reading and Checks are one feature:** `Ohm / Check line` used in S04.1 step 4 and in every S07 card, same words.
- **Charts:** 3-letter months, one year per chart (2026 | 2025 tabs; "All time" removed). The months-meter "2 of 13" is gone; the rupee view is a plain two-bar chart.
- **Rows:** label left, value right, one line, everywhere.
- **Parked** (kept in design, out of the prototype and the first build): S13 family, S07b, S08b, S11b, S11b.1, S05.5 to S05.7.
- **Canvas organised by flow** (one Section per flow, arrows with tap labels, states under their screen): 1 First bill, 2 Monthly bill (main), 3 Home, past bills and trends, Parked.
- S05 keeps "Your connection"; the S03 coming-soon tile becomes "Link your Northgrid account" to avoid confusion.

## Development: a static prototype (14 Oct 2026)
The user: build "a beautiful looking amazing prototype that they can play around with", not a product. No backend, no database, no real upload, scanning or payment; every action is simulated and can be backed out of. Motion is a requirement: animated illustrations (the scanning bill), loaders, smooth transitions. Stack was left to the lead: Vite, React 19, TypeScript, Tailwind 4, shadcn (sitsiilia kit), Motion, inline SVG illustrations exported from Figma. Hosting: Cloudflare Pages (GitHub Pages possible with the hash router). Plan: specs/dev/BUILD_PLAN.md.
- Hosting update (14 Oct): recommended GitHub Pages on the user's GitHub account mindninjaX instead of Cloudflare, because the Cloudflare account logged in on this Mac is a work account and the user is worried about deploying to the wrong account. Nothing is published until the user confirms the account and repo in chat.
- Mobile view everywhere (14 Oct): no desktop layout. On a laptop the prototype shows inside a phone frame (393 x 852, scaled to fit), with a QR code to open it on a phone; on a phone it fills the screen. See specs/dev/BUILD_PLAN.md "Shape".
- Pixel perfect and in sync (14 Oct): the prototype must match Figma pixel for pixel (Figma PNG exports + Playwright pixelmatch diff per screen + a /compare overlay page). After launch, every change is made in Figma and in the app together and verified on both (COMPONENT_MAP.md links them). See specs/dev/BUILD_PLAN.md.
- Seamless top bar (14 Oct, user: headers looked "segmented"): the status bar takes the header's white fill on every screen with an Ohm / Header (38 status bar instances in Figma, including sheet backdrops and parked frames). The app does the same: the drawn status bar on desktop and theme-color on phones follow the top of the screen.
- No tinted highlight behind text (14 Oct, user: "odd blue background ... doesn't look good"). Removed the "Focus" band behind the result row in `Check visual / Receipt` (both variants), and made the blue number chips neutral like their neighbours (`Meter equation` "2,000" chip, `Check visual / Meter chain` "3,26,500" chip). Coloured tints stay only on real containers (the green saving tile, badges, alerts). The app follows the same rule.
- Add bill tiles look tappable again (14 Oct, user: "these don't look clickable"): on the new white web sheet the white tile cards had vanished. `Add bill tile` variants now have a 1 px `line` border (Active: 1.5 px `primary`), radius 16, so each option reads as one card with its art and label inside. App: same bordered card, plus a press state.
- Header breathing room (14 Oct, user: "headers can use a bit of bottom padding"): `Ohm / Header` now hugs its content, Top level padding 8/12 (about 68 px), Back 6/10 (about 60 px); every screen's content shifted down to match. Same in the app.
- Section background #444444 (14 Oct, user): every Section in the file is dark grey #444444 (the user had set the Screens sections by hand and an audit fix reverted them to white). Text placed directly on a section is light. Rule for all agents: never override the user's manual Figma edits.
- Pixel-perfect pipeline (14 Oct, tooling): `app/tests/figma/*.png` are exact 2x exports of the 34 built frames (re-run with `app/scripts/export-figma.md`); `npm run diff` renders each route in capture mode (`?capture=1`) and compares it with pixelmatch; `/ohm/compare/<id>` overlays them (dev only). Figma frame, node id, route and React component are mapped in `specs/dev/COMPONENT_MAP.md`; the frame list is `app/tests/visual/screens.ts`. Added routes `/connection/on-your-bill` (S05.2) and `/pay` (Razorpay step). Capture mode skips animations; screens show their resting Figma frame for long simulations via `useCapture()`.
- Font matches Figma (14 Oct, found by the diff): the app now ships Inter 3.19 (variable) with default font features instead of Inter 4.x with `cv11` and `ss01`. Measured on S06 text against the Figma export: 8,456 differing pixels over 28 strings before, 1,382 after, and nearly all strings within 0 to 7 pixels. Figma renders its "Inter" as 3.19 with no stylistic features. Changed in the app only: `src/styles/fonts.css`, `src/assets/fonts/`, `src/styles/globals.css` (body feature settings removed), the three entry files. Figma unchanged. The drawn status bar uses Figma's own vector paths, and the home indicator is 144 x 5 as in the Figma component.
- Home and Trends built (14 Oct, HOME builder): S01, S01.4, S01.1, S01.2, S01.3 and S12 to S12.6 in `app/src/screens/home/`, each within 0.2 % of its Figma export (S01.3 only below the scrim, see below). Figma frame to React: Bill card / Home `components/BillCardHome.tsx`, Usage card / Home `UsageCardHome.tsx`, Ohm / Bar chart + Chart bar `BarChart.tsx`, Metric switch `MetricSwitch.tsx`, Range tabs `RangeTabs.tsx`, Readout `Readout.tsx`, Highs and lows `HighsAndLows.tsx`, Month table `MonthTable.tsx`, Compare section `CompareSection.tsx`, Months building up card `BuildingUpCard.tsx`, Paid bill hero, Empty note, List row July 2026 / August 2026 (Badge below) `BillRows.tsx`. Derived figures (changes on the month before, highs and lows) are computed in `trends-data.ts` from `UNITS_BY_MONTH`.
  - The month table's change column keeps Figma's plain hyphen for minus ("-3.6%"), not the true minus U+2212 that `formatPct` uses, so the glyph matches the frame. Figma and app agree; change both if the user wants the true minus.
  - Three icons are drawn from the Figma "(local)" icon exports (piggy-bank, receipt-indian-rupee, indian-rupee), because the current Lucide shapes differ.
  - S01.3: the Figma frame has its "S01 Home (behind)" layer hidden, so below the sheet's top edge (y 333) it matches (0.17 % differing), and above it Figma shows a bare scrim while the app shows Home behind the scrim, which is the intended behaviour.
  - Responsive at 360 px: the Trends plot, the compact chart and the "Where these numbers come from" button flex; the label gets 14 px under 380 px wide; Home's "Add bill" drops its plus icon there so the title fits.
- Base pass after the five screen builds (14 Oct, BASE keeper): applied the builders' shared-code requests and removed their local wrappers; every frame is equal or better in `npm run diff`, none worse. Figma and app agree on each point below.
  - `globals.css`: shadcn's `stroke-width: 2` rule now applies to `svg.lucide` only (it had thickened every illustration outline and overridden the stroke widths set on `Spinner` and `CheckLine`, which now draw their intended 2.5 and 2.4 in 24 units). `rounded-xl` is 12 and `rounded-2xl` is 16 (Figma's tw/border-radius scale), where the shadcn rem scale gave 14 and 18: Card, Alert, Toast, list-row card 16, Tile 12 with no override.
  - `Amount`: the box is as tall as the digits' line (40 at L, not 41); the rupee sign is placed 12, 9, 4 and 3 px down (what baseline alignment gives, and what Figma's 2x export shows; Figma's boxes say 8 at L, but the raster says 9, checked on S01, S06.1, S08 and S11). The count-up grows rightwards from the rupee sign instead of running under it, and works without an IntersectionObserver. New props `countDelay` and `replay` (the Paid screen counts on every open, 0.45 s after the check).
  - `Alert`: the link keeps its full 40 px (no negative vertical margin), `linkLoading`, `role`. The Trends error is a plain `Alert`.
  - `Toast`: 8 px under the status bar (Figma y 70), not 12. `SheetPanel`: no shadow (the Figma sheet has no effects). `ScreenScaffold`: `flex: 1 0 auto`, so a screen taller than the phone keeps its sticky header and footer. `ListRow`: value in proportional figures. `BillToChart`: last row's month bar is solid (the S01.3 instance overrides the 40 % of the main component).
  - Shell: `useChromeTone({ showTime: false })` for the lock screen (S02's Figma status bar has no time); `markCaptureReady` runs once under StrictMode, so `?do=` actions no longer run twice in dev.
  - Illustrations: Figma dashes each straight line and each corner arc on its own (whole number of gaps, equal end dashes), unlike one SVG `stroke-dasharray` run. `figmaDashOffset` and `DashedRoundRect` in `illustrations/svg.tsx` reproduce it (starting-point connector and dashed boxes, the bill's tear line); verified against Figma's PNG. `SecondLook` moved to `src/illustrations`.
  - Not changed: S07's quarter-pixel nudge of the compact bill stays in the screen (it comes from the 60.5 px centring, not from the art). `NumberedStep` stays in the Add area (Connection does not use it). `screenFor()` is empty under vitest (App.test only sees the placeholders): left as it is, the App tests rely on that.
- Figma synced with the app (14 Oct): Skip on S04, Simulate the email arriving on S03.1, new S06.2 paid state.
