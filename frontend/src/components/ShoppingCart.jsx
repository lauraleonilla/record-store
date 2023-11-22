import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/Cart/CartContext';
import styled from 'styled-components';
import ArrayRight from '../assets/arrow-right.png';
import ArrayLeft from '../assets/arrow-left.png';
import TrashCan from '../assets/trash-can.png';

const ShoppingCart = () => {
  const { cart, deleteCartItem, numItemsInCart, calculateTotalPrice } = useCart();
  const [openCartButtonVisible, setOpenCartButtonVisible] = useState(true);
  const [cartVisible, setCartVisible] = useState(false);

  const openCart = () => {
    setOpenCartButtonVisible(false);
    setCartVisible(true);
  };

  const closeCart = () => {
    setOpenCartButtonVisible(true);
    setCartVisible(false);
  };

  return (
    <ComponentContainer>
      {openCartButtonVisible && (
        <OpenCartButton onClick={openCart}>
          <CartIconRight src={ArrayLeft} alt="Left Array" />
          Ostoskori {numItemsInCart}
        </OpenCartButton>
      )}
      {cartVisible && (
        <CartContainer>
          <CloseCartButton onClick={closeCart}>
            <CartIconLeft src={ArrayRight} alt="Right Array" />
            Ostoskori {numItemsInCart}
          </CloseCartButton>

          <CartProducts>
            {cart.map((item, index) => (
              <CartProduct key={index}>
                <Album>{item.albumName}</Album>
                <Artist>{item.artist}</Artist>
                <ProductType>{item.productType}</ProductType>
                <Price>{item.price}</Price>
                <DeleteIconHolder>
                  <DeleteIcon
                    onClick={() => deleteCartItem(index)}
                    src={TrashCan}
                    alt="Trash Icon"
                  />
                </DeleteIconHolder>
              </CartProduct>
            ))}
          </CartProducts>

          <CartFooter>
            <TotalPrice>Yhteensä: {calculateTotalPrice()} </TotalPrice>

            {cart.length ? <CheckoutLink to="/checkout">Kassalle</CheckoutLink> : null}
          </CartFooter>
        </CartContainer>
      )}
    </ComponentContainer>
  );
};

const ComponentContainer = styled.div`
  display: flex;
  position: sticky;
  top: 7.75rem;
  transform: translateX(2rem);
  justify-self: end;
  box-shadow: ${(props) => props.theme.shadows.smallAroundDark};
`;

const OpenCartButton = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CartIconRight = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

const CartContainer = styled.div`
  background-color: ${(props) => props.theme.white};
  max-height: 60svh;
  display: flex;
  flex-direction: column;
`;
const CloseCartButton = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CartProducts = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.75rem;
  overflow-y: auto;
  padding: 1rem;

  overscroll-behavior: contain;

  /* Hide scrollbar different browsers  */
  &::-webkit-scrollbar {
    width: 0.1rem;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  scrollbar-width: thin;

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const CartIconLeft = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

const CartProduct = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  background-color: ${(props) => props.theme.white};
  min-width: fit-content;
  row-gap: 1rem;
  column-gap: 1rem;
  padding: 0.75rem;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.shadows.smallAroundLight};
`;

const Album = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  font-weight: bold;
`;

const Artist = styled.div`
  grid-column: 1/3;
  grid-row: 2/3;
  font-weight: normal;
`;

const ProductType = styled.div`
  grid-column: 1/2;
  grid-row: 3/4;
  font-weight: normal;
`;

const Price = styled.div`
  grid-column: 2/3;
  grid-row: 3/4;
  font-weight: bold;
`;

const DeleteIconHolder = styled.div`
  grid-column: 3/4;
  grid-row: 1/4;
  justify-content: center;
  display: flex;
  border-left: 1px solid ${(props) => props.theme.black};
  padding: 0 5px;
`;

const DeleteIcon = styled.img`
  align-self: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const CartFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
  text-align: center;
  border-radius: 0 0 0 5px;
`;

const TotalPrice = styled.div`
  width: 100%;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 0;
  border-bottom: 1px solid ${(props) => props.theme.black};
`;

const CheckoutLink = styled(Link)`
  display: flex;
  padding: 1rem;
  justify-content: center;
  background-color: ${(props) => props.theme.orange};
  border: none;
  margin: 1rem;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
`;

export default ShoppingCart;
