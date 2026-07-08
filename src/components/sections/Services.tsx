import { services } from "@/lib/content";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ServicesShowcase } from "@/components/ServicesShowcase";

export function Services() {
  return (
    <Section id="servicos" space="loose">
      {/* Header — heading + lead on the left, CTA anchored right on desktop */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-xl">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
            O que a Valdete resolve
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            Do reparo simples ao ajuste sob medida. Sua peça bem cuidada,
            devolvida no prazo combinado.
          </p>
        </Reveal>
        <Reveal delay={80} className="shrink-0">
          <WhatsAppButton label="Pedir orçamento" />
        </Reveal>
      </div>

      {/* Synced list + image gallery */}
      <Reveal delay={120} className="mt-14">
        <ServicesShowcase services={services} />
      </Reveal>
    </Section>
  );
}
