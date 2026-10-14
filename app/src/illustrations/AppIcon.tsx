/**
 * The Ohm app icon: Large shows the full bill with the bolt tile, Small is the simplified mark. 1024 x 1024 artwork, rendered at `width`.
 * Exported from the Figma file "Bill app" (Foundations page), colours mapped to the brand CSS variables.
 * Static: no motion.
 */
import { Svg, type IllustrationProps } from './svg';

/** Figma 11:9853. */
export function AppIconLarge(props: IllustrationProps) {
  return (
    <Svg w={1024} h={1024} {...props}>
      <g data-part="size-large">
        <rect width="1024" height="1024" rx="229" fill="var(--primary)" />
        <g data-part="page">
          <rect x="256" y="180" width="512" height="664" rx="88" fill="var(--card)" />
          <rect data-part="bolt-tile" x="328" y="252" width="200" height="200" rx="52" fill="var(--primary-subtle)" />
          <path data-part="bolt" d="M443.415 291.587C443.598 286.727 437.437 284.494 434.463 288.343L382.226 355.943C379.686 359.229 382.029 364 386.182 364H409.209C412.044 364 414.312 366.354 414.205 369.187L412.585 412.413C412.402 417.273 418.563 419.506 421.537 415.657L473.774 348.057C476.314 344.771 473.971 340 469.818 340H446.791C443.956 340 441.688 337.646 441.795 334.813L443.415 291.587Z" fill="var(--primary)" />
          <rect data-part="line-1" x="560" y="328" width="120" height="48" rx="24" fill="var(--line)" />
          <rect data-part="line-2" x="328" y="500" width="368" height="48" rx="24" fill="var(--line)" />
          <rect data-part="line-3" x="328" y="580" width="240" height="48" rx="24" fill="var(--line)" />
          <rect data-part="line-4" x="328" y="740" width="200" height="48" rx="24" fill="var(--line)" />
          <rect data-part="scan-line" x="288" y="670" width="448" height="28" rx="14" fill="var(--primary)" />
        </g>
      </g>
    </Svg>
  );
}

/** Figma 11:12734. */
export function AppIconSmall(props: IllustrationProps) {
  return (
    <Svg w={1024} h={1024} {...props}>
      <g data-part="size-small">
        <rect width="1024" height="1024" rx="229" fill="var(--primary)" />
        <g data-part="page">
          <rect x="256" y="180" width="512" height="664" rx="88" fill="var(--card)" />
          <rect data-part="bolt-tile" x="328" y="252" width="280" height="280" rx="72" fill="var(--primary)" />
          <path data-part="bolt" d="M488.72 311.354C488.975 304.546 480.343 301.422 476.183 306.817L406.696 396.909C403.147 401.511 406.427 408.184 412.239 408.184H442.425C446.394 408.184 449.569 411.48 449.421 415.446L447.28 472.646C447.025 479.454 455.657 482.578 459.817 477.183L529.304 387.091C532.853 382.489 529.573 375.816 523.761 375.816H493.575C489.606 375.816 486.431 372.52 486.58 368.554L488.72 311.354Z" fill="var(--card)" />
          <rect data-part="line-2" x="328" y="576" width="368" height="56" rx="28" fill="var(--line)" />
          <rect data-part="line-3" x="328" y="744" width="240" height="56" rx="28" fill="var(--line)" />
          <rect data-part="scan-line" x="288" y="672" width="448" height="32" rx="16" fill="var(--primary)" />
        </g>
      </g>
    </Svg>
  );
}
