import { type Easing, type Variants, type motion } from "framer-motion";
import { type ComponentProps } from "react";

import { type Side } from "@/hooks/use-side";

export type BlurredMotionProps = {
  side?: Side;
  offset?: number;
  duration?: number;
  scale?: number;
  rotation?: number;
  perspective?: number;
  blur?: number;
  ease?: Easing;
};

export function blurredMotion({
  side = "bottom",
  offset = 10,
  duration = 0.5,
  scale = 0.9,
  rotation = 45,
  perspective = 500,
  blur = 3,
  ease = "easeOut",
}: BlurredMotionProps): Pick<
  ComponentProps<typeof motion.div>,
  "variants" | "initial" | "animate" | "exit" | "custom"
> {
  const variants: Variants = {
    enter: (side: Side) => {
      let x = 0;
      let y = 0;
      let rx = 0;
      let ry = 0;
      if (side === "left") {
        x = offset;
        ry = rotation;
      }
      if (side === "right") {
        x = -offset;
        ry = -rotation;
      }
      if (side === "top") {
        y = offset;
        rx = -rotation;
      }
      if (side === "bottom") {
        y = -offset;
        rx = rotation;
      }
      return {
        x,
        y,
        opacity: 0,
        scale,
        perspective,
        perspectiveOrigin: "center",
        rotateX: rx,
        rotateY: ry,
        filter: `blur(${blur}px)`,
        transition: {
          type: "spring",
          duration,
          filter: { duration, ease },
          rotateX: { duration, ease },
          rotateY: { duration, ease },
          perspective: { duration, ease },
        },
      };
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      perspective: 0,
      perspectiveOrigin: "center",
      rotateX: 0,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        duration,
        filter: {
          duration,
          ease,
        },
        perspective: {
          duration,
          ease,
        },
        rotateX: {
          duration,
          ease,
        },
        rotateY: {
          duration,
          ease,
        },
      },
    },
    exit: (side: Side) => {
      let x = 0;
      let y = 0;
      let rx = 0;
      let ry = 0;
      if (side === "left") {
        x = offset * 1.5;
        ry = rotation * 1.5;
      }
      if (side === "right") {
        x = -offset * 1.5;
        ry = -rotation * 1.5;
      }
      if (side === "top") {
        y = offset * 1.5;
        rx = -rotation * 1.5;
      }
      if (side === "bottom") {
        y = -offset * 1.5;
        rx = rotation * 1.5;
      }
      return {
        x,
        y,
        opacity: 0,
        scale,
        perspective,
        perspectiveOrigin: "center",
        rotateX: rx,
        rotateY: ry,
        filter: `blur(${blur * 2}px)`,
        transition: {
          ease,
          duration: duration * 0.5,
          filter: { duration: duration * 0.5, ease },
          rotateX: { duration: duration * 0.5, ease },
          rotateY: { duration: duration * 0.5, ease },
          perspective: { duration: duration * 0.5, ease },
        },
      };
    },
  };
  return {
    variants,
    initial: "enter",
    animate: "center",
    exit: "exit",
    custom: side,
  };
}
