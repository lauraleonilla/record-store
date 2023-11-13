import React from 'react';
import useAlbumData from '../hooks/useAlbumData';
import { AlbumContainer } from '../components/AlbumContainer';
import ShoppingCart from '../components/ShoppingCart';

export default function Home() {
  const albumCards = useAlbumData('newreleases');
  return (
    <AlbumContainer>
      {albumCards}
      <ShoppingCart />
    </AlbumContainer>
  );
}
