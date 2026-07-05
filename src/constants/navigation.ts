import {
  BarChart3,
  BriefcaseBusiness,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';

export const navigationItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Clientes',
    path: '/clients',
    icon: Users,
  },
  {
    label: 'Carteiras',
    path: '/portfolio',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Relatórios',
    path: '/reports',
    icon: BarChart3,
  },
  {
    label: 'Configurações',
    path: '/settings',
    icon: Settings,
  },
] as const;