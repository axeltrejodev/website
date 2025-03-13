import useCart from "../hooks/useCart";
import { type Product as ProductType } from "../types";

type Props = {
  product: ProductType;
};

function Product({ product }: Props) {
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = cart.some((item) => item.id == product.id);
  return (
    <li className="product">
      <img src={product.thumbnail} />
      <div className="wrapper">
        <div className="details">
          <h2>{product.title}</h2>
          <span>${product.price}</span>
        </div>
        <button
          onClick={() =>
            isInCart ? removeFromCart(product) : addToCart(product)
          }
        >
          {isInCart ? (
            <i className="ri-close-line" />
          ) : (
            <i className="ri-add-line" />
          )}
        </button>
      </div>
    </li>
  );
}

export default Product;
