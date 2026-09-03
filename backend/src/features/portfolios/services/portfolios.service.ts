import type { Portfolio } from '../../../generated/prisma/client';

import { prisma } from '../../../lib/prisma';

type CreatePortfolioData = Omit<
  Portfolio,
  'id' | 'createdAt' | 'updatedAt'
>;

export async function getPortfolios(): Promise<Portfolio[]> {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return portfolios;
}

export async function createPortfolio(
  portfolioData: CreatePortfolioData,
): Promise<Portfolio> {
  const portfolio = await prisma.portfolio.create({
    data: portfolioData,
  });

  return portfolio;
}

export async function updatePortfolio(
  id: string,
  portfolioData: CreatePortfolioData,
): Promise<Portfolio> {
  const portfolio = await prisma.portfolio.update({
    where: {
      id,
    },
    data: portfolioData,
  });

  return portfolio;
}

export async function deletePortfolio(
  id: string,
): Promise<void> {
  await prisma.portfolio.delete({
    where: {
      id,
    },
  });
}