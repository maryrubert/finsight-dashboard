import { useEffect, useMemo, useState } from 'react';

import { ClientModal } from '@/features/clients/components/ClientModal';
import { ClientsTable } from '@/features/clients/components/ClientsTable';
import { ClientsToolbar } from '@/features/clients/components/ClientsToolbar';
import {
  createClient,
  getClients,
  updateClient,
} from '@/features/clients/services/clients.service';
import type { Client, ClientStatus } from '@/features/clients/types/client';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

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

  async function handleSaveClient(client: {
    name: string;
    email: string;
    portfolio: string;
    status: ClientStatus;
  }) {
    if (selectedClient) {
  const updatedClient: Client = {
    ...selectedClient,
    ...client,
  };

  await updateClient(updatedClient);

  setClients((previousClients) =>
    previousClients.map((currentClient) =>
      currentClient.id === updatedClient.id
        ? updatedClient
        : currentClient,
    ),
  );

  setSelectedClient(null);
  return;
}

    const newClient: Client = {
      id: crypto.randomUUID(),
      ...client,
    };

    await createClient(newClient);

    setClients((previousClients) => [
      newClient,
      ...previousClients,
    ]);
  }

  function handleOpenCreateModal() {
    setSelectedClient(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(client: Client) {
    setSelectedClient(client);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setSelectedClient(null);
    setIsModalOpen(false);
  }

  return (
    <>
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
          onCreateClient={handleOpenCreateModal}
        />

        {isLoading ? (
          <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            Carregando clientes...
          </div>
        ) : (
          <ClientsTable
            clients={filteredClients}
            onEditClient={handleOpenEditModal}
          />
        )}
      </section>

      <ClientModal
        isOpen={isModalOpen}
        client={selectedClient}
        onClose={handleCloseModal}
        onSave={handleSaveClient}
      />
    </>
  );
}