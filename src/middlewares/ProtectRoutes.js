import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * class for protecting routes
 * @class
 */
class ProtectRoutes {
  /**
     * @param {*} req object
     * @param {*} res object
     * @param {*} next callback
     * @returns {void}
     */
  static authenticate(req, res, next) {
    const token = req.header('token');
    if (!token) {
      return res.status(401).send({
        status: 401,
        error: 'Access denied, No token',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      req.user = decoded;
      req.body.token = token;
      next();
    } catch (ex) {
      res.status(400).send({
        status: 400,
        error: 'invalid token',
      });
    }
  }
}

export default ProtectRoutes;
