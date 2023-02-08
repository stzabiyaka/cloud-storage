import { useDispatch, useSelector } from 'react-redux';
import { selectSort, setSort } from '../../redux/filesState/filesStateSlice';
import './SortSelect.scss';

const SortSelect = () => {
  const { param, direction } = useSelector(selectSort);
  const dispatch = useDispatch();

  const handleParamChange = event => {
    dispatch(setSort({ param: event.target.value }));
  };
  const handleDirectionChange = event => {
    dispatch(setSort({ direction: event.target.value }));
  };

  return (
    <label className="sort__selector-label">
      Sort by:&nbsp;
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
      <select
        name="sort-direction"
        id="sort-direction"
        value={direction}
        className="sort__selector"
        onChange={handleDirectionChange}
        title="Select sort direction"
      >
        <option value="1" className="sort__selector-option" title="Ascending">
          &#x2C4;
        </option>
        <option value="-1" className="sort__selector-option" title="Descending">
          &#x2C5;
        </option>
      </select>
    </label>
  );
};

export default SortSelect;
