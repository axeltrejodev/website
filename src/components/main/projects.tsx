import { ExternalLinkIcon, TelescopeIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image, { type StaticImageData } from "next/image";

import {
  BlurredDivItem,
  BlurredStagger,
  BlurredText,
} from "@/components/globals/motion";

import { button } from "@/uva/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/uva/card";

import eagle from "@/components/main/assets/projects/eagle.png";
import toolhand from "@/components/main/assets/projects/toolhand.png";
import tratumex from "@/components/main/assets/projects/tratumex.png";

import { PROJECT_EMOJIS } from "@/lib/setup";
import { cn } from "@/lib/utils";

export async function Projects() {
  const t = await getTranslations("projects");
  const tL = await getTranslations("projects.list");
  const projects: {
    title: string;
    description: string;
    image: StaticImageData;
    href: string;
  }[] = [
    {
      title: tL("eagle.title"),
      description: tL("eagle.description"),
      image: eagle,
      href: "#dev",
    },
    {
      title: tL("toolhand.title"),
      description: tL("toolhand.description"),
      image: toolhand,
      href: "https://toolhandmx.com",
    },
    {
      title: tL("tratumex.title"),
      description: tL("tratumex.description"),
      image: tratumex,
      href: "https://tratumex.mx",
    },
  ];
  return (
    <section
      id="projects"
      className={cn(
        "scroll-mt-8",
        "md:scroll-mt-16", //
      )}
    >
      <div
        className={cn(
          "max-w-[1400px]",
          "w-full",
          "mt-16",
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
            "grid", //
            "gap-6 md:gap-8",
            "grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]",
          )}
        >
          {projects.map((project, index) => (
            <BlurredDivItem key={index}>
              <Card
                className={cn(
                  "h-full",
                  "border-0",
                  "group",
                  "pt-0", //
                )}
              >
                <div
                  className={cn(
                    "aspect-video",
                    "overflow-hidden",
                    "relative", //
                  )}
                >
                  <Image
                    fill
                    alt={project.title}
                    src={project.image}
                    role="presentation"
                    quality={95}
                    className={cn(
                      "group-hover:scale-110",
                      "transition-[scale]",
                      "duration-500",
                    )}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="mb-2 text-balance">
                    {PROJECT_EMOJIS[index]} {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  {project.href !== "#dev" ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        button({
                          size: "medium",
                          variant: "soft",
                        }),
                        "w-full",
                        "border",
                        "dark:border-0",
                      )}
                    >
                      <span>{t("visit")}</span>
                      <ExternalLinkIcon />
                    </a>
                  ) : (
                    <div
                      className={cn(
                        button({
                          size: "medium",
                          variant: "soft",
                        }),
                        "w-full",
                        "border",
                        "dark:border-0",
                        "cursor-default",
                      )}
                    >
                      <span>{t("dev")}</span>
                      <TelescopeIcon />
                    </div>
                  )}
                </CardFooter>
              </Card>
            </BlurredDivItem>
          ))}
        </BlurredStagger>
      </div>
    </section>
  );
}
