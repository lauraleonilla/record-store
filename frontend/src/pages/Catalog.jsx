import React from 'react';
import useAlbumData from '../hooks/useAlbumData';
import { AlbumContainer } from '../components/AlbumContainer';
import ShoppingCart from '../components/ShoppingCart';

export default function Catalog() {
  const albumCards = useAlbumData('all');
  return (
    <AlbumContainer>
      {albumCards}
      <ShoppingCart />
    </AlbumContainer>
  );
}
