"use client";
import { useState } from "react";
import Image from "next/image";
import { site } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealGroup } from "@/components/RevealGroup";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MapPinIcon, ClockIcon } from "@/components/icons";
import { mapsEmbedUrl, mapsPlaceUrl } from "@/lib/maps";

export function Location() {
  const [showMap, setShowMap] = useState(false);
  return (
    <Section id="localizacao" muted>
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeader
            title="Onde encontrar a Valdete"
            lead="Atendimento presencial. Passe aqui ou combine pelo WhatsApp."
          />
          {/* Critical local info stays visible by default (impeccable critique
              P1/P2): address + hours never wait on a scroll-reveal, and read at
              base size for the Maps-arriving 55+ visitor. */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius)] bg-surface text-text">
                <MapPinIcon width={18} height={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-text">Endereço</p>
                <p className="text-base text-text-muted">{site.location.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius)] bg-surface text-text">
                <ClockIcon width={18} height={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-text">Horário</p>
                <p className="text-base text-text-muted">{site.location.hours}</p>
              </div>
            </div>
            <div className="pt-2">
              <WhatsAppButton label="Falar no WhatsApp" />
            </div>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setShowMap((v) => !v)}
                aria-expanded={showMap}
                aria-controls="mapa-valdete"
                className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-text/15 px-4 py-2 text-sm font-medium text-text transition-colors hover:border-text/40 hover:bg-text/[0.03]"
              >
                <MapPinIcon width={16} height={16} />
                {showMap ? "Ocultar mapa" : "Ver no mapa"}
              </button>
              {showMap && (
                <div
                  id="mapa-valdete"
                  className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-border"
                >
                  <iframe
                    title="Mapa do ateliê Valdete Costuras"
                    src={mapsEmbedUrl()}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="aspect-[16/10] w-full"
                  />
                  <div className="border-t border-border bg-surface/60 px-4 py-2 text-center">
                    <a
                      href={mapsPlaceUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-accent-strong hover:underline"
                    >
                      Abrir no Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reveal (DEC-017): the storefront photo settles from 1.04, like a
            print laid on the table; the caption follows. */}
        <RevealGroup>
          <figure className="overflow-hidden rounded-[var(--radius-lg)] border border-border">
            <div className="rg-photo relative aspect-[4/3] w-full">
              <Image
                src="/fachada.webp"
                alt="Fachada da loja Valdete Costuras em Palhoça - SC"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {site.location.mapsUrl && (
              <figcaption className="border-t border-border bg-surface/60 px-4 py-3 text-center text-sm">
                <a
                  href={mapsPlaceUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent-strong hover:underline"
                >
                  Ver no mapa
                </a>
              </figcaption>
            )}
          </figure>
        </RevealGroup>
      </div>
    </Section>
  );
}
