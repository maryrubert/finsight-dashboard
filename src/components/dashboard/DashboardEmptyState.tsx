import { BarChart3 } from 'lucide-react';

interface DashboardEmptyStateProps {
  onGoToClients: () => void;
  onGoToPortfolios: () => void;
}

export function DashboardEmptyState({
  onGoToClients,
  onGoToPortfolios,
}: DashboardEmptyStateProps) {
  return (
    <section className="rounded-2xl border bg-card p-12 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BarChart3 size={32} />
        </div>

        <h2 className="text-2xl font-bold text-foreground">
          Seu Dashboard está pronto!
        </h2>

        <p className="mt-3 max-w-lg text-muted-foreground">
          Cadastre seus primeiros clientes e carteiras para acompanhar
          patrimônio, rentabilidade e indicadores da sua consultoria.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onGoToClients}
            className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Ir para Clientes
          </button>

          <button
            type="button"
            onClick={onGoToPortfolios}
            className="rounded-xl border px-5 py-3 font-medium transition hover:bg-muted"
          >
            Ir para Carteiras
          </button>
        </div>
      </div>
    </section>
  );
}