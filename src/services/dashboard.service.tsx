import {
  BriefcaseBusiness,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';

import type { Metric } from '@/types/metric';

const dashboardMetrics: Metric[] = [
  {
    title: 'Patrimônio',
    value: 2540000,
    type: 'currency',
    variation: 12,
    trend: 'up',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Receita',
    value: 185000,
    type: 'currency',
    variation: 8,
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Clientes',
    value: 184,
    type: 'number',
    variation: 5,
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Rentabilidade',
    value: 18.4,
    type: 'percentage',
    variation: -2,
    trend: 'down',
    icon: TrendingUp,
  },
];

export function getDashboardMetrics() {
  return dashboardMetrics;
}