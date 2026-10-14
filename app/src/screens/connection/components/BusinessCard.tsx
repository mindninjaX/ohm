import { ChevronDown } from 'lucide-react';
import { useId } from 'react';
import { Card } from '@/components/ohm';
import { BUSINESS_TYPES, type BusinessType } from '../data';

/**
 * Figma: Business card (28:37522). White card, padding 16: "Your business" and a 193 x 48 select on one line,
 * the helper under it. A real select, so the phone's own picker opens; the chevron is drawn over it.
 */
export function BusinessCard({
  value,
  onChange,
}: {
  value: BusinessType;
  onChange: (value: BusinessType) => void;
}) {
  const id = useId();
  return (
    <Card padding={16} className="gap-1">
      <div className="flex h-12 items-center justify-between gap-3">
        <label htmlFor={id} className="shrink-0 text-base font-medium text-ink">
          Your business
        </label>
        <div className="relative h-12 w-[193px] min-w-0 shrink">
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value as BusinessType)}
            className="h-12 w-full appearance-none rounded-[12px] border border-line bg-card py-0 pr-10 pl-[15px] text-base text-ink shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-primary/40"
          >
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDown size={16} aria-hidden className="pointer-events-none absolute top-4 right-4 text-ink" />
        </div>
      </div>
      <p className="text-sm text-ink-muted">We use this to check your rate plan fits.</p>
    </Card>
  );
}
