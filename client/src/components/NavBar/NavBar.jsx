import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/userState';
import SearchInput from '../SearchInput';
import UserMenu from '../UserMenu';
import icons from '../../assets/icons/icons.svg';

import './NavBar.scss';

const NavBar = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <header className="navbar">
      <div className="container container--navbar">
        <div className="navbar__content">
          <nav className="nav">
            <NavLink to="/" className="logo__link" title="Home">
              <svg aria-label="Logo" className="logo">
                <use href={`${icons}#icon-storage`} />
              </svg>
              <p className="logo__title">ClouDisk</p>
            </NavLink>
            <ul className="navlinks__list">
              {!isAuth && (
                <li className="navlinks__list-item">
                  <NavLink to="/signin" className="navlink" title="Please, log in">
                    Sign In
                  </NavLink>
                </li>
              )}
              {!isAuth && (
                <li className="navlinks__list-item">
                  <NavLink to="/signup" className="navlink" title="Please, register">
                    Sign Up
                  </NavLink>
                </li>
              )}
              {isAuth && (
                <>
                  <li className="navlinks__list-item">
                    <NavLink to="/files" className="navlink" title="Go to your disk">
                      Disk
                    </NavLink>
                  </li>
                  <li className="navlinks__list-item">
                    <SearchInput />
                  </li>
                </>
              )}
            </ul>
          </nav>
          {isAuth && <UserMenu />}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
