import { site } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MapPinIcon, ClockIcon } from "@/components/icons";

export function Location() {
  return (
    <Section id="localizacao" muted>
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeader
            title="Onde encontrar a Valdete"
            lead="Atendimento presencial. Passe aqui ou combine pelo WhatsApp."
          />
          <Reveal delay={80} className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius)] bg-surface text-text">
                <MapPinIcon width={18} height={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-text">Endereço</p>
                <p className="text-sm text-text-muted">{site.location.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius)] bg-surface text-text">
                <ClockIcon width={18} height={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-text">Horário</p>
                <p className="text-sm text-text-muted">{site.location.hours}</p>
              </div>
            </div>
            <div className="pt-2">
              <WhatsAppButton label="Falar no WhatsApp" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <figure className="overflow-hidden rounded-[var(--radius-lg)] border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fachada.webp"
              alt="Fachada da loja Valdete Costuras em Palhoça - SC"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            {site.location.mapsUrl && (
              <figcaption className="border-t border-border bg-surface/60 px-4 py-3 text-center text-sm">
                <a
                  href={site.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent-strong hover:underline"
                >
                  Ver no mapa
                </a>
              </figcaption>
            )}
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
