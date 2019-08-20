import isEmpty from "./isEmpty";
import isValidEmail from "./isValidEmail";

const validateEmail = ({ email }) => {
  let errors = {};

  email = !isEmpty(email) ? email : "";

  if (isEmpty(email)) {
    errors.email = "Email is required";
  } else {
    if (!isValidEmail(email)) {
      errors.email = "Email is not valid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateEmail;
