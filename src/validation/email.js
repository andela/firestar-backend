import isEmpty from './isEmpty';
import isValidEmail from './isValidEmail';

const validateEmail = ({ email }) => {
  const errors = {};

  if (isEmpty(email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Email is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateEmail;
