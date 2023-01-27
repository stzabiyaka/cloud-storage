import { useEffect, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import icons from '../../assets/icons/icons.svg';

import './Modal.scss';

const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code !== 'Escape') {
        return;
      }
      onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget !== event.target) {
      return;
    }
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <div className="backdrop" onClick={handleBackdropClick}>
      <div className="modal__container">
        <button className="modal__button" type="button" title="Close" onClick={handleClose}>
          <svg className="modal__button-icon">
            <use href={`${icons}#icon-close`} />
          </svg>
        </button>
        <h2 className="modal__title">{title}</h2>
        {cloneElement(children, { onSuccess: onClose })}
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default Modal;
