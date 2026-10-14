# Ohm design manual: the words (lead-written; the builder lays these out, word for word)

Audience: anyone. A designer joining tomorrow, the founder, an engineer, an investor, an AI agent. Plain words first; the technical appendix is last and clearly separated. Keep every sentence below as written (the builder may split long paragraphs into cards, but must not rewrite them). No em or en dashes anywhere.

---

## COVER
- Eyebrow: OHM · DESIGN MANUAL
- Title: A calm way to check and pay a big electricity bill
- Lede: Ohm reads a business's electricity bill, checks it against the regulator's rules, and tells the person paying it, in plain words, whether it is right, how much to pay and by when.
- Meta line: Version 4 · 14 Oct 2026 · Mobile web app · Work in progress
- Contents (numbered list): 1 The problem · 2 Who we design for · 3 What Ohm does · 4 How we decide · 5 The journey · 6 The screens · 7 The example bill · 8 Look and feel · 9 Decisions and why · 10 How this file is organised · 11 Open questions · Appendix: for builders and AI agents

---

## 1 THE PROBLEM
Intro: Large businesses in India pay electricity bills worth lakhs of rupees every month. Paying the right amount on time is harder than it should be.

Cards (4):
1. **The bill is dense.** Dozens of lines, technical words like kVA, contract demand and power factor, and rates set by a state regulator.
2. **Mistakes are expensive and quiet.** One wrong number on the bill can add ₹4,970 a month without anyone noticing.
3. **Timing matters.** Pay early and you save (₹32,970 on our example bill). Pay late and you pay more (₹45,530).
4. **The person paying is not an engineer.** It is usually the finance manager. Careful with money, short on time, and the owner wants a one-line answer: is it OK to pay?

---

## 2 WHO WE DESIGN FOR
Intro: The finance manager of a mid-sized business. Our example is Harbourline Hotels, Riverside, a hotel that buys power from Northgrid Electric.

Two columns:
- **She needs to know**
  1. Is this bill right?
  2. How much, and by when?
  3. How do I pay it safely?
  4. What do I tell the owner?
- **She does not need**
  - Rate tables and engineering terms
  - Alarms for things that are fine
  - Two different totals competing for her attention
  - To learn a new tool every month

Note line: She checks the bill on her phone, between other work. So every screen has to make sense in a few seconds.

---

## 3 WHAT OHM DOES
Big line: Ohm reads the bill, checks it, and gives you the answer first.

Four steps (numbered, each with a small icon):
1. **Add the bill.** Upload the PDF, take a photo or forward the email.
2. **Ohm reads it.** In about 10 seconds it finds every line and redoes the maths with the regulator's rates.
3. **See the answer.** The amount, the pay-by date and the saving, plus "No hidden charges or penalties", or the one thing to look at.
4. **Pay and share.** Pay through Razorpay's secure page, then send the owner a clear summary.

---

## 4 HOW WE DECIDE
Intro: Eight principles. When two good ideas compete, these decide.

Principle cards (8, each: number, title, one sentence):
1. **Answer first.** The amount, the date and whether it is OK come before any detail.
2. **Total first, then the saving.** Lead with the bill total and offer the saving. Two dates have two jobs: the due date is a fact, the early date is an offer. The Pay button says only the amount.
3. **Show, don't explain.** Our users are not technical. A small drawing of the bill, a bar or an icon beats a paragraph.
4. **Calm by default.** Green only for money saved, amber only for something to look at, red only when money is at risk.
5. **Plain words.** Explain every number in one short sentence. No jargon without a meaning next to it.
6. **Simple like a website.** Ohm is a mobile web app: a plain header with a back arrow, plain sheets and tabs, one kind of button.
7. **Same thing, same look.** Everything that repeats is built once as a reusable piece (a component), so one change updates every screen.
8. **One source of numbers.** Every figure comes from one data sheet, so all screens agree.

---

## 5 THE JOURNEY
Intro: Four moments in the life of a bill. Each one is a flow in the prototype.

