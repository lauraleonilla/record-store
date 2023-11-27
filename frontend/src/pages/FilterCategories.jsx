import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AlbumContainer } from '../components/AlbumContainer';
import { createCards } from '../hooks/useAlbumData';
import Categories from '../Categories';
import { useParams } from 'react-router-dom';
import { Pagination } from '../components/Pagination';
import useAlbumData from '../hooks/useAlbumData';

export function FilteredCategory() {
  const { categoryName, page } = useParams();
  const albumCards = useAlbumData(categoryName, page);

  const content =
    albumCards.length > 0 ? (
      <>
        <Categories />
        <FilteredCategoryContainer>
          <CategoryHeaderContainer>
            <CategoryHeader>{categoryName}</CategoryHeader>
          </CategoryHeaderContainer>
          <ModifiedAlbumContainer>{albumCards}</ModifiedAlbumContainer>
          <Pagination currentPage={page} categoryName={categoryName} />
        </FilteredCategoryContainer>
      </>
    ) : (
      <>
        <Categories />
        <FilterContainer>
          <p>Albumeita ei löytynyt kategoriasta: {categoryName}</p>
        </FilterContainer>
      </>
    );

  return <>{content}</>;
}

const FilteredCategoryContainer = styled.div`
  grid-column: 2 / 3;
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
