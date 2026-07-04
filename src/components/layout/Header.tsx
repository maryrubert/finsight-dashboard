import { Bell, ChevronDown, LogOut, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';

export function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  function handleLogout() {
    signOut();
    navigate('/login', { replace: true });
  }

  return (
    <header className="fixed left-[220px] right-0 top-0 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm text-muted-foreground">
        <Search size={16} />
        <span>Pesquisar...</span>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          className="text-muted-foreground transition hover:text-foreground"
        >
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {user?.name.charAt(0)}
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
          className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}