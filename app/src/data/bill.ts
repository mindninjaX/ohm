/**
 * Every number Ohm shows, for the normal 700 kVA world (specs/round2/DATA.md is the law).
 * The 900 kVA "something is off" world is parked and not built here.
 *
 * Source figures are typed constants. Everything derived (the parts, the taxes, the total,
 * the early and late prices, the comparisons) is computed from them with Northgrid's rules,
 * and src/data/bill.test.ts checks the results against DATA.md.
 *
 * Sums run in whole paise (integers) so no float error creeps in; the exports are rupees.
 */
import { formatDate, formatINR, formatUnits } from '@/lib/format';

// ---------------------------------------------------------------- people, place, dates

export const BUSINESS = { name: 'Harbourline Hotels, Riverside', kind: 'hotel' } as const;
export const POWER_COMPANY = 'Northgrid Electric';
export const CATEGORY = 'HT Commercial';
/** Shown masked, always. */
export const ACCOUNT_NUMBER_MASKED = '4410 28••••';
/** The power booked, from the agreement and the first bill. */
export const CONTRACT_DEMAND_KVA = 700;
export const METER_MULTIPLIER = 2000;
export const CONNECTED_SINCE = '2021-03-03';

/** Today in the demo. Date-only strings mean that day in India (see formatDate). */
export const DEMO_TODAY = '2026-09-03';
export const BILL_MONTH = 'August 2026';
export const BILL_ISSUED_ON = '2026-09-01';
export const EARLY_DEADLINE = '2026-09-08';
export const DUE_DATE = '2026-09-16';
export const LATE_FROM = '2026-09-17';

/** Whole days from one date-only string to another. */
export function daysBetween(from: string, to: string): number {
  const utc = (d: string) => {
    const [y, m, day] = d.split('-').map(Number);
    return Date.UTC(y!, m! - 1, day!);
  };
  return Math.round((utc(to) - utc(from)) / 86_400_000);
}

/** The early-payment window: 7 days from issue, 5 left on Thu 3 Sep, 2 gone. */
export const EARLY_WINDOW = {
  totalDays: daysBetween(BILL_ISSUED_ON, EARLY_DEADLINE),
  daysLeft: daysBetween(DEMO_TODAY, EARLY_DEADLINE),
  daysGone: daysBetween(BILL_ISSUED_ON, DEMO_TODAY),
} as const;

// ---------------------------------------------------------------- Northgrid's rules

export const RULES = {
  /** Totals, the early amount and the late amount round down to the nearest ₹10. */
  roundDownToRupees: 10,
  /** 1% of the charges before taxes, if paid by the early deadline. */
  earlyDiscountPct: 1,
  /** 1.25% surcharge on the bill after the due date. */
  latePct: 1.25,
  /** Booked capacity is charged on the higher of peak demand and 75% of contract demand. */
  billingDemandFloorPct: 75,
  /** ₹ per kVA of booked capacity. */
  perKva: 420,
  /** Electricity duty, % of the charges before taxes. */
  dutyPct: 7.5,
  /** Sales tax, ₹ per unit (30 paise). */
  salesTaxPerUnit: 0.3,
} as const;

/** Rules in integer form for exact paise arithmetic. */
const EARLY_BP = Math.round(RULES.earlyDiscountPct * 100);
const LATE_BP = Math.round(RULES.latePct * 100);
const DUTY_BP = Math.round(RULES.dutyPct * 100);
const SALES_TAX_PAISE_PER_UNIT = Math.round(RULES.salesTaxPerUnit * 100);
const ROUND_PAISE = Math.round(RULES.roundDownToRupees * 100);

const rupees = (paise: number) => paise / 100;
const bp = (paise: number, basisPoints: number) => (paise * basisPoints) / 10_000;
const roundDown = (paise: number) => Math.floor(paise / ROUND_PAISE) * ROUND_PAISE;
const pctChange = (now: number, before: number) => ((now - before) / before) * 100;

