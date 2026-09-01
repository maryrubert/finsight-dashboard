import {
  Mail,
  Pencil,
  SearchX,
  Trash2,
  WalletCards,
} from 'lucide-react';

import type { Client } from '../types/client';

interface ClientsTableProps {
  clients: Client[];
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
}

function ClientStatusBadge({
  status,
}: {
  status: Client['status'];
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        status === 'active'
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {status === 'active' ? 'Ativo' : 'Inativo'}
    </span>
  );
}

export function ClientsTable({
  clients,
  onEditClient,
  onDeleteClient,
}: ClientsTableProps) {
  if (clients.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-8 shadow-sm md:p-12">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <SearchX size={28} />
          </div>

          <h2 className="text-lg font-semibold text-foreground">
            Nenhum cliente encontrado
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Não encontramos clientes com os filtros selecionados.
            Tente alterar a pesquisa, o status ou a carteira.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {clients.map((client) => (
          <article
            key={client.id}
            className="rounded-2xl border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-foreground">
                  {client.name}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail size={15} className="shrink-0" />
                  <span className="truncate">
                    {client.email}
                  </span>
                </div>
              </div>

              <ClientStatusBadge status={client.status} />
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm">
              <WalletCards
                size={16}
                className="shrink-0 text-muted-foreground"
              />

              <span className="text-muted-foreground">
                Carteira:
              </span>

              <span className="font-medium text-foreground">
                {client.portfolio}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onEditClient(client)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition hover:border-primary hover:bg-primary/5"
              >
                <Pencil size={16} />
                Editar
              </button>

              <button
                type="button"
                onClick={() => onDeleteClient(client)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border bg-card shadow-sm md:block">
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
                className="border-b transition-colors last:border-b-0 hover:bg-slate-50"
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
                  <ClientStatusBadge status={client.status} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEditClient(client)}
                      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:border-primary hover:bg-primary/5"
                    >
                      <Pencil size={15} />
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteClient(client)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}