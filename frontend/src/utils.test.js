import { validateFormValues } from './utils';

describe('validateFormValues', () => {
  it('should validate first name length', () => {
    const inputValues = {
      firstName: { value: 'A', isDirty: true },
      lastName: { value: 'Smith', isDirty: true },
      email: { value: 'test@test.com', isDirty: true },
      phoneNumber: { value: '047484893392', isDirty: true },
      address: { value: 'Test street 123', isDirty: true },
      postalCode: { value: '00990', isDirty: true },
      city: { value: 'Citiii', isDirty: true }
    };
    const deliveryMethod = 'pickUp';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors.firstName).toBe('First name is too short');
  });
  it('should validate last name length', () => {
    const inputValues = {
      firstName: { value: 'Aapeli', isDirty: true },
      lastName: { value: 'X', isDirty: true },
      email: { value: 'test@test.com', isDirty: true },
      phoneNumber: { value: '047484893392', isDirty: true },
      address: { value: 'Test street 123', isDirty: true },
      postalCode: { value: '00990', isDirty: true },
      city: { value: 'Citiii', isDirty: true }
    };
    const deliveryMethod = 'pickUp';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors.lastName).toBe('Last name is too short');
  });
  it('should validate email', () => {
    const inputValues = {
      firstName: { value: 'Aapeli', isDirty: true },
      lastName: { value: 'Xexe', isDirty: true },
      email: { value: 'test.com', isDirty: true },
      phoneNumber: { value: 'abc', isDirty: true },
      address: { value: 'Test street 123', isDirty: true },
      postalCode: { value: '00990', isDirty: true },
      city: { value: 'Citiii', isDirty: true }
    };
    const deliveryMethod = 'pickUp';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors.email).toBe('Invalid email');
  });
  it('should validate phone number', () => {
    const inputValues = {
      firstName: { value: 'Aapeli', isDirty: true },
      lastName: { value: 'Xexe', isDirty: true },
      email: { value: 'test@mail.com', isDirty: true },
      phoneNumber: { value: 'abc', isDirty: true },
      address: { value: 'Test street 123', isDirty: true },
      postalCode: { value: '00990', isDirty: true },
      city: { value: 'Citiii', isDirty: true }
    };
    const deliveryMethod = 'pickUp';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors.phoneNumber).toBe('Invalid phonenumber');
  });
  it('should validate address if delivery method is home delivery', () => {
    const inputValues = {
      firstName: { value: 'Aapeli', isDirty: true },
      lastName: { value: 'Xexe', isDirty: true },
      email: { value: 'test@mail.com', isDirty: true },
      phoneNumber: { value: '098765554443', isDirty: true },
      address: { value: 'Test', isDirty: true },
      postalCode: { value: '0', isDirty: true },
      city: { value: 'X', isDirty: true }
    };
    const deliveryMethod = 'homeDelivery';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors.address).toBe('Too short address');
    expect(errors.postalCode).toBe('Invalid postal code');
    expect(errors.city).toBe('Too short city name');
  });
  it('should return empty object if no errors were found', () => {
    const inputValues = {
      firstName: { value: 'Aapeli', isDirty: true },
      lastName: { value: 'Xexe', isDirty: true },
      email: { value: 'test@mail.com', isDirty: true },
      phoneNumber: { value: '098765554443', isDirty: true },
      address: { value: 'Test street 123', isDirty: true },
      postalCode: { value: '00990', isDirty: true },
      city: { value: 'Helsinki', isDirty: true }
    };
    const deliveryMethod = 'homeDelivery';

    const errors = validateFormValues(inputValues, deliveryMethod);
    expect(errors).toEqual({});
  });
});
