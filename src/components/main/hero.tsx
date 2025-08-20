import { ChevronDownIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { BlurredDiv, BlurredText } from "@/components/globals/motion";

import { button } from "@/uva/button";

import { Link } from "@/i18n/navigation";

import { cn } from "@/lib/utils";

export async function Hero() {
  const t = await getTranslations("hero");
  return (
    <section
      id="home"
      className={cn(
        "min-h-svh",
        "flex",
        "items-center",
        "justify-center",
        "relative",
      )}
    >
      <div
        className={cn(
          "max-w-[1400px]",
          "w-full",
          "mx-auto", //
        )}
      >
        <div
          className={cn(
            "text-center",
            "max-w-3xl",
            "w-full",
            "mx-auto", //
          )}
        >
          <BlurredDiv>
            <video
              loop
              muted
              autoPlay
              role="presentation"
              className={cn(
                "invert-100",
                "dark:invert-0",
                "scale-150",
                "sm:scale-125",
                "md:scale-100",
                "sm:-my-12",
                "md:-my-16",
                "lg:-my-24",
              )}
            >
              <source
                src="/hero.webm"
                type="video/webm" //
              />
            </video>
          </BlurredDiv>
          <BlurredText
            as="h1"
            text={t("title")}
            className={cn(
              "text-3xl",
              "sm:text-4xl",
              "md:text-5xl",
              "lg:text-6xl",
              "font-bold",
              "text-balance",
              "tracking-tight",
              "mb-6",
            )}
          />
          <BlurredText
            as="p"
            delay={0.5}
            stagger={0.05}
            text={t("description")}
            className={cn(
              "text-base",
              "sm:text-lg",
              "md:text-xl",
              "lg:text-2xl",
              "text-muted-foreground",
              "text-balance",
              "font-medium",
            )}
          />
          <BlurredDiv delay={1.75}>
            <Link
              href="#contact"
              className={cn(
                button({ size: "large" }),
                "mt-6 px-8 py-6",
                "rounded-full",
                "font-bold",
                "text-base",
              )}
            >
              {t("contactMe")}
            </Link>
          </BlurredDiv>
        </div>
      </div>
      <BlurredDiv
        delay={2}
        className={cn(
          "absolute", //
          "bottom-12",
          "not-tall:hidden",
        )}
      >
        <Link
          href="#about"
          className={cn(
            button({
              variant: "link",
            }),
            "animate-bounce",
            "size-12",
          )}
        >
          <ChevronDownIcon
            className="size-12" //
          />
        </Link>
      </BlurredDiv>
    </section>
  );
}
