import { createContext, useState } from 'react';

export const PaginationContext = createContext();

export function PaginationProvider({ children }) {
  // const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // function updateFirstItemIndex(index) {
  //   setIndexOfFirstItem(index);
  // }

  function updateItemCount(count) {
    setItemCount(count);
  }

  function updateItemsPerPage(items) {
    setItemsPerPage(items);
  }

  return (
    <PaginationContext.Provider
      value={{
        // indexOfFirstItem,
        // updateFirstItemIndex,
        itemCount,
        updateItemCount,
        itemsPerPage,
        updateItemsPerPage
      }}>
      {children}
    </PaginationContext.Provider>
  );
}
