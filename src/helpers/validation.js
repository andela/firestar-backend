/* eslint-disable require-jsdoc */
export default class Validation {
  /**
   * @description Checks if an object is empty
   * @param {object} value
   * @returns {boolean} returns true or false
   */
  static isEmpty(value) {
    return (
      value === null
      || value === undefined
      || (typeof value === 'object' && Object.keys(value).length === 0)
      || (typeof value === 'string' && value.trim().length === 0)
    );
  }

  /**
 * @description Checks if an email is valid
 * @param {object} email
 * @returns {boolean} returns true or false
 */
  static isValidEmail(email) {
    const re = /^\S+@\S+[.][0-9a-z]+$/;
    return re.test(email);
  }

  static isValidPassword(password) {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,}$/;
    return re.test(password);
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

  /**
 * @description A method to validate integers
 * @param {*} id Integer to be validated
 * @returns {boolean} Returns true or false
 */
  static validateInteger(id) {
    if (typeof id !== 'number' && !parseInt(id, 10)) {
      return false;
    }
    return true;
  }
}
