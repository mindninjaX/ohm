import { ArrowUp } from 'lucide-react';
import { VS_JULY } from '@/data/bill';
import { formatINR, formatPct } from '@/lib/format';

/**
 * Figma: Share / Change row (28:37436). A 28 circle on `surface-muted` with a 16 arrow, then two lines:
 * "Up ₹53,820 from July" (Text-sm/Medium `ink`) and "Usage rose 1.8%" (Text-sm `ink-muted`).
 */
export function ShareChangeRow() {
  return (
    <div data-slot="share-change-row" className="flex items-center gap-3">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-muted text-ink-muted">
        <ArrowUp size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden />
      </span>
      <div className="flex min-w-0 flex-1 flex-col text-sm">
        <p className="font-medium text-ink">Up {formatINR(VS_JULY.rupeesMore)} from July</p>
        <p className="text-ink-muted">Usage rose {formatPct(VS_JULY.unitsPct)}</p>
      </div>
    </div>
  );
}
