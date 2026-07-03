import { NavLink } from 'react-router-dom';

import { navigationItems } from '@/constants/navigation';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] border-r bg-sidebar p-4">
      <h1 className="mb-8 text-xl font-bold text-sidebar-foreground">
        FinSight
      </h1>

      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                ].join(' ')
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}