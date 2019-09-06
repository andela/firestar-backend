/* eslint-disable camelcase */

/* eslint-disable import/prefer-default-export */
import Jwt from 'jsonwebtoken';
import url from 'url';
import dotenv from 'dotenv';
import userservices from '../services/userservice';
import Util from '../utils/response';


dotenv.config();
const util = new Util();


/**
 * @param { class } provide response to email request.
 */
export default class emailVerificationController {
  /**
 * @param {req} req that contains the req body object.
 * @param {res} res content to be rendered.
 * @returns {object} Success email response for email token sent to mail
 */
  static signUp(req, res) {
    const { verificationMailResponse, emailToken } = req;

    return res.status(200).json({
      status: 200,
      data: {
        token: emailToken,
        message:
        'Message successfully sent, please check your email',
        verificationMailResponse
      }
    });
  }

  /**
 * @param {req} req that contains the req body object.
 * @param {res} res content to be rendered.
 * @returns {object} Success email response for email token sent to mail
 */
  static async confirmEmailVerificaionToken(req, res) {
    const { id } = url.parse(req.url, true).query;
    try {
      const decoded = await Jwt.verify(id, process.env.EMAIL_VERIFY_TOKEN_SECRET_KEY);
      const isVerified = { isVerified: true };
      const updateResponse = await userservices.updateUserByEmail(decoded.id, isVerified);
      if (updateResponse.isVerified) {
        util.setSuccess(200, 'Your account has been successfully verified');
        return util.send(res);
      }
    } catch (err) {
      util.setSuccess(400, `We are sorry, Your account cannot be verified at the moment, 
      the link is expired, please login to your account and click resend verification mail`, err);
      return util.send(res);
    }
  }
}
