export interface SectorServiceItem {
  title: string;
  description: string;
  iconName: string;
  relatedServiceSlug: string;
}

export interface SectorItem {
  id: number;
  slug: string;
  name: string;
  shortSubtitle: string;
  badge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  iconName: string;
  status: "active" | "expansion";
  servicesTitle: string;
  servicesSubtitle: string;
  services: SectorServiceItem[];
  packageBadge: string;
  packageTitle: string;
  packageBenefits: string[];
  recommendedServiceSlugs: string[];
}

export const SECTORS: SectorItem[] = [
  {
    id: 1,
    slug: "imobiliario",
    name: "Imobiliário",
    shortSubtitle: "Agências e consultores imobiliários",
    badge: "SOLUÇÕES PARA O SETOR IMOBILIÁRIO",
    heroTitle: "Mais contactos, mais visitas,",
    heroHighlight: "mais negócios.",
    heroDescription:
      "Websites imobiliários, gestão de leads e automação pensados para agências e consultores que querem captar, organizar e converter mais clientes.",
    iconName: "Home",
    status: "active",
    servicesTitle: "Serviços para Agentes e Agências Imobiliárias",
    servicesSubtitle:
      "Um ecossistema completo para reforçar a sua presença digital, organizar contactos e acelerar o acompanhamento comercial.",
    services: [
      {
        title: "Website Imobiliário",
        description: "Site moderno, rápido e estruturado para apresentar imóveis e gerar pedidos de contacto.",
        iconName: "Monitor",
        relatedServiceSlug: "websites",
      },
      {
        title: "CRM de Leads",
        description: "Organize contactos de compradores e proprietários, oportunidades e histórico comercial.",
        iconName: "Layers",
        relatedServiceSlug: "crm-sistemas",
      },
      {
        title: "Campanhas de Leads",
        description: "Estratégias de captação no Google e Meta para atrair potenciais compradores e vendedores.",
        iconName: "Megaphone",
        relatedServiceSlug: "marketing-digital",
      },
      {
        title: "Agendamento de Visitas",
        description: "Marcação online simplificada e integrada com a sua agenda comercial.",
        iconName: "Calendar",
        relatedServiceSlug: "automacao-ia",
      },
      {
        title: "Automação & Follow-up",
        description: "Respostas automáticas iniciais, nutrição de leads e lembretes de acompanhamento.",
        iconName: "Mail",
        relatedServiceSlug: "automacao-ia",
      },
      {
        title: "Conteúdo Imobiliário",
        description: "Estrutura preparada para fotografia, vídeo e apresentações profissionais de imóveis.",
        iconName: "Camera",
        relatedServiceSlug: "redes-sociais",
      },
      {
        title: "Relatórios & Indicadores",
        description: "Acompanhamento de contactos, visitas e desempenho das campanhas num único painel.",
        iconName: "BarChart3",
        relatedServiceSlug: "crm-sistemas",
      },
      {
        title: "Integrações Essenciais",
        description: "Ligação a WhatsApp, email, calendário e ferramentas do seu dia a dia.",
        iconName: "Plug",
        relatedServiceSlug: "crm-sistemas",
      },
    ],
    packageBadge: "PACOTE IMOBILIÁRIO 360°",
    packageTitle: "Tudo o que precisa para crescer no setor imobiliário.",
    packageBenefits: [
      "Presença digital profissional",
      "Gestão simples e eficiente de leads",
      "Mais contactos qualificados",
      "Acompanhamento dedicado da equipa",
    ],
    recommendedServiceSlugs: ["websites", "crm-sistemas", "marketing-digital", "automacao-ia"],
  },
  {
    id: 2,
    slug: "beleza-estetica",
    name: "Beleza e Estética",
    shortSubtitle: "Salões, clínicas de estética e barbearias",
    badge: "SOLUÇÕES PARA NEGÓCIOS DE BELEZA",
    heroTitle: "Mais marcações, mais clientes,",
    heroHighlight: "mais receita.",
    heroDescription:
      "Websites, agendamento online, campanhas e automação pensados para salões de beleza, clínicas de estética e barbearias.",
    iconName: "Sparkles",
    status: "active",
    servicesTitle: "Serviços para Salões, Clínicas e Estúdios de Beleza",
    servicesSubtitle:
      "Um ecossistema completo para atrair novos clientes, simplificar marcações e aumentar a fidelização.",
    services: [
      {
        title: "Website Profissional",
        description: "Site elegante, adaptado à identidade da sua marca e focado em gerar marcações.",
        iconName: "Monitor",
        relatedServiceSlug: "websites",
      },
      {
        title: "Agendamento Online",
        description: "Marcação de tratamentos e serviços com confirmação automática e lembretes.",
        iconName: "Calendar",
        relatedServiceSlug: "automacao-ia",
      },
      {
        title: "Campanhas de Captação",
        description: "Mais visibilidade local e novos pedidos através de campanhas segmentadas.",
        iconName: "Megaphone",
        relatedServiceSlug: "marketing-digital",
      },
      {
        title: "Gestão de Clientes (CRM)",
        description: "Histórico de serviços, preferências e ações de fidelização organizadas.",
        iconName: "Users",
        relatedServiceSlug: "crm-sistemas",
      },
      {
        title: "Automação & Comunicação",
        description: "Confirmações, lembretes de marcação e mensagens de acompanhamento.",
        iconName: "MessageSquare",
        relatedServiceSlug: "automacao-ia",
      },
      {
        title: "Conteúdo & Redes Sociais",
        description: "Planeamento e gestão de presença digital para fortalecer a sua marca.",
        iconName: "Camera",
        relatedServiceSlug: "redes-sociais",
      },
      {
        title: "Relatórios & Resultados",
        description: "Visibilidade sobre marcações, retorno de campanhas e evolução do negócio.",
        iconName: "BarChart3",
        relatedServiceSlug: "crm-sistemas",
      },
      {
        title: "Integrações Essenciais",
        description: "Integração com WhatsApp, calendário, email e ferramentas de gestão.",
        iconName: "Plug",
        relatedServiceSlug: "crm-sistemas",
      },
    ],
    packageBadge: "PACOTE BELEZA 360°",
    packageTitle: "Tudo o que o seu negócio de beleza precisa, num só lugar.",
    packageBenefits: [
      "Presença digital elegante e profissional",
      "Agendamento simplificado",
      "Mais marcações e clientes recorrentes",
      "Apoio contínuo da nossa equipa",
    ],
    recommendedServiceSlugs: ["websites", "redes-sociais", "automacao-ia", "marketing-digital"],
  },
  {
    id: 3,
    slug: "restauracao",
    name: "Restauração",
    shortSubtitle: "Restaurantes, cafés, bares e takeaway",
    badge: "SOLUÇÕES PARA RESTAURAÇÃO",
    heroTitle: "Mais reservas, mais clientes,",
    heroHighlight: "mais faturação.",
    heroDescription:
      "Websites, menus digitais por QR Code, reservas online, encomendas e marketing local para restaurantes, cafés e bares.",
    iconName: "Utensils",
    status: "active",
    servicesTitle: "Serviços para Restaurantes, Cafés, Bares e Takeaway",
    servicesSubtitle:
      "Um ecossistema completo para atrair clientes, simplificar a operação em sala e potenciar pedidos.",
    services: [
      {
        title: "Website Profissional",
        description: "Site moderno e rápido pensado para gerar reservas de mesa e pedidos diretos.",
        iconName: "Monitor",
        relatedServiceSlug: "websites",
      },
      {
        title: "Menu Digital (QR Code)",
        description: "Ementa sempre atualizada e acessível por QR Code, sem necessidade de reimpressões.",
        iconName: "QrCode",
        relatedServiceSlug: "qr-code",
      },
      {
        title: "Reservas Online",
        description: "Gestão simples de reservas com confirmação automática e lembretes.",
        iconName: "Calendar",
        relatedServiceSlug: "automacao-ia",
      },
      {
        title: "Encomendas & Takeaway",
        description: "Canal digital próprio para pedidos de takeaway ou entrega.",
        iconName: "ShoppingBag",
        relatedServiceSlug: "lojas-online",
      },
      {
        title: "Avaliações Google",
        description: "Soluções QR Code diretas para facilitar avaliações e reforçar a reputação local.",
        iconName: "Star",
        relatedServiceSlug: "qr-code",
      },
      {
        title: "Conteúdo & Redes Sociais",
        description: "Gestão estratégica para dar mais visibilidade aos seus pratos e espaço.",
        iconName: "Camera",
        relatedServiceSlug: "redes-sociais",
      },
      {
        title: "Campanhas de Captação",
        description: "Anúncios locais para atrair novos clientes, reservas de grupo e pedidos.",
        iconName: "Megaphone",
        relatedServiceSlug: "marketing-digital",
      },
      {
        title: "Integrações Essenciais",
        description: "Ligação a Google, WhatsApp e ferramentas utilizadas no dia a dia do espaço.",
        iconName: "Plug",
        relatedServiceSlug: "crm-sistemas",
      },
    ],
    packageBadge: "PLAQUINHAS QR CODE & ECOSSISTEMA 360°",
    packageTitle: "Mais praticidade para os seus clientes e melhor experiência em sala.",
    packageBenefits: [
      "Menu digital sempre atualizado",
      "Acesso direto a avaliações no Google",
      "Reservas online organizadas",
      "Design personalizado com a sua marca",
    ],
    recommendedServiceSlugs: ["qr-code", "websites", "redes-sociais", "marketing-digital"],
  },
  {
    id: 4,
    slug: "retalho-ecommerce",
    name: "Retalho e E-commerce",
    shortSubtitle: "Lojas físicas, marcas e comércio online",
    badge: "SOLUÇÕES PARA RETALHO & E-COMMERCE",
    heroTitle: "Mais visibilidade, mais vendas,",
    heroHighlight: "mais clientes.",
    heroDescription:
      "Websites, lojas online e estratégias de marketing digital para marcas e lojas físicas que querem vender mais dentro e fora da loja.",
    iconName: "ShoppingBag",
    status: "active",
    servicesTitle: "Serviços para Lojas e Marcas Comerciais",
    servicesSubtitle:
      "Um ecossistema completo para aumentar a sua presença online, organizar catálogo e fidelizar compradores.",
    services: [
      {
        title: "Loja Online (E-commerce)",
        description: "Venda os seus produtos online de forma segura, intuitiva e adaptada à sua marca.",
        iconName: "ShoppingCart",
        relatedServiceSlug: "lojas-online",
      },
      {
        title: "Website Institucional",
        description: "Apresente a sua marca, coleções e pontos de venda com design de alto impacto.",
        iconName: "Monitor",
        relatedServiceSlug: "websites",
      },
      {
        title: "Gestão de Produtos & Stock",
        description: "Estrutura preparada para organizar catálogo, categorias, inventário e encomendas.",
        iconName: "Package",
        relatedServiceSlug: "lojas-online",
      },
      {
        title: "Campanhas de Vendas",
        description: "Anúncios focados em tráfego qualificado e conversão para a sua loja.",
        iconName: "Megaphone",
        relatedServiceSlug: "marketing-digital",
      },
      {
        title: "Automação & Notificações",
        description: "Confirmações de encomenda e comunicações automáticas com os clientes.",
        iconName: "Bell",
        relatedServiceSlug: "automacao-ia",
      },
      {
        title: "Avaliações Google",
        description: "Reforce a confiança da sua marca com prova social e presença local otimizada.",
        iconName: "Star",
        relatedServiceSlug: "qr-code",
      },
      {
        title: "Conteúdo & Redes Sociais",
        description: "Divulgação de produtos, coleções e promoções nos canais sociais.",
        iconName: "Camera",
        relatedServiceSlug: "redes-sociais",
      },
      {
        title: "Integrações Essenciais",
        description: "Ligação a métodos de pagamento, transportadoras, email e WhatsApp.",
        iconName: "Plug",
        relatedServiceSlug: "crm-sistemas",
      },
    ],
    packageBadge: "PACOTE RETALHO 360°",
    packageTitle: "Tudo o que a sua loja precisa para vender online e offline.",
    packageBenefits: [
      "Loja online preparada para conversão",
      "Gestão organizada de produtos e encomendas",
      "Campanhas e redes sociais alinhadas",
      "Suporte técnico contínuo",
    ],
    recommendedServiceSlugs: ["lojas-online", "marketing-digital", "redes-sociais", "automacao-ia"],
  },
  {
    id: 5,
    slug: "servicos-profissionais",
    name: "Serviços Profissionais",
    shortSubtitle: "Advogados, contabilistas, consultores e arquitetos",
    badge: "SOLUÇÕES PARA SERVIÇOS PROFISSIONAIS",
    heroTitle: "Mais autoridade, mais oportunidades,",
    heroHighlight: "mais clientes.",
    heroDescription:
      "Soluções digitais para gabinetes, consultores, contabilistas e profissionais liberais que querem crescer com organização e imagem sólida.",
    iconName: "Briefcase",
    status: "active",
    servicesTitle: "Serviços para Gabinetes e Profissionais Liberais",
    servicesSubtitle:
      "Um ecossistema pensado para fortalecer a credibilidade da sua marca, gerar pedidos qualificados e organizar o atendimento.",
    services: [
      {
        title: "Website Profissional",
        description: "Site moderno, credível e orientado para apresentar áreas de atuação e captar contactos.",
        iconName: "Monitor",
        relatedServiceSlug: "websites",
      },
      {
        title: "Agendamento Online",
        description: "Marcação de reuniões e consultas iniciais com confirmação automática.",
        iconName: "Calendar",
        relatedServiceSlug: "automacao-ia",
      },
      {
        title: "CRM & Gestão de Contactos",
        description: "Organize leads, clientes, processos e oportunidades num só sistema.",
        iconName: "Users",
        relatedServiceSlug: "crm-sistemas",
      },
      {
        title: "Propostas & Orçamentos",
        description: "Fluxo digital para pedidos de proposta e acompanhamento comercial.",
        iconName: "FileText",
        relatedServiceSlug: "crm-sistemas",
      },
      {
        title: "Automação & Comunicação",
        description: "Respostas automáticas e seguimento organizado de novos contactos.",
        iconName: "MessageSquare",
        relatedServiceSlug: "automacao-ia",
      },
      {
        title: "Avaliações Google",
        description: "Reforce a reputação e confiança do seu gabinete nas pesquisas locais.",
        iconName: "Star",
        relatedServiceSlug: "qr-code",
      },
      {
        title: "Conteúdo Profissional",
        description: "Posicionamento digital e partilha de conhecimento para gerar autoridade.",
        iconName: "Camera",
        relatedServiceSlug: "redes-sociais",
      },
      {
        title: "Integrações Essenciais",
        description: "Integração com email profissional, calendário, WhatsApp e ferramentas internas.",
        iconName: "Plug",
        relatedServiceSlug: "crm-sistemas",
      },
    ],
    packageBadge: "PACOTE PROFISSIONAL 360°",
    packageTitle: "Tudo o que precisa para um negócio mais organizado e visível.",
    packageBenefits: [
      "Presença digital de referência",
      "Gestão centralizada de contactos",
      "Mais reuniões e pedidos qualificados",
      "Acompanhamento próximo da equipa",
    ],
    recommendedServiceSlugs: ["websites", "crm-sistemas", "automacao-ia", "marketing-digital"],
  },
  {
    id: 6,
    slug: "saude-bem-estar",
    name: "Saúde e Bem-Estar",
    shortSubtitle: "Clínicas, consultórios e terapias",
    badge: "SOLUÇÕES PARA SAÚDE & BEM-ESTAR",
    heroTitle: "Mais consultas, mais pacientes,",
    heroHighlight: "mais crescimento.",
    heroDescription:
      "Websites, agendamento online, gestão de pacientes e marketing digital para clínicas, consultórios e profissionais de saúde e bem-estar.",
    iconName: "HeartPulse",
    status: "active",
    servicesTitle: "Serviços para Clínicas e Profissionais de Saúde",
    servicesSubtitle:
      "Um ecossistema completo para atrair novos pacientes, organizar o atendimento e elevar a confiança na sua clínica.",
    services: [
      {
        title: "Website Profissional",
        description: "Site moderno, claro e adaptado às especialidades e equipa da sua clínica.",
        iconName: "Monitor",
        relatedServiceSlug: "websites",
      },
      {
        title: "Agendamento Online",
        description: "Marcação de consultas 24/7 com confirmações e lembretes automáticos.",
        iconName: "Calendar",
        relatedServiceSlug: "automacao-ia",
      },
      {
        title: "Campanhas de Captação",
        description: "Divulgação ética e segmentada no Google e Meta para atrair novos pacientes.",
        iconName: "Megaphone",
        relatedServiceSlug: "marketing-digital",
      },
      {
        title: "Gestão de Pacientes (CRM)",
        description: "Organização de contactos, histórico de marcações e acompanhamento.",
        iconName: "Users",
        relatedServiceSlug: "crm-sistemas",
      },
      {
        title: "Automação & Comunicação",
        description: "Confirmações, lembretes de consulta e campanhas de acompanhamento.",
        iconName: "Bell",
        relatedServiceSlug: "automacao-ia",
      },
      {
        title: "Conteúdo Profissional",
        description: "Comunicação educativa e presença nas redes sociais para gerar confiança.",
        iconName: "Camera",
        relatedServiceSlug: "redes-sociais",
      },
      {
        title: "Avaliações Google",
        description: "Fortaleça a reputação online da clínica e facilite feedback de pacientes.",
        iconName: "Star",
        relatedServiceSlug: "qr-code",
      },
      {
        title: "Integrações Essenciais",
        description: "Ligação a WhatsApp, calendário, email e ferramentas clínicas compatíveis.",
        iconName: "Plug",
        relatedServiceSlug: "crm-sistemas",
      },
    ],
    packageBadge: "PACOTE SAÚDE 360°",
    packageTitle: "Tudo o que a sua clínica precisa, numa solução completa.",
    packageBenefits: [
      "Presença digital credível e moderna",
      "Marcações online mais simples",
      "Gestão organizada de pacientes",
      "Apoio especializado contínuo",
    ],
    recommendedServiceSlugs: ["websites", "crm-sistemas", "automacao-ia", "marketing-digital"],
  },
];

// Setores de expansão preparados na arquitetura (documentados nas referências visuais)
export const EXPANSION_SECTORS: Array<{
  slug: string;
  name: string;
  shortSubtitle: string;
  iconName: string;
}> = [
  {
    slug: "hotelaria-turismo",
    name: "Hotelaria & Turismo",
    shortSubtitle: "Hotéis, alojamento local e turismo",
    iconName: "BedDouble",
  },
  {
    slug: "automovel-mobilidade",
    name: "Automóvel & Mobilidade",
    shortSubtitle: "Stands, oficinas e serviços automóvel",
    iconName: "Car",
  },
  {
    slug: "construcao-remodelacoes",
    name: "Construção & Remodelações",
    shortSubtitle: "Construção, arquitetura e engenharia",
    iconName: "HardHat",
  },
];

export function getSectorBySlug(slug: string): SectorItem | undefined {
  return SECTORS.find((s) => s.slug === slug);
}
