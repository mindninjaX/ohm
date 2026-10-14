import { Card } from '@/components/ohm';
import { StartingPoint } from '@/illustrations';

/**
 * Figma: Starting point card (28:36850). Primary subtle, padding 16, 12 between the strip and the line of text.
 * The strip is the one Figma illustration: the pinned August bill, a dashed arrow, two bills that pass and one
 * where a change is caught. It scales down on a narrow phone.
 */
export function StartingPointCard() {
  return (
    <Card tone="primary-subtle" padding={16}>
      <StartingPoint className="h-auto w-full max-w-[329px]" />
      <p className="text-sm text-ink">Ohm read these from your bill. Check them once. Every new bill is checked against them.</p>
    </Card>
  );
}
