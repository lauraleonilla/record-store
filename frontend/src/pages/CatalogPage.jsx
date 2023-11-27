import useAlbumData from '../hooks/useAlbumData';
import { AlbumContainer } from '../components/AlbumContainer';
import { useParams } from 'react-router-dom';
import { Pagination } from '../components/Pagination';
import Categories from '../Categories';
import styled from 'styled-components';

export function CatalogPage() {
  const { page } = useParams();
  const albumCards = useAlbumData('all', page);
  return (
    <>
      <Categories />
      <Container>
        <AlbumContainer>{albumCards}</AlbumContainer>
        <Pagination currentPage={page} />
      </Container>
    </>
  );
}

const Container = styled.div`
  grid-column: 2 / 3;
  background: ${(props) => props.theme.lightGrey};
  min-width: 100%;
`;
