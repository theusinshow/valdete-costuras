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
      {/*
        Ficha editorial (impeccable audit) — substitui a grade 2×2 de cartões
        idênticos + numeração 01–04. Cada diferencial é uma entrada da ficha,
        costurada à próxima por uma linha tracejada em vermelho: o fio que
        atravessa a marca ("the red thread is the voice"). Sem cartões e sem
        números — os pilares são atributos paralelos, não uma sequência (isso é
        papel do "Como funciona"). Título em display grande à esquerda, descrição
        à direita: contraste tipográfico forte, composição assimétrica.
      */}
      <RevealGroup className="mt-14">
        <dl className="border-t-[1.5px] border-dashed border-accent/35">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="rg-rise grid gap-x-10 gap-y-2 border-b-[1.5px] border-dashed border-accent/35 py-7 md:grid-cols-[0.8fr_1.6fr] md:items-baseline md:py-10"
              style={d(i * 90)}
            >
              <dt className="font-display text-2xl font-semibold leading-[1.1] tracking-tight text-text md:text-[1.75rem]">
                {pillar.title}
              </dt>
              <dd className="max-w-prose text-base leading-relaxed text-text-muted md:text-lg">
                {pillar.short}
              </dd>
            </div>
          ))}
        </dl>
      </RevealGroup>
    </Section>
  );
}
