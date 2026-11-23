# Preparação Técnica Prodigi (Print API v4 — Sandbox) & Decisões Pendentes para Placas QR

> **Estado atual:** Scaffolding server-side pronto em modo **sandbox-only** e **desativado por defeito** (`PRODIGI_ENABLED=false`).  
> **Restrições respeitadas:** Nenhum SKU, preço, porte, imposto ou prazo foi inventado; nenhuma encomenda real ou pagamento foi ativado; nenhuma chave foi guardada no código ou repositório; Stripe live, Production, DNS e base de dados não foram alterados.

---

## 1. Arquitetura Prodigi Print API v4 Preparada (Server-Side · Sandbox)

Baseada na documentação oficial da **Prodigi Print API v4**:
- **Sandbox Base URL:** `https://api.sandbox.prodigi.com/v4.0`
- **Autenticação:** cabeçalho HTTP `X-API-Key` enviado exclusivamente pelo servidor (`PRODIGI_API_KEY`).
- **Bloqueio de segurança pré-lançamento:** o cliente [`src/lib/prodigi/client.ts`](../src/lib/prodigi/client.ts) está bloqueado a `sandbox` (`sandboxOnly: true`) e recusa qualquer chamada externa enquanto `PRODIGI_ENABLED !== "true"` ou sem `PRODIGI_API_KEY` (`HTTP 503`). O modo `live` devolve `HTTP 403` até aprovação explícita de lançamento.

### Ficheiros e endpoints isolados criados
| Ficheiro | Método / Função | Papel | Estado por defeito |
| :--- | :--- | :--- | :--- |
| `src/lib/prodigi/client.ts` | `getProdigiConfigStatus`, `getProdigiProduct`, `createProdigiQuote`, `createProdigiSandboxOrder`, `getProdigiOrder` | Cliente tipado v4 (`X-API-Key`, `idempotencyKey`, `callbackUrl`, `recipient`, `items`, `assets`) | **Desativado (`sandboxOnly`)** |
| `src/app/api/prodigi/status/route.ts` | `GET /api/prodigi/status` | Diagnóstico apenas de leitura (booleans e ambiente; nunca expõe chaves) | Ativo (read-only) |
| `src/app/api/prodigi/quote/route.ts` | `POST /api/prodigi/quote` | Validação de entrada + proxy para `POST /v4.0/quotes` em Sandbox (mesma origem + limite 12 KB em stream) | **Desativado (`503`)** |
| `src/app/api/prodigi/orders/route.ts` | `POST /api/prodigi/orders` | Validação de morada/itens/assets HTTPS + proxy **exclusivamente Sandbox** para `POST /v4.0/orders` com `idempotencyKey` | **Desativado (`503`)** |
| `src/app/api/webhooks/prodigi/route.ts` | `POST /api/webhooks/prodigi` | Recetor de callbacks de estado de encomenda Prodigi com validação timing-safe do token (`PRODIGI_WEBHOOK_SECRET`), sem escrita em base de dados | **Desativado (`503`)** |

---

## 2. Revisão do Catálogo, Carrinho e Checkout Atuais

A auditoria a [`src/data/catalog.ts`](../src/data/catalog.ts), [`src/lib/billing/cart-calculator.ts`](../src/lib/billing/cart-calculator.ts), [`src/app/checkout/page.tsx`](../src/app/checkout/page.tsx) e [`src/app/api/checkout/session/route.ts`](../src/app/api/checkout/session/route.ts) identificou os seguintes pontos a ligar numa fase seguinte (após validar SKUs e custos):

1. **Catálogo (`src/data/catalog.ts` — categoria `qr-code-restauracao`):**
   - Existem atualmente `qr-placa-mesa` (19 €), `qr-pack-5` (79 €), `qr-pack-10` (139 €) e `qr-design-placas` (49 €), todos marcados como serviços genéricos `one-time`.
   - **Em falta no modelo de produto:** distinção explícita `fulfillmentType: "digital" | "physical-prodigi"`, mapeamento `prodigiSku` (após confirmação real no catálogo Prodigi para Portugal), dimensões/material e flags `requiresShippingAddress` / `requiresQrCustomization`.
   - **Validação económica pendente:** os valores atualmente listados no catálogo **ainda não foram confrontados** com o custo real de produção Prodigi + portes para Portugal + IVA + margem.
2. **Carrinho e Calculadora (`src/lib/billing/cart-calculator.ts`):**
   - Calcula apenas subtotais digitais (único, mensal, anual) sem separação de portes de envio, sem país/código postal de destino e sem metadados de personalização por linha (URL do QR, título, acabamento, ficheiro de arte final).
