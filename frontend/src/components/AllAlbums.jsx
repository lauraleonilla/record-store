import useAlbumData from '../hooks/useAlbumData';
import { AlbumContainer } from '../components/AlbumContainer';

export function AllAlbums() {
  const albumCards = useAlbumData('all');
  return <AlbumContainer>{albumCards}</AlbumContainer>;
}
