import styled from 'styled-components';
import { Input, Form, FormHeader, ButtonWrapper, Button } from './registration';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import validator from 'validator';

function validateForm(e, pw) {
  const { name, value } = e.target;
  if (value.length != 0) {
    switch (name) {
      case 'firstName':
        return value.length < 2 ? 'Etunimi on liian lyhyt (väh. 2 merkkiä)' : '';
      case 'lastName':
        return value.length < 2 ? 'Sukunimi on liian lyhyt (väh. 2 merkkiä)' : '';
      case 'address':
        return value.length < 10 ? 'Osoite on liian lyhyt (väh. 10 merkkiä)' : '';
      case 'postalCode':
        return !/^[0-9]{5}$/.test(value) ? 'Postinumero ei ole kelvollinen' : '';
      case 'city':
        return value.length < 2 ? 'Kaupunki on liian lyhyt (väh. 2 merkkiä)' : '';
      case 'email':
        return !validator.isEmail(value) ? 'Sähköposti ei ole kelvollinen' : '';
      case 'phoneNumber':
        return !validator.isMobilePhone(value) ? 'Numero ei ole kelvollinen' : '';
      case 'password':
        return value.length < 8 ? 'Salasana on liian lyhyt (väh. 8 merkkiä)' : '';
      case 'confirmPassword':
        return value !== pw.password ? 'Salasanat eivät täsmää' : '';
    }
  }
}

export function LoginForm() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: '' });
  }

  function validateInput(e, pw) {
    setErrors({ ...errors, [e.target.name]: validateForm(e, pw) });
  }

  async function handleSubmit(e) {
    // e.preventDefault();
    const noErrors = Object.values(errors).every((value) => value === '');

    // if (noErrors) {
    try {
      // const loginData = await fetch('https://localhost:3001/user/login', {
      //   method: 'POST',
      //   headers: {
      //     'content-type': 'application/json'
      //   },
      //   body: { loginDetails: formValues }
      // });
      // if (loginData.ok) {
      //   console.log('login successful');
      // }
      console.log('logging in...');
    } catch (err) {
      console.error('Error when trying to login:', err);
      // }
    }
  }

  function debouncer(func, delay) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func();
      }, delay);
    };
  }

  const debouncedSubmit = debouncer(handleSubmit, 1000);

  function submit(e) {
    e.preventDefault();
    debouncedSubmit();
  }

  return (
    <>
      <FormHeader>Kirjaudu sisään</FormHeader>
      <Form>
        <Input
          labelName={'sähköposti'}
          id={'email'}
          value={formValues.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={validateInput}
        />
        <Input
          type={'password'}
          labelName={'salasana'}
          id={'password'}
          value={formValues.password}
          error={errors.password}
          onChange={handleChange}
          onBlur={validateInput}
        />
        <ButtonWrapper>
          <Button $primary onClick={submit}>
            Kirjaudu
          </Button>
        </ButtonWrapper>
      </Form>
      <BtmText>
        <span>Ei käyttäjätiliä? </span>
        <RegistrationLink to="/user/register">Rekisteröidy!</RegistrationLink>
      </BtmText>
    </>
  );
}

const BtmText = styled.div``;
const RegistrationLink = styled(Link)``;