// ---------------------------------------------------------------- the August bill: readings and rates

export const UNITS = 326_500;
export const UNITS_LAST_MONTH = 320_800;
export const PEAK_DEMAND_KVA = 664;
export const POWER_FACTOR = 0.998;

/** Per-unit rates in paise: ₹6.90, ₹1.20, ₹1.10. */
const RATE_PAISE = { electricity: 690, fuel: 120, wires: 110 } as const;
export const RATES = {
  electricity: rupees(RATE_PAISE.electricity),
  fuel: rupees(RATE_PAISE.fuel),
  wires: rupees(RATE_PAISE.wires),
} as const;

/** Time of day: evenings cost more, nights less. */
export const TIME_OF_DAY = { mornings: 22_800, evenings: 60_200, nights: -68_550 } as const;
/** A credit from July: Northgrid revised July's fuel charge down. */
export const LAST_MONTH_BALANCE = -196;

// ---------------------------------------------------------------- the August bill: derived

/** 75% of 700 = 525 kVA. */
export const BILLING_DEMAND_FLOOR_KVA = (CONTRACT_DEMAND_KVA * RULES.billingDemandFloorPct) / 100;
/** The kVA Northgrid charges on: the higher of the peak and the 75% floor (664 here). */
export const BILLING_DEMAND_KVA = Math.max(PEAK_DEMAND_KVA, BILLING_DEMAND_FLOOR_KVA);

const electricityPaise = UNITS * RATE_PAISE.electricity;
const fuelPaise = UNITS * RATE_PAISE.fuel;
const wiresPaise = UNITS * RATE_PAISE.wires;
/** Booked capacity, the billing demand charge: max(peak, 0.75 x contract) x ₹420. */
const bookedCapacityPaise = BILLING_DEMAND_KVA * RULES.perKva * 100;
const timeOfDayPaise = (TIME_OF_DAY.mornings + TIME_OF_DAY.evenings + TIME_OF_DAY.nights) * 100;

const beforeTaxesPaise =
  electricityPaise + fuelPaise + wiresPaise + bookedCapacityPaise + timeOfDayPaise;
const dutyExactPaise = bp(beforeTaxesPaise, DUTY_BP);
const dutyPaise = Math.round(dutyExactPaise / 100) * 100; // shown to the whole rupee
const salesTaxPaise = UNITS * SALES_TAX_PAISE_PER_UNIT;
const balancePaise = LAST_MONTH_BALANCE * 100;

/** The bill as printed: before taxes + taxes - ₹196, before the ₹10 rounding. */
const printedTotalPaise = beforeTaxesPaise + dutyPaise + salesTaxPaise + balancePaise;
/** The same sum with the duty unrounded; early and late prices start from this. */
const exactTotalPaise = beforeTaxesPaise + dutyExactPaise + salesTaxPaise + balancePaise;

const totalPaise = roundDown(exactTotalPaise);
const earlyDiscountExactPaise = bp(beforeTaxesPaise, EARLY_BP);
const earlyPricePaise = roundDown(exactTotalPaise - earlyDiscountExactPaise);
const lateSurchargeExactPaise = bp(exactTotalPaise, LATE_BP);
const latePricePaise = roundDown(exactTotalPaise + lateSurchargeExactPaise);

export const BEFORE_TAXES = rupees(beforeTaxesPaise); // 32,97,130
export const DUTY = rupees(dutyPaise); // 2,47,285 (exact 2,47,284.75)
export const SALES_TAX = rupees(salesTaxPaise); // 97,950
export const TAXES = DUTY + SALES_TAX; // 3,45,235
/** Before taxes + taxes - ₹196 = ₹36,42,169, before rounding. */
export const TOTAL_BEFORE_ROUNDING = rupees(printedTotalPaise);
/** ₹36,42,168.75: the unrounded total behind the early and late maths. */
export const EXACT_TOTAL = rupees(exactTotalPaise);
/** The bill total, rounded down to the nearest ₹10: ₹36,42,160. */
export const TOTAL = rupees(totalPaise);
/** The small "−₹9" on the bill: what rounding took off the printed sum. */
export const ROUNDING = TOTAL - TOTAL_BEFORE_ROUNDING;

