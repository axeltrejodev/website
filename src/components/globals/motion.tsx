"use client";

import { motion, stagger } from "framer-motion";
import {
  Fragment,
  useMemo,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export function BlurredStagger({
  delay: startDelay = 0,
  stagger: st = 0.1,
  ...props
}: {
  delay?: number;
  stagger?: number;
  children: ReactNode;
} & ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delayChildren: stagger(st, { startDelay }) }}
      {...props}
    />
  );
}

export function BlurredDivItem({
  ...props
}: ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      transition={{
        duration: 1,
        ease: [0.25, 1, 0.25, 1],
      }}
      variants={{
        hidden: {
          filter: "blur(8px)",
          transform: "translateY(20%)",
          opacity: 0,
        },
        visible: {
          filter: "blur(0)",
          transform: "translateY(0)",
          opacity: 1,
        },
      }}
      {...props}
    />
  );
}

export function BlurredSpanItem({
  className,
  ...props
}: ComponentProps<typeof motion.span>) {
  return (
    <motion.span
      className={cn(
        "inline-block",
        className, //
      )}
      transition={{
        duration: 1,
        ease: [0.25, 1, 0.25, 1],
      }}
      variants={{
        hidden: {
          filter: "blur(8px)",
          transform: "translateY(20%)",
          opacity: 0,
        },
        visible: {
          filter: "blur(0)",
          transform: "translateY(0)",
          opacity: 1,
        },
      }}
      {...props}
    />
  );
}

export function BlurredDiv({
  delay = 0,
  amount = 0.1,
  ...props
}: { delay?: number; amount?: number } & ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{
        duration: 1,
        ease: [0.25, 1, 0.25, 1],
        delay,
      }}
      variants={{
        hidden: {
          filter: "blur(8px)",
          transform: "translateY(10%)",
          opacity: 0,
        },
        visible: {
          filter: "blur(0)",
          transform: "translateY(0)",
          opacity: 1,
        },
      }}
      {...props}
    />
  );
}

export function BlurredSpan({
  className,
  delay = 0,
  amount = 0.1,
  ...props
}: { delay?: number; amount?: number } & ComponentProps<typeof motion.span>) {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={cn("inline-block", className)}
      transition={{
        duration: 1,
        ease: [0.25, 1, 0.25, 1],
        delay,
      }}
      variants={{
        hidden: {
          filter: "blur(8px)",
          transform: "translateY(10%)",
          opacity: 0,
        },
        visible: {
          filter: "blur(0)",
          transform: "translateY(0)",
          opacity: 1,
        },
      }}
      {...props}
    />
  );
}

export function BlurredText<T extends ElementType>({
  text,
  delay = 0,
  stagger = 0.1,
  as: Component,
  ...props
}: {
  text: string;
  delay?: number;
  stagger?: number;
  as: T;
} & ComponentProps<T>) {
  const words = useMemo(() => (text as string).split(" "), [text]);
  return (
    <BlurredStagger delay={delay} stagger={stagger}>
      <Component {...props}>
        {words.map((word, index) => (
          <Fragment key={index}>
            <BlurredSpanItem>{word}</BlurredSpanItem>
            {index < words.length - 1 && " "}
          </Fragment>
        ))}
      </Component>
    </BlurredStagger>
  );
}
