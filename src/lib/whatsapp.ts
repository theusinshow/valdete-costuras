import { site } from "./content";

/**
 * Build a wa.me link with an optional pre-filled message.
 * If the number is still the placeholder, returns "#" so nothing half-broken ships.
 */
export function whatsappUrl(message?: string): string {
  const digits = site.whatsapp.replace(/\D/g, "");
  if (!digits) return "#";
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const waMessages = {
  general: "Olá! Vim pelo site e gostaria de fazer um ajuste/conserto de roupa.",
  companies:
    "Olá! Vim pelo site e gostaria de um orçamento de uniformes para empresa.",
} as const;
