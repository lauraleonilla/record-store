import useAlbumData from '../hooks/useAlbumData';
import styled from 'styled-components';

export default function Catalog() {
  const albumCards = useAlbumData('all');
  return <Container>{albumCards}</Container>;
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 2rem;
  background: #eee;
  max-width: 50%;
`;