3. **Checkout (`src/app/checkout/page.tsx` e `src/app/api/checkout/session/route.ts`):**
   - Recolhe atualmente apenas **morada de faturação** (`billingAddress` em texto livre), não uma **morada de entrega estruturada** exigida pela Prodigi (`line1`, `line2`, `townOrCity`, `postalOrZipCode`, `countryCode`).
   - Ainda não integra cotação de envio (`POST /api/prodigi/quote`) nem gera/associa a arte final pronta para impressão antes de confirmar pagamento.
   - A ligação entre pagamento confirmado (`payment_intent.succeeded` em `src/app/api/webhooks/stripe/route.ts`) e submissão automática à Prodigi só deve ser ativada **depois** de existir base de dados persistente de encomendas, idempotência e validação em amostra física.

---

## 3. Decisões e Dados em Falta para Placas QR (Checklist Pré-Lançamento)

Antes de ligar preços finais, UI de personalização ou encomendas reais, falta decidir e confirmar:

### A. Produtos disponíveis em Portugal & SKUs Prodigi
- [ ] **SKUs oficiais Prodigi elegíveis para envio para Portugal (`PT`):** consultar `GET /v4.0/products/{sku}` no Sandbox após ativar a chave para confirmar exatamente quais os suportes disponíveis (ex.: blocos/placas acrílicas, placas de alumínio/metal, suportes de mesa ou cartões rígidos) e respetivos laboratórios de impressão (UE vs UK).
- [ ] **Verificação de laboratório UE / alfândega:** confirmar se os SKUs escolhidos são produzidos na União Europeia (ou se têm envio DDP/IOSS) para evitar taxas alfandegárias inesperadas ao cliente em Portugal.

### B. Materiais, formatos e acabamentos
- [ ] **Material principal e alternativas:** ex. acrílico preto/transparente, alumínio escovado, PVC rígido ou madeira com base de mesa.
- [ ] **Dimensões exatas e orientação:** ex. A6 (`105×148 mm`), A5 (`148×210 mm`), quadrado (`100×100 mm` / `150×150 mm`), incluindo se o suporte/base de mesa vem incluído no SKU Prodigi ou exige fornecedor separado.
- [ ] **Acabamento e identidade:** mate vs brilho, paleta preto e dourado, e especificação exata de `printArea`, DPI mínimo (300 DPI) e margem de corte (*bleed*) devolvidos pelo endpoint `/products/{sku}`.

### C. Quantidades e política comercial
- [ ] **Quantidades mínimas e escalões:** venda à unidade (1) vs packs (5, 10, 20+) — confirmar se a Prodigi aplica desconto por volume no mesmo SKU ou se o pack corresponde a `copies: 5` / `copies: 10`.
- [ ] **Custos totais, IVA e margens:** executar `POST /v4.0/quotes` em Sandbox para `PT` com `copies: 1, 5, 10`, somar custo unitário + portes + IVA aplicável + margem comercial LeadCapture antes de aprovar os preços finais ao público.

### D. Envio, prazos e devoluções
- [ ] **Métodos de envio a oferecer:** definir se o cliente escolhe entre `Budget`, `Standard` e `Express`, e se os portes são calculados dinamicamente via `/api/prodigi/quote` ou por escalão fixo validado.
- [ ] **Prazos reais de produção e entrega para Portugal:** validar tempos de produção + trânsito real (nunca publicar prazos estimados sem teste real).
- [ ] **Política de devoluções e reimpressões:** redigir cláusula específica para **produtos personalizados** (exceção legal ao direito de livre resolução em bens feitos sob medida) combinada com garantia de reimpressão/substituição em caso de defeito de impressão ou dano no transporte.

### E. Arte final pronta para impressão e amostra física
- [ ] **Pipeline de geração da arte final:** definir como será gerado o ficheiro de alta resolução (PNG/PDF 300 DPI com QR Code de alto contraste + nome/logo do cliente) e onde ficará alojado em URL HTTPS pública acessível à Prodigi.
- [ ] **Teste em amostra física:** encomendar pelo menos uma amostra física real antes do lançamento para validar qualidade do material, contraste, durabilidade e leitura instantânea do QR Code em iOS/Android sob iluminação de restaurante.

### F. Credenciais necessárias apenas para testar o Sandbox (sem partilhar no chat)
- [ ] Criar conta **Prodigi Sandbox** e gerar uma `PRODIGI_API_KEY` de sandbox.
- [ ] Configurar exclusivamente no ambiente **Preview** da Vercel (nunca em Production):
  - `PRODIGI_ENABLED=true`
  - `PRODIGI_ENV=sandbox`
  - `PRODIGI_API_KEY=<chave sandbox>`
  - `PRODIGI_WEBHOOK_SECRET=<segredo aleatório>` *(opcional, para testar `/api/webhooks/prodigi`)*
