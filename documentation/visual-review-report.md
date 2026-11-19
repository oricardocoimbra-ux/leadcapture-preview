# Relatório de Revisão Visual e Validação — LeadCapture (Fase 2)

> **Data da Auditoria:** 2026-11-19  
> **Ambiente Testado:** Servidor local Next.js (`next start`) em `http://127.0.0.1:3000`  
> **Viewports Verificados:** Desktop (`1440×900`), Tablet (`768×1024`), Mobile (`390×844`)  
> **Capturas de Ecrã:** `documentation/screenshots/{desktop,tablet,mobile}/*.png` (78 capturas geradas)  
> **Relatório JSON Bruto:** `documentation/screenshots/audit-report.json`

---

## 1. Resumo Executivo

- **Rotas verificadas:** 26/26 rotas ativas com HTTP `200`.
- **Ligações internas quebradas:** `0` (todos os `<a href>` internos resolvem para rotas válidas).
- **Overflow horizontal (`scrollWidth > innerWidth`):** `0` ocorrências em 78 renderizações (`1440px`, `768px`, `390px`).
- **Erros de consola / JavaScript:** `0` após correção do favicon (`src/app/icon.svg`).
- **Identidade visual:** 100% consistente em Preto (`#050507`), Carvão (`#101218`/`#161922`) e Dourado (`#F5B800`), com logótipo geométrico oficial e sem qualquer vestígio de paletas roxas/violetas.

---

## 2. Reorganização de Assets (Concluída)

- Movidas as 51 cópias organizadas de `public/images/references/` para `design/references/` (fora da pasta pública do website).
- Preservados os 51 ficheiros originais em `referencias visuais /`.
- Mantida `public/images/production/` reservada exclusivamente para os assets finais do website.
- Atualizados os caminhos em `README.md`, `documentation/visual-assets-inventory.md` e `documentation/visual-contact-sheet.html`.

---

## 3. Problemas Encontrados e Correções Efetuadas

| # | Problema Encontrado | Onde | Correção Efetuada | Estado |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Ícone `<Search>` sobrepunha-se ao texto placeholder `"Pesquisar uma pergunta..."` | `src/app/faq/page.tsx` e `src/app/globals.css` | Classes `.lc-*` encapsuladas em `@layer components` para permitir `pl-11` do Tailwind + centragem vertical com `top-1/2 -translate-y-1/2` | **Corrigido e verificado** (`desktop/35-faq.png`, `mobile/35-faq.png`) |
| 2 | Erro 404 na consola por ausência de favicon | Raiz da aplicação (`/` e todas as rotas) | Criado `src/app/icon.svg` com o logótipo vetorial oficial LeadCapture | **Corrigido e verificado** (0 erros de consola) |
| 3 | Imagens de referência dentro de `public/` | `public/images/references/` | Movidas para `design/references/` e documentação atualizada | **Corrigido e verificado** |

---

## 4. Problemas / Itens Pendentes (Dependem de Validação ou Próxima Fase)

1. **Fotografia e Mockups de Produção (`public/images/production/`):** As páginas usam atualmente cartões interativos de UI e placeholders estruturados; falta produzir/inserir as fotografias reais por setor e serviço (guia de 8 assets por setor em `REF-26`).
2. **Conteúdos Comerciais Provisórios (Fase 6):**
   - `/precos`: valores e condições marcados como `[Sob consulta / A confirmar]`.
   - `/contactos`: telefone, WhatsApp, email e morada marcados como `[... — a confirmar]`.
   - `/portfolio` e `/casos-de-sucesso`: slots marcados como `[Projeto Real a Inserir]` e `[Caso de Sucesso ... a Confirmar]`.
   - `/faq`: prazo de implementação e condições comerciais marcados como a confirmar.
   - `/recursos`: categorias editorialmente marcadas como `Em preparação editorial`.
3. **Submissão Real de Formulários:** `/pedir-demonstracao`, `/pedir-orcamento` e `/contactos` funcionam em modo protótipo visual (registo local de estado) até à ligação ao CRM/Email na fase de integrações comerciais.
4. **Páginas Legais:** Links de *Política de Privacidade* e *Termos e Condições* no Footer estão marcados como `(em preparação)` e apontam temporariamente para `/contactos`.

---

## 5. Lista Completa das 26 Páginas Verificadas

| Rota | Desktop (`1440px`) | Tablet (`768px`) | Mobile (`390px`) | Breadcrumb | Captura Desktop |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `/` | 200 / OK | 200 / OK | 200 / OK | N/A | `screenshots/desktop/00-home.png` |
| `/solucoes` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/01-solucoes.png` |
| `/por-negocio` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/02-por-negocio.png` |
| `/demonstracoes` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/03-demonstracoes.png` |
| `/precos` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/04-precos.png` |
| `/recursos` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/05-recursos.png` |
| `/pedir-demonstracao` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/06-pedir-demonstracao.png` |
| `/por-negocio/imobiliario` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/11-setor-imobiliario.png` |
| `/por-negocio/beleza-estetica` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/12-setor-beleza-estetica.png` |
| `/por-negocio/restauracao` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/13-setor-restauracao.png` |
| `/por-negocio/retalho-ecommerce` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/14-setor-retalho-ecommerce.png` |
| `/por-negocio/servicos-profissionais` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/15-setor-servicos-profissionais.png` |
| `/por-negocio/saude-bem-estar` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/16-setor-saude-bem-estar.png` |
| `/solucoes/websites` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/21-srv-websites.png` |
| `/solucoes/lojas-online` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/22-srv-lojas-online.png` |
| `/solucoes/crm-sistemas` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/23-srv-crm-sistemas.png` |
| `/solucoes/marketing-digital` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/24-srv-marketing-digital.png` |
| `/solucoes/automacao-ia` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/25-srv-automacao-ia.png` |
| `/solucoes/redes-sociais` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/26-srv-redes-sociais.png` |
| `/solucoes/qr-code` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/27-srv-qr-code.png` |
| `/sobre-nos` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/31-sobre-nos.png` |
| `/portfolio` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/32-portfolio.png` |
| `/casos-de-sucesso` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/33-casos-de-sucesso.png` |
| `/contactos` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/34-contactos.png` |
| `/faq` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/35-faq.png` |
| `/pedir-orcamento` | 200 / OK | 200 / OK | 200 / OK | Sim | `screenshots/desktop/36-pedir-orcamento.png` |
