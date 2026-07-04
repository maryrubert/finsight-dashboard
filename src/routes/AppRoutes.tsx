import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import LoginPage from '@/pages/Login/LoginPage';

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
    path: '/dashboard',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}