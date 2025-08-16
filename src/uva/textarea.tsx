import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

const TextArea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "border",
          "flex",
          "w-full",
          "min-h-[4lh]",
          "min-w-[24ch]",
          "px-3 py-2",
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
          "field-sizing-content",
          "resize-none",
          "shadow-xs",
          className,
        )}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";

export { TextArea };
