import { ChartNoAxesCombined } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed left-0 top-0 z-[60] flex h-16 w-[220px] items-center border-b border-r bg-background px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ChartNoAxesCombined size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            FinSight
          </span>
        </div>
      </div>

      <div className="ml-[220px]">
        <Header />
      </div>

      <Sidebar />

      <main className="ml-[220px]">
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}