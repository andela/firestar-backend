
import dotenv from 'dotenv';
import Util from '../utils/response';


dotenv.config();
const util = new Util();


/**
 * @param { class } provide response to email request.
 */
export default class Index {
  /**
 * @param {req} req that contains the req body object.
 * @param {res} res content to be rendered.
 * @returns {object} Welcome user to dashboard page
 */
  static Welcome(req, res) {
    util.setSuccess(200, 'Welcome, you are accessing a proctected route', req.user);
    return util.send(res);
  }
}
