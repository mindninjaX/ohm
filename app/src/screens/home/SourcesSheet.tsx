import { Zap } from 'lucide-react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button, IconTile, Separator, SheetPanel } from '@/components/ohm';
import { useSheetClose } from '@/shell';
import { BillToChart } from '@/illustrations';
import { IndianRupeeIcon } from './components/icons';

function SourceRow({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-3 py-3">
      <span className="grid size-10 shrink-0 place-items-center">{icon}</span>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-base font-medium text-ink">{title}</p>
        <p className="text-sm text-ink-muted">{body}</p>
      </div>
    </div>
  );
}

/** S01.3 Where these numbers come from: which months have units, which have rupees, and why. A sheet over Home or Trends. */
export function SourcesSheet() {
  const navigate = useNavigate();
  const close = useSheetClose();
  const fromTrends = (useLocation().state as { from?: string } | null)?.from === 'trends';
  return (
    <SheetPanel title="Where these numbers come from">
      <div className="flex flex-col">
        <div className="flex justify-center py-2">
          <BillToChart width={300} />
        </div>
        <SourceRow
          icon={<IconTile icon={Zap} tone="primary" size={36} />}
          title="Units: Aug 2025 to Aug 2026"
          body="Your August bill lists the units used each month since August 2025."
        />
        <div className="pl-[52px]">
          <Separator />
        </div>
        <SourceRow
          icon={<IconTile icon={IndianRupeeIcon} tone="muted" size={36} />}
          title="Rupees: from July 2026"
          body="Rupees are bill totals, before any early-payment discount. Ohm has them from your July 2026 bill, the first one it read."
        />
      </div>
      <Button variant="secondary" size="l" onClick={() => (fromTrends ? close() : navigate('/trends', { replace: true }))}>
        See every month in Trends
      </Button>
    </SheetPanel>
  );
}
