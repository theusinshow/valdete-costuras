import { site } from "./content";

/** Coordenadas reais do ateliê (place do Google Maps fornecido pelo dev). */
export const MAPS_LAT = -27.6349936;
export const MAPS_LNG = -48.674661;

/** Link "abrir no Google Maps" (nova aba). Usa o place do content se houver. */
export function mapsPlaceUrl(): string {
  if (site.location.mapsUrl) return site.location.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${MAPS_LAT},${MAPS_LNG}`;
}

/** URL de embed (iframe, sem API key). Pino com rótulo do ateliê. */
export function mapsEmbedUrl(): string {
  const q = encodeURIComponent(`${MAPS_LAT},${MAPS_LNG} (Valdete Costuras)`);
  return `https://www.google.com/maps?q=${q}&z=16&output=embed`;
}
