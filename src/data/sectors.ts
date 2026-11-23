export interface SectorServiceItem {
  title: string;
  description: string;
  iconName: string;
  relatedServiceSlug: string;
  image?: string;
  imageAlt?: string;
  visualType?: "ads" | "reviews" | "integrations";
  overlayLabel?: string;
}

export interface SectorPhonePreview {
  brandLabel: string;
  headline: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  checklist: string[];
}

export interface SectorSpecialOffer {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  items: {
    title: string;
    description: string;
    iconName: string;
  }[];
  disclaimerTitle: string;
  disclaimerText: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
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
  heroImage?: string;
  heroImageAlt?: string;
  phonePreview?: SectorPhonePreview;
  iconName: string;
  status: "active" | "expansion";
  servicesTitle: string;
  servicesSubtitle: string;
  services: SectorServiceItem[];
  specialOffer?: SectorSpecialOffer;
  packageBadge: string;
  packageTitle: string;
  packageBenefits: string[];
  packageImage?: string;
  packageImageAlt?: string;
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
    heroImage: "/images/production/imobiliario/hero-imobiliario.jpg",
    heroImageAlt:
      "Moradia moderna de luxo em Portugal ao pôr do sol com piscina infinita e iluminação arquitetónica dourada",
    phonePreview: {
      brandLabel: "Imobiliário 360°",
      headline: "Encontre o imóvel ideal e agende visita",
      ctaLabel: "Agendar Visita",
      image: "/images/production/imobiliario/smartphone-imobiliario.jpg",
      imageAlt:
        "Sala luminosa de moradia moderna de luxo com vista para piscina e jardim ao pôr do sol",
      checklist: [
        "Pesquisa Rápida de Imóveis",
        "Agendamento Online de Visitas",
        "Qualificação Automática de Leads",
        "Acompanhamento no CRM",
      ],
    },
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
        image: "/images/production/reutilizaveis/website-portatil.jpg",
        imageAlt: "Portátil preto sobre secretária moderna com iluminação dourada para website imobiliário",
        overlayLabel: "Catálogo de Imóveis · Pedidos de Visita",
      },
      {
        title: "CRM de Leads",
        description: "Organize contactos de compradores e proprietários, oportunidades e histórico comercial.",
        iconName: "Layers",
        relatedServiceSlug: "crm-sistemas",
        image: "/images/production/saude-bem-estar/servico-crm-gestao.jpg",
        imageAlt: "Monitor executivo com gráficos dourados de pipeline comercial e acompanhamento de leads",
        overlayLabel: "Pipeline · Compradores & Proprietários",
      },
      {
        title: "Campanhas de Leads",
        description: "Estratégias de captação no Google e Meta para atrair potenciais compradores e vendedores.",
        iconName: "Megaphone",
        relatedServiceSlug: "marketing-digital",
        visualType: "ads",
      },
      {
        title: "Agendamento de Visitas",
        description: "Marcação online simplificada e integrada com a sua agenda comercial.",
        iconName: "Calendar",
        relatedServiceSlug: "automacao-ia",
        image: "/images/production/saude-bem-estar/servico-agendamento-online.jpg",
        imageAlt: "Tablet digital em secretária escura para marcação online de visitas",
        overlayLabel: "Visita Confirmada · Agenda Sincronizada",
      },
      {
        title: "Automação & Follow-up",
        description: "Respostas automáticas iniciais, nutrição de leads e lembretes de acompanhamento.",
        iconName: "Mail",
        relatedServiceSlug: "automacao-ia",
        image: "/images/production/saude-bem-estar/servico-automacao-lembrete.jpg",
        imageAlt: "Smartphone preto com acabamento dourado para respostas automáticas e follow-up de leads",
        overlayLabel: "Follow-up automático · Resposta imediata",
      },
      {
        title: "Conteúdo Imobiliário",
        description: "Estrutura preparada para fotografia, vídeo e apresentações profissionais de imóveis.",
        iconName: "Camera",
        relatedServiceSlug: "redes-sociais",
        image: "/images/production/imobiliario/conteudo-imobiliario.jpg",
        imageAlt: "Produção audiovisual profissional com câmara em tripé no interior de moradia moderna ao pôr do sol",
      },
      {
        title: "Relatórios & Indicadores",
        description: "Acompanhamento de contactos, visitas e desempenho das campanhas num único painel.",
        iconName: "BarChart3",
        relatedServiceSlug: "crm-sistemas",
        visualType: "reviews",
      },
      {
        title: "Integrações Essenciais",
        description: "Ligação a WhatsApp, email, calendário e ferramentas do seu dia a dia.",
        iconName: "Plug",
        relatedServiceSlug: "crm-sistemas",
        visualType: "integrations",
      },
    ],
    specialOffer: {
      id: "conteudo-imobiliario",
      badge: "CONTEÚDO IMOBILIÁRIO",
      title: "Conteúdo audiovisual para valorizar cada imóvel",
      subtitle:
        "Produção e edição de conteúdos digitais a partir de materiais fornecidos e autorizados pelo consultor ou agência, prontos para destacar angariações nos canais digitais.",
      items: [
        {
          title: "Vídeos a partir de fotografias autorizadas",
          description:
            "Criação de vídeos fluidos de apresentação a partir de fotografias próprias ou expressamente autorizadas pelo cliente.",
          iconName: "Camera",
        },
        {
          title: "Vídeos curtos para redes sociais",
          description:
            "Formatos verticais e dinâmicos preparados para divulgação em Instagram Reels, TikTok e anúncios imobiliários.",
          iconName: "Smartphone",
        },
        {
          title: "Melhoria de fotografias",
          description:
            "Ajustes de iluminação, cor, nitidez e enquadramento para reforçar a apresentação visual sem descaracterizar o imóvel.",
          iconName: "Sparkles",
        },
        {
          title: "Animações aéreas e de mapa",
          description:
            "Enquadramento aéreo ou de mapa disponibilizado apenas após confirmação prévia dos direitos comerciais e licenciamento das fontes utilizadas.",
          iconName: "Target",
        },
      ],
      disclaimerTitle: "Direitos de imagem e enquadramento",
      disclaimerText:
        "Todos os conteúdos são produzidos exclusivamente com fotografias e materiais autorizados. Animações aéreas ou de mapa avançam apenas quando os direitos comerciais de utilização estejam confirmados. O âmbito e orçamento são definidos caso a caso.",
      ctaLabel: "Pedir Orçamento de Conteúdo",
      ctaHref: "/pedir-orcamento?setor=imobiliario",
      secondaryCtaLabel: "Falar com a Equipa",
      secondaryCtaHref: "/contactos",
    },
    packageBadge: "PACOTE IMOBILIÁRIO 360°",
    packageTitle: "Tudo o que precisa para crescer no setor imobiliário.",
    packageBenefits: [
      "Presença digital profissional",
      "Gestão simples e eficiente de leads",
      "Mais contactos qualificados",
      "Acompanhamento dedicado da equipa",
    ],
    packageImage: "/images/production/imobiliario/pacote-imobiliario.jpg",
    packageImageAlt: "Escritório executivo imobiliário luminoso ao pôr do sol com portátil e vista panorâmica",
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
    heroImage: "/images/production/beleza-estetica/hero-beleza.jpg",
    heroImageAlt:
      "Interior luminoso de salão de beleza e estética moderno com espelhos ovais iluminados a dourado e balcão em mármore",
    phonePreview: {
      brandLabel: "Beleza & Estética",
      headline: "Marque o seu tratamento online",
      ctaLabel: "Agendar Agora",
      image: "/images/production/beleza-estetica/smartphone-beleza.jpg",
      imageAlt:
        "Especialista de estética a realizar tratamento facial relaxante em clínica moderna com iluminação quente",
      checklist: [
        "Estética Avançada",
        "Tratamentos Faciais",
        "Laser & Depilação",
        "Corpo & Bem-Estar",
      ],
    },
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
        image: "/images/production/reutilizaveis/website-portatil.jpg",
        imageAlt: "Portátil preto moderno sobre secretária com iluminação dourada para website de salão de beleza",
        overlayLabel: "Site de Beleza · Serviços & Marcações",
      },
      {
        title: "Agendamento Online",
        description: "Marcação de tratamentos e serviços com confirmação automática e lembretes.",
        iconName: "Calendar",
        relatedServiceSlug: "automacao-ia",
        image: "/images/production/saude-bem-estar/servico-agendamento-online.jpg",
        imageAlt: "Tablet digital em balcão escuro para gestão de marcações de estética 24/7",
        overlayLabel: "Marcação 24/7 · Lembrete Automático",
      },
      {
        title: "Campanhas de Captação",
        description: "Mais visibilidade local e novos pedidos através de campanhas segmentadas.",
        iconName: "Megaphone",
        relatedServiceSlug: "marketing-digital",
        visualType: "ads",
      },
      {
        title: "Gestão de Clientes (CRM)",
        description: "Histórico de serviços, preferências e ações de fidelização organizadas.",
        iconName: "Users",
        relatedServiceSlug: "crm-sistemas",
        image: "/images/production/saude-bem-estar/servico-crm-gestao.jpg",
        imageAlt: "Monitor executivo com indicadores dourados de gestão de clientes e fidelização",
        overlayLabel: "Histórico de Tratamentos · Fidelização",
      },
      {
        title: "Automação & Comunicação",
        description: "Confirmações, lembretes de marcação e mensagens de acompanhamento.",
        iconName: "MessageSquare",
        relatedServiceSlug: "automacao-ia",
        image: "/images/production/saude-bem-estar/servico-automacao-lembrete.jpg",
        imageAlt: "Smartphone preto com friso dourado para confirmações e lembretes automáticos de marcação",
        overlayLabel: "A sua marcação foi confirmada ✓",
      },
      {
        title: "Conteúdo & Redes Sociais",
        description: "Planeamento e gestão de presença digital para fortalecer a sua marca.",
        iconName: "Camera",
        relatedServiceSlug: "redes-sociais",
        image: "/images/production/beleza-estetica/conteudo-beleza.jpg",
        imageAlt: "Gravação de vídeo e reels com anel de luz dourado e smartphone num estúdio de beleza",
      },
      {
        title: "Relatórios & Resultados",
        description: "Visibilidade sobre marcações, retorno de campanhas e evolução do negócio.",
        iconName: "BarChart3",
        relatedServiceSlug: "crm-sistemas",
        visualType: "reviews",
      },
      {
        title: "Integrações Essenciais",
        description: "Integração com WhatsApp, calendário, email e ferramentas de gestão.",
        iconName: "Plug",
        relatedServiceSlug: "crm-sistemas",
        visualType: "integrations",
      },
    ],
    specialOffer: {
      id: "marca-propria",
      badge: "OFERTA COMPLEMENTAR · MARCA PRÓPRIA",
      title: "Produtos de marca própria para o seu espaço de beleza",
      subtitle:
        "Apoiamos salões, clínicas de estética e estúdios que pretendem desenvolver uma linha própria (como perfumes, cuidados capilares ou cuidado pessoal), do conceito à coordenação da produção.",
      items: [
        {
          title: "Conceito da linha",
          description:
            "Apoio na definição da proposta de valor, posicionamento e alinhamento com o perfil dos clientes do espaço.",
          iconName: "Sparkles",
        },
        {
          title: "Identidade e embalagem",
          description:
            "Criação da identidade visual da marca, design de rótulos e apresentação gráfica das embalagens.",
          iconName: "Palette",
        },
        {
          title: "Seleção de fabricante",
          description:
            "Apoio na identificação e avaliação de fabricantes e parceiros produtivos adequados ao tipo de produto.",
          iconName: "Handshake",
        },
        {
          title: "Coordenação da produção",
          description:
            "Acompanhamento operacional entre design, amostras, prazos e encomenda junto do fabricante escolhido.",
          iconName: "Package",
        },
      ],
      disclaimerTitle: "Papel da LeadCapture e responsabilidades regulamentares",
      disclaimerText:
        "A LeadCapture apoia o conceito, identidade, embalagem, seleção de fabricante e coordenação da produção — não fabrica, não formula nem certifica produtos. O fabrico, a formulação, a avaliação de segurança, a rotulagem legal e a conformidade regulamentar (incluindo notificação CPNP e Pessoa Responsável na UE) cabem exclusivamente ao fabricante e às entidades legalmente competentes. O âmbito e orçamento são definidos após avaliação do projeto.",
      ctaLabel: "Pedir Orçamento de Marca Própria",
      ctaHref: "/pedir-orcamento?setor=beleza-estetica",
      secondaryCtaLabel: "Apoio Administrativo INPI",
      secondaryCtaHref: "/solucoes#apoio-marca-inpi",
    },
    packageBadge: "PACOTE BELEZA 360°",
    packageTitle: "Tudo o que o seu negócio de beleza precisa, num só lugar.",
    packageBenefits: [
      "Presença digital elegante e profissional",
      "Agendamento simplificado",
      "Mais marcações e clientes recorrentes",
      "Apoio contínuo da nossa equipa",
    ],
    packageImage: "/images/production/beleza-estetica/pacote-beleza.jpg",
    packageImageAlt: "Balcão de clínica de estética em mármore com portátil, toalhas enroladas, cosméticos e flores",
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
    heroImage: "/images/production/restauracao/hero-restauracao.jpg",
    heroImageAlt:
      "Interior acolhedor e moderno de restaurante português com candeeiros dourados, mesas de madeira e cozinha aberta",
    phonePreview: {
      brandLabel: "Restauração 360°",
      headline: "Descubra o nosso menu digital",
      ctaLabel: "Ver Menu Digital",
      image: "/images/production/restauracao/smartphone-restauracao.jpg",
      imageAlt:
        "Prato gourmet de peixe grelhado com legumes em prato preto artesanal sob iluminação quente de restaurante",
      checklist: [
        "Menu Digital por QR Code",
        "Reservar Mesa Online",
        "Encomendar Takeaway",
        "Avaliar no Google",
      ],
    },
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
        image: "/images/production/reutilizaveis/website-portatil.jpg",
        imageAlt: "Portátil preto em secretária escura com luz dourada para website de restaurante",
        overlayLabel: "Site do Restaurante · Reservas & Ementa",
      },
      {
        title: "Menu Digital (QR Code)",
        description: "Ementa sempre atualizada e acessível por QR Code, sem necessidade de reimpressões.",
        iconName: "QrCode",
        relatedServiceSlug: "qr-code",
        image: "/images/production/restauracao/pacote-restauracao-qr.jpg",
        imageAlt: "Placas acrílicas preto e dourado com QR Code sobre mesa de restaurante",
        overlayLabel: "Ementa Digital · Atualização Instantânea",
      },
      {
        title: "Reservas Online",
        description: "Gestão simples de reservas com confirmação automática e lembretes.",
        iconName: "Calendar",
        relatedServiceSlug: "automacao-ia",
        image: "/images/production/saude-bem-estar/servico-agendamento-online.jpg",
        imageAlt: "Tablet digital para gestão de reservas de mesa e confirmação automática",
        overlayLabel: "Reserva de Mesa · Confirmação Automática",
      },
      {
        title: "Encomendas & Takeaway",
        description: "Canal digital próprio para pedidos de takeaway ou entrega.",
        iconName: "ShoppingBag",
        relatedServiceSlug: "lojas-online",
        image: "/images/production/restauracao/encomendas-takeaway.jpg",
        imageAlt: "Saco de takeaway preto premium com ícone dourado sobre balcão de madeira em restaurante",
      },
      {
        title: "Avaliações Google",
        description: "Soluções QR Code diretas para facilitar avaliações e reforçar a reputação local.",
        iconName: "Star",
        relatedServiceSlug: "qr-code",
        visualType: "reviews",
      },
      {
        title: "Conteúdo & Redes Sociais",
        description: "Gestão estratégica para dar mais visibilidade aos seus pratos e espaço.",
        iconName: "Camera",
        relatedServiceSlug: "redes-sociais",
        image: "/images/production/restauracao/conteudo-restauracao.jpg",
        imageAlt: "Sessão fotográfica gastronómica com câmara profissional em tripé dentro de restaurante",
      },
      {
        title: "Campanhas de Captação",
        description: "Anúncios locais para atrair novos clientes, reservas de grupo e pedidos.",
        iconName: "Megaphone",
        relatedServiceSlug: "marketing-digital",
        visualType: "ads",
      },
      {
        title: "Integrações Essenciais",
        description: "Ligação a Google, WhatsApp e ferramentas utilizadas no dia a dia do espaço.",
        iconName: "Plug",
        relatedServiceSlug: "crm-sistemas",
        visualType: "integrations",
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
    packageImage: "/images/production/restauracao/pacote-restauracao-qr.jpg",
    packageImageAlt: "Placas QR Code personalizadas em preto e dourado sobre mesa de restaurante iluminada",
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
    heroImage: "/images/production/saude-bem-estar/hero-clinica.jpg",
    heroImageAlt:
      "Receção de clínica moderna de saúde e bem-estar com balcão em mármore, madeira ripada e iluminação dourada acolhedora",
    phonePreview: {
      brandLabel: "Saúde & Bem-Estar",
      headline: "Agende a sua consulta online",
      ctaLabel: "Marcar Consulta",
      image: "/images/production/saude-bem-estar/profissional-saude-smartphone.jpg",
      imageAlt:
        "Profissional de saúde sorridente em consultório clínico moderno com iluminação quente",
      checklist: [
        "Consultas Presenciais",
        "Teleconsulta",
        "Acompanhamento",
        "Planos Personalizados",
      ],
    },
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
        image: "/images/production/saude-bem-estar/servico-website-clinica.jpg",
        imageAlt:
          "Portátil moderno sobre secretária escura em consultório clínico com iluminação dourada",
        overlayLabel: "Site Clínico · Especialidades & Marcações",
      },
      {
        title: "Agendamento Online",
        description: "Marcação de consultas 24/7 com confirmações e lembretes automáticos.",
        iconName: "Calendar",
        relatedServiceSlug: "automacao-ia",
        image: "/images/production/saude-bem-estar/servico-agendamento-online.jpg",
        imageAlt:
          "Tablet digital sobre balcão escuro de receção clínica para gestão de marcações online",
        overlayLabel: "Agenda Online · Confirmação Automática",
      },
      {
        title: "Campanhas de Captação",
        description: "Divulgação ética e segmentada no Google e Meta para atrair novos pacientes.",
        iconName: "Megaphone",
        relatedServiceSlug: "marketing-digital",
        visualType: "ads",
      },
      {
        title: "Gestão de Pacientes (CRM)",
        description: "Organização de contactos, histórico de marcações e acompanhamento.",
        iconName: "Users",
        relatedServiceSlug: "crm-sistemas",
        image: "/images/production/saude-bem-estar/servico-crm-gestao.jpg",
        imageAlt:
          "Monitor em secretária executiva de clínica com gráficos dourados de acompanhamento de pacientes",
        overlayLabel: "Ficha de Paciente · Histórico & Consultas",
      },
      {
        title: "Automação & Comunicação",
        description: "Confirmações, lembretes de consulta e campanhas de acompanhamento.",
        iconName: "Bell",
        relatedServiceSlug: "automacao-ia",
        image: "/images/production/saude-bem-estar/servico-automacao-lembrete.jpg",
        imageAlt:
          "Smartphone preto com acabamento dourado sobre secretária de clínica para lembretes automáticos",
        overlayLabel: "Lembrete de consulta — Confirma a sua presença?",
      },
      {
        title: "Conteúdo Profissional",
        description: "Comunicação educativa e presença nas redes sociais para gerar confiança.",
        iconName: "Camera",
        relatedServiceSlug: "redes-sociais",
        image: "/images/production/saude-bem-estar/servico-conteudo-profissional.jpg",
        imageAlt:
          "Gravação de vídeo profissional de médica em consultório clínico moderno com iluminação de estúdio",
      },
      {
        title: "Avaliações Google",
        description: "Fortaleça a reputação online da clínica e facilite feedback de pacientes.",
        iconName: "Star",
        relatedServiceSlug: "qr-code",
        visualType: "reviews",
      },
      {
        title: "Integrações Essenciais",
        description: "Ligação a WhatsApp, calendário, email e ferramentas clínicas compatíveis.",
        iconName: "Plug",
        relatedServiceSlug: "crm-sistemas",
        visualType: "integrations",
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
    packageImage: "/images/production/saude-bem-estar/pacote-ambiente-clinica.jpg",
    packageImageAlt:
      "Sala de tratamento e consulta moderna e relaxante com marquesa, toalhas enroladas e iluminação quente",
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
