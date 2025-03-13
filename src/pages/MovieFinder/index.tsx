import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Results from "./components/Results";
import useSearch from "./hooks/useSearch";
import { type Type } from "./types";
import "./index.css";

function MovieFinder() {
  useEffect(() => {
    document.title = "Axel Trejo - Movie Finder";
  }, []);
  const [sort, setSort] = useState(false);
  function handleChangeSort(e: ChangeEvent<HTMLInputElement>) {
    const newSort = e.currentTarget.checked;
    setSort(newSort);
  }
  const { results, getResults, loading } = useSearch(sort);
  const [type, setType] = useState<Type>("movies");
  function handleChangeType(e: ChangeEvent<HTMLSelectElement>) {
    const newType = e.currentTarget.value as Type;
    setType(newType);
    getResults(newType, query);
  }
  const [query, setQuery] = useState("");
  function handleChangeQuery(e: ChangeEvent<HTMLInputElement>) {
    const newQuery = e.currentTarget.value;
    setQuery(newQuery);
    getResults(type, newQuery);
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getResults(type, query);
  }
  return (
    <>
      <h1>Movie Finder</h1>
      <form className="movie-finder-form" onSubmit={handleSubmit}>
        <select onChange={handleChangeType} value={type}>
          <option value="movies">Movies</option>
          <option value="tv-shows">TV Shows</option>
          <option value="people">People</option>
        </select>
        <input
          type="text"
          required
          minLength={3}
          autoComplete="off"
          placeholder="Avengers, Star Wars, The Matrix..."
          onChange={handleChangeQuery}
          value={query}
        />
        <label>
          <input type="checkbox" onChange={handleChangeSort} checked={sort} />
          Sort
        </label>
      </form>
      {loading && <div className="spinner" />}
      <Results results={results} />
    </>
  );
}

export default MovieFinder;
