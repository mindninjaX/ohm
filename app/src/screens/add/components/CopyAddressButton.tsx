import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button, toast } from '@/components/ohm';
import { FORWARD_ADDRESS } from '../copy';

/** How long the button says Copied before it goes back to Copy address. */
const COPIED_MS = 2200;

/**
 * Figma: Copy address button (11:11484), State Default | Copied. A Primary L button: copy icon and
 * "Copy address", then check icon and "Copied". Tapping copies the address (when the browser lets
 * it) and shows the "Copied" toast. Nothing else happens: the address receives no mail.
 */
export function CopyAddressButton({ address = FORWARD_ADDRESS }: { address?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(address);
    } catch {
      // Clipboard blocked (an insecure page, a locked-down browser): the prototype still says Copied.
    }
    toast.success('Copied');
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
  };

  return (
    <Button leftIcon={copied ? Check : Copy} onClick={copy} data-state={copied ? 'copied' : 'default'}>
      {copied ? 'Copied' : 'Copy address'}
    </Button>
  );
}
