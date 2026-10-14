import { useNavigate, useLocation } from 'react-router';
import { Button, Footer, ScreenScaffold } from '@/components/ohm';
import { useChromeTone, useDemo } from '@/shell';
import { ShareIcon } from './components/icons';
import { SharePaidReceiptCard } from './components/SharePaidReceiptCard';
import { SharePaidResult } from './components/SharePaidResult';
import { cameFromPay } from './paidState';

/** The grey page colour (`surface-muted`), for the browser bar on a phone: this screen has no white header. */
const PAGE_COLOR = '#f1f2f4';

/**
 * S11 Paid (9:7820), /paid. No header: the page colour runs up under the status bar. The paid bill with its check,
 * "Paid ₹36,09,190", the date, "You saved ₹32,970", the receipt card, and a footer with Share receipt (opens the
 * share sheet, /paid/share) and Done (back to Home with the August bill shown as paid).
 */
export function PaidScreen() {
  useChromeTone({ themeColor: PAGE_COLOR });
  const navigate = useNavigate();
  const location = useLocation();
  const { setFlag } = useDemo();

  const done = () => {
    setFlag('paid', true);
    // Arrived from the loader: Home is the entry just before this one, so pop to it (it plays as a Back).
    if (cameFromPay(location.state)) navigate(-1);
    else navigate('/', { replace: true, state: { ohmDirection: 'back' } });
  };

  return (
    <ScreenScaffold
      stagger={false}
      footer={
        <Footer>
          <Button leftIcon={ShareIcon} onClick={() => navigate('/paid/share')}>
            Share receipt
          </Button>
          <Button variant="link" onClick={done}>
            Done
          </Button>
        </Footer>
      }
    >
      <SharePaidResult />
      <SharePaidReceiptCard />
    </ScreenScaffold>
  );
}
