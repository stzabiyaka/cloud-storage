import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentDir,
  selectCurrentDir,
  pushDirToStack,
} from '../../redux/filesState/filesStateSlice';
import icons from '../../assets/icons/icons.svg';
import './File.scss';

const File = ({ id, name, date, size, type, header = false }) => {
  date = date ? date.slice(0, 10) : null;
  const dispatch = useDispatch();
  const currentDir = useSelector(selectCurrentDir);

  const handleClick = () => {
    if (type === 'dir') {
      dispatch(pushDirToStack(currentDir));
      dispatch(setCurrentDir(id));
    }
  };

  return (
    <li className={header ? 'file header' : 'file'} onClick={handleClick}>
      <div className="file__icon">
        {!header && (
          <svg className="file__icon-picture">
            <use href={`${icons}#icon-${type === 'dir' ? 'folder' : 'file'}`} />
          </svg>
        )}
      </div>
      <div className="file__name">
        <p className="file__info">{name}</p>
      </div>
      <div className="file__date">
        <p className="file__info">{date}</p>
      </div>
      <div className="file__size">
        <p className="file__info">{size}</p>
      </div>
    </li>
  );
};

export default File;
