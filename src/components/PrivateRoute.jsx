import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute({ component: Component, authenticated, ...rest }) {
  const { data: curentUser } = useSelector((state) => state.user.curentUser);
  console.log(curentUser);

  if (curentUser.length === 0) {
    return <Navigate to={'/signin'} />;
  }
  return <Outlet />;
}
