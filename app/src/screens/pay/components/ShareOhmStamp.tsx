import { BillStatusMini } from '@/components/ohm';
import { REASSURANCE } from '@/data/bill';
import { BoltIcon } from './icons';

/**
 * Figma: Share / Ohm stamp (28:37427), Checks Clear. A 1 px `line` outline, radius 12, padding 12, the
 * Bill status mini (Checked, M) and two lines: "Checked by Ohm" (Text-sm/Semi Bold `ink-strong`, with a
 * `primary` bolt) over the reassurance phrase in `success`. The mini rests: the stamp is part of a picture.
 */
export function ShareOhmStamp() {
  return (
    <div data-slot="share-ohm-stamp" className="flex items-center gap-2.5 rounded-xl border border-line p-3">
      <BillStatusMini state="checked" size="m" tile still />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-sm">
        <p className="flex items-center gap-1 font-semibold text-ink-strong">
          <BoltIcon className="shrink-0 text-primary" />
          Checked by Ohm
        </p>
        <p className="font-medium text-success">{REASSURANCE.phrase}</p>
      </div>
    </div>
  );
}
