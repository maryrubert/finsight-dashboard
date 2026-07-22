import { api } from '../../../services/api';
import type { Portfolio } from '../types/portfolio';

type CreatePortfolioData = Omit<Portfolio, 'id'>;

export async function getPortfolios(): Promise<Portfolio[]> {
  const response = await api.get<Portfolio[]>('/portfolios');

  return response.data;
}

export async function createPortfolio(
  portfolio: CreatePortfolioData,
): Promise<Portfolio> {
  const response = await api.post<Portfolio>(
    '/portfolios',
    portfolio,
  );

  return response.data;
}

export async function updatePortfolio(
  portfolio: Portfolio,
): Promise<Portfolio> {
  const response = await api.put<Portfolio>(
    `/portfolios/${portfolio.id}`,
    portfolio,
  );

  return response.data;
}

export async function deletePortfolio(
  portfolioId: string,
): Promise<void> {
  await api.delete(`/portfolios/${portfolioId}`);
}