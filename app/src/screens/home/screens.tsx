import type { ScreenMap } from '@/shell';
import { AllBillsScreen } from './AllBillsScreen';
import { HomeScreen } from './HomeScreen';
import { JulyBillScreen } from './JulyBillScreen';
import { SourcesSheet } from './SourcesSheet';
import { TrendsScreen } from './TrendsScreen';

/** The HOME area: Home, All bills, the July bill, the "where these numbers come from" sheet, and Trends. */
export const screens: ScreenMap = {
  '/': HomeScreen,
  '/bills': AllBillsScreen,
  '/bills/july-2026': JulyBillScreen,
  '/home/sources': SourcesSheet,
  '/trends': TrendsScreen,
};
