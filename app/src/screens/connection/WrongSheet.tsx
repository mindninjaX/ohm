import { FileX2, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Footnote, SectionHeader, SheetPanel } from '@/components/ohm';
import { OptionsCard, type OptionRow } from './components/OptionsCard';
import { DETAILS } from './data';

/**
 * S05.1 What looks off (Figma 11:13504), a sheet over Your connection. Pick a detail to see it on the bill, or say the
 * whole bill is wrong, or hand it to the Ohm team. The two numbers that change money open Fix contract demand (S05.3);
 * the others go to the Ohm team with that detail already chosen.
 */
export function WrongSheet() {
  const navigate = useNavigate();
  const details: OptionRow[] = DETAILS.map((d) => ({
    key: d.id,
    title: d.label,
    value: d.value,
    onClick: () =>
      navigate(d.fixable ? `/connection/fix?detail=${d.id}` : `/connection/ask?detail=${d.id}`),
  }));
  const other: OptionRow[] = [
    {
      key: 'not-my-bill',
      title: 'This is not my bill',
      subtitle: 'Upload the right one',
      icon: FileX2,
      onClick: () => navigate('/add'),
    },
    {
      key: 'not-sure',
      title: 'Not sure',
      subtitle: 'Ask the Ohm team to look',
      icon: MessageCircle,
      onClick: () => navigate('/connection/ask'),
    },
  ];
  return (
    <SheetPanel title="What looks off?">
      <p className="text-base text-ink-muted">Pick a detail to see it on your bill. You can fix it from there.</p>
      <OptionsCard rows={details} />
      <section className="flex flex-col gap-1">
        <SectionHeader title="Something else" />
        <OptionsCard rows={other} />
      </section>
      <Footnote align="center">Fixing a detail does not hold up paying your bill.</Footnote>
    </SheetPanel>
  );
}
