import { ChevronRight, FileSearch } from 'lucide-react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Button, Header, IconTile, ListRow, ScreenScaffold } from '@/components/ohm';
import {
  BEFORE_TAXES,
  BUSINESS,
  CATEGORY,
  CHECKS,
  CONTRACT_DEMAND_KVA,
  EARLY_DEADLINE,
  EARLY_DISCOUNT_ROUNDED,
  METER_MULTIPLIER,
  PARTS,
  PEAK_DEMAND_KVA,
  POWER_FACTOR,
  RATES,
  RULES,
  SAVING,
  UNITS,
} from '@/data/bill';
import { formatDate, formatINR, formatUnits } from '@/lib/format';
import { BillIllustration } from '@/illustrations';
import {
  BusinessTile,
  CheckCard,
  CompareTile,
  HeadroomTile,
  MeterChain,
  ReceiptTile,
} from './components/CheckCard';

/** A section title with the line of plain words under it (Figma: Ohm / Section header, Trailing None). */
function GroupHeading({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-base font-semibold text-ink-strong">{title}</h2>
      <p className="text-sm text-ink-muted">{children}</p>
    </div>
  );
}

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * S07 Checks, "What Ohm checked". The result first (the bill illustration with its check, "No hidden
 * charges or penalties"), then the six checks in two groups, each with the proof underneath it, then a
 * way into how Ohm read the bill. Every number comes from the data module.
 */
export function Checks() {
  const navigate = useNavigate();
  const electricity = PARTS[0]!;
  const kva = `${CONTRACT_DEMAND_KVA} kVA`;
  const bookedShare = (PEAK_DEMAND_KVA / CONTRACT_DEMAND_KVA) * 100;

  return (
    <ScreenScaffold
      contentClassName="pb-[calc(var(--safe-bottom,34px)+24px)]"
      header={<Header title="What Ohm checked" backTo="/bill" />}
    >
      {/* The hero: the bill with its check, and what it means. */}
      <section className="flex flex-col items-center gap-4 pt-2">
        {/* Figma rasterises the art a quarter pixel up and to the left of where the browser puts it (x 60.5). */}
        <BillIllustration
          status="done"
          size="compact"
          focus="checks"
          width={240}
          className="[transform:translate(-0.25px,0.25px)]"
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-semibold text-ink-strong">
            No hidden charges
            <br />
            or penalties
          </h2>
          <p className="text-base text-ink-muted">
            Ohm redid the maths. All {CHECKS.length} checks are fine.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <GroupHeading title="Is the maths right?">Redone with the rates the state regulator approved.</GroupHeading>
        <CheckCard
          index={0}
          title="Charges add up"
          result="Every line is your meter reading times the approved rate."
        >
          <ReceiptTile
            rows={[
              ['Units used', formatUnits(UNITS)],
              ['Approved rate per unit', `× ${formatINR(RATES.electricity)}`],
            ]}
            result={['Electricity used', formatINR(electricity.amount)]}
          />
          <Button
            variant="link"
            size="m"
            rightIcon={ChevronRight}
            className="self-start"
            onClick={() => navigate('/bill/breakdown')}
          >
            See the breakdown
          </Button>
        </CheckCard>
        <CheckCard
          index={1}
          title="Discount worked out right"
          result={`You save ${formatINR(SAVING)} if you pay by ${formatDate(EARLY_DEADLINE)}.`}
        >
          <ReceiptTile
            rows={[
              ['Bill before taxes', formatINR(BEFORE_TAXES)],
              ['Early-payment discount', `× ${RULES.earlyDiscountPct}%`],
            ]}
            result={[`${RULES.earlyDiscountPct}% comes to`, formatINR(EARLY_DISCOUNT_ROUNDED)]}
          />
          <div className="flex flex-col gap-0.5">
            <p className="text-xl font-semibold text-success">{formatINR(SAVING)}</p>
            <p className="text-sm text-ink-muted">
              less to pay. Both totals are rounded down to the nearest {formatINR(RULES.roundDownToRupees)}.
            </p>
          </div>
        </CheckCard>
      </section>

      <section className="flex flex-col gap-4">
        <GroupHeading title="Did anything change?">
          Compared with your first bill.
          <br />
          If one changes, we tell you.
        </GroupHeading>
        <CheckCard index={0} title="Contract demand unchanged" result={`${kva}, same as your first bill.`}>
          <CompareTile
            rows={[
              { label: 'First bill', value: kva, pct: 100, tone: 'first' },
              { label: 'This bill', value: kva, pct: 100, tone: 'this' },
            ]}
          />
        </CheckCard>
        <CheckCard
          index={1}
          title="Category fits your business"
          result={`${CATEGORY} is right for a ${BUSINESS.kind}.`}
        >
          <BusinessTile
            rows={[
              ['Your business', capitalise(BUSINESS.kind)],
              ['Your rate plan', CATEGORY],
            ]}
            badge={`Fits a ${BUSINESS.kind}`}
          />
        </CheckCard>
        <CheckCard
          index={2}
          title="Meter multiplier unchanged"
          result={`${formatUnits(METER_MULTIPLIER)}, same as your first bill.`}
        >
          <MeterChain
            from="Meter count"
            fromCaption="on your meter"
            operator={`× ${formatUnits(METER_MULTIPLIER)}`}
            to={formatUnits(UNITS)}
            toCaption="units billed"
          />
        </CheckCard>
      </section>

      <CheckCard
        index={0}
        title="No penalties"
        result={`Peak ${PEAK_DEMAND_KVA} of ${kva}. Power factor ${POWER_FACTOR}.`}
      >
        <HeadroomTile
          peakLabel="Peak demand"
          peakValue={`${PEAK_DEMAND_KVA} of ${kva}`}
          pct={bookedShare}
          factorLabel="Power factor (1 is best)"
          factorValue={String(POWER_FACTOR)}
        />
      </CheckCard>

      <ListRow
        surface="card"
        leading={<IconTile icon={FileSearch} tone="primary" size={36} />}
        title="See how Ohm read this bill"
        subtitle="Every step Ohm took"
        onClick={() => navigate('/reading?open=all')}
      />
    </ScreenScaffold>
  );
}
