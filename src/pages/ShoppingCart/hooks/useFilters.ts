import { useContext } from "react";

import { type Product as ProductType } from "../types";
import FiltersContext from "../contexts/Filters";

function useFilters() {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  const { filters, setFilters } = context;
  const filterProducts = (products: ProductType[]) => {
    return products.filter(
      (product) =>
        product.price >= filters.minPrice &&
        (filters.category == "all" || product.category == filters.category)
    );
  };
  return { filters, filterProducts, setFilters };
}

export default useFilters;
