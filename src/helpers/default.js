/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-useless-escape
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils';

export const regexForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const user = {
  id: 1,
  userName: 'dolapo47',
  firstName: 'dolapo',
  lastName: 'adeleye',
  email: 'dolapo@gmail.com',
};
