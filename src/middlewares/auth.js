/* eslint-disable import/prefer-default-export */
import { jwtVerifyUserToken } from '../utils/index';

export const authorization = async (req, res, next) => {
  const header = req.header('Authorization');

  if (typeof header !== 'undefined') {
    const [, token] = header.split(' ');
    try {
      const { user } = await jwtVerifyUserToken(token);
      if (user) {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401).json({ status: 401, error });
    }
  } else {
    res.status(401).json({ status: 401, error: 'You are not authorized to access this route' });
  }
};
