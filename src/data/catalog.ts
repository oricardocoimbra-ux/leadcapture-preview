export type BillingType =
  | "one-time"
  | "monthly"
  | "annual"
  | "annual-with-setup"
  | "quote-only";

export type PublicationStatus = "published" | "pending-validation" | "quote-required";

export type CatalogCategoryId =
  | "websites-presenca"
  | "lojas-online"
  | "logotipos-identidade"
  | "crm-sistemas"
  | "marketing-digital"
  | "redes-sociais"
  | "automacao-ia"
  | "qr-code-restauracao"
  | "suporte-manutencao"
  | "email-empresarial"
  | "dominios-infraestrutura"
  | "pacotes-gerais"
  | "pacotes-mensais"
  | "pacotes-setor"
  | "extras-upsells";

export interface TaxConfig {
  vatMode: "pending-fiscal-setup" | "vat-included" | "vat-exempt";
  defaultRate: number;
  label: string;
}

export const LEADCAPTURE_TAX_CONFIG: TaxConfig = {
  vatMode: "pending-fiscal-setup",
  defaultRate: 0.23,
  label: "Preços sujeitos à configuração fiscal oficial LeadCapture (IVA conforme enquadramento legal).",
};

export type ChargeMode = "one_time" | "recurring";
export type BillingInterval = "month" | "year" | null;

export interface CatalogProduct {
  id: string;
  name: string;
  category: CatalogCategoryId;
  description: string;
  price: number | null;
  priceMax?: number;
  isStartingPrice?: boolean;
  priceUnitLabel?: string;
  billingType: BillingType;
  chargeMode: ChargeMode;
  billingInterval: BillingInterval;
  initialPrice: number | null;
  recurringPrice: number | null;
  setupFee: number | null;
  billingStartDate: "immediate" | "after_trial" | "scheduled";
  trialPeriodDays: number | null;
  cancellationPolicy: string;
  renewalPrice?: number | null;
  periodicity: string;
  vatConfigurable: boolean;
  includedServices: string[];
  extras: string[];
  relatedProductIds: string[];
  publicationStatus: PublicationStatus;
  executionTimeframe: string | null;
  availability: "online-ready" | "quote-only";
  commercialNote?: string;
}

export interface CatalogCategoryMeta {
  id: CatalogCategoryId;
  name: string;
  description: string;
  serviceSlug?: string;
}

export const CATALOG_CATEGORIES: CatalogCategoryMeta[] = [
  {
    id: "websites-presenca",
    name: "Websites e Presença Digital",
    description: "Landing pages, websites institucionais e módulos de presença online.",
    serviceSlug: "websites",
  },
  {
    id: "lojas-online",
    name: "Lojas Online e E-commerce",
    description: "Lojas online completas, importação de catálogo e configurações comerciais.",
    serviceSlug: "lojas-online",
  },
  {
    id: "logotipos-identidade",
    name: "Logótipos e Identidade Visual",
    description: "Criação de marca, manuais, estacionário e materiais gráficos.",
  },
  {
    id: "crm-sistemas",
    name: "CRM e Sistemas Digitais",
    description: "Configuração de CRM, pipelines, dashboards, agendamentos e portais.",
    serviceSlug: "crm-sistemas",
  },
  {
    id: "marketing-digital",
    name: "Marketing Digital",
    description: "Estratégia, campanhas Google/Meta Ads e auditorias (investimento em anúncios não incluído).",
    serviceSlug: "marketing-digital",
  },
  {
    id: "redes-sociais",
    name: "Redes Sociais e Conteúdos",
    description: "Gestão mensal, packs de publicações, vídeo e fotografia.",
    serviceSlug: "redes-sociais",
  },
  {
    id: "automacao-ia",
    name: "Automação e Inteligência Artificial",
    description: "Fluxos automáticos e assistentes IA (custos externos de APIs identificados à parte).",
    serviceSlug: "automacao-ia",
  },
  {
    id: "qr-code-restauracao",
    name: "QR Code e Restauração",
    description: "Menus digitais QR, placas de mesa, avaliações Google e pedidos digitais.",
    serviceSlug: "qr-code",
  },
  {
    id: "suporte-manutencao",
    name: "Suporte e Manutenção",
    description: "Planos mensais de manutenção técnica, backups, alojamento e atualizações.",
  },
  {
    id: "email-empresarial",
    name: "Email Empresarial",
    description: "Pack oficial de 2 contas com configuração no 1.º ano e renovação anual simplificada.",
  },
  {
    id: "dominios-infraestrutura",
    name: "Domínios e Infraestrutura",
    description: "Configuração de domínios, migrações, Google Workspace, Microsoft 365 e alojamento.",
  },
  {
    id: "pacotes-gerais",
    name: "Pacotes Gerais",
    description: "Soluções chave-na-mão de pagamento único para presença e ecossistema digital.",
  },
  {
    id: "pacotes-mensais",
    name: "Pacotes Mensais",
    description: "Acompanhamento contínuo mensal de gestão, marketing e crescimento.",
  },
  {
    id: "pacotes-setor",
    name: "Pacotes por Setor",
    description: "Soluções estruturadas especificamente por área de negócio.",
  },
  {
    id: "extras-upsells",
    name: "Extras e Upsells",
    description: "Complementos modulares para expandir qualquer website, loja ou sistema.",
  },
];

