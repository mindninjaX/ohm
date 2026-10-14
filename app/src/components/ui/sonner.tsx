import * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * figma: Toast page. shadcn ships Sonner for toasts; the tokens are wired
 * through CSS variables so the toast follows the same popover surface.
 */
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-xl)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };
