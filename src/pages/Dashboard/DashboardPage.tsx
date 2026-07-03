import { MetricCard } from '@/components/common/MetricCard';
import { EvolutionChart } from '@/components/dashboard/EvolutionChart';
import { getDashboardMetrics } from '@/services/dashboard.service';

function DashboardPage() {
  const metrics = getDashboardMetrics();

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Bem-vinda de volta, Mariana 👋
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            metric={metric}
          />
        ))}
      </section>

      <EvolutionChart />
    </main>
  );
}

export default DashboardPage;