import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

const delays = [
  "-1000ms",
  "-875ms",
  "-750ms",
  "-625ms",
  "-500ms",
  "-375ms",
  "-250ms",
  "-125ms",
];

const rotations = [
  "0deg",
  "45deg",
  "90deg",
  "135deg",
  "180deg",
  "225deg",
  "270deg",
  "315deg",
];

const spinner = cva("relative block", {
  variants: {
    size: {
      small: "size-4",
      medium: "size-6",
      large: "size-8",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

const Spinner = forwardRef<
  HTMLSpanElement,
  ComponentProps<"span"> & VariantProps<typeof spinner>
>(({ size = "medium", className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="spinner"
      className={cn(spinner({ size, className }))}
      {...props}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "top-0",
            "h-full",
            "left-1/2",
            "w-[12.5%]",
            "absolute", //
          )}
          style={{
            transformOrigin: "center",
            rotate: rotations[i],
            animation: "spinner-fade",
            animationDuration: "1s",
            animationDelay: delays[i],
            animationTimingFunction: "ease",
            animationIterationCount: "infinite",
          }}
        >
          <span
            className={cn(
              "block",
              "w-full",
              "h-1/4",
              "bg-current",
              "rounded-full", //
            )}
          />
        </span>
      ))}
    </span>
  );
});

Spinner.displayName = "Spinner";

export { Spinner };
