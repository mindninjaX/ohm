import { useNavigate } from 'react-router';
import { Button, SheetPanel, toast } from '@/components/ohm';
import { useSheetClose } from '@/shell';
import { clearReadingDone } from './useReadingSimulation';

/**
 * S04.2 Stop reading (/reading/stop, a sheet over Reading). Figma: Ohm / Sheet, the explanation in
 * Text-base/Regular `ink-muted`, a Destructive L button and a Secondary L button, 8 apart.
 *
 * Stop reading removes the (simulated) file, shows the "Bill removed" toast and lands on Home. Keep
 * reading closes the sheet and the reading carries on behind it.
 */
export function StopReadingSheet() {
  const navigate = useNavigate();
  const close = useSheetClose();

  const stop = () => {
    // The bill is gone: the next read starts from scratch.
    clearReadingDone();
    toast.success('Bill removed');
    // Reading and its sheet are the last two entries: step back over both to Home when we can,
    // otherwise (a deep link) replace them.
    const state: unknown = window.history.state;
    const idx = state && typeof state === 'object' && 'idx' in state ? (state as { idx: unknown }).idx : undefined;
    if (typeof idx === 'number' && idx >= 2) navigate(-2);
    else navigate('/', { replace: true, state: { ohmDirection: 'back' } });
  };

  return (
    <SheetPanel
      title="Stop reading?"
      footer={
        <>
          <Button variant="destructive" onClick={stop}>
            Stop reading
          </Button>
          <Button variant="secondary" onClick={close}>
            Keep reading
          </Button>
        </>
      }
    >
      <p className="text-base text-ink-muted">
        Ohm will delete the file you uploaded. Nothing has been paid or changed. You can add the bill again any time.
      </p>
    </SheetPanel>
  );
}
