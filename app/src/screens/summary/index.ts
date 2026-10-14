import type { ScreenMap } from '@/shell';
import { BillSummary } from './BillSummary';
import { Breakdown } from './Breakdown';
import { Checks } from './Checks';

/** Summary area: S06 and S06.1 (/bill), S07 (/bill/checks), S08 and S08c (/bill/breakdown). */
export const screens: ScreenMap = {
  '/bill': BillSummary,
  '/bill/checks': Checks,
  '/bill/breakdown': Breakdown,
};
