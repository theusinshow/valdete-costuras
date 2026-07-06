import { services } from "@/lib/content";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function Services() {
  return (
    <Section id="servicos" space="loose">
      <div className="grid gap-x-16 gap-y-10 md:grid-cols-[0.9fr_1.1fr]">
        {/* Left: anchored header (asymmetric, not a centered stack) */}
        <Reveal className="md:sticky md:top-24 md:self-start">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
            O que a Valdete resolve
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-text-muted">
            Do reparo simples ao ajuste sob medida. Sua peça bem cuidada,
            devolvida no prazo combinado.
          </p>
          <div className="mt-7">
            <WhatsAppButton label="Pedir orçamento" />
          </div>
        </Reveal>

        {/* Right: hairline list — no cards, no icon tiles */}
        <ul className="divide-y divide-border border-t border-border">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 50}>
              <div className="group flex items-baseline gap-5 py-5 transition-colors">
                <span className="font-display text-sm text-text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-text transition-colors group-hover:text-accent-strong">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">
                    {service.short}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
