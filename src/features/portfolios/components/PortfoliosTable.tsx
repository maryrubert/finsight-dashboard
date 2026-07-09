import { Pencil, Trash2 } from 'lucide-react';

import type { Portfolio } from '../types/portfolio';

interface PortfoliosTableProps {
  portfolios: Portfolio[];
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
  const riskLabels = {
    low: 'Baixo',
    medium: 'Médio',
    high: 'Alto',
  };

  return riskLabels[risk];
}

export function PortfoliosTable({
  portfolios,
  onEditPortfolio,
  onDeletePortfolio,
}: PortfoliosTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
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
              className="border-b transition-colors hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium">{portfolio.name}</td>

              <td className="px-6 py-4 text-muted-foreground">
                Cliente não vinculado
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
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    portfolio.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {portfolio.status === 'active' ? 'Ativa' : 'Inativa'}
                </span>
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
  );
}