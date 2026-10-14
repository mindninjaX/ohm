import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { SheetPanel } from '@/components/ohm';
import { CopyAddressButton } from './components/CopyAddressButton';
import { ForwardGuide } from './components/ForwardGuide';
import lockWallpaper from './assets/lock-wallpaper.jpg';

/**
 * S03.1 Forward the email (/add/email, a sheet over Home). Figma: Ohm / Sheet holding the Forward guide
 * (the envelope, three numbered steps) and the Copy address button, 16 apart.
 *
 * Copy address copies the address and shows the "Copied" toast. The quiet link under the button,
 * "Simulate the email arriving", is not in Figma: it is the prototype's way to make the email arrive,
 * and it opens the lock screen notification (S02). It sits in the white space under the button, so the
 * sheet keeps exactly the height Figma draws.
 */
export function ForwardEmailSheet() {
  const navigate = useNavigate();
  // The lock screen is next: have its wallpaper ready so it does not pop in.
  useEffect(() => {
    new Image().src = lockWallpaper;
  }, []);
  return (
    <SheetPanel title="Forward the email">
      <ForwardGuide />
      <CopyAddressButton />
      {/* Positioned against the sheet wrapper from the shell (the nearest positioned ancestor): it sits in the
          white space under the button, centred between the button and the bottom edge, clear of the home indicator. */}
      <button
        type="button"
        data-slot="simulate-email"
        onClick={() => navigate('/notification')}
        className="absolute inset-x-0 bottom-[calc((20px+var(--safe-bottom,34px))/2-18px)] mx-auto flex h-9 w-fit items-center whitespace-nowrap rounded-full px-3 text-sm font-medium text-ink-muted underline decoration-line-strong decoration-1 underline-offset-4 outline-none transition-colors hover:text-ink focus-visible:ring-[3px] focus-visible:ring-primary/40"
      >
        Simulate the email arriving
      </button>
    </SheetPanel>
  );
}
