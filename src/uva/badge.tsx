import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

const badge = cva(
  [
    "inline-flex items-center justify-center",
    "gap-2 whitespace-nowrap rounded-xl",
    "text-xs font-medium w-fit",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "[&>svg]:pointer-events-none",
    "[&>svg:not([class*='size-'])]:size-3",
    "shrink-0 [&>svg]:shrink-0",
    "outline-none",
    "focus-visible:border-ring",
    "focus-visible:ring-ring/50",
    "focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive",
    "h-7 px-2 py-0.5 has-[>svg]:px-2.5",
    "transition-[color,box-shadow]",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        solid: [
          "bg-primary",
          "[a&]:hover:bg-primary/80",
          "text-primary-foreground",
          "shadow-xs",
        ],
        soft: [
          "bg-secondary",
          "[a&]:hover:bg-secondary/80",
          "text-secondary-foreground",
          "dark:bg-input/30",
          "dark:border-input",
          "dark:[a&]:hover:bg-input/50",
          "shadow-xs",
        ],
        surface: [
          "border",
          "bg-secondary",
          "[a&]:hover:bg-secondary/80",
          "text-secondary-foreground",
          "dark:bg-input/30",
          "dark:border-input",
          "dark:[a&]:hover:bg-input/50",
          "shadow-xs",
        ],
        outline: [
          "border",
          "bg-background",
          "[a&]:hover:bg-accent",
          "[a&]:hover:text-accent-foreground",
          "text-primary",
          "shadow-xs",
        ],
        constructive: [
          "bg-constructive",
          "[a&]:hover:bg-constructive/80",
          "focus-visible:ring-constructive/40",
          "text-white",
          "shadow-xs",
        ],
        destructive: [
          "bg-destructive",
          "[a&]:hover:bg-destructive/80",
          "focus-visible:ring-destructive/40",
          "text-white",
          "shadow-xs",
        ],
        warning: [
          "bg-warning",
          "[a&]:hover:bg-warning/80",
          "focus-visible:ring-warning/40",
          "text-white",
          "shadow-xs",
        ],
        information: [
          "bg-information",
          "[a&]:hover:bg-information/80",
          "focus-visible:ring-information/40",
          "text-white",
          "shadow-xs",
        ],
        special: [
          "bg-special",
          "[a&]:hover:bg-special/80",
          "focus-visible:ring-special/40",
          "text-white",
          "shadow-xs",
        ],
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  },
);

const Badge = forwardRef<
  HTMLSpanElement,
  ComponentProps<"span"> & VariantProps<typeof badge> & { asChild?: boolean }
>(({ className, variant = "solid", asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot : "span";
  return (
    <Component
      ref={ref}
      data-slot="badge"
      className={cn(badge({ variant, className }))}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export { Badge, badge };
