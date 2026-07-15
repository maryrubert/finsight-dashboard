import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { Portfolio } from '@/features/portfolios/types/portfolio';

interface EvolutionChartProps {
  portfolios: Portfolio[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 1,
  }).format(value);
}

export function EvolutionChart({
  portfolios,
}: EvolutionChartProps) {
  const chartData = [...portfolios]
  .sort((firstPortfolio, secondPortfolio) => {
    return secondPortfolio.balance - firstPortfolio.balance;
  })
  .map((portfolio) => ({
    name: portfolio.name,
    balance: portfolio.balance,
  }));

  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Patrimônio por Carteira
        </h2>

        <p className="text-sm text-muted-foreground">
          Comparação do saldo atual das carteiras cadastradas
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-80 items-center justify-center rounded-xl border border-dashed">
          <p className="text-sm text-muted-foreground">
            Cadastre uma carteira para visualizar o gráfico.
          </p>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 8,
                right: 8,
                left: 8,
                bottom: 24,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={70}
              />

              <YAxis
                tickFormatter={formatCompactCurrency}
                tickLine={false}
                axisLine={false}
                width={90}
              />

              <Tooltip
                formatter={(value) => [
                  formatCurrency(Number(value)),
                  'Patrimônio',
                ]}
              />

              <Bar
                dataKey="balance"
                fill="#2563EB"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}