import { clientsMock } from '../mocks/clients.mock';
import type { Client } from '../types/client';

export async function getClients(): Promise<Client[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clientsMock);
    }, 300);
  });
}