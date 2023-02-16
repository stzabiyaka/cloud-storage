import { Link } from 'react-router-dom';
import './Hero.scss';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__info">
        <h1 className="hero__info-title">Your Cloud File Storage</h1>
        <p className="hero__info-text">
          You can use your cloud disk, as well as usual file storage on your HDD or SSD.
        </p>
        <p className="hero__info-text">
          The capacity of your ClouDisk is <span className="hero__info-span">1 GB</span>.
        </p>
        <p className="hero__info-text">
          The only thing you need to do to start using your ClouDisk, is to{' '}
          <Link className="hero__link hero__link--text" to="/signup">
            sign up
          </Link>{' '}
          for our service.
        </p>
        <Link className="hero__link hero__link--button" to="/signup">
          Get Started
        </Link>
      </div>
      <div className="hero__picture"></div>
    </div>
  );
};

export default Hero;
