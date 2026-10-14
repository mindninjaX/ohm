import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { OhmToaster, toast } from '@/components/ohm';
import { DEFAULT_DEMO_STATE, DemoProvider, useDemo, type DemoState } from '@/shell/demo';
import { PaidScreen } from './PaidScreen';
import { PayScreen } from './PayScreen';
import { ShareReceiptSheet, ShareWithOwnerSheet } from './ShareSheets';

function Probe() {
  const l = useLocation();
  const { flags } = useDemo();
  return (
    <>
      <output data-testid="where">{l.pathname}</output>
      <output data-testid="paid">{String(flags.paid)}</output>
    </>
  );
}

const AFTER: DemoState = { ...DEFAULT_DEMO_STATE, dateMode: 'after' };

function renderIn(ui: ReactNode, { entries = ['/'], demo }: { entries?: string[]; demo?: DemoState } = {}) {
  return render(
    <DemoProvider initial={demo ?? DEFAULT_DEMO_STATE}>
      <MemoryRouter initialEntries={entries} initialIndex={entries.length - 1}>
        {ui}
        <Probe />
        <OhmToaster />
      </MemoryRouter>
    </DemoProvider>,
  );
}

const textOf = (el: Element | null) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();

afterEach(() => {
  vi.useRealTimers();
  act(() => toast.dismiss());
});

describe('S11 Paid', () => {
  it('shows the receipt from the data module', () => {
    renderIn(<PaidScreen />);
    expect(screen.getByText('Thu 3 Sep 2026, 11:42 AM')).toBeInTheDocument();
    expect(screen.getByText('You saved ₹32,970')).toBeInTheDocument();
    expect(screen.getByText('Northgrid Electric, August 2026')).toBeInTheDocument();
    expect(screen.getByText('Razorpay')).toBeInTheDocument();
    expect(screen.getByText('Net banking, HDFC Bank')).toBeInTheDocument();
    expect(screen.getByText('UTR HDFCR52026090312345')).toBeInTheDocument();
    expect(screen.getByText('Paid, waiting for Northgrid to confirm')).toBeInTheDocument();
    expect(textOf(screen.getByRole('heading', { name: 'Paid' }).parentElement)).toContain('36,09,190');
  });

  it('opens the share sheet from Share receipt', () => {
    renderIn(
      <Routes>
        <Route path="/paid" element={<PaidScreen />} />
        <Route path="/paid/share" element={<div>sheet</div>} />
      </Routes>,
      { entries: ['/paid'] },
    );
    fireEvent.click(screen.getByRole('button', { name: 'Share receipt' }));
    expect(screen.getByTestId('where')).toHaveTextContent('/paid/share');
  });

  it('goes home with the bill marked paid on Done', () => {
    renderIn(
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/paid" element={<PaidScreen />} />
      </Routes>,
      { entries: ['/paid'] },
    );
    expect(screen.getByTestId('paid')).toHaveTextContent('false');
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.getByTestId('where')).toHaveTextContent('/');
    expect(screen.getByTestId('paid')).toHaveTextContent('true');
  });

  it('pops back to Home on Done when it came from the loader', () => {
    renderIn(
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/paid" element={<PaidScreen />} />
      </Routes>,
      { entries: ['/', { pathname: '/paid', state: { ohmPaidFromPay: true } } as unknown as string] },
    );
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.getByTestId('where')).toHaveTextContent('/');
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  it('shows the full amount and no saving when the early discount had ended', () => {
    renderIn(<PaidScreen />, { demo: AFTER });
    expect(screen.getByText('Wed 9 Sep 2026, 11:42 AM')).toBeInTheDocument();
    expect(screen.queryByText(/You saved/)).not.toBeInTheDocument();
    expect(textOf(screen.getByRole('heading', { name: 'Paid' }).parentElement)).toContain('36,42,160');
  });

  it('counts the paid figure up from 95 % of itself, never from 0', () => {
    const { container } = renderIn(<PaidScreen />);
    const amount = container.querySelector('[data-slot="share-paid-result"] [data-slot="amount"]') as HTMLElement;
    const counting = amount.querySelector('[aria-hidden]:not(:first-child)') as HTMLElement | null;
    const shown = [...amount.querySelectorAll('span[aria-hidden]')].map((el) => el.textContent ?? '').join(' ');
    // 95 % of 36,09,190 is 34,28,730.5, which rounds to 34,28,731.
    expect(counting).not.toBeNull();
    expect(shown).toContain('34,28,731');
    expect(shown).not.toMatch(/(^|\s)0(\s|$)/);
  });

  it('fades the receipt card in with its first row, so it is never an empty white box', () => {
    const { container } = renderIn(<PaidScreen />);
    const card = container.querySelector('[data-slot="share-paid-receipt-card"]') as HTMLElement;
    const lift = (el: Element | null) => (el as HTMLElement).style.opacity;
    // The card's own wrapper and its first row both start hidden (opacity 0) and play at the same time.
    expect(lift(card.parentElement)).toBe('0');
    expect(lift(card.firstElementChild)).toBe('0');
  });
});

