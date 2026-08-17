import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export function Header({
  onOpenMobileMenu,
}: HeaderProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  function handleLogout() {
    signOut();
    navigate('/login', { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="hidden w-full max-w-xs md:block">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="search"
            placeholder="Pesquisar..."
            className="h-10 w-full rounded-xl border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3 md:gap-6">
        <button
          type="button"
          aria-label="Notificações"
          className="hidden text-muted-foreground transition hover:text-foreground md:inline-flex"
        >
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground md:h-10 md:w-10">
            {user?.name?.charAt(0) ?? 'U'}
          </div>

          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-foreground">
              {user?.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-muted-foreground md:block"
          />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="hidden items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 md:flex"
        >
          <LogOut size={16} />
          Logout
        </button>

        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Abrir menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border text-muted-foreground transition hover:bg-slate-50 hover:text-foreground md:hidden"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}