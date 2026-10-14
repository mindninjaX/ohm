import { cn } from '@/lib/utils';
import { useChromeTones } from './chrome';

/**
 * The drawn iOS home indicator for the desktop phone frame and capture mode: 144 x 5 (the size in the
 * Figma "iOS / Home indicator" component), 8 px above the bottom edge. Decorative.
 */
export function HomeIndicator() {
  const { homeIndicator } = useChromeTones();
  return (
    <div
      aria-hidden="true"
      data-slot="home-indicator"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[60] flex justify-center"
    >
      <span
        className={cn(
          'mb-2 h-[5px] w-[144px] rounded-full transition-colors duration-200',
          homeIndicator === 'light' ? 'bg-white' : 'bg-black',
        )}
      />
    </div>
  );
}
