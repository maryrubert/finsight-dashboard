import type { Client } from '../types/client';

interface ClientsTableProps {
  clients: Client[];
}

export function ClientsTable({ clients }: ClientsTableProps) {
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
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="border-b transition-colors hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium">
                {client.name}
              </td>

              <td className="px-6 py-4 text-muted-foreground">
                {client.email}
              </td>

              <td className="px-6 py-4">
                {client.portfolio}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    client.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {client.status === 'active'
                    ? 'Ativo'
                    : 'Inativo'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}