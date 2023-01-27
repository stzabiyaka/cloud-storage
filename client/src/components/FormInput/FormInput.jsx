import './FormInput.scss';

const FormInput = ({ type = 'text', name, value, setValue }) => {
  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <div className="form__input">
      <input
        className="form__input-field"
        id={name}
        type={type}
        placeholder={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormInput;
