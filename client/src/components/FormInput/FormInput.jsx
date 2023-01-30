import icons from '../../assets/icons/icons.svg';
import './FormInput.scss';

const FormInput = ({ type = 'text', name, title, label, value, setValue }) => {
  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <div className="form__input">
      {type === 'file' && (
        <label htmlFor={name} className="form__input-label" title={title}>
          {label ? (
            label
          ) : (
            <svg className="form__input-icon">
              <use href={`${icons}#icon-plus`} />
            </svg>
          )}
        </label>
      )}
      <input
        className={type === 'file' ? 'visually-hidden' : 'form__input-field'}
        id={name}
        type={type}
        placeholder={name}
        name={name}
        value={value}
        title={title}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormInput;
