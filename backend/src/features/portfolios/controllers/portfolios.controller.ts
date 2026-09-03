import type { Request, Response } from 'express';

import {
  createPortfolio,
  deletePortfolio,
  getPortfolios,
  updatePortfolio,
} from '../services/portfolios.service';

export async function index(
  _request: Request,
  response: Response,
) {
  const portfolios = await getPortfolios();

  return response.json(portfolios);
}

export async function create(
  request: Request,
  response: Response,
) {
  const portfolio = await createPortfolio(
    request.body,
  );

  return response.status(201).json(portfolio);
}

export async function update(
  request: Request,
  response: Response,
) {
  const id = String(request.params.id);

  const portfolio = await updatePortfolio(
    id,
    request.body,
  );

  return response.json(portfolio);
}

export async function remove(
  request: Request,
  response: Response,
) {
  const id = String(request.params.id);

  await deletePortfolio(id);

  return response.status(204).send();
}