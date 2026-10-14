import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button, Card, Footer, Footnote, Header, Separator, ScreenScaffold, SectionHeader } from '@/components/ohm';
import { CONTRACT_DEMAND_KVA } from '@/data/bill';
import { useDemo } from '@/shell';
import { BusinessCard } from './components/BusinessCard';
import { ConnectionRow, type RowStatus } from './components/ConnectionRow';
import { InlineToast } from './components/InlineToast';
import { StartingPointCard } from './components/StartingPointCard';
import {
  DEFAULT_BUSINESS,
  DETAILS,
  detailById,
  formatAmount,
  useChange,
  type BusinessType,
  type ConnectionChange,
  type DetailId,
} from './data';

const TOAST_SENT = 'Sent. We will notify you.';

/** "Saved 700 kVA as your starting point." for the number that was set. */
function savedMessage(change: ConnectionChange | null): string {
  const value = change?.value ?? CONTRACT_DEMAND_KVA;
  return `Saved ${formatAmount(detailById(change?.detail), value)} as your starting point.`;
}

/** `?open=all` opens every row; `?open=category,power-company` opens those. */
function initialOpen(param: string | null): ReadonlySet<DetailId> {
  if (!param) return new Set();
  if (param === 'all') return new Set(DETAILS.map((d) => d.id));
  const ids = new Set<DetailId>();
  for (const part of param.split(',')) {
    const found = DETAILS.find((d) => d.id === part);
    if (found) ids.add(found.id);
  }
  return ids;
}

/**
 * S05 Your connection (Figma 9:7555), S05.0 all rows open (30:47962), S05.8 set by you (11:16230) and
 * S05.9 sent (11:15883). What Ohm read from the August bill, kept as the starting point every new bill is
 * checked against.
 *
 *  - Tap a row: it opens in place (a smooth height change, the chevron turns) to show the bill crop and
 *    "This is wrong". `?open=all` opens them all.
 *  - Tap the crop: On your bill (S05.2). "This is wrong" and "Something looks off": What looks off (S05.1).
 *  - `?changed=set|sent` is the state after Fix contract demand (S05.3) or Ask the Ohm team (S05.4), with the toast.
 *  - "Save and see August bill" confirms the connection and opens the bill summary.
 */
export function ConnectionScreen() {
  const navigate = useNavigate();
  const demo = useDemo();
  const [params] = useSearchParams();
  const storedChange = useChange();
  const changedParam = params.get('changed');

  // A link with ?changed=set|sent is the state after that change (the Figma frames, a shared link).
  const change: ConnectionChange | null =
    storedChange ??
    (changedParam === 'set'
      ? { kind: 'set', detail: 'contract-demand', value: CONTRACT_DEMAND_KVA }
      : changedParam === 'sent'
        ? { kind: 'sent', detail: 'contract-demand' }
        : null);

  const [open, setOpen] = useState<ReadonlySet<DetailId>>(() => initialOpen(params.get('open')));
  const [business, setBusiness] = useState<BusinessType>(DEFAULT_BUSINESS);
  const [toastMessage, setToastMessage] = useState<string | null>(() =>
    changedParam === 'set' ? savedMessage(change) : changedParam === 'sent' ? TOAST_SENT : null,
  );
  const dismissToast = useCallback(() => setToastMessage(null), []);

  const toggle = (id: DetailId) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const rowFor = (id: DetailId) => {
    const detail = DETAILS.find((d) => d.id === id)!;
    const changedHere = change?.detail === id ? change : null;
    let status: RowStatus = null;
    let value: string | undefined;
    let helper: string | undefined;
    let booked: number | undefined;
    if (changedHere?.kind === 'set') {
      status = 'edited';
      helper = changedHere.source === 'bill' ? 'Corrected by you from your bill.' : 'Set by you from your agreement.';
      if (changedHere.value !== undefined) {
        value = formatAmount(detail, changedHere.value);
        if (id === 'contract-demand') booked = changedHere.value;
      }
    } else if (changedHere?.kind === 'sent') {
      status = 'checking';
    }
    return (
      <ConnectionRow
        key={id}
        detail={detail}
        value={value}
        helper={helper}
        status={status}
        booked={booked}
        business={business}
        open={open.has(id)}
        onToggle={() => toggle(id)}
        onOpenBill={() => navigate(`/connection/on-your-bill?detail=${id}`)}
        onWrong={() => navigate(`/connection/wrong`)}
      />
    );
  };

  const confirm = () => {
    demo.setFlag('connectionConfirmed', true);
    navigate('/bill');
  };

  return (
    <ScreenScaffold
      header={<Header type="back" title="Your connection" />}
      contentClassName="gap-3 pt-3"
      footer={
        <>
          <InlineToast message={toastMessage} onDismiss={dismissToast} />
          <Footer>
            <Button onClick={confirm}>Save and see August bill</Button>
            <Button variant="link" onClick={() => navigate('/connection/wrong')}>
              Something looks off
            </Button>
          </Footer>
        </>
      }
    >
      <StartingPointCard />
      <section className="flex flex-col gap-1">
        <SectionHeader title="From your August bill" meta="Page 1" />
        <Card padding={0}>
          {DETAILS.map((d, i) => (
            <div key={d.id}>
              {i > 0 && <Separator inset="16" />}
              {rowFor(d.id)}
            </div>
          ))}
        </Card>
      </section>
      <section className="flex flex-col gap-1">
        <SectionHeader title="About your business" />
        <BusinessCard
          value={business}
          onChange={(v) => {
            setBusiness(v);
            setToastMessage('Saved.');
          }}
        />
      </section>
      <Footnote align="center" className="px-4">
        You can change these later from any bill.
      </Footnote>
    </ScreenScaffold>
  );
}
