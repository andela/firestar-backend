import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export const authorization = (req, res, next) => {
  const header = req.header('Authorization');

  if (typeof header !== 'undefined') {
    const bearer = header;
    const token = bearer;
    req.token = token;
    next();
  } else {
    res.status(401).json({ status: 402, error: 'You are not authorized to access this route' });
  }
};

export const jwtVerify = (req, res, next) => {
  const { token } = req;
  jwt.verify(token, process.env.SECRET_KEY_SIGN_UP, (err, result) => {
    if (err) {
      res.status(401).json({ status: 401, error: 'failed jwt verification' });
    } else {
      req.result = result;
      next();
    }
  });
};
