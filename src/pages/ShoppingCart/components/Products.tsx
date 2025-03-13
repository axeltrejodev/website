import { products } from "../mocks/products.json";
import Product from "./Product";
import useFilters from "../hooks/useFilters";

function Products() {
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(products);
  return filteredProducts.length > 0 ? (
    <ul className="sc-products">
      {filteredProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  ) : (
    <p>No products to show.</p>
  );
}

export default Products;
