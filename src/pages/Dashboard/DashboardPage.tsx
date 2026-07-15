import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MetricCard } from '@/components/common/MetricCard';
import { EvolutionChart } from '@/components/dashboard/EvolutionChart';
import { DashboardEmptyState } from '@/components/dashboard/DashboardEmptyState';
import { getPortfolios } from '@/features/portfolios/services/portfolios.service';
import type { Portfolio } from '@/features/portfolios/types/portfolio';
import { getDashboardMetrics } from '@/services/dashboard.service';
import type { Metric } from '@/types/metric';

function DashboardPage() {
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [metricsData, portfoliosData] = await Promise.all([
          getDashboardMetrics(),
          getPortfolios(),
        ]);

        setMetrics(metricsData);
        setPortfolios(portfoliosData);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Bem-vinda de volta, Mariana 👋
        </p>
      </header>

      {isLoading ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-xl border bg-slate-100"
              />
            ))}
          </section>

          <div className="h-96 animate-pulse rounded-xl border bg-slate-100" />
        </>
      ) : portfolios.length === 0 ? (
        <DashboardEmptyState
          onGoToClients={() => navigate('/clients')}
          onGoToPortfolios={() => navigate('/portfolios')}
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

          <EvolutionChart portfolios={portfolios} />
        </>
      )}
    </main>
  );
}

export default DashboardPage;