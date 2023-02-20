import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/userState/userStateSlice';
import { avatarURLResolver } from '../../helpers/functions';
import icons from '../../assets/icons/icons.svg';

import './UserAvatar.scss';

const UserAvatar = ({ avatarSize }) => {
  const { avatarURL } = useSelector(selectCurrentUser);

  return avatarURL ? (
    <img
      src={avatarURLResolver({ avatarURL })}
      alt="User avatar"
      className="avatar"
      style={avatarSize ? { width: avatarSize + 'px', height: avatarSize + 'px' } : {}}
    />
  ) : (
    <svg
      className="avatar"
      width={avatarSize ? avatarSize + 'px' : ''}
      height={avatarSize ? avatarSize + 'px' : ''}
      aria-label="User avatar icon"
    >
      <use href={`${icons}#icon-avatar`} />
    </svg>
  );
};

export default UserAvatar;
