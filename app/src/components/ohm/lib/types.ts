import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

/** Any lucide icon (or a custom SVG component with the same props): pass the component, not an element. */
export type IconComponent = ComponentType<LucideProps>;
