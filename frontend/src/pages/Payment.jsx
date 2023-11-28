import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { validatePaymentForm } from '../utils';
import { Button } from '../components/Button';
import { FormInput } from '../components/Input';
import { useCart } from '../context/Cart/CartContext';
import axios from 'axios';

export const Payment = () => {
  const [inputFields, setInputFields] = useState({
    creditCardNumber: '',
    cardHolderName: '',
    cvc: '',
    expirydate: ''
  });
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { emptyCart, calculateTotalPrice, cart, deliveryMethod, orderDetails } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const validateInputFields = () => {
    const inputErrors = validatePaymentForm(inputFields);
    setErrors(inputErrors);
    if (!Object.values(inputErrors).length) {
      setButtonDisabled(false);
    } else if (Object.values(inputErrors).length) {
      setButtonDisabled(true);
    }
  };

  const submitOrder = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/main/order`;
    const contactInfo = {};

    for (const key in orderDetails) {
      if (Object.prototype.hasOwnProperty.call(orderDetails, key)) {
        contactInfo[key] = orderDetails[key].value;
      }
    }
    try {
      const res = await axios.post(apiUrl, {
        ...contactInfo,
        items: cart,
        totalPrice: calculateTotalPrice(),
        deliveryMethod: deliveryMethod === 'homeDelivery' ? 'HOME' : 'PICK_UP'
      });
      if (res.status === 200) {
        emptyCart();
        navigate('/success');
      }
    } catch (error) {
      console.error('Error placing order');
    }
  };

  return (
    <PaymentContainer>
      <PaymentHeader>Syötä kortin tiedot</PaymentHeader>
      <FormInput
        description={'Korttinumero'}
        value={inputFields.creditCardNumber}
        onChange={handleChange}
        onBlur={validateInputFields}
        name="creditCardNumber"
      />
      <FormInput
        description={'Nimi'}
        value={inputFields.cardHolderName}
        onChange={handleChange}
        onBlur={validateInputFields}
        name="cardHolderName"
      />
      <FormInput
        description={'CVC'}
        value={inputFields.cvc}
        onChange={handleChange}
        onBlur={validateInputFields}
        name="cvc"
      />
      <FormInput
        description={'Voimassa'}
        value={inputFields.expirydate}
        onChange={handleChange}
        onBlur={validateInputFields}
        name="expirydate"
      />
      <Button text={'Maksa tilaus'} disabled={buttonDisabled} onClick={submitOrder} />
      {Object.values(errors).map((err) => (
        <ErrorMessage key={err}>{err}</ErrorMessage>
      ))}
    </PaymentContainer>
  );
};

const PaymentContainer = styled.div`
  background-color: ${(props) => props.theme.lightGrey};
  width: 40rem;
  height: 100%;
  padding: 50px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.red};
`;

const PaymentHeader = styled.h1`
  font-size: 30px;
  margin-bottom: 30px;
`;
