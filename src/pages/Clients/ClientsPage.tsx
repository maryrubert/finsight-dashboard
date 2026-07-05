import { useEffect, useState } from 'react';

import { ClientsTable } from '@/features/clients/components/ClientsTable';
import { getClients } from '@/features/clients/services/clients.service';
import type { Client } from '@/features/clients/types/client';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getClients();
        setClients(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadClients();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Clientes
          </h1>

          <p className="mt-2 text-muted-foreground">
            Gerencie os clientes cadastrados na plataforma FinSight.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          + Novo Cliente
        </button>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
          Carregando clientes...
        </div>
      ) : (
        <ClientsTable clients={clients} />
      )}
    </section>
  );
}