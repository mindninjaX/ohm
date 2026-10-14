# SPEC: Ohm, a phone app for checking and paying a business electricity bill

Save this file as `SPEC.md` in the working folder, then wait for the next prompt.

## What it is

A mobile web app for the finance manager of a mid-size business. A large monthly electricity bill
arrives as a dense PDF. The app reads it, checks it, explains the change from last month in rupees,
and lets her pay it before an early-payment discount expires. Design work only, in Figma. No code.

## Working rules

- Work autonomously. Log any choice the spec does not settle in `DECISIONS.md` in this folder.
- **Figma:** work only in the file named **Bill App**. Find its fileKey once with
  `figma_list_open_files`, write it at the top of `DECISIONS.md`, and pass it as `fileKey` on every
  `figma_execute` call. The bridge's active file can change on reconnect; never rely on it.
- The file has the **shadcn/ui kit by sitsiilia** enabled as a library. Build from library instances
  only (import by key). The `figma-shadcn-by-sitsiilia` skill describes the kit's conventions.
- Never edit the library file itself. Never touch any Figma file other than Bill App.
- **Copy:** use the text in this spec exactly. Never invent a number. No em dashes or en dashes.
  Indian number format (₹36,42,160). 12-hour clock.
- **Frames:** 393 x 852, light mode, page `Screens`, inside a Section `Screens`, left to right in the
  order below, 80 px apart. Names as given (`S06 Bill summary`).
- **Verify:** one screenshot per finished screen (`figma_take_screenshot`, nodeId, scale 1). Compare
  against the spec. At most 2 fix rounds, then note what is still off in `DECISIONS.md`.
- **Report** at the end of each prompt in 2 lines, then stop and wait.

## Palette (local variable collection `brand`, one mode `light`)

primary #265CFF · primary-subtle #E9EFFF · ink #172B4D · ink-strong #091E42 · ink-muted #44546F ·
line #DCDFE4 · surface-muted #F1F2F4 · success #216E4E on #DCFFF1 · warning #A54800 on #FFF7D6 ·
danger #AE2E24 on #FFECEB. Font: Inter.

**Rebrand pass** after each screen: for every fill or stroke bound to a library variable, swap by
name: `primary` and `ring` to `brand/primary`; `foreground` and `card-foreground` to `brand/ink`;
`muted-foreground` to `brand/ink-muted`; `border` and `input` to `brand/line`; `muted` and
`secondary` to `brand/surface-muted`. Leave the rest bound to the library. No raw hex outside the
`brand` collection.

## Demo content

Neha, finance manager (placeholder, initials NK) at **Harbourline Hotels, Riverside**. Power company:
**Northgrid Electric** ("Northgrid" when short). Category **HT Commercial**. App name **Ohm**.
Today in the demo is **Tue 3 Sep 2024**. The August bill was issued 1 Sep. Discount ends 8 Sep.
Due 16 Sep.

## Screens

**S01 Home.** Bottom nav (Bills active). Header "Harbourline Hotels, Riverside", muted
"Northgrid Electric · A/c 4410 28••••", Avatar "NK". Icon Button `plus` top right.
Card: "August bill" · "₹36,42,160" (large) · Badge success "All 6 checks passed" · "Pay by 8 Sep to
save ₹32,971" + Badge warning "5 days left" · Button primary "View bill".
Card "Usage, last 12 months": small 13-bar chart (S12 data), caption "3,26,500 units in August, 1.8% more than July".
"Past bills": Item "July 2024" · "Paid ₹35,53,720 on 5 Aug" · Badge "Saved ₹32,480".
Taps: View bill > S06 · plus > S03 · Trends tab > S12.

**S02 Notification.** Lock screen look: "9:41", "Tuesday, 3 September". One notification: "Ohm · now" /
**"August bill is here: ₹36,42,160"** / "All 6 checks passed. Pay by 8 Sep to save ₹32,971."
Taps: notification > S06.

**S03 Add a bill.** S01 dimmed behind a bottom Sheet, title "Add a bill". Items with Lucide icons:
`file-text` "Upload the PDF" · "From your email or files" / `camera` "Take a photo" · "For a paper bill" /
`mail` "Forward the email" · "Send it to bills+harbourline@ohm.app" / `plug` "Connect your Northgrid
account" + Badge "Coming soon" (disabled look). Taps: Upload the PDF > S04.

**S04 Reading.** Top bar "Reading your bill". Spinner, then checklist: check "Found Northgrid Electric,
August 2024" / check "Read every line of the bill" / spinner "Redoing the maths". Muted: "Takes about
10 seconds. You can close this, we will notify you." Taps: after delay 1500 ms > S05.

**S05 Confirm connection** (first bill only). Top bar "Is this right?". "We read these from your bill.
Every future bill is checked against them." Rows, label left, value right, Separators:
Business type "Hotel" (Native Select) / Power company "Northgrid Electric" / Category "HT Commercial" +
Badge success "Fits a hotel" / Contract demand "700 kVA" + muted "the power you booked" / Meter
multiplier "2,000" / Connected since "3 Mar 2021". Button primary "Looks right", ghost "Something is
wrong". Taps: Looks right > S06.

**S06 Bill summary (the most important screen; most polish).** Top bar: back, "August 2024", right
"Northgrid · HT". Must answer in 3 seconds: is it right, how much, by when.
1. "₹36,42,160" (largest type in the app) · "due 16 Sep".
2. Alert success, tappable: `circle-check` **"All 6 checks passed"** · "Charges, settings and category match" · chevron.
3. **"Up 1.5% from July"** · "because you used 1.8% more electricity. July was ₹35,88,340."
4. Card (primary-subtle): "Pay ₹36,09,190 by 8 Sep" · "Save ₹32,971" · Progress 2 of 7 days · "5 days left".
   Muted: "After 16 Sep: ₹36,87,690, which is ₹45,527 more."
