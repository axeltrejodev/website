import { Code2Icon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { BrandLogo } from "@/components/globals/brand";

import { button } from "@/uva/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/uva/tooltip";

import { cn } from "@/lib/utils";

import { socialItems } from "./common";

export async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer
      className={cn(
        "backdrop-blur-lg",
        "bg-background/80",
        "border-primary/10",
        "border-t",
        "shadow-sm",
        "py-4",
        "mt-6",
        "md:mt-12",
      )}
    >
      <div
        className={cn(
          "max-w-[1400px]",
          "w-full",
          "mx-auto",
          "px-6",
          "gap-6",
          "flex",
          "max-md:flex-col",
          "items-center",
          "justify-between",
        )}
      >
        <div
          className={cn(
            "flex",
            "flex-col",
            "items-center",
            "md:items-start",
            "gap-2",
          )}
        >
          <div
            className={cn(
              "flex",
              "items-center",
              "gap-2",
              "text-xl",
              "font-bold",
              "z-50",
            )}
          >
            <BrandLogo className="h-8" />
            <span className="whitespace-nowrap">Axel Trejo</span>
          </div>
          <span
            className={cn(
              "text-muted-foreground",
              "font-semibold",
              "text-balance",
            )}
          >
            {t("copyright", { year: new Date().getFullYear() })}
          </span>
        </div>
        <div
          className={cn(
            "flex",
            "items-center",
            "gap-3", //
          )}
        >
          {[
            {
              name: t("sourceCode"),
              href: "https://github.com/axeltrejodev/website",
              icon: Code2Icon,
            },
            ...socialItems,
          ].map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    button({
                      size: "icon",
                      variant: "ghost",
                    }),
                    "rounded-full",
                    "text-primary/80",
                    "hover:text-primary",
                  )}
                >
                  <item.icon />
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                translate="no" //
              >
                {item.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </footer>
  );
}
