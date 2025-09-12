"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [isPointer, setIsPointer] = useState(false);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const checkPointer = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el && getComputedStyle(el).cursor === "pointer") {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      moveCursor(e);
      checkPointer(e);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const size = isPointer ? 40 : 20;
  const style = {
    position: "fixed",
    top: position.y - size / 2,
    left: position.x - size / 2,
    width: size,
    height: size,
    pointerEvents: "none",
    transition: "width 0.2s ease, height 0.2s ease, transform 0.1s ease",
    transform: "translate3d(0,0,0)",
    zIndex: 9999,
  } as const;

  return (
    <svg style={style} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="var(--trail)" />
    </svg>
  );
};

export { CustomCursor };

export function DotCursor() {
  const namespace = "http://www.w3.org/2000/svg";
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const checkPointer = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) setIsPointer(getComputedStyle(el).cursor === "pointer");
    };
    const handleMouseMove = (e: MouseEvent) => {
      moveCursor(e);
      checkPointer(e);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const size = isPointer ? 20 : 10;
  const style = {
    position: "fixed",
    top: position.y - size / 2,
    left: position.x - size / 2,
    width: size,
    height: size,
    pointerEvents: "none",
    transition: ["width 0.2s ease,", "height 0.2s ease"].join(" "),
    zIndex: 9999,
  } as const;
  return (
    <svg
      xmlns={namespace}
      className="pointer-coarse:hidden"
      viewBox="0 0 100 100"
      style={style}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="var(--primary)"
        stroke="gray"
        strokeWidth={20}
      />
    </svg>
  );
}
