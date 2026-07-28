import { useEffect, useState } from 'react';

import type {
  CreateReportData,
  Report,
  ReportFormat,
  ReportType,
} from '../types/report';

interface ReportModalProps {
  isOpen: boolean;
  report?: Report | null;
  onClose: () => void;
  onSave: (data: CreateReportData) => Promise<void>;
}

const initialForm: CreateReportData = {
  name: '',
  type: 'portfolio-performance',
  format: 'pdf',
  startDate: '',
  endDate: '',
};

export function ReportModal({
  isOpen,
  report,
  onClose,
  onSave,
}: ReportModalProps) {
  const [form, setForm] =
    useState<CreateReportData>(initialForm);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (report) {
      setForm({
        name: report.name,
        type: report.type,
        format: report.format,
        startDate: report.startDate.slice(0, 10),
        endDate: report.endDate.slice(0, 10),
      });

      return;
    }

    setForm(initialForm);
  }, [isOpen, report]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.startDate ||
      !form.endDate
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave({
        ...form,
        name: form.name.trim(),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold">
          Gerar Relatório
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <div>
            <label
              htmlFor="report-name"
              className="mb-2 block text-sm font-medium"
            >
              Nome
            </label>

            <input
              id="report-name"
              value={form.name}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              required
              className="w-full rounded-xl border px-4 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="report-type"
              className="mb-2 block text-sm font-medium"
            >
              Tipo
            </label>

            <select
              id="report-type"
              value={form.type}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  type: event.target.value as ReportType,
                }))
              }
              className="w-full rounded-xl border px-4 py-2"
            >
              <option value="portfolio-performance">
                Desempenho das carteiras
              </option>

              <option value="client-summary">
                Resumo dos clientes
              </option>

              <option value="risk-analysis">
                Análise de risco
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="report-format"
              className="mb-2 block text-sm font-medium"
            >
              Formato
            </label>

            <select
              id="report-format"
              value={form.format}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  format:
                    event.target.value as ReportFormat,
                }))
              }
              className="w-full rounded-xl border px-4 py-2"
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="report-start-date"
                className="mb-2 block text-sm font-medium"
              >
                Data inicial
              </label>

              <input
                id="report-start-date"
                type="date"
                value={form.startDate}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    startDate: event.target.value,
                  }))
                }
                required
                className="w-full rounded-xl border px-4 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="report-end-date"
                className="mb-2 block text-sm font-medium"
              >
                Data final
              </label>

              <input
                id="report-end-date"
                type="date"
                value={form.endDate}
                min={form.startDate}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    endDate: event.target.value,
                  }))
                }
                required
                className="w-full rounded-xl border px-4 py-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border px-5 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-primary px-5 py-2 text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? 'Gerando...'
                : 'Gerar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}