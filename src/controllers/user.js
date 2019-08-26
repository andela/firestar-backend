
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import url from 'url';


export const signUp = async (req, res) => {
  const { verificationMailResponse } = req;

  return res.status(200).json({
    status: 200,
    data: {
      message:
        'Message successfully sent, please check your email',
      verificationMailResponse
    }
  });
};

export const confirmEmailVerificaionToken = (req, res) => {
  const { id } = url.parse(req.url, true).query;

  try {
    const checkTokenBoolean = jwt.verify(id, process.env.SECRET_KEY_EMAIL_VERIFY_TOKEN);
    if (!checkTokenBoolean) {
      return res.status(422).json({ status: 422, error: 'Your token can\'t be verified at this time' });
    }
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
};
