import { MailIcon, PhoneIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { LogoLinkedIn, LogoWhatsApp } from "@/components/globals/icons";
import {
  BlurredDivItem,
  BlurredStagger,
  BlurredText,
} from "@/components/globals/motion";

import { button } from "@/uva/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/uva/card";

import { cn } from "@/lib/utils";

import { ContactForm } from "./forms";

export async function Contact() {
  const t = await getTranslations("contact");
  const tI = await getTranslations("contact.information");
  return (
    <section
      id="contact"
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
            "max-md:flex-col",
            "gap-6 md:gap-8",
          )}
        >
          <BlurredDivItem className="grow-1">
            <Card className="border-0 h-full">
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </BlurredDivItem>
          <BlurredDivItem className="grow-1">
            <Card className="border-0 h-full">
              <CardHeader>
                <CardTitle
                  className={cn(
                    "text-xl",
                    "sm:text-2xl",
                    "md:text-3xl",
                    "font-bold",
                    "text-balance",
                    "tracking-tight",
                  )}
                >
                  {tI("title")}
                </CardTitle>
                <CardDescription>
                  {tI("description")}
                  {/**/}
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-4 grow-1">
                <a
                  href="tel:+525656703150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    button(),
                    "grow-1",
                    "w-full",
                    "bg-blue-500/20",
                    "text-blue-700",
                    "dark:text-blue-300",
                    "hover:text-primary-foreground!",
                  )}
                >
                  <PhoneIcon />
                  <span>{tI("phoneNumber")}</span>
                </a>
                <a
                  href="mailto:axeltrejo.dev@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    button(),
                    "grow-1",
                    "w-full",
                    "bg-purple-500/20",
                    "text-purple-700",
                    "dark:text-purple-300",
                    "hover:text-primary-foreground!",
                  )}
                >
                  <MailIcon />
                  <span>{tI("email")}</span>
                </a>
                <a
                  href="https://linkedin.com/in/axeltrejodev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    button(),
                    "grow-1",
                    "w-full",
                    "bg-indigo-500/20",
                    "text-indigo-700",
                    "dark:text-indigo-300",
                    "hover:text-primary-foreground!",
                  )}
                >
                  <LogoLinkedIn />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://wa.me/+525656703150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    button(),
                    "grow-1",
                    "w-full",
                    "bg-emerald-500/20",
                    "text-emerald-700",
                    "dark:text-emerald-300",
                    "hover:text-primary-foreground!",
                  )}
                >
                  <LogoWhatsApp />
                  <span>WhatsApp</span>
                </a>
              </CardContent>
            </Card>
          </BlurredDivItem>
        </BlurredStagger>
      </div>
    </section>
  );
}
