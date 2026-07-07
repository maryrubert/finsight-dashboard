import { useState } from 'react';

import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { ClientModal } from '@/features/clients/components/ClientModal';
import { ClientsTable } from '@/features/clients/components/ClientsTable';
import { ClientsToolbar } from '@/features/clients/components/ClientsToolbar';

import { useClients } from '@/features/clients/hooks/useClients';
import type { ClientFormData } from '@/features/clients/hooks/useClients';

export default function ClientsPage() {
  const {
    clients,
    search,
    setSearch,
    isLoading,
    create,
    update,
    remove,
  } = useClients();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] =
    useState<Client | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const [clientToDelete, setClientToDelete] =
    useState<Client | null>(null);

  async function handleSaveClient(
    data: ClientFormData,
  ) {
    if (selectedClient) {
      await update(selectedClient.id, data);
    } else {
      await create(data);
    }

    handleCloseModal();
  }

  async function handleConfirmDelete() {
    if (!clientToDelete) {
      return;
    }

    await remove(clientToDelete.id);

    setClientToDelete(null);
    setIsDeleteDialogOpen(false);
  }

  function handleOpenCreateModal() {
    setSelectedClient(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(client: Client) {
    setSelectedClient(client);
    setIsModalOpen(true);
  }

  function handleOpenDeleteDialog(client: Client) {
    setClientToDelete(client);
    setIsDeleteDialogOpen(true);
  }

  function handleCloseModal() {
    setSelectedClient(null);
    setIsModalOpen(false);
  }

  return (
    <>
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Clientes
          </h1>

          <p className="mt-2 text-muted-foreground">
            Gerencie os clientes cadastrados na plataforma
            FinSight.
          </p>
        </div>

        <ClientsToolbar
          search={search}
          onSearchChange={setSearch}
          onCreateClient={handleOpenCreateModal}
        />

        {isLoading ? (
          <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            Carregando clientes...
          </div>
        ) : (
          <ClientsTable
            clients={clients}
            onEditClient={handleOpenEditModal}
            onDeleteClient={handleOpenDeleteDialog}
          />
        )}
      </section>

      <ClientModal
        isOpen={isModalOpen}
        client={selectedClient}
        onClose={handleCloseModal}
        onSave={handleSaveClient}
      />

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Excluir Cliente"
        message={`Tem certeza que deseja excluir ${clientToDelete?.name}? Esta ação não poderá ser desfeita.`}
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setClientToDelete(null);
          setIsDeleteDialogOpen(false);
        }}
      />
    </>
  );
}