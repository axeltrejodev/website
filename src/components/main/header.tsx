"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { Link } from "@/i18n/navigation";

import { BrandLogo } from "@/components/globals/brand";

import { LanguageToggle } from "@/components/globals/language";
import { ThemeToggle } from "@/components/globals/theme";

import { Button, button } from "@/uva/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/uva/tooltip";

import { cn } from "@/lib/utils";

import { socialItems } from "./common";

export function Header() {
  const t = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems: {
    label: string;
    href: string;
  }[] = useMemo(
    () => [
      {
        label: t("home"),
        href: "#home",
      },
      {
        label: t("about"),
        href: "#about",
      },
      {
        label: t("projects"),
        href: "#projects",
      },
      {
        label: t("skills"),
        href: "#skills",
      },
      {
        label: t("contact"),
        href: "#contact",
      },
    ],
    [t],
  );
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header
        className={cn(
          "fixed",
          "top-0",
          "inset-x-0",
          "z-50",
          "transition-all",
          "duration-300",
          "py-6",
          isScrolled && [
            "backdrop-blur-lg",
            "bg-background/80",
            "border-primary/10",
            "border-b",
            "shadow-sm",
            "py-4",
          ],
        )}
      >
        <div
          className={cn(
            "max-w-[1400px]",
            "w-full",
            "mx-auto",
            "px-6",
            "flex",
            "items-center",
            "justify-between",
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
            <span
              className={cn(
                "md:max-[872px]:hidden",
                "whitespace-nowrap", //
              )}
            >
              Axel Trejo
            </span>
          </div>
          <nav
            className={cn(
              "hidden",
              "md:flex",
              "items-center",
              "gap-3", //
            )}
          >
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  button({
                    size: "small",
                    variant: "link",
                  }),
                  "text-primary/80",
                  "hover:text-primary",
                  "no-underline!",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div
            className={cn(
              "hidden",
              "md:flex",
              "items-center",
              "gap-3", //
            )}
          >
            {socialItems.map((item, index) => (
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
                  side="bottom"
                  translate="no" //
                >
                  {item.name}
                </TooltipContent>
              </Tooltip>
            ))}
            <LanguageToggle
              className={cn(
                "rounded-full", //
              )}
            />
            <ThemeToggle
              className={cn(
                "rounded-full", //
              )}
            />
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden z-50"
            onClick={() => setIsOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
            >
              <path
                d="M4 6h16"
                className={cn(
                  "transition-all",
                  "origin-center",
                  isOpen && [
                    "translate-y-[4.25px]",
                    "-translate-x-[4.25px]",
                    "rotate-45",
                  ],
                )}
              />
              <path
                d="M4 12h16"
                className={cn(
                  "transition-opacity",
                  isOpen && "opacity-0", //
                )}
              />
              <path
                d="M4 18h16"
                className={cn(
                  "transition-all",
                  "origin-center",
                  isOpen && [
                    "-translate-y-[4.25px]",
                    "-translate-x-[4.25px]",
                    "-rotate-45",
                  ],
                )}
              />
            </svg>
          </Button>
        </div>
      </header>
      <div
        className={cn(
          "fixed",
          "inset-0",
          "bg-background/80",
          "backdrop-blur-lg",
          "md:hidden",
          "transition-opacity",
          "duration-300",
          "z-40",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={cn(
            "flex",
            "flex-col",
            "items-center",
            "justify-center",
            "h-full",
            "gap-4",
          )}
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                button({
                  size: "large",
                  variant: "link",
                }),
                "text-2xl",
                "text-primary/80",
                "hover:text-primary",
                "no-underline!",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div
            className={cn(
              "flex",
              "items-center",
              "mt-4",
              "gap-4", //
            )}
          >
            {socialItems.map((item, index) => (
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
                  side="bottom"
                  translate="no" //
                >
                  {item.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div
            className={cn(
              "flex",
              "items-center",
              "mt-4",
              "gap-4", //
            )}
          >
            <LanguageToggle
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={cn(
                "rounded-full", //
              )}
            />
            <ThemeToggle
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={cn(
                "rounded-full", //
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
