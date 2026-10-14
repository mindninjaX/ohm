import { describe, expect, it } from 'vitest';
import { formatDate, formatINR, formatPct, formatUnits } from '@/lib/format';
import * as bill from './bill';

/** Every figure specs/round2/DATA.md lists for the normal 700 kVA August bill. */

describe('the August bill totals', () => {
  it('adds the parts up to the charges before taxes', () => {
    expect(bill.BEFORE_TAXES).toBe(3_297_130);
    expect(formatINR(bill.BEFORE_TAXES)).toBe('₹32,97,130');
  });

  it('works out taxes: duty 7.5% of before taxes, sales tax 30 paise a unit', () => {
    expect(bill.DUTY).toBe(247_285);
    expect(formatINR(bill.DUTY)).toBe('₹2,47,285');
    expect(bill.SALES_TAX).toBe(97_950);
    expect(bill.TAXES).toBe(345_235);
    expect(formatINR(bill.TAXES)).toBe('₹3,45,235');
  });

  it('totals before taxes + taxes - ₹196, rounded down to the nearest ₹10', () => {
    expect(bill.TOTAL_BEFORE_ROUNDING).toBe(3_642_169);
    expect(bill.EXACT_TOTAL).toBe(3_642_168.75);
    expect(bill.TOTAL).toBe(3_642_160);
    expect(formatINR(bill.TOTAL)).toBe('₹36,42,160');
    expect(bill.ROUNDING).toBe(-9);
    expect(formatINR(bill.ROUNDING)).toBe('−₹9');
  });

  it('prices paying by Tue 8 Sep: 1% off the before-taxes charges, rounded down', () => {
    expect(bill.EARLY_DISCOUNT_EXACT).toBeCloseTo(32_971.3, 6);
    expect(bill.EARLY_DISCOUNT_ROUNDED).toBe(32_971);
    expect(bill.EARLY_PRICE).toBe(3_609_190);
    expect(formatINR(bill.EARLY_PRICE)).toBe('₹36,09,190');
  });

  it('shows the saving the user keeps: ₹32,970', () => {
    expect(bill.SAVING).toBe(32_970);
    expect(formatINR(bill.SAVING)).toBe('₹32,970');
  });

  it('prices paying after Wed 16 Sep: 1.25% on, rounded down', () => {
    expect(bill.LATE_SURCHARGE_EXACT).toBeCloseTo(45_527.11, 6);
    expect(bill.LATE_PRICE).toBe(3_687_690);
    expect(formatINR(bill.LATE_PRICE)).toBe('₹36,87,690');
    expect(bill.LATE_EXTRA).toBe(45_530);
    expect(formatINR(bill.LATE_EXTRA)).toBe('₹45,530');
  });
});

describe('booked capacity (billing demand)', () => {
  it('charges on the higher of peak and 75% of contract demand, at ₹420 a kVA', () => {
    expect(bill.BILLING_DEMAND_FLOOR_KVA).toBe(525);
    expect(bill.BILLING_DEMAND_KVA).toBe(664);
    const part = bill.PARTS.find((p) => p.id === 'booked-capacity')!;
    expect(part.amount).toBe(278_880);
    expect(formatINR(part.amount)).toBe('₹2,78,880');
  });
});

