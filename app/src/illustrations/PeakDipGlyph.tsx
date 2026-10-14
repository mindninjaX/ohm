import { Svg, type IllustrationProps } from './svg';

export interface PeakDipGlyphProps extends IllustrationProps {
  /** highest: the middle bar is tallest. lowest: the middle bar is short. */
  kind?: 'highest' | 'lowest';
  /** 20 or 24 px. The artwork is drawn at 20 and scales. */
  size?: 20 | 24;
}

/**
 * Figma: Ohm / Peak and dip glyph (20:17831), Kind Highest | Lowest, Size 20 | 24.
 * Three 4 px bars, the middle one `ink-strong`, the others `line-strong`. Static.
 */
const BARS = {
  highest: [
    'M2 11.5C2 10.6716 2.67157 10 3.5 10H4.5C5.32843 10 6 10.6716 6 11.5V18H2V11.5Z',
    'M8 3.5C8 2.67157 8.67157 2 9.5 2H10.5C11.3284 2 12 2.67157 12 3.5V18H8V3.5Z',
    'M14 9.5C14 8.67157 14.6716 8 15.5 8H16.5C17.3284 8 18 8.67157 18 9.5V18H14V9.5Z',
  ],
  lowest: [
    'M2 5.5C2 4.67157 2.67157 4 3.5 4H4.5C5.32843 4 6 4.67157 6 5.5V18H2V5.5Z',
    'M8 13.5C8 12.6716 8.67157 12 9.5 12H10.5C11.3284 12 12 12.6716 12 13.5V18H8V13.5Z',
    'M14 7.5C14 6.67157 14.6716 6 15.5 6H16.5C17.3284 6 18 6.67157 18 7.5V18H14V7.5Z',
  ],
} as const;

export function PeakDipGlyph({ kind = 'highest', size = 20, width, ...rest }: PeakDipGlyphProps) {
  const bars = BARS[kind];
  return (
    <Svg w={20} h={20} width={width ?? size} {...rest}>
      <path data-part="bar-left" d={bars[0]} fill="var(--line-strong)" />
      <path data-part="bar-middle" d={bars[1]} fill="var(--ink-strong)" />
      <path data-part="bar-right" d={bars[2]} fill="var(--line-strong)" />
    </Svg>
  );
}
