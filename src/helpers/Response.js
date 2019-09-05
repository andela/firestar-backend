/**
 * class Response is an helper class for responses
 * @class
 */
class Response {
  /**
     * @param {*} status
     * @param {*} message
     * @param {*} res
     * @returns {Object} res
     */
  static errorResponse(status, message, res) {
    return res.status(status).send({
      status,
      message,
    });
  }

  /**
     * @param {*} status
     * @param {*} data
     * @param {*} res
     * @returns {Object} res
     */
  static successResponse(status, data, res) {
    return res.status(status).send({
      status,
      data,
    });
  }
}
export default Response;
