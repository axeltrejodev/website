"use client";

import confetti, { type Shape } from "canvas-confetti";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { toast } from "@/uva/toaster";

import { PROJECT_EMOJIS } from "@/lib/setup";

const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "B",
  "A",
];

const flatKonami = konamiCode.join("").toLowerCase();

export function Konami() {
  const t = useTranslations("utils");
  const [, setInput] = useState<string[]>([]);
  const [emojis, setEmojis] = useState<Shape[]>([]);
  useEffect(
    () =>
      setEmojis(
        [
          "👽", //
          "🤍",
          "💙",
          "🦀",
          ...PROJECT_EMOJIS,
        ].map((emoji) =>
          confetti //
            .shapeFromText({
              text: emoji,
              scalar: 2.5,
            }),
        ),
      ),
    [],
  );
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInput((prev) => {
        const newInput = [...prev, e.key].slice(-konamiCode.length);
        if (newInput.join("").toLowerCase() === flatKonami) {
          toast(t("easterEgg"));
          confetti({
            shapes: emojis,
            angle: 90,
            ticks: 720,
            scalar: 2.5,
            spread: 180,
            decay: 0.933,
            gravity: 0.5,
            origin: { y: 1 },
            particleCount: 60,
            startVelocity: 60,
          });
          return [];
        }
        return newInput;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [t, emojis]);
  return null;
}
