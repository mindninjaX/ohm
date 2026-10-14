import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useReduced } from '@/components/ohm';
import { useChromeTone } from '@/shell';
import { LockControls } from './components/LockControls';
import { LockNotification } from './components/LockNotification';
import lockWallpaper from './assets/lock-wallpaper.jpg';

/** How far (px) or how fast (px/s) a swipe up from the bottom edge has to go to unlock. */
const UNLOCK_DISTANCE = 60;
const UNLOCK_VELOCITY = 500;

/**
 * S02 Notification (/notification): the iPhone lock screen at 9:41 on Thu 3 Sep, with the August bill's
 * notification. Tap it to open the bill (S06). Swiping up from the bottom edge (Figma's "Unlock" hotspot, a
 * 44 px strip) unlocks to Home instead; a tap on that strip does the same, and it is a real button for the
 * keyboard.
 *
 * The wallpaper, the date and the glass clock are one image exported from Figma ("iOS / Lock Screen",
 * 3x): they are the phone's, not the app's. The notification and the two controls are built here and
 * sit where Figma puts them, measured from the bottom edge, so a shorter phone keeps them in reach.
 * Dark chrome: white status bar, white home indicator, a dark browser bar.
 */
export function NotificationScreen() {
  const navigate = useNavigate();
  const reduced = useReduced();
  useChromeTone({ statusBar: 'light', homeIndicator: 'light', themeColor: '#091e42', showTime: false });

  // The lock screen follows a swipe up and dims a little.
  const lift = useMotionValue(0);
  const dim = useTransform(lift, [0, -240], [1, 0.55]);
  const unlock = () => navigate('/');
  // A drag that ends where it started still raises a click; only a real tap should unlock.
  const dragged = useRef(false);

  return (
    <div data-slot="screen" className="relative isolate flex min-h-full flex-1 flex-col overflow-hidden bg-[#0b0c1e]">
      <motion.div className="absolute inset-0" style={{ y: lift, opacity: dim }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-[position:50%_0%] bg-no-repeat"
          style={{ backgroundImage: `url(${lockWallpaper})` }}
        />
        <h1 className="sr-only">Lock screen, Thursday 3 September, 9:41</h1>
        <div className="absolute inset-x-3.5 bottom-[138px]">
          <LockNotification onOpen={() => navigate('/bill')} />
        </div>
        <LockControls />
      </motion.div>
      <motion.button
        type="button"
        aria-label="Unlock and go to Home"
        data-slot="unlock"
        className="absolute inset-x-0 bottom-0 z-10 h-11 cursor-pointer touch-none outline-none focus-visible:ring-[3px] focus-visible:ring-white/60"
        onPointerDown={() => {
          dragged.current = false;
        }}
        onClick={() => {
          if (!dragged.current) unlock();
        }}
        onPan={(_, info) => {
          dragged.current = true;
          if (!reduced) lift.set(Math.min(0, info.offset.y));
        }}
        onPanEnd={(_, info) => {
          if (info.offset.y < -UNLOCK_DISTANCE || info.velocity.y < -UNLOCK_VELOCITY) unlock();
          else animate(lift, 0, { type: 'spring', stiffness: 400, damping: 34 });
        }}
      />
    </div>
  );
}
