import { Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ohm';

/**
 * "Where these numbers come from": the Secondary M button that opens the sources sheet (S01.3). On a phone narrower than 380 px
 * the label would not fit the card, so it gets a little less padding and the 14 px size there.
 */
export function SourceButton({ from }: { from?: 'trends' }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="secondary"
      size="m"
      leftIcon={Info}
      className="max-[380px]:px-3 max-[380px]:text-sm"
      onClick={() => navigate('/home/sources', { state: { from } })}
    >
      Where these numbers come from
    </Button>
  );
}
