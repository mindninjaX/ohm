import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  BEFORE_TAXES,
  EARLY_PRICE,
  LATE_EXTRA,
  LATE_PRICE,
  SAVING,
  TOTAL,
  TOTAL_BEFORE_ROUNDING,
} from '@/data/bill';
import { formatINR } from '@/lib/format';
import { PayScreen } from '@/screens/pay/PayScreen';
import { DemoProvider } from '@/shell';
import { DEFAULT_DEMO_STATE } from '@/shell/demo';
import { Breakdown } from './Breakdown';
import { BillSummary } from './BillSummary';
import { Checks } from './Checks';

/** motion's in-view hooks need an IntersectionObserver; jsdom has none. Everything is "in view". */
beforeEach(() => {
  class InView implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '0px';
    readonly scrollMargin = '0px';
    readonly thresholds = [0];
    constructor(private cb: IntersectionObserverCallback) {}
    observe(target: Element) {
      this.cb([{ isIntersecting: true, target } as IntersectionObserverEntry], this);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  globalThis.IntersectionObserver = InView;
});

function Where() {
  const { pathname, search } = useLocation();
  return <output data-testid="where">{pathname + search}</output>;
}

function renderAt(path: string, ui: ReactNode, dateMode: 'before' | 'after' = 'before', paid = false) {
  return render(
    <DemoProvider initial={{ ...DEFAULT_DEMO_STATE, dateMode, flags: { ...DEFAULT_DEMO_STATE.flags, paid } }}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
        <Where />
      </MemoryRouter>
    </DemoProvider>,
  );
}

describe('S06 Bill summary', () => {
  it('shows the bill, the price ladder and the pay button from the data', () => {
    renderAt('/bill', <BillSummary />);
    expect(screen.getAllByText(formatINR(TOTAL).slice(1)).length).toBeGreaterThan(0);
    expect(screen.getByText(`Pay early, save ${formatINR(SAVING)}`)).toBeInTheDocument();
    expect(screen.getByText(formatINR(LATE_PRICE))).toBeInTheDocument();
    expect(screen.getByText(`${formatINR(LATE_EXTRA)} late charge`)).toBeInTheDocument();
    expect(screen.getByText('3,26,500 units, up 1.8% from July')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: `Pay ${formatINR(EARLY_PRICE)}` })).toBeInTheDocument();
  });

  it('sends each action to its route', () => {
    renderAt('/bill', <BillSummary />);
    const where = () => screen.getByTestId('where').textContent;
    fireEvent.click(screen.getByRole('button', { name: 'Share with owner' }));
    expect(where()).toBe('/bill/share');
    fireEvent.click(screen.getByRole('button', { name: 'See the full breakdown' }));
    expect(where()).toBe('/bill/breakdown');
    fireEvent.click(screen.getByRole('button', { name: 'See trends' }));
    expect(where()).toBe('/trends');
    fireEvent.click(screen.getByRole('button', { name: /No hidden charges or penalties/ }));
    expect(where()).toBe('/bill/checks');
    fireEvent.click(screen.getByRole('button', { name: `Pay ${formatINR(EARLY_PRICE)}` }));
    expect(where()).toBe('/pay');
  });

  it('after Tue 8 Sep (S06.1) the discount is gone and the button pays the full bill', () => {
    renderAt('/bill', <BillSummary />, 'after');
    expect(screen.getByText(/The early-payment discount/)).toBeInTheDocument();
    expect(screen.getByText(`Pay by Wed 16 Sep`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`You could have saved ${formatINR(SAVING)}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: `Pay ${formatINR(TOTAL)}` })).toBeInTheDocument();
  });
});

describe('S06 Bill summary, once the bill is paid', () => {
  it('shows the paid card and a receipt button, never a second Pay button', () => {
    renderAt('/bill', <BillSummary />, 'before', true);
    const card = document.querySelector('[data-slot="bill-card"]') as HTMLElement;
    expect(card).toHaveAttribute('data-state', 'paid');
    expect(card.querySelector('[data-slot="amount"]')).toHaveTextContent('₹36,09,190');
    expect(within(card).getByText('Paid Thu 3 Sep')).toBeInTheDocument();
    expect(within(card).getByText('Waiting for Northgrid to confirm')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Pay / })).toBeNull();
    expect(screen.queryByText(/Pay early, save/)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'View receipt' }));
    expect(screen.getByTestId('where')).toHaveTextContent('/paid');
  });

  it('shows what was paid when the discount had ended', () => {
    renderAt('/bill', <BillSummary />, 'after', true);
    const card = document.querySelector('[data-slot="bill-card"]') as HTMLElement;
    expect(card.querySelector('[data-slot="amount"]')).toHaveTextContent('₹36,42,160');
    expect(within(card).getByText('Paid Wed 9 Sep')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Pay / })).toBeNull();
    expect(screen.getByRole('button', { name: 'View receipt' })).toBeInTheDocument();
  });

  it('opening /pay once the bill is paid goes straight to the receipt', () => {
    render(
      <DemoProvider initial={{ ...DEFAULT_DEMO_STATE, flags: { ...DEFAULT_DEMO_STATE.flags, paid: true } }}>
        <MemoryRouter initialEntries={['/bill', '/pay']} initialIndex={1}>
          <Routes>
            <Route path="/pay" element={<PayScreen />} />
            <Route path="/paid" element={<div>receipt</div>} />
          </Routes>
          <Where />
        </MemoryRouter>
      </DemoProvider>,
    );
    expect(screen.getByTestId('where')).toHaveTextContent('/paid');
    expect(screen.getByText('receipt')).toBeInTheDocument();
    expect(screen.queryByText('Opening Razorpay')).toBeNull();
  });
});

describe('S07 Checks', () => {
  it('shows the six checks and their proof', () => {
    renderAt('/bill/checks', <Checks />);
    for (const title of [
      'Charges add up',
      'Discount worked out right',
      'Contract demand unchanged',
      'Category fits your business',
      'Meter multiplier unchanged',
      'No penalties',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    expect(screen.getByText(formatINR(BEFORE_TAXES))).toBeInTheDocument();
    expect(screen.getByText('₹32,971')).toBeInTheDocument();
    expect(screen.getAllByText(formatINR(SAVING)).length).toBeGreaterThan(0);
    expect(screen.getByText('664 of 700 kVA')).toBeInTheDocument();
  });

  it('opens how Ohm read the bill', () => {
    renderAt('/bill/checks', <Checks />);
    fireEvent.click(screen.getByRole('button', { name: /See how Ohm read this bill/ }));
    expect(screen.getByTestId('where')).toHaveTextContent('/reading?open=all');
  });
});

describe('S08 Breakdown', () => {
  it('adds up: the parts, before taxes, the taxes and the rounded total', () => {
    renderAt('/bill/breakdown', <Breakdown />);
    for (const text of ['₹22,52,850', '₹3,91,800', '₹3,59,150', '₹2,78,880', '₹14,450', '₹3,45,235', '−₹196']) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
    expect(screen.getByText(formatINR(BEFORE_TAXES))).toBeInTheDocument();
    expect(
      screen.getByText(`Your parts add up to ${formatINR(TOTAL_BEFORE_ROUNDING)}. Northgrid rounds down to the nearest ₹10.`),
    ).toBeInTheDocument();
    expect(screen.getByText('+₹22,800')).toBeInTheDocument();
    expect(screen.getByText('−₹68,550')).toBeInTheDocument();
  });

  it('an info icon opens its popover; Escape, a second tap or another icon closes or swaps it', async () => {
    renderAt('/bill/breakdown', <Breakdown />);
    expect(screen.queryByRole('dialog')).toBeNull();
    const fuel = screen.getByRole('button', { name: 'What Fuel adjustment means' });
    fireEvent.click(fuel);
    expect(within(screen.getByRole('dialog')).getByText(/extra charge for changes in the cost of the fuel/)).toBeInTheDocument();
    expect(fuel).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    // A second tap on the same icon closes it; a tap on another icon swaps it.
    fireEvent.click(fuel);
    fireEvent.click(fuel);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    fireEvent.click(fuel);
    fireEvent.click(screen.getByRole('button', { name: 'What Wires means' }));
    await waitFor(() => expect(screen.getByRole('dialog')).toHaveTextContent(/poles and wires/));
  });

  it('?info=fuel opens the popover at once (S08c)', () => {
    renderAt('/bill/breakdown?info=fuel', <Breakdown />);
    expect(screen.getByRole('dialog')).toHaveTextContent('An extra charge for changes in the cost of the fuel that makes your power.');
  });
});
