import { ForwardGuideHero } from '@/illustrations';
import { FORWARD_ADDRESS } from '../copy';
import { NumberedStep } from './NumberedStep';

/**
 * Figma: Ohm / Forward guide (28:40198): the envelope hero, then a white card (1 px `line`, radius 16,
 * padding 16) with three numbered steps 12 apart. 12 between the hero and the card.
 */
export function ForwardGuide() {
  return (
    <div data-slot="forward-guide" className="flex flex-col gap-3">
      <ForwardGuideHero />
      <ol className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-4">
        <NumberedStep n={1}>Open Northgrid&apos;s email in your mail app</NumberedStep>
        <NumberedStep n={2} emphasis={FORWARD_ADDRESS}>
          Forward it to this address
        </NumberedStep>
        <NumberedStep n={3}>We read it and let you know.</NumberedStep>
      </ol>
    </div>
  );
}
