/**
 * The small bill-with-history-rows chip that sits left of "Where these numbers come from". 28 x 36.
 * Exported from the Figma file "Bill app" (Foundations page), colours mapped to the brand CSS variables.
 * Static: no motion.
 */
import { Svg, type IllustrationProps } from './svg';

/** Figma 11:10067. */
export function BillHistoryChip(props: IllustrationProps) {
  return (
    <Svg w={28} h={36} {...props}>
      <g data-part="bill-history-chip">
        <rect data-part="page" x="1" y="1" width="26" height="34" rx="4.5" fill="var(--card)" stroke="var(--line)" />
        <rect data-part="header-tile" x="4" y="4" width="7" height="7" rx="2" fill="var(--primary-subtle)" />
        <rect data-part="header-line" x="13" y="6.5" width="11" height="2" rx="1" fill="var(--line)" />
        <rect data-part="row-1-month" x="4" y="14" width="7" height="2" rx="1" fill="var(--line)" />
        <rect data-part="row-1-value" x="15" y="14" width="9" height="2" rx="1" fill="var(--line)" />
        <rect data-part="row-2-month" x="4" y="19" width="7" height="2" rx="1" fill="var(--line)" />
        <rect data-part="row-2-value" x="15" y="19" width="9" height="2" rx="1" fill="var(--line)" />
        <rect data-part="row-3-month" x="4" y="24" width="7" height="2" rx="1" fill="var(--line)" />
        <rect data-part="row-3-value" x="15" y="24" width="9" height="2" rx="1" fill="var(--line)" />
        <rect data-part="highlight-band" x="1" y="28" width="26" height="6" fill="var(--primary-subtle)" />
        <rect data-part="last-row-month" x="4" y="30" width="7" height="2" rx="1" fill="var(--primary)" fillOpacity="0.45" />
        <rect data-part="last-row-value" x="15" y="30" width="9" height="2" rx="1" fill="var(--primary)" />
        <rect data-part="scan-line" y="27.25" width="28" height="1.5" rx="0.75" fill="var(--primary)" />
      </g>
    </Svg>
  );
}
