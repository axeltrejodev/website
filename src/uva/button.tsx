import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

import { Ripple } from "@/uva/ripple";

const button = cva(
  [
    "cursor-pointer duration-200",
    "inline-flex items-center justify-center",
    "gap-2 whitespace-nowrap rounded-xl",
    "text-sm font-medium transition-all",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "[&_svg]:pointer-events-none",
    "[&_svg:not([class*='size-'])]:size-4",
    "shrink-0 [&_svg]:shrink-0",
    "outline-none select-none",
    "focus-visible:border-ring",
    "focus-visible:ring-ring/50",
    "focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive",
  ],
  {
    variants: {
      variant: {
        solid: [
          "bg-primary",
          "hover:bg-primary/80",
          "text-primary-foreground",
          "shadow-xs",
        ],
        soft: [
          "bg-secondary",
          "hover:bg-secondary/80",
          "text-secondary-foreground",
          "dark:bg-input/30",
          "dark:border-input",
          "dark:hover:bg-input/50",
          "shadow-xs",
        ],
        surface: [
          "border",
          "bg-secondary",
          "hover:bg-secondary/80",
          "text-secondary-foreground",
          "dark:bg-input/30",
          "dark:border-input",
          "dark:hover:bg-input/50",
          "shadow-xs",
        ],
        outline: [
          "border",
          "bg-background",
          "hover:bg-accent",
          "hover:text-accent-foreground",
          "text-primary",
          "shadow-xs",
        ],
        ghost: [
          "bg-transparent",
          "hover:bg-accent",
          "hover:text-accent-foreground",
          "dark:hover:bg-accent/50",
          "text-primary",
        ],
        link: [
          "text-primary",
          "underline-offset-4",
          "hover:underline", //
        ],
        constructive: [
          "bg-constructive",
          "hover:bg-constructive/80",
          "focus-visible:ring-constructive/40",
          "text-white",
          "shadow-xs",
        ],
        destructive: [
          "bg-destructive",
          "hover:bg-destructive/80",
          "focus-visible:ring-destructive/40",
          "text-white",
          "shadow-xs",
        ],
        warning: [
          "bg-warning",
          "hover:bg-warning/80",
          "focus-visible:ring-warning/40",
          "text-white",
          "shadow-xs",
        ],
        information: [
          "bg-information",
          "hover:bg-information/80",
          "focus-visible:ring-information/40",
          "text-white",
          "shadow-xs",
        ],
        special: [
          "bg-special",
          "hover:bg-special/80",
          "focus-visible:ring-special/40",
          "text-white",
          "shadow-xs",
        ],
      },
      size: {
        small: "h-7 px-3 py-1 has-[>svg]:px-2.5",
        medium: "h-9 px-4 py-2 has-[>svg]:px-3",
        large: "h-11 px-6 py-3 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "medium",
    },
  },
);

const Button = forwardRef<
  HTMLButtonElement,
  ComponentProps<"button"> & VariantProps<typeof button> & { asChild?: boolean }
>(
  (
    {
      className,
      variant = "solid",
      size = "medium",
      type = "button",
      ...props
    },
    ref,
  ) => {
    const invert = [
      "solid",
      "constructive",
      "destructive",
      "warning",
      "information",
      "special",
    ].includes(variant || "solid");
    return (
      <Ripple
        ref={ref}
        data-slot="button"
        className={cn(button({ variant, size, className }))}
        invert={invert}
        component="button"
        {...{ type }}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, button };
