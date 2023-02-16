import { useSelector } from 'react-redux';
import { selectCurrentUserFreeSpace } from '../../redux/userState/userStateSlice';
import { sizeFormatter } from '../../helpers/functions';
import icons from '../../assets/icons/icons.svg';

import './DashBoard.scss';

const DashBoard = () => {
  const diskFreeSpace = useSelector(selectCurrentUserFreeSpace);
  return (
    <div className="dashboard">
      <div className="dashboard__space-info">Free space: {sizeFormatter(diskFreeSpace.value)}</div>
      <svg
        className="dashboard__space-indicator"
        aria-label="Disk free space indicator"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent ${diskFreeSpace.percent}%, #5ce1e680 ${diskFreeSpace.percent}%)`,
        }}
      >
        <use href={`${icons}#icon-storage-indicator`} />
      </svg>
    </div>
  );
};

export default DashBoard;
