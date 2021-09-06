import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  // Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  // User as UserIcon,
  Users as UsersIcon,
  Code as CodeIcon,
  CheckCircle as CheckIcon,
  Book as BookIcon
} from 'react-feather';

const items = [
  // {
  //   href: '/app/dashboard',
  //   icon: BarChartIcon,
  //   title: 'Dashboard'
  // },
  {
    href: '/app/members',
    icon: UsersIcon,
    title: 'Members'
  },
  {
    href: '/app/event-now',
    icon: ShoppingBagIcon,
    title: 'Current Events'
  },
  {
    href: '/app/event-past',
    icon: BarChartIcon,
    title: 'Archived Events'
  },
  // {
  //   href: '/app/check-in',
  //   icon: CheckIcon,
  //   title: 'Check-in'
  // },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  {
    href: '/app/developers',
    icon: CodeIcon,
    title: 'Developers'
  },
  {
    href: '/app/log',
    icon: BookIcon,
    title: 'Log'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }
];

export default items;
