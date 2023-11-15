import { useContext } from 'react';
import { SearchContext } from '../context/AlbumSearchContext';
import { AlbumContainer } from './AlbumContainer';
import { createCards } from '../hooks/useAlbumData';

export function AlbumSearch() {
  const { searchResults } = useContext(SearchContext);

  let result = '';
  searchResults[0]
    ? (result = createCards(searchResults))
    : (result = 'Haulla ei löytynyt tuloksia.');

  return <AlbumContainer>{result}</AlbumContainer>;
}
