import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentDir,
  selectView,
  setCurrentDir,
  pushDirToStack,
} from '../../redux/filesState/filesStateSlice';
import { decreaseUserUsedSpace } from '../../redux/userState/userStateSlice';
import { deleteFile } from '../../redux/operations';
import { filesAPI } from '../../services/apiService';
import { sizeFormatter } from '../../helpers/functions';
import Button from '../Button/Button';
import ConfirmedButton from '../ConfirmedButton';
import icons from '../../assets/icons/icons.svg';
import './File.scss';

const File = ({ id, name, date, size, type, header = false }) => {
  date = date ? date.slice(0, 10) : null;
  const dispatch = useDispatch();
  const currentDir = useSelector(selectCurrentDir);
  const view = useSelector(selectView);

  const isDownloadable = !header && type !== 'dir';

  const normalizedName = view === 'tile' && name.length > 20 ? `${name.slice(0, 17)}...` : name;

  const handleFileClick = () => {
    if (type !== 'dir') {
      return;
    }
    dispatch(pushDirToStack({ parentId: currentDir, name, id }));
    dispatch(setCurrentDir(id));
  };

  const handleDownload = event => {
    event.stopPropagation();
    filesAPI.downloadFile({ id, name });
  };

  const decreaseUsedSpace = () => {
    dispatch(decreaseUserUsedSpace(size));
  };

  const handleDelete = () => {
    dispatch(deleteFile({ id, decreaseUsedSpace }));
  };

  return (
    <li
      className={`file file--${view}${header ? ' file--header' : ''}${
        type === 'dir' ? ' file--folder' : ''
      }`}
      onClick={handleFileClick}
      title={type === 'dir' ? `Click to open folder ${name}` : name}
    >
      <div className={`file__icon file__icon--${view}`}>
        {!header && (
          <svg className={`file__icon-picture file__icon-picture--${view}`}>
            <use href={`${icons}#icon-${type === 'dir' ? 'folder' : 'file'}`} />
          </svg>
        )}
      </div>
      <div className={`file__name file__name--${view}`}>
        <p className="file__info">{normalizedName}</p>
      </div>
      {view === 'tile' && (
        <ul className="file__buttons-container">
          {isDownloadable && (
            <li className="file__download file__download--tile">
              <Button
                type="button"
                label="Download"
                title="Download file"
                onClick={handleDownload}
              />
            </li>
          )}
          <li className="file__delete file__delete--tile">
            <ConfirmedButton
              icon="delete"
              title={`Delete ${type === 'dir' ? 'folder' : 'file'}`}
              onClick={handleDelete}
            />
          </li>
        </ul>
      )}
      {view === 'list' && (
        <>
          <div className="file__date">
            <p className="file__info">{date}</p>
          </div>
          <div className="file__size">
            <p className="file__info">{typeof size === 'number' ? sizeFormatter(size) : size}</p>
          </div>
          {isDownloadable && (
            <div className="file__download file__download--list">
              <Button
                type="button"
                label="Download"
                title="Download file"
                onClick={handleDownload}
              />
            </div>
          )}
          {!header && (
            <div className="file__delete file__delete--list">
              <ConfirmedButton
                icon="delete"
                title={`Delete ${type === 'dir' ? 'folder' : 'file'}`}
                onClick={handleDelete}
              />
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default File;
