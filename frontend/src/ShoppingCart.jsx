import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrayRight from './assets/arrow-right.png';
import ArrayLeft from './assets/arrow-left.png';
import TrashCan from './assets/trash-can.png';

/* tuotekorttiin
const [cart, setCart] = useState([]);


const addToCart = (album) => {
  const updatedCart = [...cart, album];
  setCart(updatedCart);
  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  saveCartToLocalStorage(updatedCart); 
};

<ShoppingCart addToCart={addToCart} cart={cart} setCart={setCart}/>

        <div style={{ display: 'inline', float: 'left', width: '700px' }}>
          <h1>Albums</h1>
          <ul>
            {albums.map((album) => (
               <li key={album.albumId}>
               <h2>{album.albumName}</h2>
               <p>Artist: {album.artistName}</p>
               <p>Release Date: {album.releaseDate}</p>
               <p>Record Label: {album.recordLabel}</p>
               <p>Category: {album.category}</p>
               <p>Price: {album.price}</p>
               <button onClick={() => addToCart(album)}>Lisää ostoskoriin</button>
             </li>
            ))}
          </ul>
        </div>
 */


const ShoppingCart = ({ addToCart, cart, setCart }) => {
  const [openCartButtonVisible, setOpenCartButtonVisible] = useState(true);
  const [cartVisible, setCartVisible] = useState(false);

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  useEffect(() => {
    // Load cart from local storage when the component mounts
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleButtonClick = () => {
    setOpenCartButtonVisible(false);
    setCartVisible(true);
  };

  const handleCartClose = () => {
    setOpenCartButtonVisible(true);
    setCartVisible(false);
  };

 

  const numItemsInCart = cart.length;

  const handleDelete = (index) => {
    // Create a new array with the item removed
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  }

  const calculateTotalPrice = () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    return total.toFixed(2);;
  } 
 
  return (
    <ComponentContainer>
      {openCartButtonVisible && (
        <OpenCartButton onClick={handleButtonClick}>
          <CartIconRight src={ArrayLeft} alt="Left Array" />
          Ostoskori {numItemsInCart}
        </OpenCartButton>
      )}
      {cartVisible && (
        <CartContainer>
          <CloseCartButton onClick={handleCartClose}>
            <CartIconLeft src={ArrayRight} alt="Right Array" />
            Ostoskori {numItemsInCart}
          </CloseCartButton>
          <CartProducts>
          {cart.map((item, index) => (
          <CartProduct key={ item }>
            <ProductInfo>
              <Album>{item.albumName}</Album>
              <Artist>{item.artistName}</Artist>
              <ProductType>{item.productType}</ProductType>
            </ProductInfo>
            <Price>{item.price}</Price>
            <DeleteIconHolder>
              <DeleteIcon onClick={() => handleDelete(index)} src={TrashCan} alt="Trash Icon" />
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
}

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: relative;
`;

const OpenCartButton = styled.button`
  background-color: #F2F2F2;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
`;

const CartIconRight = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

const CartContainer = styled.div`
  background-color: #F2F2F2;
  width: 362px;
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const CloseCartButton = styled.button`
  background-color: transparent;
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
  margin-left: auto;
  margin-right: auto;
  list-style: none;
  justify-content: space-between;
  align-items: center; 
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 10px;
`;

const ProductInfo = styled.div`
  flex: 1;
  align-self: center;
`;

const Album = styled.div`
  font-weight: bold;
  margin-bottom:0.2rem;
`;

const Artist = styled.div`
  font-weight: normal;
  margin-bottom:0.2rem;
`;

const ProductType = styled.div`
  font-weight: normal;
`;

const Price = styled.div`
  font-weight: bold;
  flex: 0.4;
  align-self: flex-end;
  margin-right: 15px;
`;

const DeleteIconHolder = styled.div`
  display: flex;
  align-self: center;
  height: 70px;
  border-left: 1px solid #000; 
  padding: 0 5px; 
`;

const DeleteIcon = styled.img`
display: flex;
  align-self: center;
  width: 20px;
  height: 20px;
  padding: 5px;
  cursor: pointer;
  margin-left: 5px;
`;

const CartFooter = styled.div`
  border-top: 1px solid #000;
  background-color: ${(props) => props.theme.white};
  padding: 10px; /* Adjust padding as needed */
  position: sticky;
  bottom: 0;
  text-align: center;
`;

const TotalPrice = styled.div`
  font-weight: bold;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
`;

const CheckoutButton = styled.button`
  background-color: #FF934F;
  color: #000;
  width: 95%;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 10px auto;
`;

export default ShoppingCart;
