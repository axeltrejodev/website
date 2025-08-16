"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type SquareProps = {
  speed: number;
};

function Square({ speed }: SquareProps) {
  const generateProps = useCallback(() => {
    return {
      rotate: Math.random() * 60 * (Math.random() < 0.5 ? -1 : 1),
      duration: Number((speed * (0.5 + Math.random())).toFixed(2)),
      delay: Number((Math.random() * speed).toFixed(2)),
      width: Number((2 + Math.random() * 3).toFixed(2)),
      blur: Number((Math.random() * 6).toFixed(2)),
    };
  }, [speed]);
  const [props, setProps] = useState<{
    width: number;
    duration: number;
    delay: number;
    blur: number;
    rotate: number;
  } | null>(null);
  useEffect(() => {
    setProps(generateProps());
  }, [generateProps]);
  if (!props) return null;
  const {
    width,
    duration,
    delay,
    blur,
    rotate, //
  } = props;
  return (
    <motion.div
      initial={{
        y: "150%",
        rotate,
        opacity: 1,
      }}
      animate={{
        y: "-100dvh",
        rotate: 0,
        opacity: 0.5,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
      style={{
        width: `${width}rem`,
        filter: `blur(${blur}px)`,
      }}
      className={cn(
        "bg-primary/10",
        "dark:bg-section",
        "aspect-square",
        "rounded-xl",
        "shrink-0", //
      )}
    />
  );
}

type Props = {
  amount?: number;
  speed?: number;
};

export function Background({
  amount = 24,
  speed = 12, //
}: Props) {
  return (
    <div
      className={cn(
        "fixed",
        "inset-0",
        "-z-50",
        "overflow-hidden", //
      )}
    >
      <div
        className={cn(
          "flex",
          "relative",
          "size-full",
          "items-end",
          "justify-around",
        )}
      >
        {Array.from({ length: amount }) //
          .map((_, i) => (
            <Square key={i} speed={speed} />
          ))}
      </div>
    </div>
  );
}
