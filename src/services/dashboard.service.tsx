import {
  BriefcaseBusiness,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';

import { getClients } from '@/features/clients/services/clients.service';
import { getPortfolios } from '@/features/portfolios/services/portfolios.service';
import type { Metric } from '@/types/metric';

export async function getDashboardMetrics(): Promise<
  Metric[]
> {
  const [clients, portfolios] = await Promise.all([
    getClients(),
    getPortfolios(),
  ]);

  const totalBalance = portfolios.reduce(
    (total, portfolio) =>
      total + portfolio.balance,
    0,
  );

  const totalProfitability = portfolios.reduce(
    (total, portfolio) =>
      total + portfolio.profitability,
    0,
  );

  const averageProfitability =
    portfolios.length === 0
      ? 0
      : Number(
          (
            totalProfitability /
            portfolios.length
          ).toFixed(2),
        );

  return [
    {
      title: 'Patrimônio',
      value: totalBalance,
      type: 'currency',
      icon: DollarSign,
    },
    {
      title: 'Carteiras',
      value: portfolios.length,
      type: 'number',
      icon: BriefcaseBusiness,
    },
    {
      title: 'Clientes',
      value: clients.length,
      type: 'number',
      icon: Users,
    },
    {
      title: 'Rentabilidade média',
      value: averageProfitability,
      type: 'percentage',
      icon: TrendingUp,
    },
  ];
}