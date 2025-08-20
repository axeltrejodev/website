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
      <path d="M17.5 21c2.5-2 3-5 2-6s-9 5.5-8.5 7c.5 1 4 1 6.5-1Zm-14.427.158c.483 1.076 1.496 1.888 2.663 2.062.804.12 1.464-.12 1.764-.72.5-1-4-3.5-4.5-3-.3.3-.24.961.073 1.658ZM12 0c7 0 12 6 12 12 0 7.67-3.676 14.42-9.267 18.489-.554.403-1.153.745-1.783 1.016-.758.327-1.143.327-1.901 0-.629-.271-1.229-.613-1.783-1.016C3.676 26.42 0 19.67 0 12 0 6 5 0 12 0Z" />
    </svg>
  );
}
