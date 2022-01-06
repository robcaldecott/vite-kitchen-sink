import { createContext, ReactNode, useContext, useState } from "react";

interface FilterData {
  filter: string;
  setFilter: (value: string) => void;
}

const FilterContext = createContext<FilterData | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilter] = useState("");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used inside a FilterProvider");
  }
  return context;
}

export { FilterProvider, useFilter };
