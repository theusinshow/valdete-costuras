import type { Metadata } from "next";
import { Petrona, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const petrona = Petrona({
  variable: "--font-petrona",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — Ajustes e consertos de roupa`,
  description:
    "Ajustes e consertos de roupa em [BAIRRO/CIDADE], rápido e bem feito. Bainha, zíper, ajuste de peças e uniformes para empresas. Fale no WhatsApp.",
  openGraph: {
    title: `${site.name} — Ajustes e consertos de roupa`,
    description:
      "Ajustes e consertos de roupa, rápido e bem feito. Fale no WhatsApp.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${petrona.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
