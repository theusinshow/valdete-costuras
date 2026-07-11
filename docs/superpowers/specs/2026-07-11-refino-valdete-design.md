# Design — Refino Valdete Costuras (2026-07-11)

Iteração de refino visual/UX sobre a landing existente (Next.js + Tailwind v4 + TS).
Pedido do desenvolvedor, seção por seção. Todo o trabalho permanece dentro do vocabulário
aprovado: paleta do manual (Linho `#FBF6F2` / Carvão `#2C2523` / Vermelho Valdete `#C4302E`),
tipografia Cormorant Garamond + Jost, motion `traço-costura` sutil respeitando
`prefers-reduced-motion`. Sem libs novas, sem WebGL, sem regressão de Core Web Vitals.
Nenhum placeholder `[BRACKET]` visível em produção.

Decisões travadas com o desenvolvedor (ver "Decisões" ao fim → DEC-019).

---

## 1 · Hero — menos vazio, logo maior, faixa da fachada

**Arquivo:** `src/components/sections/Hero.tsx`

- **Assinatura ampliada:** `Monogram` de 132 → ~168 e `scriptSize` maior no painel direito.
  A coreografia `[data-intro]` da assinatura ("Valdete" que se escreve) é **preservada**.
- **Faixa da fachada:** nova banda em largura total logo abaixo do grid do hero, dentro da
  mesma `<section id="top">`. Usa `fachada.webp` via `next/image` (`fill`, `sizes` full-width,
  altura ~150–180px, `object-cover`). Scrim suave + label discreta ("Ateliê em Palhoça-SC").
  `priority={false}` (não é o LCP; o H1 é). Entra com `rg-photo`/settle sutil.
- **Trust marks:** trocar os `bg-accent` dots redondos (linhas 62–74) por um detalhe
  **traço-costura** (traço curto tipo `– – –`, mesma linguagem do manual/`.stitch-line`)
  antes de cada item, em vez da bolinha.

**A11y/perf:** faixa reserva altura fixa (sem CLS); alt descritivo; sob reduced-motion a
faixa aparece estática.

## 2 · Serviços — scroll calmo, hover sutil, botão de orçamento melhor

**Arquivos:** `src/components/ServicesShowcase.tsx`, `src/app/globals.css` (ajuste fino)

- **Troca de imagem menos "rápida":** crossfade mais longo (700 → ~900ms) e menos zoom no
  estado inativo (`scale-[1.03]` → `~scale-[1.015]`), para as fotos não passarem
  bruscamente. Reduzir a sensibilidade do scroll-spy (estreitar/ajustar o `rootMargin` do
  IntersectionObserver) para não alternar em rajada ao rolar.
- **Hover mais sutil:** suavizar a transição de cor do título (mantém `accent-strong`, mas
  gesto mais discreto); reduzir o deslocamento do estado ativo.
- **"Pedir orçamento" como chip:** substituir o texto que desliza por um pequeno
  **botão-pílula** (contorno `border-accent/40`, texto `accent-strong`, ícone WhatsApp,
  `rounded-full`, `px-3 h-8`) que aparece com discrição na linha ativa (scroll-spy no mobile,
  hover/focus no desktop). Mantém o `<a href={wa.me…}>` por serviço com a mensagem
  pré-preenchida (`waServiceMessage`) — semântica e AT inalteradas.

## 3 · Diferenciais — redesenhado, distinto de "Como funciona"

**Arquivos:** `src/components/sections/Pillars.tsx` (reescreve), `StitchTimeline` deixa de ser
usado por esta seção (arquivo mantido caso reutilizado; se ficar órfão, remover na limpeza).

- Sai a costura horizontal (era gêmea visual do "Como funciona"). Entra uma **grade 2×2 de
  cartões enxutos** (`md:grid-cols-2`): cada cartão com hairline `border-border`, um índice/
  detalhe de costura discreto, título (`font-display`) e a frase. Conteúdo dos 4 pilares
  inalterado (Experiência / Rapidez / Atendimento pessoal / Preço justo).
- Reveal: `RevealGroup` com `rg-rise` em cascata (sem reintroduzir a semântica de "nós"/seam
  que pertence agora só ao "Como funciona").
- Ganha um `SectionHeader` **visível** curto ("Por que a Valdete") no lugar do `<h2 sr-only>`
  — reforça a distinção de "Como funciona" e mantém a hierarquia h2. É só um título de seção
  (não um fato inventado).

## 4 · Como funciona — mantido

Sem mudança de conteúdo. Passa a ser o **único** com o formato de costura horizontal/nós,
o que resolve a duplicidade percebida.

## 5 · Empresas — B2B explícito + marcador de página

**Arquivo:** `src/components/sections/Companies.tsx`

- **Aba/marcador "bookmark"** acima do card: um rótulo destacado **"Trabalho para empresas"**
  (pequena etiqueta com traço-costura), sinalizando a troca de público (B2C → B2B).
- Reforço de que é **uniformes/volume para negócios**: subtítulo mais explícito no copy
  (`lib/content.ts` `companies.short`), sem inventar fatos novos. Ajuste visual do card
  (respiro, hierarquia) mantendo o fundo carvão.

## 6 · Depoimentos — 4 humanos (APROVADOS pelo desenvolvedor)

**Arquivo:** `src/lib/content.ts` (`testimonials[]`), `src/components/sections/Testimonials.tsx`

