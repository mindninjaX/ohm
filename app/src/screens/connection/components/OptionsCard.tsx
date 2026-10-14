import type { ReactNode } from 'react';
import { Card, IconTile, ListRow, Separator, type IconComponent } from '@/components/ohm';

export interface OptionRow {
  key: string;
  title: string;
  /** A line under the title (the "Something else" rows). */
  subtitle?: string;
  /** Right aligned, Semi Bold (the detail rows: "700 kVA"). */
  value?: string;
  /** A Muted icon tile before the text. */
  icon?: IconComponent;
  onClick: () => void;
}

/**
 * Figma: Options card (28:39376, Rows 2, 3 or 5). A white card with no padding and List rows (Plain) in it, a Separator
 * between them: inset 16 for rows that are just a title and a value, from the text (68) for rows with an icon.
 */
export function OptionsCard({ rows, children }: { rows: readonly OptionRow[]; children?: ReactNode }) {
  return (
    <Card padding={0} data-slot="options-card">
      {rows.map((row, i) => (
        <div key={row.key}>
          {i > 0 && <Separator inset={row.icon ? 'left-68' : '16'} />}
          <ListRow
            surface="plain"
            leading={row.icon ? <IconTile icon={row.icon} tone="muted" size={36} /> : undefined}
            title={row.title}
            subtitle={row.subtitle}
            value={row.value}
            onClick={row.onClick}
          />
        </div>
      ))}
      {children}
    </Card>
  );
}
