import { useEffect, useState } from 'react';
import { BriefcaseBusiness } from 'lucide-react';

import { getClients } from '@/features/clients/services/clients.service';
import type { Client } from '@/features/clients/types/client';
import { PortfoliosModal } from '@/features/portfolios/components/PortfoliosModal';
import { PortfoliosToolbar } from '@/features/portfolios/components/PortfoliosToolbar';

export default function PortfoliosPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadClients() {
      const data = await getClients();
      setClients(data);
    }

    loadClients();
  }, []);

  function handleSavePortfolio() {
    setIsModalOpen(false);
  }

  return (
    <>
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Carteiras
          </h1>

          <p className="mt-2 text-muted-foreground">
            Gerencie as carteiras de investimento dos clientes.
          </p>
        </div>

        <PortfoliosToolbar
          search=""
          onSearchChange={() => {}}
          onCreatePortfolio={() => setIsModalOpen(true)}
        />

        <div className="rounded-2xl border bg-card p-12 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BriefcaseBusiness size={28} />
            </div>

            <h2 className="text-lg font-semibold text-foreground">
              Nenhuma carteira cadastrada.
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Clique em &quot;Nova Carteira&quot; para cadastrar a primeira
              carteira de investimento.
            </p>
          </div>
        </div>
      </section>

      <PortfoliosModal
        isOpen={isModalOpen}
        clients={clients}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePortfolio}
      />
    </>
  );
}