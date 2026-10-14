import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button, SheetPanel } from '@/components/ohm';
import { useCapture } from '@/shell';
import { CopyAddressButton } from './components/CopyAddressButton';
import { ForwardGuide } from './components/ForwardGuide';
import { IN_FIGMA } from './copy';
import lockWallpaper from './assets/lock-wallpaper.jpg';

/**
 * S03.1 Forward the email (/add/email, a sheet over Home). Figma: Ohm / Sheet holding the Forward guide
 * (the envelope, three numbered steps) and the Copy address button, 16 apart.
 *
 * Copy address copies the address and shows the "Copied" toast. "Simulate the email arriving" is the prototype's
 * way to make the email arrive, and it opens the lock screen notification (S02). It is a Link M button in the
 * sheet's footer slot, above the home indicator zone, so the sheet is 32 px taller (480) than without it. Figma
 * draws it too since 14 Oct (an Ohm / Button Link M instance in the sheet's Content slot); see IN_FIGMA in copy.ts.
 */
export function ForwardEmailSheet() {
  const navigate = useNavigate();
  const capture = useCapture();
  // The lock screen is next: have its wallpaper ready so it does not pop in.
  useEffect(() => {
    new Image().src = lockWallpaper;
  }, []);
  const showLink = !capture || IN_FIGMA.simulateEmail;
  return (
    <SheetPanel
      title="Forward the email"
      footer={
        showLink ? (
          // The content above ends 20 px under the Copy button; the link pulls up 8 of them.
          <Button variant="link" size="m" className="-mt-2 self-center" data-slot="simulate-email" onClick={() => navigate('/notification')}>
            Simulate the email arriving
          </Button>
        ) : undefined
      }
    >
      <ForwardGuide />
      <CopyAddressButton />
    </SheetPanel>
  );
}
