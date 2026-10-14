import type { ReactNode } from 'react';

/** Figma: Share / Card heading (28:37428). A Text-base/Semi Bold `ink-strong` title over a Text-sm `ink-muted` subtitle. */
export function ShareCardHeading({ title, subtitle }: { title: ReactNode; subtitle: ReactNode }) {
  return (
    <div data-slot="share-card-heading" className="flex flex-col">
      <p className="text-base font-semibold text-ink-strong">{title}</p>
      <p className="text-sm text-ink-muted">{subtitle}</p>
    </div>
  );
}