Four rows (moment title, then the steps as a chain of small chips, then one sentence):
1. **The first bill** · Home > Add a bill > Reading > Your connection > Bill summary · She confirms the details that should never change (how much power the business has booked, its tariff category and its meter settings) once. Ohm checks every future bill against them.
2. **Every month after** · Notification > Bill summary > Pay > Paid > Share · The notification already carries the answer: the amount, the pay-by date and "No hidden charges or penalties".
3. **When something is off (parked)** · Bill summary > What Ohm checked > Copy details for Northgrid · Ohm shows the one thing to look at and the words to send Northgrid. Kept in the design for later; not in the prototype or the first build.
4. **Over time** · Home > Trends · Units used by month and year, and the rupees for every bill paid with Ohm.

---

## 6 THE SCREENS
Intro: Every screen, grouped by moment, with the one job it does. (The builder adds a small live thumbnail of each frame later; leave a 120 x 260 slot per row.)

Groups and rows:
- **Getting started**
  - Home: the current bill at a glance, this year's usage and past bills.
  - Notification: the bill arrives with the answer already in it.
  - Add a bill: upload, photo, forward the email, or connect your account (coming soon).
  - Reading: Ohm reads the bill and runs the same six checks you see later. Each step can be opened, or you can close it and get a notification.
  - Your connection: the fixed details every bill is checked against, and how to correct them.
- **The monthly bill**
  - Bill summary: the most important screen. The bill total, the early price and saving, the due date, and how much electricity was used.
  - What Ohm checked: the six checks, each with what it means for your bill.
  - Where the money goes: the seven parts of the bill, the taxes and the rounding.
- **Paying and sharing**
  - Pay: opens Razorpay's secure page (not drawn; the payment happens there).
  - Paid: the confirmation and receipt.
  - Share with the owner: a preview of exactly what the owner will get on WhatsApp or email.
- **Over time**
  - Trends: units and rupees by month, with the highest and lowest months.
- **Parked (kept for later)**
  - Check failed: the one check that failed, what it costs and how to raise it with Northgrid. Not in the prototype or the first build.

---

## 7 THE EXAMPLE BILL
Intro: All designs use one real-looking bill: Harbourline Hotels, August 2026. Every number below comes from the project's data sheet, so all screens agree.

Key figures (big number tiles):
- **₹36,42,160** · Bill total · due Wed 16 Sep
- **₹36,09,190** · Pay by Tue 8 Sep · you save ₹32,970
- **₹36,87,690** · After Wed 16 Sep · ₹45,530 more
- **₹53,820 more than July** · up 1.5% · units up 1.8%

Where the money goes (bar list): Electricity used 62% · Fuel adjustment 11% · Wires 10% · Taxes 9% · Booked capacity 8% · Time of day 0.4% · Credit from July: minus ₹196

Rules worth knowing (small list):
- Northgrid rounds every total down to the nearest ₹10.
- Paying by the early date takes 1% off the charges before taxes.
- Paying late adds 1.25%.

When something is off (amber card): In our second example, the bill says the hotel has booked 900 kVA of power (its contract demand) instead of 700. That makes Northgrid charge for more capacity than the hotel used: ₹4,970 more on this bill, about ₹59,600 a year if it repeats. The bill total becomes ₹36,47,130.

---

## 8 LOOK AND FEEL
Intro: Quiet, clear and trustworthy, like a good bank statement that explains itself.

Five blocks:
- **Colour.** Ohm blue for actions and the current month. Dark ink for text. Green means money saved, amber means look at this, red means money at risk. White cards on a light grey page. (Show swatches: primary, ink, success, warning, danger, surface.)
- **Type.** Inter throughout. The amount you pay is always the biggest text on the screen; the rupee sign sits a little smaller.
- **Buttons and headers.** One button in four styles (main, secondary, destructive, link) and two sizes. A plain white header with a back arrow and a title.
- **Charts.** Bar charts only. The current month in blue, the rest in grey. Three-letter months, one year at a time, so labels never squeeze.
- **Illustrations.** Simple line drawings of an Indian electricity bill (masthead, meter table, total, tear-off slip). They show what Ohm is doing instead of describing it.

