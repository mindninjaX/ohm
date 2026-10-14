/**
 * Formatting for everything Ohm shows. Indian digit grouping (lakh, crore), the rupee
 * sign, a true minus sign (U+2212) and dates in India time, so a number or a date reads
 * the same on every machine.
 */

const MINUS = '−';
const TIME_ZONE = 'Asia/Kolkata';

const numberFormats = new Map<number, Intl.NumberFormat>();
function indian(decimals: number): Intl.NumberFormat {
  let f = numberFormats.get(decimals);
  if (!f) {
    f = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    numberFormats.set(decimals, f);
  }
  return f;
}

export interface FormatINROptions {
  /** Fixed decimals. Default: none for whole rupees, two for anything else (₹6.90). */
  decimals?: number;
  /** Put "+" in front of positive amounts (₹22,800 becomes +₹22,800). */
  signed?: boolean;
}

/** formatINR(3642160) is "₹36,42,160"; formatINR(-196) is "−₹196". */
export function formatINR(n: number, { decimals, signed = false }: FormatINROptions = {}): string {
  const d = decimals ?? (Number.isInteger(n) ? 0 : 2);
  const abs = Math.abs(n);
  const isZero = Number(abs.toFixed(d)) === 0;
  const sign = isZero ? '' : n < 0 ? MINUS : signed ? '+' : '';
  return `${sign}₹${indian(d).format(abs)}`;
}

/** formatUnits(326500) is "3,26,500"; with `label` it is "3,26,500 units". */
export function formatUnits(n: number, { label = false }: { label?: boolean } = {}): string {
  const body = `${n < 0 ? MINUS : ''}${indian(0).format(Math.abs(n))}`;
  return label ? `${body} ${Math.abs(n) === 1 ? 'unit' : 'units'}` : body;
}

/** formatPct(1.4998) is "1.5%"; the number is already a percent (1.5 means 1.5%). */
export function formatPct(n: number, decimals = 1): string {
  const abs = Math.abs(n);
  const isZero = Number(abs.toFixed(decimals)) === 0;
  return `${n < 0 && !isZero ? MINUS : ''}${abs.toFixed(decimals)}%`;
}

export interface FormatDateOptions {
  /** Add the year: "Thu 3 Sep 2026". */
  year?: boolean;
  /** Add the time: "Thu 3 Sep 2026, 11:42 AM" (the year comes with it). */
  time?: boolean;
}

/**
 * formatDate('2026-09-08') is "Tue 8 Sep"; with `time` it is "Thu 3 Sep 2026, 11:42 AM".
 * Takes a Date or an ISO string. A date-only string ("2026-09-08") means that day in India.
 */
export function formatDate(input: Date | string, { year = false, time = false }: FormatDateOptions = {}): string {
  const date = typeof input === 'string' ? parseDate(input) : input;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
  let out = `${get('weekday')} ${get('day')} ${get('month')}`;
  if (year || time) out += ` ${get('year')}`;
  if (time) out += `, ${get('hour')}:${get('minute')} ${get('dayPeriod').toUpperCase()}`;
  return out;
}

function parseDate(value: string): Date {
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00+05:30` : value);
}
