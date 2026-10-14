# COMPONENT MAP: Figma and React, one table each (14 Oct 2026)

How feedback is applied to both sides (BUILD_PLAN, "Keeping Figma and the app in sync"): find the thing in the table, change it in Figma first (main component where possible), then in the React file named here, then verify on both sides: a Figma screenshot, a browser screenshot, `npm run diff <frame>` after re-exporting the Figma PNG (`app/scripts/export-figma.md`), and `/compare/<frame>` by eye. Log the change in DECISIONS.md naming both sides.

Sources: Figma node ids from `specs/round2/COMPONENTS.md` (section 6, "Built") and `specs/dev/SCREENS.md`; React files from `app/src`. Figma file `mwmHwXDuayUYeliDAlv3Fo`. A node id opens in Figma with `?node-id=<id with : as ->`.

Status: **built** = the file exists; **to build** = the screen builder for that area creates it. Area components go in `app/src/screens/<area>/components/<Name>.tsx`; a component a second area needs moves to `app/src/components/ohm/` (the same rule as Figma: never copy). Update this table when a row changes.

## 1. Figma components to React components

### Base (actions, chrome, content, data)

| Figma component | Node id | React component | File | Status |
|---|---|---|---|---|
| Ohm / Separator | 19:8442 | `Separator` | `src/components/ohm/Separator.tsx` | built |
| Ohm / Card | 19:8514 | `Card` | `src/components/ohm/Card.tsx` | built |
| Ohm / Tile | 19:8586 | `Tile` | `src/components/ohm/Tile.tsx` | built |
| Ohm / Nav row | 19:8587 | `NavRow` | `src/components/ohm/NavRow.tsx` | built |
| Ohm / Toast | 19:8850 | Toast, toast, OhmToaster | `src/components/ohm/Toast.tsx` | built |
| Icon tile | 11:13337 | `IconTile` | `src/components/ohm/IconTile.tsx` | built |
| Ohm / Button | 19:8107 | `Button` | `src/components/ohm/Button.tsx` | built |
| Ohm / Icon button | 19:8333 | `IconButton` | `src/components/ohm/IconButton.tsx` | built |
| Ohm / Header | 19:8372 | `Header` | `src/components/ohm/Header.tsx` | built |
| Ohm / Footer | 19:8476 | `Footer` | `src/components/ohm/Footer.tsx` | built |
| Ohm / Trust line, Razorpay | 19:8417 | `TrustLineRazorpay` | `src/components/ohm/TrustLineRazorpay.tsx` | built |
| Ohm / Badge | 19:8631 | `Badge` | `src/components/ohm/Badge.tsx` | built |
| Ohm / Section header | 19:8651 | `SectionHeader` | `src/components/ohm/SectionHeader.tsx` | built |
| Ohm / Alert | 19:8753 | `Alert` | `src/components/ohm/Alert.tsx` | built |
| Ohm / List row | 19:9017 | `ListRow` | `src/components/ohm/ListRow.tsx` | built |
| Bill status mini | 11:10035 | `BillStatusMini` | `src/illustrations/BillStatusMini.tsx (re-exported by src/components/ohm/index.ts)` | built |
| Ohm / Footnote | 19:8892 | `Footnote` | `src/components/ohm/Footnote.tsx` | built |
| Ohm / Source note | 19:8955 | `SourceNote` | `src/components/ohm/SourceNote.tsx` | to build |
| Ohm / kVA bars | 19:9073 | `KVABars` | `src/components/ohm/KVABars.tsx` | to build |
| Ohm / Share bar | 19:10669 | `ShareBar` | `src/components/ohm/ShareBar.tsx` | to build |
| Ohm / Part row | 19:11005 | `PartRow` | `src/components/ohm/PartRow.tsx` | to build |
| Ohm / Progress | 19:11081 | `Progress` | `src/components/ohm/Progress.tsx` | to build |
| Ohm / Amount | 19:8575 | `Amount` | `src/components/ohm/Amount.tsx` | built |
| Ohm / Due line | 19:8692 | `DueLine` | `src/components/ohm/DueLine.tsx` | built |
| Ohm / Reassurance row | 19:8844 | `ReassuranceRow` | `src/components/ohm/ReassuranceRow.tsx` | built |
| Ohm / Chart bar | 19:8887 | Chart bar (a column inside `BarChart`) | `src/screens/home/components/BarChart.tsx` | built |
| Ohm / Bar chart | 19:9860 | `BarChart` | `src/screens/home/components/BarChart.tsx` | built |
| Ohm / Range tabs | 19:10895 | `RangeTabs` | `src/screens/home/components/RangeTabs.tsx` | built |
| Ohm / Metric switch | 19:11010 | `MetricSwitch` | `src/screens/home/components/MetricSwitch.tsx` | built |
| Ohm / Sheet | 30:48764 | Sheet (in-screen), SheetPanel (route sheet panel) | `src/components/ohm/Sheet.tsx, src/components/ohm/SheetPanel.tsx` | built |
| Ohm / Scrim | 30:47788 | `sheet scrim` | `src/shell/sheets.tsx (route sheets), src/components/ohm/Sheet.tsx (in-screen sheets)` | built |
| Ohm / Tab bar | 5:2903 | `TabBar` | `src/components/ohm/TabBar.tsx` | built |

