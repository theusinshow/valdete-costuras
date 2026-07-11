---
target: site inteiro (page.tsx)
total_score: 33
p0_count: 0
p1_count: 3
timestamp: 2026-07-11T18-46-52Z
slug: src-app-page-tsx
---
# $impeccable critique — Valdete Costuras (site inteiro)

Target: `src/app/page.tsx` (homepage que compõe todas as seções). Register: brand.

## Design Health Score — 33/40 (Good)

| # | Heurística | Score | Issue-chave |
|---|-----------|:---:|-------------|
| 1 | Visibilidade de status | 3 | Nav sem estado de seção ativa; a linha ativa dos Serviços é a única pista de estado |
| 2 | Match com o mundo real | 4 | pt-BR local e direto ("Traga a peça", "Orçamento na hora"), sem jargão |
| 3 | Controle e liberdade | 3 | CTAs não sinalizam que abrem o WhatsApp/saem do site; sem voltar-ao-topo; mapa atrás de toggle |
| 4 | Consistência | 4 | Botões, ícone WhatsApp, monograma-V e traço-costura consistentes |
| 5 | Prevenção de erro | 3 | `whatsappUrl` retorna `#` se o número não estiver setado → clique morto silencioso, sem fallback `tel:` |
| 6 | Reconhecer &gt; lembrar | 4 | Tudo visível; navbar sticky + WhatsApp flutuante; footer repete endereço/horário |
| 7 | Flexibilidade/eficiência | 3 | Muitos pontos de entrada p/ WhatsApp (bom); a interação dos Serviços adiciona movimento que não encurta o caminho |
| 8 | Estético/minimalista | 4 | Forte restrição; ocasionalmente tende ao vazio (lado direito do hero) |
| 9 | Recuperação de erro | 3 | Empty-states graciosos (convite de depoimento, foto no lugar do mapa); superfície limitada |
| 10 | Ajuda e documentação | 2 | Sem FAQ, sem preço, sem prazo — tudo remete a "pergunte no WhatsApp" |
| **Total** | | **33/40** | **Good** — segurado por #10 (preço/ajuda) e #3/#5 (sair do site / fallback de falha) |

## Anti-Patterns Verdict — **PASS** (não parece feito por IA)

**Avaliação LLM (design):** design editorial e considerado, que evita a maior parte da lista de banimento. Serviços é uma lista scroll-spy + foto sticky (não grade de cartões idênticos); "Por que a Valdete" é uma ficha/ledger (não cartões); sem eyebrow minúsculo em toda seção (só Empresas usa um, proposital); sem gradient text, glassmorphism, hero-metric ou side-stripe; o linho é a cor de marca documentada, não cream default. Pontos levemente template: **Depoimentos 3+1** (um card órfão) e **duas sequências numeradas paralelas** (índices `01–06` dos Serviços + `1-2-3` do Como funciona). Nenhum é grave.

**Scan determinístico (detector):** 2 achados, ambos `bounce-easing` — a curva de overshoot `cubic-bezier(0.34, 1.4, 0.5, 1)` em `globals.css:307` (stitch-node) e `:430` (rg-knot). É o "assentar do nó" (overshoot mínimo, 1.4) escolhido de propósito no DEC-015. Contra a regra literal "no bounce", mas sutilíssimo — P3.

**Overlays visuais:** injeção do overlay ao vivo não realizada; usei capturas Playwright (desktop 1440 + mobile 390, full-page + seções) como evidência de navegador (fallback).

**Onde A e B concordam:** o conteúdo abaixo da dobra (Localização + CTA final) inicia em `opacity:0` e depende do IntersectionObserver — nas capturas rápidas essas duas seções aparecem **em branco**. O detector achou o easing que a revisão de design não viu; a revisão de design achou a fragilidade de motion que o detector não mede. Falso positivo: a "caixa vazia" no footer é o mini-mapa `iframe` lazy (não carregou na captura), não algo inacabado.

## Overall Impression
Uma landing de marca coesa e madura que lê como um ateliê real, não como template — a peça central (Serviços scroll-spy + deep-links de WhatsApp pré-preenchidos) é genuinamente boa. O maior risco não é estético e sim estrutural: **os dois elementos que fecham a venda local — o CTA final "fale agora" e o endereço — dependem de uma animação de scroll disparar.** A maior oportunidade: preencher o vazio do hero com uma foto real da Valdete/ateliê.

## What's Working
1. **Serviços (`ServicesShowcase.tsx`)** — lista scroll-spy dirigindo foto sticky em crossfade, cada linha um link que converte com mensagem por serviço. É a seção que faz o site inteiro parecer humano.
2. **Deep-links de WhatsApp pré-preenchidos (`lib/whatsapp.ts`)** — geral, por serviço, empresas e depoimento. Remove o atrito "o que eu escrevo" exatamente na conversão.
3. **Disciplina de marca** — sem spam de eyebrow, sem hero-metric, Pilares em ledger e não cartões, um só vermelho sobre linho, monograma-V/traço-costura consistentes. Coeso como marca, não como template.

