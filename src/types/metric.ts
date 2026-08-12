import type { LucideIcon } from 'lucide-react';

export type MetricTrend = 'up' | 'down' | 'neutral';

export type MetricType =
  | 'currency'
  | 'number'
  | 'percentage';

export interface Metric {
  title: string;
  value: number;
  type: MetricType;
  icon: LucideIcon;
  description?: string;
  variation?: number;
  trend?: MetricTrend;
}