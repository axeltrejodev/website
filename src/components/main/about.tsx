import {
  Code2Icon,
  Globe2Icon,
  PaletteIcon,
  SplinePointerIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { BrandLogo } from "@/components/globals/brand";
import { BlurredDiv, BlurredText } from "@/components/globals/motion";

import { Badge } from "@/uva/badge";

import dusk from "@/components/main/assets/dusk.png";

import { cn } from "@/lib/utils";

export async function About() {
  const t = await getTranslations("about");
  const tB = await getTranslations("about.badges");
  return (
    <section
      id="about"
      className={cn(
        "scroll-mt-24",
        "md:scroll-mt-32", //
      )}
    >
      <div
        className={cn(
          "max-w-[1400px]",
          "w-full",
          "mx-auto",
          "flex",
          "max-sm:flex-col",
          "items-stretch",
          "gap-6",
          "md:gap-12",
        )}
      >
        <BlurredDiv
          className={cn(
            "w-1/2",
            "max-sm:w-full",
            "flex",
            "flex-col",
            "ml-auto",
            "relative",
            "max-sm:aspect-square",
            "sm:max-w-sm",
            "md:max-w-md",
            "rounded-3xl",
            "overflow-hidden",
            "bg-section",
          )}
        >
          <Image
            fill
            alt=""
            src={dusk}
            aria-hidden
            role="presentation"
            className="object-cover"
          />
          <BrandLogo
            className={cn(
              "w-3/5",
              "max-h-3/5",
              "absolute",
              "left-1/2",
              "top-1/2",
              "-translate-1/2",
              "fill-white",
            )}
          />
        </BlurredDiv>
        <div
          className={cn(
            "w-1/2",
            "max-sm:w-full",
            "flex",
            "flex-col",
            "mr-auto",
            "relative",
            "sm:max-w-sm",
            "md:max-w-md",
          )}
        >
          <BlurredText
            as="h1"
            text={t("title")}
            className={cn(
              "text-2xl",
              "sm:text-3xl",
              "md:text-4xl",
              "font-bold",
              "text-balance",
              "tracking-tight",
              "mb-3",
            )}
          />
          <div
            className={cn(
              "flex",
              "flex-wrap",
              "max-w-96",
              "gap-3",
              "mb-3", //
            )}
          >
            <BlurredDiv delay={0.45} className="inline">
              <Badge
                className={cn(
                  "bg-blue-500/20",
                  "text-blue-700",
                  "dark:text-blue-300",
                  "text-base",
                  "flex",
                  "items-center",
                  "gap-1",
                )}
              >
                <Globe2Icon strokeWidth={3} className="size-4" />
                <span>{tB("webDevelopment")}</span>
              </Badge>
            </BlurredDiv>
            <BlurredDiv delay={0.6} className="inline">
              <Badge
                className={cn(
                  "bg-purple-500/20",
                  "text-purple-700",
                  "dark:text-purple-300",
                  "text-base",
                  "flex",
                  "items-center",
                  "gap-1",
                )}
              >
                <SplinePointerIcon strokeWidth={3} className="size-4" />
                <span>{tB("graphicDesign")}</span>
              </Badge>
            </BlurredDiv>
            <BlurredDiv delay={0.75} className="inline">
              <Badge
                className={cn(
                  "bg-amber-500/20",
                  "text-amber-700",
                  "dark:text-amber-300",
                  "text-base",
                  "flex",
                  "items-center",
                  "gap-1",
                )}
              >
                <Code2Icon strokeWidth={3} className="size-4" />
                <span>{tB("programming")}</span>
              </Badge>
            </BlurredDiv>
            <BlurredDiv delay={0.9} className="inline">
              <Badge
                className={cn(
                  "bg-rose-500/20",
                  "text-rose-700",
                  "dark:text-rose-300",
                  "text-base",
                  "flex",
                  "items-center",
                  "gap-1",
                )}
              >
                <PaletteIcon strokeWidth={3} className="size-4" />
                <span>{tB("branding")}</span>
              </Badge>
            </BlurredDiv>
          </div>
          <BlurredText
            as="p"
            delay={0.75}
            stagger={0.025}
            text={t("description")}
            className={cn(
              "text-sm",
              "sm:text-sm",
              "md:text-base",
              "lg:text-lg",
              "text-muted-foreground",
              "font-medium",
              "text-pretty",
              "mb-4",
            )}
          />
          <BlurredText
            as="p"
            delay={1.5}
            stagger={0.025}
            text={t("addition")}
            className={cn(
              "text-sm",
              "sm:text-sm",
              "md:text-base",
              "lg:text-lg",
              "text-muted-foreground",
              "font-medium",
              "text-pretty",
            )}
          />
        </div>
      </div>
    </section>
  );
}
