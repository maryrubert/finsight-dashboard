import { randomUUID } from 'node:crypto';

import type { Client } from '../types/client';

const clients: Client[] = [
  {
    id: randomUUID(),
    name: 'Mariana Rubert',
    email: 'mariana@finsight.com',
    portfolio: 'Premium',
    status: 'active',
  },
  {
    id: randomUUID(),
    name: 'João Silva',
    email: 'joao@finsight.com',
    portfolio: 'Conservadora',
    status: 'inactive',
  },
];

export function getClients(): Client[] {
  return clients;
}

export function createClient(
  client: Omit<Client, 'id'>,
): Client {
  const newClient: Client = {
    id: randomUUID(),
    ...client,
  };

  clients.push(newClient);

  return newClient;
}