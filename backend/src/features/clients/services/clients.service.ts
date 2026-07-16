import type { Client } from '../types/client';

const clients: Client[] = [
  {
    id: crypto.randomUUID(),
    name: 'Mariana Rubert',
    email: 'mariana@finsight.com',
    portfolio: 'Premium',
    status: 'active',
  },
  {
    id: crypto.randomUUID(),
    name: 'João Silva',
    email: 'joao@finsight.com',
    portfolio: 'Conservadora',
    status: 'inactive',
  },
];

export function getClients(): Client[] {
  return clients;
}