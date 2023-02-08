import { useSelector } from 'react-redux';
import { selectView } from '../../redux/filesState/filesStateSlice';
import { useSortedFiles } from '../../hooks';
import File from '../File';

import './FilesList.scss';

const FilesList = () => {
  const files = useSortedFiles();
  const view = useSelector(selectView);

  if (!files.length) {
    return <p className="notification">It looks like there are no files here, yet.</p>;
  }

  return (
    <ul className={`files__list files__list--${view}`}>
      {view === 'list' && (
        <File key={'tableHeader'} name="Name" type="Type" size="Size" date="Date" header />
      )}
      {files.map(({ _id, name, type, size, createdAt }) => (
        <File key={_id} id={_id} name={name} type={type} size={size} date={createdAt} />
      ))}
    </ul>
  );
};

export default FilesList;
