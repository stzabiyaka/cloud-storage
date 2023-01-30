import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// import { addFile } from '../../redux/operations';
import { selectCurrentDir } from '../../redux/filesState/filesStateSlice';

import FormInput from '../FormInput';
import Button from '../Button/Button';
import './UploadFilePopUp.scss';

const UploadFilePopUp = ({ onSuccess }) => {
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const currentDir = useSelector(selectCurrentDir);

  const handleUploadFile = event => {
    // if (!dirName.trim()) {
    //   return alert('Folder Name can not be empty.');
    // }
    // dispatch(addFile({ dirId: currentDir, name: dirName, type: 'dir' }));
    console.log(file);
    onSuccess();
  };

  return (
    <>
      <FormInput
        name="file_upload"
        type="file"
        title="Choose File"
        label={file}
        setValue={value => setFile(value)}
      />
      {file && (
        <Button type="submit" label="Upload File" title="Upload File" onClick={handleUploadFile} />
      )}
    </>
  );
};

export default UploadFilePopUp;
