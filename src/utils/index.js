import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const emailVerifyToken = (id) => new Promise((resolve) => {
  console.log(process.env.SECRET_KEY_EMAIL_VERIFY_TOKEN);
  const token = jwt.sign({ id }, process.env.SECRET_KEY_EMAIL_VERIFY_TOKEN, { expiresIn: '24h' });
  if (token) resolve(token);
});

const arrayTest = (array, index) => array.indexOf(index);


export { emailVerifyToken, arrayTest };
