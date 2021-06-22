import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  Code as CodeIcon
} from 'react-feather';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Web Developer',
  name: 'Melo Guan'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Events'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/app/developers',
    icon: CodeIcon,
    title: 'Developers'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }
];

export {
  items,
  user
};
