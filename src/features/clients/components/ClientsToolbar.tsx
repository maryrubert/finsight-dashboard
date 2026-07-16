import { Search } from 'lucide-react';

import type { ClientStatus } from '../types/client';

interface ClientsToolbarProps {
  search: string;
  status: ClientStatus | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ClientStatus | 'all') => void;
  onCreateClient: () => void;
}

export function ClientsToolbar({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onCreateClient,
}: ClientsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Pesquisar clientes..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-11 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as ClientStatus | 'all')
          }
          className="h-11 rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Todos os status</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onCreateClient}
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        + Novo Cliente
      </button>
    </div>
  );
}