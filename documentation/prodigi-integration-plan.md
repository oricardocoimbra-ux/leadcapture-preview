# Preparação Técnica Prodigi (Print API v5 — Sandbox) & Decisões Pendentes para Placas QR

> **Estado atual:** Preparado para **Prodigi Print API v5** (versão oficial recomendada para novas integrações), 100% **server-side**, **sandbox-only** e **desativado por defeito** (`PRODIGI_ENABLED=false`).  
> **Restrições respeitadas:** Nenhum SKU foi inventado (apenas SKUs candidatos do catálogo público oficial Prodigi, com dados de Portugal/áreas/preços assinalados como **PENDENTE** até verificação na conta Sandbox); nenhuma encomenda real ou pagamento foi ativado; nenhuma chave foi guardada no código ou repositório; Stripe live, Production, DNS e base de dados não foram alterados.

---

## 1. Arquitetura Prodigi Print API v5

A integração usa **Prodigi Print API v5** (`https://api.prodigi.com/v5`):

- **Base URL única:** `https://api.prodigi.com/v5`.
- **Segurança por prefixo de chave (`X-API-Key`):** em v5, o ambiente é determinado pelo prefixo da chave (`sandbox_...` vs `live_...`). O cliente [`src/lib/prodigi/client.ts`](../src/lib/prodigi/client.ts) exige explicitamente `PRODIGI_ENV=sandbox` **e** `apiKey.startsWith("sandbox_")`, bloqueando (`403`) qualquer tentativa acidental com chave `live_`.
- **Modelo *draft-first* (`POST /v5/orders`):** cria encomendas em rascunho (`submit: false` por defeito) ou submetidas em sandbox (`submit: true`).
- **Schema v5 suportado:** `POST /v5/quotes/order`, `quantity`, métodos de envio oficiais em minúsculas (`budget`, `standard`, `standardplus`, `express`, `overnight`) e cabeçalho oficial `Idempotency-Key`.
- **Acompanhamento de estado (Polling oficial v5, sem subscrições de webhooks):** a documentação oficial confirma que a **v5 não suporta subscrições de webhooks** (suporta apenas callbacks por encomenda no formato v4, sem cabeçalhos HMAC de subscrição). Por isso:
  - O endpoint `/api/webhooks/prodigi` foi **removido** nesta fase para não manter uma rota pública baseada em suposições não documentadas.
  - O acompanhamento de estado oficial nesta arquitetura é feito por **polling server-side via `GET /v5/orders/{id}`** (`getProdigiOrder` em `src/lib/prodigi/client.ts`).
  - Se numa fase futura forem ativados callbacks por encomenda no formato v4 (`callbackUrl`), o callback deverá ser tratado exclusivamente como **notificação não fidedigna** (*trigger*), obrigando o servidor a confirmar o estado autoritativo diretamente em `GET /v5/orders/{id}` antes de executar qualquer ação.

### Ficheiros e endpoints isolados
| Ficheiro | Método / Função | Proteções & Papel | Estado por defeito |
| :--- | :--- | :--- | :--- |
| `src/lib/prodigi/client.ts` | `getProdigiConfigStatus`, `getProdigiProduct`, `createProdigiQuote`, `createProdigiSandboxOrder`, `getProdigiOrder`, helpers de segurança | Cliente v5 (`https://api.prodigi.com/v5`), bloqueio estrito a `sandbox_`, métodos `budget`/`standard`/`standardplus`/`express`/`overnight`, `hasValidSameOrigin`, rate limit provisório, leitura em stream ≤ 12 KB | **Desativado (`sandboxOnly`)** |
| `src/app/api/prodigi/status/route.ts` | `GET /api/prodigi/status` | Diagnóstico apenas de leitura (`apiVersion: "v5"`, flags booleanas; nunca expõe chaves) | Ativo (read-only) |
| `src/app/api/prodigi/quote/route.ts` | `POST /api/prodigi/quote` | Rejeita pedidos sem `Origin`/`Referer` válido (`403`), rate limit provisório (`15 req / 10 min` por IP fiável), limite 12 KB em stream, proxy para `POST /v5/quotes/order` | **Desativado (`503`)** |
| `src/app/api/prodigi/orders/route.ts` | `POST /api/prodigi/orders` | Rejeita pedidos sem `Origin`/`Referer` válido (`403`), rate limit provisório (`5 req / 10 min`), `Idempotency-Key` obrigatório fornecido pelo chamador, *draft-first* (`submit: false` por defeito), bloqueado a `sandbox_` | **Desativado (`503`)** |

---

## 2. Segurança dos Endpoints & Estratégia de Idempotência

### A. Segurança aplicada e requisitos pré-produção
1. **Origem válida obrigatória (`hasValidSameOrigin`):** pedidos a `/api/prodigi/quote` e `/api/prodigi/orders` sem cabeçalho `Origin` nem `Referer` correspondente ao host atual são rejeitados com `403`.
2. **Proteção contra abuso (provisória em memória):** rate limiting limitado (`Map` com teto de 500 IPs, extraindo IP via `x-vercel-forwarded-for` → `x-real-ip` → `cf-connecting-ip` → último IP de `x-forwarded-for`): `15 req / 10 min` em `/quote` e `5 req / 10 min` em `/orders`. **Antes de produção:** substituir por rate limit distribuído (ex.: Upstash/Redis) e exigir sessão autenticada/interna (orquestrada após pagamento Stripe confirmado) em `/api/prodigi/orders`.
3. **Sem endpoint público de callback nesta fase:** estado de encomendas acompanhado por polling server-side em `GET /v5/orders/{id}`.

