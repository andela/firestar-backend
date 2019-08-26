import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.auth;
  if (token) {
    const decoded = await jwt.decode(token, process.env.secret);
    req.user = decoded;
  }
  if (typeof parseInt(req.body.id, 10) !== 'number' || !req.body.id) {
    res.status(400).json({
      status: 'error',
      message: 'Invaid Id'
    });
  }
  req.user = {
    roleId: req.body.id
  };
  next();
};

export default isLoggedIn;
