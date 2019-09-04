import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import util from '../utils/response';

const Util = new util()
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

class Helper {
  /**
   * @method generateToken
   * @param {string} payload
   * @returns {string} token
   */
  static generateToken(id) {
    const token = jwt.sign({ id }, secretKey, {
      expiresIn: '24h'
    });
    return token;
  }

  /**
   * @method verifyToken
   * @param {string} token
   * @returns {string} payload
   */
  static async verifyToken(req, res, next) {
    const { token } = req.headers;
    if (!token) {
      Util.setError(401, 'Provide user token')
      return Util.send(res)
    }
    try {
      const decoded = await jwt.decode(token, process.env.SECRET);
      if (decoded) {
        req.user = decoded;
        return next();
      }
      throw new Error('You are not logged in');
    } catch (error) {
      Util.setError(400, error.message)
      return Util.send(res)
    }
  }
}

export default Helper;