### B. Estratégia de Idempotência (Retries seguros sem bloquear compras futuras)
- `/api/prodigi/orders` **exige** que o chamador envie um `Idempotency-Key` único por **tentativa de compra/encomenda** (ex.: `order_<internalOrderId>_<paymentIntentId>` ou UUID gerado ao criar a encomenda interna, com 16–128 caracteres `[A-Za-z0-9_-]`), encaminhado no cabeçalho HTTP oficial `Idempotency-Key` da Prodigi v5.
- **Retries de rede da mesma encomenda** reutilizam a mesma `Idempotency-Key` → deduplicação garantida pela Prodigi.
- **Nova compra futura dos mesmos artigos pelo mesmo cliente** recebe uma nova `Idempotency-Key` única → nunca fica bloqueada.

---

## 3. Catálogo Oficial Prodigi — SKUs Candidatos a Placas QR & Dados Pendentes para Portugal

Consulta ao catálogo público oficial da Prodigi (sem inventar valores não confirmados na conta):

| Categoria Candidata (Prodigi) | Material & Descrição Oficial | SKUs Candidatos Públicos (Catálogo Prodigi) | Tamanhos / Formatos Públicos | Áreas de Impressão (`printArea` / px / bleed) | Disponibilidade & Envio para Portugal (`PT`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Acrylic Prisms** *(blocos de mesa independentes — principal candidato)* | Bloco de acrílico sólido com 1" (~25 mm) de espessura, arestas polidas a diamante, impressão Giclée (fundo completo ou transparente) | Prefixo `GLOBAL-MOU-PRISM`:<br>• `GLOBAL-MOU-PRISM-4X6`<br>• `GLOBAL-MOU-PRISM-6X6`<br>• `GLOBAL-MOU-PRISM-8X8`<br>• `GLOBAL-MOU-PRISM-5X5-TRANS`<br>• `GLOBAL-MOU-PRISM-5X7-TRANS` | `4×4"`, `5×5"`, `4×6"`, `5×7"`, `6×6"`, `6×8"`, `8×8"` *(confirmar códigos exatos de `4×4"` e `6×8"` via API)* | **PENDENTE** *(consultar `GET /v5/products/{sku}` na conta Sandbox)* | Catálogo indica produção em rede UE/UK/US; **PENDENTE** confirmar laboratório exato para `PT`, métodos (`budget`/`standard`/`standardplus`/`express`/`overnight`), custos, IVA/alfândega e prazos via `POST /v5/quotes/order` |
| **Gallery Boards with Wooden Stand** *(alternativa com base de carvalho)* | Cartão rígido de arte (Giclée) com suporte de mesa em carvalho maciço oleado (ou suportes avulso) | Prefixo `GLOBAL-BOARD` (ex.: `GLOBAL-BOARD-4X6-STAND-1`) + suportes `STAND-1` (base 9 cm) e `STAND-2` (base 16,5 cm; ranhura ~3 mm) | Ex.: `4×6"` *(confirmar todos os tamanhos com suporte via API)* | **PENDENTE** *(consultar `GET /v5/products/{sku}` na conta Sandbox)* | **PENDENTE** confirmar disponibilidade de envio para `PT`, custos, IVA e prazos via `POST /v5/quotes/order` |
| **Metal Prints (Alumínio / Dibond)** | Painéis metálicos concebidos como arte de parede (subestrutura traseira suspensa) | *Não aplicável como placa de mesa padrão sem suporte externo* | — | — | Descartado para placas de mesa sem fornecedor de suporte compatível |

---

## 4. Revisão do Catálogo, Carrinho e Checkout + Pendências Pré-Lançamento

1. **Lacunas no catálogo/checkout atuais (`src/data/catalog.ts`, `src/lib/billing/cart-calculator.ts`, `src/app/checkout/page.tsx`):**
   - Os itens `qr-placa-mesa`, `qr-pack-5`, `qr-pack-10` e `qr-design-placas` não têm ainda `fulfillmentType: "physical-prodigi"`, mapeamento `prodigiSku` validado nem validação de margem face a custos reais Prodigi.
   - O checkout recolhe apenas morada de faturação em texto livre — falta morada de entrega estruturada (`line1`, `townOrCity`, `postalOrZipCode`, `countryCode`), cotação de portes e personalização da arte final QR por linha.
2. **Checklist pendente antes de ativar Sandbox / Produção:**
   - [ ] Criar conta **Prodigi Sandbox** e configurar apenas em **Preview** na Vercel: `PRODIGI_ENABLED=true`, `PRODIGI_ENV=sandbox` e `PRODIGI_API_KEY=sandbox_...`.
   - [ ] Consultar `GET /v5/products/{sku}` para os SKUs candidatos acima e preencher `printArea`, resolução (px / 300 DPI) e *bleed*.
   - [ ] Executar `POST /v5/quotes/order` com destino `PT` (`quantity` = 1, 5, 10) para confirmar custos unitários, portes (`budget`/`standard`/`standardplus`/`express`/`overnight`), IVA/IOSS, laboratório UE e prazos reais.
   - [ ] Implementar job/endpoint interno de polling (`GET /v5/orders/{id}`) quando existir persistência de encomendas em base de dados (e, caso se adicione `callbackUrl` v4 no futuro, tratar o callback apenas como trigger e reconfirmar sempre via `GET /v5/orders/{id}`).
   - [ ] Validar pipeline de geração de arte final (PNG/PDF 300 DPI em URL HTTPS pública) e encomendar **amostra física real** para testar leitura do QR Code.
   - [ ] Definir política de devoluções/reimpressões para produtos personalizados e aprovar preços finais antes de qualquer ativação em produção.
