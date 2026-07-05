import { Search } from 'lucide-react';

interface ClientsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateClient: () => void;
}

export function ClientsToolbar({
  search,
  onSearchChange,
  onCreateClient,
}: ClientsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full max-w-md">
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