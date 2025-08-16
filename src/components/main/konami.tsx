"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { toast } from "@/uva/toaster";

const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function Konami() {
  const t = useTranslations("utils");
  const [, setInput] = useState<string[]>([]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInput((prev) => {
        const newInput = [...prev, e.key].slice(-konamiCode.length);
        if (newInput.join("") === konamiCode.join("")) {
          toast(t("easterEgg"));
          return [];
        }
        return newInput;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [t]);
  return null;
}
