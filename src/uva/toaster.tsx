"use client";

import { useTheme } from "next-themes";
import { type CSSProperties } from "react";
import { Toaster as Sonner, toast as sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-center"
      gap={8}
      style={
        {
          "--normal-bg": "var(--section)",
          "--normal-text": "var(--section-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-2xl)",
        } as CSSProperties
      }
      {...props}
    />
  );
};

const toast = (...args: Parameters<typeof sonner>) => sonner(...args);

export { toast, Toaster };
