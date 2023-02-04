import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectCurrentDir,
  selectDirectoriesStack,
  setCurrentDir,
  setDirStack,
} from '../../redux/filesState/filesStateSlice';
import { fetchFiles } from '../../redux/operations';
import Button from '../Button/Button';
import FilesList from '../FilesList';
import Modal from '../Modal/Modal';
import CreateDirPopUp from '../CreateDirPopUp';
import UploadFilePopUp from '../UploadFilePopUp';
import Uploader from '../Uploader/Uploader';

import './Disk.scss';

const Disk = () => {
  const [showModal, setShowModal] = useState(null);

  const dispatch = useDispatch();
  const currentDir = useSelector(selectCurrentDir);
  const dirStack = [...useSelector(selectDirectoriesStack)];

  useEffect(() => {
    dispatch(fetchFiles({ dirId: currentDir }));
  }, [currentDir, dispatch]);

  const handleClickBackBtn = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
    dispatch(setDirStack(dirStack));
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
      </ul>
      <FilesList />
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
