/**
 * @description Response class
 */
export default class Response {
  /**
   *
   * @param {*} res
   * @param {*} statusCode
   * @param {*} err
   * @returns {object} response object
   */
  static errorResponse(res, statusCode, err) {
    return res.status(statusCode).json({
      status: 'error',
      error: err
    });
  }

  /**
   *
   * @param {*} res
   * @param {*} statusCode
   * @param {*} msg
   * @returns {object} response object
   */
  static successResponse(res, statusCode, msg) {
    return res.status(statusCode).json({
      status: 'success',
      message: msg
    });
  }
}
