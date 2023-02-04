import Button from '../Button';
import './PromptPopUp.scss';

const PromptPopUp = ({ onConfirm, onDeny }) => {
  const handleConfirm = event => {
    event.stopPropagation();
    onConfirm();
    onDeny();
  };

  const handleDeny = event => {
    event.stopPropagation();
    onDeny();
  };
  return (
    <div className="prompt">
      <p className="prompt__message">Are you sure?</p>
      <ul className="prompt__buttons">
        <li className="prompt__buttons-item">
          <Button type="button" label="Yes" title="Confirm" onClick={handleConfirm} />
        </li>
        <li className="prompt__buttons-item">
          <Button type="button" label="No" title="Deny" onClick={handleDeny} />
        </li>
      </ul>
    </div>
  );
};

export default PromptPopUp;
