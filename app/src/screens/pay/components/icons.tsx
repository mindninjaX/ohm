import { Clock, Share, Zap, type LucideProps } from 'lucide-react';

/**
 * The few glyphs the share card and the share sheet draw that are not plain lucide icons, or that Figma
 * draws with a 2 px stroke at any size (a lucide icon scales its stroke with its size, so these pass
 * `absoluteStrokeWidth`). Paths come from the Figma export of the exact layers
 * (S09 Share, Ohm / Sheet > Share sheet body).
 */

/** Share / Status band icon: lucide clock at 20, stroke 2. */
export function ClockIcon(props: LucideProps) {
  return <Clock size={20} strokeWidth={2} absoluteStrokeWidth aria-hidden {...props} />;
}

/** Share / Ohm stamp icon: lucide zap at 14, stroke 2, `primary`. */
export function BoltIcon(props: LucideProps) {
  return <Zap size={14} strokeWidth={2} absoluteStrokeWidth aria-hidden {...props} />;
}

/** S11 Share receipt button: lucide share at 20, stroke 2 (the other footer icons scale; this one does not). */
export function ShareIcon(props: LucideProps) {
  return <Share size={20} strokeWidth={2} absoluteStrokeWidth aria-hidden {...props} />;
}

/** Icon / piggy-bank (local) from the Figma file: 16 x 16, stroke 1.75, drawn in the current colour. */
export function PiggyBankIcon({ size = 16, ...props }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3.33337 7.99967C3.33337 4.46634 8.33337 3.66634 10.6667 4.66634C10.8 4.26634 11.6667 3.33301 12.6667 3.33301V5.33301C13 5.66634 13.3334 5.99967 13.3334 6.66634H14.6667V9.33301H13.3334C13.1334 9.99967 12.6667 10.333 12 10.6663V13.333H9.33337V11.9997H7.33337V13.333H4.66671V10.9997C3.33337 9.99967 3.33337 9.19967 3.33337 7.99967ZM3.33337 7.99967H2.66671C1.93337 7.99967 1.33337 7.39967 1.33337 6.66634V5.99967M10.6667 7.33301H10.6734" />
    </svg>
  );
}

/**
 * The WhatsApp glyph (Remix whatsapp-line, Figma "remix/whatsapp"): drawn on a 24 grid, shown at 28. Figma gives the
 * outline a 2 px inside stroke and no fill, which is the same as filling the outline shape, so it is filled here.
 */
export function WhatsAppGlyph({ size = 28, ...props }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(2 2)"
        d="M 5.253 16.494 L 5.977 16.917 C 7.188 17.623 8.564 18 10 18 C 14.418 18 18 14.418 18 10 C 18 5.582 14.418 2 10 2 C 5.582 2 2 5.582 2 10 C 2 11.436 2.377 12.813 3.084 14.024 L 3.506 14.748 L 2.853 17.149 L 5.253 16.494 Z M 0.004 20 L 1.356 15.031 C 0.494 13.554 0 11.834 0 10 C 0 4.477 4.477 0 10 0 C 15.523 0 20 4.477 20 10 C 20 15.523 15.523 20 10 20 C 8.166 20 6.448 19.506 4.97 18.645 L 0.004 20 Z M 6.391 5.308 C 6.525 5.299 6.66 5.297 6.794 5.304 C 6.848 5.308 6.902 5.314 6.956 5.32 C 7.115 5.338 7.29 5.435 7.349 5.569 C 7.647 6.245 7.937 6.926 8.217 7.61 C 8.279 7.761 8.242 7.956 8.124 8.146 C 8.064 8.243 7.97 8.379 7.862 8.518 C 7.748 8.663 7.505 8.929 7.505 8.929 C 7.505 8.929 7.406 9.047 7.444 9.194 C 7.458 9.25 7.504 9.331 7.546 9.399 C 7.569 9.437 7.591 9.471 7.605 9.494 C 7.861 9.921 8.205 10.354 8.625 10.762 C 8.745 10.878 8.862 10.997 8.988 11.108 C 9.456 11.521 9.986 11.858 10.558 12.108 L 10.563 12.111 C 10.648 12.147 10.691 12.167 10.815 12.219 C 10.877 12.246 10.941 12.268 11.006 12.286 C 11.03 12.292 11.054 12.296 11.079 12.297 C 11.241 12.307 11.334 12.203 11.374 12.156 C 12.097 11.279 12.164 11.222 12.169 11.222 L 12.169 11.224 C 12.264 11.124 12.413 11.089 12.547 11.097 C 12.608 11.101 12.668 11.112 12.724 11.138 C 13.255 11.38 14.125 11.759 14.125 11.759 L 14.706 12.02 C 14.804 12.067 14.893 12.178 14.897 12.285 C 14.9 12.352 14.907 12.46 14.883 12.658 C 14.852 12.917 14.773 13.228 14.695 13.391 C 14.64 13.506 14.568 13.607 14.486 13.693 C 14.373 13.81 14.29 13.881 14.155 13.981 C 14.073 14.043 14.03 14.071 14.03 14.071 C 13.891 14.159 13.813 14.203 13.647 14.291 C 13.39 14.428 13.106 14.507 12.814 14.522 C 12.629 14.531 12.443 14.545 12.258 14.535 C 12.25 14.534 11.69 14.448 11.69 14.448 C 10.268 14.074 8.953 13.374 7.849 12.402 C 7.624 12.203 7.415 11.988 7.201 11.776 C 6.312 10.891 5.639 9.936 5.231 9.034 C 5.029 8.588 4.902 8.112 4.9 7.621 C 4.896 7.014 5.095 6.423 5.465 5.942 C 5.538 5.847 5.607 5.749 5.726 5.636 C 5.852 5.517 5.933 5.452 6.02 5.408 C 6.135 5.349 6.262 5.317 6.391 5.308 Z"
      />
    </svg>
  );
}
