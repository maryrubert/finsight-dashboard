import { useEffect, useState } from 'react';
import { BriefcaseBusiness } from 'lucide-react';

import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { getClients } from '@/features/clients/services/clients.service';
import type { Client } from '@/features/clients/types/client';
import { PortfoliosModal } from '@/features/portfolios/components/PortfoliosModal';
import { PortfoliosTable } from '@/features/portfolios/components/PortfoliosTable';
import { PortfoliosToolbar } from '@/features/portfolios/components/PortfoliosToolbar';
import {
  usePortfolios,
  type PortfolioFormData,
} from '@/features/portfolios/hooks/usePortfolios';
import type { Portfolio } from '@/features/portfolios/types/portfolio';

export default function PortfoliosPage() {
  const {
    portfolios,
    search,
    setSearch,
    clientId,
    setClientId,
    risk,
    setRisk,
    status,
    setStatus,
    isLoading,
    create,
    update,
    remove,
  } = usePortfolios();

  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedPortfolio, setSelectedPortfolio] =
    useState<Portfolio | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const [portfolioToDelete, setPortfolioToDelete] =
    useState<Portfolio | null>(null);

  useEffect(() => {
    async function loadClients() {
      const data = await getClients();
      setClients(data);
    }

    loadClients();
  }, []);

  async function handleSavePortfolio(
    data: PortfolioFormData,
  ) {
    if (selectedPortfolio) {
      await update(selectedPortfolio.id, data);
    } else {
      await create(data);
    }

    handleCloseModal();
  }

  async function handleConfirmDelete() {
    if (!portfolioToDelete) {
      return;
    }

    await remove(portfolioToDelete.id);

    setPortfolioToDelete(null);
    setIsDeleteDialogOpen(false);
  }

  function handleOpenCreateModal() {
    setSelectedPortfolio(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(portfolio: Portfolio) {
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true);
  }

  function handleOpenDeleteDialog(portfolio: Portfolio) {
    setPortfolioToDelete(portfolio);
    setIsDeleteDialogOpen(true);
  }

  function handleCloseModal() {
    setSelectedPortfolio(null);
    setIsModalOpen(false);
  }

  function handleCloseDeleteDialog() {
    setPortfolioToDelete(null);
    setIsDeleteDialogOpen(false);
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
          search={search}
          clientId={clientId}
          risk={risk}
          status={status}
          clients={clients}
          onSearchChange={setSearch}
          onClientChange={setClientId}
          onRiskChange={setRisk}
          onStatusChange={setStatus}
          onCreatePortfolio={handleOpenCreateModal}
        />

        {isLoading ? (
          <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            Carregando carteiras...
          </div>
        ) : portfolios.length === 0 ? (
          <div className="rounded-2xl border bg-card p-12 shadow-sm">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BriefcaseBusiness size={28} />
              </div>

              <h2 className="text-lg font-semibold text-foreground">
                Nenhuma carteira encontrada
              </h2>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Não encontramos carteiras com os filtros selecionados.
                Tente alterar a pesquisa, o cliente, o risco ou o status.
              </p>
            </div>
          </div>
        ) : (
          <PortfoliosTable
            portfolios={portfolios}
            clients={clients}
            onEditPortfolio={handleOpenEditModal}
            onDeletePortfolio={handleOpenDeleteDialog}
          />
        )}
      </section>

      <PortfoliosModal
        isOpen={isModalOpen}
        portfolio={selectedPortfolio}
        clients={clients}
        onClose={handleCloseModal}
        onSave={handleSavePortfolio}
      />

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Excluir Carteira"
        message={`Tem certeza que deseja excluir ${portfolioToDelete?.name}? Esta ação não poderá ser desfeita.`}
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteDialog}
      />
    </>
  );
}