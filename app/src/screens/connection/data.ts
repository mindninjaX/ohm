/**
 * What the Connection screens show and the small bit of state they share. Every figure comes from
 * the data module (DATA.md) and is formatted with format.ts: nothing is typed here.
 */
import { useSyncExternalStore } from 'react';
import {
  BILL_MONTH,
  BUSINESS,
  CATEGORY,
  CONNECTED_SINCE,
  CONTRACT_DEMAND_KVA,
  DEMO_TODAY,
  METER_MULTIPLIER,
  PEAK_DEMAND_KVA,
  POWER_COMPANY,
  UNITS,
} from '@/data/bill';
import { formatUnits } from '@/lib/format';

export type DetailId =
  | 'contract-demand'
  | 'meter-multiplier'
  | 'category'
  | 'power-company'
  | 'connected-since';

export type DetailVisual = 'capacity' | 'equation' | 'fit' | 'none';

export interface Detail {
  id: DetailId;
  label: string;
  /** What the row and the printed bill crop show. */
  value: string;
  /** The line under the label on the Connection screen. */
  helper: string;
  visual: DetailVisual;
  /** The two numbers that change money can be fixed by hand; the others go to the Ohm team. */
  fixable: boolean;
  /** For the fixable ones: the number and what it is counted in ('kVA', or none). */
  amount?: number;
  unit?: string;
  /** "What it means" on the On your bill screen. */
  meaning: string;
}

/** "3 Mar 2021": the day, the short month and the year, in India time. */
export function formatDayMonthYear(isoDate: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).formatToParts(new Date(`${isoDate}T00:00:00+05:30`));
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('day')} ${get('month')} ${get('year')}`;
}

export const kva = (n: number): string => `${formatUnits(n)} kVA`;

/** "Connected for 5 years and 6 months", counted from the connection day to the demo's today. */
export function connectedFor(): string {
  const [fy, fm] = CONNECTED_SINCE.split('-').map(Number);
  const [ty, tm] = DEMO_TODAY.split('-').map(Number);
  const months = (ty! - fy!) * 12 + (tm! - fm!);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
  return rest === 0
    ? `Connected for ${plural(years, 'year')}`
    : `Connected for ${plural(years, 'year')} and ${plural(rest, 'month')}`;
}

export const DETAILS: readonly Detail[] = [
  {
    id: 'contract-demand',
    label: 'Contract demand',
    value: kva(CONTRACT_DEMAND_KVA),
    helper: 'The power you booked from Northgrid',
    visual: 'capacity',
    fixable: true,
    amount: CONTRACT_DEMAND_KVA,
    unit: 'kVA',
    meaning: 'The most power you can use at one time. Above it, Northgrid charges a penalty.',
  },
  {
    id: 'meter-multiplier',
    label: 'Meter multiplier',
    value: formatUnits(METER_MULTIPLIER),
    helper: 'Turns your meter count into units',
    visual: 'equation',
    fixable: true,
    amount: METER_MULTIPLIER,
    meaning: `Your meter counts in small steps. Northgrid multiplies the count by ${formatUnits(METER_MULTIPLIER)} to get the units you pay for.`,
  },
  {
    id: 'category',
    label: 'Category',
    value: CATEGORY,
    helper: 'Your rate plan. HT means high voltage.',
    visual: 'fit',
    fixable: false,
    meaning: `The rate plan Northgrid bills you on. HT means a high voltage supply. ${CATEGORY} is right for a ${BUSINESS.kind}.`,
  },
  {
    id: 'power-company',
    label: 'Power company',
    value: POWER_COMPANY,
    helper: 'Supplies your power and sends this bill',
    visual: 'none',
    fixable: false,
    meaning: 'The company that supplies your power and sends this bill.',
  },
  {
    id: 'connected-since',
    label: 'Connected since',
    value: formatDayMonthYear(CONNECTED_SINCE),
    helper: 'When this supply was switched on',
    visual: 'none',
    fixable: false,
    meaning: 'The day Northgrid switched on this supply. It should be the same on every bill.',
  },
];

export function detailById(id: string | null | undefined): Detail {
  return DETAILS.find((d) => d.id === id) ?? DETAILS[0]!;
}

/** "Page 1 of your August bill": the August bill's month name without the year. */
export const BILL_MONTH_NAME = BILL_MONTH.split(' ')[0]!;
export const PRINTED_ON = `Printed on page 1 of your ${BILL_MONTH_NAME} bill`;
export const PAGE_NOTE = `Page 1 of your ${BILL_MONTH_NAME} bill`;
export const PEAK_LABEL = `Your ${BILL_MONTH_NAME} peak`;

/** The August consumption, for the meter equation's caption. */
export const MONTH_UNITS_NOTE = `In ${BILL_MONTH_NAME}: ${formatUnits(UNITS, { label: true })}`;

/** Business types (the pull-down on Your connection), and which ones fit an HT Commercial rate plan. */
export const BUSINESS_TYPES = [
  'Hotel',
  'Restaurant',
  'Hospital',
  'Office',
  'Shop or mall',
  'Factory',
  'School or college',
  'Something else',
] as const;
export type BusinessType = (typeof BUSINESS_TYPES)[number];
export const DEFAULT_BUSINESS: BusinessType = 'Hotel';
const DOES_NOT_FIT: readonly BusinessType[] = ['Factory', 'Something else'];

export function businessFit(type: BusinessType): { fits: boolean; label: string } {
  return DOES_NOT_FIT.includes(type)
    ? { fits: false, label: 'Check with Northgrid' }
    : { fits: true, label: `Fits a ${type.toLowerCase()}` };
}

/** What the capacity bar needs: the peak used and the power booked. */
export const CAPACITY = { peak: PEAK_DEMAND_KVA, booked: CONTRACT_DEMAND_KVA } as const;

// ------------------------------------------------------------------ what the person changed

/** 'set': the number was set from the agreement. 'sent': the Ohm team is checking it. */
export type RowChange = 'set' | 'sent';

export interface ConnectionChange {
  kind: RowChange;
  detail: DetailId;
  /** For 'set': the number typed, in kVA (or the multiplier). */
  value?: number;
  /** For 'set': where the number came from. */
  source?: 'agreement' | 'bill';
}

/** The number as the row shows it: "700 kVA" for contract demand, "2,000" for the meter multiplier. */
export function formatAmount(detail: Detail, n: number): string {
  return detail.unit ? `${formatUnits(n)} ${detail.unit}` : formatUnits(n);
}

type Listener = () => void;
let change: ConnectionChange | null = null;
const listeners = new Set<Listener>();

export function getChange(): ConnectionChange | null {
  return change;
}
export function setChange(next: ConnectionChange | null): void {
  change = next;
  listeners.forEach((l) => l());
}
function subscribe(l: Listener): () => void {
  listeners.add(l);
  return () => void listeners.delete(l);
}
export function useChange(): ConnectionChange | null {
  return useSyncExternalStore(subscribe, getChange, getChange);
}
