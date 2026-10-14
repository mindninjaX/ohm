import { toast } from '@/components/ohm';
import { ShareCard, type ShareCardProps } from './ShareCard';
import type { ShareBrand } from './ShareTarget';
import { ShareTargetRow } from './ShareTargetRow';

/** Copy text to the clipboard. Never throws: a blocked clipboard just means the toast is all the person gets. */
async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Not a secure context, or permission denied: fall back to the old way.
  }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  } catch {
    // Nothing more to try.
  }
}

/** The last share action, so a repeated tap in the same moment does not stack a second toast. */
let lastShare = { brand: '' as ShareBrand | '', at: 0 };

/** What each share target does in the prototype: nothing opens, a toast says what would. */
function shareVia(brand: ShareBrand): void {
  const now = Date.now();
  if (lastShare.brand === brand && now - lastShare.at < 800) return;
  lastShare = { brand, at: now };
  toast.dismiss();
  if (brand === 'whatsapp') toast.success('Opening WhatsApp');
  else if (brand === 'email') toast.success('Opening email');
  else {
    void copyText(window.location.href);
    toast.success('Link copied');
  }
}

/**
 * Figma: Share sheet body (28:37890), the content of the Share sheets (S09, S11.1). The picture that gets
 * shared sits in a muted preview tile (padding 8 16 20, tile padding 12, radius 12); under it, past a 1 px line,
 * the three share targets (padding 16 16 0). Copy link copies this page's address (nothing is sent anywhere).
 */
export function ShareSheetBody({ payment }: ShareCardProps) {
  return (
    <div data-slot="share-sheet-body" className="flex flex-col">
      <div className="px-4 pt-2 pb-5">
        <div className="rounded-xl bg-surface-muted p-3">
          <ShareCard payment={payment} />
        </div>
      </div>
      <div className="border-t border-line bg-card px-4 pt-4">
        <ShareTargetRow onShare={shareVia} />
      </div>
    </div>
  );
}
