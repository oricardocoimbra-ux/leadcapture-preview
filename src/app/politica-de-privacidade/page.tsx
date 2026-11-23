import Link from "next/link";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Política de Privacidade (Rascunho)",
  description:
    "Rascunho pré-lançamento da Política de Privacidade da LeadCapture. Pendente de preenchimento de dados legais e validação jurídica antes de lançamento público.",
  robots: { index: false, follow: false },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: "Política de Privacidade (Rascunho)" }]} />

        {/* Aviso explícito de rascunho */}
        <div
          role="note"
          className="rounded-2xl border border-amber-500/45 bg-amber-500/10 p-5 flex items-start gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-[#F5B800] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-bold text-white">
              Rascunho pré-lançamento — texto ainda não validado juridicamente
            </p>
            <p className="text-zinc-200 leading-relaxed">
              Esta página é um rascunho técnico de preparação para o lançamento. Todos os campos
              assinalados entre parêntesis retos (<code className="text-[#F5B800]">[...]</code>) e
              o conteúdo integral carecem de preenchimento oficial e revisão jurídica antes de
              publicação em produção.
            </p>
          </div>
        </div>

        <header className="space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            <ShieldCheck className="w-4 h-4" />
            Proteção de Dados (RGPD) — Rascunho
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Política de Privacidade
          </h1>
          <p className="text-sm text-zinc-400">
            Última atualização do rascunho:{" "}
            <span className="text-zinc-200">[DATA OFICIAL DE ENTRADA EM VIGOR A CONFIRMAR]</span>
          </p>
        </header>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">1. Responsável pelo Tratamento</h2>
            <ul className="space-y-1.5 text-zinc-300">
              <li>
                <strong className="text-white">Entidade / Denominação Social:</strong>{" "}
                [DENOMINAÇÃO SOCIAL OU NOME DO TITULAR A CONFIRMAR]
              </li>
              <li>
                <strong className="text-white">NIF / NIPC:</strong> [NIF / NIPC A CONFIRMAR]
              </li>
              <li>
                <strong className="text-white">Morada / Sede:</strong> [MORADA COMPLETA A CONFIRMAR]
              </li>
              <li>
                <strong className="text-white">Email de contacto para privacidade:</strong>{" "}
                geral@leadcapture.cloud <span className="text-zinc-400">([CONFIRMAR SE EXISTE EMAIL DEDICADO DE PRIVACIDADE/DPO])</span>
              </li>
            </ul>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">2. Dados Recolhidos e Finalidades</h2>
            <p>
              Quando os formulários comerciais (Contactos, Pedido de Orçamento e Pedido de
              Demonstração) estiverem ativos, recolhem apenas os dados introduzidos voluntariamente
              pelo titular (nome, email, telefone, empresa, setor e descrição do pedido) com a
              finalidade de responder ao pedido de contacto, demonstração ou proposta comercial.
            </p>
            <p className="text-zinc-400">
              <strong className="text-zinc-200">Estado atual em Preview:</strong> enquanto o envio
              por email estiver desativado, os pedidos não são enviados nem guardados em base de
              dados. Quando ativado, os pedidos são encaminhados por email para{" "}
              <code className="text-zinc-200">geral@leadcapture.cloud</code> sem persistência em
              base de dados própria, salvo futura ativação explícita da Área de Cliente.
            </p>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">3. Fundamento Jurídico</h2>
            <p>
              [VALIDAR COM APOIO JURÍDICO: diligências pré-contratuais a pedido do titular dos dados
              — art. 6.º, n.º 1, al. b) do RGPD; interesse legítimo em proteção anti-spam/segurança
              — al. f); cumprimento de obrigações legais/fiscais quando aplicável — al. c); ou
              consentimento expresso — al. a) para eventuais comunicações comerciais.]
            </p>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">
              4. Subcontratantes e Infraestrutura Técnica
            </h2>
            <p>
              Para o funcionamento técnico do website e proteção contra abuso, poderão intervir os
              seguintes prestadores (sujeitos a confirmação contratual/DPA antes do lançamento):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
              <li>
                <strong className="text-white">Alojamento web:</strong> Vercel [CONFIRMAR REGIÃO UE
                E DPA].
              </li>
              <li>
                <strong className="text-white">Proteção anti-spam:</strong> Cloudflare Turnstile
                (quando ativo nos formulários).
              </li>
              <li>
                <strong className="text-white">Envio transacional de email:</strong> Brevo (apenas
                quando o envio de formulários for ativado).
              </li>
              <li>
                <strong className="text-white">Serviços futuros (atualmente desativados):</strong>{" "}
                [SUPABASE AUTH/BD, STRIPE PAGAMENTOS, PRODIGI IMPRESSÃO — ATUALIZAR ANTES DA
                ATIVAÇÃO].
              </li>
            </ul>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">5. Prazo de Conservação</h2>
            <p>
              [DEFINIR PRAZO DE CONSERVAÇÃO PARA PEDIDOS DE CONTACTO/ORÇAMENTO, EX.: X MESES APÓS O
              ÚLTIMO CONTACTO, E PRAZOS LEGAIS DE FATURAÇÃO QUANDO APLICÁVEL.]
            </p>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">6. Direitos dos Titulares</h2>
            <p>
              Nos termos do RGPD, o titular dos dados tem direito de acesso, retificação, apagamento,
              limitação do tratamento, portabilidade e oposição, bem como o direito de apresentar
              reclamação junto da Comissão Nacional de Proteção de Dados (CNPD —{" "}
              <span className="text-zinc-200">www.cnpd.pt</span>).
            </p>
            <p>
              Para exercer os seus direitos: <strong className="text-white">geral@leadcapture.cloud</strong>{" "}
              <span className="text-zinc-400">([CONFIRMAR CANAL OFICIAL DE PRIVACIDADE])</span>.
            </p>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">7. Cookies e Tecnologias Semelhantes</h2>
            <p>
              [DEFINIR POLÍTICA DE COOKIES E MECANISMO DE CONSENTIMENTO CASO SEJAM ATIVADOS ANALYTICS
              OU PIXELS DE MARKETING ANTES DO LANÇAMENTO. ATUALMENTE SEM PIXELS DE ANÚNCIOS ATIVOS.]
            </p>
          </section>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <Link href="/termos-e-condicoes" className="text-[#F5B800] font-semibold hover:underline">
            Consultar Termos e Condições (Rascunho) →
          </Link>
          <Link href="/contactos" className="text-zinc-400 hover:text-white transition-colors">
            Voltar a Contactos
          </Link>
        </div>
      </div>
    </div>
  );
}
