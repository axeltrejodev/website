"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import {
  type ComponentProps,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useSide } from "@/hooks/use-side";

import { blurredMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

type TooltipContextType = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

const TooltipContext = createContext<TooltipContextType | null>(null);

function useTooltip() {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("useTooltip must be used within a TooltipProvider");
  return ctx;
}

function Tooltip({
  children,
  defaultOpen = false,
  onOpenChange: controlledOnOpenChange,
  open: controlledOpen,
  ...props //
}: ComponentProps<typeof TooltipPrimitive.Root>) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  function onOpenChange(v: boolean) {
    if (!isControlled) setUncontrolledOpen(v);
    controlledOnOpenChange?.(v);
  }
  return (
    <TooltipContext.Provider
      value={{
        open,
        onOpenChange,
      }}
    >
      <TooltipPrimitive.Root
        data-slot="tooltip"
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        {children}
      </TooltipPrimitive.Root>
    </TooltipContext.Provider>
  );
}

function TooltipTrigger({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      {...props} //
    />
  );
}

function TooltipContent({
  className,
  side: defaultSide,
  sideOffset = 0,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  const { open } = useTooltip();
  const { ref, side } = useSide<HTMLDivElement>(defaultSide);
  const [mountKey, setMountKey] = useState<string | undefined>(undefined);
  const hasMountedOnce = useRef(false);
  useLayoutEffect(() => {
    if (open) {
      if (!hasMountedOnce.current) {
        requestAnimationFrame(() => {
          setMountKey(side);
          hasMountedOnce.current = true;
        });
      }
    } else {
      setMountKey(undefined);
      hasMountedOnce.current = false;
    }
  }, [open, side]);
  return (
    <AnimatePresence>
      {open && (
        <TooltipPrimitive.Portal forceMount>
          <TooltipPrimitive.Content
            asChild
            forceMount
            side={defaultSide}
            sideOffset={sideOffset}
            {...props}
          >
            <motion.div
              ref={ref}
              key={mountKey}
              data-slot="tooltip-content"
              className={cn(
                "z-50",
                "bg-primary",
                "text-primary-foreground",
                "text-xs",
                "font-medium",
                "text-balance",
                "rounded-xl",
                "w-fit px-3 py-1.5",
                "origin-(--radix-tooltip-content-transform-origin)",
                { "opacity-0!": !hasMountedOnce.current },
                className,
              )}
              {...blurredMotion({
                side,
                duration: 0.333,
                scale: 0.95,
                rotation: 30,
                blur: 2, //
              })}
            >
              {children}
              <TooltipPrimitive.Arrow
                className={cn(
                  "z-50",
                  "size-2.5",
                  "rotate-45",
                  "bg-primary",
                  "fill-primary",
                  "rounded-[2px]",
                  "translate-y-[calc(-50%_-_2px)]",
                )}
              />
            </motion.div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
