import { useEffect, useState } from 'react';

import type { Client, ClientStatus } from '../types/client';

interface ClientFormData {
  name: string;
  email: string;
  portfolio: string;
  status: ClientStatus;
}

interface ClientModalProps {
  isOpen: boolean;
  client?: Client | null;
  onClose: () => void;
  onSave: (client: ClientFormData) => void;
}

export function ClientModal({
  isOpen,
  client,
  onClose,
  onSave,
}: ClientModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [status, setStatus] = useState<ClientStatus>('active');

  const isEditing = Boolean(client);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (client) {
      setName(client.name);
      setEmail(client.email);
      setPortfolio(client.portfolio);
      setStatus(client.status);
      return;
    }

    setName('');
    setEmail('');
    setPortfolio('');
    setStatus('active');
  }, [client, isOpen]);

  function handleSave() {
    if (!name.trim() || !email.trim() || !portfolio.trim()) {
      return;
    }

    onSave({
      name,
      email,
      portfolio,
      status,
    });

    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold">
          {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {isEditing
            ? 'Atualize as informações do cliente.'
            : 'Preencha as informações do cliente.'}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Nome</label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Carteira</label>

            <input
              value={portfolio}
              onChange={(event) => setPortfolio(event.target.value)}
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Status</label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ClientStatus)
              }
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-primary px-5 py-2 text-primary-foreground"
          >
            {isEditing ? 'Salvar alterações' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}