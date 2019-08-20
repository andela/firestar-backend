import isEmpty from "./isEmpty";
import isValidEmail from "./isValidEmail";

const validateEmail = ({ email }) => {
  let errors = {};

  email = !isEmpty(email) ? email : "";

  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
  } else {
    if (!Validator.isValidEmail(email)) {
      errors.email = "Email is not valid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateEmail;
