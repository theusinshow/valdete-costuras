import { site, nav } from "@/lib/content";
import { whatsappUrl, waMessages } from "@/lib/whatsapp";
import { mapsEmbedUrl } from "@/lib/maps";
import { MapPinIcon, ClockIcon } from "./icons";
import { Wordmark, Monogram } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface-muted">
      <Monogram
        aria-hidden
        size={280}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-text/[0.04]"
      />
      <div className="container-page relative z-10 grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="text-accent">
            <Wordmark scriptSize={34} />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
            Ajustes, consertos e uniformes com atendimento próximo e preço justo.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-text">Navegação</p>
          <ul className="mt-3 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-text">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li className="flex items-start gap-2">
              <MapPinIcon width={16} height={16} className="mt-0.5 shrink-0" />
              <span>{site.location.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <ClockIcon width={16} height={16} className="mt-0.5 shrink-0" />
              <span>{site.location.hours}</span>
            </li>
          </ul>
          <a
            href={whatsappUrl(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-accent-strong hover:underline"
          >
            Falar no WhatsApp
          </a>
          <div className="mt-5 overflow-hidden rounded-[var(--radius)] border border-border">
            <iframe
              title="Mapa do ateliê Valdete Costuras"
              src={mapsEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-40 w-full"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page py-5 text-xs text-text-muted">
          © {site.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
