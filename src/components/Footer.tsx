import { site, nav } from "@/lib/content";
import { whatsappUrl, waMessages } from "@/lib/whatsapp";
import { MapPinIcon, ClockIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold tracking-tight text-text">
            Valdete<span className="text-accent">.</span> Costuras
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
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
