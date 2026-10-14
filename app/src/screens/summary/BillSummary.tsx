import { Share } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button, Footer, Header, ScreenScaffold } from '@/components/ohm';
import { EARLY_PRICE, TOTAL } from '@/data/bill';
import { formatINR } from '@/lib/format';
import { useDemo } from '@/shell';
import { BillCardAfterEarly, BillCardSummary } from './components/BillCard';
import { PriceLadder } from './components/PriceLadder';
import { JulyChangeCard, PartsCard } from './components/SummaryCards';

/**
 * S06 Bill summary, and S06.1 (the same screen once the demo date is after Tue 8 Sep: the
 * discount is gone, the card and the ladder say so and the button pays the full bill).
 *
 * Before the deadline the bill card plays Summary > Summary discounted after 600 ms (see BillCard),
 * then the ladder rail draws, and the bars on the two cards below grow as they scroll into view.
 */
export function BillSummary() {
  const navigate = useNavigate();
  const { afterEarlyDeadline } = useDemo();
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
        <Footer trustLine>
          <Button onClick={() => navigate('/pay')}>Pay {formatINR(payAmount)}</Button>
        </Footer>
      }
    >
      {afterEarlyDeadline ? (
        <BillCardAfterEarly onOpenChecks={openChecks} />
      ) : (
        <BillCardSummary onOpenChecks={openChecks} />
      )}
      <PriceLadder mode={afterEarlyDeadline ? 'after-early' : 'start'} delay={afterEarlyDeadline ? 0.3 : 1.05} />
      <Button variant="secondary" leftIcon={Share} onClick={() => navigate('/bill/share')}>
        Share with owner
      </Button>
      <JulyChangeCard onSeeTrends={() => navigate('/trends')} />
      <PartsCard onSeeBreakdown={() => navigate('/bill/breakdown')} />
    </ScreenScaffold>
  );
}