Footer line: Every colour, style and component lives on the Design system page.

---

## 9 DECISIONS AND WHY
Intro: The choices that shaped Ohm, newest first.

Rows (date · decision · why):
- 14 Oct · Screens laid out by flow · Arrows show where every screen comes from and what you tap.
- 14 Oct · "Something is off" parked · Kept in the design, out of the prototype and the first build.
- 14 Oct · Reading and checks are one feature · The same six checks, with the same words, in both places.
- 14 Oct · Bill total first, then the saving · Home offers the saving; the summary strikes the total through and shows the early price.
- 14 Oct · Pay buttons say only the amount · "Pay ₹36,09,190" is clearer than adding a date.
- 14 Oct · Plain web sheets and tabs · No iPhone-style glass anywhere in the app; one sheet for every popup.
- 14 Oct · One data sheet for every number · So every screen agrees and the maths always adds up.
- 14 Oct · No payment screens of our own · Razorpay's secure page handles the payment. Pay goes straight to Paid, and "Secured by Razorpay" sets the expectation.
- 14 Oct · Everything repeated is built once and reused · Hand-made copies drift apart; reusable components keep every screen consistent.
- 14 Oct · Simple website-style headers · Ohm is a mobile web app, so iPhone-style see-through bars did not belong.
- 13 Oct · Bar charts with year tabs · Line charts were hard to read and months got squeezed.
- 13 Oct · One amount on the bill summary · Two totals on one screen confused people. The early price lives on the Pay button and on a timeline of what you pay by when.
- 13 Oct · "No hidden charges or penalties" · An answer reads better than "All 6 checks passed".
- 13 Oct · Earlier versions are kept · Every round is archived in the file, so we can always look back.

---

## 10 HOW THIS FILE IS ORGANISED
Page list (emoji, name, one line):
- 📱 Screens · every screen, laid out by flow with arrows, plus the parked screens; the clickable prototype
- 🗺️ Journey map · the full journey on one board
- 🧩 Design system · colours, type, components and illustrations
- 📖 Design manual · this manual
- 🎤 Deck · the presentation
- 🗄️ Archive pages · earlier versions (v1 and v2, 13 Oct; v3, 14 Oct), kept as they were

How to try the prototype (3 starting points): Monthly bill (starts at the notification) · First bill (starts at Home, tap Add bill) · Home and trends (starts at Home).

---

## 11 OPEN QUESTIONS
1. **Paying ₹36 lakh online.** Razorpay's standard net banking limit is ₹5,00,000 per payment. Ohm needs a raised limit, or a bank transfer route (NEFT or RTGS).
2. **Real bills vary.** Formats differ by state and power company. Reading needs testing on many real bills.
3. **Connecting the power company account** is shown as coming soon.

---

## APPENDIX · FOR BUILDERS AND AI AGENTS
Intro: The technical details live in the project files, not here. Start with these.

Two columns of short facts:
- **Where things are**
  - Figma file: Bill app (file key mwmHwXDuayUYeliDAlv3Fo)
  - Project folder: ~/Projects/ohm
  - DECISIONS.md: the full decision log
  - specs/round2/BUILD_GUIDE_R2.md: the working rules
  - specs/round2/COMPONENTS.md: every component, with its ID
  - specs/round2/DATA.md: every number on every screen
  - specs/round1/BUILD_GUIDE.md: Figma plugin gotchas, keys and tokens
  - keys.json: library component, icon and style keys
- **Working rules**
  - Build every repeated element as a component, and only place instances.
  - Take every number from DATA.md.
  - No notes or annotations on the canvas.
  - Frames grow with their content; header and footer stay fixed.
  - Never edit the archive pages.
  - Opus reviews the work; Sonnet builds and fixes.
  - In plugin code use the async APIs (getMainComponentAsync, getNodeByIdAsync).

Last line: The earlier agent reference (Source of truth v1, 13 Oct) is kept to the right of this manual, unchanged.
