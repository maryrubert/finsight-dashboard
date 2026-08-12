import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import type { Portfolio } from '@/features/portfolios/types/portfolio';

interface RiskDistributionChartProps {
  portfolios: Portfolio[];
}

const riskLabels: Record<Portfolio['risk'], string> = {
  low: 'Baixo',
  medium: 'Médio',
  high: 'Alto',
};

const riskColors: Record<Portfolio['risk'], string> = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
};

export function RiskDistributionChart({
  portfolios,
}: RiskDistributionChartProps) {
  const riskCounts = portfolios.reduce(
    (accumulator, portfolio) => {
      accumulator[portfolio.risk] += 1;

      return accumulator;
    },
    {
      low: 0,
      medium: 0,
      high: 0,
    },
  );

  const chartData = (
    Object.entries(riskCounts) as [
      Portfolio['risk'],
      number,
    ][]
  )
    .map(([risk, value]) => ({
      risk,
      name: riskLabels[risk],
      value,
    }))
    .filter((item) => item.value > 0);

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Distribuição por Risco
        </h2>

        <p className="text-sm text-muted-foreground">
          Perfil de risco das carteiras cadastradas
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-80 items-center justify-center rounded-xl border border-dashed">
          <p className="text-sm text-muted-foreground">
            Cadastre uma carteira para visualizar a distribuição.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                >
                  {chartData.map((item) => (
                    <Cell
                      key={item.risk}
                      fill={riskColors[item.risk]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    `${Number(value)} carteira(s)`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {chartData.map((item) => (
              <div
                key={item.risk}
                className="flex min-w-36 items-center justify-between gap-6"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        riskColors[item.risk],
                    }}
                  />

                  <span className="text-sm text-muted-foreground">
                    {item.name}
                  </span>
                </div>

                <strong className="text-sm">
                  {item.value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}