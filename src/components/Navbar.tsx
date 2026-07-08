import Link from "next/link";
import { nav, site } from "@/lib/content";
import { WhatsAppButton } from "./WhatsAppButton";
import { Wordmark } from "./Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="text-accent transition-opacity hover:opacity-80"
          aria-label={`${site.name} — início`}
        >
          {/* Brand signature — dotted "V" monogram + script wordmark. */}
          <Wordmark scriptSize={26} layout="inline" className="translate-y-px" />
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
