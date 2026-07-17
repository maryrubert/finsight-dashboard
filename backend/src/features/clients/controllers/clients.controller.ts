import type { Request, Response } from 'express';

import {
  createClient,
  getClients,
} from '../services/clients.service';

export function listClients(
  _request: Request,
  response: Response,
) {
  const clients = getClients();

  return response.status(200).json(clients);
}

export function createClientHandler(
  request: Request,
  response: Response,
) {
  const client = createClient(request.body);

  return response.status(201).json(client);
}