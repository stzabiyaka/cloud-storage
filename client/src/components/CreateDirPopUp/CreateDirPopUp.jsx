import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createDir } from '../../redux/operations';

import FormInput from '../FormInput';
import Button from '../Button/Button';

const CreateDirPopUp = ({ onSuccess }) => {
  const [dirName, setDirName] = useState('');

  const dispatch = useDispatch();

  const handleCreateDir = () => {
    if (!dirName.trim()) {
      return alert('Folder Name can not be empty.');
    }
    dispatch(createDir({ name: dirName, type: 'dir' }));
    onSuccess();
  };

  return (
    <>
      <FormInput name="folder name" value={dirName} setValue={setDirName} />
      <Button
        type="submit"
        label="Create Folder"
        title="Create Folder"
        mt="32px"
        onClick={handleCreateDir}
      />
    </>
  );
};

export default CreateDirPopUp;
