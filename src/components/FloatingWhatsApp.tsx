"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons";
import { whatsappUrl, waMessages } from "@/lib/whatsapp";

/** Floating WhatsApp button — appears after the hero scrolls out (mobile-first). */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl(waMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:bg-accent-hover active:scale-95 motion-reduce:transition-none ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-3"
      }`}
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
