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
      <AlbumImg />
      <AlbumName>{albumName}</AlbumName>
      <Artist>{artist}</Artist>
      <BottomRow>
        <ProductType>{productType}</ProductType>
        <Price>{price}</Price>
      </BottomRow>
      <AddToCartBtn onClick={handleAddToCart}>Lisää koriin</AddToCartBtn>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: fit-content;
  max-width: fit-content;
  padding: 0.5rem;
  gap: 0.75rem;
  background: ${(props) => props.theme.white};
  box-shadow: ${(props) => props.theme.shadows.smallAround};
  border-radius: 3px;
`;

const AlbumImg = styled.img`
  height: 10rem;
  width: 10rem;
  background: white;
  place-self: center;
`;

const AlbumName = styled.span`
  font-weight: bold;
`;
const Artist = styled.span``;
const ProductType = styled.span``;
const Price = styled.span``;
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddToCartBtn = styled.button`
  background: ${(props) => props.theme.orange};
  box-shadow: ${(props) => props.theme.shadows.smallAround};
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 3px;
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
  price: PropTypes.string.isRequired,
};
