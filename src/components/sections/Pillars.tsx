import type { CSSProperties } from "react";
import { pillars } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealGroup } from "@/components/RevealGroup";

/** Per-element reveal delay (DEC-017). */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Pillars() {
  return (
    <Section id="diferenciais" space="normal">
      <SectionHeader
        title="Por que a Valdete"
        lead="O que você pode esperar ao deixar sua peça no ateliê."
      />
      {/* Grade 2x2 — formato próprio, distinto do seam de "Como funciona" */}
      <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-2">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.title}
            className="rg-rise flex flex-col gap-2 bg-bg p-7 md:p-8"
            style={d(i * 90)}
          >
            <span className="font-display text-sm tabular-nums text-accent-strong">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-medium tracking-tight">{pillar.title}</h3>
            <p className="text-sm leading-relaxed text-text-muted">{pillar.short}</p>
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}
