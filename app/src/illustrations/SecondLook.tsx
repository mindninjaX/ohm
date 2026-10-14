import { Svg, useUid, type IllustrationProps } from './svg';

/**
 * Figma: Illustration / Second look (11:12946). A bill page with a magnifying glass over the highlighted line and
 * a chat badge: someone at Ohm taking a second look. Exported from Figma at 65% scale, cropped to the art (104 x 76).
 */
export function SecondLook({ width = 104, className, ...rest }: IllustrationProps) {
  const u = useUid();
  const { style, title } = rest;
  return (
    <Svg w={104} h={76} width={width} className={className} style={style} title={title}>
      <defs>
        <clipPath id={`${u}-zap`}>
          <rect width="5.85" height="5.85" fill="var(--card)" transform="translate(148.325 8.32422)" />
        </clipPath>
      </defs>
      <g transform="translate(-128.5 0)" data-part="second-look">
        <g data-part="page">
          <rect x="141.825" y="1.825" width="53.95" height="69.55" rx="6.175" fill="var(--card)" />
          <rect x="141.825" y="1.825" width="53.95" height="69.55" rx="6.175" stroke="var(--line)" strokeWidth="0.65" />
          <rect x="146.7" y="6.69922" width="9.1" height="9.1" rx="2.6" fill="var(--primary-subtle)" />
          <g clipPath={`url(#${u}-zap)`}>
            <path
              d="M149.3 11.7362C149.254 11.7363 149.209 11.7234 149.17 11.6989C149.131 11.6744 149.099 11.6393 149.079 11.5976C149.059 11.556 149.052 11.5096 149.057 11.4638C149.063 11.418 149.081 11.3747 149.11 11.3389L151.523 8.85262C151.541 8.83173 151.566 8.81761 151.593 8.81258C151.62 8.80755 151.648 8.81192 151.673 8.82495C151.697 8.83799 151.716 8.85893 151.727 8.88433C151.738 8.90973 151.74 8.93809 151.733 8.96474L151.265 10.4321C151.251 10.4691 151.246 10.5088 151.251 10.5479C151.256 10.587 151.27 10.6244 151.293 10.6567C151.315 10.6891 151.345 10.7155 151.38 10.7337C151.415 10.7519 151.454 10.7613 151.494 10.7612H153.2C153.246 10.761 153.291 10.774 153.33 10.7985C153.369 10.823 153.401 10.8581 153.421 10.8997C153.441 10.9413 153.448 10.9877 153.443 11.0335C153.437 11.0793 153.419 11.1227 153.39 11.1585L150.977 13.6447C150.959 13.6656 150.934 13.6798 150.907 13.6848C150.88 13.6898 150.852 13.6854 150.827 13.6724C150.803 13.6594 150.784 13.6384 150.773 13.613C150.762 13.5876 150.76 13.5593 150.767 13.5326L151.235 12.0652C151.249 12.0283 151.254 11.9886 151.249 11.9495C151.244 11.9103 151.23 11.873 151.207 11.8406C151.185 11.8083 151.155 11.7819 151.12 11.7637C151.085 11.7455 151.046 11.7361 151.006 11.7362H149.3Z"
              stroke="var(--primary)"
              strokeWidth="0.4875"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <rect x="159.7" y="9.30078" width="28.6" height="3.25" rx="1.3" fill="var(--surface-muted)" />
          <rect x="146.7" y="21" width="41.6" height="3.25" rx="1.3" fill="var(--surface-muted)" />
          <rect x="147.025" y="29.1258" width="43.55" height="14.95" rx="2.925" fill="var(--primary-subtle)" />
          <rect x="147.025" y="29.1258" width="43.55" height="14.95" rx="2.925" stroke="var(--primary)" strokeWidth="0.65" />
          <rect x="146.7" y="50.9004" width="33.8" height="3.25" rx="1.3" fill="var(--surface-muted)" />
          <rect x="146.7" y="57.4004" width="26" height="3.25" rx="1.3" fill="var(--surface-muted)" />
        </g>
        <rect
          data-part="lens-handle"
          x="192.2"
          y="45.6992"
          width="3.9"
          height="14.3"
          rx="1.95"
          transform="rotate(-45 192.2 45.6992)"
          fill="var(--primary)"
        />
        <circle data-part="lens" cx="183.1" cy="36.6008" r="13.325" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.95" />
        <g data-part="chat-badge">
          <rect x="201.625" y="47.325" width="25.35" height="25.35" rx="12.675" fill="var(--card)" />
          <rect x="201.625" y="47.325" width="25.35" height="25.35" rx="12.675" stroke="var(--line)" strokeWidth="0.65" />
          <path
            d="M212.079 64.3337C213.113 64.864 214.302 65.0077 215.433 64.7387C216.563 64.4698 217.56 63.806 218.244 62.8669C218.928 61.9279 219.255 60.7753 219.164 59.6169C219.074 58.4586 218.573 57.3705 217.751 56.549C216.93 55.7274 215.842 55.2262 214.683 55.1359C213.525 55.0455 212.372 55.3718 211.433 56.0561C210.494 56.7403 209.831 57.7374 209.562 58.8678C209.293 59.9981 209.436 61.1874 209.967 62.2212L208.883 65.417L212.079 64.3337Z"
            stroke="var(--primary)"
            strokeWidth="1.08333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </Svg>
  );
}
