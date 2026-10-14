import { ChevronRight, CircleCheck } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button, Header, ScreenScaffold, Separator } from '@/components/ohm';
import {
  BEFORE_TAXES,
  DUTY,
  PARTS,
  PEAK_DEMAND_KVA,
  RATES,
  RULES,
  SALES_TAX,
  TIME_OF_DAY,
  TOTAL,
  TOTAL_BEFORE_ROUNDING,
  UNITS,
  type PartId,
} from '@/data/bill';
import { formatINR, formatUnits } from '@/lib/format';
import { BillCardCompact } from './components/BillCard';
import { DetailLine, PartRow, SplitBar, SplitBlock, SubtotalRow } from './components/BreakdownParts';

/** The parts whose name carries an info icon, and what each one means in plain words. */
const INFO: Partial<Record<PartId, { param: string; text: string }>> = {
  fuel: {
    param: 'fuel',
    text: 'An extra charge for changes in the cost of the fuel that makes your power.',
  },
  wires: {
    param: 'wires',
    text: "A fee for using Northgrid's network of poles and wires to bring the power to you.",
  },
  'booked-capacity': {
    param: 'capacity',
    text: 'Rent for the most power you can draw. It is charged on your peak use, or on 75% of what you booked if that is more.',
  },
};

const part = (id: PartId) => PARTS.find((p) => p.id === id)!;
const share = (id: PartId) => `${part(id).sharePct}%`;
const perUnit = (rate: number) => `${formatUnits(UNITS)} units × ${formatINR(rate, { decimals: 2 })} per unit`;

/**
 * S08 Breakdown, and S08c (an info icon tapped: `?info=fuel` opens the popover at once). The bill total,
 * then every part of the bill with its maths and its share, the five charges added to "Before taxes", the
 * taxes, last month's credit and the total with the ₹10 rounding shown. Numbers come from the data module.
 */
export function Breakdown() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [openInfo, setOpenInfo] = useState<string | null>(() => {
    const asked = params.get('info');
    return Object.values(INFO).some((i) => i?.param === asked) ? asked : null;
  });
  const closeInfo = useCallback(() => setOpenInfo(null), []);

  const rowProps = (id: PartId) => {
    const info = INFO[id];
    return info
      ? {
          info: info.text,
          infoOpen: openInfo === info.param,
          onInfoToggle: () => setOpenInfo((now) => (now === info.param ? null : info.param)),
          onInfoClose: closeInfo,
        }
      : {};
  };

  const maxAbs = Math.max(...Object.values(TIME_OF_DAY).map(Math.abs));
  const timeOfDay = part('time-of-day');
  const taxes = part('taxes');
  const balance = part('balance');

  return (
    <ScreenScaffold
      contentClassName="pt-6 pb-[calc(var(--safe-bottom,34px)+24px)]"
      header={<Header title="Full breakdown" backTo="/bill" />}
    >
      <BillCardCompact eyebrow="Bill total" />

      <div data-slot="breakdown-table" className="rounded-2xl bg-card">
        <p className="px-4 pt-4 text-sm font-medium text-ink-muted">Charges</p>

        <PartRow
          id="electricity"
          name={part('electricity').label}
          amount={formatINR(part('electricity').amount)}
          maths={perUnit(RATES.electricity)}
          share={share('electricity')}
          barPct={part('electricity').sharePct ?? 0}
        />
        <Separator inset="16" />
        <PartRow
          id="fuel"
          name={part('fuel').label}
          amount={formatINR(part('fuel').amount)}
          maths={perUnit(RATES.fuel)}
          share={share('fuel')}
          barPct={part('fuel').sharePct ?? 0}
          barDelay={0.05}
          {...rowProps('fuel')}
        />
        <Separator inset="16" />
        <PartRow
          id="wires"
          name={part('wires').label}
          amount={formatINR(part('wires').amount)}
          maths={perUnit(RATES.wires)}
          share={share('wires')}
          barPct={part('wires').sharePct ?? 0}
          barDelay={0.1}
          {...rowProps('wires')}
        />
        <Separator inset="16" />
        <PartRow
          id="booked-capacity"
          name={part('booked-capacity').label}
          amount={formatINR(part('booked-capacity').amount)}
          maths={`Peak ${PEAK_DEMAND_KVA} kVA × ${formatINR(RULES.perKva)} per kVA`}
          share={share('booked-capacity')}
          barPct={part('booked-capacity').sharePct ?? 0}
          barDelay={0.15}
          {...rowProps('booked-capacity')}
        />
        <Separator inset="16" />
        <PartRow
          id="time-of-day"
          name={timeOfDay.label}
          amount={formatINR(timeOfDay.amount)}
          maths="Evenings add most, nights take off"
          share={share('time-of-day')}
          barPct={timeOfDay.sharePct ?? 0}
          barMinPx={2}
          barDelay={0.2}
        >
          <SplitBlock>
            <SplitBar
              name="Mornings"
              amount={formatINR(TIME_OF_DAY.mornings, { signed: true })}
              value={TIME_OF_DAY.mornings}
              maxAbs={maxAbs}
              delay={0.1}
            />
            <SplitBar
              name="Evenings"
              amount={formatINR(TIME_OF_DAY.evenings, { signed: true })}
              value={TIME_OF_DAY.evenings}
              maxAbs={maxAbs}
              delay={0.2}
            />
            <SplitBar
              name="Nights"
              amount={formatINR(TIME_OF_DAY.nights, { signed: true })}
              value={TIME_OF_DAY.nights}
              maxAbs={maxAbs}
              delay={0.3}
            />
          </SplitBlock>
        </PartRow>

        <SubtotalRow
          className="my-2"
          name="Before taxes"
          amount={formatINR(BEFORE_TAXES)}
          maths="Sum of the five charges above"
        />

        <PartRow
          id="taxes"
          name={taxes.label}
          amount={formatINR(taxes.amount)}
          maths="State duty plus sales tax"
          share={share('taxes')}
          barPct={taxes.sharePct ?? 0}
        >
          <SplitBlock>
            <DetailLine
              name="State electricity duty"
              amount={formatINR(DUTY)}
              detail={`${RULES.dutyPct}% of ${formatINR(BEFORE_TAXES)} (Before taxes)`}
            />
            <DetailLine
              name="Sales tax"
              amount={formatINR(SALES_TAX)}
              detail={`${formatUnits(UNITS)} units × ${Math.round(RULES.salesTaxPerUnit * 100)} paise per unit`}
            />
          </SplitBlock>
        </PartRow>
        <Separator inset="16" />
        <PartRow
          id="balance"
          name={balance.label}
          amount={formatINR(balance.amount)}
          amountClassName="text-success"
          maths="July's fuel charge was revised down"
        />

        <SubtotalRow
          className="mt-2 mb-4"
          name="Bill total"
          amount={formatINR(TOTAL)}
          maths={`Your parts add up to ${formatINR(TOTAL_BEFORE_ROUNDING)}. Northgrid rounds down to the nearest ${formatINR(RULES.roundDownToRupees)}.`}
        />
      </div>

      <div className="flex gap-2">
        <span className="grid h-5 w-4 shrink-0 place-items-center text-success">
          <CircleCheck size={16} aria-hidden />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-sm text-ink-muted">Ohm checked this bill before showing it to you.</p>
          <div className="h-8">
            <Button
              variant="link"
              size="m"
              rightIcon={ChevronRight}
              className="relative -top-1 -left-1"
              onClick={() => navigate('/bill/checks')}
            >
              What Ohm checked
            </Button>
          </div>
        </div>
      </div>
    </ScreenScaffold>
  );
}
