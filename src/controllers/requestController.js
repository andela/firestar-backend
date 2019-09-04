import requestServices from '../services/requestService';
import ValidateRequests from '../validation/requestValidation';

/**
 * request controller
 * @class RequestController
 * @description Request Controller
 */
class RequestController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {res} null
   * @memberof RequestController
   */
  static async createRequest(req, res) {
    try {
      const { body } = req;
      const { error } = ValidateRequests.requestInput(body);
      if (error) {
        return res.status(422).json({
          status: 422,
          message: 'validation error',
          error: error.message,
        });
      }
      const data = await requestServices.createRequest(body);
      res.status(201).json({
        status: 201,
        message: 'request created',
        data: data.dataValues,
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: 'unable to create new request',
        error: e,
      });
    }
  }
}

export default RequestController;
