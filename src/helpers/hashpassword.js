import bcrypt from 'bcrypt';

export const hashPassword = (password) => new Promise((resolve, reject) => {
  bcrypt.hash(password, 10, (err, hash) => {
    resolve(hash);
    reject(err);
  });
});

export const comparePassword = (hashpassword, password) => new Promise((resolve, reject) => {
  bcrypt.compare(password, hashpassword, (err, boolean) => {
    if (boolean)resolve(boolean);
    if (err)reject(err);
  });
});
