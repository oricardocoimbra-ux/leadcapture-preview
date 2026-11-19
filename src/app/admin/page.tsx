import Link from "next/link";
import {
  AlertTriangle,
  CalendarClock,
  CreditCard,
  History,
  RefreshCcw,
  ShieldAlert,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Painel Administrativo",
  description:
    "Painel administrativo LeadCapture (protegido por role=admin) para encomendas, subscrições, renovações, falhas e reembolsos.",
};

const ADMIN_MODULES = [
  { icon: ShoppingBag, title: "Encomendas", desc: "Consultar todas as encomendas únicas e combinadas." },
  { icon: CreditCard, title: "Pagamentos", desc: "Estado de transações Stripe (Cartão, MB WAY, Multibanco, SEPA)." },
  { icon: RefreshCcw, title: "Subscrições", desc: "Subscrições mensais e anuais ativas e canceladas." },
  { icon: CalendarClock, title: "Próximas Renovações", desc: "Calendário de renovações mensais e anuais (ex.: Email 69 €/ano)." },
  { icon: AlertTriangle, title: "Pagamentos Falhados", desc: "Alertas de falha de cobrança e recuperação automática." },
  { icon: Users, title: "Clientes", desc: "Perfis únicos de clientes, NIF, empresa e contratos aceites." },
  { icon: ShieldAlert, title: "Reembolsos & Cancelamentos", desc: "Operações autorizadas com registo obrigatório." },
  { icon: History, title: "Histórico de Alterações", desc: "Auditoria de eventos de faturação e ações admin." },
];

export default function AdminPage() {
  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Painel Administrativo" }]} />

        <div className="lc-card-featured rounded-3xl p-7 sm:p-10 mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5B800]">
              Acesso Restrito — Role: Admin
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Painel Administrativo <span className="text-[#F5B800]">LeadCapture</span>
            </h1>
            <p className="text-sm text-zinc-300">
              Estrutura preparada para gestão de encomendas, subscrições Stripe Billing,
              renovações, reembolsos e auditoria. Protegido em produção por Supabase Auth (`role =
              admin`).
            </p>
          </div>
          <Link href="/login" className="lc-btn-secondary px-6 py-3 text-sm shrink-0 text-center">
            Autenticação Admin
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ADMIN_MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.title} className="lc-card rounded-2xl p-6 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#F5B800]" />
                </div>
                <h2 className="text-base font-bold text-white">{m.title}</h2>
                <p className="text-xs text-zinc-400 leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
