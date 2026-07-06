import Link from "next/link";
import { nav, site } from "@/lib/content";
import { WhatsAppButton } from "./WhatsAppButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="text-lg font-bold tracking-tight text-text"
          aria-label={`${site.name} — início`}
        >
          {/* Typographic wordmark — swap for logo SVG when finalized (CNT-006). */}
          Valdete<span className="text-accent">.</span>
          <span className="ml-1 hidden font-sans text-sm font-medium tracking-normal text-text-muted sm:inline">
            Costuras
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Seções">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <WhatsAppButton label="WhatsApp" size="md" className="hidden sm:inline-flex" />
        <WhatsAppButton label="Falar" size="md" className="sm:hidden" />
      </div>
    </header>
  );
}
