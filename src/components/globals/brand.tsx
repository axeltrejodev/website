import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function BrandLogo({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 32"
      fill="currentColor"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M17.5 21c2.5-2 3-5 2-6s-9 5.5-8.5 7c.5 1 4 1 6.5-1ZM4 22.5c1.5 1 3 1 3.5 0s-4-3.5-4.5-3 0 2 1 3ZM12 0s0 0 0 0c7 0 12 6 12 12 0 8-4 15-10 19-2 1-2 1-4 0C4 27 0 20 0 12 0 6 5 0 12 0Z" />
    </svg>
  );
}
