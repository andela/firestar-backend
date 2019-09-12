import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ValidateAuth from '../validation/ValidateAuth';
import Response from '../helpers/Response';
import db from '../models/index';

dotenv.config();

const { User } = db;
/**
 * @class
 */
class Auth {
  /**
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} res
     * @static
     */
  static async signup(req, res) {
    const { error } = ValidateAuth.userSignup(req.body);
    if (error) {
      return Response.errorResponse(400, error.details[0].message, res);
    }
    const {
      email, firstName, lastName, password,
    } = req.body;
    const userExist = await User.findOne({ where: { email } });
    if (userExist && userExist.dataValues.id) {
      return Response.errorResponse(409, 'user already exists', res);
    }
    /** ********
     * send email to user to verify email
     * SendEmail.verifyEmail(email);
     ******** */
    const data = await User.create({
      email,
      firstName,
      lastName,
      password,
    });
    const {
      id, email: userEmail, isVerified, roleId
    } = data;

    const token = jwt.sign({
      _id: id,
      _email: userEmail,
      _isVerified: isVerified,
      _roleId: roleId,
    }, process.env.jwtPrivateKey);

    res.header('token', token).send({
      status: 200,
      data,
      token,
    });
  }
}
export default Auth;
