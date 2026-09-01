import {
  CalendarDays,
  Download,
  FileText,
  Trash2,
} from 'lucide-react';

import type { Report } from '../types/report';
import { downloadReport } from '../utils/reportPdf';

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

function ReportStatusBadge({
  status,
}: {
  status: Report['status'];
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        reportStatusStyles[status]
      }`}
    >
      {reportStatusLabels[status]}
    </span>
  );
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
    <>
      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {reports.map((report) => {
          const canDownload =
            report.status === 'completed';

          return (
            <article
              key={report.id}
              className="rounded-2xl border bg-card p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <FileText
                      size={17}
                      className="shrink-0 text-primary"
                    />

                    <h3 className="truncate font-semibold text-foreground">
                      {report.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {reportTypeLabels[report.type]}
                  </p>
                </div>

                <ReportStatusBadge status={report.status} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-muted-foreground">
                    Formato
                  </p>

                  <p className="mt-1 font-semibold uppercase text-foreground">
                    {report.format}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays size={15} />
                    Período
                  </div>

                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {formatDate(report.startDate)}
                    {' até '}
                    {formatDate(report.endDate)}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={!canDownload}
                  onClick={() => downloadReport(report)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Download size={16} />
                  Baixar
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(report)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Excluir
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border bg-card shadow-sm md:block">
        <table className="w-full border-collapse">
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
                  className="border-b transition-colors last:border-b-0 hover:bg-slate-50"
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

                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                    {formatDate(report.startDate)}
                    {' até '}
                    {formatDate(report.endDate)}
                  </td>

                  <td className="px-6 py-4">
                    <ReportStatusBadge status={report.status} />
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
    </>
  );
}