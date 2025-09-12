import { About } from "@/components/main/about";
import { Contact } from "@/components/main/contact";
import { Hero } from "@/components/main/hero";
import { KonamiCode } from "@/components/main/konami";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";

import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <KonamiCode
        className={cn(
          "h-10", //
          "max-w-full",
        )}
      />
    </>
  );
}
