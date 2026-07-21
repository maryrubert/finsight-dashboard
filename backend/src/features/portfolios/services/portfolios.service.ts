import { prisma } from '../../../lib/prisma';

interface CreatePortfolioData {
  name: string;
  clientId: string;
  balance: number;
  profitability: number;
  risk: string;
  status: string;
}

export async function listPortfolios() {
  return prisma.portfolio.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function createPortfolio(data: CreatePortfolioData) {
  return prisma.portfolio.create({
    data,
  });
}

export async function updatePortfolio(
  id: string,
  data: CreatePortfolioData,
) {
  return prisma.portfolio.update({
    where: {
      id,
    },
    data,
  });
}

export async function deletePortfolio(id: string) {
  return prisma.portfolio.delete({
    where: {
      id,
    },
  });
}