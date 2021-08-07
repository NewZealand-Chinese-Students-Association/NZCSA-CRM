import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';

import MemberList from './pages/MemberList';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Settings from './pages/Settings';
import Register from './pages/Register';
import DeveloperView from './pages/Developers';
import PastEvent from './pages/PastEvent';
import Checkin from './pages/Checkin';
import Log from './pages/Log';
import Dashboard from './pages/Dashboard';

const isLoggedIn = localStorage.getItem('authToken');

const routes = [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      // { path: 'account', element: <Account /> },
      { path: 'members', element: <MemberList /> },
      // { path: 'dashboard', element: <Dashboard /> },
      { path: 'event-now', element: <ProductList /> },
      { path: 'event-past', element: <PastEvent /> },
      { path: 'check-in', element: <Checkin /> },
      { path: 'developers', element: <DeveloperView /> },
      { path: 'log', element: <Log /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/members" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/members" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
