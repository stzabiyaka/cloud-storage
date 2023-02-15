import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { uploadFile } from '../../redux/operations';
import {
  pushUploadToStack,
  removeFromUploadsStack,
  changeUploadsProgress,
} from '../../redux/filesState/filesStateSlice';
import {
  selectCurrentUserFreeSpace,
  increaseUserUsedSpace,
} from '../../redux/userState/userStateSlice';

import FormInput from '../FormInput';
import Button from '../Button/Button';
import './UploadFilePopUp.scss';
import { toast } from 'react-toastify';

const UploadFilePopUp = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [isDragEnter, setIsDragEnter] = useState(false);

  const dispatch = useDispatch();
  const diskFreeSpace = useSelector(selectCurrentUserFreeSpace);

  const buttonLabel = `Upload File${files.length > 1 ? 's' : ''}`;
  const fileNames = files.map(({ name }) => name);

  const handleUploadFile = event => {
    event.preventDefault();
    const uploadsSize = files.reduce((size, file) => size + file.size, 0);

    if (diskFreeSpace < uploadsSize) {
      return toast.warning('There is not enough space on the disk.');
    }

    files.forEach(file => {
      dispatch(
        uploadFile({
          file,
          pushUploadToStack,
          removeFromUploadsStack,
          changeUploadsProgress,
          increaseUserUsedSpace,
        })
      );
    });
    onSuccess();
  };

  const handleDragEnter = event => {
    event.preventDefault();
    setIsDragEnter(true);
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDragLeave = event => {
    event.preventDefault();
    setIsDragEnter(false);
  };

  const handleDrop = event => {
    event.preventDefault();
    setFiles([...event.dataTransfer.files]);
    setIsDragEnter(false);
  };

  return (
    <div
      className="upload"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!isDragEnter && (
        <form className="upload__form" onSubmit={handleUploadFile}>
          <FormInput
            name="files_upload"
            type="file"
            title="Choose File"
            multiple={true}
            fileNames={fileNames}
            setValue={value => setFiles(value)}
          />
          {files.length > 0 && (
            <Button type="submit" label={buttonLabel} title={buttonLabel} mt={'32px'} />
          )}
        </form>
      )}
      {isDragEnter && <div className="drop__area">Drag and drop your files here</div>}
    </div>
  );
};

export default UploadFilePopUp;
