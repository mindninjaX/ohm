import { ChartColumn, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { useInRouterContext, useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { SPRING, useReduced } from './lib/motion';
import type { IconComponent } from './lib/types';

export type TabId = 'bills' | 'trends';

export interface TabBarProps {
  /** The active tab. */
  value: TabId;
  /** Called when the other tab is tapped. Without it, the bar navigates to `/` (Bills) or `/trends`. */
  onValueChange?: (tab: TabId) => void;
  /** Pinned to the bottom of the screen (default). Pass `false` to lay it out inline. */
  sticky?: boolean;
  className?: string;
}

/** One id for every TabBar, so the bar slides between tabs even when each screen has its own TabBar. */
const INDICATOR_ID = 'ohm-tab-indicator';

export const TAB_PATHS: Record<TabId, string> = { bills: '/', trends: '/trends' };

const TABS: readonly { id: TabId; label: string; Icon: IconComponent }[] = [
  { id: 'bills', label: 'Bills', Icon: FileText },
  { id: 'trends', label: 'Trends', Icon: ChartColumn },
];

interface ViewProps extends TabBarProps {
  onSelect: (tab: TabId) => void;
}

function TabBarView({ value, onSelect, sticky = true, className }: ViewProps) {
  const reduced = useReduced();
  return (
    <nav
      aria-label="Main"
      data-slot="tab-bar"
      className={cn(
        'z-30 w-full bg-card pb-[var(--safe-bottom,34px)] shadow-[inset_0_1px_0_var(--line)]',
        sticky && 'sticky bottom-0',
        className,
      )}
    >
      <div role="tablist" className="grid grid-cols-2">
        {TABS.map(({ id, label, Icon }) => {
          const active = id === value;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => !active && onSelect(id)}
              className={cn(
                'relative flex h-14 flex-col items-center justify-center gap-0.5 outline-none',
                'transition-colors duration-200 focus-visible:bg-primary-subtle',
                active ? 'text-primary' : 'text-ink-muted',
              )}
            >
              {active && (
                <motion.span
                  layoutId={INDICATOR_ID}
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-primary"
                  transition={reduced ? { duration: 0 } : SPRING.indicator}
                />
              )}
              <Icon size={24} aria-hidden />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function RoutedTabBar(props: TabBarProps) {
  const navigate = useNavigate();
  const { onValueChange } = props;
  return <TabBarView {...props} onSelect={(tab) => (onValueChange ? onValueChange(tab) : navigate(TAB_PATHS[tab]))} />;
}

/**
 * Figma: Ohm / Tab bar (Active Bills | Trends). A plain web tab bar: white, a 1 px top line drawn inside the 90 px frame (56 + home indicator zone 34), two equal
 * tabs 56 tall (icon 24 and Text-xs/Medium label), then the home indicator zone. The active tab is
 * `primary` with a 2 px bar on top; the bar slides to the other tab on a spring.
 */
export function TabBar(props: TabBarProps) {
  const inRouter = useInRouterContext();
  return inRouter ? (
    <RoutedTabBar {...props} />
  ) : (
    <TabBarView {...props} onSelect={(tab) => props.onValueChange?.(tab)} />
  );
}
