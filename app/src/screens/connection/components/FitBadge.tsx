import { TriangleAlert } from 'lucide-react';
import { Badge } from '@/components/ohm';
import { businessFit, type BusinessType } from '../data';

/** Figma: Fit badge (Fit Fits | Check). "Fits a hotel" in success, "Check with Northgrid" in warning. */
export function FitBadge({ business }: { business: BusinessType }) {
  const fit = businessFit(business);
  return fit.fits ? (
    <Badge tone="success" icon>
      {fit.label}
    </Badge>
  ) : (
    <Badge tone="warning" icon={TriangleAlert}>
      {fit.label}
    </Badge>
  );
}
