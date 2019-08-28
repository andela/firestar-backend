/* eslint-disable import/prefer-default-export */
import { verifyEmailTemplate } from '../services/mail/template/verifyEmail';
import { emailVerifyToken } from '../utils/index';
import Mail from '../services/mail/Mail';


/**
 * @param {req} req contains the express object.
 * @param {res} res contains the express response.
 * @param {next} next calls the next middleware.
 * @returns {next-middleware } returns the next middleware or throws an error.
 * @returns {error} if any error occurs it throws an error.
 */
export const SendVerificationEmail = async (req, res, next) => {
  let { email, firstName, lastName } = req.body;
  email = email ? email.trim() : '';
  firstName = firstName ? firstName.trim() : '';
  lastName = lastName ? lastName.trim() : '';
  /**
   * @var {id} id is the user unique id from Table column
   */
  const id = 'some_encoded_identiity';
  const token = await emailVerifyToken(id);
  const emaildDetails = {
    Subject: 'Email Verification',
    Recipient: email,
  };
  const link = req.secure ? `${req.protocol}s://${req.hostname}/api/v1/users/email/verify?id=${token}`
    : `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/email/verify?id=${token}`;
  const data = {
    email,
    firstName,
    lastName,
    link,
  };

  try {
    const send = new Mail(emaildDetails, verifyEmailTemplate(data));
    const response = await send.main();
    if (!response) {
      return res.status(400).json({ status: 400, error: 'Network error occured, please check your network' });
    }

    if (response.message === 'No recipients defined') {
      return res.status(409).json({ status: 409, error: response.message });
    }
    if (response) {
      req.verificationMailResponse = response;
      req.emailToken = token;
      next();
    }
  } catch (err) {
    return res.status(400).json({ status: 400, error: err });
  }
};
