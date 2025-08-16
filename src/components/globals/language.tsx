"use client";

import { LanguagesIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { type ComponentProps } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";

import { Button } from "@/uva/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/uva/tooltip";

export function LanguageToggle({
  onClick: userOnClick,
  ...props
}: ComponentProps<typeof Button>) {
  const t = useTranslations("language");
  const router = useRouter();
  const locale = useLocale();
  const resolved = locale === "en" ? "es" : "en";
  const pathname = usePathname();
  const toggleLanguage = () => router.push({ pathname }, { locale: resolved });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            userOnClick?.(e);
            toggleLanguage();
          }}
          {...props}
        >
          <LanguagesIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {t("title")}
        {/**/}
      </TooltipContent>
    </Tooltip>
  );
}
