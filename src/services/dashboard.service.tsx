import {
  BriefcaseBusiness,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';

import { getClients } from '@/features/clients/services/clients.service';
import { getPortfolios } from '@/features/portfolios/services/portfolios.service';
import type { Metric } from '@/types/metric';

export async function getDashboardMetrics(): Promise<Metric[]> {
  const clients = await getClients();
  const portfolios = await getPortfolios();

  const totalBalance = portfolios.reduce(
    (total, portfolio) => total + portfolio.balance,
    0,
  );

  const totalProfitability = portfolios.reduce(
    (total, portfolio) => total + portfolio.profitability,
    0,
  );

  const averageProfitability =
    portfolios.length === 0
      ? 0
      : Number(
          (totalProfitability / portfolios.length).toFixed(1),
      );

  return [
    {
      title: 'Patrimônio',
      value: totalBalance,
      type: 'currency',
      variation: 12,
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Carteiras',
      value: portfolios.length,
      type: 'number',
      variation: 8,
      trend: 'up',
      icon: BriefcaseBusiness,
    },
    {
      title: 'Clientes',
      value: clients.length,
      type: 'number',
      variation: 5,
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Rentabilidade',
      value: averageProfitability,
      type: 'percentage',
      variation: -2,
      trend: 'down',
      icon: TrendingUp,
    },
  ];
}