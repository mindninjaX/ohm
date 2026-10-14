import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DEMO_TODAY, EARLY_DEADLINE } from '@/data/bill';
import { formatDate } from '@/lib/format';

/**
 * Demo state: what the prototype pretends is true. It lives in React context, is saved in
 * localStorage (every access wrapped in try/catch) and is changed from the Prototype menu
 * or by screens (for example the Pay screen sets `paid`).
 */

/** "before": Thu 3 Sep, five days left of the early discount. "after": Wed 9 Sep, it has ended. */
export type DateMode = 'before' | 'after';

export interface DemoFlags {
  /** The August bill has been paid (set by the Pay flow, read by Home and the bill screens). */
  paid: boolean;
  /** A bill has been added and read (set after the Reading flow). */
  billAdded: boolean;
  /** The connection details have been confirmed (set on Confirm connection). */
  connectionConfirmed: boolean;
}

export interface DemoState {
  dateMode: DateMode;
  /** First-bill mode: Ohm has no bills yet, so Home shows the empty state. */
  firstBill: boolean;
  flags: DemoFlags;
}

export type DemoFlag = keyof DemoFlags;

export const DEFAULT_DEMO_STATE: DemoState = {
  dateMode: 'before',
  firstBill: false,
  flags: { paid: false, billAdded: true, connectionConfirmed: true },
};

const STORAGE_KEY = 'ohm.demo.v1';

/** "2026-09-08" plus one day is "2026-09-09". UTC maths, so no time zone can shift it. */
function nextDay(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const next = new Date(Date.UTC(y!, m! - 1, d! + 1));
  return next.toISOString().slice(0, 10);
}

/** The demo's "today" for each date mode: Thu 3 Sep, and the day after the early deadline. */
export const DEMO_DATES: Readonly<Record<DateMode, string>> = {
  before: DEMO_TODAY,
  after: nextDay(EARLY_DEADLINE),
};

export const DATE_MODE_LABELS: Readonly<Record<DateMode, { date: string; note: string }>> = {
  before: { date: formatDate(DEMO_DATES.before), note: 'Before the discount ends' },
  after: { date: formatDate(DEMO_DATES.after), note: 'After it ends' },
};

function isBool(v: unknown): v is boolean {
  return typeof v === 'boolean';
}

/** Read what a previous visit saved, ignoring anything that does not look right. */
export function parseDemoState(raw: string | null): DemoState {
  if (!raw) return DEFAULT_DEMO_STATE;
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object') return DEFAULT_DEMO_STATE;
    const d = data as Partial<Record<keyof DemoState, unknown>>;
    const f = (d.flags && typeof d.flags === 'object' ? d.flags : {}) as Partial<
      Record<DemoFlag, unknown>
    >;
    return {
      dateMode: d.dateMode === 'after' ? 'after' : 'before',
      firstBill: isBool(d.firstBill) ? d.firstBill : DEFAULT_DEMO_STATE.firstBill,
      flags: {
        paid: isBool(f.paid) ? f.paid : DEFAULT_DEMO_STATE.flags.paid,
        billAdded: isBool(f.billAdded) ? f.billAdded : DEFAULT_DEMO_STATE.flags.billAdded,
        connectionConfirmed: isBool(f.connectionConfirmed)
          ? f.connectionConfirmed
          : DEFAULT_DEMO_STATE.flags.connectionConfirmed,
      },
    };
  } catch {
    return DEFAULT_DEMO_STATE;
  }
}

function load(): DemoState {
  try {
    return parseDemoState(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return DEFAULT_DEMO_STATE;
  }
}

function save(state: DemoState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or blocked storage: the demo still works, it just forgets on reload.
  }
}

export interface DemoApi extends DemoState {
  /** The demo's "today" as an ISO date: "2026-09-03" or "2026-09-09". */
  today: string;
  /** True once the early discount is gone (date mode "after"). */
  afterEarlyDeadline: boolean;
  setDateMode: (mode: DateMode) => void;
  setFirstBill: (on: boolean) => void;
  setFlag: (flag: DemoFlag, value: boolean) => void;
  /**
   * Start one of the three flows with the right state:
   *  - "first-bill": no bills yet, nothing paid;
   *  - "monthly": the August bill is in, unpaid;
   *  - "home": the same, for browsing Home and Trends.
   * The date mode is kept.
   */
  startFlow: (flow: 'first-bill' | 'monthly' | 'home') => void;
  /** Back to the defaults (Thu 3 Sep, a normal account, nothing paid). */
  reset: () => void;
}

const DemoContext = createContext<DemoApi | null>(null);

export function DemoProvider({
  children,
  initial,
}: {
  children: ReactNode;
  /** For tests: skip localStorage and start from this state. */
  initial?: DemoState;
}) {
  const [state, setState] = useState<DemoState>(() => initial ?? load());

  useEffect(() => {
    if (!initial) save(state);
  }, [state, initial]);

  const setDateMode = useCallback(
    (dateMode: DateMode) => setState((s) => ({ ...s, dateMode })),
    [],
  );
  const setFirstBill = useCallback(
    (firstBill: boolean) => setState((s) => ({ ...s, firstBill })),
    [],
  );
  const setFlag = useCallback(
    (flag: DemoFlag, value: boolean) =>
      setState((s) => ({ ...s, flags: { ...s.flags, [flag]: value } })),
    [],
  );
  const startFlow = useCallback((flow: 'first-bill' | 'monthly' | 'home') => {
    setState((s) =>
      flow === 'first-bill'
        ? {
            dateMode: s.dateMode,
            firstBill: true,
            flags: { paid: false, billAdded: false, connectionConfirmed: false },
          }
        : {
            dateMode: s.dateMode,
            firstBill: false,
            flags: { paid: false, billAdded: true, connectionConfirmed: true },
          },
    );
  }, []);
  const reset = useCallback(() => setState(DEFAULT_DEMO_STATE), []);

  const api = useMemo<DemoApi>(
    () => ({
      ...state,
      today: DEMO_DATES[state.dateMode],
      afterEarlyDeadline: state.dateMode === 'after',
      setDateMode,
      setFirstBill,
      setFlag,
      startFlow,
      reset,
    }),
    [state, setDateMode, setFirstBill, setFlag, startFlow, reset],
  );

  return <DemoContext.Provider value={api}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoApi {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used inside <DemoProvider>');
  return ctx;
}
