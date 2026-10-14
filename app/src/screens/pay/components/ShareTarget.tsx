import { Link, Mail } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { WhatsAppGlyph } from './icons';

export type ShareBrand = 'whatsapp' | 'email' | 'copy-link';

export interface ShareTargetProps extends Omit<ComponentProps<'button'>, 'children'> {
  /** Figma "Brand". */
  brand: ShareBrand;
}

const LABELS: Record<ShareBrand, string> = {
  whatsapp: 'WhatsApp',
  email: 'Email',
  'copy-link': 'Copy link',
};

/**
 * Figma: Share target (28:37811). A 56 circle with the glyph and a Text-sm/Medium `ink` label, 8 apart.
 * WhatsApp is the one brand colour in the app (#25d366, white glyph); Email and Copy link are `surface-muted` circles
 * with a 24 icon. Disabled is 40% (Figma State Disabled). Pressing scales the circle.
 */
export function ShareTarget({ brand, className, disabled, type = 'button', ...props }: ShareTargetProps) {
  const whatsapp = brand === 'whatsapp';
  return (
    <button
      type={type}
      disabled={disabled}
      data-brand={brand}
      className={cn(
        'group flex w-full min-w-0 flex-col items-center gap-2 outline-none',
        disabled && 'pointer-events-none opacity-40',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'grid size-14 place-items-center rounded-full text-ink transition-transform duration-150 ease-out',
          'group-active:scale-95 motion-reduce:group-active:scale-100',
          'group-focus-visible:ring-[3px] group-focus-visible:ring-primary/40',
          whatsapp ? 'bg-[#25d366] text-card' : 'bg-surface-muted',
        )}
      >
        {whatsapp && <WhatsAppGlyph />}
        {brand === 'email' && <Mail size={24} strokeWidth={2} aria-hidden />}
        {brand === 'copy-link' && <Link size={24} strokeWidth={2} aria-hidden />}
      </span>
      <span className="text-sm font-medium whitespace-nowrap text-ink">{LABELS[brand]}</span>
    </button>
  );
}
