import { FilePlus2 } from 'lucide-react';

interface ReportsToolbarProps {
  onCreateReport: () => void;
}

export function ReportsToolbar({
  onCreateReport,
}: ReportsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          Relatórios
        </h2>

        <p className="text-sm text-muted-foreground">
          Gere relatórios em PDF ou CSV.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreateReport}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-primary-foreground transition hover:opacity-90"
      >
        <FilePlus2 size={18} />
        Gerar relatório
      </button>
    </div>
  );
}