# Relatório do Catálogo Comercial, Preços e Identidade Visual — LeadCapture

> **Fonte Única Central:** `src/data/catalog.ts`  
> **Páginas Ligadas ao Catálogo:** `/precos`, `/solucoes/[slug]` (7 serviços), `/por-negocio/[slug]` (6 setores)

---

## 1. Estrutura do Catálogo Central (`src/data/catalog.ts`)
- **Total de Categorias:** 15 categorias (`CATALOG_CATEGORIES`).
- **Total de Produtos/Serviços:** 111 itens únicos com `id`, `name`, `category`, `description`, `price`, `billingType`, `renewalPrice`, `periodicity`, `vatConfigurable`, `includedServices`, `extras`, `relatedProductIds`, `publicationStatus`, `executionTimeframe` (`null` até validação), `availability` (`online-ready` vs `quote-only`).
- **Preços `"desde"`:** Assinalados com `isStartingPrice: true`, `availability: "quote-only"` e nota explícita: *"O valor final depende do âmbito do projeto."*

---

## 2. Regras Críticas Aplicadas
1. **Email Empresarial (Secção 11):**
   - Produto principal: `email-empresarial-pack-2` (**Email Empresarial — Pack 2 contas**).
   - **1.º ano:** `99 €` (configuração inicial, criação de 2 contas de email e manutenção durante o 1.º ano).
   - **A partir do 2.º ano:** `69 €/ano` (renovação e manutenção das 2 contas, sem novo setup inicial).
   - **Cobrança anual** (`annual-with-setup`), nunca apresentada como mensalidade.
   - Contas adicionais: `email-contas-adicionais` (`quote-only` — preço mediante orçamento e custos do fornecedor).
2. **Custos Externos:**
   - **Marketing Digital:** nota explícita *"O investimento publicitário não está incluído."*
   - **Automação & IA:** nota explícita *"Custos externos de APIs e plataformas identificados separadamente."*
   - **Registo de Domínio:** `quote-only` (*"Custo do fornecedor + gestão."*).
3. **Configuração Fiscal:** `LEADCAPTURE_TAX_CONFIG.vatMode = "pending-fiscal-setup"` — nenhum IVA é somado automaticamente sem confirmação do enquadramento fiscal da LeadCapture.

---

## 3. Recursos do Logótipo Oficial Gerados
Comparação feita entre o PNG fornecido (`public/logos/Logótipo dourado LeadCapture em fundo transparente.png`, `2172×724`, sem canal alfa) e o SVG anterior:
- Atualizada a geometria vetorial exata do símbolo oficial (duas metades em gancho rodadas a `-45°` com 4 recortes quadrados e cruz central).
- Ficheiros gerados:
  - **SVG horizontal:** `public/logos/leadcapture-logo-horizontal.svg`
  - **SVG símbolo isolado:** `public/logos/leadcapture-symbol.svg` e `public/logos/leadcapture-logo.svg`
  - **PNG horizontal (fundo transparente):** `public/logos/leadcapture-logo-horizontal.png` (`1360×256`)
  - **PNG símbolo isolado (fundo transparente):** `public/logos/leadcapture-symbol.png` (`512×512`)
  - **Favicon SVG (apenas símbolo dourado):** `src/app/icon.svg` e `public/favicon.svg`
  - **Favicon ICO (16×16, 32×32, 48×48 — apenas símbolo dourado transparente):** `public/favicon.ico`
  - **Ícones PWA + Manifesto:** `public/icons/icon-192x192.png`, `public/icons/icon-512x512.png`, `public/icons/apple-touch-icon.png`, `public/manifest.webmanifest`

---

## 4. Decisões Pendentes de Validação Antes da Ativação Comercial
1. **Enquadramento Fiscal (IVA):** Confirmar se a LeadCapture aplica IVA (`23%` em Portugal Continental) incluído nos preços finais apresentados ou se atua em regime de isenção (ex.: Art. 53.º CIVA), ajustando `LEADCAPTURE_TAX_CONFIG`.
2. **Pack de 5 contas adicionais de email (`59 €` — Secção 12):** Marcado em `src/data/catalog.ts` como `publicationStatus: "pending-validation"` para confirmar âmbito (se é setup único ou anual) e compatibilidade com o produto principal (Pack 2 contas a `99 €` / `69 €/ano`).
3. **Prazos de execução (`executionTimeframe`):** Mantidos a `null` em todos os itens do catálogo até validação oficial por categoria.
4. **Sobreposições / Bundles entre Extras e Secções:**
   - `Página adicional` (`75 €`) aparece em Websites e Extras (mesmo preço consistente).
   - `Identidade Visual Premium` (`299 €`) / `Identidade visual completa` (`299 €`) e `Vídeo promocional` (`desde 99 €`) têm preços consistentes entre categorias.
   - `Gestão técnica completa` (`79 €/mês`) vs `Manutenção anual de website` (`180 €/ano`, equivalente a `15 €/mês` vs `19 €/mês` mensal): confirmar se a diferença (`180 €/ano` vs `19 €/mês`) é desconto anual intencional.
5. **Disponibilidade para compra online vs orçamento:** Confirmar quais itens de preço fixo devem permitir checkout direto na fase de pagamentos e quais exigem briefing prévio.
