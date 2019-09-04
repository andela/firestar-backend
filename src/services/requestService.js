import db from '../models/index';

/**
 * @param { class } provide response for create request
 */

// eslint-disable-next-line require-jsdoc
class RequestServices {
  /**
   *
   * @param {object} request
   * @returns {res} null
   */
  static async createRequest(request) {
    try {
      return await db.requests.create(request);
    } catch (error) {
      return error;
    }
  }
}

export default RequestServices;
