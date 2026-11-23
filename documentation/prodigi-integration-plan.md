# Preparação Técnica Prodigi (Print API v5 — Sandbox) & Decisões Pendentes para Placas QR

> **Estado atual:** Migrado para **Prodigi Print API v5** (versão oficial recomendada pela Prodigi para novas integrações), 100% **server-side**, **sandbox-only** e **desativado por defeito** (`PRODIGI_ENABLED=false`).  
> **Restrições respeitadas:** Nenhum SKU foi inventado (apenas SKUs candidatos do catálogo público oficial Prodigi, com dados de Portugal/áreas/preços assinalados como **PENDENTE** até verificação na conta Sandbox); nenhuma encomenda real ou pagamento foi ativado; nenhuma chave foi guardada no código ou repositório; Stripe live, Production, DNS e base de dados não foram alterados.

---

## 1. Migração de v4 para Prodigi Print API v5

A revisão da documentação oficial atual da Prodigi confirmou que a **Print API v5** é a versão recomendada para novas integrações. A preparação foi migrada de v4 para v5 pelos seguintes motivos técnicos:

- **Base URL única:** `https://api.prodigi.com/v5` (sem subdomínios separados).
- **Segurança por prefixo de chave (`X-API-Key`):** em v5, o ambiente é determinado pelo prefixo da chave (`sandbox_...` vs `live_...`). O cliente [`src/lib/prodigi/client.ts`](../src/lib/prodigi/client.ts) exige explicitamente `PRODIGI_ENV=sandbox` **e** `apiKey.startsWith("sandbox_")`, bloqueando (`403`) qualquer tentativa acidental com chave `live_`.
- **Modelo *draft-first* (`POST /v5/orders`):** permite criar encomendas em rascunho (`submit: false` por defeito), validar custos/itens e só submeter (`submit: true`) quando pretendido.
- **Schema v5 atualizado:** `POST /v5/quotes/order`, `quantity` (substitui `copies`), métodos de envio em minúsculas (`budget`, `standard`, `express`, `overnight`) e cabeçalho oficial `Idempotency-Key`.
- **Webhooks v5 com assinatura HMAC:** subscrições configuradas no painel Prodigi com assinatura criptográfica sobre o corpo bruto (*raw body*), substituindo o `callbackUrl` simples de v4.

### Ficheiros e endpoints isolados
| Ficheiro | Método / Função | Proteções & Papel | Estado por defeito |
| :--- | :--- | :--- | :--- |
| `src/lib/prodigi/client.ts` | `getProdigiConfigStatus`, `getProdigiProduct`, `createProdigiQuote`, `createProdigiSandboxOrder`, `getProdigiOrder`, helpers de segurança | Cliente v5 (`https://api.prodigi.com/v5`), bloqueio estrito a `sandbox_`, `hasValidSameOrigin`, rate limit provisório, leitura em stream ≤ 12 KB, verificação HMAC | **Desativado (`sandboxOnly`)** |
| `src/app/api/prodigi/status/route.ts` | `GET /api/prodigi/status` | Diagnóstico apenas de leitura (`apiVersion: "v5"`, flags booleanas; nunca expõe chaves) | Ativo (read-only) |
| `src/app/api/prodigi/quote/route.ts` | `POST /api/prodigi/quote` | Rejeita pedidos sem `Origin`/`Referer` válido (`403`), rate limit provisório (`15 req / 10 min` por IP fiável), limite 12 KB em stream, proxy para `POST /v5/quotes/order` | **Desativado (`503`)** |
| `src/app/api/prodigi/orders/route.ts` | `POST /api/prodigi/orders` | Rejeita pedidos sem `Origin`/`Referer` válido (`403`), rate limit provisório (`5 req / 10 min`), `Idempotency-Key` obrigatório fornecido pelo chamador, *draft-first* (`submit: false` por defeito), bloqueado a `sandbox_` | **Desativado (`503`)** |
| `src/app/api/webhooks/prodigi/route.ts` | `POST /api/webhooks/prodigi` | **Sem segredos em query string**; verifica assinatura HMAC-SHA256 (`webhook-signature` / `x-prodigi-signature`) sobre o corpo bruto + janela de replay (`webhook-timestamp` ≤ 5 min), sem escrita em BD | **Desativado (`503`)** |

