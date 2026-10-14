# DATA: every number Ohm shows (law for all builders; overrides any spec)

The user (14 Oct): "Ensure that the maths and the data is consistent with each other." Every figure on every screen comes from this sheet. If a spec shows a different number, this sheet wins. Don't invent figures. Every derived figure below shows its maths, checked in code.

## People, place, dates
- Business: **Harbourline Hotels, Riverside** (a hotel). Power company: **Northgrid Electric**. Category: **HT Commercial**. Account number shown masked: **4410 28••••**.
- Contract demand **700 kVA** (the power booked; from the agreement and the first bill). Meter multiplier **2,000**. Connected since **3 Mar 2021**.
- Today in the demo: **Thu 3 Sep 2026**. The August bill was issued **Tue 1 Sep 2026**.
- Early payment discount ends **Tue 8 Sep** (5 days left on Thu 3 Sep; 2 of the 7 days of the window have gone).
- Due date **Wed 16 Sep**. Late from **Thu 17 Sep**.
- The payment on S11 is **Thu 3 Sep 2026, 11:42 AM**. The July bill was paid **Wed 5 Aug 2026**.
- Year is always 2026 (2025 only for Aug to Dec 2025 usage). No 2024 anywhere.

## Rules Northgrid uses (state these in plain words where a screen explains maths)
- **Rounding:** the bill total is **rounded down to the nearest ₹10**. The early-payment amount and the late amount are rounded the same way.
- **Early payment discount:** 1% of the charges before taxes, if paid by Tue 8 Sep.
- **Late payment:** 1.25% surcharge on the bill after Wed 16 Sep.
- **Booked capacity (billing demand):** charged on the higher of (a) the peak demand actually used and (b) 75% of the contract demand, at ₹420 per kVA.
- **Taxes:** electricity duty is 7.5% of the charges before taxes. Sales tax is 30 paise per unit.

## The August bill (the normal world: S01, S02, S06, S06.1, S07, S08, S08c, S09, S11, S11.1, S12)
Units **3,26,500** (July 3,20,800). Peak demand **664 kVA** of 700. Power factor **0.998**.

The 7 parts, in S08 order (share of the total in brackets):
| Part | Plain meaning | Maths | Amount |
|---|---|---|---|
| Electricity used | the power itself | 3,26,500 units × ₹6.90 | **₹22,52,850** (62%) |
| Fuel adjustment | fuel costs passed on, changes monthly | 3,26,500 × ₹1.20 | **₹3,91,800** (11%) |
| Wires | fee for Northgrid's network | 3,26,500 × ₹1.10 | **₹3,59,150** (10%) |
| Taxes | electricity duty and sales tax | duty 7.5% of ₹32,97,130 = **₹2,47,285**; sales tax 30 paise × 3,26,500 = **₹97,950** | **₹3,45,235** (9%) |
| Booked capacity | rent for your peak power | 664 kVA × ₹420 (664 is above 75% of 700 = 525) | **₹2,78,880** (8%) |
| Time of day | evenings cost more, nights less | mornings +₹22,800, evenings +₹60,200, nights −₹68,550 | **₹14,450** (0.4%) |
| Last month's balance | a credit from July | Northgrid revised July's fuel charge down | **−₹196** (credit) |

- **Before taxes** (Electricity used + Fuel + Wires + Booked capacity + Time of day): **₹32,97,130**.
- **Total:** ₹32,97,130 + ₹3,45,235 − ₹196 = **₹36,42,169**, rounded down to **₹36,42,160**. The **−₹9** rounding is shown as small text.
- **Pay by Tue 8 Sep: ₹36,09,190.** The discount is 1% of ₹32,97,130, which is ₹32,971.30. ₹36,42,168.75 − ₹32,971.30 = ₹36,09,197.45, rounded down to ₹36,09,190.
- **The saving you see: ₹32,970.** That is ₹36,42,160 − ₹36,09,190, the cash she actually keeps. Use ₹32,970 everywhere a saving is shown to the user (Home, S02, S06, S09, S11). Only the discount check on S07 may mention ₹32,971, and only with the rounding sentence: "1% of ₹32,97,130 before taxes is ₹32,971. Both totals are rounded down to the nearest ₹10, so you pay ₹32,970 less."
- **After Wed 16 Sep: ₹36,87,690,** which is **₹45,530 more**. The surcharge is 1.25% of ₹36,42,168.75 = ₹45,527.11. ₹36,87,695.86 rounded down is ₹36,87,690. The difference she sees is ₹36,87,690 − ₹36,42,160 = ₹45,530.
- **Compared with July:**
  - **₹53,820 more than July** (₹36,42,160 − ₹35,88,340), which is **up 1.5%**.
  - Units: **5,700 more** (3,26,500 − 3,20,800), which is **up 1.8%**.
  - Against Aug 2025: **up 2.0%** (3,26,500 vs 3,20,140).
- **The 6 checks** (all pass):
  1. Charges add up: every line equals your meter reading times the approved rate.
  2. Contract demand unchanged: 700 kVA, same as your first bill.
  3. Category fits your business: HT Commercial is right for a hotel.
  4. Meter multiplier unchanged: 2,000, same as your first bill.
  5. No penalties: peak demand 664 of 700 kVA, power factor 0.998.
  6. Discount worked out right: see the sentence above.
