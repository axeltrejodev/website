"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { type ComponentProps } from "react";

import { Button } from "@/uva/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/uva/tooltip";

import { cn } from "@/lib/utils";

export function ThemeToggle({
  onClick: userOnClick,
  ...props
}: ComponentProps<typeof Button>) {
  const t = useTranslations("theme");
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            userOnClick?.(e);
            toggleTheme();
          }}
          {...props}
        >
          <SunIcon
            className={cn(
              "rotate-0",
              "scale-100",
              "transition-all!",
              "dark:-rotate-90",
              "dark:scale-0",
            )}
          />
          <MoonIcon
            className={cn(
              "absolute",
              "rotate-90",
              "scale-0",
              "transition-all!",
              "dark:rotate-0",
              "dark:scale-100",
            )}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {t("title")}
        {/**/}
      </TooltipContent>
    </Tooltip>
  );
}
