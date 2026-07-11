# Refino Valdete Costuras — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar visual/UX de 9 seções da landing (Hero, Serviços, Diferenciais, Empresas, Depoimentos, Localização, CTA final, Footer) mantendo a identidade da marca, conforme o spec aprovado `docs/superpowers/specs/2026-07-11-refino-valdete-design.md`.

**Architecture:** Mudanças isoladas por seção (um componente por arquivo). Um helper novo (`lib/maps.ts`) monta as URLs do Google Maps, reutilizado por Localização e Footer. Ajustes finos no `globals.css` para o crossfade dos serviços, o chip de orçamento e o marcador "bookmark". Conteúdo (depoimentos, copy de empresas, mapsUrl) vive em `lib/content.ts`.

**Tech Stack:** Next.js (App Router) + Tailwind CSS v4 + TypeScript + `next/font` + `next/image`. Sem libs novas, sem WebGL.

## Global Constraints

- Paleta do manual (DEC-014), exata: bg `#fbf6f2`, surface `#ffffff`, surface-muted `#f4ece4`, text `#2c2523`, text-muted `#6e625e`, border `#e8ddd3`, accent `#c4302e`, accent-hover `#a8282a`, accent-strong `#b02a28`, accent-foreground `#ffffff`, coral `#e4807d`, rose `#f6a6a2`. Coral/rosé só decorativo, nunca texto.
- Tipografia: Cormorant Garamond (display) · Jost (body/UI) · Alex Brush (script — só logo).
- Tokens via CSS vars já existentes (`--color-*`, `--radius*`, `--shadow*`). Usar utilitários Tailwind (`text-accent`, `bg-text`, etc.), não hex cru.
- Motion sutil; respeitar `prefers-reduced-motion`; nada acima da dobra que prejudique LCP; sem CLS (reservar altura de mídia).
- Nunca deixar placeholder `[BRACKET]` visível em produção.
- WhatsApp sempre via `whatsappUrl()`/`waMessages`/`waServiceMessage` de `lib/whatsapp.ts`, com `target="_blank" rel="noopener noreferrer"`.
- Coordenadas reais do place: lat `-27.6349936`, lng `-48.674661`. Link de place fornecido pelo desenvolvedor (ver Task 6).
- Verificação por tarefa: `npm run build` limpo. Verificação de comportamento no navegador via `webapp-testing` ao final das tarefas com interação (Serviços, Localização) e no fechamento (Task 10).

---

### Task 1: Helper de mapas (`lib/maps.ts`) + `mapsUrl` no content

**Files:**
- Create: `src/lib/maps.ts`
- Modify: `src/lib/content.ts` (campo `location.mapsUrl`)

**Interfaces:**
- Produces:
  - `mapsPlaceUrl(): string` — link do Google Maps do place (nova aba). Retorna `site.location.mapsUrl` se preenchido, senão monta `https://www.google.com/maps/search/?api=1&query=<lat>,<lng>`.
  - `mapsEmbedUrl(): string` — URL para `<iframe>`: `https://www.google.com/maps?q=<lat>,<lng>(Valdete%20Costuras)&z=16&output=embed`.
  - Constantes `MAPS_LAT = -27.6349936`, `MAPS_LNG = -48.674661`.

- [ ] **Step 1: Criar `src/lib/maps.ts`**

```ts
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
```

- [ ] **Step 2: Preencher `mapsUrl` no content**

Em `src/lib/content.ts`, no objeto `site.location`, trocar `mapsUrl: ""` pelo link real fornecido pelo desenvolvedor:

