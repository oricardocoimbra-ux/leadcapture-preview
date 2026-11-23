import Link from "next/link";
import { AlertTriangle, FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Termos e Condições (Rascunho)",
  description:
    "Rascunho pré-lançamento dos Termos e Condições da LeadCapture. Pendente de preenchimento de dados legais e validação jurídica antes de lançamento público.",
  robots: { index: false, follow: false },
};

export default function TermosECondicoesPage() {
  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: "Termos e Condições (Rascunho)" }]} />

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
              Estes Termos e Condições são um rascunho de preparação. Os campos assinalados entre
              parêntesis retos (<code className="text-[#F5B800]">[...]</code>) e as cláusulas
              comerciais/legais devem ser completados e validados juridicamente antes da entrada em
              produção.
            </p>
          </div>
        </div>

        <header className="space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            <FileText className="w-4 h-4" />
            Condições Gerais — Rascunho
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Termos e Condições</h1>
          <p className="text-sm text-zinc-400">
            Versão de rascunho:{" "}
            <span className="text-zinc-200">[VERSÃO E DATA OFICIAL A CONFIRMAR]</span>
          </p>
        </header>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">1. Identificação da Entidade</h2>
            <ul className="space-y-1.5 text-zinc-300">
              <li>
                <strong className="text-white">Denominação Social / Titular:</strong>{" "}
                [DENOMINAÇÃO SOCIAL OU NOME COMPLETO A CONFIRMAR]
              </li>
              <li>
                <strong className="text-white">NIF / NIPC:</strong> [NIF / NIPC A CONFIRMAR]
              </li>
              <li>
                <strong className="text-white">Sede / Morada:</strong> [MORADA COMPLETA A CONFIRMAR]
              </li>
              <li>
                <strong className="text-white">Email de contacto:</strong> geral@leadcapture.cloud
              </li>
              <li>
                <strong className="text-white">Telefone / Horário:</strong> [TELEFONE E HORÁRIO
                OFICIAIS A CONFIRMAR]
              </li>
            </ul>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">
              2. Objeto e Natureza Informativa do Website
            </h2>
            <p>
              O presente website apresenta informações sobre soluções digitais, serviços criativos,
              soluções à medida e serviços complementares da LeadCapture. A submissão de um pedido
              de contacto, demonstração ou orçamento não constitui celebração automática de contrato
              nem vincula a preços, prazos ou disponibilidade antes de proposta formal aceite pelas
              partes.
            </p>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">
              3. Âmbito Específico de Ofertas Complementares
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li>
                <strong className="text-white">Soluções digitais à medida:</strong> âmbito técnico,
                prazos e investimento definidos exclusivamente após avaliação da necessidade e
                proposta escrita.
              </li>
              <li>
                <strong className="text-white">Produtos de marca própria:</strong> a LeadCapture
                presta apoio ao conceito, identidade, embalagem, seleção de fabricante e coordenação
                operacional; não fabrica, não formula nem certifica produtos. A conformidade
                regulamentar (incluindo avaliação de segurança, rotulagem e notificação CPNP) cabe
                ao fabricante e às entidades legalmente responsáveis.
              </li>
              <li>
                <strong className="text-white">Apoio administrativo a pedidos de marca no INPI:</strong>{" "}
                serviço administrativo independente, com honorários distinguidos das taxas oficiais
                do INPI. Não constitui garantia de concessão do registo nem patrocínio/representação
                jurídica; questões especializadas são encaminhadas para profissional autorizado
                (AOPI ou advogado).
              </li>
              <li>
                <strong className="text-white">Conteúdo imobiliário:</strong> realizado apenas sobre
                fotografias e materiais autorizados pelo cliente/agência; animações aéreas ou de
                mapa dependem de confirmação prévia de direitos comerciais.
              </li>
            </ul>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">
              4. Preços, IVA, Pagamentos e Produtos Físicos Personalizados
            </h2>
            <p>
              [CONFIRMAR REGIME E TAXA DE IVA APLICÁVEL, CONDIÇÕES DE PAGAMENTO, FATURAÇÃO,
              RENOVAÇÕES E CANCELAMENTOS ANTES DE ATIVAR CHECKOUT ONLINE.]
            </p>
            <p>
              [PARA PLACAS QR FÍSICAS PERSONALIZADAS: DEFINIR PORTES, PRAZOS REAIS DE ENTREGA EM
              PORTUGAL, EXCEÇÃO AO DIREITO DE LIVRE RESOLUÇÃO EM BENS PERSONALIZADOS E POLÍTICA DE
              REIMPRESSÃO/SUBSTITUIÇÃO EM CASO DE DEFEITO OU DANO DE TRANSPORTE.]
            </p>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">5. Propriedade Intelectual</h2>
            <p>
              Todos os textos, elementos gráficos, código e marcas próprias apresentados neste
              website pertencem à LeadCapture ou são utilizados mediante autorização. A titularidade
              dos entregáveis de cada projeto é regulada na respetiva proposta ou contrato.
            </p>
          </section>

          <section className="lc-card rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">
              6. Lei Aplicável, RAL e Livro de Reclamações
            </h2>
            <p>
              [CONFIRMAR LEI APLICÁVEL (LEI PORTUGUESA), FORO COMPETENTE, ENTIDADE DE RESOLUÇÃO
              ALTERNATIVA DE LITÍGIOS DE CONSUMO (RAL) APLICÁVEL E LIGAÇÃO AO LIVRO DE RECLAMAÇÕES
              ELETRÓNICO (www.livroreclamacoes.pt) QUANDO APLICÁVEL.]
            </p>
          </section>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <Link
            href="/politica-de-privacidade"
            className="text-[#F5B800] font-semibold hover:underline"
          >
            Consultar Política de Privacidade (Rascunho) →
          </Link>
          <Link href="/contactos" className="text-zinc-400 hover:text-white transition-colors">
            Voltar a Contactos
          </Link>
        </div>
      </div>
    </div>
  );
}
