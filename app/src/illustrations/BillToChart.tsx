/**
 * A bill page turning into bars (the "see this in Trends" card). 300 x 120.
 * Exported from the Figma file "Bill app" (Foundations page), colours mapped to the brand CSS variables.
 * Static: no motion. The last row's month bar is solid `primary`, as the S01.3 instance draws it (the main component has it at 40%).
 */
import { Svg, useUid, type IllustrationProps } from './svg';

/** Figma 11:10147. */
export function BillToChart(props: IllustrationProps) {
  const u = useUid();
  return (
    <Svg w={300} h={120} {...props}>
      <defs>
        <clipPath id={`${u}-d0`}>
          <rect width="10" height="10" fill="var(--card)" transform="translate(25 19)" />
        </clipPath>
      </defs>
      <g data-part="bill-to-chart">
        <rect data-part="background" width="300" height="120" rx="16" fill="var(--surface-muted)" />
        <g data-part="bill-page">
          <rect x="14.5" y="8.5" width="83" height="103" rx="9.5" fill="var(--card)" />
          <rect x="14.5" y="8.5" width="83" height="103" rx="9.5" stroke="var(--line)" />
          <rect data-part="zap-tile" x="22" y="16" width="16" height="16" rx="5" fill="var(--primary-subtle)" />
          <g data-part="lucide-zap" clipPath={`url(#${u}-d0)`}>
            <path d="M26.6666 24.8333C26.5878 24.8336 26.5105 24.8115 26.4437 24.7696C26.3769 24.7277 26.3234 24.6676 26.2894 24.5965C26.2553 24.5254 26.2422 24.4461 26.2514 24.3678C26.2607 24.2895 26.2919 24.2154 26.3416 24.1542L30.4666 19.9042C30.4976 19.8684 30.5397 19.8443 30.5862 19.8357C30.6327 19.8271 30.6807 19.8346 30.7223 19.8569C30.764 19.8792 30.7969 19.915 30.8155 19.9584C30.8342 20.0018 30.8375 20.0503 30.825 20.0958L30.025 22.6042C30.0014 22.6673 29.9934 22.7352 30.0019 22.8021C30.0103 22.869 30.0348 22.9328 30.0733 22.9881C30.1118 23.0434 30.1632 23.0885 30.223 23.1196C30.2828 23.1507 30.3492 23.1669 30.4166 23.1667H33.3333C33.4121 23.1664 33.4894 23.1885 33.5562 23.2304C33.623 23.2723 33.6765 23.3323 33.7106 23.4035C33.7446 23.4746 33.7578 23.5539 33.7485 23.6322C33.7392 23.7105 33.708 23.7846 33.6583 23.8458L29.5333 28.0958C29.5023 28.1315 29.4602 28.1557 29.4137 28.1643C29.3672 28.1729 29.3192 28.1654 29.2776 28.1431C29.2359 28.1208 29.203 28.085 29.1844 28.0416C29.1658 27.9982 29.1624 27.9497 29.175 27.9042L29.975 25.3958C29.9985 25.3327 30.0065 25.2648 29.998 25.1979C29.9896 25.131 29.9651 25.0672 29.9266 25.0119C29.8881 24.9566 29.8367 24.9114 29.7769 24.8803C29.7171 24.8492 29.6507 24.8331 29.5833 24.8333H26.6666Z" stroke="var(--primary)" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <rect data-part="bar-1" x="44" y="21.5" width="40" height="5" rx="2.5" fill="var(--surface-muted)" />
          <rect data-part="bar-2" x="22" y="40" width="68" height="5" rx="2.5" fill="var(--surface-muted)" />
          <rect data-part="row-1-month" x="22" y="54" width="18" height="5" rx="2.5" fill="var(--surface-muted)" />
          <rect data-part="row-1-value" x="64" y="54" width="26" height="5" rx="2.5" fill="var(--surface-muted)" />
          <rect data-part="row-2-month" x="22" y="64" width="18" height="5" rx="2.5" fill="var(--surface-muted)" />
          <rect data-part="row-2-value" x="64" y="64" width="26" height="5" rx="2.5" fill="var(--surface-muted)" />
          <rect data-part="row-3-month" x="22" y="74" width="18" height="5" rx="2.5" fill="var(--surface-muted)" />
          <rect data-part="row-3-value" x="64" y="74" width="26" height="5" rx="2.5" fill="var(--surface-muted)" />
          <rect data-part="highlight-band" x="15" y="84" width="82" height="15" fill="var(--primary-subtle)" />
          <rect data-part="last-row-month" x="22" y="89" width="18" height="5" rx="2.5" fill="var(--primary)" />
          <rect data-part="last-row-value" x="64" y="89" width="26" height="5" rx="2.5" fill="var(--primary)" />
          <rect data-part="scan-line" x="8" y="83" width="96" height="2" rx="1" fill="var(--primary)" />
        </g>
        <circle data-part="arrow-circle" cx="136" cy="60" r="13.5" fill="var(--card)" stroke="var(--line)" />
        <g data-part="arrow">
          <path d="M131.333 60H140.667M136 64.6667L140.667 60L136 55.3333" stroke="var(--primary)" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g data-part="chart-card">
          <rect x="174" y="18" width="112" height="84" rx="10" fill="var(--card)" />
          <rect data-part="title-bar" x="184" y="28" width="36" height="5" rx="2.5" fill="var(--surface-muted)" />
          <rect data-part="baseline" x="184" y="90" width="92" height="1" fill="var(--line)" />
          <path data-part="bar-1-2" d="M185.539 53.0832C185.539 52.2548 186.21 51.5832 187.039 51.5832H188.039C188.867 51.5832 189.539 52.2548 189.539 53.0832V90H185.539V53.0832Z" fill="var(--line-strong)" />
          <path data-part="bar-2-2" d="M192.615 54.2868C192.615 53.4584 193.287 52.7868 194.115 52.7868H195.115C195.944 52.7868 196.615 53.4584 196.615 54.2868V90H192.615V54.2868Z" fill="var(--line-strong)" />
          <path data-part="bar-3" d="M199.692 53.1936C199.692 52.3652 200.364 51.6936 201.192 51.6936H202.192C203.021 51.6936 203.692 52.3652 203.692 53.1936V90H199.692V53.1936Z" fill="var(--line-strong)" />
          <path data-part="bar-4" d="M206.769 56.5248C206.769 55.6964 207.441 55.0248 208.269 55.0248H209.269C210.097 55.0248 210.769 55.6964 210.769 56.5248V90H206.769V56.5248Z" fill="var(--line-strong)" />
          <path data-part="bar-5" d="M213.846 55.5456C213.846 54.7172 214.518 54.0456 215.346 54.0456H216.346C217.175 54.0456 217.846 54.7172 217.846 55.5456V90H213.846V55.5456Z" fill="var(--line-strong)" />
          <path data-part="bar-6" d="M220.923 56.6484C220.923 55.82 221.594 55.1484 222.423 55.1484H223.423C224.251 55.1484 224.923 55.82 224.923 56.6484V90H220.923V56.6484Z" fill="var(--line-strong)" />
          <path data-part="bar-7" d="M228 60.1416C228 59.3132 228.672 58.6416 229.5 58.6416H230.5C231.328 58.6416 232 59.3132 232 60.1416V90H228V60.1416Z" fill="var(--line-strong)" />
          <path data-part="bar-8" d="M235.077 56.5908C235.077 55.7624 235.749 55.0908 236.577 55.0908H237.577C238.406 55.0908 239.077 55.7624 239.077 56.5908V90H235.077V56.5908Z" fill="var(--line-strong)" />
          <path data-part="bar-9" d="M242.154 53.6244C242.154 52.796 242.825 52.1244 243.654 52.1244H244.654C245.482 52.1244 246.154 52.796 246.154 53.6244V90H242.154V53.6244Z" fill="var(--line-strong)" />
          <path data-part="bar-10" d="M249.231 50.4348C249.231 49.6064 249.903 48.9348 250.731 48.9348H251.731C252.559 48.9348 253.231 49.6064 253.231 50.4348V90H249.231V50.4348Z" fill="var(--line-strong)" />
          <path data-part="bar-11" d="M256.308 51.564C256.308 50.7356 256.979 50.064 257.808 50.064H258.808C259.636 50.064 260.308 50.7356 260.308 51.564V90H256.308V51.564Z" fill="var(--line-strong)" />
          <path data-part="bar-12" d="M263.385 53.004C263.385 52.1756 264.056 51.504 264.885 51.504H265.885C266.713 51.504 267.385 52.1756 267.385 53.004V90H263.385V53.004Z" fill="var(--line-strong)" />
          <path data-part="bar-13" d="M270.461 52.32C270.461 51.4916 271.133 50.82 271.961 50.82H272.961C273.79 50.82 274.461 51.4916 274.461 52.32V90H270.461V52.32Z" fill="var(--primary)" />
        </g>
      </g>
    </Svg>
  );
}
