import {
  ChartNoAxesCombined,
  LogOut,
  X,
} from 'lucide-react';
import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

import { navigationItems } from '@/constants/navigation';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  function handleLogout() {
    signOut();
    onCloseMobile();
    navigate('/login', { replace: true });
  }

  function renderNavigation(isMobile = false) {
    return (
      <nav className={isMobile ? 'space-y-2' : 'space-y-2'}>
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={
                isMobile
                  ? onCloseMobile
                  : undefined
              }
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl font-medium transition-colors',
                  isMobile
                    ? 'min-h-11 px-4 py-3 text-sm'
                    : 'px-3 py-2 text-sm',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                ].join(' ')
              }
            >
              <Icon
                size={isMobile ? 19 : 18}
                className="shrink-0"
              />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    );
  }

  return (
    <>
      {/* Desktop */}
      <aside className="fixed bottom-0 left-0 top-16 z-40 hidden w-[220px] border-r bg-background p-4 md:block">
        {renderNavigation()}
      </aside>

      {/* Mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={onCloseMobile}
            className="absolute inset-0 bg-black/40"
          />

          <aside className="absolute bottom-0 left-0 top-0 flex w-[300px] max-w-[85vw] flex-col bg-background shadow-xl">
            <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <ChartNoAxesCombined size={19} />
                </div>

                <span className="text-lg font-bold tracking-tight">
                  FinSight
                </span>
              </div>

              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Fechar menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-slate-100 hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {renderNavigation(true)}
            </div>

            <div className="border-t p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {user?.name?.charAt(0) ?? 'U'}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user?.name}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}