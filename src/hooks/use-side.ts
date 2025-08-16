import { useLayoutEffect, useRef, useState } from "react";

export type Side = "top" | "bottom" | "left" | "right";

export function useSide<T extends HTMLElement>(defaultSide: Side = "bottom") {
  const [side, setSide] = useState<Side>(defaultSide);
  const [node, setNode] = useState<T | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  useLayoutEffect(() => {
    if (!node) return;
    const attr = node.getAttribute("data-side") as Side;
    setSide(attr || defaultSide);
  }, [node, defaultSide]);
  useLayoutEffect(() => {
    if (!node) return;
    requestAnimationFrame(() => {
      const newSide = node.getAttribute("data-side") as Side;
      setSide(newSide || defaultSide);
    });
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-side"
        ) {
          const newSide = node.getAttribute("data-side") as Side;
          setSide(newSide || defaultSide);
        }
      }
    });
    observer.observe(node, { attributes: true });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [node, defaultSide]);
  const ref = (e: T | null) => setNode(e);
  return { side, ref };
}
