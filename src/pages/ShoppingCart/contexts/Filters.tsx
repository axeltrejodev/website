import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { type Filters as FiltersType } from "../types";

export type FiltersContextType = {
  filters: FiltersType;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export default FiltersContext;

type Props = {
  children: ReactNode;
};

export function FiltersProvider({ children }: Props) {
  const [filters, setFilters] = useState<FiltersType>({
    category: "all",
    minPrice: 0,
  });
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
