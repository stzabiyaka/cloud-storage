import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';

import './SharedLayout.scss';

const SharedLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
