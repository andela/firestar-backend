import isEmpty from './isEmpty';
import isValidPassword from './isValidPassword';

const validatePassword = ({ password, confirmPassword }) => {
  const errors = {};

  password = !isEmpty(password) ? password : '';

  if (isEmpty(password)) {
    errors.password = 'Password is required';
  } else {
    if (!isValidPassword(password)) {
      errors.password = 'Password is invalid';
    }
    if (password !== confirmPassword) {
      errors.password = 'Passwords must match';
    }
    if (isEmpty(confirmPassword)) {
      errors.password = 'Confirm password is required';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validatePassword;
