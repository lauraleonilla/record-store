import React, { useState } from 'react';
import styled from 'styled-components';
import { Header2, StandardBold, Standard } from '../assets/globalStyles';

export const Checkout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState();

  const onDeliveryMethodSelect = (e) => {
    console.log('HELLOOO', e.target.value);
    setDeliveryMethod(e.target.value);
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
        <p>Etunimi*</p>
        <CheckoutInput />
        <p>Sukunimi*</p>
        <CheckoutInput />
        <p>Sähköposti*</p>
        <CheckoutInput />
        <p>Puhelinnumero</p>
        <CheckoutInput />
        {deliveryMethod === 'homeDelivery' ? (
          <AddressContainer>
            <p>Toimitusosoite</p>
            <CheckoutInput />
          </AddressContainer>
        ) : null}
      </InnerContainer>
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled.div`
  background-color: ${(props) => props.theme.lightGrey};
  width: 50rem;
  height: 50rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  justify-content: flex-start;
`;

const HeaderContainer = styled.div`
  margin: 50px 0px;
`;

const CheckoutInput = styled.input`
  width: 300px;
  height: 30px;
`;

const AddressContainer = styled.div`
  margin-top: 50px;
  background-color: ${(props) => props.theme.grey};
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
