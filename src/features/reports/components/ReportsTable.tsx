import { Download, Trash2 } from 'lucide-react';

import { downloadReport } from '../utils/reportPdf';
import type { Report } from '../types/report';

interface ReportsTableProps {
  reports: Report[];
  onDeleteReport: (report: Report) => void;
}

const reportTypeLabels: Record<Report['type'], string> = {
  'portfolio-performance': 'Desempenho das carteiras',
  'client-summary': 'Resumo dos clientes',
  'risk-analysis': 'Análise de risco',
};

const reportStatusLabels: Record<Report['status'], string> = {
  processing: 'Processando',
  completed: 'Concluído',
  failed: 'Falhou',
};

const reportStatusStyles: Record<Report['status'], string> = {
  processing: 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-red-100 text-red-700',
};

function formatDate(date: string) {
  const dateOnly = date.slice(0, 10);
  const [year, month, day] = dateOnly.split('-');

  return `${day}/${month}/${year}`;
}

export function ReportsTable({
  reports,
  onDeleteReport,
}: ReportsTableProps) {
  function handleDelete(report: Report) {
    const confirmed = window.confirm(
      `Deseja realmente excluir o relatório "${report.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    onDeleteReport(report);
  }

  return (
    <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
      <table className="w-full min-w-[900px] border-collapse">
        <thead className="bg-slate-50">
          <tr className="border-b">
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Relatório
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Tipo
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Formato
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Período
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
          {reports.map((report) => {
            const canDownload =
              report.status === 'completed';

            return (
              <tr
                key={report.id}
                className="border-b transition-colors hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium">
                  {report.name}
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {reportTypeLabels[report.type]}
                </td>

                <td className="px-6 py-4 uppercase">
                  {report.format}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                  {formatDate(report.startDate)} até{' '}
                  {formatDate(report.endDate)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${reportStatusStyles[report.status]}`}
                  >
                    {reportStatusLabels[report.status]}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      disabled={!canDownload}
                      onClick={() =>
                        downloadReport(report)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Download size={15} />
                      Baixar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(report)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}