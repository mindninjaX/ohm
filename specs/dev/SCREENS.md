# Screens to build (Figma frame > route > state), 14 Oct 2026

Figma file fileKey mwmHwXDuayUYeliDAlv3Fo, page "📱 Screens" (id 9:7425). Each frame grows to its content (height in brackets). Parked frames are not built.
"State" means the same route with demo state (set with the Prototype menu, or `?demo=` in capture mode, see TOOLING below).

| Frame id | Frame | Route | State | Area |
|---|---|---|---|---|
| 9:7427 | S01 Home (1121) | `/` | | HOME |
| 30:80509 | S01.4 Home, after paying (1121) | `/` | demo flag `paid` | HOME |
| 11:11635 | S01.1 All bills (852) | `/bills` | | HOME |
| 11:12124 | S01.2 July bill (852) | `/bills/july-2026` | | HOME |
| 11:12484 | S01.3 Where these numbers come from (852) | `/home/sources` (sheet over `/`) | | HOME |
| 9:7850 | S12 Trends (1543) | `/trends` | units, 2026, Aug | HOME |
| 20:25768 | S12.2 Trends, 2025 (1543) | `/trends?year=2025` | | HOME |
| 20:26344 | S12.3 Trends, month selected (May) (1543) | `/trends?month=may` | | HOME |
| 20:27101 | S12.4 Trends, Bill amount (1006) | `/trends?metric=rupees` | | HOME |
| 20:27573 | S12.5 Trends, Units with fewer than 3 months (852) | `/trends?state=few` | demo only | HOME |
| 20:27992 | S12.6 Trends, error (852) | `/trends?state=error` | demo only | HOME |
| 9:7470 | S02 Notification (852) | `/notification` | | ADD |
| 9:7475 | S03 Add a bill (852) | `/add` (sheet over `/`) | | ADD |
| 11:10839 | S03.1 Forward the email (852) | `/add/email` (sheet over `/`) | with Simulate the email arriving (sheet 480) | ADD |
| 9:7521 | S04 Reading (852) | `/reading` | reading in progress, with Skip | ADD |
| 20:28427 | S04.1 Reading details (2079) | `/reading?open=all` | reading done, every step open | ADD |
| 20:29031 | S04.2 Stop reading (852) | `/reading/stop` (sheet over `/reading`) | | ADD |
| 9:7555 | S05 Your connection (1164) | `/connection` | rows closed | CONNECTION |
| 30:47962 | S05.0 Your connection, all rows open (2124) | `/connection?open=all` | | CONNECTION |
| 11:13504 | S05.1 What looks off (852) | `/connection/wrong` (sheet over `/connection`) | | CONNECTION |
| 11:14760 | S05.2 On your bill (906) | `/connection/on-your-bill` | | CONNECTION |
| 11:15450 | S05.3 Fix contract demand (852) | `/connection/fix` | | CONNECTION |
| 11:15577 | S05.4 Ask the Ohm team (856) | `/connection/ask` | | CONNECTION |
| 11:16230 | S05.8 Your connection, set by you (1258) | `/connection?changed=set` | | CONNECTION |
| 11:15883 | S05.9 Your connection, sent (1258) | `/connection?changed=sent` | | CONNECTION |
| 9:7592 | S06 Bill summary (1569) | `/bill` | date Thu 3 Sep; card animates Summary > Summary discounted | SUMMARY |
| 20:31078 | S06.1 After Tue 8 Sep (1573) | `/bill` | demo date `after` | SUMMARY |
| 34:115778 | S06.2 Bill summary, paid (1201) | `/bill` | demo flag `paid`; card "Summary paid", no price ladder, footer View receipt | SUMMARY |
| 9:7654 | S07 Checks (2022) | `/bill/checks` | | SUMMARY |
| 9:7679 | S08 Breakdown (1539) | `/bill/breakdown` | | SUMMARY |
| 20:30011 | S08c Breakdown, what a part means (1539) | `/bill/breakdown?info=fuel` | info popover open | SUMMARY |
| 9:7722 | S09 Share (852) | `/bill/share` (sheet over `/bill`) | | PAY |
| 28:39051 | S09.1 Link copied (852) | `/bill/share` after Copy link | toast "Link copied" | PAY |
| 9:7820 | S11 Paid (852) | `/paid` | | PAY |
| 28:40406 | S11.1 Share receipt (852) | `/paid/share` (sheet over `/paid`) | | PAY |
| none | Razorpay step | `/pay` | "Opening Razorpay" loader about 1.5 s, then replace with `/paid` | PAY |

Flows (from the Figma prototype; arrows on the Screens page show each tap):
1. First bill: S01 > Add bill > S03 > Upload the PDF (simulated upload) or Take a photo (simulated camera) > S04 (scan animation, steps tick off, about 8 to 10 s, skippable) > S04.1 when a step is tapped or when done > Continue > S05 > Save and see August bill > S06. S03 > Forward the email > S03.1 > "Simulate the email arriving" > S02. S04 > Stop reading this bill > S04.2 > Stop reading > S01. S05 > Something looks off > S05.1 > S05.3 > Save > S05.8 > Save and see > S06; S05.1 > S05.4 > Send > S05.9.
2. Monthly bill: S02 > tap > S06 > Pay ₹36,09,190 > Razorpay loader > S11 > Share receipt > S11.1; S11 > Done > S01.4 (Home, paid); Back from S11 lands on S06.2 (S06 once paid), whose View receipt goes to S11. S06 detours: No hidden charges row > S07; See the full breakdown > S08 (info icon > S08c); Share with owner > S09 (Copy link > toast, S09.1); See trends > S12.
3. Home: S01 > All bills > S01.1 > July 2026 > S01.2; Where these numbers come from > S01.3; Trends tab > S12 (tabs 2026 or 2025, tap a bar, metric switch); Review and pay > S06; No hidden charges row > S07.
