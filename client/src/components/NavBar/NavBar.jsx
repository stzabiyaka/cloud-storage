import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unsetUser, selectIsAuth } from '../../redux/userState/userStateSlice';
import Button from '../Button/Button';
import './NavBar.scss';
import icons from '../../assets/icons/icons.svg';

const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

const NavBar = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(unsetUser());
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <header className="navbar">
      <div className="container">
        <nav className="nav">
          <NavLink to="/" className="logo__link">
            <svg aria-label="Logo" className="navbar__logo">
              <use href={`${icons}#icon-storage`} />
            </svg>
            <p className="navbar__title">Cloud File Storage</p>
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
              <li className="navlinks__list-item">
                <Button type="button" title="Sign Out" label="Sign Out" onClick={handleSignOut} />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
