import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, unsetUser } from '../../redux/userState/userStateSlice';
import { unsetFiles } from '../../redux/filesState/filesStateSlice';
import { deleteUserAvatar, updateUserAvatar } from '../../redux/operations';
import { sizeFormatter } from '../../helpers/functions';

import UserAvatar from '../UserAvatar';
import Button from '../Button';
import CloseButton from '../CloseButton';

import icons from '../../assets/icons/icons.svg';

import './UserMenu.scss';

const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

const UserMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { name, email, diskSpace, usedSpace } = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(unsetUser());
    dispatch(unsetFiles());
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const handleDeleteBtnClick = () => {
    dispatch(deleteUserAvatar());
  };

  const handleEditInputChange = event => {
    event.preventDefault();
    const file = [...event.target.files][0];
    dispatch(updateUserAvatar({ file }));
  };

  return (
    <div className="menu">
      <button
        className="menu__button"
        type="button"
        disabled={isVisible}
        onClick={() => {
          setIsVisible(true);
        }}
      >
        <UserAvatar />
      </button>
      {isVisible && (
        <div className="profile">
          <CloseButton
            onClose={() => {
              setIsVisible(false);
            }}
          />
          <p className="profile__welcome">
            Welcome, <span className="profile__welcome-name">{name}</span>!
          </p>
          <ul className="profile__list">
            <li className="profile__list-item">
              <div className="profile__avatar">
                <UserAvatar avatarSize={150} />
                <ul className="profile__avatar-controls">
                  <li className="profile__avatar-controls-item">
                    <label
                      className="profile__avatar-control profile__avatar-control--edit"
                      type="button"
                      title="Update avatar"
                    >
                      <svg className="profile__avatar-control-icon" aria-label="Edit avatar">
                        <use href={`${icons}#icon-edit`} />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        className="profile__avatar-control-input"
                        onChange={event => handleEditInputChange(event)}
                      />
                    </label>
                  </li>
                  <li className="profile__avatar-controls-item">
                    <button
                      className="profile__avatar-control profile__avatar-control--delete"
                      type="button"
                      title="Delete avatar"
                      onClick={handleDeleteBtnClick}
                    >
                      <svg className="profile__avatar-control-icon" aria-label="Delete avatar">
                        <use href={`${icons}#icon-delete`} />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li className="profile__list-item">
              <p className="profile__info-title">Email:</p>
              <p className="profile__info-value">{email}</p>
            </li>
            <li className="profile__list-item">
              <p className="profile__info-title">Disk space:</p>
              <p className="profile__info-value">{sizeFormatter(diskSpace)}</p>
            </li>
            <li className="profile__list-item">
              <p className="profile__info-title">Disk free space:</p>
              <p className="profile__info-value">{sizeFormatter(diskSpace - usedSpace)}</p>
            </li>
          </ul>
          <Button type="button" title="Sign Out" label="Sign Out" onClick={handleSignOut} />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
