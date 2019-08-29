/* eslint-disable import/prefer-default-export */
import { emailForRegex } from '../__mocks__/emailVerification';

export const emailRegex = (email) => {
  // eslint-disable-next-line no-useless-escape
  const Regex = emailForRegex;
  const EmailBoolean = email ? Regex.test(email) : false;
  return EmailBoolean;
};
