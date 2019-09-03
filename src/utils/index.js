import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @param {id} id of newly registered user from the user Table.
 * @return {string} generated token that is a string data type.
 */
export const emailVerifyToken = (id) => new Promise((resolve) => {
  const token = jwt.sign({ id }, process.env.EMAIL_VERIFY_TOKEN_SECRET_KEY, { expiresIn: '24h' });
  if (token) return resolve(token);
});

/**
 * @param {id} id of newly registered user from the user Table.
 * @return {string} generated token that is a string data type.
 */
export const jwtSignUser = (id) => new Promise((resolve) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY_SIGN_UP);
  if (token) return resolve(token);
});

export const jwtVerifyUserToken = (token) => new Promise((resolve,reject) => {
  const result = jwt.verify(token, process.env.SECRET_KEY_SIGN_UP);
  if (result) return resolve(result);
  if (!result) return reject(result);
});
