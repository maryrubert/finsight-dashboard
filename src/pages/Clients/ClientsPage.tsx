import { useEffect, useMemo, useState } from 'react';

import { ClientsTable } from '@/features/clients/components/ClientsTable';
import { ClientsToolbar } from '@/features/clients/components/ClientsToolbar';
import { getClients } from '@/features/clients/services/clients.service';
import type { Client } from '@/features/clients/types/client';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
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

  const filteredClients = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) {
      return clients;
    }

    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm) ||
        client.portfolio.toLowerCase().includes(searchTerm),
    );
  }, [clients, search]);

  function handleCreateClient() {
    alert('Modal de Novo Cliente será implementado na próxima sprint.');
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Clientes
        </h1>

        <p className="mt-2 text-muted-foreground">
          Gerencie os clientes cadastrados na plataforma FinSight.
        </p>
      </div>

      <ClientsToolbar
        search={search}
        onSearchChange={setSearch}
        onCreateClient={handleCreateClient}
      />

      {isLoading ? (
        <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
          Carregando clientes...
        </div>
      ) : (
        <ClientsTable clients={filteredClients} />
      )}
    </section>
  );
}