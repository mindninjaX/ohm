/**
 * S12 history illustrations. "Rupee history starts" and "Waiting for months". 88 x 88.
 * Exported from the Figma file "Bill app" (Foundations page), colours mapped to the brand CSS variables.
 * Static: no motion.
 */
import { Svg, type IllustrationProps } from './svg';

/** Figma 20:17926. */
export function RupeeHistoryArt(props: IllustrationProps) {
  return (
    <Svg w={88} h={88} {...props}>
      <g data-part="kind-rupees">
        <rect data-part="ghost-page-2" opacity="0.55" x="5.46387" y="27.4644" width="42.5" height="55.0714" rx="5.53571" stroke="var(--line)" strokeWidth="1.5" />
        <rect data-part="ghost-page-1" x="18.0361" y="22.75" width="42.5" height="55.0714" rx="5.53571" stroke="var(--line)" strokeWidth="1.5" />
        <rect data-part="paper" x="30.3574" y="17.7856" width="43" height="55.5714" rx="5.78571" fill="var(--card)" stroke="var(--line)" />
        <rect data-part="line-1" x="36.1426" y="26.7144" width="22" height="3.14286" rx="1.57143" fill="var(--line)" />
        <rect data-part="line-2" x="36.1426" y="36.1431" width="28.2857" height="3.14286" rx="1.57143" fill="var(--line)" />
        <rect data-part="line-3" x="36.1426" y="45.5713" width="18.8571" height="3.14286" rx="1.57143" fill="var(--line)" />
        <rect data-part="line-4" x="36.1426" y="55" width="25.1429" height="3.14286" rx="1.57143" fill="var(--line)" />
        <rect data-part="line-5" x="36.1426" y="64.4287" width="15.7143" height="3.14286" rx="1.57143" fill="var(--line)" />
        <rect data-part="scan-glow" opacity="0.16" x="29.8574" y="47.1431" width="44" height="9.42857" fill="var(--primary)" />
        <rect data-part="scan-line" x="26.7139" y="45.5713" width="50.2857" height="2" rx="0.785714" fill="var(--primary)" />
        <circle data-part="badge-ring" cx="73.8574" cy="15.7144" r="11" fill="var(--card)" />
        <circle data-part="badge" cx="73.8573" cy="15.7142" r="9.42857" fill="var(--primary)" />
        <g data-part="icon">
          <path d="M71.1074 11.5894H76.6074M71.1074 13.881H76.6074M75.0033 19.8394L71.1074 16.1727H72.4824C75.5381 16.1727 75.5381 11.5894 72.4824 11.5894" stroke="var(--card)" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </Svg>
  );
}

/** Figma 20:17941. */
export function WaitingForMonthsArt(props: IllustrationProps) {
  return (
    <Svg w={88} h={88} {...props}>
      <g data-part="kind-units">
        <rect data-part="paper" x="19.3574" y="16.2144" width="49.2857" height="61.8571" rx="5.78571" fill="var(--card)" stroke="var(--line)" />
        <rect data-part="line-1" x="25.1426" y="23.5713" width="25.1429" height="3.14286" rx="1.57143" fill="var(--line)" />
        <rect data-part="line-2" x="25.1426" y="29.0713" width="17.2857" height="3.14286" rx="1.57143" fill="var(--line)" />
        <rect data-part="line-3" x="25.1426" y="34.5713" width="22" height="3.14286" rx="1.57143" fill="var(--line)" />
        <rect data-part="baseline" x="25.1426" y="64.4287" width="42.4286" height="0.785714" fill="var(--line)" />
        <path data-part="bar-1" d="M28.2861 49.5002C28.2861 48.1984 29.3415 47.1431 30.6433 47.1431H33.7861C35.0879 47.1431 36.1433 48.1984 36.1433 49.5002V64.4288H28.2861V49.5002Z" fill="var(--line-strong)" />
        <path data-part="bar-2" d="M46.9863 44V44.75H47.9287C48.1928 44.75 48.4402 44.8135 48.6582 44.9248L48.998 44.2578C49.4406 44.4837 49.8013 44.8447 50.0273 45.2871L49.3613 45.6279C49.4726 45.846 49.5361 46.0933 49.5361 46.3574V47.7129H50.2861V49.5195H49.5361V52.2305H50.2861V54.0371H49.5361V56.748H50.2861V58.5557H49.5361V61.2656H50.2861V63.0732H49.5361V63.6787H49.1074V64.4287H47.5361V63.6787H45.1787V64.4287H43.6074V63.6787H43.1787V63.0732H42.4287V61.2656H43.1787V58.5557H42.4287V56.748H43.1787V54.0371H42.4287V52.2305H43.1787V49.5195H42.4287V47.7129H43.1787V46.3574C43.1787 46.0933 43.2422 45.846 43.3535 45.6279L42.6865 45.2871C42.9125 44.8447 43.2734 44.4837 43.7158 44.2578L44.0566 44.9248C44.2747 44.8135 44.522 44.75 44.7861 44.75H45.7285V44H46.9863Z" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="3 2" />
        <path data-part="bar-ghost" d="M58.9287 41.6069H62.0713C62.9589 41.6069 63.6787 42.3268 63.6787 43.2144V63.6782H57.3213V43.2144C57.3213 42.3268 58.0411 41.6069 58.9287 41.6069Z" stroke="var(--primary)" strokeWidth="1.5" />
        <rect data-part="scan-line" x="23.5713" y="48.7144" width="44" height="2" rx="0.785714" fill="var(--primary)" />
        <circle data-part="badge-ring" cx="70.7139" cy="14.1431" r="11" fill="var(--card)" />
        <circle data-part="badge" cx="70.7147" cy="14.1429" r="9.42857" fill="var(--primary)" />
        <g data-part="icon">
          <path d="M66.5889 10.0181V18.2681H74.8389M73.4639 16.4347V12.7681M71.1722 16.4347V10.9347M68.8805 16.4347V15.0597" stroke="var(--card)" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </Svg>
  );
}
