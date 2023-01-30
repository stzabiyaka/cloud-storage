import icons from '../../assets/icons/icons.svg';
import './Button.scss';

const Button = ({
  type = 'button',
  label,
  title,
  icon,
  onClick,
  disabled = false,
  mb = 0,
  mt = 0,
}) => {
  return (
    <button
      className="button"
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      style={{ marginBottom: mb, marginTop: mt }}
    >
      {label}
      {icon && (
        <svg className="button__icon">
          <use href={`${icons}#icon-${icon}`} />
        </svg>
      )}
    </button>
  );
};

export default Button;
