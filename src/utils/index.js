import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const emailVerifyToken = (id) => new Promise((resolve, reject) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY_EMAIL_VERIFY_TOKEN, { expiresIn: '1h' });
  const error = { err: 'could not assign a token, make sure you provide a secret key' };
  if (token) resolve(token);
  if (!token) reject(error);
});

const arrayTest = (array, index) => array.indexOf(index);


export { emailVerifyToken, arrayTest };
