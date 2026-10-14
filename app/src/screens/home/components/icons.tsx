import type { LucideProps } from 'lucide-react';

/**
 * Three icons the Figma file draws itself ("Icon / ... (local)", the older Lucide shapes), exported
 * from the frames with their own viewBox and stroke width. Same props as a Lucide icon, so they go
 * wherever an `IconComponent` does.
 */

function LocalIcon({ size = 16, box, weight, d, ...props }: LucideProps & { box: number; weight: number; d: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${box} ${box}`}
      fill="none"
      stroke="currentColor"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <path d={d} strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Icon / piggy-bank (local), drawn on 16. */
export function PiggyBankIcon(props: LucideProps) {
  return (
    <LocalIcon
      {...props}
      box={16}
      weight={1.33333}
      d="M3.33333 7.99967C3.33333 4.46634 8.33333 3.66634 10.6667 4.66634C10.8 4.26634 11.6667 3.33301 12.6667 3.33301V5.33301C13 5.66634 13.3333 5.99967 13.3333 6.66634H14.6667V9.33301H13.3333C13.1333 9.99967 12.6667 10.333 12 10.6663V13.333H9.33333V11.9997H7.33333V13.333H4.66666V10.9997C3.33333 9.99967 3.33333 9.19967 3.33333 7.99967ZM3.33333 7.99967H2.66666C1.93333 7.99967 1.33333 7.39967 1.33333 6.66634V5.99967M10.6667 7.33301H10.6733"
    />
  );
}

/** Icon / receipt-indian-rupee (local), drawn on 18 with a 1.5 stroke. */
export function ReceiptIndianRupeeIcon(props: LucideProps) {
  return (
    <LocalIcon
      {...props}
      box={18}
      weight={1.5}
      d="M6 5.25H12M9 13.125L6 11.25H6.75C7.54565 11.25 8.30871 10.9339 8.87132 10.3713C9.43393 9.80871 9.75 9.04565 9.75 8.25C9.75 7.45435 9.43393 6.69129 8.87132 6.12868C8.30871 5.56607 7.54565 5.25 6.75 5.25M6 8.25H12M3 1.5V16.5L4.5 15.75L6 16.5L7.5 15.75L9 16.5L10.5 15.75L12 16.5L13.5 15.75L15 16.5V1.5L13.5 2.25L12 1.5L10.5 2.25L9 1.5L7.5 2.25L6 1.5L4.5 2.25L3 1.5Z"
    />
  );
}

/** Icon / indian-rupee (local), the 18 px one with a 2 stroke (the sheet row). */
export function IndianRupeeIcon(props: LucideProps) {
  return (
    <LocalIcon
      {...props}
      box={18}
      weight={2}
      d="M4.5 2.25H13.5M4.5 6H13.5M10.875 15.75L4.5 9.75H6.75C11.7502 9.75 11.7502 2.25 6.75 2.25"
    />
  );
}

/** The 14 px rupee in the readout label (stroke 1.17 on 14). */
export function IndianRupeeSmallIcon(props: LucideProps) {
  return (
    <LocalIcon
      {...props}
      box={14}
      weight={1.16667}
      d="M3.5 1.75H10.5M3.5 4.66667H10.5M8.45833 12.25L3.5 7.58333H5.25C9.13908 7.58333 9.13908 1.75 5.25 1.75"
    />
  );
}
