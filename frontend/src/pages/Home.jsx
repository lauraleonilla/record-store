import useAlbumData from '../hooks/useAlbumData';
import { AlbumContainer } from '../components/AlbumContainer';

export default function Home() {
  const albumCards = useAlbumData('newreleases');
  return <AlbumContainer>{albumCards}</AlbumContainer>;
}
