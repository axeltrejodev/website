import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-slot="input"
        className={cn(
          "border",
          "flex",
          "h-9 w-full",
          "min-w-0",
          "px-3 py-1",
          "text-base",
          "md:text-sm",
          "outline-none",
          "rounded-xl",
          "bg-transparent",
          "dark:bg-input/15",
          "dark:border-input",
          "dark:hover:bg-input/50",
          "transition-all",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          "placeholder:select-none",
          "placeholder:text-muted-foreground",
          "focus-visible:border-ring",
          "focus-visible:ring-ring/50",
          "focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20",
          "dark:aria-invalid:ring-destructive/40",
          "aria-invalid:border-destructive",
          "dark:aria-invalid:border-destructive",
          "shadow-xs",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
