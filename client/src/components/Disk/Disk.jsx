import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectCurrentDir,
  selectDirectoriesStack,
  selectIsFileLoading,
  setCurrentDir,
  setDirStack,
} from '../../redux/filesState/filesStateSlice';
import { selectCurrentUserFreeSpace } from '../../redux/userState/userStateSlice';
import { fetchFiles } from '../../redux/operations';
import { sizeFormatter } from '../../helpers/functions';
import Button from '../Button/Button';
import FilesList from '../FilesList';
import Modal from '../Modal/Modal';
import CreateDirPopUp from '../CreateDirPopUp';
import UploadFilePopUp from '../UploadFilePopUp';
import Uploader from '../Uploader/Uploader';
import Loader from '../Loader/Loader';
import icons from '../../assets/icons/icons.svg';

import './Disk.scss';

const Disk = () => {
  const [showModal, setShowModal] = useState(null);
  const [sortParam, setSortParam] = useState('name');
  const [sortDirection, setSortDirection] = useState(1);

  const dispatch = useDispatch();
  const diskFreeSpace = useSelector(selectCurrentUserFreeSpace);
  const isLoading = useSelector(selectIsFileLoading);
  const currentDir = useSelector(selectCurrentDir);
  const dirStack = [...useSelector(selectDirectoriesStack)];

  useEffect(() => {
    dispatch(fetchFiles({ parent: currentDir, sort: sortParam, sortDirection }));
  }, [currentDir, dispatch, sortParam, sortDirection]);

  const handleClickBackBtn = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId.parentId));
    dispatch(setDirStack(dirStack));
  };

  const handleClickPath = ({ dirId }) => {
    if (dirId === currentDir) {
      return;
    }
    const indx = dirStack.findIndex(({ id }) => id === dirId) + 1;
    dispatch(setDirStack(dirStack.slice(0, indx)));
    dispatch(setCurrentDir(dirId));
  };

  return (
    <div className="disk">
      <ul className="disk__controls">
        {currentDir && (
          <li className="disk__controls-item">
            <Button title="Go back" icon="arrow-left" type="button" onClick={handleClickBackBtn} />
          </li>
        )}
        <li className="disk__controls-item">
          <Button
            title="Create folder"
            label="Create folder"
            type="button"
            onClick={() => {
              setShowModal('dir');
            }}
          />
        </li>
        <li className="disk__controls-item">
          <Button
            title="Upload files"
            label="Upload files"
            type="button"
            onClick={() => {
              setShowModal('file');
            }}
          />
        </li>
        <li className="disk__controls-item">
          <label className="sort__selector-label">
            Sort by:&nbsp;
            <select
              name="sort-parameter"
              id="sort-parameter"
              value={sortParam}
              className="sort__selector"
              onChange={event => setSortParam(event.target.value)}
              title="Select sort parameter"
            >
              <option value="name" className="sort__selector-option" title="Sort by file name">
                name
              </option>
              <option value="type" className="sort__selector-option" title="Sort by file type">
                type
              </option>
              <option
                value="date"
                className="sort__selector-option"
                title="Sort by file creation date"
              >
                date
              </option>
            </select>
            <select
              name="sort-direction"
              id="sort-direction"
              value={sortDirection}
              className="sort__selector"
              onChange={event => setSortDirection(event.target.value)}
              title="Select sort direction"
            >
              <option value="1" className="sort__selector-option" title="Ascending">
                &#x2C4;
              </option>
              <option value="-1" className="sort__selector-option" title="Descending">
                &#x2C5;
              </option>
            </select>
          </label>
        </li>
      </ul>
      <div className="disk__dashboard">
        <div className="disk__dashboard-space">Disk free space: {sizeFormatter(diskFreeSpace)}</div>
      </div>
      <ul className="disk__path">
        <li
          className="disk__path-folder"
          key="root-folder"
          onClick={() => handleClickPath({ dirId: null })}
        >
          <svg className="disk__path-icon">
            <use href={`${icons}#icon-storage`} />
          </svg>
        </li>
        {dirStack.map(({ name, id }) => (
          <li
            className="disk__path-folder"
            key={id}
            onClick={() => handleClickPath({ dirId: id })}
          >{` / ${name}`}</li>
        ))}
      </ul>
      {isLoading && <Loader />}
      {!isLoading && <FilesList />}
      <Uploader />
      {showModal && (
        <Modal
          title={showModal === 'dir' ? 'Create new folder' : 'Choose files to uplod'}
          onClose={() => {
            setShowModal(null);
          }}
        >
          {showModal === 'dir' ? <CreateDirPopUp /> : <UploadFilePopUp />}
        </Modal>
      )}
    </div>
  );
};

export default Disk;
