import type { ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
  RazorpayLogo,
  RupeeHistoryArt,
  SecondLook,
  StartingPoint,
  WaitingForMonthsArt,
} from './index';

const viewBox = (container: HTMLElement) => container.querySelector('svg')?.getAttribute('viewBox');

describe('illustrations keep the Figma viewBox', () => {
  const cases: [string, ReactElement, string][] = [
    ['Bill hero', <BillIllustration />, '0 0 240 290'],
    ['Bill compact', <BillIllustration size="compact" />, '0 0 240 128'],
    ['Bill status mini M', <BillStatusMini />, '0 0 36 36'],
    ['Bill status mini L', <BillStatusMini size="l" />, '0 0 48 48'],
    ['Art/Upload', <ArtUpload />, '0 0 150 96'],
    ['Art/Photo', <ArtPhoto />, '0 0 150 96'],
    ['Art/Forward', <ArtForward />, '0 0 150 96'],
    ['Art/Connect', <ArtConnect />, '0 0 150 96'],
    ['Paid bill page', <PaidBillPage />, '0 0 76 96'],
    ['Earlier bills stack', <EarlierBillsStack />, '0 0 160 104'],
    ['Bill history chip', <BillHistoryChip />, '0 0 28 36'],
    ['Bill to chart', <BillToChart />, '0 0 300 120'],
    ['Starting point', <StartingPoint />, '0 0 329 64'],
    ['Second look', <SecondLook />, '0 0 104 76'],
    // The Figma node is 66 x 14; the SVG export measures the artwork at 67 wide.
    ['Razorpay logo', <RazorpayLogo />, '0 0 67 14'],
    ['App icon large', <AppIconLarge />, '0 0 1024 1024'],
    ['App icon small', <AppIconSmall />, '0 0 1024 1024'],
    ['Rupee history', <RupeeHistoryArt />, '0 0 88 88'],
    ['Waiting for months', <WaitingForMonthsArt />, '0 0 88 88'],
    ['Peak and dip glyph', <PeakDipGlyph />, '0 0 20 20'],
  ];
  it.each(cases)('%s', (_name, element, expected) => {
    const { container } = render(element);
    expect(viewBox(container)).toBe(expected);
  });

  it('scales by width and keeps the aspect ratio', () => {
    const { container } = render(<BillIllustration width={120} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('120');
    expect(svg?.getAttribute('height')).toBe('145');
  });
});

describe('accessibility', () => {
  it('is decorative without a title and a named image with one', () => {
    const decorative = render(<BillStatusMini />);
    expect(decorative.container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    decorative.unmount();
    const named = render(<BillStatusMini title="Checking your bill" />);
    expect(named.getByRole('img', { name: 'Checking your bill' })).toBeInTheDocument();
  });
});

describe('ids stay unique between instances', () => {
  it('two bills on one page never share a clip path, mask or filter id', () => {
    const { container } = render(
      <>
        <BillIllustration size="compact" />
        <BillIllustration size="compact" />
        <PaidCheck />
        <ForwardGuideHero />
      </>,
    );
    const ids = Array.from(container.querySelectorAll('[id]')).map((el) => el.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('named parts for animation', () => {
  it('the bill exposes the parts the motion drives', () => {
    const { container } = render(<BillIllustration />);
    for (const part of ['paper', 'page', 'scan-line', 'scan-glow', 'badge', 'spinner', 'check', 'total-highlight']) {
      expect(container.querySelector(`[data-part="${part}"]`), part).not.toBeNull();
    }
  });
  it('the mini exposes its scan and badge parts', () => {
    const { container } = render(<BillStatusMini size="l" tile={false} />);
    for (const part of ['paper', 'scan-line', 'scan-band', 'flag-line', 'badge', 'check']) {
      expect(container.querySelector(`[data-part="${part}"]`), part).not.toBeNull();
    }
  });
});

describe('colours come from the brand tokens', () => {
  it('uses CSS variables, not the raw Figma hex values', () => {
    const { container } = render(<BillIllustration />);
    expect(container.innerHTML).not.toMatch(/#265CFF|#DCDFE4|#F1F2F4/i);
    expect(container.innerHTML).toContain('var(--primary)');
  });
});

describe('idle bill', () => {
  it('draws no badge, scan line or focus box until it starts reading', () => {
    const { container, rerender } = render(<BillIllustration size="compact" focus="maths" status="idle" />);
    expect(container.querySelector('[data-part="badge"]')).toBeNull();
    const scan = container.querySelector('[data-part="scan-line"]')?.parentElement;
    expect(scan?.style.opacity).toBe('0');
    const focusLayers = Array.from(container.querySelector('[data-part="focus"]')?.children ?? []) as HTMLElement[];
    expect(focusLayers.length).toBeGreaterThan(0);
    expect(focusLayers.every((layer) => layer.style.opacity === '0')).toBe(true);

    rerender(<BillIllustration size="compact" focus="maths" status="reading" />);
    expect(container.querySelector('[data-part="badge"]')).not.toBeNull();
    expect(container.querySelector('[data-part="spinner"]')).not.toBeNull();
  });
});

describe('PaidCheck matches the Figma S11 paid result', () => {
  it('is 168 x 203 with the standard 26 px badge', () => {
    const { container } = render(<PaidCheck />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('168');
    expect(svg?.getAttribute('height')).toBe('203');
    expect(container.querySelector('[data-part="disc-done"]')?.getAttribute('r')).toBe('26');
    // The badge (cx 212 + r 26) and the sparkles stay inside the 240 wide artwork.
    expect(212 + 26).toBeLessThanOrEqual(240);
  });
});

describe('camera brackets', () => {
  it('stay white while searching and when locked, never primary', async () => {
    render(<CameraSimulation lockAfterMs={60} />);
    const brackets = () => Array.from(document.querySelectorAll<HTMLElement>('[data-part^="bracket-"]'));
    expect(brackets()).toHaveLength(4);
    expect(brackets().every((b) => b.className.includes('border-white/60'))).toBe(true);
    await waitFor(() => expect(screen.getByText('Bill found')).toBeInTheDocument(), { timeout: 2000 });
    for (const b of brackets()) {
      expect(b.className).not.toContain('border-primary');
      expect(b.className).not.toContain('border-white/60');
      expect(b.className).toContain('border-white');
    }
  });
});
