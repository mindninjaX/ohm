import { useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Popover } from 'radix-ui';
import { BellRing, ChartColumn, FilePlus2, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { toast } from '@/components/ohm';
import { cn } from '@/lib/utils';
import { isSheetPath, normalizePath } from '@/routes';
import { DATE_MODE_LABELS, useDemo, type DateMode } from './demo';

export type FlowId = 'first-bill' | 'monthly' | 'home';

export interface FlowDef {
  id: FlowId;
  title: string;
  hint: string;
  path: string;
  /**
   * For a sheet path: the screen that sits behind it. Without it a sheet opens over whichever
   * screen the person was last on.
   */
  background?: string;
  icon: ReactNode;
}

export const FLOWS: readonly FlowDef[] = [
  {
    id: 'first-bill',
    title: 'First bill',
    hint: 'Add the August bill and watch Ohm read it.',
    path: '/add',
    background: '/',
    icon: <FilePlus2 />,
  },
  {
    id: 'monthly',
    title: 'Monthly bill',
    hint: 'Start at the notification, then check and pay.',
    path: '/notification',
    icon: <BellRing />,
  },
  {
    id: 'home',
    title: 'Home and trends',
    hint: 'Your bills, the charts and past months.',
    path: '/',
    icon: <ChartColumn />,
  },
];

/** Start a flow: set the demo state and go to its first screen. */
export function useStartFlow(): (id: FlowId) => void {
  const navigate = useNavigate();
  const { startFlow } = useDemo();
  return (id) => {
    const flow = FLOWS.find((f) => f.id === id);
    if (!flow) return;
    startFlow(id);
    navigate(flow.path, {
      replace: true,
      state: flow.background
        ? {
            backgroundLocation: {
              pathname: flow.background,
              search: '',
              hash: '',
              state: null,
              key: `flow:${flow.id}`,
            },
          }
        : undefined,
    });
  };
}

/** Screens that are meant to sit outside the app (the lock screen, the Razorpay page). */
const OUTSIDE_APP_PATHS: ReadonlySet<string> = new Set(['/notification', '/pay']);

const DATE_MODES: readonly DateMode[] = ['before', 'after'];

/**
 * The "Prototype" button and its menu: start a flow, switch the demo date, reset.
 *  - variant "pill": desktop, a labelled pill, bottom-left of the page outside the phone frame;
 *  - variant "dot": phone, a discreet edge tab (14 x 48) on the left edge, mid-height. It is
 *    narrower than the 16 px screen gutter, so it never covers a card, title or button; it
 *    sits below the overlay layer (a sheet, its scrim and the camera cover it) and hides on
 *    the sheet routes, the lock screen (/notification) and the Razorpay loader (/pay).
 * `container` is where the menu mounts (the shell root on desktop, the phone frame on a phone).
 */
export function PrototypeMenu({
  variant,
  container,
}: {
  variant: 'pill' | 'dot';
  container: HTMLElement | null;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hideDot = isSheetPath(pathname) || OUTSIDE_APP_PATHS.has(normalizePath(pathname));
  const demo = useDemo();
  const startFlow = useStartFlow();

  const choose = (id: FlowId) => {
    startFlow(id);
    setOpen(false);
  };

  const reset = () => {
    demo.reset();
    navigate('/', { replace: true });
    setOpen(false);
    toast.success('Back to the start');
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        {variant === 'pill' ? (
          <button
            type="button"
            className={cn(
              'pointer-events-auto fixed bottom-6 left-6 z-50 inline-flex h-10 items-center gap-2 rounded-full border border-line bg-card px-4',
              'text-sm font-medium text-ink-strong shadow-md outline-none transition-[box-shadow,transform,background-color] duration-150',
              'hover:bg-surface-muted active:scale-[0.97] focus-visible:ring-[3px] focus-visible:ring-ring-subtle',
              'motion-reduce:transition-none motion-reduce:active:scale-100',
            )}
          >
            <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
            Prototype
          </button>
        ) : (
          <button
            type="button"
            aria-label="Prototype menu"
            data-slot="prototype-dot"
            // Not focusable or tappable while hidden. z-0: the sheet scrim and panels, the camera and
            // popovers are later in the portal layer (or higher), so they all draw over it.
            tabIndex={hideDot && !open ? -1 : undefined}
            aria-hidden={hideDot && !open ? true : undefined}
            className={cn(
              'pointer-events-auto absolute top-1/2 left-0 z-0 grid h-12 w-3.5 -translate-y-1/2 place-items-center rounded-r-full',
              'bg-ink-strong/10 text-ink-muted/80 opacity-60 outline-none transition-[background-color,width,opacity,visibility] duration-150',
              'hover:bg-ink-strong/15 hover:opacity-100 active:w-4 focus-visible:opacity-100 focus-visible:ring-[3px] focus-visible:ring-ring-subtle',
              'motion-reduce:transition-none motion-reduce:active:w-3.5',
              hideDot && !open && 'pointer-events-none invisible opacity-0',
            )}
          >
            <SlidersHorizontal className="size-2.5" aria-hidden="true" />
          </button>
        )}
      </Popover.Trigger>
      <Popover.Portal container={container ?? undefined}>
        <Popover.Content
          side={variant === 'pill' ? 'top' : 'right'}
          align={variant === 'pill' ? 'start' : 'center'}
          sideOffset={10}
          collisionPadding={12}
          aria-label="Prototype menu"
          className={cn(
            'z-[70] w-[300px] origin-(--radix-popover-content-transform-origin) rounded-2xl border border-line bg-card p-2 shadow-xl outline-none',
            variant === 'pill' ? 'max-w-[calc(100vw-24px)]' : 'max-w-[calc(100vw-44px)]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[state=open]:duration-200 data-[state=closed]:duration-150 motion-reduce:animate-none',
          )}
        >
          <SectionLabel>Start a flow</SectionLabel>
          <ul className="flex flex-col">
            {FLOWS.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => choose(f.id)}
                  className="flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left outline-none transition-colors duration-150 hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:ring-[3px] focus-visible:ring-ring-subtle"
                >
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary-subtle text-primary [&_svg]:size-4">
                    {f.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink-strong">{f.title}</span>
                    <span className="block text-xs text-ink-muted">{f.hint}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mx-2 my-2 h-px bg-line" />

          <SectionLabel>Date in the demo</SectionLabel>
          <div role="radiogroup" aria-label="Date in the demo" className="grid grid-cols-2 gap-2 px-2 pb-1">
            {DATE_MODES.map((mode) => {
              const on = demo.dateMode === mode;
              const label = DATE_MODE_LABELS[mode];
              return (
                <button
                  key={mode}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => demo.setDateMode(mode)}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-left outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-ring-subtle',
                    on
                      ? 'border-primary bg-primary-subtle'
                      : 'border-line bg-card hover:bg-surface-muted',
                  )}
                >
                  <span className={cn('block text-sm font-medium', on ? 'text-primary' : 'text-ink-strong')}>
                    {label.date}
                  </span>
                  <span className="block text-xs text-ink-muted">{label.note}</span>
                </button>
              );
            })}
          </div>

          <div className="mx-2 my-2 h-px bg-line" />

          <button
            type="button"
            onClick={reset}
            className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm font-medium text-ink-strong outline-none transition-colors duration-150 hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:ring-[3px] focus-visible:ring-ring-subtle"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-muted text-ink-muted [&_svg]:size-4">
              <RotateCcw />
            </span>
            Reset
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="px-2 pt-1.5 pb-1 text-xs font-semibold text-ink-muted">{children}</p>;
}
