import icons from '../../assets/icons/icons.svg';
import './CloseButton.scss';

const CloseButton = ({ size = 'normal', onClose }) => {
  return (
    <button
      className={`close__button${size === 'small' ? ' close__button--small' : ''}`}
      type="button"
      title="Close"
      onClick={onClose}
    >
      <svg className={`close__button-icon${size === 'small' ? ' close__button-icon--small' : ''}`}>
        <use href={`${icons}#icon-close`} />
      </svg>
    </button>
  );
};

export default CloseButton;
