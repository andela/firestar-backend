import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
  let token = req.headers['x-auth-access'];
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not loggged in'
    });
  }
  try {
    token = token.slice(7);
    const decoded = await jwt.decode(token, process.env.SECRET);
    if (decoded) {
      req.user = decoded;
      return next();
    }
    throw new Error('You are not logged in.');
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export default isLoggedIn;