### HOME

| Figma component | Node id | React component | File | Status |
|---|---|---|---|---|
| Bill card / Home | 11:11229 | `BillCardHome` | `src/screens/home/components/BillCardHome.tsx` | built |
| Usage card / Home | 20:18235 | `UsageCardHome` | `src/screens/home/components/UsageCardHome.tsx` | built |
| Paid bill hero | 20:19424 | `PaidBillHero` | `src/screens/home/components/PaidBillHero.tsx` | built |
| Empty note | 20:19446 | `EmptyNote` | `src/screens/home/components/EmptyNote.tsx` | built |
| Bill to chart | 11:10147 | `BillToChart` | `src/illustrations/BillToChart.tsx` | built |

### TRENDS

| Figma component | Node id | React component | File | Status |
|---|---|---|---|---|
| Peak and dip glyph | 20:17831 | `PeakDipGlyph` | `src/illustrations/PeakDipGlyph.tsx` | built |
| Illustration / History | 20:17955 | RupeeHistoryArt, WaitingForMonthsArt | `src/illustrations/HistoryArt.tsx` | built |
| Readout | 20:18221 | `Readout` | `src/screens/home/components/Readout.tsx` | built |
| High-low tile | 20:19217 | `HighLowTile` (inside `HighsAndLows`) | `src/screens/home/components/HighsAndLows.tsx` | built |
| Highs and lows | 20:19420 | `HighsAndLows` | `src/screens/home/components/HighsAndLows.tsx` | built |
| Month row | 20:19498 | Month row (inside `MonthTable`) | `src/screens/home/components/MonthTable.tsx` | built |
| Month table | 20:19862 | `MonthTable` | `src/screens/home/components/MonthTable.tsx` | built |
| Swing strip | 20:20199 | `SwingStrip` | `src/screens/trends/components/SwingStrip.tsx` | to build |
| Comparison block | 20:20789 | Block (inside `CompareSection`) | `src/screens/home/components/CompareSection.tsx` | built |
| Compare section | 20:21018 | `CompareSection` | `src/screens/home/components/CompareSection.tsx` | built |
| Chart card | 20:22316 | Chart card (inside `TrendsScreen`) | `src/screens/home/TrendsScreen.tsx` | built |
| Months building up card | 20:23053 | `UnitsBuildingUpCard`, `RupeesBuildingUpCard` | `src/screens/home/components/BuildingUpCard.tsx` | built |

### READING

| Figma component | Node id | React component | File | Status |
|---|---|---|---|---|
| Illustration / Bill | 20:19218 | `BillIllustration` | `src/illustrations/BillIllustration.tsx` | built |
| Step row | 20:22534 | `StepRow` | `src/screens/reading/components/StepRow.tsx` | to build |
| Step detail | 20:21019 | `StepDetail` | `src/screens/reading/components/StepDetail.tsx` | to build |
| Steps card | 20:23664 | `StepsCard` | `src/screens/reading/components/StepsCard.tsx` | to build |

### CHECKS

