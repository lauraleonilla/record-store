import React from 'react';
import useAlbumData from '../hooks/useAlbumData';
import { AlbumContainer } from '../components/AlbumContainer';
import ShoppingCart from '../components/ShoppingCart';
import Categories from '../Categories';
import { MainContent } from '../components/MainContent';

export default function Catalog() {
  const albumCards = useAlbumData('all');
  return (
    <MainContent>
      <Categories />
      <AlbumContainer>{albumCards}</AlbumContainer>
      <ShoppingCart />
    </MainContent>
  );
}
