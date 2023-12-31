import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [orderDetails, setOrderDetails] = useState({
    firstName: { value: '', isDirty: false },
    lastName: { value: '', isDirty: false },
    email: { value: '', isDirty: false },
    phoneNumber: { value: '', isDirty: false },
    address: { value: '', isDirty: false },
    postalCode: { value: '', isDirty: false },
    city: { value: '', isDirty: false }
  });

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const numItemsInCart = cart.length;

  const calculateTotalPrice = () => {
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0);
    return total.toFixed(2);
  };

  const addToCart = (album) => {
    const updatedCart = [...cart, album];
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const selectDeliveryMethod = (method) => {
    setDeliveryMethod(method);
  };

  const updateOrderDetails = (details) => {
    setOrderDetails(details);
  };

  const deleteCartItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const emptyCart = () => {
    setCart([]);
    saveCartToLocalStorage([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteCartItem,
        numItemsInCart,
        calculateTotalPrice,
        emptyCart,
        deliveryMethod,
        selectDeliveryMethod,
        updateOrderDetails,
        orderDetails
      }}>
      {children}
    </CartContext.Provider>
  );
};
