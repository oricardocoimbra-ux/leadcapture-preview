# Checklist Consolidada Pré-Lançamento — LeadCapture (Preview)

> **Última atualização:** 2026-11-23  
> **Ambiente ativo de validação:** Preview (`codex/leadcapture-preview`) → `https://leadcapture-preview-git-codex-leadc-32f9ee-oricardocoimbra-2886.vercel.app`  
> **Estado de segurança:** `FORMS_ENABLED=false` (Brevo desligado), `PRODIGI_ENABLED=false` (Prodigi v5 sandbox-only), Stripe em modo de teste, sem escrita em base de dados, **Production e DNS intactos**.

---

## 1. Concluído em Preview

- **Estrutura, Design System e Navegação:** identidade Preto/Carvão/Dourado, logótipo oficial, 6 setores ativos, 7 serviços, hubs (`/solucoes`, `/demonstracoes`), institucionais e auditoria de links internos sem rotas quebradas.
- **Ofertas comerciais pré-lançamento integradas no percurso de orçamento (`/pedir-orcamento?servico=...`):**
  - Soluções digitais à medida (`/solucoes#solucoes-a-medida`).
  - Apoio administrativo a pedidos de marca no INPI, separado das restantes ofertas (`/solucoes#apoio-marca-inpi`).
  - Produtos de marca própria em Beleza e Estética (`/por-negocio/beleza-estetica#marca-propria`), sem alegar fabrico, formulação ou certificação.
  - Conteúdo imobiliário (`/por-negocio/imobiliario#conteudo-imobiliario`), assinalando exemplos reais como pendentes de materiais autorizados.
- **Formulários & Anti-Spam:**
  - 7 formulários revistos com validação PT-PT, acessibilidade e estados transparentes.
  - `/contactos`, `/pedir-orcamento` e `/pedir-demonstracao` ligados a `POST /api/forms/submit` (remetente fixo `geral@leadcapture.cloud`, `Reply-To` do visitante, sem BD).
  - **Cloudflare Turnstile** integrado nos 3 formulários e validado ponta a ponta no Preview estável (com resposta `503` honesta enquanto o Brevo estiver desligado).
  - Limite 12 KB em stream, validação de origem, honeypot, tempo mínimo, extração fiável de IP e rate limit provisório em memória.
- **Páginas legais em estado de rascunho (`noindex`):**
  - `/politica-de-privacidade` e `/termos-e-condicoes` criadas com aviso explícito de rascunho não validado juridicamente e campos `[...]` para dados da empresa/decisões legais.
- **Prodigi Print API v5 (Sandbox-only, desligada por defeito):**
  - Cliente server-side `src/lib/prodigi/client.ts`, endpoints `/api/prodigi/status`, `/api/prodigi/quote`, `/api/prodigi/orders` (*draft-first*, `Idempotency-Key` obrigatória, métodos `budget`/`standard`/`standardplus`/`express`/`overnight`, polling `GET /v5/orders/{id}`) e plano em `documentation/prodigi-integration-plan.md`.
- **Ronda visual parcial:** `23/38` assets de produção gerados, versionados e ligados (`reutilizaveis/website-portatil.jpg` incluído e reconciliado no inventário).

---

## 2. Depende do Proprietário (Decisões, Credenciais & Validações)

### A. Ativar teste de envio de formulários Brevo apenas em Preview (opcional, quando quiseres testar)
> **Importante:** nunca colar chaves na conversa e configurar **apenas em `Preview` → branch `codex/leadcapture-preview`** (nunca em Production).

1. No painel **Vercel → `leadcapture-preview` → Settings → Environment Variables**, adicionar para **Preview (`codex/leadcapture-preview`)**:
   - `FORMS_ENABLED` = `true`
   - `FORMS_TO_EMAIL` = `geral@leadcapture.cloud`
   - `FORMS_FROM_EMAIL` = `geral@leadcapture.cloud`
   - `BREVO_API_KEY` = *(chave SMTP/API transacional gerada no painel Brevo)*
2. *(Higiene de segurança recomendada)* Rodar (**Rotate**) a **Secret Key** do widget Cloudflare Turnstile e atualizar `TURNSTILE_SECRET_KEY` em Preview (porque um build anterior chegou a expor a chave antiga no cliente).
3. Fazer novo deployment Git na branch `codex/leadcapture-preview` e testar um envio em `/contactos` no URL estável de Preview, confirmando a receção na caixa encaminhada de `geral@leadcapture.cloud`.

### B. Decisões comerciais, legais e operacionais do proprietário
- [ ] **Dados legais oficiais** para substituir os `[...]` em `/politica-de-privacidade` e `/termos-e-condicoes` (denominação social, NIF/NIPC, morada sede, prazos de conservação, RAL, Livro de Reclamações, contactos/horário oficiais) e revisão jurídica final.
- [ ] **Preços finais, regime de IVA e contratos** antes de ativar compra direta online ou Stripe live.
- [ ] **Marca Própria (Beleza e Estética):** confirmar fornecedores, quantidades mínimas, Pessoa Responsável na UE, documentação de segurança, rotulagem e notificação CPNP.
- [ ] **Apoio INPI:** confirmar tabela de honorários e eventual colaboração/encaminhamento com AOPI ou advogado.
- [ ] **Materiais e autorizações:** fornecer exemplos reais autorizados de vídeo/antes-depois imobiliário e autorizações expressas para logótipos/casos (incluindo eventual caso Century 21).
- [ ] **Reativação de carteira / crédito habitação:** validação jurídica, RGPD e enquadramento Banco de Portugal antes de publicar oferta ou receber bases de dados.
- [ ] **Alterações locais fora do commit (Codex):** rever e decidir quando incluir no commit `src/app/layout.tsx`, `src/components/layout/SiteFooter.tsx`, `src/data/site-data.ts`, `lib/` e `src/app/robots.ts`.

---

## 3. Depende de Imagens, Fornecedor ou Validação Externa

- [ ] **15/38 assets visuais em falta (`documentation/production-assets-status.md`):**
  - Bloqueio externo atual: servidor Google `gemini-3.1-flash-image` em `503 MODEL_CAPACITY_EXHAUSTED` (alternativa: gerar os 15 ficheiros externamente e colocá-los em `public/images/production/`).
- [ ] **Prodigi Sandbox & validação física em Portugal (`documentation/prodigi-integration-plan.md`):**
  - Requer conta Prodigi Sandbox + `PRODIGI_API_KEY=sandbox_...` e `PRODIGI_ENABLED=true` apenas em Preview para consultar `GET /v5/products/{sku}` e `POST /v5/quotes/order` para `PT` (`GLOBAL-MOU-PRISM-*`, `GLOBAL-BOARD-*`).
  - Confirmar `printArea`/300 DPI/bleed, laboratório UE/IOSS, custos, portes, prazos reais, política de devoluções/reimpressões e testar **amostra física** de leitura do QR Code.
- [ ] **Infraestrutura de produção (antes de sair de Preview):**
  - Substituir o rate limit provisório em memória (`/api/forms/submit`, `/api/prodigi/*`) por store distribuído (ex.: Upstash/Redis).
  - Configurar Supabase Auth/BD e Google OAuth 2.0 apenas quando a Área de Cliente for ativada.
  - Aprovação explícita do proprietário antes de qualquer publicação em Production ou ativação de Stripe live / Prodigi live.
