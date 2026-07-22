import { Request, Response } from 'express';

import {
  createPortfolio,
  getPortfolios,
  deletePortfolio,
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
  const portfolio = await createPortfolio(request.body);

  return response.status(201).json(portfolio);
}

export async function update(
  request: Request,
  response: Response,
) {
  const portfolio = await updatePortfolio(
    request.params.id,
    request.body,
  );

  return response.json(portfolio);
}

export async function remove(
  request: Request,
  response: Response,
) {
  await deletePortfolio(request.params.id);

  return response.status(204).send();
}