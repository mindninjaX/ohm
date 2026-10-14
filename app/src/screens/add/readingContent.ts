/**
 * What Ohm "found" on each step of reading the August bill (S04, S04.1). Every figure comes from the data
 * module; this file only arranges it into the four steps of the Figma Steps card.
 */
import {
  ACCOUNT_NUMBER_MASKED,
  BEFORE_TAXES,
  BILLING_DEMAND_KVA,
  BILL_ISSUED_ON,
  BILL_MONTH,
  BUSINESS,
  CATEGORY,
  CHECKS,
  CONTRACT_DEMAND_KVA,
  DUTY,
  EARLY_DEADLINE,
  METER_MULTIPLIER,
  PARTS,
  PEAK_DEMAND_KVA,
  POWER_FACTOR,
  RATES,
  RULES,
  SALES_TAX,
  SAVING,
  TIME_OF_DAY,
  TOTAL,
  TOTAL_BEFORE_ROUNDING,
  UNITS,
  type PartId,
} from '@/data/bill';
import { formatDate, formatINR, formatUnits } from '@/lib/format';

/** Figma glues some words together with no-break spaces so the lines break where it draws them. */
const NBSP = '\u00a0';

/** One line of a step's details: a label on the left, a value on the right, a small note under it. */
export interface DetailRow {
  id: string;
  label: string;
  /** Plain text, or a rupee amount that counts up when the step first opens. */
  value: { text: string } | { rupees: number };
  note?: string;
}

export interface CheckResult {
  id: string;
  title: string;
  result: string;
}

export interface StepContent {
  id: 'found' | 'read' | 'maths' | 'checks';
  title: string;
}

const monthName = BILL_MONTH.split(' ')[0] ?? BILL_MONTH;
const part = (id: PartId) => PARTS.find((p) => p.id === id)!;
const units = formatUnits(UNITS);
/** Figma breaks this note after "evenings +₹60,200,". */
const TIME_OF_DAY_NOTE =
  `Mornings ${formatINR(TIME_OF_DAY.mornings, { signed: true })}, evenings ${formatINR(TIME_OF_DAY.evenings, { signed: true })},\n` +
  `nights ${formatINR(TIME_OF_DAY.nights, { signed: true })}`;

/** The four steps, in order. */
export const STEPS: readonly StepContent[] = [
  { id: 'found', title: `Found Northgrid's ${monthName} bill` },
  { id: 'read', title: 'Read every line of the bill' },
  { id: 'maths', title: 'Redoing the maths' },
  { id: 'checks', title: `Running the ${CHECKS.length} checks` },
];

/** Step 1: who and when. */
export const FOUND_ROWS: readonly DetailRow[] = [
  { id: 'date', label: 'Bill date', value: { text: formatDate(BILL_ISSUED_ON, { year: true }) } },
  { id: 'account', label: 'Account', value: { text: ACCOUNT_NUMBER_MASKED } },
  { id: 'business', label: 'Business', value: { text: BUSINESS.name } },
];

/** Step 2: the readings printed on the bill. */
export const READ_ROWS: readonly DetailRow[] = [
  { id: 'units', label: 'Units', value: { text: units } },
  { id: 'peak', label: 'Peak demand', value: { text: `${PEAK_DEMAND_KVA} kVA` } },
  { id: 'pf', label: 'Power factor', value: { text: String(POWER_FACTOR) } },
  { id: 'contract', label: 'Contract demand', value: { text: `${CONTRACT_DEMAND_KVA} kVA` } },
  { id: 'category', label: 'Category', value: { text: CATEGORY } },
  { id: 'multiplier', label: 'Meter multiplier', value: { text: formatUnits(METER_MULTIPLIER) } },
];

/** Step 3: the bill's lines, worked out again from the rates. */
export const MATHS_INTRO = 'Ohm redoes each line with the approved rates and state taxes.';
export const MATHS_ROWS: readonly DetailRow[] = [
  { id: 'electricity', label: part('electricity').label, value: { rupees: part('electricity').amount }, note: `${units} units × ${formatINR(RATES.electricity)}` },
  { id: 'fuel', label: part('fuel').label, value: { rupees: part('fuel').amount }, note: `${units} units × ${formatINR(RATES.fuel)}` },
  { id: 'wires', label: part('wires').label, value: { rupees: part('wires').amount }, note: `${units} units × ${formatINR(RATES.wires)}` },
  { id: 'booked', label: part('booked-capacity').label, value: { rupees: part('booked-capacity').amount }, note: `${BILLING_DEMAND_KVA} kVA peak × ${formatINR(RULES.perKva)}` },
  { id: 'tod', label: part('time-of-day').label, value: { rupees: part('time-of-day').amount }, note: TIME_OF_DAY_NOTE },
  { id: 'before', label: 'Before taxes', value: { rupees: BEFORE_TAXES }, note: 'Sum of the five charges above' },
  { id: 'taxes', label: part('taxes').label, value: { rupees: part('taxes').amount }, note: `Duty ${formatINR(DUTY)}, sales tax ${formatINR(SALES_TAX)}` },
  { id: 'balance', label: part('balance').label, value: { rupees: part('balance').amount }, note: "July's fuel charge was revised down" },
  { id: 'total', label: 'Bill total', value: { rupees: TOTAL }, note: `${formatINR(TOTAL_BEFORE_ROUNDING)} rounded down to the nearest ${formatINR(RULES.roundDownToRupees)}` },
];

/**
 * Step 4: the six checks, in the order Figma lists them (the discount check comes second here; on the
 * Checks screen it is last). Titles come from CHECKS; the results are the short versions Reading shows.
 */
const check = (n: number) => CHECKS.find((c) => c.id === n)!;
export const CHECK_RESULTS: readonly CheckResult[] = [
  { id: 'adds-up', title: check(1).title, result: 'Every line is your meter reading times the approved rate.' },
  {
    id: 'discount',
    title: check(6).title,
    result: `You save ${formatINR(SAVING)} if you pay by ${formatDate(EARLY_DEADLINE).replaceAll(' ', NBSP)}.`,
  },
  { id: 'contract', title: check(2).title, result: check(2).detail },
  { id: 'category', title: check(3).title, result: check(3).detail },
  { id: 'multiplier', title: check(4).title, result: check(4).detail },
  {
    id: 'penalties',
    title: check(5).title,
    result: `Peak ${PEAK_DEMAND_KVA} of ${CONTRACT_DEMAND_KVA} kVA. Power${NBSP}factor${NBSP}${POWER_FACTOR}.`,
  },
];

/** The header while reading, and once it is done (S04, S04.1). */
export const READING_HEADER = { title: 'Reading your bill', subtitle: 'From the bill you just added' } as const;
export const DONE_HEADER = { title: 'How Ohm read this bill', subtitle: `From your ${monthName} bill` } as const;

export const READING_CAPTION = 'Takes about 10 seconds. You can close this screen. We will notify you when it is ready.';
export const DONE_CAPTION = `Ohm finished reading this bill. All${NBSP}${CHECKS.length}${NBSP}checks${NBSP}are${NBSP}fine.`;
