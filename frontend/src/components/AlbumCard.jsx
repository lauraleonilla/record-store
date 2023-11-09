// import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function AlbumCard({ albumName, artist, productType, price }) {
  return (
    <CardContainer>
      <AlbumImg />
      <AlbumName>{albumName}</AlbumName>
      <Artist>{artist}</Artist>
      <BottomRow>
        <ProductType>{productType}</ProductType>
        <Price>{price}</Price>
      </BottomRow>
      <AddToCartBtn>Lisää koriin</AddToCartBtn>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: fit-content;
  padding: 0.5rem;
  gap: 0.75rem;
  background: #aaa;
`;

const AlbumImg = styled.img`
  height: 160px;
  width: 160px;
  background: white;
`;

const AlbumName = styled.span``;
const Artist = styled.span``;
const ProductType = styled.span``;
const Price = styled.span``;
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddToCartBtn = styled.button``;

AlbumCard.propTypes = {
  albumName: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  productType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};
