import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addFile } from '../../redux/operations';
import {
  selectCurrentDir,
  pushUploadToStack,
  removeFromUploadsStack,
  changeUploadsProgress,
} from '../../redux/filesState/filesStateSlice';

import FormInput from '../FormInput';
import Button from '../Button/Button';
import './UploadFilePopUp.scss';

const UploadFilePopUp = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [isDragEnter, setIsDragEnter] = useState(false);

  const dispatch = useDispatch();
  const currentDir = useSelector(selectCurrentDir);

  const buttonLabel = `Upload File${files.length > 1 ? 's' : ''}`;
  const fileNames = files.map(({ name }) => name);

  const pushUpload = ({ id, name, progress }) => {
    dispatch(pushUploadToStack({ id, name, progress }));
  };

  const removeUpload = ({ id }) => {
    dispatch(removeFromUploadsStack({ id }));
  };

  const changeProgress = ({ id, progress }) => {
    dispatch(changeUploadsProgress({ id, progress }));
  };

  const handleUploadFile = event => {
    event.preventDefault();
    files.forEach(file => {
      dispatch(
        addFile({ dirId: currentDir, type: 'file', file, pushUpload, removeUpload, changeProgress })
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