describe('S11.1 Share receipt', () => {
  it('shows the paid card', () => {
    const { container } = renderIn(<ShareReceiptSheet />);
    expect(screen.getByText('Share receipt')).toBeInTheDocument();
    const card = container.querySelector('[data-slot="share-card"]') as HTMLElement;
    expect(within(card).getByText('Paid')).toBeInTheDocument();
    expect(within(card).getByText('Waiting for Northgrid to confirm')).toBeInTheDocument();
    expect(textOf(card.querySelector('[data-slot="amount"]'))).toBe('₹36,09,190');
    expect(within(card).getByText('Thu 3 Sep 2026, 11:42 AM')).toBeInTheDocument();
    expect(within(card).getByText('You saved')).toBeInTheDocument();
    expect(within(card).getByText('₹32,970')).toBeInTheDocument();
    expect(within(card).getByText('UTR HDFCR52026090312345')).toBeInTheDocument();
  });
});

describe('S09 Share with owner', () => {
  it('shows the unpaid bill card and the three targets', () => {
    const { container } = renderIn(<ShareWithOwnerSheet />);
    expect(screen.getByText('Share with owner')).toBeInTheDocument();
    const card = container.querySelector('[data-slot="share-card"]') as HTMLElement;
    expect(within(card).getByText('Unpaid')).toBeInTheDocument();
    expect(within(card).getByText('Due Wed 16 Sep')).toBeInTheDocument();
    expect(within(card).getByText('August electricity bill')).toBeInTheDocument();
    expect(within(card).getByText('Harbourline Hotels, Riverside')).toBeInTheDocument();
    expect(textOf(card.querySelector('[data-slot="amount"]'))).toBe('₹36,42,160');
    expect(textOf(card.querySelector('[data-slot="share-offer-strip"]'))).toBe('Save ₹32,970 if you pay by Tue 8 Sep');
    expect(within(card).getByText('Up ₹53,820 from July')).toBeInTheDocument();
    expect(within(card).getByText('Usage rose 1.8%')).toBeInTheDocument();
    expect(within(card).getByText('No hidden charges or penalties')).toBeInTheDocument();
    for (const name of ['WhatsApp', 'Email', 'Copy link']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
  });

  it('drops the offer once the early discount has ended', () => {
    const { container } = renderIn(<ShareWithOwnerSheet />, { demo: AFTER });
    expect(container.querySelector('[data-slot="share-offer-strip"]')).toBeNull();
  });

  it('copies the page address and says so', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    renderIn(<ShareWithOwnerSheet />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
    expect(writeText).toHaveBeenCalledWith(window.location.href);
    expect(await screen.findByText('Link copied')).toBeInTheDocument();
  });

  it('says what WhatsApp and Email would open', async () => {
    renderIn(<ShareWithOwnerSheet />);
    fireEvent.click(screen.getByRole('button', { name: 'WhatsApp' }));
    expect(await screen.findByText('Opening WhatsApp')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Email' }));
    expect(await screen.findByText('Opening email')).toBeInTheDocument();
  });
});

describe('/pay', () => {
  it('shows the Razorpay loader, then replaces itself with Paid and records the payment', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    renderIn(
      <Routes>
        <Route path="/pay" element={<PayScreen />} />
        <Route path="/paid" element={<div>paid screen</div>} />
        <Route path="/" element={<div>home</div>} />
      </Routes>,
      { entries: ['/', '/pay'] },
    );
    expect(screen.getByText('Opening Razorpay')).toBeInTheDocument();
    expect(screen.getByTestId('where')).toHaveTextContent('/pay');
    expect(screen.getByTestId('paid')).toHaveTextContent('false');
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1700);
    });
    await waitFor(() => expect(screen.getByTestId('where')).toHaveTextContent('/paid'));
    expect(screen.getByTestId('paid')).toHaveTextContent('true');
  });
});
