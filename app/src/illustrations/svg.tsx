import { useId, type CSSProperties, type ReactNode } from 'react';

/** Props shared by every illustration component. */
export interface IllustrationProps {
  /** Rendered width in px. Height follows the artwork's aspect ratio. Defaults to the Figma size. */
  width?: number;
  className?: string;
  style?: CSSProperties;
  /** Accessible name. Without it the illustration is decorative and hidden from assistive tech. */
  title?: string;
}

/** A DOM-safe unique id prefix, so clip paths, masks and filters never collide between instances. */
export function useUid(): string {
  return useId().replace(/[^a-zA-Z0-9_-]/g, '');
}

interface SvgProps extends IllustrationProps {
  /** Native artwork width (the viewBox width). */
  w: number;
  /** Native artwork height (the viewBox height). */
  h: number;
  /** Let shadows and glows spill outside the viewBox. */
  overflowVisible?: boolean;
  children: ReactNode;
}

/** The one SVG wrapper: keeps the Figma viewBox, scales by `width`, handles accessibility. */
export function Svg({ w, h, width, className, style, title, overflowVisible, children }: SvgProps) {
  const rendered = width ?? w;
  return (
    <svg
      width={rendered}
      height={(rendered * h) / w}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      className={className}
      style={overflowVisible ? { overflow: 'visible', ...style } : style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  );
}

/**
 * Where a dash pattern starts so a dashed segment looks the way Figma draws it. Figma does not run one pattern round a
 * whole shape: it fits each straight line and each corner arc on its own, with a whole number of gaps and the two end
 * dashes cut to the same length, so every segment is symmetric. (An SVG `stroke-dasharray` alone starts every
 * segment with a full dash.) Use the result as `strokeDashoffset`. Checked against Figma's PNG for 3 2 dashes on
 * lines of 20, 8 and a 2.5 radius arc, a 4 4 line of 68.5 and a 3 3 line of 200.
 */
export function figmaDashOffset(length: number, dash: number, gap: number): number {
  const gaps = Math.max(1, Math.round(length / (dash + gap)));
  const end = (length - gaps * gap - (gaps - 1) * dash) / 2;
  return dash - end;
}

interface DashedRoundRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Corner radius, at most half of the shorter side. */
  radius: number;
  stroke: string;
  dash: number;
  gap: number;
  strokeWidth?: number;
}

/**
 * A rounded rectangle outline with Figma's dashes (see `figmaDashOffset`): four sides and four corner arcs, each
 * dashed on its own. Replaces `<rect rx stroke-dasharray>` in a Figma export, which SVG dashes in one run.
 */
export function DashedRoundRect({ x, y, width, height, radius: r, stroke, dash, gap, strokeWidth }: DashedRoundRectProps) {
  const x1 = x + width;
  const y1 = y + height;
  const arc = (Math.PI * r) / 2;
  const sideX = width - 2 * r;
  const sideY = height - 2 * r;
  const segments: { d: string; length: number }[] = [
    { d: `M${x + r} ${y}H${x1 - r}`, length: sideX },
    { d: `M${x1 - r} ${y}A${r} ${r} 0 0 1 ${x1} ${y + r}`, length: arc },
    { d: `M${x1} ${y + r}V${y1 - r}`, length: sideY },
    { d: `M${x1} ${y1 - r}A${r} ${r} 0 0 1 ${x1 - r} ${y1}`, length: arc },
    { d: `M${x1 - r} ${y1}H${x + r}`, length: sideX },
    { d: `M${x + r} ${y1}A${r} ${r} 0 0 1 ${x} ${y1 - r}`, length: arc },
    { d: `M${x} ${y1 - r}V${y + r}`, length: sideY },
    { d: `M${x} ${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}`, length: arc },
  ];
  return (
    <g data-part="dashed-outline" stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={`${dash} ${gap}`}>
      {segments.map((seg) => (
        <path key={seg.d} d={seg.d} strokeDashoffset={figmaDashOffset(seg.length, dash, gap)} />
      ))}
    </g>
  );
}
