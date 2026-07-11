---
target: site inteiro (re-run pos DEC-021)
total_score: 30
p0_count: 0
p1_count: 1
timestamp: 2026-07-11T19-14-13Z
slug: src-app-page-tsx
---
# $impeccable critique (re-run) — Valdete Costuras (site inteiro)

Target: `src/app/page.tsx`. Register: brand. Segunda passada após DEC-021 (reveal-gating, ergonomia, depoimentos 2×2, selo do hero).

## Design Health Score — 30/40 (Good)

| # | Heurística | Score | Issue-chave |
|---|-----------|:---:|-------------|
| 1 | Visibilidade de status | 3 | Scroll-spy dá feedback bom; foto sticky mostra 1 de 6 por vez |
| 2 | Match com o mundo real | 4 | pt-BR nativo e humano — melhor da casa |
| 3 | Controle e liberdade | 3 | Sem armadilhas, mas WhatsApp é o único canal (sem `tel:`, sem mapa embutido por padrão) |
| 4 | Consistência | 3 | Vermelho consistente; rótulos de CTA variam (4 verbos p/ 1 ação) |
| 5 | Prevenção de erro | 3 | Sem formulário = baixo risco |
| 6 | Reconhecer > lembrar | 3 | Tudo numa página, rotulado; nav de 4 âncoras |
| 7 | Flexibilidade/eficiência | 3 | Nav sticky + WhatsApp flutuante; deep-link por serviço |
| 8 | Estético/minimalista | 3 | Limpo e calmo, mas **o painel direito do hero lê como caixa vazia no primeiro paint** |
| 9 | Recuperação de erro | 3 | Empty-states graciosos; superfície limitada |
| 10 | Ajuda e documentação | 2 | Só o "Como funciona"; sem preço, sem FAQ, sem "faz jeans/couro/noiva?" |

**Total 30/40 — "Good".** Igual/na faixa do run anterior (33): as correções antigas seguraram, mas esta passada, com lente independente, trouxe à tona o primeiro-paint do hero e o canal único de contato.

## Anti-Patterns Verdict — **PASS** (não parece feito por IA)
- **Design (A):** autoral, quente, restrito. Serviços scroll-spy, Pilares em ledger (definition-list) e copy pt-BR nativa são escolhas não-template. Beira o genérico só no "Como funciona" (3 discos numerados) e no glow rosé do hero (atmosfera decorativa, sutil).
- **Detector (B):** 2 achados `bounce-easing` (`globals.css:307,430`) — o overshoot dos nós de costura (DEC-015), mantido de propósito. Nenhum tell novo das mudanças recentes.
- **A×B — hero adjudicado com evidência:** capturei o hero em 2 tempos. Em **400ms** (primeiro paint, motion normal) o selo é uma **moldura quase vazia** (só o anel pontilhado + "V" começando); o conteúdo completo (wordmark, slogan aos 1700ms) só aparece ~2s depois. Em **reduced-motion** o selo é 100% visível na hora. Então o achado P1 da A é **real**, não artefato de thumbnail: o estado default (com motion) do selo é invisível até a animação terminar — exatamente o que a regra "reveals devem realçar um default já visível" proíbe. A moldura que adicionei (DEC-021) piorou isso: uma caixa com borda vazia lê como "quebrado".

## O que está funcionando (confirmado)
1. **Pilares em ledger** ("Por que a Valdete") — a decisão de design mais confiante da página; editorial e anti-slop.
2. **Voz da copy** — pt-BR quente e nativo ("Traga a peça", "como se fosse feito pra mim"). É onde a "costura artesanal" vive.
3. **Mecânica de conversão** — cada linha de serviço deep-linka uma mensagem de WhatsApp já contextualizada (`waServiceMessage`). Craft real.
4. **Correções do DEC-021 landaram:** CTA final + endereço renderizam sem depender de reveal; Depoimentos 2×2 equilibrado; endereço maior.

## Priority Issues
**[P1] Primeiro paint do hero = moldura vazia (~2s).** O selo (monograma+wordmark+slogan) começa em opacity 0 e faz sewing-in até ~2.2s (slogan aos 1700ms); com a borda que adicionei, lê como caixa quebrada no ponto #1 de confiança. Reduced-motion está ok. **Fix:** estado de repouso visível por padrão — animação como realce leve; encurtar/eliminar o atraso do slogan; ou melhor ainda, **foto real da Valdete/mãos** (`heroImage` ainda null, CNT-009). *(regressão minha do DEC-021.)* → `$impeccable animate`

**[P2] WhatsApp é o único canal — sem telefone.** Não há `tel:` em lugar nenhum; o cliente local mais velho e de maior intenção (Dona Marli, 58) muitas vezes prefere **ligar**. O número do WhatsApp já é um telefone — um `tel:` na Localização/footer é trivial e inclui essa fatia. → `$impeccable clarify`/`adapt`

**[P3] Proliferação de rótulos de CTA.** "Falar no WhatsApp" / "Pedir orçamento" / "Orçamento para empresas" / "Deixar meu depoimento" — 4 verbos p/ 1 ação. Padronizar o B2C num verbo; manter o de Empresas distinto. → `$impeccable clarify`

**[P3] Depoimentos leem como afirmação, não prova.** 2×2, só primeiros nomes, sem fonte. Um selo "avaliações do Google" ou "cliente há X anos" daria credibilidade — mas precisa de dado real (não invento). → decisão de conteúdo

**[P3] Serviços = 6 tiles, 1 foto por vez no desktop.** O conjunto não é apreensível de relance. Considerar tira de thumbnails ou capar em 4–5 + "e mais". → `$impeccable layout`

## Persona Red Flags
- **Jordan (1ª vez):** sem preço; "orçamento sem compromisso" ameniza, mas sai sem saber se bainha é R$15 ou R$50.
- **Riley (stress):** clica o painel direito do hero e vê caixa vazia (P1); procura telefone e não acha (P2) → conclui "meio pronto".
- **Casey (mobile):** **melhor servido** — empilha limpo, foto inline por serviço, CTAs no polegar. Risco: página longa.
- **Dona Marli (58, Maps→celular):** "faz bainha?" **sim, resposta imediata** (1º serviço, com foto). "onde fica?" endereço presente e maior agora, mas **sem mapa visível e sem ligar** — ela é a cliente ideal e é a que mais trabalha (P2).

## Minor
Chips do hero repetem o que o subtítulo já diz; footer é o 2º lugar do horário sem nunca aparecer com destaque; verificar FloatingWhatsApp fixa no scroll; overshoot dos nós mantido (DEC-015).

## Questions to Consider
1. Seus clientes de maior confiança cresceram **ligando** para negócios — por que não há telefone numa página feita pra converter exatamente eles?
2. O hero gasta metade da dobra num selo que renderiza quase vazio por ~2s — o que esse espaço ganha que uma foto das mãos da Valdete não ganharia dez vezes mais?
3. Se a página precisa provar "uma pessoa real e habilidosa vai cuidar da minha roupa" — **onde eu de fato vejo a Valdete?**
