import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      data-slot="card"
      className={cn(
        "bg-section",
        "text-section-foreground",
        "flex",
        "flex-col",
        "py-4",
        "gap-4",
        "rounded-2xl",
        "border",
        "shadow-sm",
        "overflow-hidden",
        "@container/card",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      data-slot="card-header"
      className={cn(
        "flex",
        "flex-col",
        "items-start",
        "px-4",
        "[.border-b]:pb-4",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      data-slot="card-title"
      className={cn(
        "text-lg",
        "leading-none",
        "font-bold",
        className, //
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-muted-foreground",
        "text-sm",
        className, //
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <main
      data-slot="card-content"
      className={cn(
        "flex",
        "flex-col",
        "items-start",
        "gap-1",
        "px-4",
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer
      data-slot="card-footer"
      className={cn(
        "flex",
        "flex-col",
        "items-start",
        "gap-1",
        "px-4",
        "[.border-t]:pt-4",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
