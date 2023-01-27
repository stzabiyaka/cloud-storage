import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/userState/userStateSlice';

const PublicRoutes = ({ redirectTo = '/', restricted = false }) => {
  const isAuth = useSelector(selectIsAuth);
  const shouldRedirect = isAuth && restricted;
  return shouldRedirect ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default PublicRoutes;
