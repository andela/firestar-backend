import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @param {id} id of newly registered user from the user Table.
 * @return {string} generated token that is a string data type.
 */
export const emailVerifyToken = (id) => new Promise((resolve) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY_EMAIL_VERIFY_TOKEN, { expiresIn: '24h' });
  if (token) return resolve(token);
});
/**
 * @param {array} array of data to test
 * @param {element} element of that array
 * @return {integer} index of the  element in array
 */
export const arrayTest = (array, element) => array.indexOf(element);
