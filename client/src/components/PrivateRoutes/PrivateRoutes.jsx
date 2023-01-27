import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/userState/userStateSlice';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ redirectTo = '/' }) => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoutes;
