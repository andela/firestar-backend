
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import url from 'url';

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
  static confirmEmailVerificaionToken(req, res) {
    const { id } = url.parse(req.url, true).query;

    try {
      jwt.verify(id, process.env.SECRET_KEY_EMAIL_VERIFY_TOKEN);
      return res.status(422).json({
        status: 200,
        message: 'You Account has been successfully verified, you would be redirected in few seconds to your dashboard'
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'Sorry your account can\'t be verified because your token has an issue.'
      });
    }
  }
}
