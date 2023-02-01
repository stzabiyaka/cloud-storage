import ItemsList from '../LabelList';
import icons from '../../assets/icons/icons.svg';

import './FormInput.scss';

const types = { text: 'text', email: 'email', file: 'file', password: 'password' };
const autocompleteTypes = { ...types, text: 'on', file: 'off' };

const FormInput = ({
  type = types.text,
  name,
  title,
  fileNames = [],
  multiple = false,
  value,
  setValue,
}) => {
  const handleChange = event => {
    let result = event.target.value;
    if (type === 'file') {
      result = [...event.target.files];
    }
    setValue(result);
  };

  return (
    <div className="input">
      {type === 'file' && (
        <label htmlFor={name} className="input__label" title={title}>
          {fileNames.length > 0 ? (
            <ItemsList items={fileNames} />
          ) : (
            <>
              <svg className="input__label-icon">
                <use href={`${icons}#icon-plus`} />
              </svg>
              <p className="input__label-info">
                Click here to choose,
                <br /> or drag and drop files
              </p>
            </>
          )}
        </label>
      )}
      <input
        className={type === 'file' ? 'visually-hidden' : 'input__field'}
        id={name}
        type={types[type]}
        placeholder={name}
        name={name}
        value={value}
        title={title}
        multiple={multiple}
        onChange={handleChange}
        autoComplete={autocompleteTypes[type]}
      />
    </div>
  );
};

export default FormInput;
