import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectCurrentDir,
  selectDirectoriesStack,
  selectSort,
  selectView,
  setCurrentDir,
  setDirStack,
  toggleView,
} from '../../redux/filesState/filesStateSlice';
import { selectCurrentUserFreeSpace } from '../../redux/userState/userStateSlice';
import { fetchFiles } from '../../redux/operations';
import { sizeFormatter } from '../../helpers/functions';
import Button from '../Button/Button';
import FilesList from '../FilesList';
import Modal from '../Modal/Modal';
import CreateDirPopUp from '../CreateDirPopUp';
import UploadFilePopUp from '../UploadFilePopUp';
import Breadcrumbs from '../Breadcrumbs';
import SortSelect from '../SortSelect/SortSelect';
import icons from '../../assets/icons/icons.svg';

import './Disk.scss';

const Disk = () => {
  const [showModal, setShowModal] = useState(null);

  const dispatch = useDispatch();
  const diskFreeSpace = useSelector(selectCurrentUserFreeSpace);
  const currentDir = useSelector(selectCurrentDir);
  const dirStack = [...useSelector(selectDirectoriesStack)];
  const sort = useSelector(selectSort);
  const view = useSelector(selectView);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [currentDir, dispatch, sort]);

  const handleClickBackBtn = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId.parentId));
    dispatch(setDirStack(dirStack));
  };

  const handleClickViewBtn = () => {
    dispatch(toggleView());
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
            icon="folder-add"
            type="button"
            onClick={() => {
              setShowModal('dir');
            }}
          />
        </li>
        <li className="disk__controls-item">
          <Button
            title="Upload files"
            icon="upload"
            type="button"
            onClick={() => {
              setShowModal('file');
            }}
          />
        </li>
        <li className="disk__controls-item">
          <SortSelect />
        </li>
        <li className="disk__controls-item">
          <Button
            title={`View as ${view === 'list' ? 'tile' : 'list'}`}
            icon={view}
            type="button"
            onClick={handleClickViewBtn}
          />
        </li>
      </ul>
      <div className="disk__dashboard">
        <svg
          className="disk__space-indicator"
          aria-label="Disk free space indicator"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent ${diskFreeSpace.percent}%, #5ce1e680 ${diskFreeSpace.percent}%)`,
          }}
        >
          <use href={`${icons}#icon-storage-indicator`} />
        </svg>
        <div className="disk__dashboard-space">
          Disk free space: {sizeFormatter(diskFreeSpace.value)}
        </div>
      </div>
      <Breadcrumbs />
      <FilesList />
      {showModal && (
        <Modal
          title={showModal === 'dir' ? 'Create new folder' : 'Choose files to upload'}
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
