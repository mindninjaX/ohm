import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * The lock screen's glass (S02), drawn in CSS. Figma uses iOS "Liquid Glass - Clear": a #101010 fill that adds
 * light to what is behind it (a linear dodge), an inner glow that is a little stronger at the top and the
 * bottom, and a thin bright rim. Here: a white veil whose strength follows that glow (about the same lift as
 * the dodge on this dark wallpaper, and it keeps working while the card animates in: a blend mode would not,
 * because opacity and transform on an ancestor isolate it), a few px of backdrop blur, and the rim.
 */
export function LockGlass({
  radius,
  className,
  style,
  children,
}: {
  radius: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div data-slot="lock-glass" className={cn('relative', className)} style={{ borderRadius: radius, ...style }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ borderRadius: radius, backdropFilter: 'blur(4px)' }}
      />
      {/* The light the glass adds: a touch more at the bottom edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          background:
            'linear-gradient(to bottom, rgb(255 255 255 / 0.05) 0%, rgb(255 255 255 / 0.052) 22%, rgb(255 255 255 / 0.06) 62%, rgb(255 255 255 / 0.1) 100%)',
        }}
      />
      {/* The rim: bright along the top, softer along the bottom, hairline around. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          boxShadow:
            'inset 0 0.75px 0 rgb(255 255 255 / 0.5), inset 0 -0.75px 0 rgb(255 255 255 / 0.3), inset 0 0 0 0.5px rgb(255 255 255 / 0.12), 0 0 0 0.5px rgb(0 0 12 / 0.8)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
