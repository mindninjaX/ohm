/**
 * Derived figures for Home and Trends. Everything comes from `src/data/bill.ts` (UNITS_BY_MONTH,
 * RUPEES_BY_MONTH, VS_JULY, ...); nothing is typed here except month names and chart scales.
 */
import { RUPEES_BY_MONTH, UNITS_BY_MONTH, type MonthUnits } from '@/data/bill';

export type TrendYear = 2026 | 2025;
export type TrendMetric = 'units' | 'rupees';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export interface TrendMonth {
  /** "2026-05". */
  month: string;
  year: TrendYear;
  /** "May". */
  short: string;
  /** "May", "August". */
  name: string;
  /** "May 2026". */
  long: string;
  /** "Aug 2025", as the table prints it. */
  tableLabel: string;
  units: number;
  /** % change on the month before (null for the first month Ohm has). */
  changePct: number | null;
  /** The month before, spelled out: "April". */
  prevName: string | null;
}

export const MONTHS: readonly TrendMonth[] = UNITS_BY_MONTH.map((m: MonthUnits, i) => {
  const index = Number(m.month.slice(5)) - 1;
  const prev = i > 0 ? UNITS_BY_MONTH[i - 1]! : null;
  return {
    month: m.month,
    year: m.year,
    short: MONTH_NAMES[index]!.slice(0, 3),
    name: MONTH_NAMES[index]!,
    long: `${MONTH_NAMES[index]!} ${m.year}`,
    tableLabel: m.label,
    units: m.units,
    changePct: prev ? ((m.units - prev.units) / prev.units) * 100 : null,
    prevName: prev ? MONTH_NAMES[Number(prev.month.slice(5)) - 1]! : null,
  };
});

export const LATEST_MONTH = MONTHS[MONTHS.length - 1]!;

export const monthsOfYear = (year: TrendYear): readonly TrendMonth[] => MONTHS.filter((m) => m.year === year);

/** The month a `?month=may` (with `?year=`) means, or the latest month of that year. */
export function findMonth(year: TrendYear, short: string | null): TrendMonth {
  const list = monthsOfYear(year);
  const wanted = short?.toLowerCase();
  return list.find((m) => m.short.toLowerCase() === wanted) ?? list[list.length - 1]!;
}

export const monthByKey = (key: string): TrendMonth => MONTHS.find((m) => m.month === key) ?? LATEST_MONTH;

export interface Extremes {
  highest: TrendMonth;
  lowest: TrendMonth;
}

export function extremesOf(year: TrendYear): Extremes {
  const list = [...monthsOfYear(year)].sort((a, b) => a.units - b.units);
  return { highest: list[list.length - 1]!, lowest: list[0]! };
}

/** The most units in any month: the "full" end of the little bars in "How August compares". */
export const MAX_UNITS = Math.max(...UNITS_BY_MONTH.map((m) => m.units));

/** Chart scales: the bars are drawn at a fixed px-per-unit so the same month looks the same in every view. */
export const SCALE = {
  /** The grid runs to 4 lakh. */
  gridMax: 400_000,
  compact: 88 / 400_000,
  full: 200 / 400_000,
  /** Rupee bars: July is 100 px tall. */
  rupees: 100 / RUPEES_BY_MONTH[0]!.total,
} as const;

/** "+1.8%" and "-3.6%": the sign and one decimal, as the Figma month table prints it (a plain hyphen). */
export function signedPct(pct: number): string {
  const abs = Math.abs(pct).toFixed(1);
  return `${pct < 0 ? '-' : '+'}${abs}%`;
}

/** Trends draws the usage chart from this many months of bills. */
export const MIN_MONTHS_FOR_CHART = 3;
