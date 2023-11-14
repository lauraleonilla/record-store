import React from 'react';
import useAlbumData from '../hooks/useAlbumData';
import { AlbumContainer } from '../components/AlbumContainer';
import ShoppingCart from '../components/ShoppingCart';
import Categories from '../Categories';
import { MainContent } from '../components/MainContent';

export default function Home() {
  const albumCards = useAlbumData('newreleases');
  return (
    <MainContent>
      <Categories />
      <AlbumContainer>{albumCards}</AlbumContainer>
      <ShoppingCart />
    </MainContent>
  );
}
