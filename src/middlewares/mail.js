/* eslint-disable import/prefer-default-export */
import { verifyEmail } from '../services/mail/template/verifyEmail';
import { emailVerifyToken } from '../utils/index';
import Mail from '../services/mail/Mail';

export const SendVerificationEmail = async (req, res, next) => {
  let { email, firstName, lastName } = req.body;
  email = email ? email.trim() : '';
  firstName = firstName.trim();
  lastName = lastName.trim();
  const id = 'some_encoded_identiity';
  const token = await emailVerifyToken(id);
  const emaildDetails = {
    Subject: 'Email Verification',
    Recipient: email,
  };
  const link = `http://localhost:3000/api/v1/auth/verify?id=${token}`;
  const data = {
    email,
    firstName,
    lastName,
    link,
  };

  try {
    const send = new Mail(emaildDetails, verifyEmail(data));
    const { response } = await send.main();

    if (response) {
      req.verificationMailResponse = response;
      req.emailToken = token;
      next();
    }
    if (!response) {
      return res.status(400).json({ status: 400, error: 'Network error occured, please check your network' });
    }
  } catch (err) {
    return res.status(400).json({ status: 400, error: err });
  }
};