/** 1% of the charges before taxes: ₹32,971.30. Only S07 may mention ₹32,971. */
export const EARLY_DISCOUNT_EXACT = rupees(earlyDiscountExactPaise);
export const EARLY_DISCOUNT_ROUNDED = Math.round(EARLY_DISCOUNT_EXACT);
/** Pay by Tue 8 Sep: ₹36,09,190. */
export const EARLY_PRICE = rupees(earlyPricePaise);
/** The saving the user sees, everywhere: ₹36,42,160 − ₹36,09,190 = ₹32,970. */
export const SAVING = TOTAL - EARLY_PRICE;

/** 1.25% of the exact total: ₹45,527.11. */
export const LATE_SURCHARGE_EXACT = rupees(Math.round(lateSurchargeExactPaise));
/** After Wed 16 Sep: ₹36,87,690. */
export const LATE_PRICE = rupees(latePricePaise);
/** What waiting costs the user: ₹36,87,690 − ₹36,42,160 = ₹45,530. */
export const LATE_EXTRA = LATE_PRICE - TOTAL;

// ---------------------------------------------------------------- the 7 parts, in S08 order

export type PartId =
  | 'electricity'
  | 'fuel'
  | 'wires'
  | 'taxes'
  | 'booked-capacity'
  | 'time-of-day'
  | 'balance';

export interface BillPart {
  id: PartId;
  label: string;
  /** What the part is, in plain words. */
  meaning: string;
  /** The maths behind the amount, in plain words. */
  maths: string;
  amount: number;
  /** Share of the total in %, whole numbers (0.4 under 1%). Null for the credit. */
  sharePct: number | null;
}

const share = (amount: number): number => {
  const pct = (amount / TOTAL_BEFORE_ROUNDING) * 100;
  return pct < 1 ? Math.round(pct * 10) / 10 : Math.round(pct);
};

const unitsText = formatUnits(UNITS);

export const PARTS: readonly BillPart[] = [
  {
    id: 'electricity',
    label: 'Electricity used',
    meaning: 'The power itself',
    maths: `${unitsText} units × ${formatINR(RATES.electricity)}`,
    amount: rupees(electricityPaise),
    sharePct: share(rupees(electricityPaise)),
  },
  {
    id: 'fuel',
    label: 'Fuel adjustment',
    meaning: 'Fuel costs passed on, changes monthly',
    maths: `${unitsText} × ${formatINR(RATES.fuel)}`,
    amount: rupees(fuelPaise),
    sharePct: share(rupees(fuelPaise)),
  },
  {
    id: 'wires',
    label: 'Wires',
    meaning: "Fee for Northgrid's network",
    maths: `${unitsText} × ${formatINR(RATES.wires)}`,
    amount: rupees(wiresPaise),
    sharePct: share(rupees(wiresPaise)),
  },
  {
    id: 'taxes',
    label: 'Taxes',
    meaning: 'Electricity duty and sales tax',
    maths:
      `Duty ${RULES.dutyPct}% of ${formatINR(BEFORE_TAXES)} = ${formatINR(DUTY)}; ` +
      `sales tax 30 paise × ${unitsText} = ${formatINR(SALES_TAX)}`,
    amount: TAXES,
    sharePct: share(TAXES),
  },
  {
    id: 'booked-capacity',
    label: 'Booked capacity',
    meaning: 'Rent for your peak power',
    maths:
      `${BILLING_DEMAND_KVA} kVA × ${formatINR(RULES.perKva)} ` +
      `(${PEAK_DEMAND_KVA} is above 75% of ${CONTRACT_DEMAND_KVA} = ${BILLING_DEMAND_FLOOR_KVA})`,
    amount: rupees(bookedCapacityPaise),
    sharePct: share(rupees(bookedCapacityPaise)),
  },
  {
    id: 'time-of-day',
    label: 'Time of day',
    meaning: 'Evenings cost more, nights less',
    maths:
      `Mornings ${formatINR(TIME_OF_DAY.mornings, { signed: true })}, ` +
      `evenings ${formatINR(TIME_OF_DAY.evenings, { signed: true })}, ` +
      `nights ${formatINR(TIME_OF_DAY.nights, { signed: true })}`,
    amount: rupees(timeOfDayPaise),
    sharePct: share(rupees(timeOfDayPaise)),
  },
  {
    id: 'balance',
    label: "Last month's balance",
    meaning: 'A credit from July',
    maths: "Northgrid revised July's fuel charge down",
    amount: LAST_MONTH_BALANCE,
    sharePct: null,
  },
];

