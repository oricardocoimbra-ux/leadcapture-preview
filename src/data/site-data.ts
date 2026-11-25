export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: "solucoes" | "por-negocio";
}

export const MAIN_NAV: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Soluções", href: "/solucoes", hasDropdown: "solucoes" },
  { label: "Por Negócio", href: "/por-negocio", hasDropdown: "por-negocio" },
  { label: "Demonstrações", href: "/demonstracoes" },
  { label: "Preços", href: "/precos" },
  { label: "Recursos", href: "/recursos" },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Fale Connosco",
    description: "Apresenta-nos os objetivos, o setor e os desafios atuais do seu negócio.",
  },
  {
    step: "02",
    title: "Proposta à Medida",
    description: "Definimos a estratégia, os serviços e o plano técnico mais adequado.",
  },
  {
    step: "03",
    title: "Implementação",
    description: "Desenvolvemos, configuramos e integramos tudo com acompanhamento próximo.",
  },
  {
    step: "04",
    title: "Crescimento Contínuo",
    description: "Acompanhamos a operação e evoluímos as soluções consoante os resultados.",
  },
];

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  priceDisplay: string;
  billingNote: string;
  featured?: boolean;
  badge?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

/**
 * NOTA COMERCIAL (FASE 6):
 * Os valores abaixo são placeholders provisórios para estrutura visual.
 * Devem ser confirmados antes da ativação comercial.
 */
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "website-profissional",
    name: "Website Profissional",
    subtitle: "Presença digital moderna, rápida e focada em conversão.",
    priceDisplay: "[Sob consulta / A confirmar]",
    billingNote: "Modelo de investimento a confirmar",
    features: [
      "Design personalizado com identidade LeadCapture",
      "Otimizado para desktop, tablet e mobile",
      "Estrutura técnica preparada para SEO",
      "Formulário de contacto e integração WhatsApp",
      "Prazo de entrega a definir na proposta",
    ],
    ctaLabel: "Pedir Proposta",
    ctaHref: "/pedir-orcamento?plano=website",
  },
  {
    id: "loja-online",
    name: "Loja Online (E-commerce)",
    subtitle: "Venda os seus produtos online com gestão simples e segura.",
    priceDisplay: "[Sob consulta / A confirmar]",
    billingNote: "Modelo de investimento a confirmar",
    featured: true,
    badge: "Solução Popular",
    features: [
      "Loja online completa e responsiva",
      "Gestão de catálogo, stock e encomendas",
      "Preparação para métodos de pagamento (a ativar na fase comercial)",
      "Configuração de envios e logística",
      "Formação inicial e suporte",
    ],
    ctaLabel: "Pedir Proposta",
    ctaHref: "/pedir-orcamento?plano=loja-online",
  },
  {
    id: "sistema-360",
    name: "Sistema 360° Empresarial",
    subtitle: "Website ou loja, CRM, automação e marketing num único ecossistema.",
    priceDisplay: "[Sob consulta / A confirmar]",
    billingNote: "Plano modular à medida",
    features: [
      "Website ou Loja Online integrada",
      "CRM e gestão centralizada de clientes",
      "Automação de processos e IA",
      "Integrações (Email, WhatsApp, Agenda)",
      "Acompanhamento contínuo da equipa",
    ],
    ctaLabel: "Pedir Demonstração",
    ctaHref: "/pedir-demonstracao?plano=sistema-360",
  },
];

export interface PortfolioSlot {
  id: string;
  title: string;
  sector: string;
  sectorSlug: string;
  summary: string;
  statusNote: string;
}

export const PORTFOLIO_SLOTS: PortfolioSlot[] = [
  {
    id: "slot-1",
    title: "[Projeto Real a Inserir — Imobiliário]",
    sector: "Imobiliário",
    sectorSlug: "imobiliario",
    summary: "Espaço reservado para projeto real do setor imobiliário com website e captação de leads.",
    statusNote: "Aguarda validação e materiais de projeto real",
  },
  {
    id: "slot-2",
    title: "[Projeto Real a Inserir — Beleza e Estética]",
    sector: "Beleza e Estética",
    sectorSlug: "beleza-estetica",
    summary: "Espaço reservado para projeto real de clínica/salão de estética com agendamento online.",
    statusNote: "Aguarda validação e materiais de projeto real",
  },
  {
    id: "slot-3",
    title: "[Projeto Real a Inserir — Restauração]",
    sector: "Restauração",
    sectorSlug: "restauracao",
    summary: "Espaço reservado para projeto real de restaurante com menu digital QR Code e reservas.",
    statusNote: "Aguarda validação e materiais de projeto real",
  },
  {
    id: "slot-4",
    title: "[Projeto Real a Inserir — Retalho & E-commerce]",
    sector: "Retalho e E-commerce",
    sectorSlug: "retalho-ecommerce",
    summary: "Espaço reservado para loja online real com catálogo e gestão de encomendas.",
    statusNote: "Aguarda validação e materiais de projeto real",
  },
  {
    id: "slot-5",
    title: "[Projeto Real a Inserir — Serviços Profissionais]",
    sector: "Serviços Profissionais",
    sectorSlug: "servicos-profissionais",
    summary: "Espaço reservado para gabinete/consultoria com website institucional e CRM.",
    statusNote: "Aguarda validação e materiais de projeto real",
  },
  {
    id: "slot-6",
    title: "[Projeto Real a Inserir — Saúde e Bem-Estar]",
    sector: "Saúde e Bem-Estar",
    sectorSlug: "saude-bem-estar",
    summary: "Espaço reservado para clínica ou consultório com marcação online.",
    statusNote: "Aguarda validação e materiais de projeto real",
  },
];

