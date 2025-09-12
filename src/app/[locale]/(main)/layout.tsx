import { type ReactNode } from "react";

import { Background } from "@/components/main/background";
import { Footer } from "@/components/main/footer";
import { Header } from "@/components/main/header";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div
      className={cn(
        "min-h-svh",
        "overflow-hidden",
        "flex",
        "flex-col", //
      )}
    >
      <Background />
      <Header />
      <main
        className={cn(
          "px-6",
          "md:px-12",
          "flex",
          "flex-col",
          "gap-6",
          "md:gap-12",
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
