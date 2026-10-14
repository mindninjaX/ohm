import { Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Amount, Button, Card, DueLine, ReassuranceRow, Separator, Tile } from '@/components/ohm';
import { DUE_DATE, EARLY_DEADLINE, PAYMENT, SAVING, TOTAL } from '@/data/bill';
import { formatDate, formatINR } from '@/lib/format';
import { PiggyBankIcon } from './icons';

export type BillCardState = 'unpaid' | 'discount-ended' | 'paid';

/**
 * Figma: Bill card / Home (Layout Home | Paid). White card, radius 16: the figures, the due line, the offer tile
 * and the button in a 20 px box, then a separator and the "No hidden charges" row. The total counts up once.
 */
export function BillCardHome({ state }: { state: BillCardState }) {
  const navigate = useNavigate();
  const paid = state === 'paid';
  return (
    <Card padding={0} data-state={state}>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-ink-muted">August bill</p>
          <Amount
            value={paid ? PAYMENT.amount : TOTAL}
            size="l"
            countUp
            countFrom={paid ? PAYMENT.amount * 0.95 : 0}
          />
        </div>
        {paid ? (
          <DueLine tone="paid" size="s">{`Paid ${formatDate(PAYMENT.paidAt)}`}</DueLine>
        ) : (
          <DueLine size="s">{`Due ${formatDate(DUE_DATE)}`}</DueLine>
        )}
        {state === 'unpaid' ? (
          <Tile tone="success-subtle">
            <div className="flex gap-2">
              <span className="grid h-5 w-4 shrink-0 place-items-center text-success">
                <PiggyBankIcon size={16} />
              </span>
              <p className="text-sm font-medium text-ink">
                {`Pay by ${formatDate(EARLY_DEADLINE)} and `}
                <span className="text-success">{`save ${formatINR(SAVING)}`}</span>
              </p>
            </div>
          </Tile>
        ) : (
          <Tile tone="muted">
            <div className="flex gap-2">
              <span className="grid h-5 w-4 shrink-0 place-items-center text-ink-muted">
                <Info size={16} />
              </span>
              <p className="text-sm font-medium text-ink">
                {paid ? 'Waiting for Northgrid to confirm' : `The early-payment discount ended on ${formatDate(EARLY_DEADLINE)}`}
              </p>
            </div>
          </Tile>
        )}
        {paid ? (
          <Button variant="secondary" size="l" onClick={() => navigate('/paid')}>
            View receipt
          </Button>
        ) : (
          <Button variant="primary" size="l" onClick={() => navigate('/bill')}>
            Review and pay
          </Button>
        )}
      </div>
      <Separator inset="20" />
      <ReassuranceRow surface="plain" onClick={() => navigate('/bill/checks')} />
    </Card>
  );
}
