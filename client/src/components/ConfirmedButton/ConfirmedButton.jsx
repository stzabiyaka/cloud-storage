import { useState } from 'react';
import Button from '../Button';
import PromptPopUp from '../PromptPopUp';

import './ConfirmedButton.scss';

const ConfirmedButton = ({ label, title, icon, onClick }) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleClick = event => {
    event.stopPropagation();
    setShowPopUp(true);
  };

  return (
    <div className="confirmedButton__container">
      <Button type="button" label={label} icon={icon} title={title} onClick={handleClick} />
      {showPopUp && (
        <PromptPopUp
          onConfirm={onClick}
          onDeny={() => {
            setShowPopUp(false);
          }}
        />
      )}
    </div>
  );
};

export default ConfirmedButton;