- The reassurance phrase is "No hidden charges or penalties", with the detail "Charged at the regulator's rates".

## The 900 kVA bill (the "something is off" world: S13, S13.1, S13.2, S13.3, S07b, S08b)
Same bill, except it prints contract demand **900 kVA**. Because 75% of 900 = **675 kVA** is above the 664 kVA peak, Northgrid charges booked capacity on 675 kVA.
| Changed line | Maths | Amount |
|---|---|---|
| Booked capacity | 675 kVA × ₹420 | **₹2,83,500** (was ₹2,78,880; **+₹4,620**) |
| Before taxes | ₹32,97,130 + ₹4,620 | **₹33,01,750** |
| Electricity duty | 7.5% of ₹33,01,750 | **₹2,47,631** (exact ₹2,47,631.25) |
| Taxes | ₹2,47,631 + ₹97,950 | **₹3,45,581** |
| Total | ₹33,01,750 + ₹3,45,581 − ₹196 = ₹36,47,135 | **₹36,47,130** after rounding (−₹5) |
| Pay by Tue 8 Sep | the discount is 1% of ₹33,01,750 = ₹33,017.50 | **₹36,14,110**; the saving she sees is **₹33,020** |
| After Wed 16 Sep | 1.25% surcharge | **₹36,92,720**, which is **₹45,590 more** |
| Compared with July | ₹36,47,130 − ₹35,88,340 | **₹58,790 more**, **up 1.6%**; units still up 1.8% |

- **What the mistake costs:**
  - 11 kVA more (675 − 664) × ₹420 = **₹4,620**, plus 7.5% duty ₹346.50 = **₹4,966.50**.
  - The bill total is **₹4,970 more** than it should be (₹36,47,130 vs ₹36,42,160).
  - **About ₹59,600 a year** if it repeats (12 × ₹4,966.50 = ₹59,598).
  - User-facing copy uses **₹4,970 more on this bill** and **about ₹59,600 a year**. The ₹4,620 appears only in the explanation ("11 kVA × ₹420 = ₹4,620, plus duty").
  - ₹55,440 is retired.
- **Checks:** 5 of 6 pass. Contract demand changed: this bill says 900 kVA, your first bill (or your agreement, on S13.1) says 700 kVA, and you have not asked for a change.
- The clipboard and share texts use these figures, for example: "This bill shows contract demand 900 kVA. Our agreement says 700 kVA. That makes Northgrid charge booked capacity on 675 kVA instead of our 664 kVA peak: 11 kVA × ₹420 = ₹4,620, ₹4,966.50 with duty. Please check and send a corrected bill."
- "You can still pay now and keep the ₹33,020 discount. Raise this with Northgrid separately."

## Past bills and history
- **July 2026 bill:** total **₹35,88,340**. Paid **₹35,55,860** on Wed 5 Aug (by the July pay-by date), which **saved ₹32,480** (₹35,88,340 − ₹35,55,860). ₹35,53,720 is retired. July was the first bill paid with Ohm, so rupee history starts with July 2026.
- **Bills paid with Ohm:** July 2026 only. August 2026 is the current bill.
- **Units by month** (printed on the August bill's 12-month table, plus August):
  | Month | Units |
  |---|---|
  | Aug 2025 | 3,20,140 |
  | Sep 2025 | 3,10,110 |
  | Oct 2025 | 3,19,220 |
  | Nov 2025 | 2,91,460 |
  | Dec 2025 | 2,99,620 |
  | Jan 2026 | 2,90,430 |
  | Feb 2026 | 2,61,320 (lowest) |
  | Mar 2026 | 2,90,910 |
  | Apr 2026 | 3,15,630 |
  | May 2026 | 3,42,210 (highest) |
  | Jun 2026 | 3,32,800 |
  | Jul 2026 | 3,20,800 |
  | Aug 2026 | 3,26,500 (current) |
- **Totals:**
  - 2025 (Aug to Dec): **15,40,550 units**.
  - 2026 (Jan to Aug): **24,80,600 units**.
  - All 13 months: **40,21,150 units**.
- **Swing:** highest May 3,42,210, lowest Feb 2,61,320. The difference is **80,890 units** (May used 31% more than Feb).
- **Rupees by month:** only Jul 2026 **₹35,88,340** and Aug 2026 **₹36,42,160** exist. Everything earlier has no rupee bar ("Ohm starts tracking rupees from your first bill, July 2026").

## Payment and receipt (S11, S11.1)
- **Paid ₹36,09,190** on **Thu 3 Sep 2026, 11:42 AM**. You saved **₹32,970**.
- Paid through **Razorpay**, Net banking, HDFC Bank. Reference **UTR HDFCR52026090312345**.
- Status: **Paid, waiting for Northgrid to confirm**.

## Notification (S02)
- Title: "August power bill: ₹36,42,160"
- Body: "No hidden charges or penalties. / Pay by Tue 8 Sep to save ₹32,970."
