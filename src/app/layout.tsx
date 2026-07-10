import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Alex_Brush } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

// Brand type system (identidade_visual manual):
// Cormorant Garamond → títulos · Jost → texto/UI · Alex Brush → assinatura (logo)
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — Ajustes e consertos de roupa`,
  description:
    "Ajustes e consertos de roupa em Palhoça - SC, rápido e bem feito. Bainha, zíper, ajuste de peças e uniformes para empresas. Fale no WhatsApp.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/brand/favicon.png",
  },
  openGraph: {
    title: `${site.name} — Ajustes e consertos de roupa`,
    description:
      "Ajustes e consertos de roupa, rápido e bem feito. Fale no WhatsApp.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/brand/logo-principal-fundo-vermelho.png" }],
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
      className={`${cormorant.variable} ${jost.variable} ${alexBrush.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          Mark that JS is running BEFORE the reveal elements paint. Scroll-reveal
          content starts hidden (opacity-0) only under `html.js`; without JS — or
          in a crawler that doesn't run it — the CSS fallback keeps everything
          visible so no section ever ships blank. See DEC-016.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
