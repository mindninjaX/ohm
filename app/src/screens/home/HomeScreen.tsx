import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button, Header, ScreenScaffold, SectionHeader, TabBar } from '@/components/ohm';
import { BUSINESS, POWER_COMPANY, VS_JULY } from '@/data/bill';
import { useDemo } from '@/shell';
import { BillCardHome, type BillCardState } from './components/BillCardHome';
import { PaidBillRow } from './components/BillRows';
import { UsageCardHome } from './components/UsageCardHome';

/** S01 Home (and S01.4 Home, after paying, with the `paid` demo flag). */
export function HomeScreen() {
  const navigate = useNavigate();
  const demo = useDemo();
  const state: BillCardState = demo.flags.paid ? 'paid' : demo.afterEarlyDeadline ? 'discount-ended' : 'unpaid';
  const [name, place] = BUSINESS.name.split(', ');
  return (
    <ScreenScaffold
      header={
        <Header
          type="top-level"
          title={name ?? BUSINESS.name}
          subtitle={`${place ?? ''} · ${POWER_COMPANY.split(' ')[0]}`}
          trailing={
            <Button variant="secondary" size="m" onClick={() => navigate('/add')}>
              <Plus size={16} aria-hidden className="max-[380px]:hidden" />
              Add bill
            </Button>
          }
        />
      }
      footer={<TabBar value="bills" />}
      contentClassName="pt-3 pb-[21px]"
    >
      <BillCardHome state={state} />
      <UsageCardHome unitsPct={VS_JULY.unitsPct} />
      <section className="flex flex-col gap-1">
        <SectionHeader title="Past bills" link="All bills" onLinkClick={() => navigate('/bills')} />
        <PaidBillRow onClick={() => navigate('/bills/july-2026')} />
      </section>
    </ScreenScaffold>
  );
}
