import './UploaderItem.scss';

const UploaderItem = ({ item }) => {
  const { name, progress } = item;
  return (
    <li className="uploader__item">
      <p className="uploader__item-header">{name}</p>
      <div className="uploader__progress">
        <div
          className="progress__bar"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(${
              235 - progress
            }, 155, 0) ${progress}%, transparent ${progress}% )`,
          }}
        >
          <p className="progress__bar-percent">{`${progress}%`}</p>
        </div>
      </div>
    </li>
  );
};

export default UploaderItem;
