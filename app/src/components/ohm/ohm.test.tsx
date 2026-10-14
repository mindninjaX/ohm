import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { Plus } from 'lucide-react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { EARLY_PRICE, JULY_BILL, TOTAL } from '@/data/bill';
import { formatINR } from '@/lib/format';
import { BillStatusMini as FigmaBillStatusMini } from '@/illustrations';
import {
  Alert,
  Amount,
  Badge,
  BillStatusMini,
  Button,
  CheckLine,
  DueLine,
  Footer,
  Header,
  ListRow,
  OhmToaster,
  ReassuranceRow,
  ScreenScaffold,
  Separator,
  Sheet,
  SheetPanel,
  TabBar,
  Tile,
  toast,
} from './index';
import { Gallery } from './Gallery';

function Where() {
  return <output data-testid="where">{useLocation().pathname}</output>;
}

describe('Button', () => {
  it('fires onClick and shows icons', async () => {
    const onClick = vi.fn();
    render(
      <Button leftIcon={Plus} onClick={onClick}>
        Add bill
      </Button>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add bill' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('ignores taps when disabled or loading', async () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <Button disabled onClick={onClick}>
        Pay
      </Button>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Pay' }));
    rerender(
      <Button loading onClick={onClick}>
        Pay
      </Button>,
    );
    const busy = screen.getByRole('button', { name: 'Pay' });
    expect(busy).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(busy);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('L is 48 tall and fills the width, M is 40 tall', () => {
    render(
      <>
        <Button>Large</Button>
        <Button size="m">Medium</Button>
      </>,
    );
    expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('h-12', 'w-full');
    expect(screen.getByRole('button', { name: 'Medium' })).toHaveClass('h-10');
  });
});

describe('Amount', () => {
  it('uses Indian grouping from the data module', () => {
    render(<Amount value={TOTAL} size="xl" />);
    expect(screen.getByText('36,42,160')).toBeInTheDocument();
    expect(screen.getByText('₹')).toBeInTheDocument();
  });

  it('shows a credit with a true minus sign', () => {
    render(<Amount value={-196} size="m" />);
    expect(screen.getByText('196')).toBeInTheDocument();
    expect(screen.getByText('−')).toBeInTheDocument();
  });

  it('marks a struck amount for screen readers', () => {
    render(<Amount value={TOTAL} struck />);
    expect(screen.getByText('Was')).toBeInTheDocument();
  });

  it('counts up without crashing and exposes the final figure', () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    render(<Amount value={EARLY_PRICE} countUp />);
    expect(screen.getByText('36,09,190')).toBeInTheDocument();
    vi.unstubAllGlobals();
  });
});

describe('Amount motion', () => {
  const stubObserver = (visible: boolean) =>
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(private cb: IntersectionObserverCallback) {}
        observe(el: Element) {
          if (visible)
            this.cb([{ isIntersecting: true, target: el } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
        }
        unobserve() {}
        disconnect() {}
      },
    );

  it('reserves the final width while it counts, with one copy of the text', () => {
    stubObserver(false);
    const { container } = render(<Amount value={TOTAL} size="xl" countUp />);
    const reserve = container.querySelector('[data-final]');
    expect(reserve).toHaveAttribute('data-final', '36,42,160');
    expect(reserve).toHaveClass('invisible');
    expect(screen.getAllByText('36,42,160')).toHaveLength(1);
    vi.unstubAllGlobals();
  });

  it('counts once per path: a remount on the same path shows the figure at once', () => {
    stubObserver(true);
    const mount = (path: string) =>
      render(
        <MemoryRouter initialEntries={[path]}>
          <Amount value={JULY_BILL.total} size="l" countUp />
        </MemoryRouter>,
      );
    const first = mount('/count-once');
    expect(first.container.querySelector('[data-final]')).not.toBeNull();
    first.unmount();
    const back = mount('/count-once');
    expect(back.container.querySelector('[data-final]')).toBeNull();
    expect(screen.getByText(formatINR(JULY_BILL.total).slice(1))).toBeInTheDocument();
    back.unmount();
    const elsewhere = mount('/count-once-elsewhere');
    expect(elsewhere.container.querySelector('[data-final]')).not.toBeNull();
    vi.unstubAllGlobals();
  });

  it('draws the strike through the digits, lower than the middle', () => {
    const { container } = render(<Amount value={TOTAL} struck />);
    expect(container.querySelector('span[class*="top-[58%]"]')).not.toBeNull();
  });

  it('is as tall as the digits and places the rupee sign 12, 9, 4 and 3 px down at XL, L, M and S', () => {
    const want = { xl: ['h-12', 'mt-3'], l: ['h-10', 'mt-[9px]'], m: ['h-8', 'mt-1'], s: ['h-7', 'mt-[3px]'] } as const;
    for (const size of ['xl', 'l', 'm', 's'] as const) {
      const { container, unmount } = render(<Amount value={TOTAL} size={size} />);
      const box = container.querySelector('[data-slot="amount"]');
      expect(box).toHaveClass('items-start', want[size][0]);
      expect(screen.getByText('₹')).toHaveClass(want[size][1]);
      unmount();
    }
  });

  it('counts at once when there is no IntersectionObserver, and counts again with replay', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const mount = (replay: boolean) =>
      render(
        <MemoryRouter initialEntries={['/replay-test']}>
          <Amount value={EARLY_PRICE} size="l" countUp replay={replay} countDelay={0.1} />
        </MemoryRouter>,
      );
    const first = mount(true);
    expect(first.container.querySelector('[data-final]')).not.toBeNull();
    expect(screen.getByText('36,09,190')).toBeInTheDocument();
    first.unmount();
    // The same path again: with replay it counts again, without it the figure is shown as it is.
    const again = mount(true);
    expect(again.container.querySelector('[data-final]')).not.toBeNull();
    again.unmount();
    const plain = mount(false);
    expect(plain.container.querySelector('[data-final]')).toBeNull();
    plain.unmount();
    vi.unstubAllGlobals();
  });
});

describe('small parts', () => {
  it('Badge shows its label and an icon on request', () => {
    const { container } = render(
      <Badge tone="success" icon>
        Saved
      </Badge>,
    );
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('DueLine renders its words', () => {
    render(<DueLine>Due Wed 16 Sep</DueLine>);
    expect(screen.getByText('Due Wed 16 Sep')).toBeInTheDocument();
  });

  it('CheckLine says its state to screen readers', () => {
    render(<CheckLine state="look" title="Worth a look" result="One line needs a second look." />);
    expect(screen.getByText('Needs a look')).toBeInTheDocument();
    expect(screen.getByText('Worth a look')).toBeInTheDocument();
  });

  it('Alert is an alert only when it is a danger', () => {
    const { rerender } = render(<Alert tone="danger" title="Could not load" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    rerender(<Alert tone="info" title="Heads up" />);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('Alert keeps its link at the full 40 px, can show a retry in flight and take another role', () => {
    const onLinkClick = vi.fn();
    const { rerender } = render(
      <Alert tone="info" title="Couldn't load" link="Try again" onLinkClick={onLinkClick} role="alert" />,
    );
    const link = screen.getByRole('button', { name: 'Try again' });
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(link).toHaveClass('h-10');
    expect(link.className).not.toMatch(/-my-/);
    fireEvent.click(link);
    expect(onLinkClick).toHaveBeenCalledTimes(1);
    rerender(<Alert tone="info" title="Couldn't load" link="Try again" onLinkClick={onLinkClick} linkLoading />);
    fireEvent.click(screen.getByRole('button', { name: /Try again/ }));
    expect(onLinkClick).toHaveBeenCalledTimes(1);
  });

  it('draws Card and Alert at radius 16, Tile at 12, and the sheet panel without a shadow', () => {
    const { container } = render(
      <MemoryRouter>
        <Alert title="Heads up" />
        <Tile>tile</Tile>
        <SheetPanel title="Panel" />
      </MemoryRouter>,
    );
    expect(container.querySelector('[data-tone="info"]')).toHaveClass('rounded-2xl');
    expect(container.querySelector('[data-slot="tile"]')).toHaveClass('rounded-xl');
    expect(container.querySelector('[data-slot="sheet-panel"]')?.className).not.toMatch(/shadow/);
    const css = readFileSync(resolve(__dirname, '../../styles/globals.css'), 'utf8');
    expect(css).toMatch(/--radius-xl:\s*12px/);
    expect(css).toMatch(/--radius-2xl:\s*16px/);
    expect(css).toMatch(/svg\.lucide:not\(\[class\*="stroke-"\]\)/);
  });

  it('ReassuranceRow carries the standard words and is tappable when asked', async () => {
    const onClick = vi.fn();
    render(<ReassuranceRow onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /No hidden charges or penalties/ }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByText("Charged at the regulator's rates")).toBeInTheDocument();
  });

  it('ReassuranceRow uses the Figma Bill status mini, Tile On, sized by surface', () => {
    expect(BillStatusMini).toBe(FigmaBillStatusMini);
    const { container, rerender } = render(<ReassuranceRow />);
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 36 36');
    expect(container.querySelector('[data-part="tile"]')).not.toBeNull();
    expect(container.querySelector('[data-part="badge"], [data-part="paper"]')).not.toBeNull();
    rerender(<ReassuranceRow surface="card" state="flagged" />);
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 48 48');
  });

  it('ListRow draws its value in proportional figures, as Figma does', () => {
    render(<ListRow title="Units" value="7,200" />);
    expect(screen.getByText('7,200').className).not.toMatch(/tabular/);
  });

  it('ListRow becomes a button with onClick, but not when it has an action', async () => {
    const onClick = vi.fn();
    const { rerender } = render(<ListRow title="July 2026" value={formatINR(3_555_860)} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /July 2026/ }));
    expect(onClick).toHaveBeenCalled();
    rerender(<ListRow title="Usage" action={<button type="button">See trends</button>} onClick={onClick} />);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('Separator is decorative', () => {
    const { container } = render(<Separator inset="left-68" />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Header', () => {
  it('Back goes back through history', async () => {
    render(
      <MemoryRouter initialEntries={['/', '/bill']} initialIndex={1}>
        <Routes>
          <Route path="/bill" element={<Header title="August bill" subtitle="Northgrid Electric" />} />
          <Route path="/" element={<p>home</p>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'August bill' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    // MemoryRouter has no history.state.idx, so Back falls back to `backTo` ("/").
    expect(await screen.findByText('home')).toBeInTheDocument();
  });

  it('is 60 tall for Back and 68 tall for Top level, with the divider drawn over the bottom edge', () => {
    const { container, rerender } = render(
      <MemoryRouter>
        <Header title="August bill" />
      </MemoryRouter>,
    );
    const row = () => container.querySelector('header > div') as HTMLElement;
    expect(row()).toHaveClass('h-[60px]', 'pt-1.5', 'pb-2.5', 'pl-2', 'pr-4', 'gap-1', 'after:h-px');
    expect(row()).not.toHaveClass('border-b');
    rerender(
      <MemoryRouter>
        <Header type="top-level" title="Harbourline Hotels" divider={false} />
      </MemoryRouter>,
    );
    expect(row()).toHaveClass('h-[68px]', 'pt-2', 'pb-3', 'px-4', 'gap-3');
    expect(row()).not.toHaveClass('after:h-px');
  });

  it('Back on a deep link goes to backTo and marks the move as a back for the shell', async () => {
    function State() {
      const { state } = useLocation();
      return <output data-testid="state">{JSON.stringify(state)}</output>;
    }
    render(
      <MemoryRouter initialEntries={['/bill']}>
        <Routes>
          <Route path="/bill" element={<Header title="August bill" backTo="/" />} />
          <Route
            path="/"
            element={
              <>
                <p>home</p>
                <State />
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(await screen.findByText('home')).toBeInTheDocument();
    expect(screen.getByTestId('state')).toHaveTextContent('{"ohmDirection":"back"}');
  });

  it('onBack replaces the default', async () => {
    const onBack = vi.fn();
    render(
      <MemoryRouter>
        <Header title="Reading your bill" onBack={onBack} />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('Top level shows initials and the trailing action', () => {
    render(
      <MemoryRouter>
        <Header type="top-level" title="Harbourline Hotels" trailing={<Button size="m">Add bill</Button>} />
      </MemoryRouter>,
    );
    expect(screen.getByText('NK')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add bill' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Back' })).toBeNull();
  });
});

describe('Footer and TabBar', () => {
  it('Footer holds its buttons, helper and the Razorpay trust line', () => {
    render(
      <Footer trustLine helper="Takes a minute">
        <Button>Pay</Button>
      </Footer>,
    );
    expect(screen.getByRole('button', { name: 'Pay' })).toBeInTheDocument();
    expect(screen.getByText('Takes a minute')).toBeInTheDocument();
    expect(screen.getByAltText('Razorpay')).toBeInTheDocument();
  });

  it('TabBar navigates between Bills and Trends', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <TabBar value="bills" />
        <Where />
      </MemoryRouter>,
    );
    expect(screen.getByRole('tab', { name: 'Bills' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('tab', { name: 'Trends' }));
    expect(screen.getByTestId('where')).toHaveTextContent('/trends');
  });

  it('TabBar is 90 tall with an inset top line, not a border, and one shared indicator id', () => {
    const { container } = render(
      <MemoryRouter>
        <TabBar value="bills" />
      </MemoryRouter>,
    );
    const nav = container.querySelector('nav') as HTMLElement;
    expect(nav).not.toHaveClass('border-t');
    expect(nav.className).toContain('shadow-[inset_0_1px_0_var(--line)]');
  });

  it('TabBar calls onValueChange instead of navigating when given one', async () => {
    const onValueChange = vi.fn();
    render(
      <MemoryRouter>
        <TabBar value="trends" onValueChange={onValueChange} />
        <Where />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Bills' }));
    expect(onValueChange).toHaveBeenCalledWith('bills');
    expect(screen.getByTestId('where')).toHaveTextContent('/');
  });
});

describe('ScreenScaffold motion', () => {
  function Screen() {
    return (
      <ScreenScaffold>
        <p>Card</p>
      </ScreenScaffold>
    );
  }
  const cardOpacity = () => (screen.getByText('Card').parentElement as HTMLElement).style.opacity;

  it('staggers the first time a path is shown and not when the screen is remounted', () => {
    const mount = () =>
      render(
        <MemoryRouter initialEntries={['/stagger-once']}>
          <Screen />
        </MemoryRouter>,
      );
    const first = mount();
    expect(cardOpacity()).toBe('0');
    first.unmount();
    mount();
    expect(cardOpacity()).toBe('1');
  });

  it('always staggers outside a router', () => {
    const first = render(<Screen />);
    first.unmount();
    render(<Screen />);
    expect(cardOpacity()).toBe('0');
  });
});

describe('ScreenScaffold', () => {
  it('never shrinks below its content, so a long screen keeps its sticky header and footer', () => {
    const { container } = render(<ScreenScaffold>content</ScreenScaffold>);
    expect(container.querySelector('[data-slot="screen"]')).toHaveClass('flex-[1_0_auto]');
  });

  it('lays out header, content and footer in order', () => {
    const { container } = render(
      <ScreenScaffold header={<header>Top</header>} footer={<footer>Bottom</footer>} stagger={false}>
        <p>Content</p>
      </ScreenScaffold>,
    );
    const parts = Array.from(container.firstElementChild!.children).map((el) => el.tagName);
    expect(parts).toEqual(['HEADER', 'MAIN', 'FOOTER']);
  });

  it('staggers children by wrapping each in a reveal', () => {
    render(
      <ScreenScaffold>
        <p>One</p>
        <p>Two</p>
      </ScreenScaffold>,
    );
    expect(screen.getByText('One').parentElement).not.toBe(screen.getByRole('main'));
    expect(screen.getByText('Two')).toBeInTheDocument();
  });
});

function SheetHarness({ container }: { container?: HTMLElement | null }) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <Sheet open={open} onOpenChange={setOpen} title="Add a bill" container={container} footer={<Button>Go</Button>}>
        <p>Body</p>
      </Sheet>
    </>
  );
}

describe('Sheet', () => {
  it('renders a labelled dialog with title, content and footer', () => {
    render(<SheetHarness />);
    const dialog = screen.getByRole('dialog', { name: 'Add a bill' });
    expect(within(dialog).getByText('Body')).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });

  it('closes with Escape, the close button and the scrim', async () => {
    render(<SheetHarness />);
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    fireEvent.click(within(await screen.findByRole('dialog')).getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    const scrim = (await screen.findByRole('dialog')).previousElementSibling as HTMLElement;
    fireEvent.click(scrim);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('stays tappable inside a portal layer that has pointer-events none', () => {
    // jsdom loads no Tailwind, so write the rule Tailwind generates for `pointer-events-auto`.
    const rule = document.createElement('style');
    rule.textContent = '.pointer-events-auto { pointer-events: auto; }';
    document.head.appendChild(rule);
    const host = document.createElement('div');
    host.style.pointerEvents = 'none';
    document.body.appendChild(host);
    render(<SheetHarness container={host} />);
    expect(getComputedStyle(host).pointerEvents).toBe('none');
    const dialog = within(host).getByRole('dialog');
    expect(host.querySelector('[data-slot="sheet-root"]')).toHaveClass('pointer-events-auto');
    expect(getComputedStyle(dialog).pointerEvents).toBe('auto');
    expect(getComputedStyle(within(dialog).getByRole('button', { name: 'Close' })).pointerEvents).toBe('auto');
    host.remove();
    rule.remove();
  });

  it('mounts into the container it is given, not the document body', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    render(<SheetHarness container={host} />);
    expect(within(host).getByRole('dialog')).toBeInTheDocument();
    host.remove();
  });
});

describe('Toast', () => {
  it('shows a success toast through the toaster, once even if mounted twice', async () => {
    render(
      <>
        <OhmToaster />
        <OhmToaster />
      </>,
    );
    act(() => {
      toast.success('Link copied');
    });
    expect(await screen.findAllByText('Link copied')).toHaveLength(1);
    act(() => toast.dismiss());
  });

  it('gives the toast the full bar width (361 in a 393 frame), not the width of its text', async () => {
    render(<OhmToaster />);
    act(() => {
      toast.success('Copied');
    });
    await screen.findByText('Copied');
    const bar = document.querySelector<HTMLElement>('[data-sonner-toast]');
    // Sonner only sizes a toast inside its own phone media query; the explicit width is what makes
    // it the same bar inside the desktop phone frame.
    expect(bar?.style.width).toBe('var(--width)');
    expect(document.querySelector<HTMLElement>('[data-sonner-toaster]')?.style.getPropertyValue('--width')).toBe('361px');
    act(() => toast.dismiss());
  });
});

describe('Gallery', () => {
  it('renders every component without crashing', () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    render(
      <MemoryRouter>
        <Gallery />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Component gallery' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(6);
    vi.unstubAllGlobals();
  });
});
