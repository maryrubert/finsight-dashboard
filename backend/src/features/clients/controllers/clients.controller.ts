import type { Request, Response } from 'express';

import { getClients } from '../services/clients.service';

export function listClients(
  _request: Request,
  response: Response,
) {
  const clients = getClients();

  return response.status(200).json(clients);
}