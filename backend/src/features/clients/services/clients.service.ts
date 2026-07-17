import type { Client } from "../../../../generated/prisma/client";

import { prisma } from "../../../lib/prisma";

type CreateClientData = Omit<
  Client,
  "id" | "createdAt" | "updatedAt"
>;

export async function getClients(): Promise<Client[]> {
  const clients = await prisma.client.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return clients;
}

export async function createClient(
  clientData: CreateClientData,
): Promise<Client> {
  const client = await prisma.client.create({
    data: clientData,
  });

  return client;
}