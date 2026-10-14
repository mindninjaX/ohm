/**
 * The "starting point" strip: the first bill, the numbers read from it, every new bill checked against them. 329 x 64.
 * Exported from the Figma file "Bill app" (Foundations page), colours mapped to the brand CSS variables.
 * Static: no motion.
 */
import { DashedRoundRect, figmaDashOffset, Svg, useUid, type IllustrationProps } from './svg';

/** Figma 11:11230. */
export function StartingPoint(props: IllustrationProps) {
  const u = useUid();
  return (
    <Svg w={329} h={64} {...props}>
      <defs>
        <clipPath id={`${u}-d0`}>
          <rect width="7" height="7" fill="var(--card)" transform="translate(6.5 10.5)" />
        </clipPath>
        <clipPath id={`${u}-d1`}>
          <rect width="8" height="8" fill="var(--card)" transform="translate(306 8)" />
        </clipPath>
      </defs>
      <g data-part="starting-point">
        <g data-part="page-a-august">
          <rect x="0.5" y="4.5" width="45" height="59" rx="6.5" fill="var(--card)" />
          <rect x="0.5" y="4.5" width="45" height="59" rx="6.5" stroke="var(--line)" />
          <g data-part="icon-tile">
            <rect x="5" y="9" width="10" height="10" rx="3" fill="var(--primary-subtle)" />
            <g data-part="lucide-zap" clipPath={`url(#${u}-d0)`}>
              <path d="M7.66668 14.5833C7.61149 14.5835 7.55738 14.568 7.51063 14.5387C7.46388 14.5094 7.42642 14.4674 7.4026 14.4176C7.37877 14.3678 7.36956 14.3123 7.37604 14.2574C7.38252 14.2026 7.40441 14.1508 7.43918 14.1079L10.3267 11.1329C10.3483 11.1079 10.3779 11.091 10.4104 11.085C10.4429 11.079 10.4765 11.0842 10.5057 11.0998C10.5349 11.1154 10.5579 11.1405 10.5709 11.1709C10.584 11.2013 10.5863 11.2352 10.5775 11.2671L10.0175 13.0229C10.001 13.0671 9.99546 13.1147 10.0014 13.1615C10.0073 13.2083 10.0244 13.2529 10.0514 13.2917C10.0783 13.3304 10.1143 13.362 10.1561 13.3838C10.198 13.4055 10.2445 13.4168 10.2917 13.4167H12.3334C12.3885 13.4165 12.4427 13.432 12.4894 13.4613C12.5362 13.4906 12.5736 13.5326 12.5974 13.5824C12.6213 13.6322 12.6305 13.6877 12.624 13.7426C12.6175 13.7974 12.5956 13.8492 12.5609 13.8921L9.67335 16.8671C9.65169 16.8921 9.62218 16.909 9.58965 16.915C9.55712 16.921 9.52352 16.9158 9.49435 16.9002C9.46518 16.8846 9.44218 16.8595 9.42913 16.8291C9.41608 16.7987 9.41375 16.7648 9.42252 16.7329L9.98252 14.9771C9.99903 14.9329 10.0046 14.8853 9.99868 14.8385C9.99278 14.7917 9.97562 14.7471 9.94866 14.7083C9.9217 14.6696 9.88575 14.638 9.8439 14.6162C9.80204 14.5945 9.75553 14.5832 9.70835 14.5833H7.66668Z" stroke="var(--primary)" strokeWidth="0.583333" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
          <rect data-part="skeleton" x="18" y="12" width="20" height="3" rx="1.5" fill="var(--surface-muted)" />
          <g data-part="highlight-block">
            <rect x="5.5" y="23.5" width="35" height="19" rx="2.5" fill="var(--primary-subtle)" />
            <rect x="5.5" y="23.5" width="35" height="19" rx="2.5" stroke="var(--primary)" />
            <rect data-part="bar-1" opacity="0.35" x="9" y="27" width="26" height="2" rx="1" fill="var(--primary)" />
            <rect data-part="bar-2" opacity="0.35" x="9" y="32" width="18" height="2" rx="1" fill="var(--primary)" />
            <rect data-part="bar-3" opacity="0.35" x="9" y="37" width="22" height="2" rx="1" fill="var(--primary)" />
          </g>
          <rect data-part="skeleton-2" x="5" y="49" width="30" height="3" rx="1.5" fill="var(--surface-muted)" />
          <rect data-part="skeleton-3" x="5" y="55" width="20" height="3" rx="1.5" fill="var(--surface-muted)" />
        </g>
        <g data-part="pin-badge">
          <rect x="37" width="14" height="14" rx="7" fill="var(--primary)" />
          <g data-part="lucide-pin">
            <path d="M44.0003 8.66666V10.3333M43.0003 6.58666C43.0003 6.71069 42.9656 6.83224 42.9002 6.93765C42.8349 7.04306 42.7414 7.12814 42.6303 7.18333L42.037 7.48333C41.9259 7.53852 41.8324 7.62361 41.7671 7.72901C41.7017 7.83442 41.6671 7.95597 41.667 8.08V8.33333C41.667 8.42174 41.7021 8.50652 41.7646 8.56903C41.8271 8.63155 41.9119 8.66666 42.0003 8.66666H46.0003C46.0887 8.66666 46.1735 8.63155 46.236 8.56903C46.2985 8.50652 46.3337 8.42174 46.3337 8.33333V8.08C46.3336 7.95597 46.2989 7.83442 46.2336 7.72901C46.1682 7.62361 46.0747 7.53852 45.9637 7.48333L45.3703 7.18333C45.2593 7.12814 45.1658 7.04306 45.1004 6.93765C45.0351 6.83224 45.0004 6.71069 45.0003 6.58666V5.33333C45.0003 5.24493 45.0354 5.16014 45.098 5.09763C45.1605 5.03512 45.2453 5 45.3337 5C45.5105 5 45.68 4.92976 45.8051 4.80474C45.9301 4.67971 46.0003 4.51014 46.0003 4.33333C46.0003 4.15652 45.9301 3.98695 45.8051 3.86193C45.68 3.7369 45.5105 3.66666 45.3337 3.66666H42.667C42.4902 3.66666 42.3206 3.7369 42.1956 3.86193C42.0706 3.98695 42.0003 4.15652 42.0003 4.33333C42.0003 4.51014 42.0706 4.67971 42.1956 4.80474C42.3206 4.92976 42.4902 5 42.667 5C42.7554 5 42.8402 5.03512 42.9027 5.09763C42.9652 5.16014 43.0003 5.24493 43.0003 5.33333V6.58666Z" stroke="var(--card)" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <line data-part="connector" x1="56.75" y1="33.25" x2="125.25" y2="33.25" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" strokeDashoffset={figmaDashOffset(68.5, 4, 4)} />
        <g data-part="lucide-chevron-right">
          <path d="M126.5 37L129.5 34L126.5 31" stroke="var(--primary)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g data-part="page-b">
          <rect x="148.5" y="12.5" width="35" height="47" rx="5.5" fill="var(--card)" />
          <rect x="148.5" y="12.5" width="35" height="47" rx="5.5" stroke="var(--line)" />
          <rect data-part="skeleton-4" x="153" y="18" width="20" height="3" rx="1.5" fill="var(--surface-muted)" />
          <g data-part="dashed-block">
            <DashedRoundRect x={153.5} y={25.5} width={25} height={13} radius={2.5} stroke="var(--primary)" dash={3} gap={2} />
          </g>
          <rect data-part="skeleton-5" x="153" y="45" width="22" height="3" rx="1.5" fill="var(--surface-muted)" />
          <rect data-part="skeleton-6" x="153" y="51" width="16" height="3" rx="1.5" fill="var(--surface-muted)" />
        </g>
        <g data-part="page-c">
          <rect x="211.5" y="12.5" width="35" height="47" rx="5.5" fill="var(--card)" />
          <rect x="211.5" y="12.5" width="35" height="47" rx="5.5" stroke="var(--line)" />
          <rect data-part="skeleton-7" x="216" y="18" width="20" height="3" rx="1.5" fill="var(--surface-muted)" />
          <g data-part="dashed-block-2">
            <DashedRoundRect x={216.5} y={25.5} width={25} height={13} radius={2.5} stroke="var(--primary)" dash={3} gap={2} />
          </g>
          <rect data-part="skeleton-8" x="216" y="45" width="22" height="3" rx="1.5" fill="var(--surface-muted)" />
          <rect data-part="skeleton-9" x="216" y="51" width="16" height="3" rx="1.5" fill="var(--surface-muted)" />
        </g>
        <g data-part="page-d">
          <rect x="274.5" y="12.5" width="35" height="47" rx="5.5" fill="var(--card)" />
          <rect x="274.5" y="12.5" width="35" height="47" rx="5.5" stroke="var(--line)" />
          <rect data-part="skeleton-10" x="279" y="18" width="20" height="3" rx="1.5" fill="var(--surface-muted)" />
          <g data-part="dashed-block-3">
            <DashedRoundRect x={279.5} y={25.5} width={25} height={13} radius={2.5} stroke="var(--warning)" dash={3} gap={2} />
          </g>
          <rect data-part="skeleton-11" x="279" y="45" width="22" height="3" rx="1.5" fill="var(--surface-muted)" />
          <rect data-part="skeleton-12" x="279" y="51" width="16" height="3" rx="1.5" fill="var(--surface-muted)" />
        </g>
        <g data-part="status-badge-b">
          <rect x="177" y="5" width="14" height="14" rx="7" fill="var(--success-subtle)" />
          <g data-part="lucide-check">
            <path d="M186.666 10L183 13.6667L181.333 12" stroke="var(--success)" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <g data-part="status-badge-c">
          <rect x="240" y="5" width="14" height="14" rx="7" fill="var(--success-subtle)" />
          <g data-part="lucide-check-2">
            <path d="M249.666 10L246 13.6667L244.333 12" stroke="var(--success)" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <g data-part="status-badge-d">
          <rect x="303" y="5" width="14" height="14" rx="7" fill="var(--warning-subtle)" />
          <g data-part="lucide-triangle-alert" clipPath={`url(#${u}-d1)`}>
            <path d="M310 11V12.3333M310 13.6667H310.004M313.244 14L310.577 9.33333C310.519 9.23073 310.435 9.14539 310.333 9.08602C310.231 9.02664 310.115 8.99536 309.997 8.99536C309.879 8.99536 309.763 9.02664 309.661 9.08602C309.56 9.14539 309.475 9.23073 309.417 9.33333L306.75 14C306.692 14.1018 306.661 14.2173 306.661 14.3348C306.661 14.4524 306.693 14.5677 306.752 14.6693C306.811 14.7708 306.896 14.8549 306.998 14.9129C307.101 14.971 307.216 15.0011 307.334 15H312.667C312.784 14.9999 312.899 14.969 313 14.9104C313.101 14.8519 313.186 14.7677 313.244 14.6664C313.302 14.565 313.333 14.4501 313.333 14.3332C313.333 14.2162 313.302 14.1013 313.244 14Z" stroke="var(--warning)" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </g>
    </Svg>
  );
}
