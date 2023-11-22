import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header2, StandardBold, Standard } from '../assets/globalStyles';
import { Button } from './Button';
import { useCart } from '../context/Cart/CartContext';
import { validateFormValues } from '../utils';
import axios from 'axios';

export const Checkout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('homeDelivery');
  const [inputFields, setInputFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    city: ''
  });
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { emptyCart, calculateTotalPrice, cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const initialErrors = validateFormValues(inputFields, deliveryMethod);
    setErrors(initialErrors);
  }, []);

  useEffect(() => {
    if (deliveryMethod === 'homeDelivery') {
      setInputFields({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        postalCode: '',
        city: ''
      });
    }
    if (deliveryMethod === 'pickUp') {
      setInputFields({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      });
    }
  }, [deliveryMethod]);

  const onDeliveryMethodSelect = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const validateInputFields = () => {
    const inputErrors = validateFormValues(inputFields, deliveryMethod);
    setErrors(inputErrors);
    if (!Object.values(inputErrors).length) {
      setButtonDisabled(false);
    } else if (Object.values(inputErrors).length) {
      setButtonDisabled(true);
    }
  };

  const handleSubmit = async (event) => {
    const apiUrl = 'http://localhost:3001/main/order';
    event.preventDefault();
    const res = await axios.post(apiUrl, {
      ...inputFields,
      items: cart,
      totalPrice: calculateTotalPrice(),
      deliveryMethod: deliveryMethod === 'homeDelivery' ? 'HOME' : 'PICK_UP'
    });
    if (res.status === 200) {
      emptyCart();
      navigate('/success');
    }
  };

  return (
    <CheckoutContainer>
      <form onSubmit={handleSubmit}>
        <InnerContainer>
          <HeaderContainer>
            <Header2>Täytä tilauksen tiedot</Header2>
            <Standard>Tähdellä merkityt kentät ovat pakollisia</Standard>
          </HeaderContainer>
          <StandardBold>Valitse toimitustapa</StandardBold>
          <RadioButtonContainer>
            <input
              type="radio"
              value="homeDelivery"
              name="deliveryMethod"
              checked={deliveryMethod === 'homeDelivery'}
              onChange={onDeliveryMethodSelect}
            />
            <Standard>Kotiinkuljetus</Standard>
          </RadioButtonContainer>
          <RadioButtonContainer>
            <input
              type="radio"
              value="pickUp"
              name="deliveryMethod"
              checked={deliveryMethod === 'pickUp'}
              onChange={onDeliveryMethodSelect}
            />
            <Standard>Nouto myymälästä</Standard>
          </RadioButtonContainer>
          <StandardBold>Henkilötiedot</StandardBold>
          <InputContainer>
            <p>Etunimi*</p>
            <CheckoutInput
              value={inputFields.firstName}
              onChange={handleChange}
              onBlur={validateInputFields}
              name="firstName"
            />
          </InputContainer>
          <InputContainer>
            <p>Sukunimi*</p>
            <CheckoutInput
              value={inputFields.lastName}
              onChange={handleChange}
              onBlur={validateInputFields}
              name="lastName"
            />
          </InputContainer>
          <InputContainer>
            <p>Sähköposti*</p>
            <CheckoutInput
              value={inputFields.email}
              onChange={handleChange}
              onBlur={validateInputFields}
              name="email"
            />
          </InputContainer>
          <InputContainer>
            <p>Puhelinnumero</p>
            <CheckoutInput
              value={inputFields.phoneNumber}
              onChange={handleChange}
              onBlur={validateInputFields}
              name="phoneNumber"
            />
          </InputContainer>
          {deliveryMethod === 'homeDelivery' ? (
            <AddressContainer>
              <StandardBold>Toimitusosoite</StandardBold>
              <InputContainer>
                <p>Katuosoite*</p>
                <CheckoutInput
                  value={inputFields.address}
                  onChange={handleChange}
                  onBlur={validateInputFields}
                  name="address"
                />
              </InputContainer>
              <InputContainer>
                <p>Postinumero*</p>
                <CheckoutInput
                  value={inputFields.postalCode}
                  onChange={handleChange}
                  onBlur={validateInputFields}
                  name="postalCode"
                />
              </InputContainer>
              <InputContainer>
                <p>Toimipaikka*</p>
                <CheckoutInput
                  value={inputFields.city}
                  onChange={handleChange}
                  onBlur={validateInputFields}
                  name="city"
                />
              </InputContainer>
            </AddressContainer>
          ) : null}
        </InnerContainer>
        <Button disabled={buttonDisabled} text={'Lähetä tilaus'} type="submit" />
        {Object.values(errors).map((err) => (
          <ErrorMessage key={err}>{err}</ErrorMessage>
        ))}
      </form>
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled.div`
  background-color: ${(props) => props.theme.lightGrey};
  width: 50rem;
  height: 100%;
  padding: 50px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  justify-content: flex-start;
`;

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.red};
`;

const HeaderContainer = styled.div`
  margin-botton: 50px;
`;

const CheckoutInput = styled.input`
  width: 300px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 4px;
  padding-left: 5px;
`;

const AddressContainer = styled.div`
  margin-top: 50px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.white};
  height: 50px;
  align-items: center;
  padding: 15px;
  border-radius: 4px;

  p {
    margin-bottom: 0px;
  }
  input {
    height: 20px;
    width: 20px;
    vertical-align: middle;
    margin-right: 20px;
  }
`;
