import React from 'react';
import useAlbumData from '../hooks/useAlbumData';
import styled from 'styled-components';
import ShoppingCart from '../components/ShoppingCart';


export default function Catalog() {
  const albumCards = useAlbumData('all');
  return <Container>
          {albumCards}
          <ShoppingCart />
        </Container>;
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
