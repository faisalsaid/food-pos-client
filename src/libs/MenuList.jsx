import { BiSolidDashboard, BiSolidFoodMenu } from 'react-icons/bi';
import { IoFastFood } from 'react-icons/io5';
import { FaUserAlt } from 'react-icons/fa';
import { HiCash } from 'react-icons/hi';
import { BsBarChartFill } from 'react-icons/bs';
import { AiTwotoneSetting } from 'react-icons/ai';

export const SIDEBAR_MENU_LIST = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <BiSolidDashboard />,
  },
  {
    key: 'order',
    label: 'Order',
    path: '/order',
    icon: <IoFastFood />,
  },
  {
    key: 'purchase',
    label: 'Purchase List',
    path: '/purchase',
    icon: <HiCash />,
  },
  {
    key: 'menu',
    label: 'Menu',
    path: '/menu',
    icon: <BiSolidFoodMenu />,
  },
  {
    key: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: <FaUserAlt />,
  },
  {
    key: 'chart',
    label: 'Chart',
    path: '/chart',
    icon: <BsBarChartFill />,
  },
];

export const SIDEBAR_OPTIONS_LIST = [
  {
    key: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <AiTwotoneSetting />,
  },
];
