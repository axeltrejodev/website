import { useEffect } from "react";
import Filters from "./components/Filters";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { FiltersProvider } from "./contexts/Filters";
import { CartProvider } from "./contexts/Cart";
import "./index.css";

function ShoppingCart() {
  useEffect(() => {
    document.title = "Axel Trejo - Shopping Cart";
  }, []);
  return (
    <>
      <h1>Shopping Cart</h1>
      <FiltersProvider>
        <Filters />
        <CartProvider>
          <Cart />
          <Products />
        </CartProvider>
      </FiltersProvider>
    </>
  );
}

export default ShoppingCart;