| Figma component | Node id | React component | File | Status |
|---|---|---|---|---|
| Check visual / Receipt | 20:17365 | `CheckVisualReceipt` | `src/screens/summary/components/CheckVisualReceipt.tsx` | to build |
| Check visual / Business and plan | 20:17370 | `CheckVisualBusinessAndPlan` | `src/screens/summary/components/CheckVisualBusinessAndPlan.tsx` | to build |
| Check visual / Meter chain | 20:17386 | `CheckVisualMeterChain` | `src/screens/summary/components/CheckVisualMeterChain.tsx` | to build |
| Check visual / Headroom | 20:17399 | `CheckVisualHeadroom` | `src/screens/summary/components/CheckVisualHeadroom.tsx` | to build |
| Evidence tile | 20:18157 | `EvidenceTile` | `src/screens/summary/components/EvidenceTile.tsx` | to build |
| Check card body | 20:18423 | `CheckCardBody` | `src/screens/summary/components/CheckCardBody.tsx` | to build |
| Check card | 20:19333 | `CheckCard` | `src/screens/summary/components/CheckCard.tsx` | to build |
| Checks hero | 20:21446 | `ChecksHero` | `src/screens/summary/components/ChecksHero.tsx` | to build |
| Diverging bar | 20:19508 | `DivergingBar` | `src/screens/summary/components/DivergingBar.tsx` | to build |
| Split line | 20:19528 | `SplitLine` | `src/screens/summary/components/SplitLine.tsx` | to build |
| Part row / Split | 20:19945 | `PartRowSplit` | `src/screens/summary/components/PartRowSplit.tsx` | to build |
| Info popover | 20:20148 | `InfoPopover` | `src/screens/summary/components/InfoPopover.tsx` | to build |
| Note row | 20:20174 | `NoteRow` | `src/screens/summary/components/NoteRow.tsx` | to build |
| Breakdown | 20:20671 | `Breakdown` | `src/screens/summary/components/Breakdown.tsx` | to build |
| Capacity bar | 11:10179 | `CapacityBar` | `src/screens/summary/components/CapacityBar.tsx` | to build |
| Steps card Open=All | 20:23524 | `StepsCardOpenAll` | `src/screens/summary/components/StepsCardOpenAll.tsx` | to build |

### SUMMARY

| Figma component | Node id | React component | File | Status |
|---|---|---|---|---|
| Ohm / Ladder row | 20:20294 | `LadderRow` | `src/screens/summary/components/LadderRow.tsx` | to build |
| Ohm / Price ladder | 20:22391 | `PriceLadder` | `src/screens/summary/components/PriceLadder.tsx` | to build |
| Ohm / Units bar | 20:24337 | `UnitsBar` | `src/screens/summary/components/UnitsBar.tsx` | to build |
| Ohm / July change card | 20:24347 | `JulyChangeCard` | `src/screens/summary/components/JulyChangeCard.tsx` | to build |
| Ohm / Bill hero | 20:27080 | `BillHero` | `src/screens/summary/components/BillHero.tsx` | to build |
| Ohm / Problem card | 20:29027 | `ProblemCard` | `src/screens/summary/components/ProblemCard.tsx` | to build |

### SHARE

| Figma component | Node id | React component | File | Status |
|---|---|---|---|---|
| Share card | 28:37776 | `ShareCard` | `src/screens/pay/components/ShareCard.tsx` | to build |
| Share / Status band | 28:36912 | `ShareStatusBand` | `src/screens/pay/components/ShareStatusBand.tsx` | to build |
| Share / Ohm stamp | 28:37427 | `ShareOhmStamp` | `src/screens/pay/components/ShareOhmStamp.tsx` | to build |
| Share / Receipt row | 28:37213 | `ShareReceiptRow` | `src/screens/pay/components/ShareReceiptRow.tsx` | to build |
| Share / Receipt panel | 28:37521 | `ShareReceiptPanel` | `src/screens/pay/components/ShareReceiptPanel.tsx` | to build |
| Share / Card heading | 28:37428 | `ShareCardHeading` | `src/screens/pay/components/ShareCardHeading.tsx` | to build |
| Share / Paid amount | 28:37431 | `SharePaidAmount` | `src/screens/pay/components/SharePaidAmount.tsx` | to build |
| Share / Offer strip | 28:37445 | `ShareOfferStrip` | `src/screens/pay/components/ShareOfferStrip.tsx` | to build |
| Share / Change row | 28:37436 | `ShareChangeRow` | `src/screens/pay/components/ShareChangeRow.tsx` | to build |
| Share / Issue panel | 28:37459 | `ShareIssuePanel` | `src/screens/pay/components/ShareIssuePanel.tsx` | to build |
| Share target | 28:37811 | `ShareTarget` | `src/screens/pay/components/ShareTarget.tsx` | to build |
| Share target row | 28:37874 | `ShareTargetRow` | `src/screens/pay/components/ShareTargetRow.tsx` | to build |
| Share sheet body | 28:37890 | `ShareSheetBody` | `src/screens/pay/components/ShareSheetBody.tsx` | to build |
| Share / Paid result | 28:45533 | `SharePaidResult` | `src/screens/pay/components/SharePaidResult.tsx` | to build |
| Share / Paid receipt card | 28:45617 | `SharePaidReceiptCard` | `src/screens/pay/components/SharePaidReceiptCard.tsx` | to build |

