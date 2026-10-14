import type { ScreenMap } from '@/shell';
import { AddBillSheet } from './AddBillSheet';
import { ForwardEmailSheet } from './ForwardEmailSheet';
import { NotificationScreen } from './NotificationScreen';
import { ReadingScreen } from './ReadingScreen';
import { StopReadingSheet } from './StopReadingSheet';

/**
 * The Add bill area: S02 the lock screen notification, S03 and S03.1 the Add a bill sheets, S04 and S04.1
 * Reading, S04.2 the Stop reading sheet. (The shell's screen registry reads `screens` from any file under
 * src/screens/.)
 */
export const screens: ScreenMap = {
  '/notification': NotificationScreen,
  '/add': AddBillSheet,
  '/add/email': ForwardEmailSheet,
  '/reading': ReadingScreen,
  '/reading/stop': StopReadingSheet,
};