describe('the 7 parts, in S08 order', () => {
  const byId = Object.fromEntries(bill.PARTS.map((p) => [p.id, p]));

  it('is in order', () => {
    expect(bill.PARTS.map((p) => p.id)).toEqual([
      'electricity',
      'fuel',
      'wires',
      'taxes',
      'booked-capacity',
      'time-of-day',
      'balance',
    ]);
  });

  it('has every amount', () => {
    expect(formatINR(byId.electricity!.amount)).toBe('₹22,52,850');
    expect(formatINR(byId.fuel!.amount)).toBe('₹3,91,800');
    expect(formatINR(byId.wires!.amount)).toBe('₹3,59,150');
    expect(formatINR(byId.taxes!.amount)).toBe('₹3,45,235');
    expect(formatINR(byId['booked-capacity']!.amount)).toBe('₹2,78,880');
    expect(formatINR(byId['time-of-day']!.amount)).toBe('₹14,450');
    expect(formatINR(byId.balance!.amount)).toBe('−₹196');
  });

  it('has every share of the total', () => {
    expect(bill.PARTS.map((p) => p.sharePct)).toEqual([62, 11, 10, 9, 8, 0.4, null]);
  });

  it('states the maths in plain words', () => {
    expect(byId.electricity!.maths).toBe('3,26,500 units × ₹6.90');
    expect(byId.fuel!.maths).toBe('3,26,500 × ₹1.20');
    expect(byId.wires!.maths).toBe('3,26,500 × ₹1.10');
    expect(byId.taxes!.maths).toBe(
      'Duty 7.5% of ₹32,97,130 = ₹2,47,285; sales tax 30 paise × 3,26,500 = ₹97,950',
    );
    expect(byId['booked-capacity']!.maths).toBe('664 kVA × ₹420 (664 is above 75% of 700 = 525)');
    expect(byId['time-of-day']!.maths).toBe('Mornings +₹22,800, evenings +₹60,200, nights −₹68,550');
  });

  it('adds up to the printed total', () => {
    const sum = bill.PARTS.reduce((t, p) => t + p.amount, 0);
    expect(sum).toBe(bill.TOTAL_BEFORE_ROUNDING);
  });
});

describe('compared with July and last August', () => {
  it('is ₹53,820 more than July, up 1.5%', () => {
    expect(bill.VS_JULY.rupeesMore).toBe(53_820);
    expect(formatINR(bill.VS_JULY.rupeesMore)).toBe('₹53,820');
    expect(formatPct(bill.VS_JULY.rupeesPct)).toBe('1.5%');
  });

  it('is 5,700 more units than July, up 1.8%', () => {
    expect(bill.VS_JULY.unitsMore).toBe(5_700);
    expect(formatUnits(bill.VS_JULY.unitsMore)).toBe('5,700');
    expect(formatPct(bill.VS_JULY.unitsPct)).toBe('1.8%');
  });

  it('is up 2.0% in units on Aug 2025', () => {
    expect(bill.UNITS).toBe(326_500);
    expect(bill.UNITS_AUG_2025).toBe(320_140);
    expect(formatPct(bill.VS_AUG_2025.unitsPct)).toBe('2.0%');
  });
});

describe('the July bill', () => {
  it('was ₹35,88,340, paid ₹35,55,860 on Wed 5 Aug, which saved ₹32,480', () => {
    expect(bill.JULY_BILL.total).toBe(3_588_340);
    expect(bill.JULY_BILL.paid).toBe(3_555_860);
    expect(formatDate(bill.JULY_BILL.paidOn)).toBe('Wed 5 Aug');
    expect(bill.JULY_SAVING).toBe(32_480);
    expect(formatINR(bill.JULY_SAVING)).toBe('₹32,480');
  });
});

describe('units by month', () => {
  it('has 13 months from Aug 2025 to Aug 2026', () => {
    expect(bill.UNITS_BY_MONTH).toHaveLength(13);
    expect(bill.UNITS_BY_MONTH[0]!.label).toBe('Aug 2025');
    expect(bill.UNITS_BY_MONTH.at(-1)).toMatchObject({ label: 'Aug 2026', units: 326_500 });
  });

  it('totals 2025 (Aug to Dec), 2026 (Jan to Aug) and all 13 months', () => {
    expect(formatUnits(bill.UNITS_TOTAL_2025)).toBe('15,40,550');
    expect(formatUnits(bill.UNITS_TOTAL_2026)).toBe('24,80,600');
    expect(formatUnits(bill.UNITS_TOTAL_ALL)).toBe('40,21,150');
    expect(bill.UNITS_TOTAL_2025 + bill.UNITS_TOTAL_2026).toBe(bill.UNITS_TOTAL_ALL);
  });

  it('swings from Feb (lowest) to May (highest) by 80,890 units, 31% more', () => {
    expect(bill.UNITS_SWING.lowest).toMatchObject({ label: 'Feb 2026', units: 261_320 });
    expect(bill.UNITS_SWING.highest).toMatchObject({ label: 'May 2026', units: 342_210 });
    expect(bill.UNITS_SWING.difference).toBe(80_890);
    expect(bill.UNITS_SWING.highestOverLowestPct).toBe(31);
  });

  it('has rupee bars only for Jul and Aug 2026', () => {
    expect(bill.RUPEES_BY_MONTH.map((m) => [m.label, m.total])).toEqual([
      ['Jul 2026', 3_588_340],
      ['Aug 2026', 3_642_160],
    ]);
  });
});

