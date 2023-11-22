import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header2, StandardBold, Standard } from '../assets/globalStyles';
import { Button } from './Button';
import { validateFormValues } from '../utils';
import axios from 'axios';

export const Checkout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState();
  const [inputFields, setInputFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    deliveryMethod: '',
    address: '',
    postalCode: '',
    city: ''
  });
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const initialErrors = validateFormValues(inputFields);
    setErrors(initialErrors);
  }, []);

  useEffect(() => {
    if (deliveryMethod === 'homeDelivery') {
      setInputFields({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        deliveryMethod: '',
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
        phoneNumber: '',
        deliveryMethod: ''
      });
    }
  }, [deliveryMethod]);

  const onDeliveryMethodSelect = (e) => {
    setDeliveryMethod(e.target.value);
    handleChange(e);
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    setErrors(validateFormValues(inputFields));
    if (!Object.values(errors).length) {
      setButtonDisabled(false);
    }
  };

  const handleSubmit = async (event) => {
    const apiUrl = 'http://localhost:3001/main/order';
    event.preventDefault();
    console.log('handleSubmit', errors);
    const res = await axios.post(apiUrl, inputFields);
    console.log('RES', res);
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
              onChange={onDeliveryMethodSelect}
            />
            <Standard>Kotiinkuljetus</Standard>
          </RadioButtonContainer>
          <RadioButtonContainer>
            <input
              type="radio"
              value="pickUp"
              name="deliveryMethod"
              onChange={onDeliveryMethodSelect}
            />
            <Standard>Nouto myymälästä</Standard>
          </RadioButtonContainer>
          <StandardBold>Henkilötiedot</StandardBold>
          <InputContainer>
            <p>Etunimi*</p>
            <CheckoutInput value={inputFields.firstName} onChange={handleChange} name="firstName" />
          </InputContainer>
          <InputContainer>
            <p>Sukunimi*</p>
            <CheckoutInput value={inputFields.lastName} onChange={handleChange} name="lastName" />
          </InputContainer>
          <InputContainer>
            <p>Sähköposti*</p>
            <CheckoutInput value={inputFields.email} onChange={handleChange} name="email" />
          </InputContainer>
          <InputContainer>
            <p>Puhelinnumero</p>
            <CheckoutInput
              value={inputFields.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
            />
          </InputContainer>
          {deliveryMethod === 'homeDelivery' ? (
            <AddressContainer>
              <StandardBold>Toimitusosoite</StandardBold>
              <InputContainer>
                <p>Katuosoite*</p>
                <CheckoutInput value={inputFields.address} onChange={handleChange} name="address" />
              </InputContainer>
              <InputContainer>
                <p>Postinumero*</p>
                <CheckoutInput
                  value={inputFields.postalCode}
                  onChange={handleChange}
                  name="postalCode"
                />
              </InputContainer>
              <InputContainer>
                <p>Toimipaikka*</p>
                <CheckoutInput value={inputFields.city} onChange={handleChange} name="city" />
              </InputContainer>
            </AddressContainer>
          ) : null}
        </InnerContainer>
        <Button disabled={buttonDisabled} text={'Lähetä tilaus'} type="submit" />
        {Object.values(errors).map((err) => (
          <p key={err}>{err}</p>
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
