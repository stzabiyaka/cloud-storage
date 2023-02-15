import { useDispatch, useSelector } from 'react-redux';
import { selectSort, setSort } from '../../redux/filesState/filesStateSlice';
import icons from '../../assets/icons/icons.svg';
import './SortSelect.scss';

const SortSelect = () => {
  const { param, direction } = useSelector(selectSort);
  const dispatch = useDispatch();

  const handleParamChange = event => {
    dispatch(setSort({ param: event.target.value }));
  };
  const toggleDirection = () => {
    dispatch(setSort({ direction: direction * -1 }));
  };

  return (
    <div className="sort__selector-label">
      <p className="sort__selector-title">Sort by:&nbsp;</p>
      <select
        name="sort-parameter"
        id="sort-parameter"
        value={param}
        className="sort__selector"
        onChange={handleParamChange}
        title="Select sort parameter"
      >
        <option value="name" className="sort__selector-option" title="Sort by file name">
          name
        </option>
        <option value="type" className="sort__selector-option" title="Sort by file type">
          type
        </option>
        <option value="date" className="sort__selector-option" title="Sort by file creation date">
          date
        </option>
      </select>
      <button
        className="sort__button"
        type="button"
        title="Toggle sort direction"
        onClick={toggleDirection}
      >
        <svg className="sort__button-icon" aria-label="Toggle sort direction icon">
          <use href={`${icons}#icon-sort-${direction === 1 ? 'descending' : 'ascending'}`} />
        </svg>
      </button>
    </div>
  );
};

export default SortSelect;