function item(
  id: string,
  name: string,
  category: CatalogCategoryId,
  price: number | null,
  billingType: BillingType,
  description: string,
  opts: Partial<Omit<CatalogProduct, "id" | "name" | "category" | "price" | "billingType" | "description">> = {}
): CatalogProduct {
  const periodicityMap: Record<BillingType, string> = {
    "one-time": "Pagamento único",
    monthly: "Mensal",
    annual: "Anual",
    "annual-with-setup": "1.º ano + renovação anual",
    "quote-only": "Sob orçamento",
  };
  const isRecurring =
    billingType === "monthly" || billingType === "annual" || billingType === "annual-with-setup";
  const computedInterval: BillingInterval =
    billingType === "monthly"
      ? "month"
      : billingType === "annual" || billingType === "annual-with-setup"
      ? "year"
      : null;
  const computedRecurringPrice = isRecurring
    ? opts.renewalPrice !== undefined
      ? opts.renewalPrice
      : price
    : null;
  const computedSetupFee =
    billingType === "annual-with-setup" && price !== null && computedRecurringPrice !== null
      ? Math.max(0, price - computedRecurringPrice)
      : null;

  return {
    id,
    name,
    category,
    description,
    price,
    billingType,
    chargeMode: isRecurring ? "recurring" : "one_time",
    billingInterval: computedInterval,
    initialPrice: price,
    recurringPrice: computedRecurringPrice,
    setupFee: computedSetupFee,
    billingStartDate: "immediate",
    trialPeriodDays: null,
    cancellationPolicy: isRecurring
      ? "Cancelável na Área de Cliente antes da próxima data de renovação, de acordo com as condições contratuais."
      : "Serviço de pagamento único (sem subscrição automática).",
    periodicity: opts.periodicity ?? periodicityMap[billingType],
    vatConfigurable: true,
    includedServices: opts.includedServices ?? [],
    extras: opts.extras ?? [],
    relatedProductIds: opts.relatedProductIds ?? [],
    publicationStatus: opts.publicationStatus ?? "published",
    executionTimeframe: opts.executionTimeframe ?? null,
    availability:
      opts.availability ?? (opts.isStartingPrice || price === null ? "quote-only" : "online-ready"),
    ...opts,
  };
}

