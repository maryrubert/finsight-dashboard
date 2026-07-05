import { useState } from 'react';

import type { ClientStatus } from '../types/client';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: {
    name: string;
    email: string;
    portfolio: string;
    status: ClientStatus;
  }) => void;
}

export function ClientModal({
  isOpen,
  onClose,
  onSave,
}: ClientModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [status, setStatus] = useState<ClientStatus>('active');

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

    setName('');
    setEmail('');
    setPortfolio('');
    setStatus('active');

    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold">
          Novo Cliente
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Preencha as informações do cliente.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Nome
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Carteira
            </label>

            <input
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as ClientStatus)
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
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}