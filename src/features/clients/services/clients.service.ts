import { clientsMock } from '../mocks/clients.mock';
import type { Client } from '../types/client';

const STORAGE_KEY = 'finsight:clients';

function initializeStorage() {
  const storedClients = localStorage.getItem(STORAGE_KEY);

  if (!storedClients) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(clientsMock),
    );
  }
}

export async function getClients(): Promise<Client[]> {
  initializeStorage();

  return new Promise((resolve) => {
    setTimeout(() => {
      const clients = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? '[]',
      ) as Client[];

      resolve(clients);
    }, 300);
  });
}

export async function createClient(
  client: Client,
): Promise<void> {
  initializeStorage();

  const clients = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? '[]',
  ) as Client[];

  clients.unshift(client);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(clients),
  );
}