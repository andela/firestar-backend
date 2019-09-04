import Joi from '@hapi/joi';

/**
 * request controller
 * @class ValidateRequests
 * @description validation of request input
 */
class ValidateRequests {
  /**
     *
     * @param {object} request
     * @returns {object} null
     */
  static requestInput(request) {
    const schema = Joi.object().keys({
      reasons: Joi.string()
        .required()
        .error(() => 'reasons field is required'),
      managerId: Joi.number()
        .required(),
      requesterId: Joi.number()
        .required()
    });
    return Joi.validate(request, schema);
  }
}

export default ValidateRequests;