```ts
    mapsUrl:
      "https://www.google.com/maps/dir/-27.6131762,-48.6698411/Valdete+Costuras,+R.+Pref.+Reinoldo+Alves,+1348+-+Passa+Vinte,+Palho%C3%A7a+-+SC,+88132-001/@-27.6238423,-48.6695407,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x95273523b13e94d3:0x35003fdf7595a042!2m2!1d-48.674661!2d-27.6349936?entry=ttu",
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: compila sem erros de tipo (helper e content válidos).

- [ ] **Step 4: Commit**

```bash
git add src/lib/maps.ts src/lib/content.ts
git commit -m "Adiciona helper de mapas e link real do place (DEC-019)"
```

---

### Task 2: Depoimentos humanos + copy de Empresas (content)

**Files:**
- Modify: `src/lib/content.ts` (`testimonials[]`, `companies`)

**Interfaces:**
- Consumes: nada.
- Produces: `testimonials` populado (4 itens `{quote, author}`); `companies.short` mais explícito B2B; opcional `companies.eyebrow: string` para o marcador (Task 5 lê).

- [ ] **Step 1: Popular `testimonials[]`** (aprovado pelo desenvolvedor — não alterar os textos)

Em `src/lib/content.ts`, substituir a linha `export const testimonials... = [];` por:

```ts
export const testimonials: { quote: string; author: string }[] = [
  {
    quote:
      "Levo minhas roupas pra Valdete há anos. Faz a bainha certinha e sempre no prazo. Nunca me decepcionou.",
    author: "Carma",
  },
  {
    quote:
      "Precisei apertar um vestido em cima da hora e ela resolveu no mesmo dia. Ficou perfeito, como se fosse feito pra mim.",
    author: "Rosilda",
  },
  {
    quote:
      "Atendimento de primeira. A Valdete conversa, entende o que você quer, e o preço é justo. Recomendo muito.",
    author: "Nicélia",
  },
  {
    quote:
      "Troquei o zíper de duas jaquetas e ficou impecável. Trabalho caprichado e pessoa ótima de lidar.",
    author: "João",
  },
];
```

- [ ] **Step 2: Tornar Empresas explicitamente B2B**

No objeto `export const companies`, adicionar `eyebrow` e deixar o `short` mais claro (uniformes/volume para negócios), sem inventar fatos:

```ts
export const companies = {
  eyebrow: "Trabalho para empresas",
  title: "Uniformes e costura para o seu negócio",
  short:
    "Para empresas: produção, ajuste e conserto de uniformes em volume, com padrão e prazo confiáveis e atendimento recorrente.",
  points: [
    "Uniformes e peças sob demanda",
    "Ajustes e consertos em quantidade",
    "Atendimento recorrente para empresas",
  ],
  ctaLabel: "Orçamento para empresas",
} as const;
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: compila; `testimonials` não-vazio.

- [ ] **Step 4: Commit**

```bash
git add src/lib/content.ts
git commit -m "Adiciona 4 depoimentos humanos aprovados e reforça copy B2B (DEC-019)"
```

---

### Task 3: Hero — logo maior, faixa da fachada, trust marks em traço-costura

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `site.heroImage` (fallback existente), `Monogram`, `Wordmark`.
- Produces: nada para outras tasks.

- [ ] **Step 1: Aumentar a assinatura no painel**

Em `Hero.tsx`, no bloco do fallback (`.hero-sig`), aumentar `<Monogram size={132} />` para `size={168}` e `scriptSize={50}` para `scriptSize={60}`.

- [ ] **Step 2: Trocar os dots das trust marks por traço-costura**

Substituir o `<span className="h-1.5 w-1.5 rounded-full bg-accent" />` (dentro do `.map(trust)`) por um traço curto:

```tsx
<span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-accent/70" />
```

(mantém o `flex items-center gap-2`; ajustar `items-center` → `items-start` no `<li>` se o traço pedir alinhamento ao topo do texto.)

- [ ] **Step 3: Adicionar a faixa da fachada abaixo do grid do hero**

Ainda dentro de `<section id="top">`, após o `</div>` que fecha o `.container-page` do grid, adicionar:

```tsx
{/* Faixa da fachada — ancora com a loja real, largura total, fora do LCP */}
<div className="relative h-40 w-full overflow-hidden border-t border-border md:h-48">
  <Image
    src="/fachada.webp"
    alt="Fachada do ateliê Valdete Costuras em Palhoça - SC"
    fill
    sizes="100vw"
    className="object-cover object-center"
  />
  <div
    aria-hidden
    className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
  />
  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm font-medium text-white/95">
    Ateliê em Palhoça - SC
  </span>
</div>
```

