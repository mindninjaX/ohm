import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, NavigationType, useLocation } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '@/App';
import { SheetPanel, toast } from '@/components/ohm';
import { isScreenPath, isSheetPath, ROUTES, sheetParentOf, tabOf } from '@/routes';
import { ChromeProvider, useChromeTone } from './chrome';
import { StatusBar } from './StatusBar';
import { DEFAULT_DEMO_STATE, DEMO_DATES, parseDemoState } from './demo';
import { HistoryTracker } from './history';
import { SheetHost } from './sheets';
import { PortalContainerContext } from './viewport';

function Where() {
  const l = useLocation();
  return <output data-testid="where">{l.pathname}</output>;
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <Where />
    </MemoryRouter>,
  );
}

describe('routes helpers', () => {
  it('knows the sheets and their parents', () => {
    expect(isSheetPath('/add')).toBe(true);
    expect(isSheetPath('/add/')).toBe(true);
    expect(isSheetPath('/bill')).toBe(false);
    expect(sheetParentOf('/add/email')).toBe('/');
    expect(sheetParentOf('/reading/stop')).toBe('/reading');
    expect(sheetParentOf('/connection/wrong')).toBe('/connection');
    expect(sheetParentOf('/bill/share')).toBe('/bill');
    expect(sheetParentOf('/paid/share')).toBe('/paid');
    expect(sheetParentOf('/home/sources')).toBe('/');
  });

  it('puts Home, All bills and July in Bills, and Trends in Trends', () => {
    expect(tabOf('/')).toBe('bills');
    expect(tabOf('/bills/july-2026')).toBe('bills');
    expect(tabOf('/trends')).toBe('trends');
    expect(tabOf('/bill')).toBeNull();
  });
});

describe('HistoryTracker', () => {
  it('counts pushes, replaces and pops', () => {
    const t = new HistoryTracker();
    expect(t.update('a', NavigationType.Pop)).toEqual({ index: 0, direction: 'none' });
    expect(t.update('b', NavigationType.Push)).toEqual({ index: 1, direction: 'forward' });
    expect(t.update('c', NavigationType.Push)).toEqual({ index: 2, direction: 'forward' });
    expect(t.update('b', NavigationType.Pop)).toEqual({ index: 1, direction: 'back' });
    expect(t.update('c', NavigationType.Pop)).toEqual({ index: 2, direction: 'forward' });
    expect(t.update('a', NavigationType.Pop)).toEqual({ index: 0, direction: 'back' });
  });

  it('is idempotent for the same key', () => {
    const t = new HistoryTracker();
    t.update('a', NavigationType.Pop);
    const first = t.update('b', NavigationType.Push);
    expect(t.update('b', NavigationType.Push)).toBe(first);
  });

  it('prefers the index the browser stores in history.state', () => {
    const t = new HistoryTracker();
    expect(t.update('a', NavigationType.Pop, 4)).toEqual({ index: 4, direction: 'none' });
    expect(t.update('b', NavigationType.Push, 5)).toEqual({ index: 5, direction: 'forward' });
  });
});

describe('demo state', () => {
  it('falls back to defaults for missing or broken storage', () => {
    expect(parseDemoState(null)).toEqual(DEFAULT_DEMO_STATE);
    expect(parseDemoState('not json')).toEqual(DEFAULT_DEMO_STATE);
    expect(parseDemoState('{"dateMode":"nope","flags":7}')).toEqual(DEFAULT_DEMO_STATE);
  });

  it('reads a saved state', () => {
    const saved = parseDemoState(
      JSON.stringify({ dateMode: 'after', firstBill: true, flags: { paid: true } }),
    );
    expect(saved.dateMode).toBe('after');
    expect(saved.firstBill).toBe(true);
    expect(saved.flags.paid).toBe(true);
    expect(saved.flags.billAdded).toBe(DEFAULT_DEMO_STATE.flags.billAdded);
  });

  it('uses Thu 3 Sep before the early deadline and Wed 9 Sep after it', () => {
    expect(DEMO_DATES.before).toBe('2026-09-03');
    expect(DEMO_DATES.after).toBe('2026-09-09');
  });
});

describe('shell', () => {
  it('shows the parent behind a sheet when you land on the sheet directly', async () => {
    renderAt('/add');
    expect(await screen.findByRole('heading', { level: 1, name: 'S03 Add a bill' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'S01 Home' })).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('puts the screens behind an open sheet out of reach', async () => {
    const { container } = renderAt('/bill/share');
    await screen.findByRole('dialog');
    const layer = container.querySelector('[data-slot="screen-layer"]');
    expect(layer?.getAttribute('data-path')).toBe('/bill');
    expect(layer).toHaveAttribute('inert');
  });

  it('closes a deep-linked sheet onto its parent', async () => {
    renderAt('/reading/stop');
    const close = await screen.findByRole('button', { name: 'Close' });
    fireEvent.click(close);
    await waitFor(() => expect(screen.getByTestId('where')).toHaveTextContent('/reading'));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes on Escape', async () => {
    renderAt('/paid/share');
    await screen.findByRole('dialog');
    await act(async () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    });
    await waitFor(() => expect(screen.getByTestId('where')).toHaveTextContent('/paid'));
  });

  it('opens the Prototype menu', async () => {
    renderAt('/');
    fireEvent.click(await screen.findByRole('button', { name: 'Prototype menu' }));
    expect(await screen.findByText('Start a flow')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Thu 3 Sep/ })).toBeChecked();
    fireEvent.click(screen.getByRole('radio', { name: /Wed 9 Sep/ }));
    expect(screen.getByRole('radio', { name: /Wed 9 Sep/ })).toBeChecked();
  });
});

