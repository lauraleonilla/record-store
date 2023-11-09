import useAlbumData from '../hooks/useAlbumData';
import styled from 'styled-components';

export default function Home() {
  const albumCards = useAlbumData('newreleases');
  return <AlbumsContainer>{albumCards}</AlbumsContainer>;
}
const AlbumsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 2rem;
  background: #eee;
  max-width: 50%;
`;
