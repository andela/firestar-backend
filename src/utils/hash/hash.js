import bcrypt from 'bcryptjs';

const hash = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export default hash;