(`Image` já está importado. `priority` ausente → não compete com o H1 pelo LCP.)

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: compila; sem erro de `next/image` (host local `/fachada.webp` existe em `public/`).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "Enriquece Hero: logo maior, faixa da fachada e trust marks em traço-costura (DEC-019)"
```

---

### Task 4: Serviços — scroll calmo, hover sutil, chip de orçamento

**Files:**
- Modify: `src/components/ServicesShowcase.tsx`
- Modify: `src/app/globals.css` (regra utilitária do chip, se necessário)

**Interfaces:**
- Consumes: `services` (readonly), `waServiceMessage`, `whatsappUrl`, `WhatsAppIcon`.
- Produces: nada.

- [ ] **Step 1: Reduzir a sensibilidade do scroll-spy**

Em `ServicesShowcase.tsx`, no `IntersectionObserver`, trocar `rootMargin: "-45% 0px -45% 0px"` por uma banda central mais estreita e estável:

```ts
{ rootMargin: "-50% 0px -48% 0px", threshold: 0 },
```

(linha central ~2%: só a linha que cruza o centro fica ativa, reduzindo alternância em rajada.)

- [ ] **Step 2: Suavizar o crossfade da foto sticky**

Na `ServiceImage` do painel sticky, trocar `duration-700` por `duration-[900ms]` e o estado inativo `scale-[1.03]` por `scale-[1.015]`:

```tsx
className={`absolute inset-0 h-full w-full transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
  i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.015]"
}`}
```

- [ ] **Step 3: Hover do título mais sutil**

No `<h3>` da linha, manter a cor ativa mas reduzir a força do hover: trocar `group-hover:text-accent-strong` por `group-hover:text-text` e manter `isActive ? "text-accent-strong" : "text-text"` (o vermelho fica reservado ao estado ativo/scroll, o hover só firma a cor). `transition-colors duration-200` → `duration-300` para gesto mais macio.

- [ ] **Step 4: Transformar a afordância "Pedir orçamento" em chip-pílula**

Substituir o `<span … >` da afordância (o bloco com `WhatsAppIcon` + "Pedir orçamento") por um chip com contorno:

```tsx
<span
  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold text-accent-strong transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:translate-y-0 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 ${
    isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
  }`}
>
  <WhatsAppIcon width={14} height={14} />
  Pedir orçamento
</span>
```

(troca o deslize horizontal por um fade+subida discreta; visual de botão real.)

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: compila sem erro.

- [ ] **Step 6: Verificar no navegador (webapp-testing)**

Rodar `npm run build && npm start`, abrir `#servicos` em 1440 e 375. Confirmar: rolar a lista troca a foto de forma suave (sem "piscar" em rajada); hover no título é discreto; o chip "Pedir orçamento" aparece na linha ativa e leva ao `wa.me` com a mensagem do serviço; foco por teclado revela o chip.

- [ ] **Step 7: Commit**

```bash
git add src/components/ServicesShowcase.tsx src/app/globals.css
git commit -m "Suaviza scroll/hover dos Serviços e converte afordância em chip de orçamento (DEC-019)"
```

---

### Task 5: Empresas — marcador "Trabalho para empresas" + clareza B2B

**Files:**
- Modify: `src/components/sections/Companies.tsx`

**Interfaces:**
- Consumes: `companies.eyebrow` (Task 2), `companies.title/short/points/ctaLabel`.
- Produces: nada.

- [ ] **Step 1: Adicionar o marcador tipo bookmark acima do card**

Em `Companies.tsx`, dentro do `<RevealGroup>`, antes do `<div className="rg-scale …">`, inserir uma aba destacada que "senta" sobre o topo do card:

```tsx
<div className="relative z-10 mx-auto -mb-4 w-fit rounded-t-[var(--radius)] bg-accent px-5 py-2 text-center">
  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
    {companies.eyebrow}
  </span>
</div>
```