Preenche `testimonials[]` (hoje vazio) com os 4 nomes reais que o desenvolvedor forneceu
(pessoas que elogiaram a Valdete pessoalmente). Textos aprovados:

- **Carma** — "Levo minhas roupas pra Valdete há anos. Faz a bainha certinha e sempre no
  prazo. Nunca me decepcionou."
- **Rosilda** — "Precisei apertar um vestido em cima da hora e ela resolveu no mesmo dia.
  Ficou perfeito, como se fosse feito pra mim."
- **Nicélia** — "Atendimento de primeira. A Valdete conversa, entende o que você quer, e o
  preço é justo. Recomendo muito."
- **João** — "Troquei o zíper de duas jaquetas e ficou impecável. Trabalho caprichado e
  pessoa ótima de lidar."

Com `testimonials[]` não-vazio, o componente já renderiza o grid de cards (caminho existente,
DEC-018) e o painel de convite desaparece automaticamente. `CONTENT_PENDING.md` CNT-007
passa de pendente a resolvido.

## 7 · Localização — mantida + seletor de mapa

**Arquivos:** `src/components/sections/Location.tsx`, `src/lib/content.ts` (`mapsUrl`)

- **Botão "Ver no mapa"** que expande (toggle, fechado por padrão) um **Google Maps embutido**
  via `<iframe … output=embed>` montado a partir do endereço/coordenadas
  (lat `-27.6349936`, lng `-48.674661`). Fechado por padrão protege LCP; o iframe só é
  inserido/carregado após o clique (`loading="lazy"`, `title` descritivo).
- `site.location.mapsUrl` recebe o link real do place (fornecido pelo desenvolvedor) para o
  atalho "abrir no Google Maps" (nova aba).

## 8 · CTA final — refatorada (banda carvão, vermelho só no botão)

**Arquivo:** `src/components/sections/FinalCta.tsx` (raciocínio `/impeccable`)

- Fundo passa de `bg-accent` (vermelho cheio, "estourado") para **carvão profundo**
  (`bg-text`, como o card de Empresas), texto claro (`--color-bg`).
- Marca d'água do `Monogram` mantida (agora em `text-white/8–10`); **botão `inverse`**
  (fill linho, texto/seam vermelho) como único ponto de vermelho.
- Contraste reverificado AA (título/subtítulo claros sobre carvão). Reveal `rg-scale` +
  `cta-seal` mantidos.

## 9 · Footer — hierarquia, mapa menor, logo central

**Arquivo:** `src/components/Footer.tsx`

- **Mini-mapa:** iframe pequeno do Google Maps (mesmo embed, altura ~160px) na coluna de
  contato, com `loading="lazy"`.
- **Monograma central como marca d'água** sutil ao fundo do footer (transparente,
  `pointer-events-none`, `aria-hidden`), centralizado.
- Ajuste de tamanhos/espaçamento; informações (endereço, horário, WhatsApp, navegação)
  mantidas.

---

## Componentes / boundaries

- Mudanças majoritariamente **isoladas por seção** (um arquivo por seção), o que mantém cada
  unidade com propósito único e testável de forma independente.
- Novos helpers pequenos:
  - `mapsEmbedUrl` / `mapsPlaceUrl` em `lib/` (monta a URL de embed e o link de place) —
    reutilizado por Localização e Footer, evitando duplicar a string.
  - Toggle do mapa: estado local (`useState`) no `Location` (client). Footer usa embed
    estático (sem toggle) para não pesar.
- `globals.css`: apenas ajustes finos (durações/escala de crossfade dos serviços; eventual
  utilitário para o chip e o marcador "bookmark"). Sem reescrever o sistema de motion.

## Riscos / atenção

- **CWV:** mapas em iframe podem custar. Mitigação: Localização carrega sob clique; Footer usa
  `loading="lazy"`. Nenhum iframe no above-the-fold.
- **Órfão:** se `StitchTimeline` ficar sem uso após o item 3, decidir entre remover ou manter
  (limpeza no fim). Não deletar sem confirmar que nada mais referencia.
- **Depoimentos:** deixam de ser placeholder — atualizar `CONTENT_PENDING.md` e não reintroduzir
  o painel de convite quando houver dados.
- **A11y:** chip de orçamento, toggle do mapa e aba "Trabalho para empresas" precisam de
  rótulos/estado anunciados; reverificar contraste na CTA carvão e na faixa do hero.

## Verificação (ao fim)

- `next build` limpo.
- Playwright/`webapp-testing`: 375 / 768 / 1440 — sem overflow @320; reveals aparecem;
  reduced-motion mostra tudo estático; no-JS mostra conteúdo; hrefs `wa.me` corretos por
  serviço; toggle de mapa abre/fecha; CTA carvão AA; 4 depoimentos renderizam; sem erros no
  console.

## Decisões a registrar (DECISIONS_LOG.md)

- **DEC-019** — Refino de refino desta iteração (Hero faixa+logo, Serviços calmos, Diferenciais
  2×2, Empresas B2B/bookmark, Depoimentos humanos aprovados, Localização mapa toggle, CTA carvão,
  Footer mapa+logo). Superseção parcial: DEC-015 (Diferenciais deixa de ser timeline costurada);
  DEC-005/CNT-007 (trust agora inclui depoimentos reais autorizados).
