import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', value: 1850000 },
  { month: 'Fev', value: 1920000 },
  { month: 'Mar', value: 2050000 },
  { month: 'Abr', value: 2140000 },
  { month: 'Mai', value: 2210000 },
  { month: 'Jun', value: 2320000 },
  { month: 'Jul', value: 2280000 },
  { month: 'Ago', value: 2410000 },
  { month: 'Set', value: 2480000 },
  { month: 'Out', value: 2520000 },
  { month: 'Nov', value: 2490000 },
  { month: 'Dez', value: 2540000 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function EvolutionChart() {
  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Evolução Patrimonial</h2>

        <p className="text-sm text-muted-foreground">
          Crescimento acumulado nos últimos 12 meses
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="portfolioGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickFormatter={(value) => `${value / 1000000}M`}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              labelFormatter={(label) => `Mês: ${label}`}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563EB"
              fill="url(#portfolioGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}