// ---------------------------------------------------------------- compared with July and last August

export const JULY_BILL = {
  month: 'July 2026',
  units: UNITS_LAST_MONTH,
  total: 3_588_340,
  /** Paid with Ohm on Wed 5 Aug, by the July pay-by date. */
  paid: 3_555_860,
  paidOn: '2026-08-05',
} as const;
/** What July's early payment saved: ₹35,88,340 − ₹35,55,860 = ₹32,480. */
export const JULY_SAVING = JULY_BILL.total - JULY_BILL.paid;

export const UNITS_AUG_2025 = 320_140;

export const VS_JULY = {
  /** ₹53,820 more than July. */
  rupeesMore: TOTAL - JULY_BILL.total,
  /** Up 1.5%. */
  rupeesPct: pctChange(TOTAL, JULY_BILL.total),
  /** 5,700 more units. */
  unitsMore: UNITS - UNITS_LAST_MONTH,
  /** Up 1.8%. */
  unitsPct: pctChange(UNITS, UNITS_LAST_MONTH),
} as const;

/** Units against Aug 2025: up 2.0%. */
export const VS_AUG_2025 = {
  unitsMore: UNITS - UNITS_AUG_2025,
  unitsPct: pctChange(UNITS, UNITS_AUG_2025),
} as const;

// ---------------------------------------------------------------- the 6 checks (all pass)

export interface BillCheck {
  id: number;
  title: string;
  detail: string;
  pass: boolean;
}

export const CHECKS: readonly BillCheck[] = [
  {
    id: 1,
    title: 'Charges add up',
    detail: 'Every line equals your meter reading times the approved rate.',
    pass: true,
  },
  {
    id: 2,
    title: 'Contract demand unchanged',
    detail: `${CONTRACT_DEMAND_KVA} kVA, same as your first bill.`,
    pass: true,
  },
  {
    id: 3,
    title: 'Category fits your business',
    detail: `${CATEGORY} is right for a ${BUSINESS.kind}.`,
    pass: true,
  },
  {
    id: 4,
    title: 'Meter multiplier unchanged',
    detail: `${formatUnits(METER_MULTIPLIER)}, same as your first bill.`,
    pass: true,
  },
  {
    id: 5,
    title: 'No penalties',
    detail: `Peak demand ${PEAK_DEMAND_KVA} of ${CONTRACT_DEMAND_KVA} kVA, power factor ${POWER_FACTOR}.`,
    pass: true,
  },
  {
    id: 6,
    title: 'Discount worked out right',
    detail:
      `${RULES.earlyDiscountPct}% of ${formatINR(BEFORE_TAXES)} before taxes is ` +
      `${formatINR(EARLY_DISCOUNT_ROUNDED)}. Both totals are rounded down to the nearest ` +
      `${formatINR(RULES.roundDownToRupees)}, so you pay ${formatINR(SAVING)} less.`,
    pass: true,
  },
];

