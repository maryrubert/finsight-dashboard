import { useEffect, useMemo, useState } from 'react';

import {
  createPortfolio,
  deletePortfolio,
  getPortfolios,
  updatePortfolio,
} from '../services/portfolios.service';
import type {
  Portfolio,
  PortfolioRisk,
  PortfolioStatus,
} from '../types/portfolio';

export interface PortfolioFormData {
  name: string;
  clientId: string;
  balance: number;
  profitability: number;
  risk: PortfolioRisk;
  status: PortfolioStatus;
}

export function usePortfolios() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolios() {
      try {
        const data = await getPortfolios();
        setPortfolios(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadPortfolios();
  }, []);

  const filteredPortfolios = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) {
      return portfolios;
    }

    return portfolios.filter((portfolio) =>
      portfolio.name.toLowerCase().includes(searchTerm),
    );
  }, [portfolios, search]);

  async function create(data: PortfolioFormData) {
    const newPortfolio: Portfolio = {
      id: crypto.randomUUID(),
      ...data,
    };

    await createPortfolio(newPortfolio);

    setPortfolios((previousPortfolios) => [
      newPortfolio,
      ...previousPortfolios,
    ]);
  }

  async function update(id: string, data: PortfolioFormData) {
    const updatedPortfolio: Portfolio = {
      id,
      ...data,
    };

    await updatePortfolio(updatedPortfolio);

    setPortfolios((previousPortfolios) =>
      previousPortfolios.map((portfolio) =>
        portfolio.id === id ? updatedPortfolio : portfolio,
      ),
    );
  }

  async function remove(id: string) {
    await deletePortfolio(id);

    setPortfolios((previousPortfolios) =>
      previousPortfolios.filter((portfolio) => portfolio.id !== id),
    );
  }

  return {
    portfolios: filteredPortfolios,
    search,
    setSearch,
    isLoading,
    create,
    update,
    remove,
  };
}