import { createContext, useState, useMemo } from 'react';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchResults, setSearchResults] = useState();

  function updateResults(searchData) {
    setSearchResults(searchData);
  }

  function logResults() {
    console.log(searchResults);
  }

  return (
    <SearchContext.Provider value={{ searchResults, updateResults, logResults }}>
      {children}
    </SearchContext.Provider>
  );
}