describe('shell overlays', () => {
  it('shows the Ohm toast, not a generic one', async () => {
    renderAt('/');
    await screen.findByRole('heading', { level: 1, name: 'S01 Home' });
    act(() => {
      toast.success('Link copied');
    });
    const t = await screen.findByText('Link copied');
    expect(t.closest('[data-slot="toast"]')).toHaveAttribute('data-tone', 'success');
    // It mounts in the portal layer inside the frame, not in the page body.
    expect(t.closest('.ohm-portal')).not.toBeNull();
  });

  it('lets a sheet route panel start a drag from its grabber and title row', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    render(
      <MemoryRouter>
        <PortalContainerContext.Provider value={host}>
          <SheetHost sheetPath="/x" onDismiss={() => undefined} renderSheet={() => <SheetPanel title="A sheet" />} />
        </PortalContainerContext.Provider>
      </MemoryRouter>,
    );
    const handle = host.querySelector('[data-slot="sheet-title"]')?.parentElement?.parentElement;
    expect(handle).toHaveClass('cursor-grab', 'touch-none');
    // The old 28 px strip over the top edge is gone.
    expect(host.querySelector('[data-slot="sheet-grab-strip"]')).toBeNull();
  });

  it('keeps a plain SheetPanel (outside a sheet route) free of a drag handle', () => {
    const { container } = render(
      <MemoryRouter>
        <SheetPanel title="Loose panel" />
      </MemoryRouter>,
    );
    expect(container.querySelector('.cursor-grab')).toBeNull();
  });
});

describe('browser chrome colour', () => {
  function Paid() {
    useChromeTone({ themeColor: '#f1f2f4' });
    return null;
  }
  function Lock() {
    useChromeTone({ statusBar: 'light', homeIndicator: 'light', themeColor: '#091e42' });
    return null;
  }
  const themeColor = () => document.querySelector('meta[name="theme-color"]')?.getAttribute('content');

  it('sets theme-color for a screen and goes back to white when it leaves', () => {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = '#ffffff';
    document.head.appendChild(meta);
    try {
      const { rerender } = render(<ChromeProvider>{null}</ChromeProvider>);
      expect(themeColor()).toBe('#ffffff');
      rerender(
        <ChromeProvider>
          <Paid />
        </ChromeProvider>,
      );
      expect(themeColor()).toBe('#f1f2f4');
      rerender(
        <ChromeProvider>
          <Lock />
        </ChromeProvider>,
      );
      expect(themeColor()).toBe('#091e42');
      rerender(<ChromeProvider>{null}</ChromeProvider>);
      expect(themeColor()).toBe('#ffffff');
    } finally {
      meta.remove();
    }
  });

  it('does not let a screen that is leaving undo the one arriving', () => {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = '#ffffff';
    document.head.appendChild(meta);
    try {
      // Both are mounted at once (a transition), then the old one goes.
      const { rerender } = render(
        <ChromeProvider>
          <Lock />
        </ChromeProvider>,
      );
      rerender(
        <ChromeProvider>
          <Lock />
          <Paid />
        </ChromeProvider>,
      );
      expect(themeColor()).toBe('#f1f2f4');
      rerender(
        <ChromeProvider>
          <Paid />
        </ChromeProvider>,
      );
      expect(themeColor()).toBe('#f1f2f4');
    } finally {
      meta.remove();
    }
  });
});

describe('status bar time', () => {
  function Lock() {
    useChromeTone({ statusBar: 'light', homeIndicator: 'light', showTime: false });
    return null;
  }

  it('draws 9:41 by default and leaves it out for a screen that asks (the lock screen)', () => {
    const { rerender } = render(
      <ChromeProvider>
        <StatusBar />
      </ChromeProvider>,
    );
    expect(screen.getByText('9:41')).toBeInTheDocument();
    rerender(
      <ChromeProvider>
        <StatusBar />
        <Lock />
      </ChromeProvider>,
    );
    expect(screen.queryByText('9:41')).toBeNull();
    rerender(
      <ChromeProvider>
        <StatusBar />
      </ChromeProvider>,
    );
    expect(screen.getByText('9:41')).toBeInTheDocument();
  });
});

describe('/gallery', () => {
  it('is a screen to the shell but not one of the product routes', () => {
    expect(isScreenPath('/gallery')).toBe(true);
    expect(ROUTES.some((r) => r.path === '/gallery')).toBe(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('opens the component gallery, and the illustrations behind a second tab', async () => {
    // The galleries reveal on scroll; jsdom has no IntersectionObserver.
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    renderAt('/gallery');
    expect(await screen.findByText('Component gallery')).toBeInTheDocument();
    expect(screen.getByTestId('where')).toHaveTextContent('/gallery');
    fireEvent.click(screen.getByRole('button', { name: 'Illustrations' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Illustrations' })).toBeInTheDocument();
  });
});
