import { Navigate, Route, Routes } from 'react-router-dom';
import PublicRoutes from '../PublicRoutes';
import PrivateRoutes from '../PrivateRoutes';
import './App.scss';
import SharedLayout from '../SharedLayout/SharedLayout';
import HomeView from '../../views/HomeView/HomeView';
import SignView from '../../views/SignView/SignView';
import DiskView from '../../views/DiskView/DiskView';

const App = () => {
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
    </div>
  );
};

export default App;
