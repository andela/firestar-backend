import isEmpty from './isEmpty';
import isValidEmail from './isValidEmail';

const validateEmail = ({ email }) => {
  const errors = {};

  email = !isEmpty(email) ? email : '';

  if (isEmpty(email)) {
    errors.email = 'Email is required';
  } else {
    !isValidEmail(email) ? errors.email = 'Email is not valid' : null;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateEmail;
