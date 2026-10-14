import { lazy, Suspense, useState, type CSSProperties } from 'react';
import { Button } from '@/components/ohm/Button';
import { Spinner } from '@/components/ohm/Spinner';

/**
 * /gallery: the Ohm components and the illustrations, in the phone, behind two tabs. A dev and
 * review page: it is not one of the routes in routes.ts, nothing links to it and it does not count
 * towards the route list. Each gallery loads on demand, so none of it is in the main bundle.
 */
const ComponentsGallery = lazy(() => import('@/components/ohm/Gallery').then((m) => ({ default: m.Gallery })));
const IllustrationsGallery = lazy(() => import('@/illustrations/Gallery').then((m) => ({ default: m.Gallery })));

type GalleryTab = 'components' | 'illustrations';

const TABS: readonly { id: GalleryTab; label: string }[] = [
  { id: 'components', label: 'Components' },
  { id: 'illustrations', label: 'Illustrations' },
];

/** The tab strip takes the status bar inset, so the gallery below it starts at 0. */
const BELOW_STRIP: CSSProperties = { '--safe-top': '0px' } as CSSProperties;

export function GalleryPage() {
  const [tab, setTab] = useState<GalleryTab>('components');
  return (
    <div data-slot="gallery-page" className="flex h-full min-h-0 flex-1 flex-col bg-surface-muted">
      <nav
        aria-label="Gallery"
        className="pt-safe flex shrink-0 flex-col border-b border-line bg-card"
      >
        <div className="flex gap-2 px-4 py-2">
          {TABS.map((t) => (
            <Button
              key={t.id}
              size="m"
              variant={tab === t.id ? 'primary' : 'secondary'}
              aria-pressed={tab === t.id}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </nav>
      <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain" style={BELOW_STRIP}>
        <Suspense
          fallback={
            <div className="grid h-full min-h-64 place-items-center">
              <Spinner label="Loading the gallery" />
            </div>
          }
        >
          {tab === 'components' ? <ComponentsGallery /> : <IllustrationsGallery />}
        </Suspense>
      </div>
    </div>
  );
}
