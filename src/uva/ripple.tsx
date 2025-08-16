"use client";

import { useTheme } from "next-themes";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type PointerEvent,
} from "react";

import { cn } from "@/lib/utils";

type Rip = {
  x: number;
  y: number;
  size: number;
  key: number;
  phase: "start" | "end";
  startTime: number;
};

interface RippleProps<T extends ElementType>
  extends HTMLAttributes<HTMLElement> {
  component: T;
  invert?: boolean;
  duration?: number;
}

export const Ripple = forwardRef<HTMLElement, RippleProps<ElementType>>(
  (
    {
      component: Component,
      invert = false,
      duration = 500,
      className,
      onPointerDown: userOnPointerDown,
      children,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<Rip[]>([]);
    const ripplesRef = useRef<Rip[]>([]);
    const nextKey = useRef(0);
    const containerRef = useRef<HTMLElement>(null);
    const { resolvedTheme } = useTheme();
    const finalInvert = resolvedTheme === "dark" ? invert : !invert;

    useEffect(() => {
      ripplesRef.current = ripples;
    }, [ripples]);

    const combinedRef = useCallback(
      (e: HTMLElement | null) => {
        containerRef.current = e;
        if (typeof ref === "function") ref(e);
        else if (ref && typeof ref === "object") ref.current = e;
      },
      [ref],
    );

    useEffect(() => {
      if (ripples.length === 0) return;
      const timer = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.phase !== "end"));
      }, duration);

      return () => clearTimeout(timer);
    }, [ripples, duration]);

    const handleStart = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = clientX - rect.left - size / 2;
      const y = clientY - rect.top - size / 2;
      const startTime = Date.now();
      setRipples((prev) => [
        ...prev,
        {
          x,
          y,
          size,
          key: nextKey.current++,
          phase: "start",
          startTime,
        },
      ]);
    };

    const handleEnd = useCallback(() => {
      const now = Date.now();
      const half = duration / 2;
      ripplesRef.current.forEach((r) => {
        if (r.phase !== "start") return;
        const elapsed = now - r.startTime;
        const delay = Math.max(0, half - elapsed);
        setTimeout(() => {
          setRipples((current) =>
            current.map((inner) =>
              inner.key === r.key && inner.phase === "start"
                ? { ...inner, phase: "end" }
                : inner,
            ),
          );
        }, delay);
      });
    }, [duration]);

    useEffect(() => {
      window.addEventListener("pointerup", handleEnd);
      window.addEventListener("touchend", handleEnd);
      return () => {
        window.removeEventListener("pointerup", handleEnd);
        window.removeEventListener("touchend", handleEnd);
      };
    }, [handleEnd]);

    const onPointerDown = (e: PointerEvent<HTMLElement>) => {
      if (e.isPrimary) handleStart(e.clientX, e.clientY);
      userOnPointerDown?.(e);
    };

    return (
      <Component
        ref={combinedRef}
        onPointerDown={onPointerDown}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {ripples.map(({ x, y, size, key, phase }) => (
          <span
            key={key}
            className={cn(
              "absolute!",
              "rounded-full!",
              "pointer-events-none!", //
            )}
            style={{
              top: y,
              left: x,
              width: size,
              height: size,
              background: "#fff2",
              animation: `${
                phase === "start" ? "ripple-start" : "ripple-end"
              } ${duration / 2}ms linear forwards`,
              filter: `invert(${Number(finalInvert)}) blur(${
                invert ? "0.5rem" : "2rem"
              })`,
            }}
          />
        ))}
        {children}
      </Component>
    );
  },
);

Ripple.displayName = "Ripple";
