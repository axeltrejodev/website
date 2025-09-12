"use client";

import {
  Children,
  type ComponentProps,
  createRef,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function breakOpportunities(
  widths: number[],
  containerWidth: number,
  gapX: number,
  extraLines = 0,
): boolean[] {
  const n = widths.length;
  const breakBefore: boolean[] = new Array(n).fill(false);
  if (n === 0 || containerWidth <= 0) return breakBefore;
  const prefix: number[] = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + widths[i];
  const rangeWidth = (i: number, j: number) => prefix[j + 1] - prefix[i];
  const segWidth = (i: number, j: number) => {
    const count = j - i + 1;
    const gaps = Math.max(0, count - 1);
    return rangeWidth(i, j) + gaps * gapX;
  };
  const totalWidthAll = segWidth(0, n - 1);
  const minLines =
    Math.max(1, Math.ceil(totalWidthAll / containerWidth)) + extraLines;
  let remLines = minLines;
  let start = 0;
  while (start < n && remLines > 1) {
    const remainingCount = n - start;
    const nowrapRemaining = segWidth(start, n - 1);
    const spaceWidth = gapX;
    const desiredWidth = Math.round(
      (nowrapRemaining + spaceWidth) / remLines - spaceWidth,
    );
    const partials: { count: number; w: number }[] = [];
    for (let count = 1; count <= remainingCount; count++) {
      const w = segWidth(start, start + count - 1);
      partials.push({ count, w });
    }
    let leIndex = 0;
    let leWidth = 0;
    let geIndex = remainingCount;
    let geWidth = segWidth(start, n - 1);
    for (let k = 0; k < partials.length; k++) {
      const p = partials[k];
      if (p.w <= desiredWidth) {
        leIndex = p.count;
        leWidth = p.w;
      }
      if (p.w >= desiredWidth) {
        geIndex = p.count;
        geWidth = p.w;
        break;
      }
    }
    let chosenCount: number;
    if (leIndex === 0) {
      chosenCount = geIndex;
    } else if (
      geIndex > remainingCount ||
      geWidth > containerWidth ||
      leIndex === geIndex
    ) {
      chosenCount = leIndex;
    } else {
      const diffLe = Math.abs(desiredWidth - leWidth);
      const diffGe = Math.abs(geWidth - desiredWidth);
      chosenCount = diffLe <= diffGe ? leIndex : geIndex;
    }
    while (
      chosenCount > 1 &&
      segWidth(start, start + chosenCount - 1) > containerWidth
    ) {
      chosenCount--;
    }
    const breakPos = start + chosenCount;
    if (breakPos < n) {
      breakBefore[breakPos] = true;
    }
    start = breakPos;
    remLines--;
  }
  let lineStart = 0;
  for (let i = 0; i <= n; i++) {
    if (i === n || breakBefore[i]) {
      const w = segWidth(lineStart, i - 1);
      if (w > containerWidth) {
        return breakOpportunities(
          widths, //
          containerWidth,
          gapX,
          extraLines + 1,
        );
      }
      lineStart = i;
    }
  }
  return breakBefore;
}

export function WrapBalancer({
  children,
  gap,
  rowGap = 0,
  columnGap = 0,
  style,
  ...props
}: {
  children: ReactNode;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
} & ComponentProps<"div">) {
  const gapX = gap ?? columnGap;
  const gapY = gap ?? rowGap;
  const elements: ReactNode[] = useMemo(
    () => Children.toArray(children),
    [children],
  );
  const [rows, setRows] = useState<ReactNode[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<RefObject<HTMLDivElement>[]>([]);
  itemRefs.current = elements.map((_, i) => itemRefs.current[i] ?? createRef());

  const measureAndCompute = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth || 0;
    if (containerWidth === 0) {
      setRows([elements]);
      return;
    }
    const widths = itemRefs.current.map((r) => r.current?.offsetWidth ?? 0);
    const breakBefore = breakOpportunities(widths, containerWidth, gapX);
    const newRows: ReactNode[][] = [];
    let currentRow: ReactNode[] = [];
    elements.forEach((e, i) => {
      if (breakBefore[i]) {
        newRows.push(currentRow);
        currentRow = [];
      }
      currentRow.push(e);
    });
    if (currentRow.length > 0) {
      newRows.push(currentRow);
    }
    setRows(newRows);
  }, [elements, gapX]);
  useLayoutEffect(() => measureAndCompute(), [measureAndCompute]);
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => measureAndCompute());
    ro.observe(containerRef.current);
    window.addEventListener("load", measureAndCompute);
    window.addEventListener("fontload", measureAndCompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measureAndCompute);
      window.removeEventListener("fontload", measureAndCompute);
    };
  }, [children, measureAndCompute]);
  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: gapX,
          rowGap: gapY,
          ...style,
        }}
        {...props}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: gapX,
            }}
          >
            {row.map((child) => (
              <span key={(child as ReactElement)?.key ?? undefined}>
                {child}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div
        ref={measureRef}
        aria-hidden="true"
        style={{
          height: 0,
          visibility: "hidden",
          whiteSpace: "nowrap",
          position: "absolute",
          overflow: "visible",
        }}
      >
        {elements.map((child, i) => (
          <span
            key={i}
            ref={itemRefs.current[i]}
            style={{ display: "inline-block" }}
          >
            {child}
          </span>
        ))}
      </div>
    </>
  );
}
