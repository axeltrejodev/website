import { createContext, ReactNode, useState } from "react";
import { type Product, type Item } from "../types";

export type CartContextType = {
  cart: Item[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export default CartContext;

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<Item[]>([]);
  function addToCart(product: Product) {
    const productInCartIndex = cart.findIndex((item) => item.id == product.id);
    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      return setCart(newCart);
    }
    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  }
  function removeFromCart(product: Product) {
    setCart((prevState) => prevState.filter((item) => item.id != product.id));
  }
  function clearCart() {
    setCart([]);
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
