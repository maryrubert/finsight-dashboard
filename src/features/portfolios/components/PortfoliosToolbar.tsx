import { Search } from 'lucide-react';

import type { Client } from '@/features/clients/types/client';

import type {
  PortfolioRisk,
  PortfolioStatus,
} from '../types/portfolio';

interface PortfoliosToolbarProps {
  search: string;
  clientId: string;
  risk: PortfolioRisk | 'all';
  status: PortfolioStatus | 'all';
  clients: Client[];
  onSearchChange: (value: string) => void;
  onClientChange: (value: string) => void;
  onRiskChange: (value: PortfolioRisk | 'all') => void;
  onStatusChange: (value: PortfolioStatus | 'all') => void;
  onCreatePortfolio: () => void;
}

export function PortfoliosToolbar({
  search,
  clientId,
  risk,
  status,
  clients,
  onSearchChange,
  onClientChange,
  onRiskChange,
  onStatusChange,
  onCreatePortfolio,
}: PortfoliosToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-4 md:flex-row md:flex-wrap">
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Pesquisar carteiras..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-11 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <select
          value={clientId}
          onChange={(event) => onClientChange(event.target.value)}
          className="h-11 rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Todos os clientes</option>

          {clients.map((client) => (
            <option
              key={client.id}
              value={client.id}
            >
              {client.name}
            </option>
          ))}
        </select>

        <select
          value={risk}
          onChange={(event) =>
            onRiskChange(event.target.value as PortfolioRisk | 'all')
          }
          className="h-11 rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Todos os riscos</option>
          <option value="low">Baixo</option>
          <option value="medium">Médio</option>
          <option value="high">Alto</option>
        </select>

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as PortfolioStatus | 'all')
          }
          className="h-11 rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Todos os status</option>
          <option value="active">Ativas</option>
          <option value="inactive">Inativas</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onCreatePortfolio}
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        + Nova Carteira
      </button>
    </div>
  );
}