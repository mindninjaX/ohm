import { useCallback, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
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
 *
 * The bill can only be paid once: opening /pay when `paid` is already set (Forward, a saved link) is a no-op that
 * replaces itself with the receipt. It looks at the flag as the screen opens, so recording the payment below
 * never sends the screen anywhere on its own.
 */
export function PayScreen() {
  const navigate = useNavigate();
  const { flags, setFlag } = useDemo();
  const capture = useCapture();
  const finished = useRef(false);
  const [alreadyPaid] = useState(() => flags.paid && !capture);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setFlag('paid', true);
    navigate('/', { replace: true });
    navigate('/paid', { state: PAID_FROM_PAY });
  }, [navigate, setFlag]);

  if (alreadyPaid) return <Navigate to="/paid" replace />;

  return (
    <div
      data-slot="screen"
      className="flex min-h-full flex-1 flex-col items-center justify-center bg-card pt-[var(--safe-top,0px)] pb-[var(--safe-bottom,34px)]"
    >
      <RazorpayLoader durationMs={LOADER_MS} onComplete={capture ? undefined : finish} />
    </div>
  );
}
