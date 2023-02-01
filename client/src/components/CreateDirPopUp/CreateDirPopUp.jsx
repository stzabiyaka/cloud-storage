import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addFile } from '../../redux/operations';
import { selectCurrentDir } from '../../redux/filesState/filesStateSlice';

import FormInput from '../FormInput';
import Button from '../Button/Button';
import './CreateDirPopUp.scss';

const CreateDirPopUp = ({ onSuccess }) => {
  const [dirName, setDirName] = useState('');

  const dispatch = useDispatch();
  const currentDir = useSelector(selectCurrentDir);

  const handleCreateDir = () => {
    if (!dirName.trim()) {
      return alert('Folder Name can not be empty.');
    }
    dispatch(addFile({ dirId: currentDir, name: dirName, type: 'dir' }));
    onSuccess();
  };

  return (
    <form onSubmit={handleCreateDir}>
      <FormInput name="folder name" value={dirName} setValue={setDirName} />
      <Button type="submit" label="Create Folder" title="Create Folder" mt="32px" />
    </form>
  );
};

export default CreateDirPopUp;
