import { Bell, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed left-[220px] right-0 top-0 flex h-16 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm text-muted-foreground">
        <Search size={16} />
        <span>Pesquisar...</span>
      </div>

      <div className="flex items-center gap-4">
        <Bell size={18} />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          M
        </div>
      </div>
    </header>
  );
}