export const CATALOG_ITEMS: CatalogProduct[] = [
  // 2. WEBSITES E PRESENÇA DIGITAL
  item("web-landing-page", "Landing Page", "websites-presenca", 149, "one-time", "Página única de alta conversão focada num serviço ou campanha."),
  item("web-starter", "Website Starter", "websites-presenca", 199, "one-time", "Website essencial responsivo para presença digital profissional."),
  item("web-profissional", "Website Profissional", "websites-presenca", 450, "one-time", "Website multi-secção estruturado para captação de leads e credibilidade."),
  item("web-premium", "Website Premium", "websites-presenca", 699, "one-time", "Website avançado com arquitetura personalizada e integrações comerciais."),
  item("web-personalizado", "Website personalizado", "websites-presenca", 950, "one-time", "Projeto web totalmente à medida.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("web-pagina-adicional", "Página adicional", "websites-presenca", 75, "one-time", "Criação e integração de página extra no website."),
  item("web-copywriting", "Copywriting profissional", "websites-presenca", 99, "one-time", "Redação persuasiva orientada para conversão e clareza."),
  item("web-integracao-formulario", "Integração de formulário", "websites-presenca", 49, "one-time", "Configuração de formulário personalizado com encaminhamento."),
  item("web-integracao-whatsapp", "Integração WhatsApp", "websites-presenca", 29, "one-time", "Botão e fluxo direto de contacto via WhatsApp."),
  item("web-blog-integrado", "Blog integrado", "websites-presenca", 99, "one-time", "Estrutura de artigos e categorias integrada no website."),
  item("web-seo-inicial", "SEO inicial", "websites-presenca", 149, "one-time", "Otimização técnica inicial de títulos, meta tags e indexação."),
  item("web-google-business", "Otimização Google Business Profile", "websites-presenca", 79, "one-time", "Configuração e otimização de ficha local no Google."),

  // 3. LOJAS ONLINE E E-COMMERCE
  item("ecom-starter", "Loja Online Starter", "lojas-online", 499, "one-time", "Loja online essencial pronta para começar a vender."),
  item("ecom-profissional", "Loja Online Profissional", "lojas-online", 799, "one-time", "E-commerce completo com design otimizado e gestão avançada."),
  item("ecom-premium", "Loja Online Premium", "lojas-online", 1299, "one-time", "Loja online de elevada performance com funcionalidades avançadas."),
  item("ecom-personalizada", "Loja personalizada", "lojas-online", 1800, "one-time", "Plataforma e-commerce desenvolvida à medida.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("ecom-import-20", "Importação de 20 produtos", "lojas-online", 49, "one-time", "Carregamento e organização de até 20 produtos no catálogo."),
  item("ecom-import-50", "Importação de 50 produtos", "lojas-online", 99, "one-time", "Carregamento e organização de até 50 produtos no catálogo."),
  item("ecom-import-100", "Importação de 100 produtos", "lojas-online", 179, "one-time", "Carregamento e organização de até 100 produtos no catálogo."),
  item("ecom-config-pagamentos", "Configuração de pagamentos", "lojas-online", 79, "one-time", "Integração técnica de gateways de pagamento."),
  item("ecom-config-envios", "Configuração de envios", "lojas-online", 79, "one-time", "Configuração de zonas, escalões e regras de envio."),
  item("ecom-integracao-faturacao", "Integração de faturação", "lojas-online", 99, "one-time", "Ligação da loja a software de faturação compatível."),
  item("ecom-config-campanhas", "Configuração de campanhas", "lojas-online", 99, "one-time", "Configuração de cupões, promoções e campanhas na loja."),

  // 4. LOGÓTIPOS E IDENTIDADE VISUAL
  item("brand-logo-essencial", "Logótipo Essencial", "logotipos-identidade", 79, "one-time", "Criação de logótipo essencial profissional."),
  item("brand-logo-profissional", "Logótipo Profissional", "logotipos-identidade", 149, "one-time", "Criação de logótipo profissional com variações e estudo."),
  item("brand-identidade-premium", "Identidade Visual Premium", "logotipos-identidade", 299, "one-time", "Sistema completo de marca, paleta, tipografia e aplicações."),
  item("brand-manual", "Manual de identidade visual", "logotipos-identidade", 99, "one-time", "Documento normativo de aplicação correta da marca."),
  item("brand-cartao-digital", "Cartão de visita digital", "logotipos-identidade", 39, "one-time", "Cartão digital interativo partilhável por link/QR."),
  item("brand-cartao-fisico", "Design de cartão físico", "logotipos-identidade", 49, "one-time", "Arte final pronta para impressão de cartão de visita."),
  item("brand-papel-timbrado", "Papel timbrado", "logotipos-identidade", 39, "one-time", "Modelo oficial de documento timbrado da empresa."),
  item("brand-assinatura-email", "Assinatura de email", "logotipos-identidade", 29, "one-time", "Assinatura profissional HTML/imagem alinhada com a marca."),
  item("brand-kit-redes", "Kit de redes sociais", "logotipos-identidade", 79, "one-time", "Capas, avatares e templates base para redes sociais."),
  item("brand-redesign", "Redesign de logótipo", "logotipos-identidade", 99, "one-time", "Modernização e vetorização de logótipo existente."),
  item("brand-packaging", "Embalagem / Packaging", "logotipos-identidade", 149, "one-time", "Design gráfico para embalagens comerciais.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("brand-rotulos", "Design de rótulos", "logotipos-identidade", 99, "one-time", "Design de rótulos de produto prontos para produção.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),

  // 5. CRM E SISTEMAS DIGITAIS
  item("crm-starter", "CRM Starter — configuração", "crm-sistemas", 249, "one-time", "Configuração inicial de CRM para gestão de contactos e oportunidades."),
  item("crm-profissional", "CRM Profissional — configuração", "crm-sistemas", 499, "one-time", "Configuração completa de CRM, etapas comerciais e permissões."),
  item("crm-personalizado", "CRM personalizado", "crm-sistemas", 999, "one-time", "Arquitetura CRM desenvolvida à medida da operação.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("crm-pipeline", "Configuração de pipeline", "crm-sistemas", 99, "one-time", "Estruturação de funil comercial e estados de negócio."),
  item("crm-importacao", "Importação de contactos", "crm-sistemas", 49, "one-time", "Tratamento e importação estruturada de base de contactos."),
  item("crm-automacao-comercial", "Automação comercial", "crm-sistemas", 149, "one-time", "Regras automáticas de atribuição e seguimento de leads."),
  item("crm-dashboard", "Dashboard de gestão", "crm-sistemas", 199, "one-time", "Painel visual de indicadores comerciais e operacionais."),
  item("crm-integracao-plataformas", "Integração entre plataformas", "crm-sistemas", 99, "one-time", "Ligação entre CRM, formulários, agendas e ferramentas externas.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("crm-agendamento", "Sistema de agendamento", "crm-sistemas", 149, "one-time", "Configuração de marcações online sincronizadas."),
  item("crm-portal-cliente", "Portal de cliente personalizado", "crm-sistemas", 499, "one-time", "Portal dedicado para acompanhamento e partilha com clientes.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),

  // 6. MARKETING DIGITAL
  item("mkt-estrategia-inicial", "Estratégia digital inicial", "marketing-digital", 149, "one-time", "Planeamento estratégico de aquisição, canais e funil."),
  item("mkt-gestao-campanhas", "Gestão de campanhas publicitárias", "marketing-digital", 249, "monthly", "Gestão mensal contínua de campanhas pagas.", { commercialNote: "O investimento publicitário não está incluído." }),
  item("mkt-google-ads", "Gestão Google Ads", "marketing-digital", 249, "monthly", "Gestão mensal de campanhas de pesquisa e display no Google.", { commercialNote: "O investimento publicitário não está incluído." }),
  item("mkt-meta-ads", "Gestão Meta Ads", "marketing-digital", 249, "monthly", "Gestão mensal de campanhas no Instagram e Facebook.", { commercialNote: "O investimento publicitário não está incluído." }),
  item("mkt-gestao-multicanal", "Gestão multicanal", "marketing-digital", 399, "monthly", "Gestão integrada Google Ads + Meta Ads.", { commercialNote: "O investimento publicitário não está incluído." }),
  item("mkt-config-anuncios", "Configuração inicial de anúncios", "marketing-digital", 99, "one-time", "Estruturação técnica de conta publicitária, pixel e conversões."),
  item("mkt-landing-campanhas", "Landing Page para campanhas", "marketing-digital", 149, "one-time", "Página dedicada otimizada para tráfego pago."),
  item("mkt-auditoria", "Auditoria digital", "marketing-digital", 99, "one-time", "Diagnóstico completo de presença digital e oportunidades."),
  item("mkt-plano-mensal", "Plano de marketing mensal", "marketing-digital", 149, "one-time", "Plano de ações mensais de marketing e conteúdo."),

  // 7. REDES SOCIAIS E CONTEÚDOS
  item("social-gestao-starter", "Gestão Starter", "redes-sociais", 149, "monthly", "Gestão mensal essencial de presença nas redes sociais."),
  item("social-gestao-profissional", "Gestão Profissional", "redes-sociais", 249, "monthly", "Gestão mensal profissional com consistência editorial."),
  item("social-gestao-premium", "Gestão Premium", "redes-sociais", 399, "monthly", "Gestão mensal completa de redes sociais e conteúdos."),
  item("social-pack-8", "Pack 8 publicações", "redes-sociais", 99, "one-time", "Design e preparação de 8 publicações."),
  item("social-pack-12", "Pack 12 publicações", "redes-sociais", 149, "one-time", "Design e preparação de 12 publicações."),
  item("social-pack-20", "Pack 20 publicações", "redes-sociais", 229, "one-time", "Design e preparação de 20 publicações."),
  item("social-post-individual", "Design de publicação individual", "redes-sociais", 19, "one-time", "Criação gráfica de publicação avulsa."),
  item("social-reel", "Reel editado", "redes-sociais", 39, "one-time", "Edição profissional de vídeo curto vertical."),
  item("social-video-promo", "Vídeo promocional", "redes-sociais", 99, "one-time", "Produção/edição de vídeo promocional.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("social-sessao-foto", "Sessão de fotografia", "redes-sociais", 149, "one-time", "Sessão fotográfica profissional para marca/espaço.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("social-calendario", "Calendário editorial", "redes-sociais", 79, "one-time", "Planeamento estruturado de temas e datas de publicação."),

  // 8. AUTOMAÇÃO E INTELIGÊNCIA ARTIFICIAL
  item("ai-automacao-simples", "Automação simples", "automacao-ia", 99, "one-time", "Fluxo automático simples entre duas ferramentas.", { commercialNote: "Custos externos de APIs e plataformas identificados separadamente." }),
  item("ai-automacao-profissional", "Automação profissional", "automacao-ia", 249, "one-time", "Fluxo multi-etapa para captação e organização.", { commercialNote: "Custos externos de APIs e plataformas identificados separadamente." }),
  item("ai-automacao-avancada", "Automação avançada", "automacao-ia", 499, "one-time", "Arquitetura avançada de automação operacional.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto. Custos externos de APIs e plataformas identificados separadamente." }),
  item("ai-assistente-website", "Assistente IA para website", "automacao-ia", 149, "one-time", "Assistente inteligente integrado no site para atendimento e leads.", { commercialNote: "Custos externos de APIs e plataformas identificados separadamente." }),
  item("ai-assistente-comercial", "Assistente IA comercial", "automacao-ia", 299, "one-time", "Assistente IA treinado para qualificação e agendamento.", { commercialNote: "Custos externos de APIs e plataformas identificados separadamente." }),
  item("ai-assistente-personalizado", "Assistente IA personalizado", "automacao-ia", 599, "one-time", "Agente IA à medida integrado nos sistemas da empresa.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto. Custos externos de APIs e plataformas identificados separadamente." }),
  item("ai-emails", "Automatização de emails", "automacao-ia", 99, "one-time", "Sequências automáticas de resposta e nutrição por email."),
  item("ai-whatsapp", "Automação WhatsApp", "automacao-ia", 149, "one-time", "Fluxos automáticos de atendimento e encaminhamento via WhatsApp.", { commercialNote: "Custos externos de APIs e plataformas identificados separadamente." }),
  item("ai-followup", "Sistema de follow-up", "automacao-ia", 149, "one-time", "Acompanhamento automático de propostas e contactos."),
  item("ai-recuperacao", "Recuperação de clientes", "automacao-ia", 149, "one-time", "Fluxo automatizado de reativação de contactos e clientes."),

  // 9. QR CODE E RESTAURAÇÃO
  item("qr-menu-digital", "Menu Digital QR", "qr-code-restauracao", 79, "one-time", "Ementa digital acessível via QR Code."),
  item("qr-menu-premium", "Menu Digital Premium", "qr-code-restauracao", 149, "one-time", "Ementa digital interativa com categorias, fotos e design premium."),
  item("qr-menu-gestao", "Menu Digital com gestão", "qr-code-restauracao", 19, "monthly", "Atualização e gestão mensal do menu digital."),
  item("qr-avaliacoes-google", "QR Code para avaliações Google", "qr-code-restauracao", 29, "one-time", "QR Code direto para página de avaliação no Google."),
  item("qr-placa-mesa", "Placa QR Code de mesa", "qr-code-restauracao", 19, "one-time", "Placa física individual personalizada com QR Code.", { priceUnitLabel: "unidade" }),
  item("qr-pack-5", "Pack 5 placas", "qr-code-restauracao", 79, "one-time", "Conjunto de 5 placas QR Code de mesa."),
  item("qr-pack-10", "Pack 10 placas", "qr-code-restauracao", 139, "one-time", "Conjunto de 10 placas QR Code de mesa."),
  item("qr-design-placas", "Design personalizado das placas", "qr-code-restauracao", 49, "one-time", "Personalização gráfica exclusiva para placas QR."),
  item("qr-cartao-empresarial", "Cartão digital empresarial", "qr-code-restauracao", 39, "one-time", "Cartão digital corporativo com QR Code."),
  item("qr-sistema-pedidos", "Sistema de pedidos digital", "qr-code-restauracao", 299, "one-time", "Sistema digital de pedidos para mesa ou takeaway.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),

  // 10. SUPORTE E MANUTENÇÃO
  item("sup-manutencao-website", "Manutenção Website", "suporte-manutencao", 19, "monthly", "Atualizações técnicas, segurança e verificação mensal de website."),
  item("sup-manutencao-loja", "Manutenção Loja Online", "suporte-manutencao", 39, "monthly", "Manutenção técnica dedicada para loja online e módulos."),
  item("sup-prioritario", "Suporte prioritário", "suporte-manutencao", 49, "monthly", "Canal prioritário de assistência técnica e operacional."),
  item("sup-gestao-completa", "Gestão técnica completa", "suporte-manutencao", 79, "monthly", "Gestão técnica integral, monitorização e suporte contínuo."),
  item("sup-atualizacao-conteudos", "Atualização de conteúdos", "suporte-manutencao", 29, "monthly", "Alterações periódicas de textos, imagens e secções."),
  item("sup-alojamento-gestao", "Alojamento e gestão técnica", "suporte-manutencao", 15, "monthly", "Alojamento gerido com monitorização básica."),
  item("sup-backup", "Backup e monitorização", "suporte-manutencao", 9, "monthly", "Cópias de segurança automáticas e monitorização de disponibilidade."),

  // 11. EMAIL EMPRESARIAL — PREÇOS CORRIGIDOS E DEFINITIVOS
  item(
    "email-empresarial-pack-2",
    "Email Empresarial — Pack 2 contas",
    "email-empresarial",
    99,
    "annual-with-setup",
    "Solução oficial de email profissional com domínio próprio para 2 contas.",
    {
      renewalPrice: 69,
      periodicity: "99 € no 1.º ano | 69 €/ano a partir do 2.º ano",
      includedServices: [
        "1.º ano (99 €): configuração inicial, criação de 2 contas de email e manutenção durante o primeiro ano",
        "A partir do 2.º ano (69 €/ano): renovação e manutenção das 2 contas, sem novo setup inicial",
      ],
      extras: ["Contas adicionais mediante orçamento e custos do fornecedor"],
      commercialNote: "Cobrança anual (não é mensalidade). Inclui 2 contas de email empresarial.",
    }
  ),
  item(
    "email-contas-adicionais",
    "Email Empresarial — Contas adicionais",
    "email-empresarial",
    null,
    "quote-only",
    "Expansão de contas de email além das 2 incluídas no pack oficial.",
    {
      periodicity: "Mediante orçamento",
      availability: "quote-only",
      publicationStatus: "quote-required",
      commercialNote: "Preço mediante orçamento e custos do fornecedor.",
    }
  ),

  // 12. DOMÍNIOS E INFRAESTRUTURA
  item("infra-config-dominio", "Configuração de domínio", "dominios-infraestrutura", 19, "one-time", "Configuração de DNS e apontamento de domínio."),
  item("infra-registo-dominio", "Registo de domínio", "dominios-infraestrutura", null, "quote-only", "Registo anual de domínio (custo do fornecedor + gestão).", { availability: "quote-only", publicationStatus: "quote-required", commercialNote: "Custo do fornecedor + gestão." }),
  item("infra-pack-5-adicionais", "Pack de 5 contas adicionais", "dominios-infraestrutura", 59, "one-time", "Pack de 5 contas adicionais (pendente de validação de âmbito e recorrência).", { publicationStatus: "pending-validation", availability: "quote-only", commercialNote: "Validar âmbito e recorrência antes de publicação." }),
  item("infra-migracao-emails", "Migração de emails", "dominios-infraestrutura", 49, "one-time", "Transferência de caixas de correio existentes."),
  item("infra-google-workspace", "Configuração Google Workspace", "dominios-infraestrutura", 49, "one-time", "Configuração técnica inicial do Google Workspace."),
  item("infra-microsoft-365", "Configuração Microsoft 365", "dominios-infraestrutura", 49, "one-time", "Configuração técnica inicial do Microsoft 365."),
  item("infra-alojamento-anual", "Alojamento anual", "dominios-infraestrutura", 99, "annual", "Alojamento web anual gerido."),
  item("infra-manutencao-anual", "Manutenção anual de website", "dominios-infraestrutura", 180, "annual", "Plano anual de manutenção técnica de website."),

  // 13. PACOTES COMERCIAIS — GERAIS
  item("pkg-starter", "STARTER — Presença Digital", "pacotes-gerais", 299, "one-time", "Pacote essencial para lançar a sua presença online com captação.", {
    includedServices: ["Landing Page", "Formulário de contacto", "Integração WhatsApp", "SEO básico"],
  }),
  item("pkg-professional", "PROFESSIONAL — Negócio Digital", "pacotes-gerais", 699, "one-time", "Pacote completo para consolidar imagem, SEO e contactos.", {
    includedServices: ["Website profissional", "Identidade visual essencial", "Formulários e contactos", "SEO inicial", "Integração Google Business"],
  }),
  item("pkg-premium", "PREMIUM — Ecossistema Digital", "pacotes-gerais", 1299, "one-time", "Ecossistema avançado com website, marca, CRM e automações.", {
    includedServices: ["Website premium", "Identidade visual", "CRM básico", "Automações iniciais", "Integrações comerciais"],
  }),

  // 13. PACOTES COMERCIAIS — MENSAIS
  item("pkg-mensal-care", "Digital Care", "pacotes-mensais", 29, "monthly", "Acompanhamento técnico mensal essencial."),
  item("pkg-mensal-growth", "Growth", "pacotes-mensais", 199, "monthly", "Plano mensal focado em crescimento e captação."),
  item("pkg-mensal-business", "Business", "pacotes-mensais", 349, "monthly", "Plano mensal avançado para operação digital ativa."),
  item("pkg-mensal-360", "Business 360º", "pacotes-mensais", 499, "monthly", "Acompanhamento 360° contínuo para empresas."),

  // 13. PACOTES COMERCIAIS — POR SETOR
  item("pkg-setor-imobiliario-digital", "Imobiliário Digital", "pacotes-setor", 699, "one-time", "Solução digital focada em agentes e agências imobiliárias."),
  item("pkg-setor-imobiliario-360", "Imobiliário 360º", "pacotes-setor", 1299, "one-time", "Ecossistema completo imobiliário com CRM e automações."),
  item("pkg-setor-beleza-digital", "Beleza Digital", "pacotes-setor", 499, "one-time", "Presença digital e marcações para negócios de beleza."),
  item("pkg-setor-beleza-360", "Beleza 360º", "pacotes-setor", 899, "one-time", "Ecossistema completo para salões e clínicas de estética."),
  item("pkg-setor-restauracao-digital", "Restauração Digital", "pacotes-setor", 399, "one-time", "Presença digital e menu QR para restaurantes e cafés."),
  item("pkg-setor-restauracao-360", "Restauração 360º", "pacotes-setor", 699, "one-time", "Ecossistema completo para restauração, reservas e QR Code."),
  item("pkg-setor-retalho-digital", "Retalho Digital", "pacotes-setor", 599, "one-time", "Solução digital para lojas e marcas comerciais."),
  item("pkg-setor-profissionais-360", "Serviços Profissionais 360º", "pacotes-setor", 699, "one-time", "Presença, autoridade e gestão para gabinetes e consultores."),
  item("pkg-setor-saude-digital", "Saúde e Bem-Estar Digital", "pacotes-setor", 699, "one-time", "Solução digital e marcações para clínicas e saúde."),

  // 14. EXTRAS E UPSELLS
  item("ext-criacao-logo", "Criação de logótipo", "extras-upsells", 79, "one-time", "Criação de logótipo (Essencial 79 € a Profissional 149 €).", { priceMax: 149 }),
  item("ext-identidade-completa", "Identidade visual completa", "extras-upsells", 299, "one-time", "Sistema visual completo da marca."),
  item("ext-fotos", "Fotografias profissionais", "extras-upsells", 149, "one-time", "Produção fotográfica profissional.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("ext-video", "Vídeo promocional", "extras-upsells", 99, "one-time", "Produção de vídeo promocional.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("ext-seo-avancado", "SEO avançado", "extras-upsells", 249, "one-time", "Otimização SEO aprofundada.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("ext-blog-3-artigos", "Blog com 3 artigos iniciais", "extras-upsells", 149, "one-time", "Blog configurado com 3 artigos iniciais publicados."),
  item("ext-newsletter", "Configuração de newsletter", "extras-upsells", 79, "one-time", "Integração e formulário de captação de newsletter."),
  item("ext-agenda", "Integração de agenda", "extras-upsells", 99, "one-time", "Sincronização com calendário de marcações."),
  item("ext-chatbot", "Chatbot", "extras-upsells", 149, "one-time", "Assistente conversacional automatizado."),
  item("ext-avaliacoes-google", "Configuração de avaliações Google", "extras-upsells", 49, "one-time", "Fluxo otimizado para recolha de avaliações Google."),
  item("ext-traducao", "Tradução de website", "extras-upsells", 99, "one-time", "Adaptação multilingue de website.", { isStartingPrice: true, commercialNote: "O valor final depende do âmbito do projeto." }),
  item("ext-pagina-adicional", "Página adicional", "extras-upsells", 75, "one-time", "Adição de página extra."),
];

export function formatCatalogPrice(product: CatalogProduct): string {
  if (product.price === null) return "Sob orçamento";
  const fmt = (n: number) => `${n.toLocaleString("pt-PT")} €`;
  if (product.priceMax) {
    return `${fmt(product.price)} – ${fmt(product.priceMax)}`;
  }
  const prefix = product.isStartingPrice ? "desde " : "";
  const suffix =
    product.billingType === "monthly"
      ? "/mês"
      : product.billingType === "annual"
      ? "/ano"
      : product.priceUnitLabel
      ? `/${product.priceUnitLabel}`
      : "";
  return `${prefix}${fmt(product.price)}${suffix}`;
}

export function getCatalogByCategory(category: CatalogCategoryId): CatalogProduct[] {
  return CATALOG_ITEMS.filter((p) => p.category === category);
}

export function getCatalogItemById(id: string): CatalogProduct | undefined {
  return CATALOG_ITEMS.find((p) => p.id === id);
}
