import { useSortedFiles } from '../../hooks';
import File from '../File';

import './FilesList.scss';

const FilesList = () => {
  const files = useSortedFiles();

  if (!files.length) {
    return <p className="notification">It looks like there are no files here, yet.</p>;
  }

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
