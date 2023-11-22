import { validateFormValues } from './utils';

describe('validateFormValues', () => {
  it('should validate first name length', () => {
    const inputValues = {
      firstName: 'A',
      lastName: 'Smith',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      address: '123 Test St',
      postalCode: '12345',
      city: 'Test City'
    };
    const deliveryMethod = 'pickUp';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors.firstName).toBe('First name is too short');
  });
  it('should validate last name length', () => {
    const inputValues = {
      firstName: 'Aapeli',
      lastName: 'X',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      address: '123 Test St',
      postalCode: '12345',
      city: 'Test City'
    };
    const deliveryMethod = 'pickUp';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors.lastName).toBe('Last name is too short');
  });
  it('should validate email', () => {
    const inputValues = {
      firstName: 'Aapeli',
      lastName: 'Xexe',
      email: 'test@',
      phoneNumber: '1234567890',
      address: '123 Test St',
      postalCode: '12345',
      city: 'Test City'
    };
    const deliveryMethod = 'pickUp';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors.email).toBe('Invalid email');
  });
  it('should validate phone number', () => {
    const inputValues = {
      firstName: 'Aapeli',
      lastName: 'Xexe',
      email: 'test@mail.com',
      phoneNumber: 'abc',
      address: '123 Test St',
      postalCode: '12345',
      city: 'Test City'
    };
    const deliveryMethod = 'pickUp';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors.phoneNumber).toBe('Invalid phonenumber');
  });
  it('should validate address if delivery method is home delivery', () => {
    const inputValues = {
      firstName: 'Aapeli',
      lastName: 'Xexe',
      email: 'test@mail.com',
      phoneNumber: 'abc',
      address: 'xxx 1',
      postalCode: '123',
      city: 'X'
    };
    const deliveryMethod = 'homeDelivery';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors.address).toBe('Too short address');
    expect(errors.postalCode).toBe('Invalid postal code');
    expect(errors.city).toBe('Too short city name');
  });
  it('should return empty object if no errors were found', () => {
    const inputValues = {
      firstName: 'Aapeli',
      lastName: 'Xexe',
      email: 'test@mail.com',
      phoneNumber: '098765554443',
      address: 'Test street 123',
      postalCode: '00990',
      city: 'Helsinki'
    };
    const deliveryMethod = 'homeDelivery';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors).toEqual({});
  });
});
