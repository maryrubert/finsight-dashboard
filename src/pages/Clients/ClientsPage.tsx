export default function ClientsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Clientes
        </h1>

        <p className="mt-2 text-muted-foreground">
          Gerencie os clientes cadastrados na plataforma FinSight.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-lg text-muted-foreground">
            Módulo de Clientes em desenvolvimento 🚀
          </p>
        </div>
      </div>
    </section>
  );
}