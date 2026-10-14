import type { ScreenMap } from '@/shell';
import { AskScreen } from './AskScreen';
import { ConnectionScreen } from './ConnectionScreen';
import { FixScreen } from './FixScreen';
import { OnYourBillScreen } from './OnYourBillScreen';
import { WrongSheet } from './WrongSheet';

/**
 * The Connection area. S05 Your connection (rows closed, open with ?open=all, set by you with ?changed=set, sent with
 * ?changed=sent), the What looks off sheet (S05.1), On your bill (S05.2), Fix contract demand (S05.3) and Ask the Ohm team (S05.4).
 */
export const screens: ScreenMap = {
  '/connection': ConnectionScreen,
  '/connection/wrong': WrongSheet,
  '/connection/on-your-bill': OnYourBillScreen,
  '/connection/fix': FixScreen,
  '/connection/ask': AskScreen,
};
