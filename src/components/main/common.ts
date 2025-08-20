import { type ComponentType } from "react";

import {
  LogoGitHub,
  LogoLinkedIn,
  LogoWhatsApp,
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
