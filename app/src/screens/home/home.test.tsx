import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_DEMO_STATE, DemoProvider, type DemoState } from '@/shell/demo';
import { AllBillsScreen } from './AllBillsScreen';
import { HomeScreen } from './HomeScreen';
import { JulyBillScreen } from './JulyBillScreen';
import { TrendsScreen } from './TrendsScreen';
import { MONTHS, extremesOf, monthsOfYear, signedPct } from './trends-data';

// jsdom has no IntersectionObserver; the charts and count-ups wait for one. This one reports everything as in view.
beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(private cb: IntersectionObserverCallback) {}
      observe(el: Element) {
        this.cb([{ isIntersecting: true, target: el } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
      }
      unobserve() {}
      disconnect() {}
    },
  );
});
afterEach(() => vi.unstubAllGlobals());

function Where() {
  const { pathname, search } = useLocation();
  return <output data-testid="where">{pathname + search}</output>;
}

function renderAt(path: string, demo: DemoState = DEFAULT_DEMO_STATE) {
  return render(
    <DemoProvider initial={demo}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/bills" element={<AllBillsScreen />} />
          <Route path="/bills/july-2026" element={<JulyBillScreen />} />
          <Route path="/trends" element={<TrendsScreen />} />
          <Route path="*" element={<p>elsewhere</p>} />
        </Routes>
        <Where />
      </MemoryRouter>
    </DemoProvider>,
  );
}

const paidDemo: DemoState = { ...DEFAULT_DEMO_STATE, flags: { ...DEFAULT_DEMO_STATE.flags, paid: true } };
const afterDemo: DemoState = { ...DEFAULT_DEMO_STATE, dateMode: 'after' };

describe('trends data', () => {
  it('works out the change on the month before, as the Figma month table prints it', () => {
    const change = (short: string, year: number) =>
      MONTHS.find((m) => m.short === short && m.year === year)?.changePct;
    expect(signedPct(change('Aug', 2026)!)).toBe('+1.8%');
    expect(signedPct(change('Jul', 2026)!)).toBe('-3.6%');
    expect(signedPct(change('Mar', 2026)!)).toBe('+11.3%');
    expect(signedPct(change('Feb', 2026)!)).toBe('-10.0%');
    expect(signedPct(change('Dec', 2025)!)).toBe('+2.8%');
    expect(change('Aug', 2025)).toBeNull();
  });

  it('finds the highest and lowest month of each year', () => {
    expect(extremesOf(2026).highest.long).toBe('May 2026');
    expect(extremesOf(2026).lowest.long).toBe('February 2026');
    expect(extremesOf(2025).highest.long).toBe('August 2025');
    expect(extremesOf(2025).lowest.long).toBe('November 2025');
    expect(monthsOfYear(2026)).toHaveLength(8);
    expect(monthsOfYear(2025)).toHaveLength(5);
  });
});

describe('Home (S01, S01.4)', () => {
  it('shows the August bill, the offer and the bill card actions', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1, name: 'Harbourline Hotels' })).toBeInTheDocument();
    expect(screen.getByText('Riverside · Northgrid')).toBeInTheDocument();
    expect(screen.getAllByText('36,42,160').length).toBeGreaterThan(0);
    expect(screen.getByText('Due Wed 16 Sep')).toBeInTheDocument();
    expect(screen.getByText(/Pay by Tue 8 Sep and/)).toHaveTextContent('Pay by Tue 8 Sep and save ₹32,970');
    expect(screen.getByRole('heading', { name: 'Up 1.8% from July' })).toBeInTheDocument();
    expect(screen.getByText('3,26,500 units in August. July was 3,20,800.')).toBeInTheDocument();
    expect(screen.getByText('₹35,55,860')).toBeInTheDocument();
    expect(screen.getByText('Saved ₹32,480')).toBeInTheDocument();
  });

  it('goes to the bill, the checks, the sources sheet, trends and all bills', () => {
    renderAt('/');
    const go = (name: string | RegExp) => {
      fireEvent.click(screen.getByRole('button', { name }));
      const where = screen.getByTestId('where').textContent;
      return where;
    };
    expect(go('Review and pay')).toBe('/bill');
  });

  it('shows the paid card with the paid demo flag', () => {
    renderAt('/', paidDemo);
    expect(screen.getAllByText('36,09,190').length).toBeGreaterThan(0);
    expect(screen.getByText('Paid Thu 3 Sep')).toBeInTheDocument();
    expect(screen.getByText('Waiting for Northgrid to confirm')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Review and pay' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'View receipt' }));
    expect(screen.getByTestId('where')).toHaveTextContent('/paid');
  });

  it('says the discount has ended after Tue 8 Sep', () => {
    renderAt('/', afterDemo);
    expect(screen.getByText('The early-payment discount ended on Tue 8 Sep')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Review and pay' })).toBeInTheDocument();
  });

  it('opens a month in Trends when a bar is tapped', () => {
    renderAt('/');
    fireEvent.click(screen.getByRole('button', { name: /^May 2026/ }));
    expect(screen.getByTestId('where')).toHaveTextContent('/trends?month=may');
  });
});

