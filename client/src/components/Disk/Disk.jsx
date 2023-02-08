import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectCurrentDir,
  selectDirectoriesStack,
  selectIsFileLoading,
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
import Uploader from '../Uploader';
import Breadcrumbs from '../Breadcrumbs';
import SortSelect from '../SortSelect/SortSelect';
import Loader from '../Loader/Loader';

import './Disk.scss';

const Disk = () => {
  const [showModal, setShowModal] = useState(null);

  const dispatch = useDispatch();
  const diskFreeSpace = useSelector(selectCurrentUserFreeSpace);
  const isLoading = useSelector(selectIsFileLoading);
  const currentDir = useSelector(selectCurrentDir);
  const dirStack = [...useSelector(selectDirectoriesStack)];
  const sort = useSelector(selectSort);
  const view = useSelector(selectView);

  useEffect(() => {
    dispatch(fetchFiles({ parent: currentDir, sort }));
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
        <div className="disk__dashboard-space">Disk free space: {sizeFormatter(diskFreeSpace)}</div>
      </div>
      <Breadcrumbs />
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
