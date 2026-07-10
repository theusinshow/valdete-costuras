import { pillars } from "@/lib/content";
import { Section } from "@/components/Section";
import { StitchTimeline } from "@/components/StitchTimeline";

export function Pillars() {
  return (
    <Section id="diferenciais" space="normal">
      {/* Titleless timeline by design (DEC-015); an sr-only heading keeps the
          section labelled and the h1→h2→h3 hierarchy intact. */}
      <h2 className="sr-only">Nossos diferenciais</h2>
      <StitchTimeline items={pillars} />
    </Section>
  );
}
