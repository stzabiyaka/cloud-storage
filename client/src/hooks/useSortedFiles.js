import { useSelector } from 'react-redux';
import { selectFiles } from '../redux/filesState/filesStateSlice';

const useSortedFiles = () => {
  const files = useSelector(selectFiles);

  const sortedFiles = [
    ...files.filter(({ type }) => type === 'dir'),
    ...files.filter(({ type }) => type !== 'dir'),
  ];

  return sortedFiles;
};

export default useSortedFiles;
