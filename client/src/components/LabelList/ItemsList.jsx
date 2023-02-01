import './ItemsList.scss';

const LabelList = ({ items }) => {
  return (
    <ul className="items__list">
      {items.map((item, indx) => (
        <li className="items__list-item" key={item + indx}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default LabelList;
