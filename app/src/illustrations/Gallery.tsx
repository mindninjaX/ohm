import { useState, type ReactNode } from 'react';
import {
  AppIconLarge,
  AppIconSmall,
  ArtConnect,
  ArtForward,
  ArtPhoto,
  ArtUpload,
  BillHistoryChip,
  BillIllustration,
  BillStatusMini,
  BillToChart,
  CameraSimulation,
  EarlierBillsStack,
  ForwardGuideHero,
  PaidBillPage,
  PaidCheck,
  PeakDipGlyph,
  RazorpayLoader,
  RazorpayLogo,
  RupeeHistoryArt,
  StartingPoint,
  UploadSimulation,
  WaitingForMonthsArt,
  type BillStatus,
  type MiniState,
} from './index';

/**
 * Every illustration and animation, with Replay buttons. Dev tool: open
 * /ohm/src/illustrations/gallery.html on the dev server (add ?reduced=1 to preview reduced motion).
 * Each section names the Figma node it came from.
 */
export function Gallery() {
  return (
    <div className="min-h-dvh bg-surface-muted px-4 pb-16 pt-6 font-sans text-ink">
      <div className="mx-auto flex w-full max-w-[393px] flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold text-ink-strong">Illustrations</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Everything exported from Figma, animated. Replay any animation with its button.
          </p>
        </header>

        <BillHeroSection />
        <BillCompactSection />
        <MiniSection />
        <ArtSection />
        <UploadSection />
        <CameraSection />
        <PaidSection />
        <RazorpaySection />
        <StaticSection />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------ layout bits */

function Section({ title, node, children, action }: { title: string; node: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-2xl bg-card p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-ink-strong">{title}</h2>
          <p className="text-xs text-ink-muted">{node}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Pill({ children, onClick, active }: { children: ReactNode; onClick: () => void; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-9 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors ${
        active ? 'bg-primary text-white' : 'bg-primary-subtle text-primary'
      }`}
    >
      {children}
    </button>
  );
}

function Replay({ onClick }: { onClick: () => void }) {
  return <Pill onClick={onClick}>Replay</Pill>;
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-center text-xs text-ink-muted">{children}</p>;
}

/* ------------------------------------------------------------------------------------ sections */

function BillHeroSection() {
  const [status, setStatus] = useState<BillStatus>('reading');
  const [run, setRun] = useState(0);
  const [auto, setAuto] = useState(false);
  const [doneFired, setDoneFired] = useState(false);

  const play = () => {
    setStatus('reading');
    setDoneFired(false);
    setRun((n) => n + 1);
    setAuto(true);
    window.setTimeout(() => setStatus('done'), 4200);
  };

  return (
    <Section
      title="Bill illustration, hero"
      node="Illustration / Bill 20:19218 (Hero Reading 20:18524, Hero Done 20:18627)"
      action={<Replay onClick={play} />}
    >
      <div className="flex flex-wrap gap-2">
        {(['idle', 'reading', 'done', 'flagged'] as const).map((s) => (
          <Pill
            key={s}
            active={status === s}
            onClick={() => {
              setStatus(s);
              setAuto(false);
              setDoneFired(false);
            }}
          >
            {s}
          </Pill>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <BillIllustration key={run} status={status} onDone={() => setDoneFired(true)} />
      </div>
      <Caption>
        {auto ? 'Replay: reads for 4 seconds, then done. ' : ''}
        onDone {doneFired ? 'fired' : 'not fired yet'}
      </Caption>
    </Section>
  );
}

function BillCompactSection() {
  const [run, setRun] = useState(0);
  const [status, setStatus] = useState<BillStatus>('reading');
  return (
    <Section
      title="Bill illustration, compact"
      node="Compact Maths Reading 20:18727, Checks Done 20:18914, Checks Flagged 20:19014"
      action={<Replay onClick={() => setRun((n) => n + 1)} />}
    >
      <div className="flex flex-wrap gap-2">
        {(['idle', 'reading', 'done', 'flagged'] as const).map((s) => (
          <Pill key={s} active={status === s} onClick={() => setStatus(s)}>
            {s}
          </Pill>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center gap-2">
        <BillIllustration key={`a${run}`} size="compact" status={status} />
        <Caption>One component: the focus box and crop follow the status (maths while idle or reading, checks after). Idle has no scan line, focus box or badge.</Caption>
        <BillIllustration key={`b${run}`} size="compact" focus="checks" status="done" />
        <Caption>Checks, done</Caption>
        <BillIllustration key={`c${run}`} size="compact" focus="checks" status="flagged" />
        <Caption>Checks, flagged</Caption>
      </div>
    </Section>
  );
}

function MiniSection() {
  const [run, setRun] = useState(0);
  const [state, setState] = useState<MiniState>('checking');
  return (
    <Section title="Bill status mini" node="11:10035 (12 variants)" action={<Replay onClick={() => setRun((n) => n + 1)} />}>
      <div className="flex flex-wrap gap-2">
        {(['checking', 'checked', 'flagged'] as const).map((s) => (
          <Pill key={s} active={state === s} onClick={() => setState(s)}>
            {s}
          </Pill>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 items-center justify-items-center gap-4">
        {([true, false] as const).flatMap((tile) =>
          (['m', 'l'] as const).map((size) => (
            <div key={`${size}${tile}`} className="flex flex-col items-center gap-1">
              <BillStatusMini key={run} state={state} size={size} tile={tile} />
              <span className="text-xs text-ink-muted">
                {size.toUpperCase()} {tile ? 'tile' : 'plain'}
              </span>
            </div>
          )),
        )}
      </div>
      <div className="mt-5 flex items-center justify-around">
        {(['checking', 'checked', 'flagged'] as const).map((s) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <BillStatusMini key={`${s}${run}`} state={s} size="l" />
            <span className="text-xs text-ink-muted">{s}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ArtSection() {
  const [pose, setPose] = useState(false);
  return (
    <Section
      title="Add bill art"
      node="Art/Upload 11:9897, Art/Photo 11:9925, Art/Forward 11:10195, Art/Connect 11:10196"
      action={<Pill active={pose} onClick={() => setPose((p) => !p)}>Active pose</Pill>}
    >
      <p className="mb-3 text-sm text-ink-muted">Hover or press each one. The pose button holds the Active pose.</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: 'Upload', node: <ArtUpload interactive active={pose} width={150} /> },
          { name: 'Photo', node: <ArtPhoto interactive active={pose} width={150} /> },
          { name: 'Forward', node: <ArtForward interactive active={pose} width={150} /> },
          { name: 'Connect', node: <ArtConnect interactive active={pose} width={150} /> },
          { name: 'Connect, disabled', node: <ArtConnect interactive enabled={false} width={150} /> },
        ].map((a) => (
          <div key={a.name} className="flex flex-col items-center rounded-xl border border-line p-2">
            {a.node}
            <span className="text-xs text-ink-muted">{a.name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function UploadSection() {
  const [run, setRun] = useState(0);
  const [completed, setCompleted] = useState(false);
  return (
    <Section
      title="Upload simulation"
      node="Chip + progress 1.2 s, file flies into Illustration / Bill (compact)"
      action={
        <Replay
          onClick={() => {
            setCompleted(false);
            setRun((n) => n + 1);
          }}
        />
      }
    >
      <UploadSimulation key={run} onComplete={() => setCompleted(true)} />
      <Caption>onComplete {completed ? 'fired' : 'not fired yet'}</Caption>
    </Section>
  );
}

function CameraSection() {
  const [run, setRun] = useState(0);
  const [captured, setCaptured] = useState(false);
  return (
    <Section
      title="Camera simulation"
      node="Dark viewfinder, bill, four brackets that lock on, shutter"
      action={
        <Replay
          onClick={() => {
            setCaptured(false);
            setRun((n) => n + 1);
          }}
        />
      }
    >
      <div className="h-[520px] overflow-hidden rounded-2xl">
        <CameraSimulation key={run} onCapture={() => setCaptured(true)} />
      </div>
      <Caption>onCapture {captured ? 'fired' : 'not fired yet'}</Caption>
    </Section>
  );
}

function PaidSection() {
  const [run, setRun] = useState(0);
  return (
    <Section title="Paid check" node="Illustration / Bill Hero Done 20:18627 at 168 x 203, standard badge (S11 Paid result 28:45533)" action={<Replay onClick={() => setRun((n) => n + 1)} />}>
      <div className="flex justify-center">
        <PaidCheck key={run} />
      </div>
    </Section>
  );
}

function RazorpaySection() {
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <Section
      title="Razorpay loader"
      node="Brand / Razorpay logo 18:30287, durationMs 2500 here"
      action={
        <Replay
          onClick={() => {
            setDone(false);
            setRun((n) => n + 1);
          }}
        />
      }
    >
      <RazorpayLoader key={run} durationMs={2500} onComplete={() => setDone(true)} className="h-[200px]" />
      <Caption>onComplete {done ? 'fired' : 'not fired yet'}</Caption>
    </Section>
  );
}

function StaticSection() {
  return (
    <Section title="Static illustrations" node="Foundations page, no motion">
      <div className="flex flex-col gap-5">
        <Item label="Forward guide hero (on white) 28:40198 > Hero">
          <ForwardGuideHero />
        </Item>
        <Item label="Starting point 11:11230">
          <StartingPoint width={305} />
        </Item>
        <Item label="Bill to chart 11:10147">
          <BillToChart width={300} />
        </Item>
        <div className="grid grid-cols-2 gap-5">
          <Item label="Paid bill page 11:10082">
            <PaidBillPage />
          </Item>
          <Item label="Earlier bills stack 11:10094">
            <EarlierBillsStack />
          </Item>
          <Item label="Bill history chip 11:10067">
            <BillHistoryChip />
          </Item>
          <Item label="Razorpay logo 18:30287">
            <RazorpayLogo />
          </Item>
          <Item label="App icon Large 11:9853">
            <AppIconLarge width={88} />
          </Item>
          <Item label="App icon Small 11:12734">
            <AppIconSmall width={88} />
          </Item>
          <Item label="Rupee history 20:17926">
            <RupeeHistoryArt />
          </Item>
          <Item label="Waiting for months 20:17941">
            <WaitingForMonthsArt />
          </Item>
        </div>
        <Item label="Peak and dip glyph 20:17831 (Highest, Lowest at 20 and 24)">
          <div className="flex items-center gap-4">
            <PeakDipGlyph kind="highest" size={20} />
            <PeakDipGlyph kind="lowest" size={20} />
            <PeakDipGlyph kind="highest" size={24} />
            <PeakDipGlyph kind="lowest" size={24} />
          </div>
        </Item>
      </div>
    </Section>
  );
}

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-line p-3">
      {children}
      <span className="text-center text-xs text-ink-muted">{label}</span>
    </div>
  );
}
