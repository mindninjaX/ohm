import { ArrowRight, Clock, PiggyBank, Plus, ReceiptIndianRupee, RotateCcw, Share2, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import {
  BILL_MONTH,
  CHECKS,
  DUE_DATE,
  EARLY_DEADLINE,
  EARLY_PRICE,
  JULY_BILL,
  JULY_SAVING,
  PAYMENT,
  SAVING,
  TOTAL,
  VS_JULY,
} from '@/data/bill';
import { BillStatusMini } from '@/illustrations';
import { formatDate, formatINR, formatPct } from '@/lib/format';
import { Alert } from './Alert';
import { Amount } from './Amount';
import { Badge, type BadgeTone } from './Badge';
import { Button } from './Button';
import { Card } from './Card';
import { CheckLine, type CheckState } from './CheckLine';
import { DueLine } from './DueLine';
import { Footer } from './Footer';
import { Footnote } from './Footnote';
import { Header } from './Header';
import { IconButton } from './IconButton';
import { IconTile } from './IconTile';
import { ListRow } from './ListRow';
import { NavRow } from './NavRow';
import { ReassuranceRow } from './ReassuranceRow';
import { ScreenScaffold } from './ScreenScaffold';
import { SectionHeader } from './SectionHeader';
import { Separator, type SeparatorInset } from './Separator';
import { Sheet } from './Sheet';
import { Skeleton } from './Skeleton';
import { Spinner } from './Spinner';
import { TabBar, type TabId } from './TabBar';
import { Tile, type TileTone } from './Tile';
import { OhmToaster, Toast, toast } from './Toast';
import { TrustLineRazorpay } from './TrustLineRazorpay';

/** One block of the gallery: a title, then the variants on a white card (or bare, for full-bleed parts). */
function Demo({ title, description, bare = false, children }: { title: string; description?: string; bare?: boolean; children: ReactNode }) {
  return (
    <section className="flex flex-col">
      <SectionHeader title={title} description={description} className="mb-2" />
      {bare ? <div className="-mx-4 flex flex-col gap-3">{children}</div> : <Card padding={16}>{children}</Card>}
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-xs font-medium text-ink-muted">{children}</p>;
}

const dueText = `Due ${formatDate(DUE_DATE)}`;
const earlyText = formatDate(EARLY_DEADLINE);

/** The six checks, one after the other: Running, then Pass. The same words as the real screens. */
function LiveChecks() {
  const [step, setStep] = useState(0); // number of checks that have passed
  useEffect(() => {
    if (step >= CHECKS.length) return;
    const t = window.setTimeout(() => setStep((s) => s + 1), 900);
    return () => window.clearTimeout(t);
  }, [step]);
  return (
    <>
      <div className="flex flex-col gap-3">
        {CHECKS.map((c, i) => {
          const state: CheckState = i < step ? 'pass' : i === step ? 'running' : 'pending';
          return <CheckLine key={c.id} state={state} title={c.title} result={c.detail} />;
        })}
      </div>
      <Button variant="secondary" size="m" leftIcon={RotateCcw} onClick={() => setStep(0)} className="self-start">
        Run again
      </Button>
    </>
  );
}

/** The Home bill card, built only from the base components: a check that they compose like the Figma card. */
function ComposedBillCard() {
  return (
    <Card padding={0}>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-ink-muted">{BILL_MONTH.split(' ')[0]} bill</p>
          <Amount value={TOTAL} size="l" />
        </div>
        <DueLine>{dueText}</DueLine>
        <Tile tone="success-subtle" className="flex-row items-center gap-2">
          <PiggyBank size={16} aria-hidden className="shrink-0 text-success" />
          <p className="text-sm font-medium text-ink">
            Pay by {earlyText} and <span className="text-success">save {formatINR(SAVING)}</span>
          </p>
        </Tile>
        <Button>Review and pay</Button>
      </div>
      <Separator inset="20" />
      <ReassuranceRow surface="plain" onClick={() => undefined} />
    </Card>
  );
}

/** A Bill status mini that checks itself: ring turning, then the badge pops and the tick draws. */
function LiveMini() {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) return;
    const t = window.setTimeout(() => setChecked(true), 1400);
    return () => window.clearTimeout(t);
  }, [checked]);
  return (
    <div className="flex items-center gap-3">
      <BillStatusMini state={checked ? 'checked' : 'checking'} size="l" />
      <Button size="m" variant="secondary" leftIcon={RotateCcw} onClick={() => setChecked(false)}>
        Check again
      </Button>
    </div>
  );
}

