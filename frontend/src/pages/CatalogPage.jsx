import useAlbumData from '../hooks/useAlbumData';
import { AlbumContainer } from '../components/AlbumContainer';
import { useParams } from 'react-router-dom';
import { Pagination } from '../components/Pagination';
import styled from 'styled-components';

export function CatalogPage() {
  const { page } = useParams();
  const albumCards = useAlbumData('all', page);
  return (
    <Container>
      <AlbumContainer>{albumCards}</AlbumContainer>
      <Pagination currentPage={page} />
    </Container>
  );
}

const Container = styled.div`
  background: ${(props) => props.theme.lightGrey};
  width: 100%;
`;
