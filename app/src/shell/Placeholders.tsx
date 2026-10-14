import { Link, useNavigate } from 'react-router';
import { PlaceholderScreen } from '@/screens/PlaceholderScreen';
import { SCREEN_ROUTES, SHEET_ROUTES, type OhmRoute } from '@/routes';
import { useSheetClose, useSheetDragHandle } from './sheets';

/**
 * Stand-ins for routes whose real screen has not landed yet. A placeholder shows the Figma
 * frame name as the only h1 and a few links so the prototype can be walked before the
 * screens exist. The links are scaffolding and disappear as soon as a screen is registered.
 */
const chip =
  'inline-flex h-8 items-center rounded-full border border-line bg-card px-3 text-xs font-medium text-ink-strong transition-colors duration-150 hover:bg-surface-muted active:scale-[0.97] motion-reduce:active:scale-100';

export function ShellPlaceholder({ route }: { route: OhmRoute }) {
  const navigate = useNavigate();
  return (
    <div className="pt-safe pb-safe flex flex-1 flex-col">
      <PlaceholderScreen name={route.name} />
      <nav aria-label="Placeholder links" className="flex flex-wrap justify-center gap-2 px-4 pb-6">
        <button type="button" className={chip} onClick={() => navigate(-1)}>
          Back
        </button>
        {[...SCREEN_ROUTES, ...SHEET_ROUTES]
          .filter((r) => r.path !== route.path)
          .map((r) => (
            <Link key={r.path} to={r.path} className={chip}>
              {r.id}
            </Link>
          ))}
      </nav>
    </div>
  );
}

export function ShellPlaceholderSheet({ route }: { route: OhmRoute }) {
  const close = useSheetClose();
  const startDrag = useSheetDragHandle();
  const parent = SCREEN_ROUTES.find((r) => r.path === route.sheetParent);
  return (
    <div className="rounded-t-[20px] bg-card px-5 pt-6 pb-[var(--safe-bottom)] shadow-[0_-4px_16px_rgb(9_30_66/0.08)]">
      <div
        className="-mt-6 cursor-grab touch-none pt-6 pb-3 active:cursor-grabbing"
        onPointerDown={startDrag ?? undefined}
      >
        <div className="mx-auto h-1 w-9 rounded-full bg-line-strong" />
      </div>
      <h1 className="text-base font-semibold text-ink-strong">{route.name}</h1>
      <p className="mt-1 text-sm text-ink-muted">
        A placeholder sheet over {parent?.name ?? 'the screen behind'}. Drag the grabber down, tap the scrim or press Escape.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 pb-4">
        <button type="button" className={chip} onClick={close}>
          Close
        </button>
        {SHEET_ROUTES.filter((r) => r.path !== route.path && r.sheetParent === route.sheetParent).map(
          (r) => (
            <Link key={r.path} to={r.path} className={chip}>
              {r.id}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