---

## 2. Segurança dos Endpoints & Estratégia de Idempotência

### A. Segurança aplicada e requisitos pré-produção
1. **Origem válida obrigatória (`hasValidSameOrigin`):** pedidos a `/api/prodigi/quote` e `/api/prodigi/orders` sem cabeçalho `Origin` nem `Referer` correspondente ao host atual são rejeitados com `403`.
2. **Proteção contra abuso (provisória em memória):** rate limiting limitado (`Map` com teto de 500 IPs, extraindo IP via `x-vercel-forwarded-for` → `x-real-ip` → `cf-connecting-ip` → último IP de `x-forwarded-for`): `15 req / 10 min` em `/quote` e `5 req / 10 min` em `/orders`. **Antes de produção:** substituir por rate limit distribuído (ex.: Upstash/Redis) e exigir sessão autenticada/interna (orquestrada após pagamento Stripe confirmado) em `/api/prodigi/orders`.
3. **Autenticação oficial de callbacks (`/api/webhooks/prodigi`):**
   - Removido qualquer uso de segredo na query string (`?token=`).
   - Implementada verificação HMAC-SHA256 sobre os bytes brutos do pedido (`webhook-signature` / `x-prodigi-signature` com `crypto.timingSafeEqual`, compatível com *Standard Webhooks* `v1,<base64>` e `sha256=<hex>`).
   - **Pendente de confirmação no painel Prodigi v5:** confirmar o cabeçalho exato e o formato do segredo de assinatura gerados ao criar a subscrição de webhook na conta Prodigi Sandbox. Como alternativa sem webhook, o estado pode ser consultado diretamente por polling server-side via `GET /v5/orders/{orderId}`.

### B. Estratégia de Idempotência (Retries seguros sem bloquear compras futuras)
- **Problema corrigido:** gerar um hash determinístico apenas sobre `{ merchantReference, items, postal }` podia bloquear compras futuras idênticas do mesmo cliente se o chamador omitisse a chave.
- **Regra implementada:** `/api/prodigi/orders` **exige** que o chamador envie um `Idempotency-Key` único por **tentativa de compra/encomenda** (ex.: `order_<internalOrderId>_<paymentIntentId>` ou UUID gerado ao criar a encomenda interna, com 16–128 caracteres `[A-Za-z0-9_-]`), encaminhado no cabeçalho HTTP oficial `Idempotency-Key` da Prodigi v5.
- **Resultado:**
  - **Retries de rede da mesma encomenda** reutilizam a mesma `Idempotency-Key` → deduplicação garantida pela Prodigi (sem impressão duplicada).
  - **Nova compra futura dos mesmos artigos pelo mesmo cliente** recebe uma nova `Idempotency-Key` única → nunca fica bloqueada.

---

## 3. Catálogo Oficial Prodigi — SKUs Candidatos a Placas QR & Dados Pendentes para Portugal

Consulta ao catálogo público oficial da Prodigi (sem inventar valores não confirmados na conta):

