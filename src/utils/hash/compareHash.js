import bcrypt from 'bcryptjs';

const compareWithHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export default compareWithHash;
