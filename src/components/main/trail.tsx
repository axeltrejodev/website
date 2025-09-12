"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function MouseTrail() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(null);
  const timeoutRef = useRef<number>(null);
  const [hidden, setHidden] = useState(true);
  const namespace = "http://www.w3.org/2000/svg";
  useEffect(() => {
    const total = 150;
    const ease = 0.8;
    timeoutRef.current = window.setTimeout(() => setHidden(false), 2000);
    const root = svgRef.current;
    if (!root) return;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    type Segment = {
      line: SVGLineElement;
      pos: { x: number; y: number };
      leader: () => { x: number; y: number };
    };
    const segments: Segment[] = [];
    const createSegment = (
      leaderFn: () => { x: number; y: number },
    ): Segment => {
      const line = document.createElementNS(namespace, "line");
      line.setAttribute("stroke", "var(--trail)");
      line.setAttribute("stroke-width", "3");
      const initial = { x: -1500, y: -750 };
      line.setAttribute("x1", String(initial.x));
      line.setAttribute("y1", String(initial.y));
      line.setAttribute("x2", String(initial.x));
      line.setAttribute("y2", String(initial.y));
      root.appendChild(line);
      const seg: Segment = {
        line: line as SVGLineElement,
        pos: { ...initial },
        leader: leaderFn,
      };
      return seg;
    };
    let leaderFn = () => pointer;
    for (let i = 0; i < total; i++) {
      const seg = createSegment(leaderFn);
      const opacity = 1 - i / total;
      seg.line.setAttribute("stroke-opacity", String(opacity));
      segments.push(seg);
      leaderFn = () => seg.pos;
    }
    const tick = () => {
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const leader = seg.leader();
        const dx = leader.x - seg.pos.x;
        const dy = leader.y - seg.pos.y;
        seg.pos.x += dx * ease;
        seg.pos.y += dy * ease;
        seg.line.setAttribute("x1", String(seg.pos.x));
        seg.line.setAttribute("y1", String(seg.pos.y));
        seg.line.setAttribute("x2", String(leader.x));
        seg.line.setAttribute("y2", String(leader.y));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
      root.innerHTML = "";
    };
  }, []);
  return (
    <svg
      ref={svgRef}
      xmlns={namespace}
      className={cn(
        "z-50",
        "fixed",
        "inset-0",
        "size-full",
        "transition-opacity",
        "duration-1000",
        "pointer-events-none",
        "mix-blend-difference",
        "invert",
        "pointer-coarse:hidden",
        { "opacity-0": hidden },
      )}
    />
  );
}
