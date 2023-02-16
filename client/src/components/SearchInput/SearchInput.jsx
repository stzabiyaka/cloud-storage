import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentDir } from '../../redux/filesState';
import { searchFiles, fetchFiles } from '../../redux/operations';

import './SearchInput.scss';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeOut, setSearchTimeOut] = useState(false);
  const currentDir = useSelector(selectCurrentDir);

  const dispatch = useDispatch();

  const handleSearchQueryChange = event => {
    const query = event.target.value;
    setSearchQuery(query);

    if (searchTimeOut !== false) {
      clearTimeout(searchTimeOut);
    }

    if (query) {
      setSearchTimeOut(
        setTimeout(() => {
          dispatch(searchFiles({ search: query }));
        }, 500)
      );
    } else {
      dispatch(fetchFiles({ parent: currentDir }));
    }
  };

  return (
    <input
      className="search__input"
      type="text"
      value={searchQuery}
      onChange={handleSearchQueryChange}
      placeholder="Search file..."
    />
  );
};

export default SearchInput;
