import './Loader.scss';

const Loader = () => {
  return (
    <div className="lds">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
