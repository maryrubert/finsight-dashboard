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
    path: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Clientes',
    path: '/clientes',
    icon: Users,
  },
  {
    label: 'Carteiras',
    path: '/carteiras',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Relatórios',
    path: '/relatorios',
    icon: BarChart3,
  },
  {
    label: 'Configurações',
    path: '/configuracoes',
    icon: Settings,
  },
] as const;