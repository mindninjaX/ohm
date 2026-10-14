/**
 * A paid bill page with the green check badge (Paid bill hero on the July bill). 76 x 96.
 * Exported from the Figma file "Bill app" (Foundations page), colours mapped to the brand CSS variables.
 * Static: no motion.
 */
import { Svg, useUid, type IllustrationProps } from './svg';

/** Figma 11:10082. */
export function PaidBillPage(props: IllustrationProps) {
  const u = useUid();
  return (
    <Svg w={76} h={96} {...props}>
      <defs>
        <clipPath id={`${u}-d0`}>
          <rect width="9" height="9" fill="var(--card)" transform="translate(10.5 10.5)" />
        </clipPath>
      </defs>
      <g data-part="paid-bill-page">
        <g data-part="front-page">
          <rect x="0.5" y="0.5" width="63" height="83" rx="9.5" fill="var(--card)" />
          <rect x="0.5" y="0.5" width="63" height="83" rx="9.5" stroke="var(--line)" />
          <rect data-part="zap-tile" x="8" y="8" width="14" height="14" rx="4" fill="var(--primary-subtle)" />
          <g data-part="lucide-zap" clipPath={`url(#${u}-d0)`}>
            <path d="M11.9998 15.75C11.9289 15.7502 11.8593 15.7303 11.7992 15.6926C11.7391 15.6549 11.6909 15.6009 11.6603 15.5369C11.6296 15.4729 11.6178 15.4015 11.6261 15.331C11.6345 15.2605 11.6626 15.1939 11.7073 15.1388L15.4198 11.3138C15.4477 11.2816 15.4856 11.2599 15.5274 11.2521C15.5693 11.2444 15.6125 11.2511 15.65 11.2712C15.6875 11.2912 15.717 11.3235 15.7338 11.3625C15.7506 11.4016 15.7536 11.4452 15.7423 11.4863L15.0223 13.7437C15.0011 13.8006 14.994 13.8617 15.0015 13.9219C15.0091 13.9821 15.0312 14.0395 15.0658 14.0893C15.1005 14.1391 15.1467 14.1797 15.2005 14.2077C15.2544 14.2357 15.3142 14.2502 15.3748 14.25H17.9998C18.0708 14.2498 18.1404 14.2697 18.2005 14.3074C18.2606 14.3451 18.3087 14.3991 18.3394 14.4631C18.37 14.5271 18.3818 14.5985 18.3735 14.669C18.3652 14.7395 18.337 14.8061 18.2923 14.8613L14.5798 18.6862C14.552 18.7184 14.514 18.7401 14.4722 18.7478C14.4304 18.7556 14.3872 18.7489 14.3497 18.7288C14.3122 18.7088 14.2826 18.6765 14.2658 18.6375C14.249 18.5984 14.246 18.5548 14.2573 18.5138L14.9773 16.2563C14.9985 16.1994 15.0057 16.1383 14.9981 16.0781C14.9905 16.0179 14.9684 15.9605 14.9338 15.9107C14.8991 15.8609 14.8529 15.8203 14.7991 15.7923C14.7453 15.7643 14.6855 15.7498 14.6248 15.75H11.9998Z" stroke="var(--primary)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <rect data-part="bar-1" x="26" y="13" width="30" height="4" rx="2" fill="var(--surface-muted)" />
          <rect data-part="bar-2" x="8" y="30" width="48" height="4" rx="2" fill="var(--surface-muted)" />
          <rect data-part="bar-3" x="8" y="40" width="32" height="4" rx="2" fill="var(--surface-muted)" />
          <rect data-part="amount-block" x="8" y="56" width="48" height="12" rx="4" fill="var(--surface-muted)" />
        </g>
        <circle data-part="badge" cx="62" cy="82" r="12" fill="var(--success-subtle)" stroke="var(--card)" strokeWidth="2" />
        <g data-part="tick">
          <path d="M66 79L60.5 84.5L58 82" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </Svg>
  );
}
