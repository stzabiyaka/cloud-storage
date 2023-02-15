import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefresh } from '../../redux/userState';
import { getCurrentUser } from '../../redux/operations';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PublicRoutes from '../PublicRoutes';
import PrivateRoutes from '../PrivateRoutes';
import './App.scss';
import SharedLayout from '../SharedLayout/SharedLayout';
import Loader from '../Loader/Loader';
import HomeView from '../../views/HomeView/HomeView';
import SignView from '../../views/SignView/SignView';
import DiskView from '../../views/DiskView/DiskView';
import Uploader from '../Uploader';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
  const isRefresh = useSelector(selectIsRefresh);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isRefresh) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isRefresh]);
  return (
    <div className="application">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/" element={<PublicRoutes redirectTo="/files" restricted />}>
            <Route path="signup" element={<SignView />} />
            <Route path="signin" element={<SignView />} />
          </Route>
          <Route path="/" element={<PrivateRoutes redirectTo="/signin" />}>
            <Route path="files" element={<DiskView />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Uploader />
      <Loader />
    </div>
  );
};

export default App;
