import React from 'react'
import DashboardLayoutBasic from '../layouts/DashboardLayoutBasic'

import MGTRoutes from '../routes/MGTRoutes';
// import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import {
  DashboardIcon,
  InventoryIcon,
  CategoryIcon,
  AttachMoneyIcon,
  VerifiedIcon,
  StorefrontIcon,
  WorkIcon,
  PersonIcon,
  ReportsIcon,
  DocumentIcon,
  SettingsIcon,
  GroupsIcon,
  AccountBalanceIcon,
  BusinessIcon,
  ShopIcon,
  PeopleIcon,
  GavelIcon
} from '../assets/icons/icon.js';

// import GroupsIcon from '@mui/icons-material/Groups';

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
    title: 'Management:',
  },
  {
    segment: 'mgt/departments',
    title: 'Departments',
    icon: <BusinessIcon />,
    children: [
      {
        segment: 'accounts',
        title: 'Accounts & Finance',
        icon: <AccountBalanceIcon />,
        href: '/'
      },
      {
        segment: 'inventory',
        title: 'Inventory',
        icon: <InventoryIcon />,
        href: '/'
      },
      {
        segment: 'hr',
        title: 'Human Resources',
        icon: <GroupsIcon />,
        href: '/'
      },
      {
        segment: 'sales',
        title: 'Sales',
        icon: <AttachMoneyIcon />,
        href: '/'
      },
      {
        segment: 'purchase',
        title: 'Purchase',
        icon: <ShopIcon />,
        href: '/'
      },
      {
        segment: 'qa',
        title: 'Quality Assurance',
        icon: <VerifiedIcon />,
        href: '/mgt/departments/qa'
      },
      {
        segment: 'ecommerce',
        title: 'Ecommerce & Warehouse',
        icon: <StorefrontIcon />,
        href: '/mgt/departments/ecommerce'
      },
    ]
  },
  {
    segment: 'mgt/client-vendors',
    title: 'Client & Vendors',
    icon: <PersonIcon />,
    children: [
      {
        segment: 'clients',
        title: 'Client List',
        icon: <CategoryIcon />,
        href: '/mgt/client-vendors/clients'
      },
      {
        segment: 'vendors',
        title: 'Vendor List',
        icon: <CategoryIcon />,
        href: '/mgt/client-vendors/vendors'
      },
    ]
  },
  {
    segment: 'mgt/employee',
    title: 'Employee',
    icon: <WorkIcon />,
    children: [
      {
        segment: 'list',
        title: 'Employee List',
        icon: <PeopleIcon />,
        href: '/mgt/employee/list'
      },
    ]
  },
  {
    kind: 'header',
    title: 'Reports & Analytics',
  },
  {
    segment: 'mgt/reports',
    title: 'Reports',
    icon: <ReportsIcon />,
    children: [
      {
        segment: 'stock-analysis',
        title: 'Stock Analysis',
        icon: <DocumentIcon />,
        href: '/'
      },
      {
        segment: 'movement',
        title: 'Stock Movement',
        icon: <DocumentIcon />,
        href: '/'
      }
    ]
  },
  {
    segment: 'documents',
    title: 'Documents',
    icon: <ReportsIcon />,
    children: [
      {
        segment: 'mgt/documents',
        title: 'Document List',
        icon: <DocumentIcon />,
        href: '/documents-list'
      },
    ]
  },
  {
    kind: 'header',
    title: 'Policies & Guidelines',
  },
  {
    segment: 'mgt/policies',
    title: 'Our Policy',
    icon: <GavelIcon />,
    href: '/mgt/our-policy'
  },
  {
    kind: 'header',
    title: 'Settings:',
  },
  {
    segment: 'mgt/settings',
    title: 'Settings',
    icon: <SettingsIcon />,
    href: '/settings'
  }
];


// const NAVIGATION = [
//   {
//     kind: 'header',
//     title: 'Overview',
//   },
//   {
//     segment: '',
//     title: 'Dashboard',
//     icon: <DashboardIcon />,
//     href: '/'
//   },
//   {
//     kind: 'header',
//     title: 'Management:',
//   },
//   {
//     segment: 'mgt/departments',
//     title: 'Departments',
//     icon: <InventoryIcon />,
//     children: [
//       {
//         segment: 'accounts',
//         title: 'Accounts & Finance',
//         icon: <CategoryIcon />,
//         href: '/'
//       },
//       {
//         segment: 'inventory',
//         title: 'Inventory',
//         icon: <DoNotDisturb />,
//         href: '/'
//       },
//       {
//         segment: 'hr',
//         title: 'Human Resources',
//         icon: <ShoppingCart />,
//         href: '/'
//       },
//       {
//         segment: 'sales',
//         title: 'Sales',
//         icon: <AttachMoney />,
//         href: '/'
//       },
//       {
//         segment: 'purchase',
//         title: 'Purchase',
//         icon: <Undo />,
//         href:'/'
//       },
//       {
//         segment: 'qa',
//         title: 'Quality Assurance',
//         icon: <Undo />,
//         href:'/mgt/departments/purchase'
//       },
//       {
//         segment: 'ecommerce',
//         title: 'Ecommerce & Warehouse',
//         icon: <Undo />,
//         href:'/mgt/departments/purchase'
//       },

//     ]
//   },
//   {
//     segment: 'mgt/client-vendors',
//     title: 'Client & Vendors',
//     icon: <InventoryIcon />,
//     children: [
//       {
//         segment: 'clients',
//         title: 'Client List',
//         icon: <CategoryIcon />,
//         href: '/mgt/client-vendors/clients'
//       },
//       {
//         segment: 'vendors',
//         title: 'Vendor List',
//         icon: <CategoryIcon />,
//         href: '/mgt/client-vendors/vendors'
//       },
//     ]
//   },
//   {
//     segment: 'mgt/employee',
//     title: 'Employee',
//     icon: <InventoryIcon />,
//     children: [
//       {
//         segment: 'list',
//         title: 'Employee List',
//         icon: <CategoryIcon />,
//         href: '/mgt/employee/list'
//       },
//     ]
//   },
//   {
//     kind: 'header',
//     title: 'Reports & Analytics',
//   },
//   {
//     segment: 'mgt/reports',
//     title: 'Reports',
//     icon: <ReportsIcon />,
//     children: [
//       {
//         segment: 'stock-analysis',
//         title: 'Stock Analysis',
//         icon: <DocumentIcon />,
//         href: '/'
//       },
//       {
//         segment: 'movement',
//         title: 'Stock Movement',
//         icon: <DocumentIcon />,
//         href: '/'
//       }
//     ]
//   },
//   {
//     segment: 'documents',
//     title: 'Documents',
//     icon: <ReportsIcon />,
//     children: [
//       {
//         segment: 'mgt/documents',
//         title: 'Document List',
//         icon: <DocumentIcon />,
//         href: '/documents-list'
//       },
//     ]
//   },
//   {
//     kind: 'header',
//     title: 'Policies & Guidelines',
//   },
//   {
//     segment: 'mgt/policies',
//     title: 'Our Policy',
//     icon: <SettingsIcon />,
//     href: '/mgt/our-policy'
//   },
//   {
//     kind: 'header',
//     title: 'Settings:',
//   },
//   {
//     segment: 'mgt/settings',
//     title: 'Settings',
//     icon: <SettingsIcon />,
//     href: '/settings'
//   }
// ];

const MGTDashboard = () => {

  return (
    <div>
      <DashboardLayoutBasic
        navigation={NAVIGATION}
        routes={<MGTRoutes />}
      />
    </div>
  )
}

export default MGTDashboard;
