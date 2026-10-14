import { useMemo } from 'react';
import QRCode from 'qrcode';
import { cn } from '@/lib/utils';

/**
 * A QR code drawn in the browser (the "qrcode" package) as one SVG path. No image, no
 * network request. The code is dark on a transparent background; put it on white.
 */
export function QrCode({
  value,
  size = 148,
  label,
  className,
}: {
  value: string;
  size?: number;
  label: string;
  className?: string;
}) {
  const { path, count } = useMemo(() => {
    try {
      const qr = QRCode.create(value, { errorCorrectionLevel: 'M' });
      const n = qr.modules.size;
      const data = qr.modules.data;
      let d = '';
      for (let row = 0; row < n; row++) {
        let col = 0;
        while (col < n) {
          if (!data[row * n + col]) {
            col++;
            continue;
          }
          const start = col;
          while (col < n && data[row * n + col]) col++;
          d += `M${start} ${row}h${col - start}v1h-${col - start}z`;
        }
      }
      return { path: d, count: n };
    } catch {
      return { path: '', count: 0 };
    }
  }, [value]);

  if (!path) return null;
  return (
    <svg
      role="img"
      aria-label={label}
      width={size}
      height={size}
      viewBox={`0 0 ${count} ${count}`}
      shapeRendering="crispEdges"
      className={cn('stroke-none', className)}
    >
      <path d={path} fill="var(--ink-strong)" />
    </svg>
  );
}
