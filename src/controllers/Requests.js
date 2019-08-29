import { Request } from '../models/index';
import ValidateParams from '../validation/ValidateParams';
/**
 * class Requests defines travel requests endpoints
 * @class
 */
class Requests {
  /**
   * @param {Oject} req is the request object
   * @param {Object} res is the response object
   * @static
   * @returns {void}
   */
  static async getAUserRequest(req, res) {
    const { userId } = req.params;

    try {
      ValidateParams.evaluate(userId);
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'Invalid request',
      });
    }

    const data = await Request.findAll({ where: { id: userId } });
    res.send({
      status: 200,
      data,
    });
  }
}
export default Requests;
