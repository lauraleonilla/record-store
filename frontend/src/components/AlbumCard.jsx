import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCart } from '../context/Cart/CartContext';

export default function AlbumCard({ albumName, artist, productType, price }) {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    const album = { albumName, artist, productType, price };
    addToCart(album);
  };
  return (
    <CardContainer>
      <AlbumImg src="https://placehold.co/208x208" />
      <AlbumInfo>
        <AlbumName>{albumName}</AlbumName>
        <Artist>{artist}</Artist>
        <BottomRow>
          <ProductType>{productType}</ProductType>
          <Price>{price}</Price>
        </BottomRow>
      </AlbumInfo>
      <AddToCartBtn onClick={handleAddToCart}>Lisää koriin</AddToCartBtn>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: fit-content;
  width: 13rem;

  gap: 0.5rem;
  background: ${(props) => props.theme.white};
  box-shadow: ${(props) => props.theme.shadows.smallAroundLight};
  border-radius: 0 0 3px 3px;
`;

const AlbumImg = styled.img`
  margin-bottom: 0.5rem;
  background: white;
  place-self: center;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.5rem;
`;

const AlbumName = styled.span`
  min-height: 2rem;
  font-weight: bold;
`;
const Artist = styled.span`
  font-size: 0.9rem;
  height: 2rem;
`;
const ProductType = styled.span``;
const Price = styled.span``;
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddToCartBtn = styled.button`
  background: ${(props) => props.theme.orange};
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 0 0 3px 3px;
  font-weight: bold;
  transition: 50ms ease-out;
  &:hover {
    transition: 50ms ease-in;
    background: ${(props) => props.theme.lightOrange};
  }
  &:active {
    background: ${(props) => props.theme.extraLightOrange};
  }
`;

AlbumCard.propTypes = {
  albumName: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  productType: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};
