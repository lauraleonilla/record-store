import validator from 'validator';

export const validateFormValues = (inputValues, deliveryMethod) => {
  let errors = {};
  if (inputValues.firstName.length < 2) {
    errors.firstName = 'First name is too short';
  }
  if (inputValues.lastName.length < 2) {
    errors.lastName = 'Last name is too short';
  }
  if (!validator.isEmail(inputValues.email)) {
    errors.email = 'Invalid email';
  }
  if (!validator.isMobilePhone(inputValues.phoneNumber)) {
    errors.phoneNumber = 'Invalid phonenumber';
  }
  if (deliveryMethod === 'homeDelivery') {
    if (inputValues.address && inputValues.address.length < 10) {
      errors.address = 'Too short address';
    }
    if (inputValues.postalCode && !/^[0-9]{5}$/.test(inputValues.postalCode)) {
      errors.postalCode = 'Invalid postal code';
    }
    if (inputValues.city && inputValues.city.length < 2) {
      errors.city = 'Too short city name';
    }
  }
  return errors;
};

export const validatePaymentForm = (inputValues) => {
  let errors = {};
  if (!validator.isCreditCard(inputValues.creditCardNumber)) {
    errors.creditCardNumber = 'Invalid credit card number';
  }
  if (!/^[0-9]{3,4}$/.test(inputValues.cvc)) {
    errors.creditCardNumber = 'Invalid cvc';
  }
  if (!/^[a-zA-Z\s]+$/.test(inputValues.cardHolderName)) {
    errors.cardHolderName = 'Invalid name';
  }

  const [month, year] = inputValues.expirydate.split('/');
  const dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of the current year
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed

  if (
    !dateRegex.test(inputValues.expirydate) ||
    +year < currentYear ||
    (+year === currentYear && +month < currentMonth)
  ) {
    errors.expirydate = 'Invalid expiry date';
  }
  return errors;
};
