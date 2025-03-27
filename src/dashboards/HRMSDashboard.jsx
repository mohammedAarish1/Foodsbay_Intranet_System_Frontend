import React from 'react'
import DashboardLayoutBasic from '../layouts/DashboardLayoutBasic'

import { DashboardIcon, PeopleIcon, AccessTimeIcon, EventIcon, AttachMoneyIcon, ReceiptIcon, AssignmentIcon, DocumentScannerIcon, SettingsIcon, FolderIcon, PolicyIcon, SummarizeIcon, PersonIcon, AccountCircleIcon, LockIcon, HistoryIcon, QueryBuilderIcon, EmailIcon, LocalOfferIcon, LeaveIcon, GpsFixedIcon, QueryStatsIcon, StarOutlineIcon } from '../assets/icons/icon';

import BeachAccessIcon from '@mui/icons-material/BeachAccess';

// import {
//   Dashboard as DashboardIcon,
//   Inventory as InventoryIcon,
//   Category as CategoryIcon,
//   DoNotDisturb as DoNotDisturbIcon,
//   ShoppingCart as ShoppingCartIcon,
//   AttachMoney as AttachMoneyIcon,
//   Undo as UndoIcon,
//   Verified as VerifiedIcon,
//   Storefront as StorefrontIcon,
//   AccountBalanceWallet as AccountBalanceWalletIcon,
//   Work as WorkIcon,
//   Person as PersonIcon,
//   InsertChart as ReportsIcon,
//   Description as DocumentIcon,
//   Settings as SettingsIcon,
//   Groups as GroupsIcon,
//   AccountBalance as AccountBalanceIcon,
//   Business as BusinessIcon,
//   Shop as ShopIcon,
//   People as PeopleIcon,
//   Gavel as GavelIcon
// } from '@mui/icons-material';
import HRMSRoutes from '../routes/HRMSRoutes';