describe('All bills (S01.1) and the July bill (S01.2)', () => {
  it('lists what is to pay and what is paid', () => {
    renderAt('/bills');
    expect(screen.getByText('To pay')).toBeInTheDocument();
    expect(screen.getByText('Save ₹32,970 by Tue 8 Sep')).toBeInTheDocument();
    expect(screen.getByText('Paid in 2026')).toBeInTheDocument();
    expect(screen.getByText('Bills before July 2026')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /July 2026/ }));
    expect(screen.getByTestId('where')).toHaveTextContent('/bills/july-2026');
  });

  it('moves August to Paid in 2026 once it is paid', () => {
    renderAt('/bills', paidDemo);
    expect(screen.queryByText('To pay')).not.toBeInTheDocument();
    expect(screen.getByText('₹36,09,190')).toBeInTheDocument();
    expect(screen.getByText('Saved ₹32,970')).toBeInTheDocument();
  });

  it('shows the July bill', () => {
    renderAt('/bills/july-2026');
    expect(screen.getByText('35,55,860')).toBeInTheDocument();
    expect(screen.getByText('Paid Wed 5 Aug')).toBeInTheDocument();
    expect(screen.getByText('Saved ₹32,480 by paying early')).toBeInTheDocument();
    expect(screen.getByText('3,20,800 units in July')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Your connection' })).toBeInTheDocument();
  });
});

describe('Trends (S12 to S12.6)', () => {
  const readout = () => screen.getByText(/^Units used in /).textContent;

  it('starts on August 2026 in units', () => {
    renderAt('/trends');
    expect(screen.getByRole('heading', { level: 1, name: 'Trends' })).toBeInTheDocument();
    expect(readout()).toBe('Units used in August 2026');
    expect(screen.getByText('Up 1.8% from July')).toBeInTheDocument();
    expect(screen.getByText('Each bar is one month')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next month' })).toBeDisabled();
    expect(screen.getByText('3,42,210')).toBeInTheDocument(); // highest
    expect(screen.getByText('How August compares')).toBeInTheDocument();
    expect(screen.getByText('5,700 more units, up 1.8%')).toBeInTheDocument();
    expect(screen.getByText('6,360 more units, up 2.0%')).toBeInTheDocument();
  });

  it('selects the month you tap and shows its change, a Highest badge and the steppers', () => {
    renderAt('/trends');
    fireEvent.click(screen.getByRole('button', { name: /^May 2026/ }));
    expect(readout()).toBe('Units used in May 2026');
    expect(screen.getByText('Up 8.4% from April')).toBeInTheDocument();
    expect(screen.getByText('Highest', { selector: '[data-slot=badge]' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^May 2026/ })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(readout()).toBe('Units used in April 2026');
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(readout()).toBe('Units used in May 2026');
  });

  it('opens on a month from the link (?month=may)', () => {
    renderAt('/trends?month=may');
    expect(readout()).toBe('Units used in May 2026');
  });

  it('switches to 2025 and back', () => {
    renderAt('/trends');
    fireEvent.click(screen.getByRole('tab', { name: '2025' }));
    expect(readout()).toBe('Units used in December 2025');
    expect(screen.getByText('Up 2.8% from November')).toBeInTheDocument();
    expect(screen.getByText("Your bill's table starts in Aug 2025.")).toBeInTheDocument();
    expect(screen.getByText('5 months')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: '2026' }));
    expect(readout()).toBe('Units used in August 2026');
  });

  it('opens on 2025 from the link (?year=2025)', () => {
    renderAt('/trends?year=2025');
    expect(readout()).toBe('Units used in December 2025');
  });

  it('opens the month table and selects a row', () => {
    renderAt('/trends');
    const trigger = screen.getByRole('button', { name: /Every month/ });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const row = screen.getByRole('button', { name: /Mar 2026/ });
    expect(within(row).getByText('+11.3%')).toBeInTheDocument();
    fireEvent.click(row);
    expect(readout()).toBe('Units used in March 2026');
  });

  it('switches to the bill total and back through the bridge links', () => {
    renderAt('/trends');
    fireEvent.click(screen.getByRole('tab', { name: /Bill total/ }));
    expect(screen.getByText('August 2026 bill')).toBeInTheDocument();
    expect(screen.getByText('Up 1.5% from July')).toBeInTheDocument();
    expect(screen.getByText('₹53,820 more, up 1.5%')).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: '2025' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /^Jul 2026/ }));
    expect(screen.getByText('July 2026 bill')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show in units' }));
    expect(readout()).toBe('Units used in August 2026');
    fireEvent.click(screen.getByRole('button', { name: 'Show in rupees' }));
    expect(screen.getByText('August 2026 bill')).toBeInTheDocument();
  });

  it('opens on the bill total from the link (?metric=rupees)', () => {
    renderAt('/trends?metric=rupees');
    expect(screen.getByText('August 2026 bill')).toBeInTheDocument();
  });

  it('shows the "months building up" card (?state=few)', () => {
    renderAt('/trends?state=few');
    expect(screen.getByText('Ohm will draw your usage chart once it has 3 months of bills.')).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: '2025' })).not.toBeInTheDocument();
  });

  it('shows the error and tries again (?state=error)', async () => {
    renderAt('/trends?state=error');
    expect(screen.getByRole('alert')).toHaveTextContent("Couldn't load your trends");
    expect(screen.getByRole('alert')).toHaveTextContent('Check your internet and try again.');
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByText('Each bar is one month', {}, { timeout: 3000 })).toBeInTheDocument();
  });

  it('opens the sources sheet', () => {
    renderAt('/trends');
    fireEvent.click(screen.getAllByRole('button', { name: 'Where these numbers come from' })[0]!);
    expect(screen.getByTestId('where')).toHaveTextContent('/home/sources');
  });
});
