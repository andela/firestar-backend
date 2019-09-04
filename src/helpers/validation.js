export default class Validation {
  static isEmpty(value) {
    return (
      value === null ||
      value === undefined ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    );
  }

  static isValidEmail(email) {
    const re = /^\S+@\S+[\.][0-9a-z]+$/;
    return re.test(email);
  }

  static isValidPassword(password) {
    return password.length >= 6;
  }

  static validateEmail(email) {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!this.isValidEmail(email)) {
      errors.email = 'Email is invalid';
    }

    return {
      errors,
      isValid: this.isEmpty(errors)
    };
  }

  static validatePassword({ password, confirmPassword }) {
    const errors = {};

    if (!password || !confirmPassword) {
      errors.password = 'Password and Confirm password is required';
    } else {
      if (!this.isValidPassword(password)) {
        errors.password = 'Password is invalid';
      }
      if (password !== confirmPassword) {
        errors.password = 'Passwords must match';
      }
    }

    return {
      errors,
      isValid: this.isEmpty(errors)
    };
  }
}
