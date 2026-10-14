import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PARTS, SAVING, TOTAL, UNITS } from '@/data/bill';
import { formatINR, formatUnits } from '@/lib/format';
import { AddBillTile } from './components/AddBillTile';
import { StepsCard } from './components/StepsCard';
import {
  CHECK_RESULTS,
  DONE_CAPTION,
  FOUND_ROWS,
  MATHS_ROWS,
  READ_ROWS,
  STEPS,
} from './readingContent';
import { DONE_AT, STEP_DONE_AT, useReadingSimulation } from './useReadingSimulation';
import { screens } from './routes';

const text = (row: { value: { text: string } | { rupees: number } }) =>
  'text' in row.value ? row.value.text : formatINR(row.value.rupees);

describe('readingContent (S04.1): every figure comes from the data module', () => {
  it('lists the four steps in Figma order', () => {
    expect(STEPS.map((s) => s.title)).toEqual([
      "Found Northgrid's August bill",
      'Read every line of the bill',
      'Redoing the maths',
      'Running the 6 checks',
    ]);
  });

  it('shows the bill facts', () => {
    expect(FOUND_ROWS.map(text)).toEqual(['Tue 1 Sep 2026', '4410 28••••', 'Harbourline Hotels, Riverside']);
    expect(READ_ROWS.map(text)).toEqual(['3,26,500', '664 kVA', '0.998', '700 kVA', 'HT Commercial', '2,000']);
    expect(READ_ROWS[0]!.value).toEqual({ text: formatUnits(UNITS) });
  });

  it('redoes the maths with the same amounts as the parts and the total', () => {
    expect(MATHS_ROWS.map(text)).toEqual([
      '₹22,52,850',
      '₹3,91,800',
      '₹3,59,150',
      '₹2,78,880',
      '₹14,450',
      '₹32,97,130',
      '₹3,45,235',
      '−₹196',
      '₹36,42,160',
    ]);
    const byId = Object.fromEntries(PARTS.map((p) => [p.id, p.amount]));
    expect(MATHS_ROWS[0]!.value).toEqual({ rupees: byId.electricity });
    expect(MATHS_ROWS.at(-1)!.value).toEqual({ rupees: TOTAL });
  });

  it('breaks the time of day note where Figma does', () => {
    const note = MATHS_ROWS.find((r) => r.id === 'tod')!.note!;
    expect(note).toBe('Mornings +₹22,800, evenings +₹60,200,\nnights −₹68,550');
  });

  it('lists six checks, discount second, with the saving from the data', () => {
    expect(CHECK_RESULTS).toHaveLength(6);
    expect(CHECK_RESULTS[1]!.title).toBe('Discount worked out right');
    // Figma glues "Tue 8 Sep." with no-break spaces.
    expect(CHECK_RESULTS[1]!.result).toBe(`You save ${formatINR(SAVING)} if you pay by Tue 8 Sep.`);
    expect(CHECK_RESULTS[5]!.result).toBe('Peak 664 of 700 kVA. Power factor 0.998.');
    expect(DONE_CAPTION).toBe('Ohm finished reading this bill. All 6 checks are fine.');
  });
});

describe('useReadingSimulation', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('ticks the steps off one after another and finishes in about 9 s', () => {
    const { result } = renderHook(() => useReadingSimulation('run'));
    expect([0, 1, 2, 3].map(result.current.stepState)).toEqual(['active', 'pending', 'pending', 'pending']);
    act(() => void vi.advanceTimersByTime(STEP_DONE_AT[0]));
    expect([0, 1, 2, 3].map(result.current.stepState)).toEqual(['done', 'active', 'pending', 'pending']);
    act(() => void vi.advanceTimersByTime(STEP_DONE_AT[2] - STEP_DONE_AT[0]));
    expect([0, 1, 2, 3].map(result.current.stepState)).toEqual(['done', 'done', 'done', 'active']);
    expect(result.current.phase).toBe('reading');
    act(() => void vi.advanceTimersByTime(DONE_AT - STEP_DONE_AT[2]));
    expect(result.current.phase).toBe('done');
    expect(DONE_AT).toBeGreaterThanOrEqual(8000);
    expect(DONE_AT).toBeLessThanOrEqual(10000);
  });

  it('skip finishes at once', () => {
    const { result } = renderHook(() => useReadingSimulation('run'));
    act(() => result.current.skip());
    expect(result.current.phase).toBe('done');
    expect([0, 1, 2, 3].map(result.current.stepState)).toEqual(['done', 'done', 'done', 'done']);
  });

  it('holds the Figma frame in frame mode and starts done in done mode', () => {
    const frame = renderHook(() => useReadingSimulation('frame'));
    expect([0, 1, 2, 3].map(frame.result.current.stepState)).toEqual(['done', 'done', 'done', 'active']);
    act(() => void vi.advanceTimersByTime(20_000));
    expect(frame.result.current.phase).toBe('reading');
    const done = renderHook(() => useReadingSimulation('done'));
    expect(done.result.current.phase).toBe('done');
  });
});

describe('Add bill tile', () => {
  it('fires onClick, and the coming-soon tile is disabled and says so', () => {
    const onClick = vi.fn();
    const { rerender } = render(<AddBillTile type="upload" title="Upload the PDF" subtitle="From the Files app" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /Upload the PDF/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<AddBillTile type="connect" disabled title="Link your Northgrid account" />);
    expect(screen.getByRole('button', { name: /Link your/ })).toBeDisabled();
    expect(screen.getByText('Coming soon')).toBeInTheDocument();
  });
});

describe('Steps card', () => {
  it('opens a done step on tap and tells waiting steps apart', () => {
    const onToggle = vi.fn();
    render(
      <StepsCard
        states={['done', 'active', 'pending', 'pending']}
        open={new Set([0])}
        onToggle={onToggle}
        played={null}
      />,
    );
    expect(screen.getByText('Bill date')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Read every line/ }));
    expect(onToggle).toHaveBeenCalledWith(1);
    expect(screen.getByRole('button', { name: /Found Northgrid/ })).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('routes', () => {
  it('registers the five Add bill routes', () => {
    expect(Object.keys(screens).sort()).toEqual(['/add', '/add/email', '/notification', '/reading', '/reading/stop']);
  });

  it('the lock screen notification opens the bill', () => {
    function Where() {
      return <output data-testid="where">{useLocation().pathname}</output>;
    }
    const Lock = screens['/notification']!;
    render(
      <MemoryRouter initialEntries={['/notification']}>
        <Routes>
          <Route path="/notification" element={<Lock />} />
          <Route path="/bill" element={<Where />} />
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /August power bill: ₹36,42,160/ }));
    expect(screen.getByTestId('where')).toHaveTextContent('/bill');
  });
});
