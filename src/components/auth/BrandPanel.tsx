import { ArrowUpRight, BarChart3, ShieldCheck, TrendingUp } from 'lucide-react';

export function BrandPanel() {
  return (
    <section className="hidden min-h-screen flex-1 overflow-hidden bg-slate-950 p-10 text-white lg:flex">
      <div className="relative flex w-full flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 shadow-2xl">
        <div>
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600">
              <TrendingUp size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">FinSight</h1>
              <p className="text-sm text-slate-400">Financial Intelligence</p>
            </div>
          </div>

          <h2 className="max-w-md text-4xl font-bold leading-tight">
            Intelligence for smarter financial decisions.
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
            Acompanhe clientes, carteiras e indicadores financeiros em uma
            experiência clara, moderna e segura.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-slate-300">Patrimônio sob gestão</span>
              <ArrowUpRight className="text-emerald-400" size={18} />
            </div>

            <strong className="text-3xl font-bold">R$ 2.5M</strong>

            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 w-3/4 rounded-full bg-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <ShieldCheck className="mb-4 text-blue-400" size={22} />
              <p className="text-sm text-slate-400">Segurança</p>
              <strong className="text-xl">99.9%</strong>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <BarChart3 className="mb-4 text-emerald-400" size={22} />
              <p className="text-sm text-slate-400">Crescimento</p>
              <strong className="text-xl">+18.4%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}