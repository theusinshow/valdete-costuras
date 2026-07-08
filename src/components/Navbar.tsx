"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import { WhatsAppButton } from "./WhatsAppButton";
import { Button } from "./Button";
import { Monogram } from "./Logo";
import { MenuIcon, CloseIcon, WhatsAppIcon } from "./icons";
import { whatsappUrl, waMessages } from "@/lib/whatsapp";

const sectionIds = nav.map((item) => item.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Compact + more solid once the page starts scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy — light a link only while its section crosses the middle band.
  // Track every visible section and clear the highlight when none qualifies
  // (top/hero and the non-nav sections in between → no link lit).
  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // First section in document order that's currently in the band, else none.
        setActive(sectionIds.find((id) => visible.has(id)) ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the drawer on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-bg/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none ${
        scrolled
          ? "border-border shadow-[var(--shadow-sm)]"
          : "border-transparent"
      }`}
    >
      <div
        className={`container-page grid grid-cols-[1fr_auto] items-center transition-[height] duration-300 motion-reduce:transition-none md:grid-cols-[1fr_auto_1fr] ${
          scrolled ? "h-20" : "h-24"
        }`}
      >
        {/* Logo — dotted "V" monogram only, sized to the bar */}
        <Link
          href="#top"
          aria-label={`${site.name} — início`}
          className="logo-stitch justify-self-start text-accent"
          onClick={() => setOpen(false)}
        >
          <Monogram
            size={scrolled ? 52 : 64}
            title={site.name}
            className="transition-[width,height] duration-300 motion-reduce:transition-none"
          />
        </Link>

        {/* Centered section links (desktop) */}
        <nav
          className="hidden justify-self-center md:flex md:items-center md:gap-10"
          aria-label="Seções"
        >
          {nav.map((item) => {
            const isActive = active === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`group relative py-1 text-[1.0625rem] font-medium tracking-tight transition-colors ${
                  isActive
                    ? "text-accent-strong"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {item.label}
                {/* Traço-costura underline — sews in left→right on hover/active */}
                <span
                  aria-hidden
                  data-active={isActive ? "true" : "false"}
                  className="stitch-underline"
                />
              </a>
            );
          })}
        </nav>

        {/* Right cluster — WhatsApp CTA (desktop) + mobile toggle */}
        <div className="flex items-center justify-self-end gap-2">
          <WhatsAppButton
            label="WhatsApp"
            size="md"
            className="hidden md:inline-flex"
          />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] text-text transition-colors hover:bg-text/[0.05] md:hidden"
          >
            {open ? (
              <CloseIcon width={22} height={22} />
            ) : (
              <MenuIcon width={22} height={22} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-border bg-bg/95 backdrop-blur-md transition-[max-height,opacity] duration-300 motion-reduce:transition-none md:hidden ${
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav
          className="container-page flex flex-col gap-1 py-4"
          aria-label="Seções"
        >
          {nav.map((item) => {
            const isActive = active === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium transition-colors ${
                  isActive
                    ? "text-accent-strong"
                    : "text-text hover:bg-text/[0.04]"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-px w-5 border-t border-dashed ${
                    isActive ? "border-accent" : "border-border"
                  }`}
                />
                {item.label}
              </a>
            );
          })}
          <Button
            href={whatsappUrl(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            size="lg"
            className="mt-3 w-full"
          >
            <WhatsAppIcon />
            Falar no WhatsApp
          </Button>
        </nav>
      </div>
    </header>
  );
}
