import { useSelector } from 'react-redux';
import { selectFiles } from '../../redux/filesState/filesStateSlice';
import File from '../File';

import './FilesList.scss';

const FilesList = () => {
  const files = useSelector(selectFiles);

  return (
    <ul className="files__list">
      <File key={'tableHeader'} name="Name" type="Type" size="Size" date="Date" header />
      {files.map(({ _id, name, type, size, createdAt }) => (
        <File key={_id} id={_id} name={name} type={type} size={size} date={createdAt} />
      ))}
    </ul>
  );
};

export default FilesList;
