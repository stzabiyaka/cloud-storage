import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentDir,
  selectCurrentDir,
  pushDirToStack,
} from '../../redux/filesState/filesStateSlice';
import { deleteFile } from '../../redux/operations';
import { filesAPI } from '../../services/apiService';
import Button from '../Button/Button';
import icons from '../../assets/icons/icons.svg';
import './File.scss';

const File = ({ id, name, date, size, type, header = false }) => {
  date = date ? date.slice(0, 10) : null;
  const dispatch = useDispatch();
  const currentDir = useSelector(selectCurrentDir);

  const isDownloadable = !header && type !== 'dir';

  const handleFileClick = () => {
    if (type !== 'dir') {
      return;
    }
    dispatch(pushDirToStack(currentDir));
    dispatch(setCurrentDir(id));
  };

  const handleDownload = event => {
    event.stopPropagation();
    filesAPI.downloadFile({ id, name });
  };

  const handleDelete = event => {
    event.stopPropagation();
    dispatch(deleteFile({ id }));
  };

  return (
    <li className={header ? 'file header' : 'file'} onClick={handleFileClick}>
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
      {isDownloadable && (
        <>
          {' '}
          <div className="file__download">
            <Button type="button" label="Download" title="Download file" onClick={handleDownload} />
          </div>
          <div className="file__delete">
            <Button type="button" label="Delete" title="Delete file" onClick={handleDelete} />
          </div>
        </>
      )}
    </li>
  );
};

export default File;
