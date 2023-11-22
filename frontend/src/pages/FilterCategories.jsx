import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AlbumContainer } from '../components/AlbumContainer';
import { createCards } from '../hooks/useAlbumData';
import { useParams } from 'react-router-dom';

export function FilteredCategory() {
  const [albumCards, setAlbumCards] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    async function getAlbumsByCategory() {
      try {
        const res = await fetch(`http://localhost:3001/albums/${categoryName}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        });
        if (res.ok) {
          const albumData = await res.json();
          const cards = await createCards(albumData);
          setAlbumCards(cards);
        }
      } catch (err) {
        console.log('Failed to get albums by category: ', err);
      }
    }
    getAlbumsByCategory();
  }, [categoryName]);

  const content =
    albumCards.length > 0 ? (
      <FilteredCategoryContainer>
        <CategoryHeaderContainer>
          <CategoryHeader>{categoryName}</CategoryHeader>
        </CategoryHeaderContainer>
        <ModifiedAlbumContainer>{albumCards}</ModifiedAlbumContainer>
      </FilteredCategoryContainer>
    ) : (
      <FilterContainer>
        <p>Albumeita ei löytynyt kategoriasta: {categoryName}</p>
      </FilterContainer>
    );

  return <>{content}</>;
}
const FilteredCategoryContainer = styled.div`
  min-width: 100%;
  background: ${(props) => props.theme.lightGrey};
  box-shadow: ${(props) => props.theme.shadows.smallAroundLight};
`;

const CategoryHeaderContainer = styled.div`
  padding: 3rem 0 2rem 0;
  background: ${(props) => props.theme.lightGrey};
`;

const CategoryHeader = styled.div`
  font-size: 2rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: ${(props) => props.theme.shadows.smallAroundLight};
  background: ${(props) => props.theme.white};
`;
const ModifiedAlbumContainer = styled(AlbumContainer)`
  box-shadow: none;
`;

const FilterContainer = styled.div`
  padding: 2rem;
  min-width: 100%;
  background: ${(props) => props.theme.lightGrey};
`;
