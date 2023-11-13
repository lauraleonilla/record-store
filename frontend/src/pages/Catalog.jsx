import useAlbumData from '../hooks/useAlbumData';
import { AlbumContainer } from '../components/AlbumContainer';

export default function Catalog() {
  const albumCards = useAlbumData('all');
  return <AlbumContainer>{albumCards}</AlbumContainer>;
}
