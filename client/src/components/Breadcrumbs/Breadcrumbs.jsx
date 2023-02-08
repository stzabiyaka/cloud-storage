import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentDir,
  selectDirectoriesStack,
  setCurrentDir,
  setDirStack,
} from '../../redux/filesState/filesStateSlice';
import icons from '../../assets/icons/icons.svg';

import './Breadcrumbs.scss';

const Breadcrumbs = () => {
  const dispatch = useDispatch();
  const dirStack = useSelector(selectDirectoriesStack);
  const currentDir = useSelector(selectCurrentDir);

  const handleClickBreadcrumb = ({ dirId }) => {
    if (dirId === currentDir) {
      return;
    }
    const indx = dirStack.findIndex(({ id }) => id === dirId) + 1;
    dispatch(setDirStack(dirStack.slice(0, indx)));
    dispatch(setCurrentDir(dirId));
  };
  return (
    <ul className="breadcrumbs">
      <li
        className="breadcrumbs__item"
        key="root-folder"
        onClick={() => handleClickBreadcrumb({ dirId: null })}
        title="Go to root folder"
      >
        <svg className="breadcrumbs__icon breadcrumbs__icon--root" aria-label="Disk icon">
          <use href={`${icons}#icon-storage`} />
        </svg>
      </li>
      {dirStack.map(({ name, id }) => (
        <li
          className="breadcrumbs__item"
          key={id}
          onClick={() => handleClickBreadcrumb({ dirId: id })}
        >
          <svg className="breadcrumbs__icon" aria-label="Nesting icon">
            <use href={`${icons}#icon-arrow-right`} />
          </svg>
          {name}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
