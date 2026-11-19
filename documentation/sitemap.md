# Mapa Completo do Website (Sitemap) — LeadCapture

```mermaid
flowchart TD
  Home["/ — Início"] --> Solucoes["/solucoes — Soluções (Hub)"]
  Home --> PorNegocio["/por-negocio — Por Negócio (Hub)"]
  Home --> Demos["/demonstracoes — Demonstrações"]
  Home --> Precos["/precos — Preços"]
  Home --> Recursos["/recursos — Recursos"]
  Home --> PedirDemo["/pedir-demonstracao — Pedir Demonstração"]

  PorNegocio --> N1["/por-negocio/imobiliario — Pág. 1 Imobiliário"]
  PorNegocio --> N2["/por-negocio/beleza-estetica — Pág. 2 Beleza e Estética"]
  PorNegocio --> N3["/por-negocio/restauracao — Pág. 3 Restauração"]
  PorNegocio --> N4["/por-negocio/retalho-ecommerce — Pág. 4 Retalho e E-commerce"]
  PorNegocio --> N5["/por-negocio/servicos-profissionais — Pág. 5 Serviços Profissionais"]
  PorNegocio --> N6["/por-negocio/saude-bem-estar — Pág. 6 Saúde e Bem-Estar"]

  Solucoes --> S11["/solucoes/websites — Pág. 11 Websites"]
  Solucoes --> S12["/solucoes/lojas-online — Pág. 12 Lojas Online"]
  Solucoes --> S13["/solucoes/crm-sistemas — Pág. 13 CRM e Sistemas"]
  Solucoes --> S14["/solucoes/marketing-digital — Pág. 14 Marketing Digital"]
  Solucoes --> S15["/solucoes/automacao-ia — Pág. 15 Automação e IA"]
  Solucoes --> S16["/solucoes/redes-sociais — Pág. 16 Redes Sociais"]
  Solucoes --> S17["/solucoes/qr-code — Pág. 17 Soluções QR Code"]

  Home --> Inst["Institucional & Comercial"]
  Inst --> P18["/sobre-nos — Pág. 18 Sobre Nós"]
  Inst --> P19["/portfolio — Pág. 19 Portefólio"]
  Inst --> P20["/casos-de-sucesso — Pág. 20 Casos de Sucesso"]
  Inst --> P21["/contactos — Pág. 21 Contactos"]
  Inst --> P22["/faq — Pág. 22 FAQ"]
  Inst --> P23["/pedir-orcamento — Pág. 23 Pedir Orçamento"]
```

## Ligações Contextuais Implementadas
- **Homepage** → Setores (`/por-negocio/[slug]`) → Cards de serviço do setor (`/solucoes/[slug]`) → Planos (`/precos`) → Conversão (`/pedir-demonstracao` ou `/pedir-orcamento`).
- **Demonstrações** → Páginas de Setor ou Pedido de Demonstração com parâmetro `?setor=`.
- **Portefólio** ↔ **Casos de Sucesso** ↔ **Páginas de Setor**.
- **FAQ** → **Contactos** / **Soluções** / **Pedir Demonstração**.
