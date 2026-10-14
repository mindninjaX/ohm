import { Share } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button, Footer, Header, ScreenScaffold } from '@/components/ohm';
import { EARLY_PRICE, TOTAL } from '@/data/bill';
import { formatINR } from '@/lib/format';
import { useDemo } from '@/shell';
import { BillCardAfterEarly, BillCardPaid, BillCardSummary } from './components/BillCard';
import { PriceLadder } from './components/PriceLadder';
import { JulyChangeCard, PartsCard } from './components/SummaryCards';

/** The ladder's rail starts drawing once the card's shrink has mostly landed (strike at 0.6 s, shrink 1.0 to 1.6 s). */
const LADDER_DELAY = 1.45;

/**
 * S06 Bill summary, and S06.1 (the same screen once the demo date is after Tue 8 Sep: the
 * discount is gone, the card and the ladder say so and the button pays the full bill).
 *
 * Before the deadline the bill card plays Summary > Summary discounted after 600 ms (see BillCard),
 * then the ladder rail draws, and the bars on the two cards below grow as they scroll into view.
 *
 * Once the bill is paid (the demo flag `paid`, set by /pay; Back from Paid or Home lands here) the card says so,
 * the price ladder goes (there is nothing left to time) and the footer offers the receipt instead of a second payment.
 * That is S06.2 (Bill card / Home, Layout Summary paid; View receipt is a Secondary L with no Razorpay trust line).
 */
export function BillSummary() {
  const navigate = useNavigate();
  const { afterEarlyDeadline, flags } = useDemo();
  const paid = flags.paid;
  const payAmount = afterEarlyDeadline ? TOTAL : EARLY_PRICE;
  const openChecks = () => navigate('/bill/checks');

  return (
    <ScreenScaffold
      contentClassName="pt-6 pb-6"
      header={
        <Header
          title="August bill"
          subtitle="Northgrid Electric"
          backTo="/"
          trailing={
            <Button variant="secondary" size="m" onClick={() => navigate('/connection')}>
              Your connection
            </Button>
          }
        />
      }
      footer={
        <Footer trustLine={!paid}>
          {paid ? (
            <Button variant="secondary" onClick={() => navigate('/paid')}>
              View receipt
            </Button>
          ) : (
            <Button onClick={() => navigate('/pay')}>Pay {formatINR(payAmount)}</Button>
          )}
        </Footer>
      }
    >
      {paid ? (
        <BillCardPaid onOpenChecks={openChecks} />
      ) : afterEarlyDeadline ? (
        <BillCardAfterEarly onOpenChecks={openChecks} />
      ) : (
        <BillCardSummary onOpenChecks={openChecks} />
      )}
      {!paid && (
        <PriceLadder mode={afterEarlyDeadline ? 'after-early' : 'start'} delay={afterEarlyDeadline ? 0.3 : LADDER_DELAY} />
      )}
      <Button variant="secondary" leftIcon={Share} onClick={() => navigate('/bill/share')}>
        Share with owner
      </Button>
      <JulyChangeCard onSeeTrends={() => navigate('/trends')} />
      <PartsCard onSeeBreakdown={() => navigate('/bill/breakdown')} />
    </ScreenScaffold>
  );
}
