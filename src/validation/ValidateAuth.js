import Joi from '@hapi/joi';
/**
 * class for validating user endpoint request body
 * @class
 */
class ValidateAuth {
  /**
     *
     * @param {*} user
     * @returns { Oject } Joi
     */
  static userSignup(user) {
    const schema = {
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().alphanum().required(),
    };
    return Joi.validate(user, schema);
  }
}
export default ValidateAuth;
