import { getTranslations } from "next-intl/server";

import {
  BlurredDivItem,
  BlurredStagger,
  BlurredText,
} from "@/components/globals/motion";

import { Card } from "@/uva/card";

import { cn } from "@/lib/utils";

import { skills } from "./common";

export async function Skills() {
  const t = await getTranslations("skills");
  return (
    <section
      id="skills"
      className={cn(
        "scroll-mt-16",
        "md:scroll-mt-24", //
      )}
    >
      <div
        className={cn(
          "max-w-[1400px]",
          "w-full",
          "mt-8",
          "mx-auto",
          "flex",
          "flex-col",
          "gap-6",
          "md:gap-8",
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
          <BlurredText
            as="h1"
            text={t("title")}
            className={cn(
              "text-2xl",
              "sm:text-3xl",
              "md:text-4xl",
              "lg:text-5xl",
              "font-bold",
              "text-balance",
              "tracking-tight",
              "mb-3",
            )}
          />
          <BlurredText
            as="p"
            delay={0.5}
            stagger={0.05}
            text={t("description")}
            className={cn(
              "text-sm",
              "sm:text-base",
              "md:text-lg",
              "text-muted-foreground",
              "text-balance",
              "font-medium",
            )}
          />
        </div>
        <BlurredStagger
          delay={0.5}
          className={cn(
            "flex", //
            "flex-wrap",
            "gap-6 md:gap-8",
          )}
        >
          {skills.map((skill, index) => (
            <BlurredDivItem
              key={index}
              className={cn(
                "grow-1",
                "basis-[7rem]", //
              )}
            >
              <Card
                className={cn(
                  "items-center",
                  "justify-center",
                  "border-0",
                  "p-4", //
                )}
              >
                <div
                  className={cn(
                    "size-12",
                    "md:size-16",
                    "rounded-full",
                    "flex",
                    "items-center",
                    "justify-center",
                    skill.background,
                  )}
                >
                  <skill.icon
                    className={cn(
                      "size-6", //
                      "md:size-10",
                      skill.foreground,
                    )}
                  />
                </div>
                <h3
                  className="font-bold"
                  translate="no" //
                >
                  {skill.name}
                </h3>
              </Card>
            </BlurredDivItem>
          ))}
        </BlurredStagger>
      </div>
    </section>
  );
}
