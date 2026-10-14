import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button, Footer, Header, ScreenScaffold } from '@/components/ohm';
import { AttachRow } from './components/AttachRow';
import { CompareTiles } from './components/CompareTiles';
import { NumberField } from './components/Field';
import { detailById, formatAmount, setChange } from './data';

/**
 * S05.3 Fix contract demand (Figma 11:15450). Two tiles say what the bill shows and what you say; type the number
 * from your agreement and Save makes it the new starting point (Your connection, set by you, S05.8).
 *
 *  - `?detail=meter-multiplier` is the same screen for the other number that changes money.
 *  - `?mode=bill` is "We read it wrong": the tiles read "We read" and "Your bill shows", and the number is what the
 *    bill prints (no agreement photo).
 *  - The tiles and the badge follow what you type. An empty box cannot be saved.
 *  - Nothing is stored anywhere: the number lives for this visit and shows on Your connection.
 */
export function FixScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const detail = detailById(params.get('detail'));
  const fromBill = params.get('mode') === 'bill';
  const billAmount = detail.amount ?? 0;
  const [text, setText] = useState(String(billAmount));
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  const n = text === '' ? null : Number(text);
  const empty = n === null || n === 0;
  const lower = detail.label.toLowerCase();

  const save = () => {
    setTouched(true);
    if (empty || n === null) return;
    setSaving(true);
    window.setTimeout(() => {
      setChange({ kind: 'set', detail: detail.id, value: n, source: fromBill ? 'bill' : 'agreement' });
      // Replace this screen with Your connection and play it as a step back: it was a detour.
      navigate('/connection?changed=set', { replace: true, state: { ohmDirection: 'back' } });
    }, 550);
  };

  return (
    <ScreenScaffold
      header={<Header type="back" title={`Fix ${lower}`} backTo="/connection" />}
      contentClassName="pt-3"
      footer={
        <Footer>
          <Button loading={saving} onClick={save}>
            {fromBill ? 'Save and recheck' : 'Save'}
          </Button>
        </Footer>
      }
    >
      <CompareTiles
        billCaption={fromBill ? 'We read' : 'On your bill'}
        billValue={formatAmount(detail, billAmount)}
        yoursCaption={fromBill ? 'Your bill shows' : 'Your agreement'}
        yoursValue={empty ? null : formatAmount(detail, n)}
        match={n === billAmount}
      />
      <NumberField
        label={fromBill ? `${detail.label} as printed on your bill` : `${detail.label} on your agreement`}
        help={fromBill ? 'Type it exactly as it appears on page 1.' : 'You will find it on your agreement with Northgrid.'}
        error={touched && empty ? (fromBill ? 'Enter the number on your bill.' : 'Enter the number from your agreement.') : undefined}
        value={text}
        onChange={(v) => setText(v)}
        unit={detail.unit}
      />
      {fromBill ? (
        <Button variant="link" onClick={() => navigate('/add')}>
          Or upload a clearer copy of the bill
        </Button>
      ) : (
        <AttachRow label="Add a photo of your agreement" helper="Optional. Useful if you raise this with Northgrid." />
      )}
    </ScreenScaffold>
  );
}