## Priority Issues

**[P1] O clímax de conversão e o endereço dependem de animação disparar.** CTA final ("Precisa de um ajuste? Fale agora.") e o bloco de endereço/horário da Localização começam em `opacity:0` e dependem do IntersectionObserver (exatamente por isso aparecem em branco nas capturas). As duas coisas que fecham uma venda local não deveriam esperar um scroll-reveal; em aparelho lento/aba em segundo plano leem vazio no momento decisivo. **Fix:** renderizar o texto+botão do CTA final e o bloco de endereço visíveis por padrão; animar só o decorativo (o selo do monograma, a costura). Mitigações existentes (fallback no-JS/reduced-motion, clamp de threshold do DEC-018) reduzem, mas não eliminam. → `$impeccable animate`

**[P1] Metade direita do hero é espaço morto — falta uma foto real.** O topo à direita é um monograma vermelho sutil sobre linho vazio (`Hero.tsx`, `heroImage: null` / CNT-009). O valor de uma costureira é *craft visível*; um vazio subvende. O código já suporta: soltar uma foto real da Valdete/mãos/ateliê em `/public/hero-atelie.jpg` e setar `heroImage`. Mudança isolada de maior alavancagem. → conteúdo (CNT-009) / `$impeccable layout`

**[P1/negócio] Sem preço nem prazo em lugar nenhum.** Todo caminho é "orçamento na hora"; o visitante só descobre custo/tempo entrando no chat. O público B2C (bainhas, reparos simples) é sensível a preço e prazo; um número pré-qualifica e converte o hesitante. É também uma escolha de negócio deliberada (sem formulário). **Fix:** faixa leve "a partir de" e/ou prazo típico ("bainha simples: 1–2 dias"). → `$impeccable clarify` (depende de decisão do dono)

**[P2] Lacuna de ajuda/FAQ (Nielsen #10 = 2).** Sem respostas às perguntas óbvias (quanto tempo, faz jeans/couro/vestido de noiva, pagamento, precisa agendar). Um FAQ de 4–6 itens perto de Localização/CTA final captura o hesitante e eleva confiança. → `$impeccable clarify`

**[P2] Ergonomia de info local para o público 55+.** Endereço/horário em `text-sm` (14px) e o mapa escondido atrás do toggle "Ver no mapa". Quem chega do Google Maps no celular costuma ser mais velho e quer o endereço de relance + um toque para rota. **Fix:** subir endereço/horário para tamanho base, mantê-los sempre visíveis (ver P1), e um "Como chegar" de um toque usando o `mapsUrl` existente. → `$impeccable adapt`

## Persona Red Flags
- **Jordan (primeira vez):** hero direito vazio pode ler como "ainda carregando"; sem preço, não mede se cabe no bolso sem abrir o chat; "Empresas" no topo pode deixá-lo em dúvida se o site é pra ele.
- **Riley (stress-tester):** Localização + CTA final reveal-gated (as capturas literalmente mostram em branco) são o alvo dele — usuários com JT normal veem pop-in no pior momento. E: se o número do WhatsApp ficar sem setar, `whatsappUrl` retorna `#` e **todo CTA vira clique morto silencioso** sem fallback `tel:`.
- **Casey (mobile distraído):** bem servido — coluna única limpa, CTA grande, WhatsApp flutuante persistente. Risco: 8 seções é longo; o bloco escuro de Empresas no meio pode ler por um instante como outro site.
- **Dona Marli (58, Maps → celular, "faz bainha? onde fica?"):** **bainha = vitória clara** (primeiro serviço, com foto). **Onde = em risco:** o endereço é reveal-gated (P1); a rede de segurança é o endereço no footer, que é pequeno (P2). O "quanto custa uma bainha?" fica sem resposta (P1/negócio).

## Minor Observations
- Depoimentos 3+1 deixa um card órfão; 2×2 ou 4-em-linha lê mais intencional.
- CTAs não dão pista de que abrem o WhatsApp / saem do site.
- Overshoot de easing dos nós (`globals.css:307,430`) contra a regra "no bounce" — sutil e documentado (DEC-015); manter ou suavizar para ease-out puro.
- Bloco de Empresas é forte, mas é um desvio B2C no meio; posição atual defensável por ritmo.

## Questions to Consider
1. O valor de uma costureira é craft *visível* — por que o imóvel nobre do hero é um monograma tênue no vazio enquanto um slot de foto real espera ocioso no código?
2. "Orçamento na hora" é feature genuína ou um jeito de não publicar os números que de fato pré-qualificam e convertem o cliente ansioso por preço?
3. Os dois elementos que fecham a venda — o CTA final e o endereço — deveriam depender de um IntersectionObserver disparar?
