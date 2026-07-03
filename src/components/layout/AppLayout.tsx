import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Header />

      <main className="ml-[220px] pt-16">
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}