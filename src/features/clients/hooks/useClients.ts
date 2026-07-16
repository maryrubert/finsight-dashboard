import { useEffect, useMemo, useState } from 'react';

import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from '../services/clients.service';
import type { Client, ClientStatus } from '../types/client';

export interface ClientFormData {
  name: string;
  email: string;
  portfolio: string;
  status: ClientStatus;
}

export type ClientStatusFilter = ClientStatus | 'all';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ClientStatusFilter>('all');
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

    return clients.filter((client) => {
      const matchesSearch =
        !searchTerm ||
        client.name.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm) ||
        client.portfolio.toLowerCase().includes(searchTerm);

      const matchesStatus =
        status === 'all' || client.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [clients, search, status]);

  async function create(data: ClientFormData) {
    const newClient: Client = {
      id: crypto.randomUUID(),
      ...data,
    };

    await createClient(newClient);

    setClients((previousClients) => [
      newClient,
      ...previousClients,
    ]);
  }

  async function update(
    id: string,
    data: ClientFormData,
  ) {
    const updatedClient: Client = {
      id,
      ...data,
    };

    await updateClient(updatedClient);

    setClients((previousClients) =>
      previousClients.map((client) =>
        client.id === id ? updatedClient : client,
      ),
    );
  }

  async function remove(id: string) {
    await deleteClient(id);

    setClients((previousClients) =>
      previousClients.filter(
        (client) => client.id !== id,
      ),
    );
  }

  return {
    clients: filteredClients,
    search,
    setSearch,
    status,
    setStatus,
    isLoading,
    create,
    update,
    remove,
  };
}