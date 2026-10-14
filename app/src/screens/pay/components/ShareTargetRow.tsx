import { ShareTarget, type ShareBrand } from './ShareTarget';

export interface ShareTargetRowProps {
  onShare: (brand: ShareBrand) => void;
}

const BRANDS: readonly ShareBrand[] = ['whatsapp', 'email', 'copy-link'];

/** Figma: Share target row (28:37874). Three targets sharing the width equally, 84 tall. */
export function ShareTargetRow({ onShare }: ShareTargetRowProps) {
  return (
    <div data-slot="share-target-row" className="flex items-start">
      {BRANDS.map((brand) => (
        <div key={brand} className="flex min-w-0 flex-1 justify-center">
          <ShareTarget brand={brand} onClick={() => onShare(brand)} />
        </div>
      ))}
    </div>
  );
}
