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
- [x] `23/38` assets de produção gerados, versionados e ligados (Homepage, Saúde & Bem-Estar 8/8, Imobiliário 4/4, Beleza e Estética 4/4, Restauração 5/5 e `reutilizaveis/website-portatil.jpg`).
- [ ] **Bloqueio externo atual:** `15/38` assets em falta (Retalho 5, Serviços Profissionais 5, Serviços dedicados 4, Contactos 1) aguardam recuperação de capacidade do servidor `gemini-3.1-flash-image` (`503 MODEL_CAPACITY_EXHAUSTED`) ou entrega externa dos 15 ficheiros.

### Fase 4 — Autenticação, Área de Cliente e Integrações Comerciais
- [x] Experiência, acessibilidade, validação e estado transparente nos 7 formulários (`/contactos`, `/pedir-orcamento`, `/pedir-demonstracao`, `/login`, `/registar`, `/recuperar-password`, `/checkout`).
- [x] Endpoint server-side `/api/forms/submit` com Brevo Transactional API (remetente fixo `geral@leadcapture.cloud`, `Reply-To` do visitante, sem BD), proteção anti-spam reforçada (Cloudflare Turnstile validado ponta a ponta em Preview, honeypot, tempo mínimo, limite 12 KB em stream, IP fiável e rate limit provisório em memória). **Mantido desligado (`FORMS_ENABLED=false`) até aprovação.**
- [ ] Configurar projeto Supabase e Google Cloud Console OAuth 2.0 (ver `documentation/auth-architecture.md`) e ativar `@supabase/ssr` + `middleware.ts` + `supabase/schema.sql`.
- [ ] Ativar envio Brevo em Preview (`FORMS_ENABLED=true`, `BREVO_API_KEY`) quando aprovado e substituir rate limit em memória por store distribuído antes de produção.
- [ ] Publicar páginas legais oficiais (Política de Privacidade, Termos e Condições).

### Fase 5 — E-commerce de Serviços, Cross-sell e Placas QR Personalizadas (Fase Posterior — Não Ativar Pagamentos Reais Ainda)

> [!IMPORTANT]
> **Validação Comercial Obrigatória Antes de Ativar Compras Online:**
> Antes de ativar qualquer checkout real, é obrigatório validar formalmente: **preços finais**, **regime e taxa de IVA aplicável**, **contratos e termos de prestação de serviços** e **quais produtos do catálogo são elegíveis para compra direta online** vs. orçamento. Até lá, todos os pagamentos e integrações permanecem estritamente em **modo de teste** (sem chaves Stripe live, sem encomendas reais de impressão e sem publicação em Production).

- [x] **Preparação técnica Prodigi Print API v5 (Sandbox-only, desligada por defeito):** cliente server-side (`src/lib/prodigi/client.ts`), endpoints `/api/prodigi/status`, `/api/prodigi/quote`, `/api/prodigi/orders` (*draft-first*, `Idempotency-Key` obrigatória, métodos `budget`/`standard`/`standardplus`/`express`/`overnight`, polling `GET /v5/orders/{id}`) e plano detalhado em [`documentation/prodigi-integration-plan.md`](./prodigi-integration-plan.md).
- [ ] **Pendências Prodigi/Placas QR:** chave `sandbox_` em Preview, validação de SKUs candidatos em Portugal (`GLOBAL-MOU-PRISM-*`, `GLOBAL-BOARD-*`), `printArea`/300 DPI, portes/IVA/prazos reais via `/v5/quotes/order`, amostra física de leitura QR, morada de entrega estruturada no checkout e política de devoluções/reimpressões.
- [ ] **Compra direta, cross-sell e checkout Stripe:** validar preços/IVA/contratos antes de ativar compra direta, complementos no carrinho e checkout real.

### Fase 6 — Serviços de Vídeo/Imagem Imobiliária, Prova Social (Marcas) e Reativação de Carteira

- [x] **Oferta de conteúdo imobiliário publicada em Preview (`/por-negocio/imobiliario#conteudo-imobiliario` + pré-seleção em `/pedir-orcamento?servico=conteudo-imobiliario`):** vídeos a partir de fotografias autorizadas, vídeos curtos para redes sociais, melhoria de fotografias e animações aéreas/mapa condicionadas a confirmação de direitos comerciais (sem preços não aprovados nem exemplos fabricados).
- [ ] **Pendente de materiais e validações do proprietário:**
  - Exemplos reais de vídeo e comparações antes/depois (aguarda materiais autorizados pelo cliente).
  - Prova social (carrossel de marcas / projetos / eventual caso Century 21 — aguarda autorização expressa de marca e cliente).
  - Oferta de reativação de carteira / crédito habitação (aguarda validação jurídica, RGPD e enquadramento Banco de Portugal).

### Fase 7 — Soluções Digitais à Medida, Produtos de Marca Própria e Apoio ao Registo de Marcas (Requisito Pré-Lançamento)

- [x] **Soluções digitais à medida (`/solucoes#solucoes-a-medida` + `/pedir-orcamento?servico=solucoes-a-medida`):** aplicações, automatizações, integrações e ferramentas internas, explicando avaliação de necessidade e definição de âmbito antes de proposta/orçamento.
- [x] **Produtos de marca própria (`/por-negocio/beleza-estetica#marca-propria` + `/pedir-orcamento?servico=marca-propria`):** apoio ao conceito, identidade, embalagem, seleção de fabricante e coordenação da produção, deixando explícito que a LeadCapture não fabrica, não formula nem certifica produtos.
- [x] **Apoio administrativo ao pedido de marca no INPI (`/solucoes#apoio-marca-inpi` + `/pedir-orcamento?servico=apoio-inpi`):** secção separada das restantes ofertas, distinguindo honorários de taxas oficiais, sem garantia de concessão e com encaminhamento para profissional autorizado (AOPI/advogado) quando necessária representação ou aconselhamento especializado.
- [ ] **Pendente de validação do proprietário antes de comercialização/preços públicos:** fornecedores de marca própria, quantidades mínimas, Pessoa Responsável na UE, documentação de segurança e notificação CPNP (Regulamento (CE) n.º 1223/2009), bem como eventual parceria/mandato com AOPI e tabela de honorários.
- Requisitos de lançamento, linguagem e referências oficiais: [`documentation/pre-launch-requirements.md`](./pre-launch-requirements.md).
