import { cn } from "@/lib/utils";

/**
 * figma: DropdownMenu/MenuItem, Contex Menu/Menuitem, MenubarItem and
 * CommandItem are the same 28px row — px 6, py 4, gap 6, radius-sm/md,
 * `accent` on hover, `destructive-subtle` + `text-destructive` when destructive.
 * One recipe, reused by every menu surface, so they can never drift apart.
 */
export const menuContent = cn(
  "z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-xl border",
  "bg-popover p-1 text-popover-foreground shadow-md",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
);

export const menuItem = cn(
  "relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1",
  "text-sm outline-none select-none",
  "focus:bg-accent focus:text-accent-foreground",
  "data-[variant=destructive]:text-text-destructive",
  "data-[variant=destructive]:focus:bg-destructive-subtle data-[variant=destructive]:focus:text-text-destructive",
  "data-[variant=destructive]:*:[svg]:!text-text-destructive",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  "[&_svg:not([class*='text-'])]:text-muted-foreground"
);

export const menuLabel = "px-1.5 py-1 text-xs font-medium text-muted-foreground";
export const menuSeparator = "-mx-1 my-1 h-px bg-border";
export const menuShortcut = "ms-auto text-xs tracking-widest text-muted-foreground";
export const menuCheckboxItem = cn(menuItem, "ps-6 pe-1.5");
