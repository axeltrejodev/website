import { useCallback, useMemo, useState } from "react";
import debounce from "just-debounce-it";
import search from "../services/search";
import { type Type, type Result } from "../types";

function useSearch(sort: boolean) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const getResults = useCallback(async (type: Type, query: string) => {
    if (query == "") return;
    setLoading(true);
    const newResults = await search(type, query);
    setResults(newResults);
    setLoading(false);
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetResults = useCallback(debounce(getResults, 500), [
    getResults,
  ]);
  const sortedResults = useMemo(() => {
    return sort
      ? [...results].sort((a, b) => a.primary.localeCompare(b.primary))
      : results;
  }, [results, sort]);
  return { results: sortedResults, getResults: debouncedGetResults, loading };
}

export default useSearch;
