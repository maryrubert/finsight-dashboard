import type { 
  Metric, 
  MetricTrend, 
  MetricType 
} from '@/types/metric';

interface MetricCardProps {
  metric: Metric;
}

const trendStyles: Record<MetricTrend, string> = {
  up: 'text-emerald-600 bg-emerald-50',
  down: 'text-red-600 bg-red-50',
  neutral: 'text-slate-600 bg-slate-100',
};

function formatMetricValue(
  value: number, 
  type: MetricType
) {
  if (type === 'currency') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  }

  if (type === 'percentage') {
    return `${value.toLocaleString('pt-BR')}%`;
  }

  return new Intl.NumberFormat('pt-BR').format(value);
}

export function MetricCard({ 
  metric 
}: MetricCardProps) {
  const Icon = metric.icon;

  const hasVariation =
    metric.variation !== undefined &&
    metric.trend !== undefined;


  return (
    <article className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={20} />
        </div>

      {hasVariation && (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            trendStyles[metric.trend!]
          }`}
        >
          {metric.variation! > 0 ? '+' : ''}
          {metric.variation}%
        </span>
      )}
      </div>
      
      <div>
        <p className='text-sm text-muted-foreground'>
          {metric.title}
        </p>

        <strong className='mt-1 block text-2x1 font-bold text-foreground'>
            {formatMetricValue(
              metric.value,
              metric.type,
            )}
        </strong>
      </div>
    </article>
  );
}