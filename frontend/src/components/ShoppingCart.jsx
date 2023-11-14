import React, { useState } from 'react';
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
              <CartProduct key={item}>
                <ProductInfo>
                  <Album>{item.albumName}</Album>
                  <Artist>{item.artist}</Artist>
                  <ProductType>{item.productType}</ProductType>
                </ProductInfo>
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
            <CheckoutButton>Kassalle</CheckoutButton>
          </CartFooter>
        </CartContainer>
      )}
    </ComponentContainer>
  );
};

const ComponentContainer = styled.div`
  position: absolute;
  right: 0;
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
  background-color: ${(props) => props.theme.lightGrey};
  width: 362px;
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const CloseCartButton = styled.button`
  margin: 0 0 20px 10px;
  padding: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CartProducts = styled.div`
  flex: 1;
  overflow-y: auto;

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
  display: flex;
  background-color: ${(props) => props.theme.white};
  width: 85%;
  border-radius: 5px;
  margin: 0 auto 10px auto;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const ProductInfo = styled.div`
  flex: 1;
  align-self: center;
`;

const Album = styled.div`
  font-weight: bold;
  margin-bottom: 0.2rem;
`;

const Artist = styled.div`
  font-weight: normal;
  margin-bottom: 0.2rem;
`;

const ProductType = styled.div`
  font-weight: normal;
`;

const Price = styled.div`
  font-weight: bold;
  align-self: flex-end;
  margin-right: 15px;
`;

const DeleteIconHolder = styled.div`
  display: flex;
  height: 70px;
  border-left: 1px solid ${(props) => props.theme.black};
  padding: 0 5px;
`;

const DeleteIcon = styled.img`
  align-self: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 5px;
`;

const CartFooter = styled.div`
  border-top: 1px solid ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
  padding: 10px;
  text-align: center;
`;

const TotalPrice = styled.div`
  font-weight: bold;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.black};
`;

const CheckoutButton = styled.button`
  background-color: ${(props) => props.theme.orange};
  color: ${(props) => props.theme.black};
  width: 95%;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 10px auto;
`;

export default ShoppingCart;