describe('dates', () => {
  it('has the early window: 7 days, 5 left on Thu 3 Sep, 2 gone', () => {
    expect(bill.EARLY_WINDOW).toEqual({ totalDays: 7, daysLeft: 5, daysGone: 2 });
    expect(formatDate(bill.DEMO_TODAY)).toBe('Thu 3 Sep');
    expect(formatDate(bill.BILL_ISSUED_ON)).toBe('Tue 1 Sep');
    expect(formatDate(bill.EARLY_DEADLINE)).toBe('Tue 8 Sep');
    expect(formatDate(bill.DUE_DATE)).toBe('Wed 16 Sep');
    expect(formatDate(bill.LATE_FROM)).toBe('Thu 17 Sep');
  });
});

describe('the checks and the reassurance', () => {
  it('has 6 checks and all pass', () => {
    expect(bill.CHECKS).toHaveLength(6);
    expect(bill.CHECKS.every((c) => c.pass)).toBe(true);
  });

  it('words the discount check with the rounding sentence', () => {
    expect(bill.CHECKS[5]!.detail).toBe(
      '1% of ₹32,97,130 before taxes is ₹32,971. Both totals are rounded down to the nearest ₹10, so you pay ₹32,970 less.',
    );
  });

  it('words the other checks from the readings', () => {
    expect(bill.CHECKS[1]!.detail).toBe('700 kVA, same as your first bill.');
    expect(bill.CHECKS[3]!.detail).toBe('2,000, same as your first bill.');
    expect(bill.CHECKS[4]!.detail).toBe('Peak demand 664 of 700 kVA, power factor 0.998.');
  });
});

describe('payment and notification', () => {
  it('records the S11 payment', () => {
    expect(formatINR(bill.PAYMENT.amount)).toBe('₹36,09,190');
    expect(formatINR(bill.PAYMENT.saved)).toBe('₹32,970');
    expect(formatDate(bill.PAYMENT.paidAt, { time: true })).toBe('Thu 3 Sep 2026, 11:42 AM');
    expect(bill.PAYMENT).toMatchObject({
      gateway: 'Razorpay',
      method: 'Net banking',
      bank: 'HDFC Bank',
      utr: 'HDFCR52026090312345',
    });
  });

  it('words the S02 notification', () => {
    expect(bill.NOTIFICATION.title).toBe('August power bill: ₹36,42,160');
    expect(bill.NOTIFICATION.body).toBe(
      'No hidden charges or penalties.\nPay by Tue 8 Sep to save ₹32,970.',
    );
  });
});

describe('the people and the contract', () => {
  it('has the contract facts', () => {
    expect(bill.CONTRACT_DEMAND_KVA).toBe(700);
    expect(bill.METER_MULTIPLIER).toBe(2000);
    expect(bill.PEAK_DEMAND_KVA).toBe(664);
    expect(bill.POWER_FACTOR).toBe(0.998);
    expect(bill.ACCOUNT_NUMBER_MASKED).toBe('4410 28••••');
    expect(formatDate(bill.CONNECTED_SINCE, { year: true })).toBe('Wed 3 Mar 2021');
  });
});
