import { Analytics } from "@vercel/analytics/next";
import { type Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Cascadia_Code, Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { type ReactNode } from "react";

import { routing } from "@/i18n/routing";

import { Toaster } from "@/uva/toaster";
import { TooltipProvider } from "@/uva/tooltip";

import { LOCALES } from "@/lib/setup";
import { cn } from "@/lib/utils";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-default-sans",
  subsets: ["latin"],
});

const cascadiaCode = Cascadia_Code({
  variable: "--font-default-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return {
    metadataBase: new URL("https://axeltrejo.com"),
    applicationName: `${t("name")} - ${t("title")}`,
    alternates: {
      canonical: "/",
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `/${l}`]), //
      ),
    },
    title: {
      default: `${t("name")} - ${t("title")}`,
      template: `%s - ${t("name")}`,
    },
    description: t("description"),
    icons: [
      {
        type: "image/svg+xml",
        url: "/icon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        type: "image/svg+xml",
        url: "/icon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    openGraph: {
      type: "website",
      siteName: `${t("name")} - ${t("title")}`,
      title: `${t("name")} - ${t("title")}`,
      description: t("description"),
      images: [
        {
          url: "/preview.png",
          width: 1920,
          height: 1080,
          alt: `${t("name")} - ${t("preview")}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("name")} - ${t("title")}`,
      description: t("description"),
      images: ["/preview.png"],
    },
  };
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth" //
    >
      <body
        className={cn(
          geistSans.variable,
          cascadiaCode.variable,
          "antialiased", //
        )}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            enableColorScheme
            disableTransitionOnChange
          >
            <TooltipProvider>
              {children}
              {/**/}
            </TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
