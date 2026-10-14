import type { ScreenMap } from '@/shell';
import { PaidScreen } from './PaidScreen';
import { PayScreen } from './PayScreen';
import { ShareReceiptSheet, ShareWithOwnerSheet } from './ShareSheets';

/** The Pay area: the share sheet over the bill (S09, S09.1), the Razorpay step, Paid (S11) and its share sheet (S11.1). */
export const screens: ScreenMap = {
  '/bill/share': ShareWithOwnerSheet,
  '/pay': PayScreen,
  '/paid': PaidScreen,
  '/paid/share': ShareReceiptSheet,
};
