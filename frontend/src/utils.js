export const validateFormValues = (inputValues) => {
  let errors = {};
  if (inputValues.firstName.length < 2) {
    errors.firstName = 'First name is too short';
  }
  if (inputValues.lastName.length < 2) {
    errors.firstName = 'Last name is too short';
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(inputValues.email)) {
    errors.email = 'Invalid email';
  }
  if (!/^\+?[0-9\s-]+$/.test(inputValues.phoneNumber)) {
    errors.phoneNumber = 'Invalid phonenumber';
  }
  if (inputValues.address.length < 10) {
    errors.address = 'Too short address';
  }
  if (!/^[0-9]{5}$/.test(inputValues.postalCode)) {
    errors.postalCode = 'Invalid postal code';
  }
  if (inputValues.city.length < 2) {
    errors.city = 'Too short city name';
  }
  return errors;
};
