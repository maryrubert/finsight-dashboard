import { useState } from 'react';
import { FileText } from 'lucide-react';

import { ReportModal } from '@/features/reports/components/ReportModal';
import { ReportsTable } from '@/features/reports/components/ReportsTable';
import { ReportsToolbar } from '@/features/reports/components/ReportsToolbar';
import { useReports } from '@/features/reports/hooks/useReports';
import type {
  CreateReportData,
  Report,
} from '@/features/reports/types/report';

export default function ReportsPage() {
  const {
    reports,
    isLoading,
    create,
    remove,
  } = useReports();

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSaveReport(
    data: CreateReportData,
  ) {
    await create(data);
    setIsModalOpen(false);
  }

  function handleCreateReport() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleDeleteReport(
    report: Report,
  ) {
    await remove(report.id);
  }

  return (
    <>
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Relatórios
          </h1>

          <p className="mt-2 text-muted-foreground">
            Gere e acompanhe os relatórios do sistema.
          </p>
        </div>

        <ReportsToolbar
          onCreateReport={handleCreateReport}
        />

        {isLoading ? (
          <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            Carregando relatórios...
          </div>
        ) : reports.length === 0 ? (
          <div className="rounded-2xl border bg-card p-12 shadow-sm">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText size={28} />
              </div>

              <h2 className="text-lg font-semibold text-foreground">
                Nenhum relatório encontrado
              </h2>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Gere seu primeiro relatório para visualizar o histórico.
              </p>
            </div>
          </div>
        ) : (
          <ReportsTable
            reports={reports}
            onDeleteReport={handleDeleteReport}
          />
        )}
      </section>

      <ReportModal
        isOpen={isModalOpen}
        report={null}
        onClose={handleCloseModal}
        onSave={handleSaveReport}
      />
    </>
  );
}