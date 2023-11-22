import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header2, StandardBold, Standard } from '../assets/globalStyles';
import { Button } from './Button';
import { validateFormValues } from '../utils';
import { useCart } from '../context/Cart/CartContext';
import { FormInput } from './Input';

export const Checkout = () => {
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { selectDeliveryMethod, deliveryMethod, updateOrderDetails, orderDetails } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const initialErrors = validateFormValues(orderDetails, deliveryMethod);
    setErrors(initialErrors);
  }, []);

  useEffect(() => {
    if (deliveryMethod === 'homeDelivery') {
      updateOrderDetails({
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
      updateOrderDetails({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      });
    }
  }, [deliveryMethod]);

  const onDeliveryMethodSelect = (e) => {
    selectDeliveryMethod(e.target.value);
  };

  const handleChange = (e) => {
    updateOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const validateInputFields = () => {
    const inputErrors = validateFormValues(orderDetails, deliveryMethod);
    setErrors(inputErrors);
    if (!Object.values(inputErrors).length) {
      setButtonDisabled(false);
    } else if (Object.values(inputErrors).length) {
      setButtonDisabled(true);
    }
  };

  return (
    <CheckoutContainer>
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
            checked={deliveryMethod === 'homeDelivery'}
            onChange={onDeliveryMethodSelect}
          />
          <Standard>Kotiinkuljetus</Standard>
        </RadioButtonContainer>
        <RadioButtonContainer>
          <input
            type="radio"
            value="pickUp"
            checked={deliveryMethod === 'pickUp'}
            onChange={onDeliveryMethodSelect}
          />
          <Standard>Nouto myymälästä</Standard>
        </RadioButtonContainer>
        <StandardBold>Henkilötiedot</StandardBold>
        <FormInput
          description={'Etunimi*'}
          value={orderDetails.firstName}
          onChange={handleChange}
          onBlur={validateInputFields}
          name="firstName"
        />
        <FormInput
          description={'Sukunimi*'}
          value={orderDetails.lastName}
          onChange={handleChange}
          onBlur={validateInputFields}
          name="lastName"
        />
        <FormInput
          description={'Sähköposti*'}
          value={orderDetails.email}
          onChange={handleChange}
          onBlur={validateInputFields}
          name="email"
        />
        <FormInput
          description={'Puhelinnumero'}
          value={orderDetails.phoneNumber}
          onChange={handleChange}
          onBlur={validateInputFields}
          name="phoneNumber"
        />
        {deliveryMethod === 'homeDelivery' ? (
          <AddressContainer>
            <StandardBold>Toimitusosoite</StandardBold>
            <FormInput
              description={'Katuosoite*'}
              value={orderDetails.address}
              onChange={handleChange}
              onBlur={validateInputFields}
              name="address"
            />
            <FormInput
              description={'Postinumero*'}
              value={orderDetails.postalCode}
              onChange={handleChange}
              onBlur={validateInputFields}
              name="postalCode"
            />
            <FormInput
              description={'Toimipaikka*'}
              value={orderDetails.city}
              onChange={handleChange}
              onBlur={validateInputFields}
              name="city"
            />
          </AddressContainer>
        ) : null}
      </InnerContainer>
      <Button disabled={buttonDisabled} text={'Seuraava'} onClick={() => navigate('/payment')} />
      {Object.values(errors).map((err) => (
        <ErrorMessage key={err}>{err}</ErrorMessage>
      ))}
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

const AddressContainer = styled.div`
  margin-top: 50px;
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
