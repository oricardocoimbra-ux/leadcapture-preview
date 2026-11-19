# Arquitetura Técnica — LeadCapture

## 1. Stack Tecnológica
- **Framework:** Next.js 15 (App Router, `generateStaticParams` para rotas dinâmicas).
- **Linguagem:** TypeScript (`strict: true`).
- **Estilização:** Tailwind CSS v4 + Design Tokens CSS em `src/app/globals.css`.
- **Tipografia:** `Plus Jakarta Sans` via `next/font/google`.
- **Ícones:** `lucide-react` centralizado em `DynamicIcon.tsx`.

## 2. Organização do Código (`src/`)
```text
src/
  app/
    layout.tsx                  # Layout global (SiteHeader + SiteFooter)
    globals.css                 # Tokens LeadCapture e classes utilitárias (.lc-card, .lc-btn-primary)
    page.tsx                    # Homepage (/)
    solucoes/
      page.tsx                  # Hub de Soluções (/solucoes)
      [slug]/page.tsx           # Pág. 11 a 17 (/solucoes/[slug])
    por-negocio/
      page.tsx                  # Hub de Setores (/por-negocio)
      [slug]/page.tsx           # Pág. 1 a 6 (/por-negocio/[slug])
    demonstracoes/page.tsx      # Demonstrações por Setor
    precos/page.tsx             # Preços (placeholders marcados)
    recursos/page.tsx           # Recursos
    pedir-demonstracao/page.tsx # Formulário Pedir Demonstração (protótipo)
    sobre-nos/page.tsx          # Pág. 18 Sobre Nós
    portfolio/page.tsx          # Pág. 19 Portefólio
    casos-de-sucesso/page.tsx   # Pág. 20 Casos de Sucesso
    contactos/page.tsx          # Pág. 21 Contactos
    faq/page.tsx                # Pág. 22 FAQ
    pedir-orcamento/page.tsx    # Pág. 23 Pedir Orçamento (protótipo)
  components/
    layout/
      SiteHeader.tsx            # Navegação principal + dropdowns + mobile drawer
      SiteFooter.tsx            # Rodapé multi-coluna completo
    templates/
      SectorPageTemplate.tsx    # Template reutilizável para páginas de setor
      ServicePageTemplate.tsx   # Template reutilizável para páginas de serviço
    ui/
      Breadcrumbs.tsx           # Navegação contextual
      CtaBanner.tsx             # Banner de conversão reutilizável
      DynamicIcon.tsx           # Mapeamento de ícones Lucide
      LeadCaptureLogo.tsx       # Logótipo vetorial oficial
  data/
    sectors.ts                  # Dados tipados dos 6 setores + 3 setores de expansão
    services.ts                 # Dados tipados dos 7 serviços
    site-data.ts                # Navegação, FAQ, placeholders comerciais e de portefólio
```

## 3. Escalabilidade
- **Adicionar um novo setor:** basta adicionar um objeto ao array `SECTORS` em `src/data/sectors.ts`; a rota `/por-negocio/[slug]`, menus, breadcrumbs e secções cruzadas são gerados automaticamente.
- **Substituição de conteúdo dinâmico:** a camada `src/data/` está isolada e preparada para ser substituída por CMS/API na fase comercial sem alterar os templates.