const badgeTones: BadgeTone[] = ['neutral', 'primary', 'success', 'warning', 'danger'];
const tileTones: TileTone[] = ['muted', 'white', 'primary-subtle', 'success-subtle', 'warning-subtle'];
const insets: SeparatorInset[] = ['none', '16', '20', 'left-32', 'left-68'];

export function Gallery() {
  const [tab, setTab] = useState<TabId>('bills');
  const [sheet, setSheet] = useState<null | 'plain' | 'footer' | 'flush'>(null);
  const [struck, setStruck] = useState(false);
  const [countKey, setCountKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const closeSheet = (open: boolean) => !open && setSheet(null);

  return (
    <>
      <ScreenScaffold
        header={<Header type="back" title="Component gallery" subtitle="Ohm base components" />}
        footer={<TabBar value={tab} onValueChange={setTab} />}
      >
        <section className="flex flex-col">
          <SectionHeader title="Composed: bill card" description="The Home card, built only from the parts below." className="mb-2" />
          <ComposedBillCard />
        </section>

        <Demo title="Button" description="Style x Size. L fills the width, M hugs. Disabled is 40%.">
          <div className="flex flex-col gap-3">
            <Button>Primary L</Button>
            <Button variant="secondary">Secondary L</Button>
            <Button variant="destructive">Destructive L</Button>
            <Button variant="link">Link L</Button>
            <Button leftIcon={Share2}>Share receipt</Button>
            <Button rightIcon={ArrowRight} disabled>
              Disabled
            </Button>
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true);
                window.setTimeout(() => setLoading(false), 1500);
              }}
            >
              {loading ? 'Opening Razorpay' : `Pay ${formatINR(EARLY_PRICE)}`}
            </Button>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="m">Primary M</Button>
              <Button size="m" variant="secondary" leftIcon={Plus}>
                Add bill
              </Button>
              <Button size="m" variant="destructive">
                Destructive M
              </Button>
              <Button size="m" variant="link" rightIcon={ArrowRight}>
                Link M
              </Button>
              <Button size="m" disabled>
                Disabled M
              </Button>
            </div>
          </div>
        </Demo>

        <Demo title="Icon button" description="Ghost (24 icon) and Soft (36 circle). 44 x 44 hit area.">
          <div className="flex items-center gap-4">
            <IconButton icon={X} label="Close" />
            <IconButton icon={Plus} label="Add" variant="soft" />
            <IconButton icon={Plus} label="Add (disabled)" variant="soft" disabled />
            <Spinner label="Loading" />
          </div>
        </Demo>

        <Demo title="Header" description="Back (60 tall), Back with a trailing action, Top level (68 tall)." bare>
          <Header
            type="back"
            title="August bill"
            subtitle="Northgrid Electric"
            trailing={
              <Button variant="secondary" size="m">
                Your connection
              </Button>
            }
            sticky={false}
          />
          <Header type="back" title="Reading your bill" leadingIcon={X} sticky={false} />
          <Header
            type="top-level"
            title="Harbourline Hotels"
            subtitle="Riverside · Northgrid"
            trailing={
              <Button variant="secondary" size="m" leftIcon={Plus}>
                Add bill
              </Button>
            }
            sticky={false}
          />
        </Demo>

        <Demo title="Footer" description="One or two buttons, helper, trust line. Pinned on real screens." bare>
          <Footer sticky={false}>
            <Button>Review and pay</Button>
          </Footer>
          <Footer sticky={false} trustLine>
            <Button>Pay {formatINR(EARLY_PRICE)}</Button>
          </Footer>
          <Footer sticky={false}>
            <Button leftIcon={Share2}>Share receipt</Button>
            <Button variant="link">Done</Button>
          </Footer>
          <Footer sticky={false} helper="You can change these later from any bill.">
            <Button>Save and see August bill</Button>
            <Button variant="link">Something looks off</Button>
          </Footer>
        </Demo>

        <Demo title="Trust line, Razorpay">
          <TrustLineRazorpay />
        </Demo>

        <Demo title="Badge" description="Tone x Size (S above, M below).">
          <div className="flex flex-col gap-3">
            {(['s', 'm'] as const).map((size) => (
              <div key={size} className="flex flex-wrap items-center gap-2">
                {badgeTones.map((tone) => (
                  <Badge key={tone} tone={tone} size={size}>
                    {tone}
                  </Badge>
                ))}
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="success" icon>
                Saved {formatINR(JULY_SAVING)}
              </Badge>
              <Badge tone="warning" icon={Clock}>
                Paid, waiting for Northgrid to confirm
              </Badge>
              <Badge tone="success" size="m" icon>
                You saved {formatINR(SAVING)}
              </Badge>
            </div>
          </div>
        </Demo>

        <Demo title="Card, Tile, Separator" description="Card tone x padding; Tile tone; Separator inset.">
          <div className="flex flex-col gap-3">
            <Label>Card (on white, so the tones show their edge)</Label>
            <Card tone="primary-subtle" padding={16}>
              <p className="text-sm text-ink">Primary subtle, padding 16</p>
            </Card>
            <Card tone="warning-subtle" padding={20}>
              <p className="text-sm text-ink">Warning subtle, padding 20</p>
            </Card>
            <Card tone="white" padding={0} className="border border-line">
              <p className="p-3 text-sm text-ink">White, padding 0</p>
            </Card>
            <Label>Tile</Label>
            <div className="grid grid-cols-2 gap-2">
              {tileTones.map((tone) => (
                <Tile key={tone} tone={tone} className="border border-line/60">
                  <p className="text-sm text-ink">{tone}</p>
                </Tile>
              ))}
            </div>
            <Label>Separator inset</Label>
            <div className="flex flex-col gap-2 rounded-xl bg-surface-muted py-2">
              {insets.map((inset) => (
                <Separator key={inset} inset={inset} />
              ))}
            </div>
          </div>
        </Demo>

        <section className="flex flex-col">
          <SectionHeader title="Section header" description="Trailing none, link, meta; with and without a description." className="mb-2" />
          <Card padding={16}>
            <SectionHeader title="Past bills" />
            <SectionHeader title="Past bills" link="All bills" />
            <SectionHeader title="From your August bill" meta="Page 1" />
            <SectionHeader title="Is the maths right?" description="Redone with the rates the state regulator approved." />
          </Card>
        </section>

        <section className="flex flex-col">
          <SectionHeader title="List row" description="Card surface on its own; Plain rows stacked in a Card with Separator left 68." className="mb-2" />
          <div className="flex flex-col gap-3">
            <ListRow
              surface="card"
              leading={<IconTile icon={ReceiptIndianRupee} />}
              title={JULY_BILL.month}
              subtitle={`Paid ${formatDate(JULY_BILL.paidOn)}`}
              value={formatINR(JULY_BILL.paid)}
              badge={
                <Badge tone="success" size="s">
                  Saved {formatINR(JULY_SAVING)}
                </Badge>
              }
              onClick={() => toast.success('Opening July 2026')}
            />
            <Card padding={0}>
              <ListRow
                surface="plain"
                leading={<IconTile icon={PiggyBank} tone="success" />}
                title="Plain row"
                subtitle="Sits in a card"
                onClick={() => undefined}
              />
              <Separator inset="left-68" />
              <ListRow
                surface="plain"
                leading={<IconTile icon={ReceiptIndianRupee} tone="primary" />}
                title={BILL_MONTH}
                subtitle="To pay"
                value={formatINR(TOTAL)}
                badge={
                  <Badge tone="warning" size="s">
                    To pay
                  </Badge>
                }
                onClick={() => undefined}
              />
              <Separator inset="left-68" />
              <ListRow
                surface="plain"
                leading={<IconTile icon={Clock} />}
                title="Usage this year"
                action={
                  <Button variant="link" size="m" rightIcon={ArrowRight}>
                    See trends
                  </Button>
                }
                chevron={false}
              />
            </Card>
          </div>
        </section>

        <Demo title="Amount" description="XL, L, M, S. Tap Strike to cross the old price out. Count up plays when first seen.">
          <div className="flex flex-col items-start gap-3">
            <Amount value={TOTAL} size="xl" />
            <Amount value={TOTAL} size="l" />
            <Amount value={TOTAL} size="m" />
            <Amount value={TOTAL} size="s" />
            <Amount value={-196} size="m" />
            <div className="flex flex-wrap items-end gap-3">
              <Amount value={TOTAL} size="m" struck={struck} />
              <Amount value={EARLY_PRICE} size="l" />
            </div>
            <div className="flex gap-2">
              <Button size="m" variant="secondary" onClick={() => setStruck((s) => !s)}>
                {struck ? 'Unstrike' : 'Strike'}
              </Button>
              <Button size="m" variant="secondary" leftIcon={RotateCcw} onClick={() => setCountKey((k) => k + 1)}>
                Count up
              </Button>
            </div>
            <Amount key={countKey} value={TOTAL} size="l" countUp />
          </div>
        </Demo>

        <Demo title="Due line" description="Tone x Size.">
          <div className="flex flex-col items-start gap-3">
            <DueLine tone="default">{dueText}</DueLine>
            <DueLine tone="tomorrow">Due tomorrow</DueLine>
            <DueLine tone="today">Due today</DueLine>
            <DueLine tone="overdue">Overdue since {formatDate(DUE_DATE)}</DueLine>
            <DueLine tone="paid">Paid {formatDate(PAYMENT.paidAt)}</DueLine>
            <DueLine size="m">{dueText}</DueLine>
          </div>
        </Demo>

        <section className="flex flex-col">
          <SectionHeader title="Reassurance row" description="Plain (in a card) and Card. Bill status mini on the left." className="mb-2" />
          <div className="flex flex-col gap-3">
            <Card padding={0}>
              <ReassuranceRow surface="plain" onClick={() => undefined} />
            </Card>
            <ReassuranceRow surface="card" onClick={() => undefined} />
            <Card padding={16}>
              <Label>Bill status mini (Figma art): checking, checked, flagged (M and L)</Label>
              <LiveMini />
              <div className="flex items-center gap-3">
                <BillStatusMini state="checking" size="m" />
                <BillStatusMini state="checked" size="m" />
                <BillStatusMini state="flagged" size="m" />
                <BillStatusMini state="checking" size="l" />
                <BillStatusMini state="checked" size="l" />
                <BillStatusMini state="flagged" size="l" />
              </div>
            </Card>
          </div>
        </section>

        <Demo title="Alert" description="Info, success, warning, danger; with a link; with a custom icon.">
          <div className="flex flex-col gap-3">
            <Alert tone="info" title="You do not have to wait" description="Ask the Ohm team to check this with Northgrid." />
            <Alert tone="success" icon={PiggyBank} title={`Saved ${formatINR(JULY_SAVING)}`} description="You paid July's bill early." />
            <Alert tone="warning" title="One thing to look at" description="This bill is a little higher than usual." link="See the check" />
            <Alert tone="danger" title="Could not load your trends" description="Check your connection and try again." link="Try again" />
          </div>
        </Demo>

        <Demo title="Toast" description="Success and Error. Tap to show one at the top of the screen.">
          <div className="flex flex-col gap-3">
            <Toast tone="success">Link copied</Toast>
            <Toast tone="error">Could not open WhatsApp</Toast>
            <div className="flex gap-2">
              <Button size="m" variant="secondary" onClick={() => toast.success('Link copied')}>
                Show success
              </Button>
              <Button size="m" variant="secondary" onClick={() => toast.error('Could not open WhatsApp')}>
                Show error
              </Button>
            </div>
          </div>
        </Demo>

        <Demo title="Check line" description="Pass, Look, Pending, Running. The tick draws in when a check passes.">
          <div className="flex flex-col gap-3">
            <CheckLine state="pass" title={CHECKS[0]!.title} result={CHECKS[0]!.detail} />
            <CheckLine state="look" title="Worth a look" result="One line on this bill needs a second look." />
            <CheckLine state="pending" title={CHECKS[1]!.title} result={CHECKS[1]!.detail} />
            <CheckLine state="running" title={CHECKS[2]!.title} result={CHECKS[2]!.detail} />
          </div>
        </Demo>

        <Demo title="Check line, live" description="The six checks pass one by one.">
          <LiveChecks />
        </Demo>

        <Demo title="Skeleton and Spinner" description="Loading placeholders.">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <div className="flex items-center gap-3">
              <Spinner size={16} />
              <Spinner size={20} />
              <Spinner size={32} />
              <span className="grid h-10 place-items-center rounded-full bg-primary px-4 text-card">
                <Spinner size={20} tone="current" />
              </span>
            </div>
          </div>
        </Demo>

        <Demo title="Sheet" description="Springs up from the bottom. Drag the grabber down, tap the scrim, or press Escape.">
          <div className="flex flex-col gap-3">
            <Button variant="secondary" onClick={() => setSheet('plain')}>
              Open a sheet
            </Button>
            <Button variant="secondary" onClick={() => setSheet('footer')}>
              Open a sheet with a footer
            </Button>
            <Button variant="secondary" onClick={() => setSheet('flush')}>
              Open a flush sheet
            </Button>
          </div>
        </Demo>

        <Demo title="Nav row and Footnote">
          <div className="-mx-4 -my-4 flex flex-col">
            <div className="flex flex-col gap-3 px-4 pt-4 pb-3">
              <Footnote>Plain, left aligned: from the usage table on your August bill.</Footnote>
              <Footnote align="center">You can change these later from any bill.</Footnote>
            </div>
            <Separator inset="20" />
            <NavRow label="See trends" onClick={() => undefined} />
            <Separator inset="20" />
            <NavRow label="See the full breakdown" onClick={() => undefined} />
          </div>
        </Demo>

        <Demo title="Tab bar" description="Bills and Trends. The bar slides on a spring (the live one is pinned below)." bare>
          <TabBar value="bills" sticky={false} onValueChange={() => undefined} />
          <TabBar value="trends" sticky={false} onValueChange={() => undefined} />
        </Demo>

        <Footnote align="center">
          {BILL_MONTH} bill {formatINR(TOTAL)}, up {formatPct(VS_JULY.rupeesPct)} from July. Pay by {earlyText} and save {formatINR(SAVING)}.
        </Footnote>
      </ScreenScaffold>

      <Sheet open={sheet === 'plain'} onOpenChange={closeSheet} title="Add a bill">
        <ListRow surface="card" className="bg-surface-muted" leading={<IconTile icon={ReceiptIndianRupee} tone="primary" />} title="Upload the PDF" subtitle="From the Files app" />
        <ListRow surface="card" className="bg-surface-muted" leading={<IconTile icon={Share2} tone="primary" />} title="Forward the email" subtitle="From your mail app" />
        <Footnote>Content has 20 px sides and 16 between children.</Footnote>
      </Sheet>

      <Sheet
        open={sheet === 'footer'}
        onOpenChange={closeSheet}
        title="Stop reading this bill?"
        footer={
          <>
            <Button variant="destructive" onClick={() => setSheet(null)}>
              Stop reading
            </Button>
            <Button variant="secondary" onClick={() => setSheet(null)}>
              Keep reading
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-muted">Ohm will not save anything from this bill.</p>
      </Sheet>

      <Sheet open={sheet === 'flush'} onOpenChange={closeSheet} title="Where these numbers come from" flush>
        <ListRow surface="plain" leading={<IconTile icon={ReceiptIndianRupee} />} title="Units by month" subtitle="Printed on your August bill" />
        <Separator inset="left-68" />
        <ListRow surface="plain" leading={<IconTile icon={PiggyBank} />} title="Rates" subtitle="Approved by the regulator" />
      </Sheet>

      <OhmToaster />
    </>
  );
}
