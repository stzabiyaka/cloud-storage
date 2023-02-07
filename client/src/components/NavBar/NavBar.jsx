import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unsetUser, selectIsAuth } from '../../redux/userState/userStateSlice';
import { selectCurrentDir } from '../../redux/filesState/filesStateSlice';
import { searchFiles, fetchFiles } from '../../redux/operations';
import { unsetFiles } from '../../redux/filesState/filesStateSlice';
import Button from '../Button/Button';
import './NavBar.scss';
import icons from '../../assets/icons/icons.svg';

const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeOut, setSearchTimeOut] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const currentDir = useSelector(selectCurrentDir);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(unsetUser());
    dispatch(unsetFiles());
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const handleSearchQueryChange = event => {
    const query = event.target.value;
    setSearchQuery(query);

    if (searchTimeOut !== false) {
      clearTimeout(searchTimeOut);
    }

    if (query) {
      setSearchTimeOut(
        setTimeout(() => {
          dispatch(searchFiles({ search: query }));
        }, 500)
      );
    } else {
      dispatch(fetchFiles({ parent: currentDir }));
    }
  };

  return (
    <header className="navbar">
      <div className="container container--navbar">
        <nav className="nav">
          <NavLink to="/" className="logo__link">
            <svg aria-label="Logo" className="navbar__logo">
              <use href={`${icons}#icon-storage`} />
            </svg>
            <p className="navbar__title">ClouDisk</p>
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
                <NavLink to="/files" className="navlink" title="Go to your disk">
                  Disk
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li className="navlinks__list-item">
                <input
                  className="search__input"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="Search file..."
                />
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