export interface CaseStudySlot {
  id: string;
  clientLabel: string;
  sector: string;
  challenge: string;
  solution: string;
  metricPlaceholder: string;
}

export const CASE_STUDY_SLOTS: CaseStudySlot[] = [
  {
    id: "case-1",
    clientLabel: "[Caso de Sucesso #1 — Cliente a Confirmar]",
    sector: "Imobiliário",
    challenge: "[Desafio real do cliente a documentar após autorização]",
    solution: "Website profissional + CRM de Leads + Automação de follow-up",
    metricPlaceholder: "[Métricas reais a validar — não publicar valores fictícios]",
  },
  {
    id: "case-2",
    clientLabel: "[Caso de Sucesso #2 — Cliente a Confirmar]",
    sector: "Beleza e Estética",
    challenge: "[Desafio real do cliente a documentar após autorização]",
    solution: "Presença digital + Agendamento online + Campanhas locais",
    metricPlaceholder: "[Métricas reais a validar — não publicar valores fictícios]",
  },
  {
    id: "case-3",
    clientLabel: "[Caso de Sucesso #3 — Cliente a Confirmar]",
    sector: "Restauração",
    challenge: "[Desafio real do cliente a documentar após autorização]",
    solution: "Menu Digital QR Code + Reservas online + Avaliações Google",
    metricPlaceholder: "[Métricas reais a validar — não publicar valores fictícios]",
  },
];

export interface FaqItem {
  id: string;
  category: "Geral" | "Serviços" | "Preços e Propostas" | "Prazos e Entregas" | "Suporte";
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    category: "Geral",
    question: "O que é a LeadCapture?",
    answer:
      "A LeadCapture é uma plataforma e parceiro 360° de soluções digitais para empresas. Desenvolvemos websites, lojas online, sistemas de CRM, automação com IA, gestão de redes sociais e soluções QR Code.",
  },
  {
    id: "faq-2",
    category: "Serviços",
    question: "Que serviços disponibilizam?",
    answer:
      "Disponibilizamos Websites Profissionais, Lojas Online, CRM e Sistemas, Marketing Digital, Automação e Inteligência Artificial, Gestão de Redes Sociais e Soluções QR Code, adaptados a vários setores.",
  },
  {
    id: "faq-3",
    category: "Serviços",
    question: "Trabalham com empresas de diferentes setores?",
    answer:
      "Sim. Temos soluções estruturadas para Imobiliário, Beleza e Estética, Restauração, Retalho e E-commerce, Serviços Profissionais e Saúde e Bem-Estar, além de projetos à medida para outros setores.",
  },
  {
    id: "faq-4",
    category: "Prazos e Entregas",
    question: "Quanto tempo demora a implementação de um projeto?",
    answer:
      "[Prazo exato a confirmar na proposta comercial] — o tempo de desenvolvimento varia consoante a complexidade do website, loja online ou integrações solicitadas.",
  },
  {
    id: "faq-5",
    category: "Preços e Propostas",
    question: "Como funcionam os preços e formas de pagamento?",
    answer:
      "[Condições comerciais a confirmar] — pode solicitar uma proposta personalizada através da página Pedir Orçamento para receber valores ajustados ao âmbito do seu projeto.",
  },
  {
    id: "faq-6",
    category: "Suporte",
    question: "Existe acompanhamento após a entrega do projeto?",
    answer:
      "Sim. Acompanhamos a evolução dos projetos e disponibilizamos canais de suporte e manutenção para garantir estabilidade, segurança e melhorias contínuas.",
  },
];

export const CONTACT_INFO = {
  email: "geral@leadcapture.cloud",
  phone: "[+351 XXX XXX XXX — a confirmar]",
  whatsappLabel: "[WhatsApp oficial — a confirmar]",
  location: "Portugal [Morada / Zona de atendimento a confirmar]",
  hours: "[Horário de atendimento a confirmar]",
};
