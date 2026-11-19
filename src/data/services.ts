export interface ServiceFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceItem {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  badge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  checklist: string[];
  primaryCtaLabel: string;
  iconName: string;
  highlights: { label: string; iconName: string }[];
  sectionTitle: string;
  features: ServiceFeature[];
  ctaTitle: string;
  ctaDescription: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 11,
    slug: "websites",
    name: "Websites",
    shortName: "Websites Profissionais",
    badge: "PRESENÇA DIGITAL PROFISSIONAL",
    heroTitle: "Websites profissionais que",
    heroHighlight: "geram resultados.",
    heroDescription:
      "Presença digital sólida que transmite credibilidade, atrai clientes e transforma visitantes em oportunidades reais de negócio.",
    checklist: [
      "Websites institucionais e corporativos",
      "Landing pages de alta conversão",
      "Design moderno, personalizado e responsivo",
      "Estrutura otimizada para SEO no Google",
      "Integração com formulários, WhatsApp e CRM",
    ],
    primaryCtaLabel: "Pedir Demonstração",
    iconName: "Monitor",
    highlights: [
      { label: "Mais credibilidade", iconName: "ShieldCheck" },
      { label: "100% responsivo", iconName: "Smartphone" },
      { label: "Rápido e seguro", iconName: "Zap" },
      { label: "Focado em conversão", iconName: "Target" },
    ],
    sectionTitle: "O que inclui o seu Website Profissional",
    features: [
      {
        title: "Design Personalizado",
        description: "Layout alinhado à identidade da sua marca, sem templates genéricos.",
        iconName: "Palette",
      },
      {
        title: "Experiência Mobile-First",
        description: "Navegação fluida em smartphone, tablet e desktop.",
        iconName: "Smartphone",
      },
      {
        title: "Base Técnica SEO",
        description: "Estrutura semântica e rápida preparada para visibilidade nos motores de pesquisa.",
        iconName: "Search",
      },
      {
        title: "Captação de Leads",
        description: "Formulários inteligentes e botões de ação estrategicamente posicionados.",
        iconName: "MousePointerClick",
      },
    ],
    ctaTitle: "Pronto para lançar o website ideal para a sua empresa?",
    ctaDescription:
      "Fale connosco e descubra como um website LeadCapture pode elevar a presença digital do seu negócio.",
  },
  {
    id: 12,
    slug: "lojas-online",
    name: "Lojas Online",
    shortName: "Lojas Online (E-commerce)",
    badge: "COMÉRCIO DIGITAL 360°",
    heroTitle: "Lojas Online com",
    heroHighlight: "design premium.",
    heroDescription:
      "Venda os seus produtos e serviços em qualquer lugar com uma loja online moderna, segura e integrada com as ferramentas do seu negócio.",
    checklist: [
      "Design moderno e personalizado à sua marca",
      "Gestão simples de produtos, stock e encomendas",
      "Preparada para múltiplos métodos de pagamento",
      "Integração com envios e logística",
      "Otimizada para SEO e dispositivos móveis",
    ],
    primaryCtaLabel: "Pedir Demonstração",
    iconName: "ShoppingBag",
    highlights: [
      { label: "E-commerce completo", iconName: "ShoppingCart" },
      { label: "Mobile friendly", iconName: "Smartphone" },
      { label: "Pagamentos seguros", iconName: "CreditCard" },
      { label: "Suporte dedicado", iconName: "Headphones" },
    ],
    sectionTitle: "Tudo o que precisa para vender online",
    features: [
      {
        title: "Catálogo Intuitivo",
        description: "Organize produtos, variações, categorias e filtros de forma clara para o cliente.",
        iconName: "Layers",
      },
      {
        title: "Checkout Otimizado",
        description: "Processo de compra simples e rápido para reduzir abandonos de carrinho.",
        iconName: "CreditCard",
      },
      {
        title: "Gestão Centralizada",
        description: "Controle pedidos, clientes e atualizações de estado num único painel.",
        iconName: "ClipboardList",
      },
      {
        title: "Pronta para Escalar",
        description: "Estrutura preparada para integrar campanhas, email marketing e automações.",
        iconName: "TrendingUp",
      },
    ],
    ctaTitle: "Quer começar a vender online com profissionalismo?",
    ctaDescription:
      "Solicite uma demonstração e conheça a nossa abordagem para lojas online de alta conversão.",
  },
  {
    id: 13,
    slug: "crm-sistemas",
    name: "CRM e Sistemas",
    shortName: "CRM & Sistemas",
    badge: "SOLUÇÕES DIGITAIS",
    heroTitle: "CRM &",
    heroHighlight: "Sistemas",
    heroDescription:
      "Centralize contactos, oportunidades de vendas, clientes e processos do seu negócio num único sistema organizado.",
    checklist: [
      "Gestão de contactos e clientes",
      "Pipeline comercial e oportunidades",
      "Tarefas e acompanhamento de equipa",
      "Relatórios e indicadores de desempenho",
      "Automatização de processos internos",
    ],
    primaryCtaLabel: "Conhecer Soluções CRM",
    iconName: "Database",
    highlights: [
      { label: "Clientes organizados", iconName: "Users" },
      { label: "Oportunidades acompanhadas", iconName: "Handshake" },
      { label: "Processos mais eficientes", iconName: "Settings" },
      { label: "Decisões com informação", iconName: "BarChart3" },
    ],
    sectionTitle: "Um sistema que acompanha o seu negócio",
    features: [
      {
        title: "CRM Comercial",
        description: "Gerencie clientes e leads, acompanhe o pipeline de vendas e aumente as suas oportunidades.",
        iconName: "UserCheck",
      },
      {
        title: "Gestão de Processos",
        description: "Automatize tarefas, organize equipas e otimize o fluxo de trabalho diário.",
        iconName: "Workflow",
      },
      {
        title: "Relatórios & Indicadores",
        description: "Acompanhe o desempenho comercial e operacional com clareza e em tempo real.",
        iconName: "BarChart3",
      },
      {
        title: "Ecossistema de Integrações",
        description: "Ligue o CRM ao seu website, WhatsApp, email, calendário e ferramentas de faturação.",
        iconName: "Plug",
      },
    ],
    ctaTitle: "Descubra como a LeadCapture pode organizar a sua empresa.",
    ctaDescription:
      "Agende uma demonstração gratuita e veja o sistema adaptado à realidade do seu negócio.",
  },
  {
    id: 14,
    slug: "marketing-digital",
    name: "Marketing Digital",
    shortName: "Marketing Digital",
    badge: "SOLUÇÕES DE CRESCIMENTO",
    heroTitle: "Marketing",
    heroHighlight: "Digital",
    heroDescription:
      "Estratégia, campanhas e análise de performance para atrair mais clientes, gerar contactos qualificados e apoiar o crescimento do negócio.",
    checklist: [
      "Estratégia personalizada por setor de negócio",
      "Campanhas no Google e Meta (Instagram e Facebook)",
      "Geração de leads e funis de conversão",
      "Análise de resultados e otimização contínua",
    ],
    primaryCtaLabel: "Criar a Minha Estratégia",
    iconName: "Megaphone",
    highlights: [
      { label: "Mais visibilidade", iconName: "Target" },
      { label: "Clientes qualificados", iconName: "Users" },
      { label: "Foco em conversão", iconName: "TrendingUp" },
      { label: "Métricas claras", iconName: "BarChart3" },
    ],
    sectionTitle: "Soluções de Marketing para o seu negócio",
    features: [
      {
        title: "Publicidade Online",
        description: "Campanhas estruturadas no Google, Instagram e Facebook para atrair o público certo.",
        iconName: "Megaphone",
      },
      {
        title: "Geração de Leads",
        description: "Estratégias e páginas de conversão que transformam visitantes em contactos.",
        iconName: "Users",
      },
      {
        title: "Performance & Análise",
        description: "Acompanhamento de métricas e otimização contínua do investimento.",
        iconName: "BarChart3",
      },
      {
        title: "Conteúdos Estratégicos",
        description: "Planeamento e criação de mensagens alinhadas com os objetivos comerciais.",
        iconName: "PenTool",
      },
    ],
    ctaTitle: "Vamos criar uma estratégia de marketing para o seu negócio?",
    ctaDescription:
      "Fale connosco e descubra como atrair mais clientes qualificados de forma consistente.",
  },
  {
    id: 15,
    slug: "automacao-ia",
    name: "Automação e Inteligência Artificial",
    shortName: "Automação & IA",
    badge: "EFICIÊNCIA E PRODUTIVIDADE",
    heroTitle: "Automação",
    heroHighlight: "& IA",
    heroDescription:
      "Automatize tarefas repetitivas, ganhe tempo e conte com Inteligência Artificial para atender clientes e escalar processos.",
    checklist: [
      "Automação de processos e tarefas",
      "Atendimento inteligente com assistentes virtuais",
      "Captação e qualificação automática de leads",
      "Integração com CRM, agendas e email",
      "Mais produtividade e menos trabalho manual",
    ],
    primaryCtaLabel: "Implementar Automação",
    iconName: "Bot",
    highlights: [
      { label: "Mais produtividade", iconName: "Rocket" },
      { label: "Menos tarefas manuais", iconName: "Layers" },
      { label: "Mais eficiência", iconName: "TrendingUp" },
      { label: "Mais tempo para o negócio", iconName: "Target" },
    ],
    sectionTitle: "Soluções de Automação e Inteligência Artificial",
    features: [
      {
        title: "Chatbots com IA",
        description: "Atendimento automático, respostas rápidas e captação de leads 24/7.",
        iconName: "Bot",
      },
      {
        title: "Automação de Processos",
        description: "Elimine tarefas manuais repetitivas e organize o funcionamento da equipa.",
        iconName: "Settings",
      },
      {
        title: "Integrações Inteligentes",
        description: "Ligue o seu website, CRM, agendas, WhatsApp e emails num fluxo único.",
        iconName: "Share2",
      },
      {
        title: "Assistentes de IA",
        description: "Ferramentas personalizadas para apoiar vendas, marketing, suporte e gestão.",
        iconName: "Cpu",
      },
    ],
    ctaTitle: "Leve a automação e a IA para o seu negócio.",
    ctaDescription:
      "Fale connosco e descubra como automatizar processos e aumentar a eficiência da sua equipa.",
  },
  {
    id: 16,
    slug: "redes-sociais",
    name: "Redes Sociais",
    shortName: "Redes Sociais",
    badge: "PRESENÇA DIGITAL PROFISSIONAL",
    heroTitle: "Redes",
    heroHighlight: "Sociais",
    heroDescription:
      "Gerimos a sua presença nas redes sociais com estratégia, conteúdos consistentes e foco em posicionamento e resultados.",
    checklist: [
      "Planeamento estratégico e calendário editorial",
      "Criação de design e conteúdos visuais",
      "Gestão e publicação nas principais redes",
      "Fortalecimento de marca e alcance",
      "Relatórios de acompanhamento",
    ],
    primaryCtaLabel: "Gerir as Minhas Redes",
    iconName: "Share2",
    highlights: [
      { label: "Mais visibilidade", iconName: "Users" },
      { label: "Maior engagement", iconName: "BarChart3" },
      { label: "Mais oportunidades", iconName: "Handshake" },
      { label: "Marca consistente", iconName: "Target" },
    ],
    sectionTitle: "O que fazemos pelas suas redes sociais",
    features: [
      {
        title: "Estratégia & Planeamento",
        description: "Definição de objetivos, linha editorial e conteúdos alinhados com o seu negócio.",
        iconName: "Calendar",
      },
      {
        title: "Produção de Conteúdos",
        description: "Design, fotografia e vídeo pensados para valorizar a sua marca.",
        iconName: "Camera",
      },
      {
        title: "Gestão Completa",
        description: "Publicação regular, organização de perfil e acompanhamento contínuo.",
        iconName: "Layers",
      },
      {
        title: "Análise & Evolução",
        description: "Relatórios claros com indicadores e recomendações para melhorar continuamente.",
        iconName: "TrendingUp",
      },
    ],
    ctaTitle: "Vamos transformar as suas redes sociais?",
    ctaDescription:
      "Fale connosco e descubra um plano à medida para aumentar a presença e autoridade da sua marca.",
  },
  {
    id: 17,
    slug: "qr-code",
    name: "Soluções QR Code",
    shortName: "Soluções QR Code",
    badge: "EXPERIÊNCIAS DIGITAIS SIMPLES E EFICAZES",
    heroTitle: "Soluções",
    heroHighlight: "QR Code",
    heroDescription:
      "Transforme o contacto presencial com os seus clientes em experiências digitais rápidas, modernas e interativas.",
    checklist: [
      "Menus digitais para restauração e hotelaria",
      "Acesso direto a avaliações no Google",
      "Cartões de visita digitais personalizados",
      "Acesso rápido a promoções, reservas e formulários",
      "Soluções personalizadas com a identidade da marca",
    ],
    primaryCtaLabel: "Criar a Minha Solução",
    iconName: "QrCode",
    highlights: [
      { label: "Acesso sem apps", iconName: "Smartphone" },
      { label: "Mais avaliações", iconName: "Star" },
      { label: "Melhor experiência", iconName: "Users" },
      { label: "Atualização imediata", iconName: "Zap" },
    ],
    sectionTitle: "Soluções QR Code para o seu negócio",
    features: [
      {
        title: "Menu Digital",
        description: "Apresente produtos ou pratos de forma moderna, com atualização em tempo real.",
        iconName: "Utensils",
      },
      {
        title: "Avaliações Google",
        description: "Facilite que os seus clientes deixem uma avaliação positiva em segundos.",
        iconName: "Star",
      },
      {
        title: "Cartão Digital",
        description: "Partilhe contactos, redes sociais, localização e portefólio num único QR Code.",
        iconName: "CreditCard",
      },
      {
        title: "Soluções Personalizadas",
        description: "QR Codes para promoções, reservas, check-in, formulários e muito mais.",
        iconName: "Layers",
      },
    ],
    ctaTitle: "Pronto para implementar QR Codes na sua empresa?",
    ctaDescription:
      "Fale connosco e descubra a solução QR Code mais adequada ao seu espaço e setor.",
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
