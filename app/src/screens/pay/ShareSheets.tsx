import { SheetPanel } from '@/components/ohm';
import { ShareSheetBody } from './components/ShareSheetBody';

/**
 * S09 Share (9:7722), a sheet over /bill: "Share with owner", the unpaid bill as a card, then WhatsApp, Email and
 * Copy link. The shell adds the scrim, the spring and the drag; SheetPanel is Ohm / Sheet in its Flush padding.
 */
export function ShareWithOwnerSheet() {
  return (
    <SheetPanel title="Share with owner" flush>
      <ShareSheetBody payment="unpaid" />
    </SheetPanel>
  );
}

/** S11.1 Share receipt (28:40406), a sheet over /paid: the same sheet with the receipt card. */
export function ShareReceiptSheet() {
  return (
    <SheetPanel title="Share receipt" flush>
      <ShareSheetBody payment="paid" />
    </SheetPanel>
  );
}