// const NAVIGATION = [
//   {
//     kind: 'header',
//     title: 'Overview',
//   },
//   {
//     segment: 'hrms',
//     title: 'Dashboard',
//     icon: <DashboardIcon />,
//     href: '/hrms'
//   },
//   {
//     kind: 'header',
//     title: 'Employee Management',
//   },
//   {
//     segment: 'hrms/employee-list',
//     title: 'Employee List',
//     icon: '',
//     href: '/'
//   },
//   {
//     segment: 'hrms',
//     title: 'Attendance & Leave',
//     icon: '',
//     children: [
//       {
//         segment: 'attendance-logs',
//         title: 'Attendance Logs',
//         icon: '',
//         href: '/'
//       },
//       {
//         segment: 'leave-requests',
//         title: 'Leave Requests',
//         icon: '',
//         href: '/'
//       },
//       {
//         segment: 'leave-policies',
//         title: 'Leave Policies',
//         icon: '',
//         href: '/'
//       },
//     ]
//   },
//   {
//     segment: 'hrms',
//     title: 'Payroll & Benefits',
//     icon: '',
//     children: [
//       {
//         segment: 'salary-disbursements',
//         title: 'Salary Disbursements',
//         icon: '',
//         href: '/'
//       },
//       {
//         segment: 'payroll-history',
//         title: 'Payroll History',
//         icon: '',
//         href: '/'
//       },
//       {
//         segment: 'tax-benefits',
//         title: 'Tax & Benefits',
//         icon: '',
//         href: '/'
//       },
//       {
//         segment: 'compensation-incentives',
//         title: 'Compensation & Incentives',
//         icon: '',
//         href: '/'
//       },
//     ]
//   },
//   {
//     kind:'header',
//     title:'Reports & Analytics'
//   },
//   {
//     segment:'hrms/employee-reports',
//     title:'Employee Reports',
//     icon:'',
//     href:''
//   },
//   {
//     segment:'hrms/leave-reports',
//     title:'Leave Reports',
//     icon:'',
//     href:''
//   },
//   {
//     segment:'hrms/payroll-reports',
//     title:'Payroll Reports',
//     icon:'',
//     href:''
//   },
//   {
//     kind:'header',
//     title:'Compliance & Documentation'
//   },
//   {
//     segment:'hrms/employee-contracts',
//     title:'Employee Contracts',
//     icon:'',
//     href:''
//   },
//   {
//     segment:'hrms/employee-documents',
//     title:'Employee Documents',
//     icon:'',
//     href:''
//   },
//   {
//     segment:'hrms/policies-procedures',
//     title:'Policies & Procedures',
//     icon:'',
//     href:''
//   },
//   {
//     kind:'header',
//     title:'Settings'
//   },
//   {
//     segment:'hrms/settings',
//     title:'Settings',
//     icon:'',
//     href:''
//   }
// ];

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Overview',
  },
  {
    segment: 'hrms',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    href: '/hrms',
  },
  {
    kind: 'header',
    title: 'Employee Management',
  },
  {
    segment: 'hrms/employees/list',
    title: 'Employee List',
    icon: <PeopleIcon />,
    href: '/',
  },
  {
    segment: 'hrms',
    title: 'Attendance & Leave',
    icon: <AccessTimeIcon />,
    children: [
      {
        segment: 'attendance-logs',
        title: 'Attendance Logs',
        icon: <EventIcon />,
        href: '/hrms/attendance-logs',
      },
      {
        segment: 'logout-requests',
        title: 'Logout Requests',
        icon: <EventIcon />,
        href: '/hrms/logout-requests',
      },
      {
        segment: 'leave-requests',
        title: 'Leave Requests',
        icon: <EventIcon />,
        href: '/hrms/leave-requests',
      },
      {
        segment: 'leave-policies',
        title: 'Leave Policies',
        icon: <PolicyIcon />,
        href: '/hrms/leave-policies',
      },
    ],
  },
  {
    segment: 'hrms',
    title: 'Payroll & Benefits',
    icon: <AttachMoneyIcon />,
    children: [
      {
        segment: 'salary-disbursements',
        title: 'Salary Disbursements',
        icon: <ReceiptIcon />,
        href: '/hrms/salary-disbursements',
      },
      {
        segment: 'payroll-history',
        title: 'Payroll History',
        icon: <ReceiptIcon />,
        href: '/hrms/payroll-history',
      },
      {
        segment: 'tax-benefits',
        title: 'Tax & Benefits',
        icon: <AssignmentIcon />,
        href: '/hrms/tax-benefits',
      },
      {
        segment: 'compensation-incentives',
        title: 'Compensation & Incentives',
        icon: <AttachMoneyIcon />,
        href: '/hrms/compensation-incentives',
      },
    ],
  },
  {
    kind: 'header',
    title: 'Reports & Analytics',
  },
  {
    segment: 'hrms/employee-reports',
    title: 'Employee Reports',
    icon: <SummarizeIcon />,
    href: '/hrms/employee-reports',
  },
  // {
  //   segment: 'hrms/leave-reports',
  //   title: 'Leave Reports',
  //   icon: <SummarizeIcon />,
  //   href: '/hrms/leave-reports',
  // },
  // {
  //   segment: 'hrms/payroll-reports',
  //   title: 'Payroll Reports',
  //   icon: <SummarizeIcon />,
  //   href: '/hrms/payroll-reports',
  // },
  // {
  //   kind: 'header',
  //   title: 'Compliance & Documentation',
  // },
  // {
  //   segment: 'hrms/employee-contracts',
  //   title: 'Employee Contracts',
  //   icon: <DocumentScannerIcon />,
  //   href: '/hrms/employee-contracts',
  // },
  // {
  //   segment: 'hrms/employee-documents',
  //   title: 'Employee Documents',
  //   icon: <FolderIcon />,
  //   href: '/hrms/employee-documents',
  // },
  // {
  //   segment: 'hrms/policies-procedures',
  //   title: 'Policies & Procedures',
  //   icon: <PolicyIcon />,
  //   href: '/hrms/policies-procedures',
  // },
  {
    kind: 'header',
    title: 'Holidays',
  },
  {
    segment: 'hrms/holidays',
    title: 'Manage Holidays',
    icon: <BeachAccessIcon />,
    // href: '/',
  },
  {
    kind: 'header',
    title: 'Complaints & Queries',
  },
  {
    segment: 'hrms/complaints-queries',
    title: 'Complaints & Queries',
    icon: <LocalOfferIcon />,
    // href: '/',
  },
  {
    kind: 'header',
    title: 'Manage Profile',
  },
  {
    segment: 'profile',
    title: 'My Profile',
    icon: <PersonIcon />,
    children: [
      {
        segment: 'overview',
        title: 'Overview',
        icon: <AccountCircleIcon />,
        // href: '/profile-overview',
      },
      {
        segment: 'personal-information',
        title: 'Personal Information',
        icon: <ReceiptIcon />,
        // href: '/profile-personal-info',
      },
      {
        segment: 'change-password',
        title: 'Change Password',
        icon: <LockIcon />,
        // href: '/profile-change-password',
      },
      {
        segment: 'account-activity',
        title: 'Account Activity',
        icon: <HistoryIcon />,
        // href: '/profile-account-activity',
      },
      {
        segment: 'attendance-tracking',
        title: 'Attendance Tracking',
        icon: <QueryBuilderIcon />,
        // href: '/profile-attendance-tracking',
      }
    ],
  },
  {
    segment: 'support-requests',
    title: 'Support & Requests',
    icon: <EmailIcon />,
    children: [
      {
        segment: 'leaves',
        title: 'Leaves',
        icon: <LeaveIcon />,
        // href: '/support/request-leave',
      },
      {
        segment: 'complaints-queries',
        title: 'Complaints & Queries',
        icon: <LocalOfferIcon />,
        // href: '',
        // children: [
        //   {
        //     segment: 'raise-complaint',
        //     title: 'Raise a Complaint',
        //     icon: <EmailIcon />,
        //     // href: '/support/raise-complaint',
        //   },
        //   {
        //     segment: 'view-status',
        //     title: 'View Status',
        //     icon: <HistoryIcon />,
        //     // href: '/support/view-status',
        //   }
        // ],
      },
    ],
  },
  {
    segment: 'performance-tracking',
    title: 'Performance Tracking',
    icon: <GpsFixedIcon />,
    // href: '/hrms/settings',
    children: [
      {
        segment: 'my/performance',
        title: 'My Performance',
        icon: <QueryStatsIcon />,

      },
      {
        segment: 'reveiw/performance',
        title: 'Add Ratings',
        icon: <StarOutlineIcon />,

      },
    ]
  },
  {
    kind: 'header',
    title: 'Settings',
  },
  {
    segment: 'hrms/settings',
    title: 'Settings',
    icon: <SettingsIcon />,
    // href: '/hrms/settings',
  },
];

const HRMSDashboard = () => {

  return (
    <div>
      <DashboardLayoutBasic
        navigation={NAVIGATION}
        routes={<HRMSRoutes />}
      />
    </div>
  )
}

export default HRMSDashboard;
