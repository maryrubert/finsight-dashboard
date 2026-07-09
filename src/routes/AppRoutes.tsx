import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import ClientsPage from '@/pages/Clients/ClientsPage';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import LoginPage from '@/pages/Login/LoginPage';
import PortfoliosPage from '@/pages/Portfolios/PortfoliosPage';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/clients',
            element: <ClientsPage />,
          },
          {
            path: '/portfolios',
            element: <PortfoliosPage />,
          },
        ],
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}