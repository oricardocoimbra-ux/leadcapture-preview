import Link from "next/link";
import {
  Building2,
  CreditCard,
  FileCheck2,
  FolderUp,
  Headphones,
  Layers,
  Lock,
  ShoppingBag,
  User,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Área de Cliente",
  description:
    "Área privada LeadCapture preparada para autenticação por Email/Password e Google OAuth com isolamento de dados por cliente.",
};

const PORTAL_MODULES = [
  { icon: User, title: "Dados Pessoais", desc: "Perfil único associado ao seu ID autenticado." },
  { icon: Building2, title: "Dados da Empresa", desc: "Denominação, NIF, setor e morada fiscal." },
  { icon: ShoppingBag, title: "Encomendas", desc: "Histórico e estado das suas encomendas." },
  { icon: Layers, title: "Serviços Contratados", desc: "Websites, lojas, CRM e planos ativos." },
  { icon: FileCheck2, title: "Contratos Aceites", desc: "Registo e consulta de contratos digitais." },
  { icon: CreditCard, title: "Pagamentos", desc: "Histórico de pagamentos (fase comercial)." },
  { icon: FolderUp, title: "Materiais Entregues", desc: "Upload e organização segura de ficheiros." },
  { icon: Headphones, title: "Pedidos de Suporte", desc: "Comunicação direta e acompanhamento." },
];

export default function AreaClientePage() {
  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Área de Cliente" }]} />

        <div className="lc-card-featured rounded-3xl p-7 sm:p-10 mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F5B800]">
              <Lock className="w-4 h-4" />
              Área Privada Protegida (Supabase Auth + RLS)
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Área de Cliente <span className="text-[#F5B800]">LeadCapture</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Esta rota está estruturada para acesso exclusivo de clientes autenticados (Email ou
              Google OAuth), com isolamento estrito por utilizador. Para testar a experiência de
              autenticação, inicie sessão ou crie uma conta.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/login" className="lc-btn-primary px-6 py-3 text-sm text-center">
              Iniciar Sessão
            </Link>
            <Link href="/registar" className="lc-btn-secondary px-6 py-3 text-sm text-center">
              Criar Conta
            </Link>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-5">
          Módulos do Perfil Único do Cliente
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PORTAL_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <div key={mod.title} className="lc-card rounded-2xl p-6 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#F5B800]" />
                </div>
                <h3 className="text-base font-bold text-white">{mod.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{mod.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
