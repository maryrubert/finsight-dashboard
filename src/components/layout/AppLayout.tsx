import { useState } from 'react';
import { ChartNoAxesCombined } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  function handleOpenMobileMenu() {
    setIsMobileMenuOpen(true);
  }

  function handleCloseMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed left-0 top-0 z-[60] flex h-16 w-[220px] items-center border-b border-r bg-background px-5 max-md:w-auto max-md:border-r-0">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ChartNoAxesCombined size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight max-sm:hidden">
            FinSight
          </span>
        </div>
      </div>

      <div className="md:ml-[220px]">
        <Header
          onOpenMobileMenu={handleOpenMobileMenu}
        />
      </div>

      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={handleCloseMobileMenu}
      />

      <main className="md:ml-[220px]">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}