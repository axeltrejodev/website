import { useState } from "react";
import Item from "./Item";
import useCart from "../hooks/useCart";

function Cart() {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, clearCart } = useCart();
  return (
    <>
      <button className="sc-toggle-cart" onClick={() => setShowCart(!showCart)}>
        <i className="ri-shopping-cart-line" />
        &nbsp;{showCart ? "Hide" : "Show"}
      </button>
      {showCart && (
        <aside className="sc-cart">
          <p>{`${cart.length} items, $${cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)} in total.`}</p>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <Item item={item} addToCart={() => addToCart(item)} />
              ))}
            </ul>
          ) : (
            <p>No products to show.</p>
          )}
          <button onClick={clearCart}>
            <i className="ri-delete-bin-line" />
          </button>
        </aside>
      )}
    </>
  );
}

export default Cart;
