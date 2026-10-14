import { useNavigate } from 'react-router';
import { Card, Header, ScreenScaffold, SectionHeader, Separator, TabBar } from '@/components/ohm';
import { PAYMENT, SAVING } from '@/data/bill';
import { formatDate } from '@/lib/format';
import { useDemo } from '@/shell';
import { PaidBillRow, ToPayBillRow } from './components/BillRows';
import { EmptyNote } from './components/EmptyNote';

/** S01.1 All bills: what is still to pay, what has been paid in 2026, and a note about earlier bills. */
export function AllBillsScreen() {
  const navigate = useNavigate();
  const demo = useDemo();
  const paid = demo.flags.paid;
  const july = <PaidBillRow surface={paid ? 'plain' : 'card'} onClick={() => navigate('/bills/july-2026')} />;
  return (
    <ScreenScaffold
      header={<Header type="back" title="All bills" backTo="/" />}
      footer={<TabBar value="bills" />}
      contentClassName="pt-3 pb-[21px]"
    >
      {!paid && (
        <section className="flex flex-col gap-1">
          <SectionHeader title="To pay" />
          <ToPayBillRow discountEnded={demo.afterEarlyDeadline} onClick={() => navigate('/bill')} />
        </section>
      )}
      <section className="flex flex-col gap-1">
        <SectionHeader title="Paid in 2026" />
        {paid ? (
          <Card padding={0}>
            <PaidBillRow
              surface="plain"
              title="August 2026"
              paidOn={formatDate(PAYMENT.paidAt)}
              amount={PAYMENT.amount}
              saved={SAVING}
              onClick={() => navigate('/paid')}
            />
            <Separator inset="left-68" />
            {july}
          </Card>
        ) : (
          july
        )}
      </section>
      <EmptyNote
        title="Bills before July 2026"
        body="Ohm started with your July 2026 bill, so earlier bills are not listed. Your units back to August 2025 are in Trends."
        link="See usage in Trends"
        onLinkClick={() => navigate('/trends')}
      />
    </ScreenScaffold>
  );
}
