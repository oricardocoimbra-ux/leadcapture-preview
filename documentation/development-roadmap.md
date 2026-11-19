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