export const REASSURANCE = {
  phrase: 'No hidden charges or penalties',
  detail: "Charged at the regulator's rates",
} as const;

// ---------------------------------------------------------------- units by month (Aug 2025 to Aug 2026)

export interface MonthUnits {
  /** "2025-08". */
  month: string;
  label: string;
  year: 2025 | 2026;
  units: number;
}

export const UNITS_BY_MONTH: readonly MonthUnits[] = [
  { month: '2025-08', label: 'Aug 2025', year: 2025, units: UNITS_AUG_2025 },
  { month: '2025-09', label: 'Sep 2025', year: 2025, units: 310_110 },
  { month: '2025-10', label: 'Oct 2025', year: 2025, units: 319_220 },
  { month: '2025-11', label: 'Nov 2025', year: 2025, units: 291_460 },
  { month: '2025-12', label: 'Dec 2025', year: 2025, units: 299_620 },
  { month: '2026-01', label: 'Jan 2026', year: 2026, units: 290_430 },
  { month: '2026-02', label: 'Feb 2026', year: 2026, units: 261_320 },
  { month: '2026-03', label: 'Mar 2026', year: 2026, units: 290_910 },
  { month: '2026-04', label: 'Apr 2026', year: 2026, units: 315_630 },
  { month: '2026-05', label: 'May 2026', year: 2026, units: 342_210 },
  { month: '2026-06', label: 'Jun 2026', year: 2026, units: 332_800 },
  { month: '2026-07', label: 'Jul 2026', year: 2026, units: UNITS_LAST_MONTH },
  { month: '2026-08', label: 'Aug 2026', year: 2026, units: UNITS },
];

const sumUnits = (rows: readonly MonthUnits[]) => rows.reduce((total, row) => total + row.units, 0);

export const UNITS_TOTAL_2025 = sumUnits(UNITS_BY_MONTH.filter((m) => m.year === 2025)); // Aug to Dec
export const UNITS_TOTAL_2026 = sumUnits(UNITS_BY_MONTH.filter((m) => m.year === 2026)); // Jan to Aug
export const UNITS_TOTAL_ALL = sumUnits(UNITS_BY_MONTH); // all 13 months

const byUnits = [...UNITS_BY_MONTH].sort((a, b) => a.units - b.units);
const lowest = byUnits[0]!;
const highest = byUnits[byUnits.length - 1]!;
/** Highest May 3,42,210, lowest Feb 2,61,320: 80,890 units apart, May used 31% more. */
export const UNITS_SWING = {
  highest,
  lowest,
  difference: highest.units - lowest.units,
  highestOverLowestPct: Math.round(pctChange(highest.units, lowest.units)),
} as const;

/**
 * Rupees by month. Only Jul and Aug 2026 exist: Ohm starts tracking rupees from the
 * first bill, July 2026. Everything earlier has no rupee bar.
 */
export const RUPEES_BY_MONTH: readonly { month: string; label: string; total: number }[] = [
  { month: '2026-07', label: 'Jul 2026', total: JULY_BILL.total },
  { month: '2026-08', label: 'Aug 2026', total: TOTAL },
];

// ---------------------------------------------------------------- payment and receipt (S11, S11.1)

export const PAYMENT = {
  amount: EARLY_PRICE,
  saved: SAVING,
  paidAt: '2026-09-03T11:42:00+05:30',
  gateway: 'Razorpay',
  method: 'Net banking',
  bank: 'HDFC Bank',
  utr: 'HDFCR52026090312345',
  status: 'Paid, waiting for Northgrid to confirm',
} as const;

// ---------------------------------------------------------------- notification (S02)

export const NOTIFICATION = {
  title: `August power bill: ${formatINR(TOTAL)}`,
  body: `${REASSURANCE.phrase}.\nPay by ${formatDate(EARLY_DEADLINE)} to save ${formatINR(SAVING)}.`,
} as const;
