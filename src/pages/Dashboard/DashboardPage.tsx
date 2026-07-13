import { useEffect, useState } from 'react';

import { MetricCard } from '@/components/common/MetricCard';
import { EvolutionChart } from '@/components/dashboard/EvolutionChart';
import { getDashboardMetrics } from '@/services/dashboard.service';
import type { Metric } from '@/types/metric';

function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await getDashboardMetrics();
        setMetrics(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadMetrics();
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
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-xl border bg-slate-100"
            />
          ))}
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              metric={metric}
            />
          ))}
        </section>
      )}

      <EvolutionChart />
    </main>
  );
}

export default DashboardPage;