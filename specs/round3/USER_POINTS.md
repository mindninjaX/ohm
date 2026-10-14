# The user's round 3 points, one per line (14 Oct 2026). The feedback audit checks each one.

Global
1. No Liquid Glass anywhere: every popup or bottom sheet is a plain web sheet, one component reused (slots). Bills and Trends tabs are a simple normal tab bar.
2. The Screens page must show the flows: where each screen comes from, arrows between screens, states grouped with their screen, separate flows for upload PDF, take a photo, forward email, and the master bill payment flow.
3. Keep things simple. Less text, more white space, proper columns (label left, value right), nothing clipped, nothing overflowing, consistent formats.
4. Maths must be consistent everywhere (DATA.md).
5. Charts must be nice and readable: simple bar charts.
6. Park the "check failed" world: keep in design, not in the prototype or the build. Nothing alarming about contract demand after payment.
7. Reading your bill and What Ohm checked are the same feature: same checks, presented the same way.

S01 Home
8. The bill card shows two dates (due Wed 16 Sep, pay by Tue 8 Sep): make the hard due date clear and the saving positive, without overwhelming.
9. Month labels: 3 letters (Jan, Feb), not single letters.
10. "Where these numbers come from" must look like a button; the "From the usage table on your August bill" text is probably not needed.
11. Past bills (July + All bills) stays; it is fine.

S03 Add a bill, S03.1 Forward the email
12. Add a bill sheet: plain web sheet. Keep the illustrations (the user loves them).
13. Forward the email: plain web sheet; remove the blue background behind the illustration.

S01.1, S01.2, S01.3
14. All bills, July bill: fine. "Where these numbers come from" sheet: content fine, sheet must be plain web.

S04 Reading, S04.1 Reading details, S04.2 Stop reading
15. Make it clear Reading comes after uploading the PDF or taking a photo.
16. S04.1: too much text, overflowing, no column usage, hard to scan: organise it.
17. S04.1: every dropdown expanded in the same frame so the user can show what is under each one.
18. Stop reading popup: plain web sheet.

S05 Your connection
19. Explain where S05 comes from (it is not "Connect Northgrid", which is coming soon).
20. Better columns ("the power you book from Northgrid" must not sit under "700 kVA").
21. The category tag must use the same tag design as elsewhere.
22. Expand contract demand, meter multiplier and the rest: show what is inside.
23. "On your bill", "Fix contract demand", "Ask the Ohm team": make clear where they come from.
24. S05.5 looked like a duplicate of S05: organise variants so the relationship is clear (S05.5 is parked).

S06 Bill summary, S06.1
25. The "due Wed 16 Sep" hero looked ugly: use the same card as Home without the button; "No hidden charges or penalties" becomes part of it.
26. "See all 7 parts" was unclear: say what it opens.
27. "What you pay depends on the day" sounds like no control: tell her she can save by paying early.
28. The ladder needs work: more white space, less text, the "Today / Thu 3 Sep" tag was confusing.
29. Never show "Bill amount" instead of a number: show what she pays before Tue 8 Sep (and what she saves), until Wed 16 Sep (no discount), after (penalty).
30. Show the full amount up front and pitch the saving; on the summary, strike the full amount and show the discounted one (animation).
31. "Compared with July": reframe around electricity units used.
32. Pay button: "Pay ₹36,09,190" only, no "by <date>".

S07 What Ohm checked
33. Entry point: from "No hidden charges or penalties".
34. Too text heavy; the ₹32,970 / "less to pay" left-right layout must stack top to bottom; "If one changes, we tell you" must not sit on a stray line.
35. Category fits: cleaner.
36. Meter multiplier: "meter count" and "units billed" were clipped; the arrow was a line plus a separate arrowhead: make it one clean arrow.
37. Peak demand had more than one visualisation: one is enough.

S08 Breakdown
38. Entry point unclear.
39. The "due Wed 16 Sep" hero looked ugly (same fix as S06).
40. Very heavy text; the separation between before taxes and time of day was confusing.

S09 Share with owner
41. Clean the share image; "Pay by Tue 8 Sep" was over-highlighted: make it "Save ₹32,970 if you pay by Tue 8 Sep".
42. "Checked by Ohm, no hidden charges or penalties" is enough: no date, no "From Northgrid's bill".
43. The "contract demand changed" share variant looked aggressive and amateur (parked).

S11 Paid, S11.1
44. Receipt rows uniform: labels left, values right, on the same lines.
45. Do not show "contract demand changed" after payment (parked).

S12 Trends
46. The comparison chart (tick strip) was unreadable: use a simple bar chart; "Compared with July" was unclear.
47. Rupee history: "months with rupee amounts, 2 of 13" and its progress bar made no sense: rework.
48. The rupee amount appeared twice in the same card: show it once.
49. Usage history "1 of 13" type meters: same problem.
