import { api } from '@/services/api';

import type { Client } from '../types/client';

type CreateClientData = Omit<Client, 'id'>;

export async function getClients(): Promise<Client[]> {
  const response = await api.get<Client[]>('/clients');

  return response.data;
}

export async function createClient(
  client: CreateClientData,
): Promise<Client> {
  const response = await api.post<Client>('/clients', client);

  return response.data;
}

export async function updateClient(
  client: Client,
): Promise<Client> {
  const response = await api.put<Client>(
    `/clients/${client.id}`,
    client,
  );

  return response.data;
}

export async function deleteClient(
  clientId: string,
): Promise<void> {
  await api.delete(`/clients/${clientId}`);
}