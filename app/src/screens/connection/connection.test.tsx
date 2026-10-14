import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_DEMO_STATE } from '@/shell/demo';
import { DemoProvider } from '@/shell';
import { AskScreen } from './AskScreen';
import { ConnectionScreen } from './ConnectionScreen';
import { FixScreen } from './FixScreen';
import { OnYourBillScreen } from './OnYourBillScreen';
import { connectedFor, DETAILS, formatDayMonthYear, setChange } from './data';

function Where() {
  const loc = useLocation();
  return <output data-testid="where">{loc.pathname + loc.search}</output>;
}

function renderAt(entry: string) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <DemoProvider initial={DEFAULT_DEMO_STATE}>
        <Routes>
          <Route path="/connection" element={<ConnectionScreen />} />
          <Route path="/connection/fix" element={<FixScreen />} />
          <Route path="/connection/ask" element={<AskScreen />} />
          <Route path="/connection/on-your-bill" element={<OnYourBillScreen />} />
          <Route path="*" element={null} />
        </Routes>
        <Where />
      </DemoProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => setChange(null));

describe('connection data', () => {
  it('reads the figures from the data module', () => {
    expect(DETAILS.map((d) => d.value)).toEqual(['700 kVA', '2,000', 'HT Commercial', 'Northgrid Electric', '3 Mar 2021']);
    expect(formatDayMonthYear('2021-03-03')).toBe('3 Mar 2021');
    expect(connectedFor()).toBe('Connected for 5 years and 6 months');
  });
});

describe('Your connection', () => {
  it('starts with every row closed and opens one in place', () => {
    renderAt('/connection');
    const rows = screen.getAllByRole('button', { expanded: false });
    expect(rows.filter((b) => b.getAttribute('aria-controls'))).toHaveLength(5);
    fireEvent.click(screen.getByRole('button', { name: /^Category/ }));
    expect(screen.getByRole('button', { name: /^Category/ })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByText('Printed on page 1 of your August bill')).toHaveLength(1);
  });

  it('opens every row with ?open=all', () => {
    renderAt('/connection?open=all');
    expect(screen.getAllByText('Printed on page 1 of your August bill')).toHaveLength(5);
    expect(screen.getAllByRole('button', { name: 'This is wrong' })).toHaveLength(5);
  });

  it('shows the state after a change, with its toast', () => {
    renderAt('/connection?changed=set');
    expect(screen.getByText('Edited by you')).toBeInTheDocument();
    expect(screen.getByText('Saved 700 kVA as your starting point.')).toBeInTheDocument();
  });

  it('shows Being checked after a send', () => {
    renderAt('/connection?changed=sent');
    expect(screen.getByText('Being checked')).toBeInTheDocument();
    expect(screen.getByText('Sent. We will notify you.')).toBeInTheDocument();
  });

  it('saves and goes to the bill', () => {
    renderAt('/connection');
    fireEvent.click(screen.getByRole('button', { name: 'Save and see August bill' }));
    expect(screen.getByTestId('where')).toHaveTextContent('/bill');
  });
});

describe('Fix contract demand', () => {
  it('follows what is typed and cannot save an empty box', () => {
    renderAt('/connection/fix');
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('700');
    fireEvent.change(input, { target: { value: '650' } });
    expect(screen.getByText('650 kVA')).toBeInTheDocument();
    expect(screen.getByLabelText('Does not match')).toBeInTheDocument();
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('Enter the number from your agreement.')).toBeInTheDocument();
  });
});

describe('Ask the Ohm team', () => {
  it('offers every detail and Not sure', () => {
    renderAt('/connection/ask');
    const options = screen.getAllByRole('option').map((o) => o.textContent);
    expect(options).toEqual(['Not sure', 'Contract demand', 'Meter multiplier', 'Category', 'Power company', 'Connected since']);
  });
});

describe('On your bill', () => {
  it('shows the printed line and what we read', () => {
    renderAt('/connection/on-your-bill');
    expect(screen.getByText('Under what you booked, so no penalty')).toBeInTheDocument();
    expect(screen.getByText('Read clearly')).toBeInTheDocument();
    expect(screen.getByText('We read it wrong')).toBeInTheDocument();
  });
});
