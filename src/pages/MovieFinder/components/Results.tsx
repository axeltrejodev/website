import Image from "./Image";
import { type Result } from "../types";

type Props = {
  results: Result[];
};

function Results({ results }: Props) {
  return results.length > 0 ? (
    <ul className="movie-finder-results">
      {results.map((result) => (
        <li key={result.id} className="result">
          <Image src={result.image} alt={`${result.primary} Image`} />
          <div className="details">
            <h2>{result.primary}</h2>
            <span>{result.secondary}</span>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>No results to show.</p>
  );
}

export default Results;
