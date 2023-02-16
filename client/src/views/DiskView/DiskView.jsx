import Disk from '../../components/Disk';

import DashBoard from '../../components/DashBoard';

import './DiskView.scss';

const DiskView = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="disk__header">
          <h2 className="section__title">Your ClouDisk</h2>
          <DashBoard />
        </div>
        <Disk />
      </div>
    </section>
  );
};

export default DiskView;
