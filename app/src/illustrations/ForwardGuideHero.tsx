import { ArtForward } from './AddBillArt';
import type { IllustrationProps } from './svg';

/**
 * Figma: Ohm / Forward guide (28:40198) > Hero. The envelope with the forward badge, sitting directly on
 * white (round 3: no blue background). It idles slowly: the letter lifts out of the envelope and the
 * arrow nudges right, then it rests. 96 px tall, centred.
 */
export function ForwardGuideHero({ className, ...art }: IllustrationProps) {
  return (
    <div className={`flex h-24 items-center justify-center bg-card ${className ?? ''}`}>
      <ArtForward idle {...art} />
    </div>
  );
}
