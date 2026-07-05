import { Pencil } from 'lucide-react';

import type { Client } from '../types/client';

interface ClientsTableProps {
  clients: Client[];
  onEditClient: (client: Client) => void;
}

export function ClientsTable({
  clients,
  onEditClient,
}: ClientsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-slate-50">
          <tr className="border-b">
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Nome
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Carteira
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="border-b transition-colors hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium">{client.name}</td>

              <td className="px-6 py-4 text-muted-foreground">
                {client.email}
              </td>

              <td className="px-6 py-4">{client.portfolio}</td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    client.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {client.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onEditClient(client)}
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  <Pencil size={15} />
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}