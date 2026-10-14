import { CircleCheck, Paperclip } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ohm';

/**
 * Figma: Attach row (28:38820). A Secondary L button with a paperclip, and a 12/16 helper under it, 8 apart, in a row that
 * is 80 tall (8 spare below the helper).
 * Nothing is uploaded: a tap marks a photo as added (the paperclip becomes a check) and a second tap takes it off.
 */
export function AttachRow({
  label,
  addedLabel = 'Photo added',
  helper,
}: {
  label: string;
  addedLabel?: string;
  helper: string;
}) {
  const [added, setAdded] = useState(false);
  return (
    <div className="flex min-h-20 flex-col gap-2" data-slot="attach-row">
      <Button
        variant="secondary"
        leftIcon={added ? CircleCheck : Paperclip}
        onClick={() => setAdded((a) => !a)}
        aria-pressed={added}
      >
        {added ? addedLabel : label}
      </Button>
      <p className="text-center text-xs text-ink-muted">{helper}</p>
    </div>
  );
}
