import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { BillIllustration, BillStatusMini, CameraSimulation, RazorpayLoader, UploadSimulation } from './index';

// Prefer reduced motion for this whole file: nothing loops, every transition is instant, and the
// callbacks still fire. (Motion reads the preference the first time a component asks for it.)
beforeAll(() => {
  vi.stubGlobal(
    'matchMedia',
    (query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }),
  );
});

describe('reduced motion', () => {
  it('BillIllustration calls onDone for the done state without animating', async () => {
    const onDone = vi.fn();
    render(<BillIllustration status="done" onDone={onDone} />);
    await waitFor(() => expect(onDone).toHaveBeenCalledTimes(1));
  });

  it('BillIllustration does not call onDone while reading', async () => {
    const onDone = vi.fn();
    render(<BillIllustration status="reading" onDone={onDone} />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 60));
    });
    expect(onDone).not.toHaveBeenCalled();
  });

  it('UploadSimulation fills the bar, then reports completion', async () => {
    const onComplete = vi.fn();
    render(<UploadSimulation durationMs={80} onComplete={onComplete} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1), { timeout: 3000 });
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('RazorpayLoader says what it is doing and completes after durationMs', async () => {
    const onComplete = vi.fn();
    render(<RazorpayLoader durationMs={40} onComplete={onComplete} />);
    expect(screen.getByText('Opening Razorpay')).toBeInTheDocument();
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  });

  it('CameraSimulation flashes and calls onCapture when the shutter is tapped', async () => {
    const onCapture = vi.fn();
    render(<CameraSimulation onCapture={onCapture} />);
    fireEvent.click(screen.getByRole('button', { name: 'Take photo' }));
    await waitFor(() => expect(onCapture).toHaveBeenCalledTimes(1), { timeout: 2000 });
  });

  it('the reading spinner pulses (soft opacity) instead of turning or freezing', async () => {
    const { container } = render(<BillStatusMini state="checking" />);
    const spinner = container.querySelector<HTMLElement>('[data-part="spinner"] > g');
    expect(spinner).not.toBeNull();
    const seen: number[] = [];
    for (let i = 0; i < 16; i += 1) {
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 60));
      });
      seen.push(Number.parseFloat(spinner?.style.opacity || '1'));
    }
    expect(Math.min(...seen)).toBeLessThan(0.95);
    expect(Math.max(...seen) - Math.min(...seen)).toBeGreaterThan(0.1);
    // It never rotates.
    expect(spinner?.style.transform ?? '').not.toMatch(/rotate\((?!0)/);
  });

  it('a settled badge does not pulse', async () => {
    const { container } = render(<BillStatusMini state="checked" />);
    const spinner = container.querySelector<HTMLElement>('[data-part="spinner"] > g');
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });
    expect(Number.parseFloat(spinner?.style.opacity || '1')).toBe(1);
  });
});
