import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { selectIsFileLoading } from '../../redux/filesState/filesStateSlice';

import './Loader.scss';

const Loader = () => {
  const isFileLoading = useSelector(selectIsFileLoading);
  return (
    isFileLoading &&
    createPortal(
      <div className="backdrop backdrop--loader">
        <div className="lds">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>,
      document.querySelector('#modal-root')
    )
  );
};

export default Loader;
