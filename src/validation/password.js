import isEmpty from "./isEmpty";
import isValidPassword from "./isValidPassword";

const validatePassword = ({ password, confirmPassword }) => {
  let errors = {};

  password = !isEmpty(password) ? password : "";

  if (isEmpty(password)) {
    errors.password = "Password is required";
  } else {
    if (!isValidPassword(password)) {
      errors.password = "Password is not valid";
    }
    if (password !== confirmPassword) {
      errors.password = "Password must match";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validatePassword;
