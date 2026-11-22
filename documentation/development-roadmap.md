# Roadmap de Desenvolvimento — LeadCapture

## Fase Atual (Concluída nesta Primeira Entrega)
- [x] Auditoria visual completa das 51 imagens de `referencias visuais /`.
- [x] Inventário visual e folha de contacto (`documentation/visual-assets-inventory.md` e `visual-contact-sheet.html`).
- [x] Estrutura de pastas `public/images/references/`, `public/images/production/`, `videos/`, `logos/`, `icons/`.
- [x] Design System global Preto, Carvão e Dourado + logótipo vetorial oficial.
- [x] Arquitetura Next.js + TypeScript + Tailwind CSS com todas as rotas da Navegação Principal, 6 Setores, 7 Serviços e 6 Páginas Institucionais/Comerciais.
- [x] Separação estrita de conteúdo comercial não confirmado (placeholders explícitos).

## Próximas Fases (Aguardam Validação do Cliente)
### Fase 2 — Validação Comercial e Conteúdo Real
- Confirmar preços, planos, condições de pagamento e prazos de entrega.
- Confirmar contactos oficiais (telefone, WhatsApp, email, morada/horário).
- Inserir projetos reais aprovados no Portefólio e Casos de Sucesso.
- Definir conteúdos editoriais para a secção Recursos.

### Fase 3 — Produção de Assets Visuais (`public/images/production/`)
- Produzir ou selecionar fotografias/mockups finais por página (seguindo o guia de 8 assets por setor como em `REF-26`), mantendo iluminação escura/dourada coerente.

### Fase 4 — Autenticação, Área de Cliente e Integrações Comerciais
- Configurar projeto Supabase e Google Cloud Console OAuth 2.0 (ver `documentation/auth-architecture.md`).
- Ativar `@supabase/ssr` + `middleware.ts` para proteção de rotas privadas (`/area-cliente`, `/admin`), registo/login Email+Password, Google OAuth, recuperação de password e verificação de email.
- Executar `supabase/schema.sql` para criar perfis únicos (`profiles`) e políticas RLS de isolamento por cliente.
- Ligar formulários (`/pedir-demonstracao`, `/pedir-orcamento`, `/contactos`) a CRM / Email / WhatsApp.
- Implementar páginas legais (Política de Privacidade, Termos e Condições).
- Avaliar fluxos de pagamento/contrato após validação comercial e fiscal.

### Fase 5 — E-commerce de Serviços, Cross-sell e Placas QR Personalizadas (Fase Posterior — Não Ativar Pagamentos Reais Ainda)

> [!IMPORTANT]
> **Validação Comercial Obrigatória Antes de Ativar Compras Online:**
> Antes de ativar qualquer checkout real, é obrigatório validar formalmente: **preços finais**, **regime e taxa de IVA aplicável**, **contratos e termos de prestação de serviços** e **quais produtos do catálogo são elegíveis para compra direta online** vs. orçamento. Até lá, todos os pagamentos e integrações permanecem estritamente em **modo de teste** (sem chaves Stripe live, sem encomendas reais de impressão e sem publicação em Production).

- **Compra direta nas páginas de serviço e no catálogo de preços (`/precos` e `/solucoes/[slug]`):**
  - Permitir adicionar e contratar produtos/serviços elegíveis diretamente a partir do catálogo existente (`src/data/catalog.ts`), sem inventar preços nem condições.
- **Distinção clara entre compra online e orçamento à medida:**
  - Separar explicitamente produtos de **preço fechado** (elegíveis para compra direta online) de serviços complexos ou à medida que exigem **pedido de orçamento** (`/pedir-orcamento`).
- **Sugestões de complementos (Cross-sell) no produto e no carrinho (`/carrinho`):**
  - Exemplos a avaliar na arquitetura comercial:
    - *Website* + domínio / email profissional / manutenção;
    - *Restaurante* + menu digital / gestão / placas QR;
    - *Marketing* + website / produção de conteúdo.
- **Fluxo de compra de Placas QR Personalizadas (`/solucoes/qr-code`):**
  - Configurador estruturado com: tipo de QR e destino (ex.: Menu Digital, Avaliações Google, Cartão Digital, Website), quantidade, formato/material, personalização de design, cálculo de portes e prazo estimado de produção/entrega.
- **Integração com API de impressão (Prodigi — avaliação faseada obrigatória antes do lançamento):**
  - Ver especificação completa e requisitos obrigatórios pré-lançamento em [`documentation/pre-launch-requirements.md`](./pre-launch-requirements.md): sandbox primeiro, validação de SKUs em Portugal, custos/margens, amostra física de leitura QR, credenciais exclusivamente no servidor e aprovação explícita do proprietário antes de ativar encomendas reais.

### Fase 6 — Serviços de Vídeo/Imagem Imobiliária, Prova Social (Marcas) e Reativação de Carteira (A Planear Após a Ronda Visual)

> [!IMPORTANT]
> Todos os requisitos detalhados, restrições legais/regulatórias (RGPD, direitos de imagem/satélite e enquadramento do Banco de Portugal para intermediação/consultoria de crédito habitação) e hipóteses de preço **não aprovadas** estão preservados em [`documentation/pre-launch-requirements.md`](./pre-launch-requirements.md).
>
> **Regras estritas de preservação:**
> - **Não publicar** preços não validados nem casos/logótipos (incluindo *Century 21*) sem autorização expressa da marca e do cliente.
> - **Não utilizar** dados reais de clientes nem imagens de satélite/Google Earth Studio sem direitos comerciais confirmados.
> - **Concluir primeiro a ronda visual atual** antes de desenhar e implementar esta fase separadamente.


