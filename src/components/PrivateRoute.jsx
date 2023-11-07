import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute({ component: Component, authenticated, ...rest }) {
  if (!authenticated) {
    return <Navigate to={'/home'} />;
  }
  return <Outlet />;
}
