import { useState } from 'react';
import styled from 'styled-components';
import validator from 'validator';
import { Link, useNavigate } from 'react-router-dom';

export function Input({ type, labelName, id, value, onChange, onBlur, error }) {
  return (
    <InputWrapper>
      <Error>{error}</Error>
      <Label htmlFor={id}>{labelName}</Label>
      <InputField type={type} id={id} name={id} value={value} onChange={onChange} onBlur={onBlur} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: fit-content(10rem) 1fr;
  flex-direction: column;
  gap: 0.25rem 1rem;
  width: 100%;
  align-items: end;
`;
const Error = styled.span`
  grid-area: 1 / 2 / 2 / 3;
  color: red;
  font-size: 13px;
`;
const Label = styled.label`
  grid-area: 1 / 1 / 2 / 2;
`;
const InputField = styled.input`
  grid-area: 2 / 1 / 3 / 3;
  height: 2rem;
  box-shadow: grey 1px 1px 2px 0px;
  border-radius: 3px;
  border: ${(props) => props.theme.midGrey} solid 1px;
`;

export function Registration() {
  const navigate = useNavigate();
  const [inputValues, setInputvalues] = useState({
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputvalues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: '' });
  }

  function validateInput(e) {
    const { name, value } = e.target;
    if (value.length != 0) {
      switch (name) {
        case 'firstName':
          if (value.length < 2) {
            setErrors({ ...errors, firstName: 'Etunimi on liian lyhyt (väh. 2 merkkiä)' });
          }
          break;
        case 'lastName':
          if (value.length < 2) {
            setErrors({ ...errors, lastName: 'Sukunimi on liian lyhyt (väh. 2 merkkiä)' });
          }
          break;
        case 'address':
          if (value.length < 10) {
            setErrors({ ...errors, address: 'Osoite on liian lyhyt (väh. 10 merkkiä)' });
          }
          break;
        case 'postalCode':
          if (!/^[0-9]{5}$/.test(inputValues.postalCode)) {
            setErrors({ ...errors, postalCode: 'Postinumero ei ole kelvollinen' });
          }
          break;
        case 'city':
          if (value.length < 2) {
            setErrors({ ...errors, city: 'Kaupunki on liian lyhyt (väh. 2 merkkiä)' });
          }
          break;
        case 'email':
          if (!validator.isEmail(value)) {
            setErrors({ ...errors, email: 'Sähköposti ei ole kelvollinen' });
          }
          break;
        case 'phoneNumber':
          if (!validator.isMobilePhone(value)) {
            setErrors({ ...errors, phoneNumber: 'Numero ei ole kelvollinen' });
          }
          break;
        case 'password':
          if (value.length < 8) {
            setErrors({ ...errors, password: 'Salasana on liian lyhyt (väh. 8 merkkiä)' });
          }
          break;
        case 'confirmPassword':
          if (value !== inputValues.password) {
            setErrors({ ...errors, confirmPassword: 'Salasanat eivät täsmää' });
          }
          break;
      }
    }
  }

  async function checkEmailAvailability() {
    if (validator.isEmail(inputValues.email)) {
      const { email } = inputValues;
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/validateemail`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ email: email })
        });
        if (res.ok) {
          const emailData = await res.json();
          if (emailData.length) {
            setErrors({ ...errors, email: 'Sähköposti on jo käytössä' });
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  function checkEmptyFields() {
    const { firstName, lastName, email, password, confirmPassword } = inputValues;
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      return true;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const checkIfErrors = Object.values(errors).every((value) => value === '');
    const checkIfNotEmpty = checkEmptyFields();

    if (checkIfErrors && checkIfNotEmpty) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(inputValues)
      });
      if (res.ok) {
        const data = res.json();
        console.log(data);
        setInputvalues({
          firstName: '',
          lastName: '',
          address: '',
          postalCode: '',
          city: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: ''
        });
        navigate('../login');
      }
    }
  }

  return (
    <>
      <FormHeader>Luo käyttäjätili</FormHeader>
      <Form onSubmit={handleSubmit}>
        <Instruction>Tähdellä merkityt kentät ovat pakollisia</Instruction>
        <Input
          labelName={'Etunimi*'}
          id={'firstName'}
          value={inputValues.firstName}
          error={errors.firstName}
          onChange={handleChange}
          onBlur={validateInput}
        />
        <Input
          labelName={'Sukunimi*'}
          id={'lastName'}
          value={inputValues.lastName}
          error={errors.lastName}
          onChange={handleChange}
          onBlur={validateInput}
        />
        <Input
          labelName={'Osoite'}
          id={'address'}
          value={inputValues.address}
          error={errors.address}
          onChange={handleChange}
          onBlur={validateInput}
        />
        <Input
          labelName={'Postinumero'}
          id={'postalCode'}
          value={inputValues.postalCode}
          error={errors.postalCode}
          onChange={handleChange}
          onBlur={validateInput}
        />
        <Input
          labelName={'Kaupunki'}
          id={'city'}
          value={inputValues.city}
          error={errors.city}
          onChange={handleChange}
          onBlur={validateInput}
        />
        <Input
          labelName={'Sähköposti*'}
          id={'email'}
          value={inputValues.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={(e) => {
            validateInput(e);
            checkEmailAvailability();
          }}
        />
        <Input
          labelName={'Puhelinnumero'}
          id={'phoneNumber'}
          value={inputValues.phoneNumber}
          error={errors.phoneNumber}
          onChange={handleChange}
          onBlur={validateInput}
        />
        <Input
          type={'password'}
          labelName={'Salasana*'}
          id={'password'}
          value={inputValues.password}
          error={errors.password}
          onChange={handleChange}
          onBlur={validateInput}
        />
        <Input
          type={'password'}
          labelName={'Vahvista salasana*'}
          id={'confirmPassword'}
          value={inputValues.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
          onBlur={validateInput}
        />
        <ButtonWrapper>
          <Button $primary={true} type="submit">
            Rekisteröidy
          </Button>
          <BackLink to="/">
            <Button>Peruuta</Button>
          </BackLink>
        </ButtonWrapper>
      </Form>
    </>
  );
}

export const FormHeader = styled.header`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;
const Instruction = styled.p`
  text-align: center;
  align-self: start;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: clamp(15rem, 50vw, 30rem);
  gap: 1.5rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
`;
export const Button = styled.button`
  width: 100%;
  background: ${(props) => (props.$primary ? props.theme.orange : props.theme.midGrey)};
  padding: 0.75rem;
  border: 0;
  border-radius: 3px;
  font-weight: bold;
  box-shadow: grey 2px 2px 2px 0px;
`;

const BackLink = styled(Link)``;
