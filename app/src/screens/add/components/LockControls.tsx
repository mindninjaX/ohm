import { LockGlass } from './LockGlass';

/** The glyph colour on the glass: #d9d9d9 at 90%, added to the glass (a linear dodge) in Figma. */
const GLYPH = 'rgb(242 241 255)';

/** SF Symbols "flashlight.off.fill", redrawn: a head with a lip, a neck, a body with the switch slot. */
function FlashlightGlyph() {
  return (
    <svg width="17" height="34" viewBox="0 0 17 34" aria-hidden="true">
      <path d="M2.2 0.8h12.6c.7 0 1.2.6 1.1 1.3l-.5 4.4H1.6L1.1 2.1C1 1.4 1.5.8 2.2.8Z" fill={GLYPH} />
      <path d="M1.9 8.4h13.2l-1.3 3.6c-.2.5-.3 1-.3 1.5v16.1c0 2-1.6 3.4-3.6 3.4h-2.8c-2 0-3.6-1.4-3.6-3.4V13.5c0-.5-.1-1-.3-1.5L1.9 8.4Z" fill={GLYPH} />
      <rect x="6.3" y="14.2" width="4.4" height="8.4" rx="2.2" fill="rgb(52 55 86)" />
      <rect x="7.4" y="16.1" width="2.2" height="2.6" rx="1.1" fill={GLYPH} />
    </svg>
  );
}

/** SF Symbols "camera.fill", redrawn: the body, the bump on top, the lens ring and the small dot. */
function CameraGlyph() {
  return (
    <svg width="34" height="27" viewBox="0 0 34 27" aria-hidden="true">
      <path
        d="M12.2 1.2c.5-.7 1.2-1.2 2.1-1.2h5.4c.9 0 1.6.5 2.1 1.2l1 1.5c.3.5.9.8 1.5.8H29c2.8 0 5 2.2 5 5v12.5c0 2.8-2.2 5-5 5H5c-2.8 0-5-2.2-5-5V8.5c0-2.8 2.2-5 5-5h4.7c.6 0 1.2-.3 1.5-.8l1-1.5Z"
        fill={GLYPH}
      />
      <circle cx="17" cy="15.2" r="7.6" fill="rgb(78 84 128)" />
      <circle cx="17" cy="15.2" r="4.6" fill={GLYPH} opacity="0.92" />
      <circle cx="28.4" cy="8.2" r="1.7" fill="rgb(78 84 128)" />
    </svg>
  );
}

/**
 * Figma: iOS / Controls on the lock screen: the flashlight and the camera, two 58 px glass circles, 46 from
 * each side and 50 from the bottom. They do nothing here (the prototype's lock screen is only the notification).
 */
export function LockControls() {
  return (
    <div
      data-slot="lock-controls"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[46px] bottom-[50px] flex items-center justify-between"
    >
      <LockGlass radius={29} className="size-[58px]">
        <div className="grid size-[58px] place-items-center">
          <FlashlightGlyph />
        </div>
      </LockGlass>
      <LockGlass radius={29} className="size-[58px]">
        <div className="grid size-[58px] place-items-center">
          <CameraGlyph />
        </div>
      </LockGlass>
    </div>
  );
}
