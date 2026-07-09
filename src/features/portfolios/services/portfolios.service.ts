import { portfoliosMock } from '../mocks/portfolios.mock';
import type { Portfolio } from '../types/portfolio';

const STORAGE_KEY = 'finsight:portfolios';

function initializeStorage() {
  const storedPortfolios = localStorage.getItem(STORAGE_KEY);

  if (!storedPortfolios) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(portfoliosMock),
    );
  }
}

export async function getPortfolios(): Promise<Portfolio[]> {
  initializeStorage();

  return new Promise((resolve) => {
    setTimeout(() => {
      const portfolios = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? '[]',
      ) as Portfolio[];

      resolve(portfolios);
    }, 300);
  });
}

export async function createPortfolio(
  portfolio: Portfolio,
): Promise<void> {
  initializeStorage();

  const portfolios = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? '[]',
  ) as Portfolio[];

  portfolios.unshift(portfolio);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(portfolios),
  );
}

export async function updatePortfolio(
  portfolio: Portfolio,
): Promise<void> {
  initializeStorage();

  const portfolios = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? '[]',
  ) as Portfolio[];

  const updatedPortfolios = portfolios.map(
    (currentPortfolio) =>
      currentPortfolio.id === portfolio.id
        ? portfolio
        : currentPortfolio,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedPortfolios),
  );
}

export async function deletePortfolio(
  portfolioId: string,
): Promise<void> {
  initializeStorage();

  const portfolios = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? '[]',
  ) as Portfolio[];

  const updatedPortfolios = portfolios.filter(
    (portfolio) => portfolio.id !== portfolioId,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedPortfolios),
  );
}