5. Card "Where the money goes": 3 rows with thin bars: "Electricity used 62%", "Fuel adjustment 11%",
   "Wires 10%" · link "See all 7 parts".
6. Sticky bottom: Button primary full width "Pay ₹36,09,190" · Button outline "Share with owner".
Taps: alert > S07 · See all > S08 · Pay > S10 · Share > S09 · back > S01.

**S07 Checks.** Top bar "6 checks". Items, `circle-check` success, title + muted line:
"Charges add up" · "Every line equals your meter reading times the approved rate." /
"Contract demand unchanged" · "700 kVA, same as your first bill." /
"Category fits your business" · "HT Commercial is right for a hotel." /
"Meter multiplier unchanged" · "2,000, same as your first bill." /
"No penalties" · "Peak demand 664 of 700 kVA. Power factor 0.998." /
"Discount worked out right" · "1% of ₹32,97,130 before taxes is ₹32,971."
Muted card: "How we check: we redo the maths with the rates the state regulator approved, and compare
your fixed settings with your first bill." Taps: back > S06.

**S08 Breakdown.** Top bar "Where the money goes". Accordion rows (name, plain meaning, amount, share;
open shows the maths):
Electricity used · the power itself · ₹22,52,850 (62%) · 3,26,500 units x ₹6.90 /
Fuel adjustment · fuel costs passed on, changes monthly · ₹3,91,800 (11%) · 3,26,500 x ₹1.20 /
Wires · fee for the power company's network · ₹3,59,150 (10%) · 3,26,500 x ₹1.10 /
Taxes · state duty and sales tax · ₹3,45,039 (9%) · duty 7.5% ₹2,47,285, tax 30 paise per kWh ₹97,754 /
Booked capacity · rent for your peak power · ₹2,78,880 (8%) · 664 kVA x ₹420 /
Time of day · evenings cost more, nights less · ₹14,450 (0.4%) · mornings +₹22,800, evenings +₹60,200, nights minus ₹68,550 /
Last month's balance · carried over and cleared · ₹0 · balance ₹2,140, adjusted ₹2,140.
Total row: "₹36,42,169, rounded to ₹36,42,160". Taps: back > S06.

**S09 Share.** S06 dimmed behind a Sheet "Share with the owner". Preview card styled as an image:
"August electricity bill" · "₹36,42,160" · "All 6 checks passed" · "Up 1.5% from July because usage
rose 1.8%" · "Paying ₹36,09,190 by 8 Sep saves ₹32,971" · small "Checked by Ohm". Three round
targets: WhatsApp, Email, Copy link (`message-circle`, `mail`, `link`). Taps: any > S06.

**S10 Pay.** Top bar "Pay August bill". Radio Group: (selected) "Pay by 8 Sep" · "₹36,09,190" · Badge
success "Saves ₹32,971" / "Full amount" · "₹36,42,160". Card "How": "Net banking (RTGS or NEFT)" ·
muted "Your bank may ask a second person to approve. That is normal for large payments." Muted:
"UPI is not offered: UPI limits are far below this bill." Button primary "Pay ₹36,09,190" · small
"Secured by Razorpay". Taps: Pay > S11.

**S11 Paid.** Large `circle-check` success. **"Paid ₹36,09,190"** · "3 Sep 2024, 11:42 AM" · Badge
success "You saved ₹32,971". Card: Bill "August 2024" · Method "Net banking, HDFC Bank" · Reference
"UTR HDFCR52024090312345" · Status Badge "Paid, waiting for Northgrid to confirm". Buttons primary
"Share receipt", ghost "Done". Taps: Done > S01 · Share receipt > S09.

**S12 Trends.** Bottom nav (Trends active). Top bar "Trends". Tabs "Units" (active) / "Rupees". Bar
chart, units by month: Aug 23 3,20,140 · Sep 3,10,110 · Oct 3,19,220 · Nov 2,91,460 · Dec 2,99,620 ·
Jan 24 2,90,430 · Feb 2,61,320 · Mar 2,90,910 · Apr 3,15,630 · May 3,42,210 · Jun 3,32,800 ·
Jul 3,20,800 · Aug 3,26,500 (highlight). Stats: "Aug vs Jul +1.8%" · "Aug vs last Aug +2.0%" ·
"Peak: May, 3,42,210". Note card: "Rupee history starts from July 2024 and fills in as each bill
arrives." Taps: Bills tab > S01.

**S13 Check failed.** Same as S06, except item 2 is an Alert warning: `triangle-alert` **"1 thing to
look at"** · "5 of 6 checks passed". Card below it (warning-subtle): **"Contract demand changed"** ·
"This bill says 900 kVA. Your first bill said 700 kVA, and you have not asked for a change." · "Cost:
₹4,620 more this month. ₹55,440 a year if it repeats." · Button outline "Copy details for Northgrid".
Muted: "You can still pay now and keep the ₹32,971 discount. Raise this with Northgrid separately."
Taps: same as S06.

## Flows
Monthly: S02 > S06 > S07 > S06 > S08 > S06 > S09 > S06 > S10 > S11 > S01.
First bill: S01 > S03 > S04 > S05 > S06. Something is off: S13 on its own.
