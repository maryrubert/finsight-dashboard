import {
  CircleDollarSign,
  Gauge,
  Pencil,
  TrendingUp,
  Trash2,
  UserRound,
} from 'lucide-react';

import type { Client } from '@/features/clients/types/client';

import type { Portfolio } from '../types/portfolio';

interface PortfoliosTableProps {
  portfolios: Portfolio[];
  clients: Client[];
  onEditPortfolio: (portfolio: Portfolio) => void;
  onDeletePortfolio: (portfolio: Portfolio) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRisk(risk: Portfolio['risk']) {
  const riskLabels: Record<Portfolio['risk'], string> = {
    low: 'Baixo',
    medium: 'Médio',
    high: 'Alto',
  };

  return riskLabels[risk];
}

function PortfolioStatusBadge({
  status,
}: {
  status: Portfolio['status'];
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        status === 'active'
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {status === 'active' ? 'Ativa' : 'Inativa'}
    </span>
  );
}

export function PortfoliosTable({
  portfolios,
  clients,
  onEditPortfolio,
  onDeletePortfolio,
}: PortfoliosTableProps) {
  function getClientName(clientId: string) {
    return (
      clients.find((client) => client.id === clientId)?.name ??
      'Cliente não encontrado'
    );
  }

  return (
    <>
      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {portfolios.map((portfolio) => (
          <article
            key={portfolio.id}
            className="rounded-2xl border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-foreground">
                  {portfolio.name}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <UserRound size={15} className="shrink-0" />

                  <span className="truncate">
                    {getClientName(portfolio.clientId)}
                  </span>
                </div>
              </div>

              <PortfolioStatusBadge status={portfolio.status} />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CircleDollarSign size={15} />
                  Saldo
                </div>

                <p className="mt-1 font-semibold text-foreground">
                  {formatCurrency(portfolio.balance)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp size={15} />
                  Rentabilidade
                </div>

                <p className="mt-1 font-semibold text-foreground">
                  {portfolio.profitability}%
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Gauge size={15} />
                  Risco
                </div>

                <p className="mt-1 font-semibold text-foreground">
                  {formatRisk(portfolio.risk)}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onEditPortfolio(portfolio)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition hover:border-primary hover:bg-primary/5"
              >
                <Pencil size={16} />
                Editar
              </button>

              <button
                type="button"
                onClick={() => onDeletePortfolio(portfolio)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border bg-card shadow-sm md:block">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50">
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Carteira
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Cliente
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Saldo
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Rentabilidade
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Risco
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {portfolios.map((portfolio) => (
              <tr
                key={portfolio.id}
                className="border-b transition-colors last:border-b-0 hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium">
                  {portfolio.name}
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {getClientName(portfolio.clientId)}
                </td>

                <td className="px-6 py-4">
                  {formatCurrency(portfolio.balance)}
                </td>

                <td className="px-6 py-4">
                  {portfolio.profitability}%
                </td>

                <td className="px-6 py-4">
                  {formatRisk(portfolio.risk)}
                </td>

                <td className="px-6 py-4">
                  <PortfolioStatusBadge status={portfolio.status} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEditPortfolio(portfolio)}
                      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:border-primary hover:bg-primary/5"
                    >
                      <Pencil size={15} />
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeletePortfolio(portfolio)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}