### CONNECTION

| Figma component | Node id | React component | File | Status |
|---|---|---|---|---|
| Ohm / Starting point card | 28:36850 | `StartingPoint art` | `src/illustrations/StartingPoint.tsx (the card is area work)` | built |
| Ohm / Details card | 28:37214 | `DetailsCard` | `src/screens/connection/components/DetailsCard.tsx` | to build |
| Ohm / Business card | 28:37522 | `BusinessCard` | `src/screens/connection/components/BusinessCard.tsx` | to build |
| Ohm / Field | 28:38250 | `Field` | `src/screens/connection/components/Field.tsx` | to build |
| Ohm / Attach row | 28:38820 | `AttachRow` | `src/screens/connection/components/AttachRow.tsx` | to build |
| Ohm / Evidence card | 28:39056 | `EvidenceCard` | `src/screens/connection/components/EvidenceCard.tsx` | to build |
| Ohm / Meaning card | 28:39103 | `MeaningCard` | `src/screens/connection/components/MeaningCard.tsx` | to build |
| Ohm / Options card | 28:39376 | `OptionsCard` | `src/screens/connection/components/OptionsCard.tsx` | to build |
| Ohm / Numbered step | 28:40118 | `NumberedStep` | `src/screens/connection/components/NumberedStep.tsx` | to build |
| Ohm / Forward guide | 28:40198 | ForwardGuideHero (hero art); the guide itself is area work | `src/illustrations/ForwardGuideHero.tsx` | built |
| Ohm / Connection summary | 28:43853 | `ConnectionSummary` | `src/screens/connection/components/ConnectionSummary.tsx` | to build |
| Meter equation | 11:10197 | `MeterEquation` | `src/screens/connection/components/MeterEquation.tsx` | to build |

### Chrome, art and existing components (COMPONENTS.md section 5, illustrations README)

