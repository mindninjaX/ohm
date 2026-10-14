import { describe, expect, it } from 'vitest';
import { formatDate, formatINR, formatPct, formatUnits } from './format';

describe('formatINR', () => {
  it('groups in lakh and crore', () => {
    expect(formatINR(3642160)).toBe('₹36,42,160');
    expect(formatINR(3609190)).toBe('₹36,09,190');
    expect(formatINR(32970)).toBe('₹32,970');
    expect(formatINR(196)).toBe('₹196');
    expect(formatINR(0)).toBe('₹0');
    expect(formatINR(10000000)).toBe('₹1,00,00,000');
  });

  it('puts a true minus sign before the rupee sign', () => {
    expect(formatINR(-196)).toBe('−₹196');
    expect(formatINR(-6855000 / 100)).toBe('−₹68,550');
  });

  it('shows two decimals for part-rupee amounts and honours explicit decimals', () => {
    expect(formatINR(6.9)).toBe('₹6.90');
    expect(formatINR(32971.3)).toBe('₹32,971.30');
    expect(formatINR(4966.5)).toBe('₹4,966.50');
    expect(formatINR(3642168.75)).toBe('₹36,42,168.75');
    expect(formatINR(3642168.75, { decimals: 0 })).toBe('₹36,42,169');
    expect(formatINR(420, { decimals: 2 })).toBe('₹420.00');
  });

  it('can force a plus sign', () => {
    expect(formatINR(22800, { signed: true })).toBe('+₹22,800');
    expect(formatINR(-68550, { signed: true })).toBe('−₹68,550');
    expect(formatINR(0, { signed: true })).toBe('₹0');
  });

  it('never prints a negative zero', () => {
    expect(formatINR(-0)).toBe('₹0');
    expect(formatINR(-0.001, { decimals: 0 })).toBe('₹0');
  });
});

describe('formatUnits', () => {
  it('groups in lakh', () => {
    expect(formatUnits(326500)).toBe('3,26,500');
    expect(formatUnits(320800)).toBe('3,20,800');
    expect(formatUnits(5700)).toBe('5,700');
    expect(formatUnits(4021150)).toBe('40,21,150');
  });

  it('adds the word on request', () => {
    expect(formatUnits(326500, { label: true })).toBe('3,26,500 units');
    expect(formatUnits(1, { label: true })).toBe('1 unit');
  });
});

describe('formatPct', () => {
  it('defaults to one decimal', () => {
    expect(formatPct(1.4998)).toBe('1.5%');
    expect(formatPct(1.777)).toBe('1.8%');
    expect(formatPct(1.9867)).toBe('2.0%');
  });

  it('takes a number of decimals', () => {
    expect(formatPct(61.86, 0)).toBe('62%');
    expect(formatPct(0.3967, 1)).toBe('0.4%');
  });

  it('uses a true minus sign', () => {
    expect(formatPct(-1.5)).toBe('−1.5%');
    expect(formatPct(-0.001)).toBe('0.0%');
  });
});

describe('formatDate', () => {
  it('writes weekday, day and month', () => {
    expect(formatDate('2026-09-08')).toBe('Tue 8 Sep');
    expect(formatDate('2026-09-16')).toBe('Wed 16 Sep');
    expect(formatDate('2026-09-17')).toBe('Thu 17 Sep');
    expect(formatDate('2026-09-01')).toBe('Tue 1 Sep');
  });

  it('adds the year and the time', () => {
    expect(formatDate('2026-09-03T11:42:00+05:30', { year: true })).toBe('Thu 3 Sep 2026');
    expect(formatDate('2026-09-03T11:42:00+05:30', { time: true })).toBe('Thu 3 Sep 2026, 11:42 AM');
    expect(formatDate('2026-09-03T15:05:00+05:30', { time: true })).toBe('Thu 3 Sep 2026, 3:05 PM');
  });

  it('reads in India time whatever the machine zone is', () => {
    // 18:30 UTC on 2 Sep is 00:00 on 3 Sep in India.
    expect(formatDate(new Date('2026-09-02T18:30:00Z'))).toBe('Thu 3 Sep');
    expect(formatDate('2026-08-05', { year: true })).toBe('Wed 5 Aug 2026');
  });
});
