import React from 'react'
import DashboardLayoutBasic from '../layouts/DashboardLayoutBasic'
import IMSRoutes from '../routes/IMSRoutes';
import { AttachMoneyIcon, CategoryIcon, DashboardIcon, DocumentIcon, DoNotDisturbIcon, InventoryIcon, RedoIcon, ReportsIcon, SettingsIcon, ShoppingCartIcon, UndoIcon } from '../assets/icons/icon';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Overview',
  },
  {
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    href: '/'
  },
  {
    kind: 'header',
    title: 'Inventory Management',
  },
  {
    segment: 'ims/items',
    title: 'Items Management',
    icon: <InventoryIcon />,
    children: [
      {
        segment: 'list',
        title: 'Inventory',
        icon: <CategoryIcon />,
        href: '/ims/items/list'
      },
      {
        segment: 'defective',
        title: 'Defective Products',
        icon: <DoNotDisturbIcon />,
        href: '/ims/items/list'
      },
      {
        segment: 'purchases',
        title: 'Purchase',
        icon: <ShoppingCartIcon />,
        href: '/ims/items/purchases'
      },
      {
        segment: 'sales',
        title: 'Sales',
        icon: <AttachMoneyIcon />,
        href: '/ims/items/sales'
      },
      {
        segment: 'purchase-return',
        title: 'Purchase Return',
        icon: <UndoIcon />,
        href: '/ims/items/purchase-return'
      },
      {
        segment: 'sales-return',
        title: 'Sales Return',
        icon: <RedoIcon />,
        href: '/ims/items/sales-return'
      },
    ]
  },
  {
    kind: 'header',
    title: 'Reports & Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <ReportsIcon />,
    children: [
      {
        segment: 'stock-analysis',
        title: 'Stock Analysis',
        icon: <DocumentIcon />,
        href: '/reports/stock-analysis'
      },
      {
        segment: 'movement',
        title: 'Stock Movement',
        icon: <DocumentIcon />,
        href: '/reports/movement'
      }
    ]
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
    href: '/settings'
  }
];

const IMSDashboard = () => {
  
  return (
    <div>
      <DashboardLayoutBasic
        navigation={NAVIGATION}
        routes={<IMSRoutes />}
      />
    </div>
  )
}

export default IMSDashboard;
