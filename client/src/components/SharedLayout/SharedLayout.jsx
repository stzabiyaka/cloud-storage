import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

const SharedLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default SharedLayout;
