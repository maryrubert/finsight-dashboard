import { useEffect, useState } from 'react';

import type { Client } from '@/features/clients/types/client';

import type {
  Portfolio,
  PortfolioRisk,
  PortfolioStatus,
} from '../types/portfolio';

interface PortfolioFormData {
  name: string;
  clientId: string;
  balance: number;
  profitability: number;
  risk: PortfolioRisk;
  status: PortfolioStatus;
}

interface PortfoliosModalProps {
  isOpen: boolean;
  portfolio?: Portfolio | null;
  clients: Client[];
  onClose: () => void;
  onSave: (portfolio: PortfolioFormData) => void;
}

export function PortfoliosModal({
  isOpen,
  portfolio,
  clients,
  onClose,
  onSave,
}: PortfoliosModalProps) {
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState('');
  const [balance, setBalance] = useState(0);
  const [profitability, setProfitability] = useState(0);
  const [risk, setRisk] = useState<PortfolioRisk>('medium');
  const [status, setStatus] = useState<PortfolioStatus>('active');

  const isEditing = Boolean(portfolio);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (portfolio) {
      setName(portfolio.name);
      setClientId(portfolio.clientId);
      setBalance(portfolio.balance);
      setProfitability(portfolio.profitability);
      setRisk(portfolio.risk);
      setStatus(portfolio.status);
      return;
    }

    setName('');
    setClientId('');
    setBalance(0);
    setProfitability(0);
    setRisk('medium');
    setStatus('active');
  }, [isOpen, portfolio]);

  function handleSave() {
    if (!name.trim() || !clientId.trim()) {
      return;
    }

    onSave({
      name,
      clientId,
      balance,
      profitability,
      risk,
      status,
    });

    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-4 py-8">
      <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold">
          {isEditing ? 'Editar Carteira' : 'Nova Carteira'}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {isEditing
            ? 'Atualize as informações da carteira.'
            : 'Preencha as informações da carteira.'}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Nome da carteira
            </label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Cliente</label>

            <select
              value={clientId}
              onChange={(event) => setClientId(event.target.value)}
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            >
              <option value="">Selecione um cliente</option>

              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Saldo</label>

            <input
              type="number"
              value={balance}
              onChange={(event) => setBalance(Number(event.target.value))}
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Rentabilidade (%)
            </label>

            <input
              type="number"
              value={profitability}
              onChange={(event) =>
                setProfitability(Number(event.target.value))
              }
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Risco</label>

            <select
              value={risk}
              onChange={(event) =>
                setRisk(event.target.value as PortfolioRisk)
              }
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            >
              <option value="low">Baixo</option>
              <option value="medium">Médio</option>
              <option value="high">Alto</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Status</label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as PortfolioStatus)
              }
              className="h-11 w-full rounded-xl border px-4 outline-none focus:border-primary"
            >
              <option value="active">Ativa</option>
              <option value="inactive">Inativa</option>
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