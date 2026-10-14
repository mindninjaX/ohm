import { Button } from '@/components/ohm';
import { EarlierBillsStack } from '@/illustrations';

/** Figma: Empty note. A quiet note for something that is not there: the art, a title, one line, and a link. */
export function EmptyNote({
  title,
  body,
  link,
  onLinkClick,
}: {
  title: string;
  body: string;
  link: string;
  onLinkClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-2">
      <div className="pb-1">
        <EarlierBillsStack width={160} />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-base font-semibold text-ink-strong">{title}</h2>
        <p className="text-sm text-ink-muted">{body}</p>
      </div>
      <Button variant="link" size="m" onClick={onLinkClick}>
        {link}
      </Button>
    </div>
  );
}
