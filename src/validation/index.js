import Joi from 'joi';

const validationOptions = {
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

class checkValidInput {
  /**
   * check user input for sign_up
   * @param {user} object
  */
  static userProfile(user) {
    const schema = Joi.object().keys({
      firstName: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(2)
        .error(() => 'First name field is required with min length of 2 characters and must be alphabet'),
      lastName: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(2)
        .error(() => 'last name field is required with min length of 2 characters and must be alphabet'),
      username: Joi.string().trim().strict()
        .min(2)
        .error(() => 'username field is required with min length of 2 characters'),
      company: Joi.string().trim().strict()
        .min(2)
        .error(() => 'Company field should have more than 2 characters'),
      countryCode: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .max(2)
        .error(() => 'Country Code should not be more than 2 characters'),
      lineManager: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(2)
        .error(() => 'Line Manager should have more than 2 characters and must be alphabet'),
      preferredLanguage: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(2)
        .error(() => 'Preffered Language should have more than 2 characters'),
      preferredCurrency: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(2)
        .error(() => 'Preffered Currency should have more than 2 characters'),
    });
    return Joi.validate(user, schema, validationOptions);
  }
}

export default checkValidInput;
