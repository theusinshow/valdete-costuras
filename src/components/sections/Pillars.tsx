import { pillars } from "@/lib/content";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function Pillars() {
  return (
    <Section id="diferenciais" space="normal">
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-4">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 70}>
            <div className="flex flex-col gap-3">
              <span className="h-px w-10 bg-accent" />
              <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                {pillar.short}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
