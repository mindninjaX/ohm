// Ohm components: one per Figma component, same names, Figma variants as props.
// See README.md for props and the Figma name of each.
export { Alert, type AlertProps, type AlertTone } from './Alert';
export { Amount, type AmountProps, type AmountSize } from './Amount';
export { Badge, type BadgeProps, type BadgeSize, type BadgeTone } from './Badge';
// The one Bill status mini is the Figma export in src/illustrations; re-exported here so imports keep working.
export { BillStatusMini } from '@/illustrations';
export type { BillStatusMiniProps, MiniState } from '@/illustrations';
export { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './Button';
export { Card, type CardPadding, type CardProps, type CardTone } from './Card';
export { CheckLine, type CheckLineProps, type CheckState } from './CheckLine';
export { DueLine, type DueLineProps, type DueSize, type DueTone } from './DueLine';
export { Footer, type FooterProps } from './Footer';
export { Footnote, type FootnoteProps } from './Footnote';
export { Header, type HeaderProps, type HeaderType } from './Header';
export { IconButton, type IconButtonProps, type IconButtonVariant } from './IconButton';
export { IconTile, type IconTileProps, type IconTileTone } from './IconTile';
export { ListRow, type ListRowProps, type ListRowSurface } from './ListRow';
export { NavRow, type NavRowProps } from './NavRow';
export { ReassuranceRow, type ReassuranceRowProps, type ReassuranceSurface } from './ReassuranceRow';
export { Reveal, Stagger, type RevealProps } from './Reveal';
export { ScreenScaffold, type ScreenScaffoldProps } from './ScreenScaffold';
export { SectionHeader, type SectionHeaderProps } from './SectionHeader';
export { Separator, type SeparatorInset, type SeparatorProps } from './Separator';
export { Sheet, type SheetProps } from './Sheet';
export { SheetPanel, type SheetPanelProps } from './SheetPanel';
export { Skeleton, type SkeletonProps } from './Skeleton';
export { Spinner, type SpinnerProps } from './Spinner';
export { TabBar, TAB_PATHS, type TabBarProps, type TabId } from './TabBar';
export { Tile, type TileProps, type TileTone } from './Tile';
export { OhmToaster, Toast, toast, type ToastProps, type ToastTone } from './Toast';
export { TrustLineRazorpay } from './TrustLineRazorpay';
export { DURATION, EASE_OUT, SPRING, STAGGER, useReduced } from './lib/motion';
export type { IconComponent } from './lib/types';
