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
        <CategoryHeader>{categoryName}</CategoryHeader>
        <AlbumContainer>{albumCards}</AlbumContainer>
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
`;

const CategoryHeader = styled.div`
  font-size: 2rem;
  position: relative;
  padding: 1rem;
  margin: 20px 0 0 0;
  min-width: 100%;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  background: ${(props) => props.theme.white};
`;

const FilterContainer = styled.div`
  padding: 2rem;
  min-width: 100%;
  justify-items: center;
  background: ${(props) => props.theme.lightGrey};
`;
