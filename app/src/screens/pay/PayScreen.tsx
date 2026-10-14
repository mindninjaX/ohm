import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { RazorpayLoader } from '@/illustrations';
import { useCapture, useDemo } from '@/shell';
import { PAID_FROM_PAY } from './paidState';

/** How long the simulated hand-off to Razorpay takes (BUILD_PLAN: about 1.5 s). */
const LOADER_MS = 1500;

/**
 * /pay: "Opening Razorpay". Nothing is paid and nothing opens: the Razorpay logo breathes above a thin
 * progress bar for about 1.5 s, then the payment is recorded (demo flag `paid`) and the loader is replaced
 * with Paid, so Back from Paid never lands on the loader:
 *
 *   before: ... / > /bill > /pay
 *   after:  ... / > /bill > /  > /paid       (the loader's entry becomes Home, then Paid is pushed)
 *
 * so Back from Paid goes home. In capture mode (`?capture=1`) it just shows the loader.
 */
export function PayScreen() {
  const navigate = useNavigate();
  const { setFlag } = useDemo();
  const capture = useCapture();
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setFlag('paid', true);
    navigate('/', { replace: true });
    navigate('/paid', { state: PAID_FROM_PAY });
  }, [navigate, setFlag]);

  return (
    <div
      data-slot="screen"
      className="flex min-h-full flex-1 flex-col items-center justify-center bg-card pt-[var(--safe-top,0px)] pb-[var(--safe-bottom,34px)]"
    >
      <RazorpayLoader durationMs={LOADER_MS} onComplete={capture ? undefined : finish} />
    </div>
  );
}