| Categoria Candidata (Prodigi) | Material & Descrição Oficial | SKUs Candidatos Públicos (Catálogo Prodigi) | Tamanhos / Formatos Públicos | Áreas de Impressão (`printArea` / px / bleed) | Disponibilidade & Envio para Portugal (`PT`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Acrylic Prisms** *(blocos de mesa independentes — principal candidato)* | Bloco de acrílico sólido com 1" (~25 mm) de espessura, arestas polidas a diamante, impressão Giclée (fundo completo ou transparente) | Prefixo `GLOBAL-MOU-PRISM`:<br>• `GLOBAL-MOU-PRISM-4X6`<br>• `GLOBAL-MOU-PRISM-6X6`<br>• `GLOBAL-MOU-PRISM-8X8`<br>• `GLOBAL-MOU-PRISM-5X5-TRANS`<br>• `GLOBAL-MOU-PRISM-5X7-TRANS` | `4×4"`, `5×5"`, `4×6"`, `5×7"`, `6×6"`, `6×8"`, `8×8"` *(confirmar códigos exatos de `4×4"` e `6×8"` via API)* | **PENDENTE** *(consultar `GET /v5/products/{sku}` na conta Sandbox)* | Catálogo indica produção em rede UE/UK/US; **PENDENTE** confirmar laboratório exato para `PT`, métodos (`budget`/`standard`/`express`/`overnight`), custos, IVA/alfândega e prazos via `POST /v5/quotes/order` |
| **Gallery Boards with Wooden Stand** *(alternativa com base de carvalho)* | Cartão rígido de arte (Giclée) com suporte de mesa em carvalho maciço oleado (ou suportes avulso) | Prefixo `GLOBAL-BOARD` (ex.: `GLOBAL-BOARD-4X6-STAND-1`) + suportes `STAND-1` (base 9 cm) e `STAND-2` (base 16,5 cm; ranhura ~3 mm) | Ex.: `4×6"` *(confirmar todos os tamanhos com suporte via API)* | **PENDENTE** *(consultar `GET /v5/products/{sku}` na conta Sandbox)* | **PENDENTE** confirmar disponibilidade de envio para `PT`, custos, IVA e prazos via `POST /v5/quotes/order` |
| **Metal Prints (Alumínio / Dibond)** | Painéis metálicos concebidos como arte de parede (subestrutura traseira suspensa) | *Não aplicável como placa de mesa padrão sem suporte externo* | — | — | Descartado para placas de mesa sem fornecedor de suporte compatível |

---

## 4. Revisão do Catálogo, Carrinho e Checkout + Pendências Pré-Lançamento

1. **Lacunas no catálogo/checkout atuais (`src/data/catalog.ts`, `src/lib/billing/cart-calculator.ts`, `src/app/checkout/page.tsx`):**
   - Os itens `qr-placa-mesa`, `qr-pack-5`, `qr-pack-10` e `qr-design-placas` não têm ainda `fulfillmentType: "physical-prodigi"`, mapeamento `prodigiSku` validado nem validação de margem face a custos reais Prodigi.
   - O checkout recolhe apenas morada de faturação em texto livre — falta morada de entrega estruturada (`line1`, `townOrCity`, `postalOrZipCode`, `countryCode`), cotação de portes e personalização da arte final QR por linha.
2. **Checklist pendente antes de ativar Sandbox / Produção:**
   - [ ] Criar conta **Prodigi Sandbox** e configurar apenas em **Preview** na Vercel: `PRODIGI_ENABLED=true`, `PRODIGI_ENV=sandbox`, `PRODIGI_API_KEY=sandbox_...` e `PRODIGI_WEBHOOK_SECRET=...`.
   - [ ] Consultar `GET /v5/products/{sku}` para os SKUs candidatos acima e preencher `printArea`, resolução (px / 300 DPI) e *bleed*.
   - [ ] Executar `POST /v5/quotes/order` com destino `PT` (`copies/quantity` = 1, 5, 10) para confirmar custos unitários, portes (`budget`/`standard`/`express`), IVA/IOSS, laboratório UE e prazos reais.
   - [ ] Confirmar no painel Prodigi v5 o cabeçalho exato de assinatura de webhook (ou adotar polling `GET /v5/orders/{id}`).
   - [ ] Validar pipeline de geração de arte final (PNG/PDF 300 DPI em URL HTTPS pública) e encomendar **amostra física real** para testar leitura do QR Code.
   - [ ] Definir política de devoluções/reimpressões para produtos personalizados e aprovar preços finais antes de qualquer ativação em produção.
