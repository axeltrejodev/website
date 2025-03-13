import { ChangeEvent } from "react";
import useFilters from "../hooks/useFilters";

function Filters() {
  const { filters, setFilters } = useFilters();
  function handleChangeMinPrice(e: ChangeEvent<HTMLInputElement>) {
    const newMinPrice = parseInt(e.currentTarget.value);
    setFilters((prevState) => ({
      ...prevState,
      minPrice: newMinPrice,
    }));
  }
  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    const newCategory = e.currentTarget.value;
    setFilters((prevState) => ({
      ...prevState,
      category: newCategory,
    }));
  }
  return (
    <section className="sc-filters">
      <label>
        Minimum Price:
        <input
          type="range"
          min={0}
          max={1000}
          value={filters.minPrice}
          onChange={handleChangeMinPrice}
        />
        <span>${filters.minPrice}</span>
      </label>
      <label>
        Category:
        <select onChange={handleChangeCategory} value={filters.category}>
          <option value="all">All</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>
      </label>
    </section>
  );
}

export default Filters;
