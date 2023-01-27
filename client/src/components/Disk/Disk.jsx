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

import './Disk.scss';

const Disk = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const currentDir = useSelector(selectCurrentDir);
  const dirStack = [...useSelector(selectDirectoriesStack)];

  useEffect(() => {
    dispatch(fetchFiles({ dirId: currentDir }));
  }, [currentDir, dispatch]);

  const handleClickBackBtn = () => {
    const backDirId = dirStack.shift();
    dispatch(setCurrentDir(backDirId));
    dispatch(setDirStack(dirStack));
  };

  return (
    <div className="disk">
      <ul className="disk__controls">
        <li className="disk__controls-item">
          <Button title="Go back" icon="arrow-left" type="button" onClick={handleClickBackBtn} />
        </li>
        <li className="disk__controls-item">
          <Button
            title="Create folder"
            label="Create folder"
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </li>
      </ul>
      <FilesList />
      {showModal && (
        <Modal
          title={'Create new folder'}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <CreateDirPopUp />
        </Modal>
      )}
    </div>
  );
};

export default Disk;
