import { Globe2Icon, ShieldUserIcon } from "lucide-react";
import { type ComponentType } from "react";

import {
  LogoBash,
  LogoCSS3,
  LogoExpress,
  LogoFlask,
  LogoGit,
  LogoGitHub,
  LogoHTML5,
  LogoIllustrator,
  LogoJavaScript,
  LogoLinkedIn,
  LogoLucide,
  LogoMotion,
  LogoNext,
  LogoNode,
  LogoPostgreSQL,
  LogoPrisma,
  LogoPython,
  LogoRadix,
  LogoReact,
  LogoResend,
  LogoSanity,
  LogoSQLAlchemy,
  LogoSQLite,
  LogoTailwind,
  LogoTypeScript,
  LogoWhatsApp,
  LogoZod,
} from "@/components/globals/icons";

export const socialItems: {
  name: string;
  href: string;
  icon: ComponentType;
}[] = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/axeltrejodev",
    icon: LogoLinkedIn,
  },
  {
    name: "GitHub",
    href: "https://github.com/axeltrejodev",
    icon: LogoGitHub,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/+525656703150",
    icon: LogoWhatsApp,
  },
];

export const skills: {
  name: string;
  icon: ComponentType<{ className: string }>;
  foreground: string | string[];
  background: string | string[];
}[] = [
  {
    name: "HTML",
    icon: LogoHTML5,
    foreground: [
      "text-orange-700",
      "dark:text-orange-300", //
    ],
    background: "bg-orange-500/20",
  },
  {
    name: "CSS",
    icon: LogoCSS3,
    foreground: [
      "text-sky-700",
      "dark:text-sky-300", //
    ],
    background: "bg-sky-500/20",
  },
  {
    name: "JavaScript",
    icon: LogoJavaScript,
    foreground: [
      "text-yellow-700",
      "dark:text-yellow-300", //
    ],
    background: "bg-yellow-500/20",
  },
  {
    name: "TypeScript",
    icon: LogoTypeScript,
    foreground: [
      "text-blue-700",
      "dark:text-blue-300", //
    ],
    background: "bg-blue-500/20",
  },
  {
    name: "Tailwind",
    icon: LogoTailwind,
    foreground: [
      "text-cyan-700",
      "dark:text-cyan-300", //
    ],
    background: "bg-cyan-500/20",
  },
  {
    name: "React",
    icon: LogoReact,
    foreground: [
      "text-teal-700",
      "dark:text-teal-300", //
    ],
    background: "bg-teal-500/20",
  },
  {
    name: "Next.js",
    icon: LogoNext,
    foreground: [
      "text-black",
      "dark:text-white", //
    ],
    background: "bg-neutral-500/20",
  },
  {
    name: "Node.js",
    icon: LogoNode,
    foreground: [
      "text-lime-700",
      "dark:text-lime-300", //
    ],
    background: "bg-lime-500/20",
  },
  {
    name: "Express.js",
    icon: LogoExpress,
    foreground: [
      "text-black",
      "dark:text-white", //
    ],
    background: "bg-neutral-500/20",
  },
  {
    name: "Prisma",
    icon: LogoPrisma,
    foreground: [
      "text-emerald-700",
      "dark:text-emerald-300", //
    ],
    background: "bg-emerald-500/20",
  },
  {
    name: "Python",
    icon: LogoPython,
    foreground: [
      "text-blue-700",
      "dark:text-blue-300", //
    ],
    background: "bg-blue-500/20",
  },
  {
    name: "Flask",
    icon: LogoFlask,
    foreground: [
      "text-cyan-700",
      "dark:text-cyan-300", //
    ],
    background: "bg-cyan-500/20",
  },
  {
    name: "SQLAlchemy",
    icon: LogoSQLAlchemy,
    foreground: [
      "text-rose-700",
      "dark:text-rose-300", //
    ],
    background: "bg-rose-500/20",
  },
  {
    name: "SQLite",
    icon: LogoSQLite,
    foreground: [
      "text-indigo-700",
      "dark:text-indigo-300", //
    ],
    background: "bg-indigo-500/20",
  },
  {
    name: "PostgreSQL",
    icon: LogoPostgreSQL,
    foreground: [
      "text-blue-700",
      "dark:text-blue-300", //
    ],
    background: "bg-blue-500/20",
  },
  {
    name: "Sanity",
    icon: LogoSanity,
    foreground: [
      "text-orange-700",
      "dark:text-orange-300", //
    ],
    background: "bg-orange-500/20",
  },
  {
    name: "Radix UI",
    icon: LogoRadix,
    foreground: [
      "text-black",
      "dark:text-white", //
    ],
    background: "bg-neutral-500/20",
  },
  {
    name: "Motion",
    icon: LogoMotion,
    foreground: [
      "text-yellow-700",
      "dark:text-yellow-300", //
    ],
    background: "bg-yellow-500/20",
  },
  {
    name: "Lucide",
    icon: LogoLucide,
    foreground: [
      "text-rose-700",
      "dark:text-rose-300", //
    ],
    background: "bg-rose-500/20",
  },
  {
    name: "Resend",
    icon: LogoResend,
    foreground: [
      "text-black",
      "dark:text-white", //
    ],
    background: "bg-neutral-500/20",
  },
  {
    name: "Zod",
    icon: LogoZod,
    foreground: [
      "text-blue-700",
      "dark:text-blue-300", //
    ],
    background: "bg-blue-500/20",
  },
  {
    name: "Bash",
    icon: LogoBash,
    foreground: [
      "text-emerald-700",
      "dark:text-emerald-300", //
    ],
    background: "bg-emerald-500/20",
  },
  {
    name: "Git",
    icon: LogoGit,
    foreground: [
      "text-orange-700",
      "dark:text-orange-300", //
    ],
    background: "bg-orange-500/20",
  },
  {
    name: "GitHub",
    icon: LogoGitHub,
    foreground: [
      "text-black",
      "dark:text-white", //
    ],
    background: "bg-neutral-500/20",
  },
  {
    name: "Illustrator",
    icon: LogoIllustrator,
    foreground: [
      "text-orange-700",
      "dark:text-orange-300", //
    ],
    background: "bg-orange-500/20",
  },
  {
    name: "I18N",
    icon: Globe2Icon,
    foreground: [
      "text-pink-700",
      "dark:text-pink-300", //
    ],
    background: "bg-pink-500/20",
  },
  {
    name: "A12N",
    icon: ShieldUserIcon,
    foreground: [
      "text-teal-700",
      "dark:text-teal-300", //
    ],
    background: "bg-teal-500/20",
  },
];

export const skillsMap = new Map(skills.map((s) => [s.name, s]));
