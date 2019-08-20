import bcrypt from 'bcryptjs';

const hash = (password) => {
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
}

export default hash;