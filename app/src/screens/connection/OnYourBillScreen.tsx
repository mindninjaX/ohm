import { CalendarCheck, CircleCheck, FileWarning, FileX2, MessageCircle, ScanText } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { BillIllustration } from '@/illustrations';
import {
  Badge,
  Button,
  Card,
  Header,
  ScreenScaffold,
  SectionHeader,
  Sheet,
  Tile,
} from '@/components/ohm';
import { BillCrop } from './components/BillCrop';
import { CapacityBar } from './components/CapacityBar';
import { FitBadge } from './components/FitBadge';
import { MeterEquation } from './components/MeterEquation';
import { OptionsCard, type OptionRow } from './components/OptionsCard';
import {
  BILL_MONTH_NAME,
  DEFAULT_BUSINESS,
  MONTH_UNITS_NOTE,
  PAGE_NOTE,
  connectedFor,
  detailById,
  type Detail,
} from './data';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-1">
      <SectionHeader title={title} />
      {children}
    </section>
  );
}

/** The picture under "What it means", by detail. The capacity bar and the status line are Figma's; the rest follow the same rhythm. */
function MeaningVisual({ detail }: { detail: Detail }) {
  if (detail.visual === 'capacity') {
    return (
      <div className="flex flex-col gap-2">
        <CapacityBar size="large" />
        <p className="flex items-center gap-1.5 text-sm text-success">
          <CircleCheck size={14} aria-hidden className="shrink-0" />
          Under what you booked, so no penalty
        </p>
      </div>
    );
  }
  if (detail.visual === 'equation') return <MeterEquation caption={MONTH_UNITS_NOTE} />;
  if (detail.visual === 'fit') return <FitBadge business={DEFAULT_BUSINESS} />;
  if (detail.id === 'connected-since') {
    return (
      <p className="flex items-center gap-1.5 text-sm text-ink-muted">
        <CalendarCheck size={14} aria-hidden className="shrink-0" />
        {connectedFor()}
      </p>
    );
  }
  return null;
}

/**
 * S05.2 On your bill (Figma 11:14760): the printed bill crop above Ohm's own reading, what the detail means,
 * and what to do if something is wrong. Opened by tapping a bill crop on Your connection (`?detail=contract-demand`
 * is the default and the Figma frame). The top right "View full bill" shows the page itself in a sheet.
 */
export function OnYourBillScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const detail = detailById(params.get('detail'));
  const [fullBill, setFullBill] = useState(false);
  const q = `?detail=${detail.id}`;

  const options: OptionRow[] = detail.fixable
    ? [
        {
          key: 'read-wrong',
          title: 'We read it wrong',
          subtitle: 'The bill shows something else',
          icon: ScanText,
          onClick: () => navigate(`/connection/fix${q}&mode=bill`),
        },
        {
          key: 'bill-wrong',
          title: 'The bill is wrong',
          subtitle: 'Your agreement says something else',
          icon: FileWarning,
          onClick: () => navigate(`/connection/fix${q}`),
        },
        {
          key: 'not-sure',
          title: 'Not sure',
          subtitle: 'Ask the Ohm team to look',
          icon: MessageCircle,
          onClick: () => navigate(`/connection/ask${q}`),
        },
      ]
    : [
        {
          key: 'not-my-bill',
          title: 'This is not my bill',
          subtitle: 'Upload the right one',
          icon: FileX2,
          onClick: () => navigate('/add'),
        },
        {
          key: 'ask',
          title: 'Ask the Ohm team',
          subtitle: 'Someone checks it with you',
          icon: MessageCircle,
          onClick: () => navigate(`/connection/ask${q}`),
        },
      ];

  return (
    <>
      <ScreenScaffold
        header={
          <Header
            type="back"
            title={detail.label}
            subtitle={PAGE_NOTE}
            backTo="/connection"
            trailing={
              <Button variant="secondary" size="m" onClick={() => setFullBill(true)}>
                View full bill
              </Button>
            }
          />
        }
        contentClassName="gap-3 pt-3 pb-[calc(16px+var(--safe-bottom,34px))]"
      >
        <Section title="On your bill">
          <Card padding={16}>
            <BillCrop label={detail.label} value={detail.value} />
            <Tile tone="primary-subtle">
              <div className="flex min-h-6 flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <span className="flex items-center gap-2 text-sm font-medium text-ink">
                  <ScanText size={16} aria-hidden className="shrink-0 text-primary" />
                  We read
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-base font-semibold text-ink-strong">{detail.value}</span>
                  <Badge tone="success" icon>
                    Read clearly
                  </Badge>
                </span>
              </div>
            </Tile>
          </Card>
        </Section>
        <Section title="What it means">
          <Card padding={16}>
            <p className="text-base text-ink-muted">{detail.meaning}</p>
            <MeaningVisual detail={detail} />
          </Card>
        </Section>
        <Section title="If something is wrong">
          <OptionsCard rows={options} />
        </Section>
      </ScreenScaffold>
      <Sheet open={fullBill} onOpenChange={setFullBill} title={`${BILL_MONTH_NAME} bill`}>
        <div className="flex flex-col items-center gap-3 pb-2">
          <BillIllustration status="idle" size="hero" title={PAGE_NOTE} />
          <p className="text-sm text-ink-muted">{PAGE_NOTE}</p>
        </div>
      </Sheet>
    </>
  );
}
