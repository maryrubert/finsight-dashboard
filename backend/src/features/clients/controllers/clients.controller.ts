import type { Request, Response } from "express";

import {
  createClient,
  getClients,
  updateClient,
} from "../services/clients.service";

export async function listClients(
  _request: Request,
  response: Response,
) {
  const clients = await getClients();

  return response.status(200).json(clients);
}

export async function createClientHandler(
  request: Request,
  response: Response,
) {
  const client = await createClient(request.body);

  return response.status(201).json(client);
}

export async function updateClientHandler(
  request: Request,
  response: Response,
) {
  const { id } = request.params;

  const client = await updateClient(id, request.body);

  return response.status(200).json(client);
}