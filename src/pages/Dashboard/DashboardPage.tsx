import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { MetricCard } from '@/components/common/MetricCard';
import { DashboardEmptyState } from '@/components/dashboard/DashboardEmptyState';
import { EvolutionChart } from '@/components/dashboard/EvolutionChart';
import { RiskDistributionChart } from '@/components/dashboard/RiskDistributionChart';
import { getPortfolios } from '@/features/portfolios/services/portfolios.service';
import type { Portfolio } from '@/features/portfolios/types/portfolio';
import { getReports } from '@/features/reports/services/reports.service';
import type { Report } from '@/features/reports/types/report';
import { getDashboardMetrics } from '@/services/dashboard.service';
import type { Metric } from '@/types/metric';

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
  const [year, month, day] = date.slice(0, 10).split('-');

  return `${day}/${month}/${year}`;
}

function DashboardPage() {
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [latestReport, setLatestReport] =
    useState<Report | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [
          metricsData,
          portfoliosData,
          reportsData,
        ] = await Promise.all([
          getDashboardMetrics(),
          getPortfolios(),
          getReports(),
        ]);

        setMetrics(metricsData);
        setPortfolios(portfoliosData);
        setLatestReport(reportsData[0] ?? null);
      } finally {
        setIsLoading(false);
      }
    }

    void loadDashboardData();
  }, []);

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Bem-vinda de volta, Mariana 👋
        </p>
      </header>

      {isLoading ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-36 animate-pulse rounded-xl border bg-slate-100"
                />
              ),
            )}
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="h-[430px] animate-pulse rounded-2xl border bg-slate-100" />
            <div className="h-[430px] animate-pulse rounded-2xl border bg-slate-100" />
          </section>

          <div className="h-40 animate-pulse rounded-2xl border bg-slate-100" />
        </>
      ) : portfolios.length === 0 ? (
        <DashboardEmptyState
          onGoToClients={() =>
            navigate('/clients')
          }
          onGoToPortfolios={() =>
            navigate('/portfolios')
          }
        />
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.title}
                metric={metric}
              />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <EvolutionChart
              portfolios={portfolios}
            />

            <RiskDistributionChart
              portfolios={portfolios}
            />
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Último relatório
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Relatório mais recente gerado no sistema.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate('/reports')
                }
                className="rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
              >
                Ver relatórios
              </button>
            </div>

            {latestReport ? (
              <div className="mt-6 flex flex-col gap-4 rounded-xl border bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText size={20} />
                  </div>

                  <div>
                    <p className="font-semibold">
                      {latestReport.name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {latestReport.format.toUpperCase()}
                      {' • '}
                      {formatDate(
                        latestReport.createdAt,
                      )}
                    </p>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    reportStatusStyles[
                      latestReport.status
                    ]
                  }`}
                >
                  {
                    reportStatusLabels[
                      latestReport.status
                    ]
                  }
                </span>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhum relatório foi gerado ainda.
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default DashboardPage;