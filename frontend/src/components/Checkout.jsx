import React, { useState } from 'react';
import styled from 'styled-components';
import { Header2, StandardBold, Standard } from '../assets/globalStyles';
import { Button } from './Button';

export const Checkout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const onDeliveryMethodSelect = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value
    };
    setForm(nextFormState);
  };

  const sendOrder = () => {
    console.log('HELLOOO');
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
            name="delivery"
            onChange={onDeliveryMethodSelect}
          />
          <Standard>Kotiinkuljetus</Standard>
        </RadioButtonContainer>
        <RadioButtonContainer>
          <input type="radio" value="pickUp" name="delivery" onChange={onDeliveryMethodSelect} />
          <Standard>Nouto myymälästä</Standard>
        </RadioButtonContainer>
        <StandardBold>Henkilötiedot</StandardBold>
        <InputContainer>
          <p>Etunimi*</p>
          <CheckoutInput value={form.firstName} onChange={onUpdateField} />
        </InputContainer>
        <InputContainer>
          <p>Sukunimi*</p>
          <CheckoutInput value={form.lastName} onChange={onUpdateField} />
        </InputContainer>
        <InputContainer>
          <p>Sähköposti*</p>
          <CheckoutInput value={form.email} onChange={onUpdateField} />
        </InputContainer>
        <InputContainer>
          <p>Puhelinnumero</p>
          <CheckoutInput />
        </InputContainer>
        {deliveryMethod === 'homeDelivery' ? (
          <AddressContainer>
            <StandardBold>Toimitusosoite</StandardBold>
            <InputContainer>
              <p>Katuosoite*</p>
              <CheckoutInput />
            </InputContainer>
            <InputContainer>
              <p>Postinumero*</p>
              <CheckoutInput />
            </InputContainer>
            <InputContainer>
              <p>Toimipaikka*</p>
              <CheckoutInput />
            </InputContainer>
          </AddressContainer>
        ) : null}
      </InnerContainer>
      <Button disabled={true} text={'Lähetä tilaus'} onClick={sendOrder} />
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
