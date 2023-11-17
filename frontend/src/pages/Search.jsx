import { useContext, useEffect } from 'react';
import { SearchContext } from '../context/AlbumSearchContext';
import { AlbumContainer } from '../components/AlbumContainer';
import { createCards } from '../hooks/useAlbumData';

export function AlbumSearch() {
  const { searchResults, logResults } = useContext(SearchContext);

  useEffect(() => {
    logResults;
  }, []);

  let result = '';
  searchResults[0]
    ? (result = createCards(searchResults))
    : (result = 'Haulla ei löytynyt tuloksia.');

  return <AlbumContainer>{result}</AlbumContainer>;
}
