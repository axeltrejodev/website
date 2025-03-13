import { type Item as ItemType } from "../types";

type Props = {
  item: ItemType;
  addToCart: () => void;
};

function Item({ item, addToCart }: Props) {
  return (
    <li className="item">
      <div className="wrapper">
        <img src={item.thumbnail} />
        <div className="details">
          <h2>{item.title}</h2>
          <span>${item.price}</span>
        </div>
      </div>
      <div className="actions">
        <span>Quantity: {item.quantity}</span>
        <button onClick={addToCart}>
          <i className="ri-add-line" />
        </button>
      </div>
    </li>
  );
}

export default Item;
