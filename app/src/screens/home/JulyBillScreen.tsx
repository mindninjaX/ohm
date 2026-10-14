import { FileText, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Alert, Button, Header, IconTile, ListRow, ScreenScaffold, TabBar, toast } from '@/components/ohm';
import { JULY_BILL, JULY_SAVING } from '@/data/bill';
import { formatDate, formatINR, formatUnits } from '@/lib/format';
import { PaidBillHero } from './components/PaidBillHero';
import { PiggyBankIcon } from './components/icons';

/** S01.2 July bill: what was paid, what paying early saved, the usage, and the PDF (simulated). */
export function JulyBillScreen() {
  const navigate = useNavigate();
  return (
    <ScreenScaffold
      header={
        <Header
          type="back"
          title="July 2026"
          backTo="/bills"
          trailing={
            <Button variant="secondary" size="m" onClick={() => navigate('/connection')}>
              Your connection
            </Button>
          }
        />
      }
      footer={<TabBar value="bills" />}
      contentClassName="pt-3 pb-[21px]"
    >
      <PaidBillHero amount={JULY_BILL.paid} paidOn={formatDate(JULY_BILL.paidOn)} />
      <Alert tone="success" icon={PiggyBankIcon} title={`Saved ${formatINR(JULY_SAVING)} by paying early`} />
      <ListRow
        surface="card"
        leading={<IconTile icon={Zap} tone="primary" size={36} />}
        title="Electricity used"
        subtitle={`${formatUnits(JULY_BILL.units)} units in July`}
        chevron={false}
        action={
          <Button variant="link" size="m" onClick={() => navigate('/trends?month=jul')}>
            See trends
          </Button>
        }
      />
      <Button variant="secondary" size="l" leftIcon={FileText} onClick={() => toast.success('Opening the July bill PDF')}>
        View bill PDF
      </Button>
    </ScreenScaffold>
  );
}
