import { Clock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Alert, Button, Card, Footer, Header, ScreenScaffold } from '@/components/ohm';
import { EARLY_DEADLINE, SAVING } from '@/data/bill';
import { SecondLook } from '@/illustrations';
import { formatDate, formatINR } from '@/lib/format';
import { AttachRow } from './components/AttachRow';
import { SelectField, TextareaField } from './components/Field';
import { DETAILS, detailById, setChange } from './data';

const NOT_SURE = 'Not sure';
const WHICH = [NOT_SURE, ...DETAILS.map((d) => d.label)] as const;

/**
 * S05.4 Ask the Ohm team (Figma 11:15577). Say which detail looks off and, if you like, what and add a photo; Send
 * puts the detail in "Being checked" on Your connection (S05.9) with a toast. You do not have to wait: the early
 * payment discount still applies.
 */
export function AskScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preset = params.get('detail');
  const [which, setWhich] = useState<string>(preset ? detailById(preset).label : NOT_SURE);
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);

  const send = () => {
    setSending(true);
    window.setTimeout(() => {
      // "Not sure" has no detail of its own: the Ohm team starts with the one that changes money most.
      const detail = DETAILS.find((d) => d.label === which) ?? DETAILS[0]!;
      setChange({ kind: 'sent', detail: detail.id });
      navigate('/connection?changed=sent', { replace: true, state: { ohmDirection: 'back' } });
    }, 700);
  };

  return (
    <ScreenScaffold
      header={<Header type="back" title="Ask the Ohm team" backTo="/connection" />}
      contentClassName="gap-4 pt-2"
      footer={
        <Footer>
          <Button loading={sending} onClick={send}>
            Send to the Ohm team
          </Button>
        </Footer>
      }
    >
      <div className="flex h-[76px] justify-center">
        <SecondLook />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-xl font-semibold text-ink-strong">We will check it for you</h2>
        <p className="text-base text-ink-muted">Someone at Ohm checks your details against your bill and notifies you.</p>
      </div>
      <Alert
        tone="info"
        icon={Clock}
        title="You do not have to wait for us"
        description={`Pay by ${formatDate(EARLY_DEADLINE)} and you still save ${formatINR(SAVING)}.`}
      />
      <Card padding={16}>
        <div className="flex flex-col gap-3">
          <SelectField label="Which detail?" value={which} onChange={setWhich} options={WHICH} />
          <TextareaField
            label="What looks off? (optional)"
            placeholder="For example: our agreement with Northgrid says something different."
            value={note}
            onChange={setNote}
          />
          <AttachRow
            label="Add a photo or PDF"
            addedLabel="File added"
            helper="Your agreement with Northgrid helps us most."
          />
        </div>
      </Card>
    </ScreenScaffold>
  );
}
