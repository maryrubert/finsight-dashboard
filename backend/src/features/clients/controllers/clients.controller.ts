import type { Request, Response } from "express";

import {
  createClient,
  getClients,
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