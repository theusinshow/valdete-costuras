"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons";
import { whatsappUrl, waMessages } from "@/lib/whatsapp";

function StitchRing() {
  // Dashed ring that runs the seam on hover — matches the logo + button motion.
  return (
    <svg
      viewBox="0 0 56 56"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full animate-[spin_2.6s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running] motion-reduce:animate-none"
    >
      <circle
        cx="28"
        cy="28"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
      className={`group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-lift)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent-hover active:scale-95 motion-reduce:transition-none ${
        visible
          ? "opacity-100 scale-100"
          : "pointer-events-none opacity-0 scale-75"
      }`}
    >
      <StitchRing />
      <WhatsAppIcon width={26} height={26} className="relative" />
    </a>
  );
}