(fica centralizado sobre o card carvão; o `-mb-4` cria a sobreposição de "marcador de página".)

- [ ] **Step 2: Garantir que o card comece abaixo do marcador**

No `<div className="rg-scale rounded-[var(--radius-lg)] …">`, adicionar `relative` (se ainda não houver) para o empilhamento com o marcador ficar previsível. O `short` mais explícito já vem do content (Task 2) — nenhuma string nova aqui.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: compila; `companies.eyebrow` existe (Task 2).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Companies.tsx
git commit -m "Sinaliza seção Empresas com marcador B2B e reforça clareza (DEC-019)"
```

---

### Task 6: Diferenciais — grade 2×2 de cartões (substitui a timeline)

**Files:**
- Modify: `src/components/sections/Pillars.tsx`

**Interfaces:**
- Consumes: `pillars` (4 itens `{title, short}`), `Section`, `RevealGroup`, `SectionHeader`.
- Produces: nada. `StitchTimeline` deixa de ser importado aqui (arquivo mantido, ver spec).

- [ ] **Step 1: Reescrever `Pillars.tsx` como grade 2×2**

```tsx
import type { CSSProperties } from "react";
import { pillars } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealGroup } from "@/components/RevealGroup";

/** Per-element reveal delay (DEC-017). */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Pillars() {
  return (
    <Section id="diferenciais" space="normal">
      <SectionHeader
        title="Por que a Valdete"
        lead="O que você pode esperar ao deixar sua peça no ateliê."
      />
      {/* Grade 2x2 — formato próprio, distinto do seam de "Como funciona" */}
      <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-2">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.title}
            className="rg-rise flex flex-col gap-2 bg-bg p-7 md:p-8"
            style={d(i * 90)}
          >
            <span className="font-display text-sm tabular-nums text-accent-strong">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-medium tracking-tight">{pillar.title}</h3>
            <p className="text-sm leading-relaxed text-text-muted">{pillar.short}</p>
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}
```

(A grade usa `gap-px` + `bg-border` para hairlines internas finas; cada célula `bg-bg`. Sem `StitchTimeline`, sem `<h2 sr-only>` — o `SectionHeader` já provê o h2 visível.)

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: compila; nenhum import não usado (removido `StitchTimeline`).

- [ ] **Step 3: Verificar distinção visual**

Abrir `#diferenciais` e `#como-funciona` lado a lado no navegador: confirmar que não parecem mais a mesma coisa (grade de cartões vs. seam horizontal com nós).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Pillars.tsx
git commit -m "Redesenha Diferenciais como grade 2x2, distinta de Como funciona (DEC-019)"
```

---

### Task 7: Localização — botão seletor com Google Maps embutido

**Files:**
- Modify: `src/components/sections/Location.tsx`
- Consome: `src/lib/maps.ts` (Task 1)

**Interfaces:**
- Consumes: `mapsEmbedUrl()`, `mapsPlaceUrl()`.
- Produces: nada.

- [ ] **Step 1: Tornar o componente client e adicionar estado do toggle**

No topo de `Location.tsx`, adicionar `"use client";` e `import { useState } from "react";` e os imports do helper:

```tsx
"use client";
import { useState } from "react";
import { mapsEmbedUrl, mapsPlaceUrl } from "@/lib/maps";
```

(Manter os imports existentes. O `Section`/`SectionHeader`/`Reveal`/`RevealGroup`/`Image` continuam.)

- [ ] **Step 2: Adicionar o botão + iframe sob clique, na coluna de texto**

Dentro do `<Reveal delay={80} …>`, após o bloco do WhatsApp (`<div className="pt-2">…</div>`), adicionar:

```tsx
<div className="pt-4">
  <button
    type="button"
    onClick={() => setShowMap((v) => !v)}
    aria-expanded={showMap}
    aria-controls="mapa-valdete"
    className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-text/15 px-4 py-2 text-sm font-medium text-text transition-colors hover:border-text/40 hover:bg-text/[0.03]"
  >
    <MapPinIcon width={16} height={16} />
    {showMap ? "Ocultar mapa" : "Ver no mapa"}
  </button>
  {showMap && (
    <div
      id="mapa-valdete"
      className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-border"
    >
      <iframe
        title="Mapa do ateliê Valdete Costuras"
        src={mapsEmbedUrl()}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[16/10] w-full"
      />
      <div className="border-t border-border bg-surface/60 px-4 py-2 text-center">
        <a
          href={mapsPlaceUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-accent-strong hover:underline"
        >
          Abrir no Google Maps
        </a>
      </div>
    </div>
  )}
</div>
```

Adicionar o estado no corpo do componente: `const [showMap, setShowMap] = useState(false);`

- [ ] **Step 3: Manter a legenda "Ver no mapa" da figure coerente**

O bloco `figcaption` existente (que dependia de `site.location.mapsUrl`) pode permanecer como atalho secundário na foto; como `mapsUrl` agora está preenchido (Task 1), ele renderiza. Sem mudança obrigatória, mas trocar o `href` para `mapsPlaceUrl()` para uma única fonte de verdade.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: compila; componente client válido.

- [ ] **Step 5: Verificar no navegador**

Abrir `#localizacao`: o mapa NÃO carrega até clicar "Ver no mapa" (checar Network — iframe só após clique). Toggle abre/fecha; "Abrir no Google Maps" abre o place em nova aba; `aria-expanded` alterna.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Location.tsx
git commit -m "Adiciona seletor de mapa com Google Maps embutido sob clique (DEC-019)"
```

---

### Task 8: CTA final — banda carvão, vermelho só no botão

**Files:**
- Modify: `src/components/sections/FinalCta.tsx`

**Interfaces:**
- Consumes: `finalCta`, `Monogram`, `WhatsAppButton` (variant `inverse`).
- Produces: nada.

- [ ] **Step 1: Trocar o fundo vermelho por carvão**

Na `<section>`, trocar `bg-accent text-accent-foreground` por `bg-text text-[color:var(--color-bg)]`:

```tsx
<section className="relative overflow-hidden bg-text text-[color:var(--color-bg)]">
```

- [ ] **Step 2: Ajustar título/subtítulo para o fundo escuro**

- Marca d'água: `Monogram size={340}` mantém `text-white/10`.
- Selo: `Monogram size={56}` mantém `text-white/90` (ou `text-white/85`).
- `<h2>`: trocar `text-accent-foreground` por `text-[color:var(--color-bg)]`.
- `<p>`: trocar `text-accent-foreground/90` por `text-[color:var(--color-bg)]/85`.

- [ ] **Step 3: Botão continua `inverse`** (fill linho + seam vermelho) — já é o único vermelho, agora contra carvão. Sem mudança no `WhatsAppButton`.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: compila.

- [ ] **Step 5: Verificar contraste AA**

No navegador, inspecionar cores computadas: título/subtítulo claros sobre carvão `#2c2523` ≥ 4.5:1; botão inverse legível. Confirmar que o vermelho não "estoura" mais (só no botão).

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/FinalCta.tsx
git commit -m "Refatora CTA final para banda carvão com vermelho só no botão (DEC-019)"
```

---

### Task 9: Footer — mini-mapa, monograma central, hierarquia

**Files:**
- Modify: `src/components/Footer.tsx`
- Consome: `src/lib/maps.ts` (Task 1)

**Interfaces:**
- Consumes: `mapsEmbedUrl()`, `Monogram`, `Wordmark`, `nav`, `site`.
- Produces: nada.

- [ ] **Step 1: Importar Monogram e o helper de mapa**

No topo, adicionar `import { Wordmark, Monogram } from "./Logo";` (troca o import de `Wordmark`) e `import { mapsEmbedUrl } from "@/lib/maps";`.

- [ ] **Step 2: Marca d'água central do monograma**

No `<footer>` (que já é `border-t … bg-surface-muted`), adicionar `relative overflow-hidden` e inserir como primeiro filho:

```tsx
<Monogram
  aria-hidden
  size={280}
  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-text/[0.04]"
/>
```

Envolver o conteúdo existente para ficar acima da marca d'água: garantir que o `<div className="container-page …">` tenha `relative z-10`.

- [ ] **Step 3: Mini-mapa na coluna de contato**

Dentro da terceira coluna (Contato), após o link "Falar no WhatsApp", adicionar:

```tsx
<div className="mt-5 overflow-hidden rounded-[var(--radius)] border border-border">
  <iframe
    title="Mapa do ateliê Valdete Costuras"
    src={mapsEmbedUrl()}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="h-40 w-full"
  />
</div>
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: compila.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "Melhora footer: mini-mapa, monograma central e hierarquia (DEC-019)"
```

---

### Task 10: Registro, CONTENT_PENDING e verificação final

**Files:**
- Modify: `docs/ai/DECISIONS_LOG.md`
- Modify: `docs/ai/CONTENT_PENDING.md`

- [ ] **Step 1: Registrar DEC-019** em `docs/ai/DECISIONS_LOG.md`

Adicionar uma entrada `## DEC-019 — Refino de refino (2026-07-11)` resumindo: Hero (faixa da fachada + logo maior + traço-costura nas trust marks), Serviços (scroll/hover mais calmos, chip de orçamento), Diferenciais (grade 2×2 — **supersede DEC-015** timeline costurada), Empresas (marcador B2B + copy), Depoimentos (4 humanos aprovados — atualiza DEC-005/CNT-007), Localização (mapa toggle sob clique), CTA final (banda carvão), Footer (mini-mapa + monograma). Listar arquivos alterados.

- [ ] **Step 2: Atualizar `docs/ai/CONTENT_PENDING.md`**

Marcar CNT-007 (depoimentos) como resolvido; registrar `mapsUrl` preenchido; anotar que a faixa/mini-mapa usam `fachada.webp` e o embed do place real.

- [ ] **Step 3: Verificação final no navegador (webapp-testing)**

`npm run build && npm start`. Em 375 / 768 / 1440:
- Sem overflow horizontal @320.
- Hero: faixa da fachada visível, logo maior, trust marks com traço.
- Serviços: troca de foto suave, chip funciona (teclado + mouse), hrefs `wa.me` por serviço.
- Diferenciais 2×2 distinto de Como funciona.
- Empresas com marcador "Trabalho para empresas".
- 4 depoimentos renderizam (painel de convite sumiu).
- Localização: mapa só carrega sob clique; toggle e "Abrir no Google Maps" OK.
- CTA final carvão, contraste AA, vermelho só no botão.
- Footer: mini-mapa lazy + monograma central sutil.
- `prefers-reduced-motion`: tudo estático, nada escondido. Console sem erros.

- [ ] **Step 4: Commit**

```bash
git add docs/ai/DECISIONS_LOG.md docs/ai/CONTENT_PENDING.md
git commit -m "Registra DEC-019 e atualiza CONTENT_PENDING do refino"
```

---

## Self-review notes

- **Cobertura do spec:** Hero→T3; Serviços→T4; Diferenciais→T6; Como funciona→sem mudança (documentado); Empresas→T2+T5; Depoimentos→T2; Localização→T1+T7; CTA→T8; Footer→T1+T9; registro→T10. ✔
- **Ordem:** T1 (helper) e T2 (content) primeiro, pois T5/T7/T9 dependem de `companies.eyebrow`, `mapsEmbedUrl`, `mapsPlaceUrl` e `testimonials`.
- **Sem placeholders:** todo passo mostra o código/URL real.
- **Consistência de tipos:** `mapsEmbedUrl()`/`mapsPlaceUrl()`/`MAPS_LAT`/`MAPS_LNG` definidos em T1 e usados igualzinho em T7/T9; `companies.eyebrow` definido em T2, lido em T5; `testimonials` populado em T2, consumido pelo caminho existente de `Testimonials.tsx` (DEC-018), sem mudança de shape.