| Figma component | Node id | React component | File | Status |
|---|---|---|---|---|
| Status bar | 5:2866 | StatusBar (drawn from Figma's own vector paths) | `src/shell/StatusBar.tsx` | built |
| iOS / Home indicator | in every frame (144 x 5, 8 px above the bottom edge) | HomeIndicator | `src/shell/HomeIndicator.tsx` | built |
| Ohm / App icon (large, small) | 11:9853, 11:12734 | AppIconLarge, AppIconSmall | `src/illustrations/AppIcon.tsx` | built |
| Art/Upload, Art/Photo, Art/Forward, Art/Connect | 11:9897, 11:9925, 11:10195, 11:10196 | ArtUpload, ArtPhoto, ArtForward, ArtConnect | `src/illustrations/AddBillArt.tsx` | built |
| Add bill tile (7 variants) | 11:10537 | AddBillTile (the S03 option card) | `src/screens/add/components/AddBillTile.tsx` | to build |
| Copy address button | 11:11484 | CopyAddressButton (a Button with copy and copied states) | `src/screens/add/components/CopyAddressButton.tsx` | to build |
| Bill history chip | 11:10067 | BillHistoryChip | `src/illustrations/BillHistoryChip.tsx` | built |
| Paid bill page | 11:10082 | PaidBillPage | `src/illustrations/PaidBillPage.tsx` | built |
| Earlier bills stack | 11:10094 | EarlierBillsStack | `src/illustrations/EarlierBillsStack.tsx` | built |
| Illustration / Bill Hero Done (S11 paid result) | 20:18627 | PaidCheck | `src/illustrations/PaidCheck.tsx` | built |
| Brand / Razorpay logo | 18:30287 | RazorpayLogo, RazorpayLoader (the "Opening Razorpay" loader) | `src/illustrations/RazorpayLogo.tsx, src/illustrations/RazorpayLoader.tsx` | built |
| Chip + progress (upload) and camera view (simulations, no Figma component) | none | UploadSimulation, CameraSimulation | `src/illustrations/UploadSimulation.tsx, src/illustrations/CameraSimulation.tsx` | built |
| Ohm / Check line (round 2 name; not in the Built table) | see Figma | CheckLine | `src/components/ohm/CheckLine.tsx` | built |
| Spinner (library) and loading skeletons | library | Spinner, Skeleton | `src/components/ohm/Spinner.tsx, src/components/ohm/Skeleton.tsx` | built |
| Screen layout (Status bar + Header + content + Footer or Tab bar) | pattern | ScreenScaffold | `src/components/ohm/ScreenScaffold.tsx` | built |
| Capacity bar | 11:10179 | CapacityBar | `src/screens/connection/components/CapacityBar.tsx` | to build |
| Meter equation | 11:10197 | MeterEquation | `src/screens/connection/components/MeterEquation.tsx` | to build |
| Connection row (8 variants) | 11:12086 | ConnectionRow | `src/screens/connection/components/ConnectionRow.tsx` | to build |
| Bill crop, Compare tiles | 11:12483, 11:12919 | BillCrop, CompareTiles | `src/screens/connection/components/` | to build |
| Illustration / Second look | 11:12946 | SecondLook | `src/illustrations/SecondLook.tsx` | built |
| Bill card / Home (see HOME above, id kept) | 11:11229 | BillCardHome | `src/screens/home/components/BillCardHome.tsx` | built |
| Bill card / Home, Layout Summary paid (S06.2; added 14 Oct, 361 x 269: Summary geometry with the Paid due line and the muted "Waiting for Northgrid to confirm" tile) | 34:115747 | BillCardPaid | `src/screens/summary/components/BillCard.tsx` | built |
| Skip on S04 and the S04 backdrop of S04.2 (Ohm / Button Link M instance, label overridden to Text-sm/Medium `ink-muted`, 12 px side padding, 44 tall, top right of the bill art) | 33:115726, 33:115733 | Skip button (inside `ReadingScreen`, shown in capture mode through `IN_FIGMA.skip`) | `src/screens/add/ReadingScreen.tsx` | built |
| Simulate the email arriving on S03.1 (Ohm / Button Link M instance, last child of the sheet's Content slot, 12 under Copy address, centred) | 33:115739 | Link M button in the sheet footer slot (`IN_FIGMA.simulateEmail`) | `src/screens/add/ForwardEmailSheet.tsx` | built |

Shell pieces with no Figma component: capture mode (`src/shell/capture.ts`, `CaptureFrame.tsx`), the phone frame (`src/components/MobileFrame.tsx`), screen transitions (`src/shell/transitions.tsx`), sheet routes (`src/shell/sheets.tsx`), the Prototype menu (`src/shell/PrototypeMenu.tsx`).

## 2. Figma frames to routes

Figma page "Screens" (id 9:7425). `tests/figma/<Id>.png` is the 2x export; `npm run diff <Id>` measures it; `/compare/<Id>` shows it. Source of truth for the table: `app/tests/visual/screens.ts` (this table is generated from it). Parked frames (S13 family, 900 kVA) are not built. The Razorpay step `/pay` has no frame.

| Id | Figma frame | Node id | Route | Query | Demo state | Area | State |
|---|---|---|---|---|---|---|---|
| S01 | S01 Home | 9:7427 | `/` |  |  | HOME |  |
| S01-4 | S01.4 Home, after paying | 30:80509 | `/` |  | `paid:1` | HOME | demo flag paid |
| S01-1 | S01.1 All bills | 11:11635 | `/bills` |  |  | HOME |  |
| S01-2 | S01.2 July bill | 11:12124 | `/bills/july-2026` |  |  | HOME |  |
| S01-3 | S01.3 Where these numbers come from | 11:12484 | `/home/sources` |  |  | HOME | sheet over / |
| S12 | S12 Trends | 9:7850 | `/trends` |  |  | HOME | units, 2026, Aug |
| S12-2 | S12.2 Trends, 2025 | 20:25768 | `/trends` | `?year=2025` |  | HOME |  |
| S12-3 | S12.3 Trends, month selected (May) | 20:26344 | `/trends` | `?month=may` |  | HOME |  |
| S12-4 | S12.4 Trends, Bill amount | 20:27101 | `/trends` | `?metric=rupees` |  | HOME |  |
| S12-5 | S12.5 Trends, Units with fewer than 3 months | 20:27573 | `/trends` | `?state=few` |  | HOME | demo only |
| S12-6 | S12.6 Trends, error | 20:27992 | `/trends` | `?state=error` |  | HOME | demo only |
| S02 | S02 Notification | 9:7470 | `/notification` |  |  | ADD |  |
| S03 | S03 Add a bill | 9:7475 | `/add` |  |  | ADD | sheet over / |
| S03-1 | S03.1 Forward the email | 11:10839 | `/add/email` |  |  | ADD | sheet over / |
| S04 | S04 Reading | 9:7521 | `/reading` |  |  | ADD | reading in progress |
| S04-1 | S04.1 Reading details | 20:28427 | `/reading` | `?open=all` |  | ADD | reading done, every step open |
| S04-2 | S04.2 Stop reading | 20:29031 | `/reading/stop` |  |  | ADD | sheet over /reading |
| S05 | S05 Your connection | 9:7555 | `/connection` |  |  | CONNECTION | rows closed |
| S05-0 | S05.0 Your connection, all rows open | 30:47962 | `/connection` | `?open=all` |  | CONNECTION |  |
| S05-1 | S05.1 What looks off | 11:13504 | `/connection/wrong` |  |  | CONNECTION | sheet over /connection |
| S05-2 | S05.2 On your bill | 11:14760 | `/connection/on-your-bill` |  |  | CONNECTION |  |
| S05-3 | S05.3 Fix contract demand | 11:15450 | `/connection/fix` |  |  | CONNECTION |  |
| S05-4 | S05.4 Ask the Ohm team | 11:15577 | `/connection/ask` |  |  | CONNECTION |  |
| S05-8 | S05.8 Your connection, set by you | 11:16230 | `/connection` | `?changed=set` |  | CONNECTION |  |
| S05-9 | S05.9 Your connection, sent | 11:15883 | `/connection` | `?changed=sent` |  | CONNECTION |  |
| S06 | S06 Bill summary | 9:7592 | `/bill` |  |  | SUMMARY | date Thu 3 Sep; resting state Summary discounted |
| S06-1 | S06.1 After Tue 8 Sep | 20:31078 | `/bill` |  | `date:after` | SUMMARY | demo date after |
| S06-2 | S06.2 Bill summary, paid | 34:115778 | `/bill` |  | `paid:1` | SUMMARY | demo flag paid |
| S07 | S07 Checks | 9:7654 | `/bill/checks` |  |  | SUMMARY |  |
| S08 | S08 Breakdown | 9:7679 | `/bill/breakdown` |  |  | SUMMARY |  |
| S08c | S08c Breakdown, what a part means | 20:30011 | `/bill/breakdown` | `?info=fuel` |  | SUMMARY | info popover open |
| S09 | S09 Share | 9:7722 | `/bill/share` |  |  | PAY | sheet over /bill |
| S09-1 | S09.1 Link copied | 28:39051 | `/bill/share` |  | `do=click:Copy link` | PAY | toast "Link copied" |
| S11 | S11 Paid | 9:7820 | `/paid` |  |  | PAY |  |
| S11-1 | S11.1 Share receipt | 28:40406 | `/paid/share` |  |  | PAY | sheet over /paid |
| none | Razorpay step | none | `/pay` | | | PAY | "Opening Razorpay" loader about 1.5 s, then replaces itself with `/paid` |

Capture mode (`?capture=1`, used by diff and compare): 393 wide, drawn status bar and home indicator, page height = content, animations at their end state, demo state from `?demo=` (`date:after`, `paid:1`, `billAdded:0`, `connection:0`, `first:1`), `?do=click:Copy link` to tap something after load. Route params are the route's own (`?open=all`, `?info=fuel`, `?metric=rupees`, `?year=2025`, `?month=may`, `?state=few|error`, `?changed=set|sent`). Details in the header of `app/src/shell/capture.ts`.
